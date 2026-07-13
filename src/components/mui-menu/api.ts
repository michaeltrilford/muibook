export const muiApi = {
  "mui-menu": {
    description: "Provides the visual surface and vertical layout for menu actions and grouped overlay content.",
    attributes: [
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Sets Menu geometry and enforces the same size on direct body, action, and form-control content." },
      { name: "inset", type: { text: "boolean" }, description: "Applies padding to the Menu content region and prevents direct action and form-control children from stretching to the Menu edge, allowing them to retain their natural border radius." },
      { name: "width", type: { text: "string" }, description: "Sets the Menu width using any valid CSS width value, such as 100% or min(100%, 28rem)." },
    ],
    slots: [
      { name: "", description: "Menu content. Direct body, action, Submenu, and supported form-control children inherit Menu sizing; rules and custom grouped content remain independently composed." },
      { name: "top", description: "Top content with a bottom separator. Direct form controls merge seamlessly into the Menu surface." },
      { name: "bottom", description: "Bottom content with a top separator. Direct form controls merge seamlessly into the Menu surface." },
    ],
    cssProperties: [
      { name: "--menu-background", description: "Menu surface background." },
      { name: "--menu-border-color", description: "Menu surface border color." },
      { name: "--menu-shadow-color", description: "Menu surface shadow color." },
      { name: "--menu-radius", description: "Menu surface corner radius." },
      { name: "--menu-min-width", description: "Minimum width of the menu surface." },
      { name: "--menu-width", description: "Width of the Menu surface. Defaults to max-content and accepts any valid CSS width." },
      { name: "--menu-inset", description: "Resolved size-based inset shared by the content region and direct Menu actions." },
      { name: "--chip-background-menu", description: "Background applied to direct Chip and Chip Input compositions inside Menu." },
      { name: "--menu-inset-padding-block", description: "Block padding applied to the content region when the inset attribute is used." },
      { name: "--menu-inset-padding-inline", description: "Inline padding applied to the content region when the inset attribute is used." },
    ],
  },
};
