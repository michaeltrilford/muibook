export const muiApi = {
  "mui-drawer": {
    description:
      "Displays supplementary content as an overlay, push layout, persistent adjacent panel, or workspace shell.",
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
      {
        name: "height",
        type: { text: "string" },
        default: "100dvh",
        description:
          "Drawer layout height. Accepts any valid CSS height value and is useful for contained story, demo, or app regions.",
      },
      {
        name: "side",
        type: { text: '"left" | "right"' },
        default: "left",
        description: "Side from which the drawer is displayed.",
      },
      {
        name: "variant",
        type: { text: '"overlay" | "push" | "persistent" | "workspace"' },
        default: "overlay",
        description:
          "Layout behaviour: modal overlay, collapsible adjacent page layout, persistent adjacent layout, or workspace shell with left and right panels.",
      },
      {
        name: "left-open",
        type: { text: "boolean" },
        default: "false",
        description: "Displays the left panel when variant='workspace'.",
      },
      {
        name: "right-open",
        type: { text: "boolean" },
        default: "false",
        description: "Displays the right panel when variant='workspace'.",
      },
      {
        name: "left-width",
        type: { text: "string" },
        default: "28rem",
        description: "Left panel width when variant='workspace'. Accepts any valid CSS width value.",
      },
      {
        name: "right-width",
        type: { text: "string" },
        default: "32rem",
        description: "Right panel width when variant='workspace'. Accepts any valid CSS width value.",
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
        name: "contained",
        type: { text: "boolean" },
        default: "false",
        description:
          "Keeps narrow-screen push, persistent, and workspace overlay presentation bounded by the drawer container. Use for story canvases, cards, and nested layouts.",
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
        description:
          "Pixel breakpoint where push, persistent or workspace layouts switch to their narrow-screen presentation.",
      },
      {
        name: "mobile-presentation",
        type: { text: '"overlay" | "stack"' },
        default: "overlay",
        description:
          "Narrow-screen presentation for persistent drawers. Overlay keeps the page visible behind a modal side drawer; stack keeps the previous block layout for custom mobile compositions.",
      },
      {
        name: "resize-rail",
        type: { text: "boolean" },
        default: "false",
        description:
          "Adds opt-in desktop resize rails. Push and persistent drawers get a rail between drawer and page; workspace drawers get independent left and right rails. Dragging updates the relevant width while clamping to a minimum drawer width and preserving page space. Focused rails can be nudged with ArrowLeft/ArrowRight, or Shift plus arrow keys for larger steps; when keyboard resizing reaches the minimum width, the rail shows an ESC affordance for closing.",
      },
      {
        name: "resize-min-drawer-width",
        type: { text: "number | string" },
        default: "240",
        description: "Minimum drawer width in pixels when resize-rail is enabled.",
      },
      {
        name: "resize-min-left-width",
        type: { text: "number | string" },
        default: "—",
        description:
          "Minimum left panel width in pixels when resize-rail is enabled on variant='workspace'. Overrides resize-min-drawer-width for the left panel only.",
      },
      {
        name: "resize-min-right-width",
        type: { text: "number | string" },
        default: "—",
        description:
          "Minimum right panel width in pixels when resize-rail is enabled on variant='workspace'. Overrides resize-min-drawer-width for the right panel only.",
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
          "Close threshold in pixels for resizable push and workspace drawers. Dragging below resize-min-drawer-width keeps visible width clamped; releasing below this value closes the drawer or workspace side.",
      },
    ],
    contextualAttributes: [
      {
        name: "data-close",
        type: { text: "boolean" },
        default: "false",
        description:
          "Marker applied to a slotted action; integration code uses it to call the owning drawer's `close()` method.",
        appliesTo: '[slot="actions"]',
      },
    ],
    slots: [
      { name: "", description: "Primary scrollable drawer content." },
      { name: "title", description: "Header title content. Providing it reveals the drawer header." },
      { name: "actions", description: "Footer action content. Providing it reveals the fixed footer region." },
      {
        name: "page",
        description:
          "Page region displayed alongside `push`, `persistent`, and `workspace` variants. Use a plain `div` as the direct slotted wrapper, then compose Stack or other layout components inside it.",
      },
      { name: "left", description: "Left workspace panel content when variant='workspace'." },
      { name: "right", description: "Right workspace panel content when variant='workspace'." },
    ],
    events: [
      { name: "mui-drawer-open", description: "Dispatched by `open()` when the drawer opens." },
      { name: "mui-drawer-close", description: "Dispatched by `close()` when the drawer closes." },
    ],
    cssProperties: [
      { name: "--drawer-background", description: "Drawer surface and footer background." },
      {
        name: "--drawer-height",
        description:
          "Drawer layout height shared by the host, shell, page, and mobile overlay panels. Set through the `height` attribute or directly in CSS.",
      },
      {
        name: "--drawer-resize-rail-size",
        description: "Width of the resize rail when resize-rail is enabled.",
      },
      {
        name: "--drawer-resize-rail-background",
        description: "Background color of the resize rail outer container.",
      },
      {
        name: "--drawer-resize-rail-inner-background",
        description: "Background color of the visual line indicator in the resize rail.",
      },
      {
        name: "--drawer-resize-rail-threshold-indicator",
        description:
          "Resize rail indicator color when a resizable push or workspace drawer is dragged into the close threshold.",
      },
    ],
  },
};
