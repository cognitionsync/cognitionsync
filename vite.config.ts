import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Deployed as a GitHub Pages *project* site at
// https://cognitionsync.github.io/cognitionsync/ , so production assets must be
// served from the "/cognitionsync/" base. Local dev stays at "/".
const REPO_BASE = "/cognitionsync/";

export default defineConfig(({ command }) => ({
  root: path.resolve(__dirname, "client"), // tells Vite where source lives
  base: command === "build" ? REPO_BASE : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "client/dist"), // ✅ stays inside client
    emptyOutDir: true,
  },
}));