export const muiApi = {
  "mui-message": {
    description: "Presents longer-form guidance or status content with an intent icon, heading, and supporting body content.",
    attributes: [
      { name: "heading", type: { text: "string" }, default: "Heading...", description: "Sets the message heading text." },
      { name: "icon", type: { text: "string" }, description: "Overrides the default variant icon with a `mui-icon-*` tag name." },
      {
        name: "variant",
        type: { text: '"neutral" | "positive" | "info" | "warning" | "attention"' },
        default: "neutral",
        description: "Sets the message intent style and default icon.",
      },
      {
        name: "size",
        type: { text: '"small" | "medium" | "large"' },
        default: "large",
        description: "Controls the message density and typography scale.",
      },
    ],
    slots: [{ name: "", description: "Supports body copy, lists, links, and related message content." }],
    cssProperties: [
      { name: "--message-padding", description: "Controls the message inset spacing." },
      { name: "--message-gap-horizontal", description: "Controls horizontal spacing between icon and content." },
      { name: "--message-gap-vertical", description: "Controls vertical spacing between stacked content rows." },
      { name: "--message-radius", description: "Controls the message corner radius." },
    ],
  },
};
