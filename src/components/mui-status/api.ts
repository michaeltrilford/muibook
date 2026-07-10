export const muiApi = {
  "mui-status": {
    description:
      "Communicates a compact object, record, workflow, or system state with optional before and after icons. Use for state values in tables and slats. Status is non-interactive by default, but can be interactive when composed as a trigger or compact state action.",
    attributes: [
      {
        name: "variant",
        type: { text: '"info" | "positive" | "warning" | "attention"' },
        description:
          "Sets semantic feedback intent and live-region behaviour. Omit variant for the default low-emphasis grey status.",
      },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium"' },
        default: "medium",
        description:
          "Controls the compact scale. Use x-small next to badges or in very dense context rows, small for dense lists, tables, and slats, and medium as the default.",
      },
      {
        name: "color",
        type: {
          text: '"grey" | "purple" | "violet" | "pink" | "magenta" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo"',
        },
        description:
          "Applies a standalone categorical status colour. Use when the status needs a non-semantic category colour rather than feedback intent.",
      },
      {
        name: "action",
        type: { text: "boolean" },
        default: "false",
        description:
          "Makes the status interactive by applying button semantics, keyboard activation, pointer cursor, and focus styling.",
      },
    ],
    slots: [
      { name: "", description: "Status text." },
      { name: "before", description: "Optional leading icon or visual marker that clarifies the state." },
      { name: "after", description: "Optional trailing icon or action indicator." },
    ],
  },
};
