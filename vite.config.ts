// vite.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  server: {
    port: 12000,
    strictPort: true,
    hmr: {
      host: "localhost",
      port: 12000,
      protocol: "ws",
    },
  },
  build: {
    lib: {
      entry: {
        // FALLBACK ENTRY POINT
        index: path.resolve(__dirname, "src/index.ts"),
        // TOKENS (JS OPTION)
        "tokens/js": path.resolve(__dirname, "src/tokens/js/index.ts"),
        // ACCORDION
        "components/mui-accordion": path.resolve(__dirname, "src/components/mui-accordion"),
        "components/mui-accordion/group": path.resolve(__dirname, "src/components/mui-accordion/group"),
        "components/mui-accordion/core": path.resolve(__dirname, "src/components/mui-accordion/core"),
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
        // DROPDOWN
        "components/mui-dropdown": path.resolve(__dirname, "src/components/mui-dropdown"),
        // CARD
        "components/mui-card": path.resolve(__dirname, "src/components/mui-card"),
        "components/mui-card/card": path.resolve(__dirname, "src/components/mui-card/card"),
        "components/mui-card/header": path.resolve(__dirname, "src/components/mui-card/header"),
        "components/mui-card/body": path.resolve(__dirname, "src/components/mui-card/body"),
        "components/mui-card/footer": path.resolve(__dirname, "src/components/mui-card/footer"),
        // CHIP
        "components/mui-chip": path.resolve(__dirname, "src/components/mui-chip"),
        // CAROUSEL
        "components/mui-carousel": path.resolve(__dirname, "src/components/mui-carousel"),
        "components/mui-carousel/controller": path.resolve(__dirname, "src/components/mui-carousel/controller"),
        "components/mui-carousel/panel": path.resolve(__dirname, "src/components/mui-carousel/panel"),
        // CODE
        "components/mui-code": path.resolve(__dirname, "src/components/mui-code/index.ts"),
        // MARKDOWN
        "components/mui-markdown": path.resolve(__dirname, "src/components/mui-markdown"),
        "components/mui-container": path.resolve(__dirname, "src/components/mui-container"),
        "components/mui-field": path.resolve(__dirname, "src/components/mui-field"),
        "components/mui-form-section": path.resolve(__dirname, "src/components/mui-form-section"),
        "components/mui-form-section-footer": path.resolve(__dirname, "src/components/mui-form-section-footer"),
        "components/mui-form-group": path.resolve(__dirname, "src/components/mui-form-group"),
        "components/mui-form-message": path.resolve(__dirname, "src/components/mui-form-message"),
        "components/mui-form-hint": path.resolve(__dirname, "src/components/mui-form-hint"),
        "components/mui-hint": path.resolve(__dirname, "src/components/mui-hint"),
        "components/mui-prompt": path.resolve(__dirname, "src/components/mui-prompt"),
        "components/mui-prompt-toggle": path.resolve(__dirname, "src/components/mui-prompt-toggle"),
        "components/mui-prompt-message": path.resolve(__dirname, "src/components/mui-prompt-message"),
        "components/mui-prompt-preview": path.resolve(__dirname, "src/components/mui-prompt-preview"),
        "components/mui-file-upload": path.resolve(__dirname, "src/components/mui-file-upload"),
        "components/mui-grid": path.resolve(__dirname, "src/components/mui-grid"),
        "components/mui-heading": path.resolve(__dirname, "src/components/mui-heading"),
        // DIALOG
        "components/mui-dialog": path.resolve(__dirname, "src/components/mui-dialog"),
        // DRAWER
        "components/mui-drawer": path.resolve(__dirname, "src/components/mui-drawer"),
        // ICONS
        "components/mui-icons": path.resolve(__dirname, "src/components/mui-icons"),
        "components/mui-icons/ai": path.resolve(__dirname, "src/components/mui-icons/ai.ts"),
        "components/mui-icons/accessibility": path.resolve(__dirname, "src/components/mui-icons/accessibility.ts"),
        "components/mui-icons/attention": path.resolve(__dirname, "src/components/mui-icons/attention.ts"),
        "components/mui-icons/exclamationmark": path.resolve(__dirname, "src/components/mui-icons/exclamationmark.ts"),
        "components/mui-icons/add": path.resolve(__dirname, "src/components/mui-icons/add.ts"),
        "components/mui-icons/check": path.resolve(__dirname, "src/components/mui-icons/check.ts"),
        "components/mui-icons/close": path.resolve(__dirname, "src/components/mui-icons/close.ts"),
        "components/mui-icons/calendar": path.resolve(__dirname, "src/components/mui-icons/calendar.ts"),
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
        "components/mui-icons/spinner": path.resolve(__dirname, "src/components/mui-icons/spinner.ts"),
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
        "components/mui-icons/gear": path.resolve(__dirname, "src/components/mui-icons/gear.ts"),
        "components/mui-icons/translate": path.resolve(__dirname, "src/components/mui-icons/translate.ts"),
        "components/mui-icons/home": path.resolve(__dirname, "src/components/mui-icons/home.ts"),
        "components/mui-icons/play-stack": path.resolve(__dirname, "src/components/mui-icons/play-stack.ts"),
        "components/mui-icons/game-controller": path.resolve(__dirname, "src/components/mui-icons/game-controller.ts"),
        "components/mui-icons/movie-clapper": path.resolve(__dirname, "src/components/mui-icons/movie-clapper.ts"),
        "components/mui-icons/music-microphone": path.resolve(
          __dirname,
          "src/components/mui-icons/music-microphone.ts"
        ),
        "components/mui-icons/music-quarter-note": path.resolve(
          __dirname,
          "src/components/mui-icons/music-quarter-note.ts"
        ),
        "components/mui-icons/play-rectangle": path.resolve(__dirname, "src/components/mui-icons/play-rectangle.ts"),
        "components/mui-icons/list-and-film": path.resolve(__dirname, "src/components/mui-icons/list-and-film.ts"),
        "components/mui-icons/search": path.resolve(__dirname, "src/components/mui-icons/search.ts"),
        "components/mui-icons/checkmark": path.resolve(__dirname, "src/components/mui-icons/checkmark.ts"),
        "components/mui-icons/rectangle-media-text": path.resolve(
          __dirname,
          "src/components/mui-icons/rectangle-media-text.ts"
        ),
        "components/mui-icons/rectangle": path.resolve(__dirname, "src/components/mui-icons/rectangle.ts"),
        "components/mui-icons/rectangle-dashed": path.resolve(
          __dirname,
          "src/components/mui-icons/rectangle-dashed.ts"
        ),
        "components/mui-icons/rectangle-left-drawer": path.resolve(
          __dirname,
          "src/components/mui-icons/rectangle-left-drawer.ts"
        ),
        "components/mui-icons/rectangle-bottom-panel": path.resolve(
          __dirname,
          "src/components/mui-icons/rectangle-bottom-panel.ts"
        ),
        "components/mui-icons/pin": path.resolve(__dirname, "src/components/mui-icons/pin.ts"),
        "components/mui-icons/pin-slash": path.resolve(__dirname, "src/components/mui-icons/pin-slash.ts"),
        "components/mui-icons/text-below-folder": path.resolve(
          __dirname,
          "src/components/mui-icons/text-below-folder.ts"
        ),
        // AVATAR
        "components/mui-avatar": path.resolve(__dirname, "src/components/mui-avatar"),
        // IMAGE
        "components/mui-image": path.resolve(__dirname, "src/components/mui-image"),
        // INPUT
        "components/mui-input": path.resolve(__dirname, "src/components/mui-input"),
        // CHIP INPUT
        "components/mui-chip-input": path.resolve(__dirname, "src/components/mui-chip-input"),
        // TEXTAREA
        "components/mui-textarea": path.resolve(__dirname, "src/components/mui-textarea"),
        // CHECKBOX
        "components/mui-checkbox": path.resolve(__dirname, "src/components/mui-checkbox"),
        // RADIO
        "components/mui-radio": path.resolve(__dirname, "src/components/mui-radio"),
        "components/mui-radio-group": path.resolve(__dirname, "src/components/mui-radio-group"),
        // LINK
        "components/mui-link": path.resolve(__dirname, "src/components/mui-link"),
        // LIST
        "components/mui-list": path.resolve(__dirname, "src/components/mui-list"),
        "components/mui-list/item": path.resolve(__dirname, "src/components/mui-list/item"),
        "components/mui-list/list": path.resolve(__dirname, "src/components/mui-list/list"),
        // LOADING
        "components/mui-loader": path.resolve(__dirname, "src/components/mui-loader"),
        "components/mui-spinner": path.resolve(__dirname, "src/components/mui-spinner"),
        // Message
        "components/mui-message": path.resolve(__dirname, "src/components/mui-message"),
        // PROGRESS
        "components/mui-progress": path.resolve(__dirname, "src/components/mui-progress"),
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
        "components/mui-slat/slat": path.resolve(__dirname, "src/components/mui-slat/slat"),
        "components/mui-slat/group": path.resolve(__dirname, "src/components/mui-slat/group"),
        // SMART CARD
        "components/mui-smart-card": path.resolve(__dirname, "src/components/mui-smart-card"),
        // STACK
        "components/mui-stack": path.resolve(__dirname, "src/components/mui-stack"),
        "components/mui-stack/hstack": path.resolve(__dirname, "src/components/mui-stack/hstack"),
        "components/mui-stack/vstack": path.resolve(__dirname, "src/components/mui-stack/vstack"),
        // STEPPER
        "components/mui-stepper": path.resolve(__dirname, "src/components/mui-stepper"),
        "components/mui-stepper/stepper": path.resolve(__dirname, "src/components/mui-stepper/stepper"),
        "components/mui-stepper/step": path.resolve(__dirname, "src/components/mui-stepper/step"),
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
