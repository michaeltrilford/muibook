export const muiApi = {
  "mui-message": {
    description:
      "Presents a persistent page-level notification with an intent icon, heading, and slotted supporting body content. Use Form Message for form guidance and Body with an info icon for lightweight inline notes.",
    attributes: [
      {
        name: "heading",
        type: { text: "string" },
        default: "Heading...",
        description: "Sets the concise message title. Do not put full body copy here; supporting content belongs in the default slot.",
      },
      { name: "icon", type: { text: "string" }, description: "Overrides the default variant icon with a `mui-icon-*` tag name." },
      {
        name: "variant",
        type: { text: '"neutral" | "positive" | "info" | "warning" | "attention"' },
        default: "neutral",
        description:
          "Sets the page-level intent style and default icon. Reserve positive, warning, and attention for meaningful status or severity, not routine inline emphasis.",
      },
      {
        name: "size",
        type: { text: '"small" | "medium" | "large"' },
        default: "large",
        description: "Controls the message density and typography scale.",
      },
    ],
    slots: [
      {
        name: "",
        description:
          "Required supporting content below the heading. Use `mui-body`, `mui-list`, `mui-link`, or related content; avoid leaving the slot empty.",
      },
    ],
    cssProperties: [
      { name: "--message-padding", description: "Controls the message inset spacing." },
      { name: "--message-gap-horizontal", description: "Controls horizontal spacing between icon and content." },
      { name: "--message-gap-vertical", description: "Controls vertical spacing between stacked content rows." },
      { name: "--message-radius", description: "Controls the message corner radius." },
    ],
  },
};
