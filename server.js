"use strict";
/**
 * Static file server for the built site, plus a single endpoint that records
 * contact-form submissions to disk so we get server-side visibility.
 *
 * Replaces `serve`. Behaviour deliberately kept identical:
 *   - "/" serves index.html
 *   - unknown paths serve 404.html with a real HTTP 404 (not a soft-404 200)
 *   - no SPA fallback: the site has a single route (see CLAUDE.md)
 *
 * No dependencies -- Node built-ins only.
 */
const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const DIST = path.join(__dirname, "dist");
const DATA_DIR = process.env.DATA_DIR || "/data";
const STORE = path.join(DATA_DIR, "form-submissions.json");

const MAX_BODY = 16 * 1024; // reject oversized posts outright
const MAX_FIELD = 4000; // truncate any single field
const MAX_RECORDS = 5000; // bound the file so it cannot grow forever

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
};

const log = (...a) => console.log(new Date().toISOString(), ...a);

/* ------------------------------------------------------------------ store */
// Writes are serialised through one promise chain. Two submissions arriving
// together would otherwise read-modify-write the same file and lose one.
let queue = Promise.resolve();

function append(record) {
  queue = queue.then(async () => {
    await fsp.mkdir(DATA_DIR, { recursive: true });
    let list = [];
    try {
      const parsed = JSON.parse(await fsp.readFile(STORE, "utf8"));
      if (Array.isArray(parsed)) list = parsed;
    } catch {
      list = []; // missing or corrupt -> start fresh rather than lose the write
    }
    list.push(record);
    if (list.length > MAX_RECORDS) list = list.slice(-MAX_RECORDS);
    // temp + rename so a crash mid-write cannot truncate the real file
    const tmp = `${STORE}.tmp`;
    await fsp.writeFile(tmp, JSON.stringify(list, null, 2));
    await fsp.rename(tmp, STORE);
    return list.length;
  });
  return queue;
}

const str = (v, max = MAX_FIELD) =>
  typeof v === "string" ? v.slice(0, max) : v == null ? "" : String(v).slice(0, max);

function clientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  const first = (Array.isArray(xff) ? xff[0] : xff || "").split(",")[0].trim();
  return first || req.socket.remoteAddress || "";
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error("body too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function handleSubmission(req, res) {
  const ip = clientIp(req);
  let payload;
  try {
    payload = JSON.parse(await readBody(req, MAX_BODY));
    if (typeof payload !== "object" || payload === null) throw new Error("not an object");
  } catch (e) {
    log(`submission REJECTED <${ip}> ${e.message}`);
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ok: false, error: "invalid body" }));
  }

  const record = {
    at: new Date().toISOString(),
    outcome: str(payload.outcome, 40) || "unknown",
    name: str(payload.name, 200),
    email: str(payload.email, 200),
    company: str(payload.company, 200),
    message: str(payload.message),
    error: str(payload.error, 500),
    ip,
    userAgent: str(req.headers["user-agent"], 300),
    referer: str(req.headers["referer"], 300),
  };

  try {
    const total = await append(record);
    log(
      `FORM ${record.outcome.toUpperCase()} name=${JSON.stringify(record.name)} ` +
        `email=${JSON.stringify(record.email)} ip=${ip} total=${total}` +
        (record.error ? ` error=${JSON.stringify(record.error)}` : ""),
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, stored: total }));
  } catch (e) {
    log(`FORM STORE FAILED <${ip}> ${e.message}`);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false }));
  }
}

/* ----------------------------------------------------------------- static */
async function notFound(req, res) {
  log(`${req.method} ${req.url} 404`);
  try {
    const body = await fsp.readFile(path.join(DIST, "404.html"));
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

async function serveStatic(req, res, rawUrl) {
  let rel;
  try {
    rel = decodeURIComponent(rawUrl.split("?")[0]);
  } catch {
    return notFound(req, res); // malformed percent-encoding
  }
  if (rel.endsWith("/")) rel += "index.html";

  const target = path.join(DIST, rel);
  // containment check -- path.join normalises "..", this rejects any escape
  if (target !== DIST && !target.startsWith(DIST + path.sep)) {
    log(`${req.method} ${rawUrl} 403 (traversal blocked)`);
    res.writeHead(403);
    return res.end();
  }

  let st;
  try {
    st = await fsp.stat(target);
  } catch {
    return notFound(req, res);
  }
  if (st.isDirectory()) return notFound(req, res);

  const type = MIME[path.extname(target).toLowerCase()] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type, "Content-Length": st.size });
  log(`${req.method} ${rawUrl} 200`);
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(target).pipe(res);
}

/* ---------------------------------------------------------------- routing */
const server = http.createServer((req, res) => {
  const url = req.url || "/";
  const pathname = url.split("?")[0];

  if (pathname === "/api/submissions") {
    if (req.method !== "POST") {
      res.writeHead(405, { Allow: "POST" });
      return res.end();
    }
    return handleSubmission(req, res);
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }
  return serveStatic(req, res, url);
});

server.listen(PORT, () => log(`serving ${DIST} on :${PORT} -- submissions -> ${STORE}`));
