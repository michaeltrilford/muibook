export const muiApi = {
  "mui-heading": {
    description: "Renders heading typography with an independently configurable visual size and semantic level.",
    attributes: [
      { name: "size", type: { text: "1 | 2 | 3 | 4 | 5 | 6" }, default: "1", description: "Sets the visual heading size." },
      { name: "level", type: { text: '1 | 2 | 3 | 4 | 5 | 6 | "none"' }, description: "Sets the semantic heading level; defaults to the selected visual size. Use none for display typography that must not enter the document heading outline." },
      { name: "truncate", type: { text: "boolean" }, default: "false", description: "Clamps heading text to a single line with ellipsis when the available width is constrained." },
      { name: "clamp", type: { text: "number" }, description: "Limits heading text to the provided number of lines. Ignored when truncate is present." },
    ],
    slots: [{ name: "", description: "Heading text content." }],
    cssProperties: [
      { name: "--heading-font-family", description: "Font family applied to heading text." },
      { name: "--heading-font-weight", description: "Font weight applied to heading text." },
      { name: "--heading-text-color", description: "Color applied to heading text." },
      { name: "--heading-line-clamp", description: "Resolved number of visible lines used by the clamp attribute." },
    ],
  },
};
