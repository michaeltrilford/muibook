export const muiApi = {
  "mui-menu": {
    description: "Provides the visual surface and vertical layout for menu actions and grouped overlay content.",
    attributes: [
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Sets Menu geometry and enforces the same size on direct body, action, and form-control content." },
    ],
    slots: [{ name: "", description: "Menu content. Direct body, action, and supported form-control children inherit Menu sizing; rules and custom grouped content remain independently composed." }],
    cssProperties: [
      { name: "--menu-background", description: "Menu surface background." },
      { name: "--menu-border-color", description: "Menu surface border color." },
      { name: "--menu-shadow-color", description: "Menu surface shadow color." },
      { name: "--menu-radius", description: "Menu surface corner radius." },
      { name: "--menu-min-width", description: "Minimum width of the menu surface." },
    ],
  },
};
