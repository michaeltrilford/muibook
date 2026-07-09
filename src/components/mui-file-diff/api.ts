export const muiApi = {
  "mui-file-diff": {
    description: "A component representing a file and its diff stats.",
    attributes: [
      {
        name: "filename",
        type: { text: "string" },
        description: "The name of the file.",
      },
      {
        name: "filepath",
        type: { text: "string" },
        description: "The path to the file.",
      },
      {
        name: "additions",
        type: { text: "string" },
        description: "The number of additions.",
      },
      {
        name: "deletions",
        type: { text: "string" },
        description: "The number of deletions.",
      },
    ],
    slots: [
      {
        name: "icon",
        description: "The icon to display next to the file name.",
      },
    ],
  }
};
