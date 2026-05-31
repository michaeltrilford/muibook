export const muiApi = {
  "mui-chip-rail": {
    description: "Displays a horizontal rail of chips with scroll overflow controls and edge masking.",
    attributes: [
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Controls rail action sizing and pushes the same size to slotted `mui-chip` items.",
      },
      {
        name: "bleed",
        type: { text: '"none" | "000" | "025" | "050" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | CSS length' },
        default: "none",
        description: "Sets the inline bleed size shorthand. Token values map to `--space-*`; raw CSS values are also supported.",
      },
      {
        name: "bleed-inline-size",
        type: { text: '"none" | "000" | "025" | "050" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | CSS length' },
        default: "none",
        description: "Controls the inline bleed padding and edge mask reach.",
      },
      {
        name: "bleed-block-size",
        type: { text: '"none" | "000" | "025" | "050" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | CSS length' },
        default: "none",
        description: "Controls the block bleed padding around the rail.",
      },
      {
        name: "aria-label",
        type: { text: "string" },
        default: "Chip rail",
        description: "Labels the scrollable chip rail for assistive technology.",
      },
      {
        name: "skip-label",
        type: { text: "string" },
        default: "Skip",
        description: "Label for the keyboard-only skip chip that appears when tabbed to.",
      },
    ],
    slots: [{ name: "", description: "Chip items. Usually `mui-chip` elements." }],
    cssProperties: [
      {
        name: "--chip-rail-background",
        description: "Background used by the edge masks to cover scrolling chips underneath the arrows.",
      },
      {
        name: "--chip-rail-action-size",
        description: "Controls the internal width and height of the previous/next rail actions. Defaults to the medium chip height.",
      },
      {
        name: "--chip-rail-focus-scroll-margin-inline",
        description: "Safe inline scroll margin for focused slotted items so keyboard focus does not sit under the rail action and edge mask.",
      },
    ],
  },
};
