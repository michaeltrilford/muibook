export const muiApi = {
  "mui-h-stack": {
    description: "Arranges slotted content horizontally with token-based spacing and alignment controls.",
    attributes: [
      { name: "space", type: { text: "string" }, default: "var(--space-500)", description: "Gap between children. Accepts any valid CSS gap value or design token." },
      { name: "padding", type: { text: "string" }, default: "var(--space-000)", description: "Padding applied inside the stack. Accepts any valid CSS padding value or design token." },
      { name: "alignx", type: { text: "string" }, default: "flex-start", description: "Horizontal alignment of children, mapped to flex `justify-content`." },
      { name: "aligny", type: { text: "string" }, default: "flex-start", description: "Vertical alignment of children, mapped to flex `align-items`." },
      { name: "height", type: { text: "string" }, description: "Sets the host height. Accepts any valid CSS height value, including tokens." },
      { name: "width", type: { text: "string" }, description: "Sets the host width. Accepts any valid CSS width value, including tokens." },
      { name: "viewport", type: { text: "boolean" }, default: "false", description: "Sets stack height to `100dvh`. Intended for a top-level stack that owns the viewport-height region." },
      { name: "fill", type: { text: "boolean" }, default: "false", description: "Sets width and height to `100%` when the parent supplies a clearly bounded layout region." },
    ],
    slots: [{ name: "", description: "Content arranged horizontally inside the stack." }],
    cssProperties: [
      { name: "--stack-height", description: "Resolved stack host height. Prefer the `height`, `viewport`, or `fill` attributes for common layouts." },
      { name: "--stack-width", description: "Resolved stack host width. Prefer the `width` or `fill` attributes for common layouts." },
    ],
  },
  "mui-v-stack": {
    description: "Arranges slotted content vertically with token-based spacing and alignment controls.",
    attributes: [
      { name: "space", type: { text: "string" }, default: "var(--space-500)", description: "Gap between children. Accepts any valid CSS gap value or design token." },
      { name: "padding", type: { text: "string" }, default: "var(--space-000)", description: "Padding applied inside the stack. Accepts any valid CSS padding value or design token." },
      { name: "alignx", type: { text: "string" }, default: "normal", description: "Horizontal alignment of children, mapped to grid `justify-items`." },
      { name: "aligny", type: { text: "string" }, default: "normal", description: "Vertical alignment of children, mapped to grid `align-items`." },
      { name: "height", type: { text: "string" }, description: "Sets the host height. Accepts any valid CSS height value, including tokens." },
      { name: "width", type: { text: "string" }, description: "Sets the host width. Accepts any valid CSS width value, including tokens." },
      { name: "viewport", type: { text: "boolean" }, default: "false", description: "Sets stack height to `100dvh`. Intended for a top-level stack that owns the viewport-height region." },
      { name: "fill", type: { text: "boolean" }, default: "false", description: "Sets width and height to `100%` when the parent supplies a clearly bounded layout region." },
    ],
    slots: [{ name: "", description: "Content arranged vertically inside the stack." }],
    cssProperties: [
      { name: "--stack-height", description: "Resolved stack host height. Prefer the `height`, `viewport`, or `fill` attributes for common layouts." },
      { name: "--stack-width", description: "Resolved stack host width. Prefer the `width` or `fill` attributes for common layouts." },
    ],
  },
};
