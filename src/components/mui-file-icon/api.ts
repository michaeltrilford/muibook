export const muiApi = {
  "mui-file-icon": {
    description: "Renders a pinned VSCode Icons file-type SVG from the vscode-icons CDN.",
    attributes: [
      {
        name: "icon",
        type: { text: "FileIconName" },
        description: "Selects a file-type icon key from the pinned vscode-icons list.",
      },
      {
        name: "type",
        type: { text: "FileIconName" },
        description: "Alias for icon, supported for concise file-type usage.",
      },
      {
        name: "size",
        type: { text: '"small" | "medium" | "large"' },
        default: "small",
        description: "Sets the rendered icon footprint using Muibook spacing tokens.",
      },
      {
        name: "label",
        type: { text: "string" },
        description: "Accessible label for the rendered image when it is not decorative.",
      },
      {
        name: "decorative",
        type: { text: "boolean" },
        default: "false",
        description: "Marks the image as decorative and hides it from assistive technology.",
      },
    ],
    cssProperties: [
      {
        name: "--file-icon-filter",
        default: "brightness(1) contrast(1)",
        description: "Applies a theme-aware CSS filter to the internal file icon image.",
      },
    ],
    cssParts: [{ name: "image", description: "The internal img element." }],
  },
};
