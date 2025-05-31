// vite.muibook.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".", // make sure Vite looks from project root
  build: {
    outDir: "dist/muibook", // output folder for demo site
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "muibook.css"; // name your bundled CSS
          }
          return assetInfo.name!;
        },
      },
    },
  },
});
