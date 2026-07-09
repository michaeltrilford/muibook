export const muiApi = {
  "mui-result-bar": {
    description:
      "Composes a compact card/slat result row for agent outputs, file edits, generated artefacts, review actions, and similar prompt response sections.",
    attributes: [
      {
        name: "variant",
        type: { text: '"default" | "accordion"' },
        default: "default",
        description: "Controls whether the result uses a flat card layout or a collapsible accordion layout.",
      },
      {
        name: "col",
        type: { text: "string" },
        default: "1fr auto",
        description: "Controls the internal slat grid columns when in default layout.",
      },
      { name: "label", type: { text: "string" }, description: "Primary result text when in accordion layout." },
      { name: "open", type: { text: "boolean" }, description: "Whether the accordion is open (accordion layout only)." },
      { name: "rule", type: { text: "boolean" }, description: "Adds a top border rule (accordion layout only)." },
    ],
    slots: [
      { name: "accessory", description: "Optional leading accessory, typically an avatar, icon, or compact visual marker (default layout)." },
      { name: "icon", description: "Optional leading icon or badge (accordion layout)." },
      { name: "start", description: "Primary result content such as title, description, filename, status, or diff summary (default layout)." },
      { name: "after-label", description: "Content immediately following the label, like line diffs (accordion layout)." },
      { name: "actions", description: "Trailing actions such as undo, review, open, approve, or dismiss controls." },
      { name: "content", description: "Accordion detail content, often a list of slats (accordion layout only)." },
    ],
  },
};
