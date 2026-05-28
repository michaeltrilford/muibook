export const muiApi = {
  "mui-form-message": {
    description: "Displays helper or validation copy for a form control with optional semantic icon content.",
    attributes: [
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "small",
        description: "Sets the message text and inferred icon size.",
      },
      {
        name: "weight",
        type: { text: '"regular" | "bold"' },
        default: "regular",
        description: "Sets the message text weight.",
      },
      {
        name: "variant",
        type: { text: '"optional" | "info" | "warning" | "success" | "error"' },
        default: "optional",
        description: "Sets the semantic message color and default icon treatment.",
      },
    ],
    slots: [
      { name: "", description: "Message text or supporting inline content." },
      { name: "before", description: "Leading icon; defaults to an information icon." },
      { name: "after", description: "Optional trailing content." },
    ],
  },
};
