export const muiApi = {
  "mui-badge": {
    description:
      "Displays compact, non-interactive presentational labels, counts, or lightweight metadata. Use for labels such as Paid, Busy, Offline, Beta, Default, or Shared when they support the surrounding UI rather than acting as the primary state field for a record.",
    attributes: [
      {
        name: "variant",
        type: { text: '"neutral" | "positive" | "warning" | "attention" | "overlay"' },
        default: "neutral",
        description:
          "Sets the badge intent style for lightweight non-interactive metadata. Use Status when the value is the primary state of an object, record, workflow, or system.",
      },
      {
        name: "size",
        type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description:
          "Controls the badge scale so it can sit inside cards, messages, nav, controls, and other presentational surfaces.",
      },
      {
        name: "color",
        type: {
          text: '"grey" | "purple" | "violet" | "pink" | "magenta" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | string',
        },
        description:
          "Overrides the badge background only. Accepts a named categorical colour or a custom CSS background value.",
      },
      {
        name: "usage",
        type: { text: '"slat-end"' },
        description: "Applies layout-specific styling for supported parent patterns.",
      },
    ],
    slots: [{ name: "", description: "Badge text content." }],
    cssProperties: [
      { name: "--badge-radius", description: "Controls the badge corner radius." },
      { name: "--badge-font-weight", description: "Controls the badge text weight." },
      { name: "--badge-background", description: "Overrides the badge background when no color attribute is set." },
      {
        name: "--badge-background-[color]",
        description:
          "Named standalone badge backgrounds used by color='grey|purple|violet|pink|magenta|red|orange|amber|yellow|lime|green|teal|cyan|blue|indigo'.",
      },
    ],
  },
};
