export const muiApi = {
  "mui-prompt-result": {
    description:
      "Composes a compact card/slat result row for agent outputs, file edits, generated artefacts, review actions, and similar prompt response sections.",
    attributes: [
      {
        name: "col",
        type: { text: "string" },
        default: "1fr auto",
        description: "Controls the internal slat grid columns.",
      },
    ],
    slots: [
      { name: "accessory", description: "Optional leading accessory, typically an avatar, icon, or compact visual marker." },
      { name: "start", description: "Primary result content such as title, description, filename, status, or diff summary." },
      { name: "actions", description: "Trailing actions such as undo, review, open, approve, or dismiss controls." },
    ],
  },
};
