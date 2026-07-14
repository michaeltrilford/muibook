export const muiApi = {
  "mui-code": {
    description: "Displays code or formatted text in a monospace surface.",
    attributes: [
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "x-small", description: "Typography size for the rendered code content." },
      { name: "scrollable", type: { text: "boolean" }, default: "false", description: "Enables horizontal scrolling for non-wrapping content." },
      { name: "wrap", type: { text: "boolean" }, default: "false", description: "Wraps long code content and permits breaks in long values." },
      { name: "inline", type: { text: "boolean" }, default: "false", description: "Displays the code snippet inline with surrounding text instead of as a block." },
      { name: "usage", type: { text: '"surface"' }, description: "Applies the contextual code background used inside Card, Drawer, Dialog, or Carousel surfaces." },
    ],
    slots: [{ name: "", description: "Code or preformatted text content." }],
    cssProperties: [
      { name: "--code-background", description: "Default background surface applied to the code block." },
      { name: "--code-background-surface", description: "Background applied when `usage='surface'`; defaults to surface-elevated-200." },
      { name: "--code-text-color", description: "Text color applied to the code content." },
    ],
    customAttributes: [
      { name: "prose-slot", description: "Destination/runtime context attribute applied when inline code is used inside body or list item prose." },
    ],
  },
};
