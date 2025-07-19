// vite.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: {
        // FALLBACK ENTRY POINT
        index: path.resolve(__dirname, "src/index.ts"),
        // ACCORDION
        "components/mui-accordion": path.resolve(__dirname, "src/components/mui-accordion"),
        "components/mui-accordion/group": path.resolve(__dirname, "src/components/mui-accordion/group"),
        "components/mui-accordion/inline": path.resolve(__dirname, "src/components/mui-accordion/inline"),
        "components/mui-accordion/block": path.resolve(__dirname, "src/components/mui-accordion/block"),
        // ADDON
        "components/mui-addon": path.resolve(__dirname, "src/components/mui-addon"),
        // ALERT
        "components/mui-alert": path.resolve(__dirname, "src/components/mui-alert"),
        // BADGE
        "components/mui-badge": path.resolve(__dirname, "src/components/mui-badge"),
        // BODY
        "components/mui-body": path.resolve(__dirname, "src/components/mui-body"),
        // BUTTON
        "components/mui-button": path.resolve(__dirname, "src/components/mui-button"),
        // BUTTON GROUP
        "components/mui-button-group": path.resolve(__dirname, "src/components/mui-button-group"),
        // CARD
        "components/mui-card": path.resolve(__dirname, "src/components/mui-card"),
        "components/mui-card/card": path.resolve(__dirname, "src/components/mui-card/card"),
        "components/mui-card/header": path.resolve(__dirname, "src/components/mui-card/header"),
        "components/mui-card/body": path.resolve(__dirname, "src/components/mui-card/body"),
        "components/mui-card/footer": path.resolve(__dirname, "src/components/mui-card/footer"),
        // CAROUSEL
        "components/mui-carousel": path.resolve(__dirname, "src/components/mui-carousel"),
        "components/mui-carousel/controller": path.resolve(__dirname, "src/components/mui-carousel/controller"),
        "components/mui-carousel/panel": path.resolve(__dirname, "src/components/mui-carousel/panel"),
        // CODE
        "components/mui-code": path.resolve(__dirname, "src/components/mui-code/index.ts"),
        "components/mui-container": path.resolve(__dirname, "src/components/mui-container"),
        "components/mui-field": path.resolve(__dirname, "src/components/mui-field"),
        "components/mui-file-upload": path.resolve(__dirname, "src/components/mui-file-upload"),
        "components/mui-grid": path.resolve(__dirname, "src/components/mui-grid"),
        "components/mui-heading": path.resolve(__dirname, "src/components/mui-heading"),
        // ICONS
        "components/mui-icons": path.resolve(__dirname, "src/components/mui-icons"),
        "components/mui-icons/accessibility": path.resolve(__dirname, "src/components/mui-icons/accessibility.ts"),
        "components/mui-icons/attention": path.resolve(__dirname, "src/components/mui-icons/attention.ts"),
        "components/mui-icons/add": path.resolve(__dirname, "src/components/mui-icons/add.ts"),
        "components/mui-icons/check": path.resolve(__dirname, "src/components/mui-icons/check.ts"),
        "components/mui-icons/close": path.resolve(__dirname, "src/components/mui-icons/close.ts"),
        "components/mui-icons/down-chevron": path.resolve(__dirname, "src/components/mui-icons/down-chevron.ts"),
        "components/mui-icons/globe": path.resolve(__dirname, "src/components/mui-icons/globe.ts"),
        "components/mui-icons/grid": path.resolve(__dirname, "src/components/mui-icons/grid.ts"),
        "components/mui-icons/info": path.resolve(__dirname, "src/components/mui-icons/info.ts"),
        "components/mui-icons/left-arrow": path.resolve(__dirname, "src/components/mui-icons/left-arrow.ts"),
        "components/mui-icons/left-sidebar": path.resolve(__dirname, "src/components/mui-icons/left-sidebar.ts"),
        "components/mui-icons/left-chevron": path.resolve(__dirname, "src/components/mui-icons/left-chevron.ts"),
        "components/mui-icons/menu": path.resolve(__dirname, "src/components/mui-icons/menu.ts"),
        "components/mui-icons/message": path.resolve(__dirname, "src/components/mui-icons/message.ts"),
        "components/mui-icons/moon": path.resolve(__dirname, "src/components/mui-icons/moon.ts"),
        "components/mui-icons/notification": path.resolve(__dirname, "src/components/mui-icons/notification.ts"),
        "components/mui-icons/right-chevron": path.resolve(__dirname, "src/components/mui-icons/right-chevron.ts"),
        "components/mui-icons/stop": path.resolve(__dirname, "src/components/mui-icons/stop.ts"),
        "components/mui-icons/subtract": path.resolve(__dirname, "src/components/mui-icons/subtract.ts"),
        "components/mui-icons/sun": path.resolve(__dirname, "src/components/mui-icons/sun.ts"),
        "components/mui-icons/toggle": path.resolve(__dirname, "src/components/mui-icons/toggle.ts"),
        "components/mui-icons/up-arrow": path.resolve(__dirname, "src/components/mui-icons/up-arrow.ts"),
        "components/mui-icons/up-chevron": path.resolve(__dirname, "src/components/mui-icons/up-chevron.ts"),
        "components/mui-icons/warning": path.resolve(__dirname, "src/components/mui-icons/warning.ts"),
        "components/mui-icons/down-arrow-circle": path.resolve(
          __dirname,
          "src/components/mui-icons/down-arrow-circle.ts"
        ),
        "components/mui-icons/ellipsis": path.resolve(__dirname, "src/components/mui-icons/ellipsis.ts"),
        // IMAGE
        "components/mui-image": path.resolve(__dirname, "src/components/mui-image"),
        "components/mui-input": path.resolve(__dirname, "src/components/mui-input"),
        "components/mui-link": path.resolve(__dirname, "src/components/mui-link"),
        // LIST
        "components/mui-list": path.resolve(__dirname, "src/components/mui-list"),
        "components/mui-list/item": path.resolve(__dirname, "src/components/mui-list/item"),
        "components/mui-list/list": path.resolve(__dirname, "src/components/mui-list/list"),
        // Message
        "components/mui-message": path.resolve(__dirname, "src/components/mui-message"),
        // QUOTE
        "components/mui-quote": path.resolve(__dirname, "src/components/mui-quote"),
        // RESPONSIVE
        "components/mui-responsive": path.resolve(__dirname, "src/components/mui-responsive"),
        // RULE
        "components/mui-rule": path.resolve(__dirname, "src/components/mui-rule"),
        // SELECT
        "components/mui-select": path.resolve(__dirname, "src/components/mui-select"),
        // SLAT
        "components/mui-slat": path.resolve(__dirname, "src/components/mui-slat"),
        // SMART CARD
        "components/mui-smart-card": path.resolve(__dirname, "src/components/mui-smart-card"),
        // STACK
        "components/mui-stack": path.resolve(__dirname, "src/components/mui-stack"),
        "components/mui-stack/hstack": path.resolve(__dirname, "src/components/mui-stack/hstack"),
        "components/mui-stack/vstack": path.resolve(__dirname, "src/components/mui-stack/vstack"),
        // SWITCH
        "components/mui-switch": path.resolve(__dirname, "src/components/mui-switch"),
        // TABLE
        "components/mui-table": path.resolve(__dirname, "src/components/mui-table"),
        "components/mui-table/table": path.resolve(__dirname, "src/components/mui-table/table"),
        "components/mui-table/cell": path.resolve(__dirname, "src/components/mui-table/cell"),
        "components/mui-table/row": path.resolve(__dirname, "src/components/mui-table/row"),
        "components/mui-table/row-group": path.resolve(__dirname, "src/components/mui-table/row-group"),
        // TAB BAR
        "components/mui-tabs": path.resolve(__dirname, "src/components/mui-tabs"),
        "components/mui-tabs/controller": path.resolve(__dirname, "src/components/mui-tabs/controller"),
        "components/mui-tabs/item": path.resolve(__dirname, "src/components/mui-tabs/item"),
        "components/mui-tabs/panel": path.resolve(__dirname, "src/components/mui-tabs/panel"),
        "components/mui-tabs/tab-bar": path.resolve(__dirname, "src/components/mui-tabs/tab-bar"),
        // UTILS
        "utils/part-map": path.resolve(__dirname, "src/utils/part-map"),
        // AGENT
        "agent/keywords": path.resolve(__dirname, "src/agent/keywords"),
        "agent/prompts": path.resolve(__dirname, "src/agent/prompts"),
      },
      formats: ["es"],
      fileName: (_, entryName) => (entryName === "index" ? "index.js" : `${entryName}/index.js`),
    },
    outDir: "dist/esm",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
