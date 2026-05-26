export const muiApi = {
  "mui-heading": {
    description: "Renders a semantic heading with an independently configurable visual size.",
    attributes: [
      { name: "size", type: { text: "1 | 2 | 3 | 4 | 5 | 6" }, default: "1", description: "Sets the visual heading size." },
      { name: "level", type: { text: "1 | 2 | 3 | 4 | 5 | 6" }, description: "Sets the semantic heading level; defaults to the selected visual size." },
    ],
    slots: [{ name: "", description: "Heading text content." }],
    cssProperties: [
      { name: "--heading-font-weight", description: "Font weight applied to heading text." },
      { name: "--heading-text-color", description: "Color applied to heading text." },
    ],
  },
};
