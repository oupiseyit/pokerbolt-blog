import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // "./" so the build can be dropped anywhere on the Pages site.
  base: "./",
  build: {
    // Builds into the repo root, where GitHub Pages serves it from
    // https://oupiseyit.github.io/pokerbolt-blog/app/ — Pages is on the legacy
    // build type from main:/, so a committed folder is a live URL.
    outDir: "../app",
    emptyOutDir: true,
    // Bundle output goes to /bundle so it does not share a folder with the
    // site's own /assets artwork.
    assetsDir: "bundle",
  },
  plugins: [react()],
});
