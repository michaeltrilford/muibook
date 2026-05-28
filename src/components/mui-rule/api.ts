export const muiApi = {
  "mui-rule": {
    description: "Displays a horizontal or vertical divider with configurable length and weight.",
    attributes: [
      { name: "direction", type: { text: '"horizontal" | "vertical"' }, default: "horizontal", description: "Sets divider orientation." },
      { name: "length", type: { text: "string" }, default: "100%", description: "Sets divider length using any valid CSS size value." },
      {
        name: "weight",
        type: { text: '"thin" | "thick" | string' },
        default: "thin",
        description:
          "Sets divider thickness. Use `thin`, `thick`, or any valid CSS size value.",
      },
    ],
  },
};
