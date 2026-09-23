import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // "./" so the build can be dropped anywhere on the Pages site.
  base: "./",
  // Bundle output goes to /bundle, because /assets is the site's artwork
  // (symlinked in from public/) and the two should not share a folder.
  build: { assetsDir: "bundle" },
  plugins: [react()],
});
