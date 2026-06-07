export const muiApi = {
  "mui-drawer": {
    description: "Displays supplementary content as an overlay, push layout or persistent adjacent panel.",
    members: [
      { kind: "method", name: "open", description: "Opens the drawer and dispatches `mui-drawer-open`." },
      { kind: "method", name: "close", description: "Closes the drawer and dispatches `mui-drawer-close`." },
    ],
    attributes: [
      { name: "open", type: { text: "boolean" }, default: "false", description: "Controls drawer visibility." },
      {
        name: "width",
        type: { text: "string" },
        default: "320px",
        description: "Drawer width. Accepts any valid CSS width value.",
      },
      { name: "side", type: { text: '"left" | "right"' }, default: "left", description: "Side from which the drawer is displayed." },
      {
        name: "variant",
        type: { text: '"overlay" | "push" | "persistent"' },
        default: "overlay",
        description: "Layout behaviour: modal overlay, collapsible adjacent page layout, or persistent adjacent layout.",
      },
      {
        name: "z-index",
        type: { text: "number | string" },
        default: "10",
        description: "Overlay stacking value; the drawer surface is rendered one level above it.",
      },
      {
        name: "drawer-space",
        type: { text: "boolean" },
        default: "false",
        description: "Removes default padding from the drawer content region when present.",
      },
      {
        name: "close-size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Sets the built-in header close action size.",
      },
      {
        name: "breakpoint",
        type: { text: "number | string" },
        default: "768",
        description: "Pixel breakpoint where push and persistent layouts switch to their narrow-screen presentation.",
      },
      {
        name: "resize-rail",
        type: { text: "boolean" },
        default: "false",
        description:
          "Adds an opt-in resize rail between the drawer and page for desktop push or persistent drawers. Dragging the rail updates the drawer width while clamping to a minimum drawer width and preserving page space.",
      },
      {
        name: "resize-min-drawer-width",
        type: { text: "number | string" },
        default: "240",
        description: "Minimum drawer width in pixels when resize-rail is enabled.",
      },
      {
        name: "resize-min-page-width",
        type: { text: "number | string" },
        default: "320",
        description: "Minimum page width in pixels preserved while resize-rail is enabled.",
      },
      {
        name: "resize-close-threshold",
        type: { text: "number | string" },
        default: "96",
        description:
          "Push drawer close threshold in pixels. Dragging below resize-min-drawer-width fades the drawer content; releasing below this value closes it while visible width remains clamped.",
      },
    ],
    contextualAttributes: [
      {
        name: "data-close",
        type: { text: "boolean" },
        default: "false",
        description: "Marker applied to a slotted action; integration code uses it to call the owning drawer's `close()` method.",
        appliesTo: "[slot=\"actions\"]",
      },
    ],
    slots: [
      { name: "", description: "Primary scrollable drawer content." },
      { name: "title", description: "Header title content. Providing it reveals the drawer header." },
      { name: "actions", description: "Footer action content. Providing it reveals the fixed footer region." },
      {
        name: "page",
        description:
          "Page region displayed alongside `push` and `persistent` variants. Use a plain `div` as the direct slotted wrapper, then compose Stack or other layout components inside it.",
      },
    ],
    events: [
      { name: "mui-drawer-open", description: "Dispatched by `open()` when the drawer opens." },
      { name: "mui-drawer-close", description: "Dispatched by `close()` when the drawer closes." },
    ],
    cssProperties: [
      { name: "--drawer-background", description: "Drawer surface and footer background." },
      {
        name: "--drawer-resize-rail-threshold-indicator",
        description: "Resize rail indicator color when the push drawer is dragged into the close threshold.",
      },
    ],
  },
};
