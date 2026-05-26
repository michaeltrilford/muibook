export const muiApi = {
  "mui-field": {
    description: "Wraps a form control with shared label, sizing, and message feedback behavior.",
    attributes: [
      { name: "variant", type: { text: '"default" | "info" | "success" | "warning" | "error"' }, default: "default", description: "Message feedback state. `info` displays non-blocking informational guidance." },
      { name: "message", type: { text: "string" }, description: "Fallback feedback text rendered below the slotted control." },
      { name: "label", type: { text: "string" }, description: "Label forwarded to the slotted form control." },
      { name: "hide-label", type: { text: "boolean" }, default: "false", description: "Visually hides the forwarded label while preserving its accessible meaning." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Size forwarded to the slotted form control and message content." },
      { name: "optional", type: { text: "boolean" }, default: "false", description: "Marks the field as optional and forwards that state to the slotted control." },
    ],
    slots: [
      { name: "", description: "Primary form control, such as `mui-input`, `mui-select`, or `mui-textarea`." },
      { name: "message", description: "Custom message content displayed beneath the form control." },
    ],
  },
};
