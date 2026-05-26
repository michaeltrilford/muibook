export const muiApi = {
  "mui-list": {
    description: "Groups ordered or unordered list item content.",
    attributes: [
      { name: "as", type: { text: '"ul" | "ol"' }, default: "ul", description: "Sets unordered or ordered marker styling for the list." },
    ],
    slots: [{ name: "", description: "Related `mui-list-item` children." }],
  },
  "mui-list-item": {
    description: "Renders one text item within a `mui-list`.",
    attributes: [
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Sets the list item text size." },
      { name: "weight", type: { text: '"regular" | "medium" | "bold"' }, default: "regular", description: "Sets the list item text weight." },
      { name: "variant", type: { text: "string" }, default: "default", description: "Accepted compatibility attribute; the current list item presentation uses the default text color." },
    ],
    slots: [{ name: "", description: "List item text or inline content." }],
  },
};
