export const muiApi = {
  "mui-button-group": {
    description: "Arranges related buttons horizontally or as full-width stacked actions.",
    attributes: [
      {
        name: "layout",
        type: { text: '"row" | "column"' },
        default: "row",
        description: "Controls group direction; column provides full-width stacked actions.",
      },
      {
        name: "align",
        type: { text: '"left" | "right"' },
        default: "left",
        description: "Controls horizontal alignment for row layouts.",
      },
      {
        name: "right",
        type: { text: "boolean" },
        default: "false",
        description: "Legacy right alignment flag. Prefer `align=\"right\"`.",
      },
    ],
    slots: [
      { name: "", description: "Related action controls, typically `mui-button` elements." },
    ],
  },
};
