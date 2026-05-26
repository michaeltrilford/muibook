export const muiApi = {
  "mui-smart-card": {
    description: "Displays a branded payment-style card surface with configurable content and background styling.",
    attributes: [
      { name: "number", type: { text: "string" }, default: "0000", description: "Displays the final visible card number digits." },
      { name: "state", type: { text: '"default" | "frozen"' }, default: "default", description: "Displays normal or frozen card state." },
      { name: "variant", type: { text: '"plain" | "animated"' }, default: "plain", description: "Sets the card background presentation." },
      { name: "partner", type: { text: "string" }, description: "Partner logo image URL." },
      { name: "type", type: { text: "string" }, description: "Card type or scheme label." },
      { name: "logo", type: { text: "string" }, description: "Primary logo image URL." },
      { name: "logo-height", type: { text: "string" }, description: "Sets the primary logo image height using a valid CSS size." },
      { name: "bg-color", type: { text: "string" }, description: "Sets a custom card background color." },
      { name: "bg-image", type: { text: "string" }, description: "Sets a custom card background image URL." },
      { name: "inverted", type: { text: "boolean" }, default: "false", description: "Uses inverted foreground styling for dark or image backgrounds." },
    ],
  },
};
