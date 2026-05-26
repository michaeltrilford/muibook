export const muiApi = {
  "mui-slat": {
    description: "Arranges leading and trailing row content with optional action and accessory treatments.",
    attributes: [
      { name: "variant", type: { text: '"header" | "row" | "action"' }, description: "Sets the slat layout and interactive presentation." },
      { name: "col", type: { text: "string" }, default: "1fr 1fr", description: "Sets grid columns using any valid `grid-template-columns` value." },
      { name: "space", type: { text: "string" }, default: "var(--space-500)", description: "Sets spacing between slat columns using any valid CSS gap value or token." },
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
