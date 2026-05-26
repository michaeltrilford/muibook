export const muiApi = {
  "mui-radio-group": {
    description: "Coordinates a labelled group of `mui-radio` choices and owns the selected value.",
    attributes: [
      { name: "name", type: { text: "string" }, description: "Group name forwarded to descendant radios." },
      { name: "value", type: { text: "string" }, description: "Selected descendant radio value." },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables all descendant radios." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Size forwarded to descendant radios." },
      { name: "label", type: { text: "string" }, description: "Accessible group label." },
      { name: "hide-label", type: { text: "boolean" }, default: "false", description: "Visually hides the group label while retaining its association." },
      { name: "optional", type: { text: "boolean" }, default: "false", description: "Displays an optional marker beside the group label." },
    ],
    slots: [{ name: "", description: "The `mui-radio` options owned by this group." }],
    events: [{ name: "change", description: "Dispatched when group selection changes with `detail.value` and `detail.name`." }],
  },
};
