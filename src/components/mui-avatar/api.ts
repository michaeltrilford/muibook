export const muiApi = {
  "mui-avatar": {
    description: "Displays an image, initials, or slotted icon for a represented person or entity.",
    attributes: [
      { name: "label", type: { text: "string" }, description: "Accessible name and initials source when no image or slotted content is present." },
      { name: "image", type: { text: "string" }, description: "Image URL used when no slotted content is supplied." },
      { name: "size", type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Avatar dimensions. Defaults map `xx-small` to 24px and `x-small` to 32px." },
      {
        name: "background",
        type: {
          text:
            '"neutral" | "positive" | "warning" | "attention" | "purple" | "violet" | "pink" | "magenta" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo"',
        },
        default: "neutral",
        description: "Named semantic or profile color background.",
      },
      { name: "background-color", type: { text: "string" }, description: "Custom CSS color overriding the named background treatment." },
    ],
    slots: [{ name: "", description: "Optional icon or custom visible avatar content." }],
    cssProperties: [
      { name: "--avatar-xxx-small", description: "Dimension for `size=\"xxx-small\"`; defaults to 18px." },
      { name: "--avatar-xx-small", description: "Dimension for `size=\"xx-small\"`; defaults to 24px." },
      { name: "--avatar-x-small", description: "Dimension for `size=\"x-small\"`; defaults to 32px." },
      { name: "--avatar-background-override", description: "Overrides the resolved avatar background color." },
      { name: "--avatar-icon-color", description: "Controls the fill color of slotted icon content inside the avatar. Falls back to currentColor." },
    ],
  },
};
