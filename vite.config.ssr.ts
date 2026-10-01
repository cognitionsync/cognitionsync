import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Second Vite build, used only by scripts/prerender.mjs.
 *
 * It emits a Node bundle of the same React tree so the build can render the
 * page to static HTML. Nothing here is served: the output lives in dist-ssr/
 * and the Dockerfile only ever copies client/dist. Kept as its own config
 * because the main one hard-codes a browser outDir and the HTML token plugin,
 * neither of which applies to an SSR bundle.
 */
export default defineConfig({
  root: path.resolve(__dirname, "client"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@config": path.resolve(__dirname, "site.config.ts"),
    },
  },
  build: {
    ssr: path.resolve(__dirname, "client/src/entry-server.tsx"),
    outDir: path.resolve(__dirname, "dist-ssr"),
    emptyOutDir: true,
  },
});
