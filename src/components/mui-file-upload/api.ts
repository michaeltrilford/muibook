export const muiApi = {
  "mui-file-upload": {
    description: "Provides a file picker control that displays the current or newly selected file name.",
    attributes: [
      {
        name: "accepted-file-types",
        type: { text: "string" },
        description: "Comma-separated file extensions or MIME types accepted by the native file picker.",
      },
      {
        name: "current-file-name",
        type: { text: "string" },
        description: "Initial label displayed before a file is selected.",
      },
      {
        name: "acceptedfiletypes",
        type: { text: "string" },
        description: "Compatibility alias for `accepted-file-types`; prefer the kebab-case attribute.",
      },
      {
        name: "currentfilename",
        type: { text: "string" },
        description: "Compatibility alias for `current-file-name`; prefer the kebab-case attribute.",
      },
    ],
    events: [{ name: "file-upload", description: "Composed, bubbling event dispatched when a user selects a file with the selected file in `detail.file`." }],
    methods: [{ name: "focus", description: "Moves focus to the visible file picker control." }],
  },
};
