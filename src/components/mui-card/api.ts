export const muiApi = {
  "mui-card": {
    description: "Frames related content in a bordered surface and coordinates spacing with its slotted card sections.",
    attributes: [
      { name: "borderless", type: { text: "boolean" }, default: "false", description: "Removes the card border." },
    ],
    slots: [
      { name: "", description: "Related `mui-card-header`, `mui-card-body`, and `mui-card-footer` sections." },
    ],
    cssProperties: [{ name: "--card-radius", description: "Corner radius applied to the card surface." }],
  },
  "mui-card-header": {
    description: "Displays heading or summary content at the top of a card.",
    slots: [{ name: "", description: "Header content such as headings, text, or actions." }],
  },
  "mui-card-body": {
    description: "Displays the main content area of a card and adapts spacing for known layout components.",
    attributes: [
      {
        name: "size",
        type: { text: '"none" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Controls the Card Body padding. Use none for edge-to-edge content.",
      },
    ],
    slots: [{ name: "", description: "Main card content, including layouts such as tables, slats, and accordions." }],
  },
  "mui-card-footer": {
    description: "Displays supporting actions or code content after the main card body.",
    slots: [{ name: "", description: "Footer actions, links, button groups, or code blocks." }],
  },
};
