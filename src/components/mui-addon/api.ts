export const muiApi = {
  "mui-addon": {
    description: "Adds compact leading or trailing supporting content to an input control.",
    attributes: [
      {
        name: "slot",
        type: { text: '"before" | "after"' },
        description: "Places the add on before or after content when used within `mui-input`.",
      },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Sets the add on size, normally aligned to the owning input size.",
      },
    ],
    slots: [{ name: "", description: "Text, icon or compact supporting content." }],
    cssProperties: [{ name: "--addon-background", description: "Background color applied to the add on surface." }],
  },
};
