export const muiApi = {
  "mui-header-bar": {
    description:
      "A standalone Web Component for top application shell and workspace page headers, with drawer-aligned side columns, token-bound heights, surface variants, and optional resize rails.",
    attributes: [
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Sets header height via design tokens (--header-min-height-*).",
      },
      {
        name: "left-width",
        type: { text: "string" },
        default: "280px",
        description: "CSS width for the left drawer-aligned header column. Accepts any valid CSS width value.",
      },
      {
        name: "right-width",
        type: { text: "string" },
        default: "auto",
        description: "CSS width for the right drawer/panel-aligned header column. Accepts any valid CSS width value.",
      },
      {
        name: "bottom-border",
        type: { text: "boolean" },
        default: "true",
        description: "Applies a bottom separating border (border-bottom: var(--border-thin)). Set to false to remove.",
      },
      {
        name: "surface",
        type: { text: '"default" | "transparent"' },
        default: "default",
        description: "Controls header background surface styling. Default uses var(--surface-elevated-100).",
      },
      {
        name: "resize-rail",
        type: { text: "boolean" },
        default: "false",
        description: "Adds keyboard-accessible drag rail grid tracks between populated side columns and the main header region.",
      },
      {
        name: "resize-min-column-width",
        type: { text: "number | string" },
        default: "240",
        description: "Minimum left or right header column width in pixels while resizing.",
      },
      {
        name: "resize-min-main-width",
        type: { text: "number | string" },
        default: "320",
        description: "Minimum main header region width preserved while resizing a side column.",
      },
    ],
    slots: [
      {
        name: "left",
        description:
          "Left drawer-aligned header column (commonly menu toggle button, brand logo, and product identity). Renders a right border when present unless resize-rail owns the separator track.",
      },
      {
        name: "",
        description: "Main page-aligned header region (search input, page title, primary header actions).",
      },
      {
        name: "right",
        description:
          "Right panel-aligned header column (profile menu, workspace status, custom action group). Renders a left border when present unless resize-rail owns the separator track.",
      },
    ],
    events: [
      {
        name: "mui-header-bar-resize-start",
        description: "Dispatched when pointer resizing starts so synchronized layouts can suspend width transitions.",
      },
      {
        name: "mui-header-bar-resize",
        description: "Dispatched while a resize rail changes a side column. Detail contains side, CSS width, and numeric value.",
      },
      {
        name: "mui-header-bar-resize-end",
        description: "Dispatched when pointer resizing ends so synchronized layouts can restore width transitions.",
      },
    ],
    cssParts: [{ name: "resize-rail", description: "Resize rail control shown at populated side-column boundaries." }],
    cssProperties: [
      { name: "--header-bar-background", description: "Header Bar surface background override." },
      { name: "--header-bar-current-height", description: "Resolved Header Bar height inherited by Buttons using usage='header-bar'." },
      { name: "--header-min-height-x-small", description: "Minimum Header Bar height when size is x-small." },
      { name: "--header-min-height-small", description: "Minimum Header Bar height when size is small." },
      { name: "--header-min-height-medium", description: "Minimum Header Bar height when size is medium or omitted." },
      { name: "--header-min-height-large", description: "Minimum Header Bar height when size is large." },
      { name: "--drawer-resize-rail-size", description: "Shared Drawer and Header Bar resize rail track width." },
      { name: "--drawer-resize-rail-background", description: "Shared resize rail track background." },
      { name: "--drawer-resize-rail-inner-background", description: "Shared resize rail line background." },
    ],
  },
};
