export const muiApi = {
  "mui-body": {
    description: "Renders body text with semantic size, weight and feedback color treatments.",
    attributes: [
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Sets the body text size." },
      { name: "weight", type: { text: '"regular" | "medium" | "bold"' }, default: "regular", description: "Sets the body text weight." },
      { name: "variant", type: { text: '"default" | "optional" | "success" | "warning" | "error"' }, default: "default", description: "Sets the semantic text color treatment." },
    ],
    slots: [
      { name: "", description: "Body text content." },
      { name: "before", description: "Leading icon or badge, automatically aligned to the text size." },
      { name: "after", description: "Trailing icon or badge, automatically aligned to the text size." },
    ],
    cssProperties: [
      { name: "--body-inline-icon-offset", description: "Shared vertical alignment offset for slotted inline icons." },
      { name: "--body-inline-icon-offset-x-small", description: "Vertical alignment offset for icons in x-small text." },
      { name: "--body-inline-icon-offset-small", description: "Vertical alignment offset for icons in small text." },
      { name: "--body-inline-icon-offset-medium", description: "Vertical alignment offset for icons in medium text." },
      { name: "--body-inline-icon-offset-large", description: "Vertical alignment offset for icons in large text." },
    ],
  },
};
