// vite.create-mui-app.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "src/create-mui-app"),
  base: "/create-mui-app/", // needed for GitHub Pages
  build: {
    outDir: path.resolve(__dirname, "dist/create-mui-app"),
    rollupOptions: {
      input: path.resolve(__dirname, "src/create-mui-app/index.html"),
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "create-mui-app.css";
          }
          return assetInfo.name!;
        },
      },
    },
    emptyOutDir: true,
  },
});
