export const muiApi = {
  "mui-accordion-block": {
    description: "Expands a block-level detail region below a generated heading control.",
    attributes: [
      { name: "heading", type: { text: "string" }, default: "Heading...", description: "Visible label for the accordion summary control." },
      { name: "size", type: { text: '"small" | "medium" | "large"' }, default: "medium", description: "Sets summary and detail spacing." },
      { name: "level", type: { text: "1 | 2 | 3 | 4 | 5 | 6" }, default: "3", description: "Semantic heading level for the generated summary label." },
      { name: "detail-space", type: { text: '"none"' }, description: "Removes built-in padding from the expanded detail region." },
    ],
    slots: [{ name: "detail", description: "Content displayed when the accordion is expanded." }],
    events: [{ name: "accordion-opened", description: "Dispatched when the accordion is opened." }],
  },
  "mui-accordion-inline": {
    description: "Expands inline disclosure content below a compact generated heading control.",
    attributes: [
      { name: "heading", type: { text: "string" }, default: "Heading...", description: "Visible label for the accordion summary control." },
      { name: "level", type: { text: "1 | 2 | 3 | 4 | 5 | 6" }, default: "3", description: "Semantic heading level for the generated summary label." },
    ],
    slots: [{ name: "detail", description: "Content displayed when the accordion is expanded." }],
  },
  "mui-accordion-group": {
    description: "Groups accordion blocks and can restrict expanded state to one block at a time.",
    attributes: [
      { name: "exclusive", type: { text: "boolean" }, default: "false", description: "Closes other accordion blocks when a block in the group opens." },
    ],
    slots: [{ name: "", description: "Related `mui-accordion-block` children." }],
  },
  "mui-accordion-core": {
    description: "Provides disclosure behaviour for custom slotted summary and detail content.",
    attributes: [
      { name: "open", type: { text: "boolean" }, default: "false", description: "Displays the slotted detail content." },
    ],
    slots: [
      { name: "summary", description: "Custom interactive summary content." },
      { name: "detail", description: "Content displayed when the accordion is expanded." },
    ],
  },
};
