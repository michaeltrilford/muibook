export const muiApi = {
  "mui-grid": {
    description: "Arranges slotted content in a configurable grid with token-based spacing and alignment controls.",
    attributes: [
      { name: "col", type: { text: "string" }, default: "1fr 1fr", description: "Column template. Accepts any valid CSS `grid-template-columns` value." },
      { name: "space", type: { text: "string" }, default: "var(--space-000)", description: "Gap between grid items. Accepts any valid CSS gap value or design token." },
      { name: "alignx", type: { text: "string" }, default: "normal", description: "Horizontal item alignment, mapped to CSS `justify-items`." },
      { name: "aligny", type: { text: "string" }, default: "normal", description: "Vertical item alignment, mapped to CSS `align-items`." },
      { name: "padding", type: { text: "string" }, default: "var(--space-000)", description: "Padding inside the grid. Accepts any valid CSS padding value or design token." },
      { name: "height", type: { text: "string" }, description: "Sets the host height. Accepts any valid CSS height value, including tokens." },
      { name: "width", type: { text: "string" }, description: "Sets the host width. Accepts any valid CSS width value, including tokens." },
      { name: "viewport", type: { text: "boolean" }, default: "false", description: "Sets grid height to `100dvh` for viewport-height layouts." },
      { name: "fill", type: { text: "boolean" }, default: "false", description: "Sets available width and height to `100%` of the parent layout." },
    ],
    slots: [{ name: "", description: "Content arranged as grid items." }],
    cssProperties: [
      { name: "--grid-height", description: "Resolved grid host height. Prefer `height`, `viewport` or `fill` for common layouts." },
      { name: "--grid-width", description: "Resolved grid host width. Prefer `width` or `fill` for common layouts." },
    ],
  },
};
