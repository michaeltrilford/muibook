// vite.create-app.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "src/create-app"),
  base: "/create-app/", // needed for GitHub Pages
  build: {
    outDir: path.resolve(__dirname, "dist/create-app"),
    rollupOptions: {
      input: path.resolve(__dirname, "src/create-app/index.html"),
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "create-app.css";
          }
          return assetInfo.name!;
        },
      },
    },
    emptyOutDir: true,
  },
});
