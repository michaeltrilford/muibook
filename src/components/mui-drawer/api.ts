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
        name: "breakpoint",
        type: { text: "number | string" },
        default: "768",
        description: "Pixel breakpoint where push and persistent layouts switch to their narrow-screen presentation.",
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
      { name: "page", description: "Page content displayed alongside `push` and `persistent` drawer variants." },
    ],
    events: [
      { name: "mui-drawer-open", description: "Dispatched by `open()` when the drawer opens." },
      { name: "mui-drawer-close", description: "Dispatched by `close()` when the drawer closes." },
    ],
    cssProperties: [{ name: "--drawer-background", description: "Drawer surface and footer background." }],
  },
};
