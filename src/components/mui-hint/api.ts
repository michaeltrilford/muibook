export const muiApi = {
  "mui-hint": {
    description: "Displays contextual tooltip content when its trigger receives hover or keyboard focus.",
    attributes: [
      { name: "placement", type: { text: '"top" | "bottom" | "left" | "right"' }, default: "top", description: "Positions the hint relative to its trigger." },
      { name: "open", type: { text: "boolean" }, default: "false", description: "Displays the hint content." },
      { name: "delay", type: { text: "number" }, default: "1500", description: "Delay in milliseconds for subsequent openings, clamped between 1000 and 2000." },
      { name: "initial-delay", type: { text: "number" }, default: "1500", description: "Delay in milliseconds for the first opening, clamped between 1000 and 2000." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Sets the inferred size for an unsized icon or badge trigger." },
    ],
    slots: [
      { name: "", description: "Tooltip content." },
      { name: "trigger", description: "Interactive hint trigger, typically an icon or badge." },
    ],
    cssProperties: [{ name: "--hint-max-width", description: "Maximum tooltip content width." }],
  },
};
