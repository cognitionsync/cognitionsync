# ---- build stage ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Serve from the domain root here, not the GitHub Pages "/cognitionsync/" base.
ARG VITE_BASE=/
ENV VITE_BASE=$VITE_BASE
RUN npm run build

# ---- runtime stage ----
FROM node:22-alpine
WORKDIR /app

# vite.config.ts builds to client/dist
COPY --from=build /app/client/dist ./dist

# Unmatched paths are served 404.html with a real HTTP 404 rather than a
# soft-404 200. The site has a single route, so there is no SPA fallback --
# if real client-side routes are added later, server.js needs to handle them.
RUN cp dist/index.html dist/404.html

# Dependency-free static server, plus POST /api/submissions which appends
# contact-form results to /data/form-submissions.json (a mounted volume).
COPY server.js ./

EXPOSE 3000
CMD ["node", "server.js"]
