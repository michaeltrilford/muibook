// vite.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: {
        // ACCORDION
        "mui-accordion/group": path.resolve(__dirname, "src/components/mui-accordion/group"),
        "mui-accordion/inline": path.resolve(__dirname, "src/components/mui-accordion/inline"),
        "mui-accordion/block": path.resolve(__dirname, "src/components/mui-accordion/block"),
        // ADDON
        "mui-addon": path.resolve(__dirname, "src/components/mui-addon"),
        // ALERT
        "mui-alert": path.resolve(__dirname, "src/components/mui-alert"),
        // BADGE
        "mui-badge": path.resolve(__dirname, "src/components/mui-badge"),
        // BODY
        "mui-body": path.resolve(__dirname, "src/components/mui-body"),
        // BUTTON
        "mui-button": path.resolve(__dirname, "src/components/mui-button"),
        // BUTTON GROUP
        "mui-button-group": path.resolve(__dirname, "src/components/mui-button-group"),
        // CARD
        "mui-card/card": path.resolve(__dirname, "src/components/mui-card/card"),
        "mui-card/header": path.resolve(__dirname, "src/components/mui-card/header"),
        "mui-card/body": path.resolve(__dirname, "src/components/mui-card/body"),
        "mui-card/footer": path.resolve(__dirname, "src/components/mui-card/footer"),
        // CAROUSEL
        "mui-carousel/controller": path.resolve(__dirname, "src/components/mui-carousel/controller"),
        "mui-carousel/panel": path.resolve(__dirname, "src/components/mui-carousel/panel"),
        // CODE
        "mui-code": path.resolve(__dirname, "src/components/mui-code/index.ts"),
        "mui-container": path.resolve(__dirname, "src/components/mui-container"),
        "mui-field": path.resolve(__dirname, "src/components/mui-field"),
        "mui-file-upload": path.resolve(__dirname, "src/components/mui-file-upload"),
        "mui-grid": path.resolve(__dirname, "src/components/mui-grid"),
        "mui-heading": path.resolve(__dirname, "src/components/mui-heading"),
        // ICONS
        "mui-icon/accessibility": path.resolve(__dirname, "src/components/mui-icons/accessibility.ts"),
        "mui-icon/attention": path.resolve(__dirname, "src/components/mui-icons/attention.ts"),
        "mui-icon/add": path.resolve(__dirname, "src/components/mui-icons/add.ts"),
        "mui-icon/check": path.resolve(__dirname, "src/components/mui-icons/check.ts"),
        "mui-icon/close": path.resolve(__dirname, "src/components/mui-icons/close.ts"),
        "mui-icon/down-chevron": path.resolve(__dirname, "src/components/mui-icons/down-chevron.ts"),
        "mui-icon/globe": path.resolve(__dirname, "src/components/mui-icons/globe.ts"),
        "mui-icon/grid": path.resolve(__dirname, "src/components/mui-icons/grid.ts"),
        "mui-icon/info": path.resolve(__dirname, "src/components/mui-icons/info.ts"),
        "mui-icon/left-arrow": path.resolve(__dirname, "src/components/mui-icons/left-arrow.ts"),
        "mui-icon/left-chevron": path.resolve(__dirname, "src/components/mui-icons/left-chevron.ts"),
        "mui-icon/menu": path.resolve(__dirname, "src/components/mui-icons/menu.ts"),
        "mui-icon/message": path.resolve(__dirname, "src/components/mui-icons/message.ts"),
        "mui-icon/moon": path.resolve(__dirname, "src/components/mui-icons/moon.ts"),
        "mui-icon/notification": path.resolve(__dirname, "src/components/mui-icons/notification.ts"),
        "mui-icon/right-chevron": path.resolve(__dirname, "src/components/mui-icons/right-chevron.ts"),
        "mui-icon/stop": path.resolve(__dirname, "src/components/mui-icons/stop.ts"),
        "mui-icon/subtract": path.resolve(__dirname, "src/components/mui-icons/subtract.ts"),
        "mui-icon/sun": path.resolve(__dirname, "src/components/mui-icons/sun.ts"),
        "mui-icon/toggle": path.resolve(__dirname, "src/components/mui-icons/toggle.ts"),
        "mui-icon/up-arrow": path.resolve(__dirname, "src/components/mui-icons/up-arrow.ts"),
        "mui-icon/up-chevron": path.resolve(__dirname, "src/components/mui-icons/up-chevron.ts"),
        "mui-icon/warning": path.resolve(__dirname, "src/components/mui-icons/warning.ts"),
        // IMAGE
        "mui-image": path.resolve(__dirname, "src/components/mui-image"),
        "mui-input": path.resolve(__dirname, "src/components/mui-input"),
        "mui-link": path.resolve(__dirname, "src/components/mui-link"),
        // LIST
        "mui-list/item": path.resolve(__dirname, "src/components/mui-list/item"),
        "mui-list/list": path.resolve(__dirname, "src/components/mui-list/list"),
        // Message
        "mui-message": path.resolve(__dirname, "src/components/mui-message"),
        // QUOTE
        "mui-quote": path.resolve(__dirname, "src/components/mui-quote"),
        // RESPONSIVE
        "mui-responsive": path.resolve(__dirname, "src/components/mui-responsive"),
        // RULE
        "mui-rule": path.resolve(__dirname, "src/components/mui-rule"),
        // SELECT
        "mui-select": path.resolve(__dirname, "src/components/mui-select"),
        // SLAT
        "mui-slat": path.resolve(__dirname, "src/components/mui-slat"),
        // SMART CARD
        "mui-smart-card": path.resolve(__dirname, "src/components/mui-smart-card"),
        // STACK
        "mui-stack/hstack": path.resolve(__dirname, "src/components/mui-stack/hstack"),
        "mui-stack/vstack": path.resolve(__dirname, "src/components/mui-stack/vstack"),
        // SWITCH
        "mui-switch": path.resolve(__dirname, "src/components/mui-switch"),
        // TABLE
        "mui-table/table": path.resolve(__dirname, "src/components/mui-table/table"),
        "mui-table/cell": path.resolve(__dirname, "src/components/mui-table/cell"),
        "mui-table/row": path.resolve(__dirname, "src/components/mui-table/row"),
        "mui-table/row-group": path.resolve(__dirname, "src/components/mui-table/row-group"),
        // TAB BAR
        "mui-tabs/controller": path.resolve(__dirname, "src/components/mui-tabs/controller"),
        "mui-tabs/item": path.resolve(__dirname, "src/components/mui-tabs/item"),
        "mui-tabs/panel": path.resolve(__dirname, "src/components/mui-tabs/panel"),
        "mui-tabs/tab-bar": path.resolve(__dirname, "src/components/mui-tabs/tab-bar"),
      },
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}/index.js`,
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
