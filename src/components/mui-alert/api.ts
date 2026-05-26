export const muiApi = {
  "mui-alert": {
    description: "Surfaces task-related feedback with an intent icon, message content and optional action.",
    attributes: [
      {
        name: "variant",
        type: { text: '"positive" | "info" | "warning" | "attention" | "success" | "error"' },
        default: "positive",
        description: "Feedback intent. `success` normalises to `positive`; `error` normalises to `attention`.",
      },
      { name: "label", type: { text: "string" }, description: "Overrides the intent prefix label." },
      { name: "hide-label", type: { text: "boolean" }, default: "false", description: "Hides the visible intent prefix label." },
      { name: "size", type: { text: '"small" | "medium" | "large"' }, default: "medium", description: "Alert density and coordinated icon/action size." },
    ],
    slots: [
      { name: "", description: "Alert message content, including optional inline links." },
      { name: "action", description: "Optional `mui-button` or `mui-link` action aligned and sized for the alert." },
    ],
    cssProperties: [
      { name: "--alert-radius", description: "Alert surface corner radius." },
      { name: "--alert-padding-small", description: "Surface padding for small alerts." },
      { name: "--alert-padding-medium", description: "Surface padding for medium alerts." },
      { name: "--alert-padding-large", description: "Surface padding for large alerts." },
    ],
  },
};
