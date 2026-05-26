export const muiApi = {
  "mui-loader": {
    description: "Animates slotted content into view for loading and refresh states.",
    attributes: [
      { name: "loading", type: { text: "boolean" }, default: "false", description: "Turns the loader animation behavior on for the slotted content." },
      {
        name: "animation",
        type: { text: '"fade-in" | "pulsate" | "translate"' },
        default: "fade-in",
        description: "Selects the loading transition behavior.",
      },
      {
        name: "direction",
        type: { text: '"up" | "right" | "down" | "left"' },
        default: "up",
        description: "Sets the translate direction when `animation=\"translate\"` is used.",
      },
      { name: "duration", type: { text: "string" }, default: "1s", description: "Sets the animation timing duration." },
    ],
    slots: [{ name: "", description: "The content that adopts the configured loading animation." }],
  },
};
