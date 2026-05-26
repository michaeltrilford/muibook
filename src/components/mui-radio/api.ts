export const muiApi = {
  "mui-radio": {
    description: "Selects one labelled option, typically coordinated by `mui-radio-group`.",
    attributes: [
      { name: "checked", type: { text: "boolean" }, default: "false", description: "Controls whether this radio is selected." },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables radio interaction." },
      { name: "id", type: { text: "string" }, description: "Identifier for the internal radio control." },
      { name: "name", type: { text: "string" }, description: "Group name. `mui-radio-group` sets this automatically for its children." },
      { name: "value", type: { text: "string" }, description: "Value selected when this radio becomes checked." },
      { name: "aria-label", type: { text: "string" }, description: "Accessible name when no visible slot label is supplied." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Radio control and label size scale." },
    ],
    slots: [{ name: "", description: "Visible label content for the radio option." }],
    events: [{ name: "change", description: "Dispatched when selected with `detail.checked`, `detail.value` and `detail.name`." }],
  },
};
