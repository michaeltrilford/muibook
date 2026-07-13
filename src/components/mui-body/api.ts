export const muiApi = {
  "mui-body": {
    description: "Renders body text with semantic size, weight and feedback color treatments.",
    attributes: [
      { name: "size", type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Sets the body text size." },
      { name: "weight", type: { text: '"regular" | "medium" | "bold"' }, default: "regular", description: "Sets the body text weight." },
      { name: "variant", type: { text: '"default" | "secondary" | "info" | "positive" | "warning" | "attention"' }, default: "default", description: "Sets the semantic text color treatment." },
      { name: "truncate", type: { text: "boolean" }, default: "false", description: "Clamps body text to a single line with ellipsis when the available width is constrained." },
      { name: "clamp", type: { text: "number" }, description: "Limits body text to the provided number of lines. Ignored when truncate is present." },
    ],
    slots: [
      { name: "", description: "Body text content." },
      { name: "before", description: "Leading icon or badge, automatically aligned to the text size." },
      { name: "after", description: "Trailing icon or badge, automatically aligned to the text size." },
    ],
    cssParts: [{ name: "content", description: "The internal span wrapping the default body text slot." }],
    cssProperties: [
      { name: "--body-inline-icon-offset", description: "Shared vertical alignment offset for slotted inline icons." },
      { name: "--body-inline-icon-offset-x-small", description: "Vertical alignment offset for icons in x-small text." },
      { name: "--body-inline-icon-offset-small", description: "Vertical alignment offset for icons in small text." },
      { name: "--body-inline-icon-offset-medium", description: "Vertical alignment offset for icons in medium text." },
      { name: "--body-inline-icon-offset-large", description: "Vertical alignment offset for icons in large text." },
    ],
  },
};
