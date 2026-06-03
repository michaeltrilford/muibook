export const muiApi = {
  "mui-hint": {
    description: "Displays contextual tooltip content when its trigger receives hover or keyboard focus.",
    attributes: [
      { name: "placement", type: { text: '"top" | "bottom" | "left" | "right"' }, default: "top", description: "Positions the hint relative to its trigger." },
      { name: "open", type: { text: "boolean" }, default: "false", description: "Displays the hint content." },
      { name: "delay", type: { text: "number" }, default: "500", description: "Delay in milliseconds for subsequent openings, clamped between 250 and 2000." },
      { name: "initial-delay", type: { text: "number" }, default: "500", description: "Delay in milliseconds for the first opening, clamped between 250 and 2000." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Sets the inferred size for an unsized icon or badge trigger." },
    ],
    slots: [
      { name: "", description: "Tooltip content." },
      { name: "trigger", description: "Hint trigger content. Plain content receives fallback keyboard focus; already-focusable controls such as mui-button or mui-link keep focus on the control." },
    ],
    cssProperties: [
      { name: "--hint-background", description: "Hint surface background." },
      { name: "--hint-border-color", description: "Hint surface border color." },
      { name: "--hint-focus-outline", description: "Focus-visible outline used when Hint creates fallback focus for plain trigger content." },
      { name: "--hint-focus-outline-offset", description: "Focus-visible outline offset used by the fallback trigger wrapper. Defaults to an outset stroke-size-200 offset." },
      { name: "--hint-focus-radius", description: "Focus-visible outline radius used by the fallback trigger wrapper." },
      { name: "--hint-max-width", description: "Maximum tooltip content width." },
      { name: "--hint-shadow", description: "Hint surface shadow." },
      { name: "--hint-text-color", description: "Hint content text color." },
    ],
  },
};
