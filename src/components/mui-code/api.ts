export const muiApi = {
  "mui-code": {
    description: "Displays code or formatted text in a monospace surface.",
    attributes: [
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "x-small", description: "Typography size for the rendered code content." },
      { name: "scrollable", type: { text: "boolean" }, default: "false", description: "Enables horizontal scrolling for non-wrapping content." },
      { name: "wrap", type: { text: "boolean" }, default: "false", description: "Wraps long code content and permits breaks in long values." },
    ],
    slots: [{ name: "", description: "Code or preformatted text content." }],
    cssProperties: [
      { name: "--code-background", description: "Background surface applied to the code block." },
      { name: "--code-text-color", description: "Text color applied to the code content." },
    ],
  },
};
