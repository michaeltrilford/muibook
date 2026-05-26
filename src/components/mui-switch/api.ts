export const muiApi = {
  "mui-switch": {
    description: "Toggles a boolean state with a labelled switch control.",
    members: [
      { kind: "field", name: "checked", type: { text: "boolean" }, description: "Gets or sets the checked state." },
    ],
    attributes: [
      { name: "label", type: { text: "string" }, required: true, description: "Accessible name for the switch control." },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables switch interaction." },
      { name: "checked", type: { text: "boolean" }, default: "false", description: "Controls the selected state of the switch." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "large", description: "Switch control size." },
    ],
    slots: [
      { name: "on-icon", description: "Icon shown for the checked state." },
      { name: "off-icon", description: "Icon shown for the unchecked state." },
    ],
    events: [{ name: "change", description: "Dispatched when user interaction changes the checked state." }],
    cssProperties: [
      { name: "--switch-width-computed", description: "Resolved switch track width; may be overridden for a custom size treatment." },
      { name: "--switch-height-computed", description: "Resolved switch track height; may be overridden for a custom size treatment." },
      { name: "--switch-thumb-size-computed", description: "Resolved switch thumb dimension; may be overridden for a custom size treatment." },
      { name: "--switch-offset-computed", description: "Resolved inset between switch track and thumb." },
    ],
  },
};
