export const muiApi = {
  "mui-slat": {
    description: "Arranges leading and trailing row content with optional action and accessory treatments.",
    attributes: [
      {
        name: "variant",
        type: { text: '"header" | "row" | "action"' },
        description:
          "Sets the slat layout and interactive presentation. Explicitly set variant='row' for standard row slats unless creating a header (variant='header'), interactive action slat (variant='action'), or custom layout; Slat items inside SlatGroup or CardBody require an explicit variant for automatic layout and card alignment.",
      },
      {
        name: "col",
        type: { text: "string" },
        default: "1fr 1fr; action: minmax(0, 1fr) auto",
        description:
          "Sets grid columns using any valid `grid-template-columns` value. Action slats default to `minmax(0, 1fr) auto` so trailing content stays aligned to the end.",
      },
      {
        name: "space",
        type: { text: "string" },
        default: "var(--space-500)",
        description:
          "Sets spacing between slat columns using any valid CSS gap value or token, including action slats.",
      },
      { name: "radius", type: { text: '"none"' }, description: "Removes the button radius for grouped action slats." },
    ],
    slots: [
      { name: "accessory", description: "Optional leading avatar, icon or compact supporting element." },
      { name: "start", description: "Primary row content." },
      { name: "end", description: "Trailing value, status or action content." },
    ],
    cssProperties: [
      { name: "--slat-background", description: "Background color for row and action slats." },
      { name: "--slat-background-hover", description: "Hover background color for action slats." },
      { name: "--slat-radius", description: "Radius applied to row and action slats." },
    ],
  },
  "mui-slat-group": {
    description: "Groups related slats and rules with context-aware alignment spacing.",
    attributes: [
      { name: "usage", type: { text: '"card" | "accordion"' }, description: "Applies spacing and offsets appropriate to card or accordion contexts." },
    ],
    slots: [{ name: "", description: "Related `mui-slat` elements and optional `mui-rule` dividers." }],
  },
};
