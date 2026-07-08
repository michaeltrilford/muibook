export const muiApi = {
  "mui-prompt-work": {
    description:
      "Displays a compact expandable work summary for agent responses, such as elapsed work time, steps reviewed, checks run, or supporting execution detail.",
    attributes: [
      {
        name: "label",
        type: { text: "string" },
        default: "Worked",
        description: "Summary text shown in the collapsed row, for example `Worked for 4m 10s`.",
      },
      {
        name: "open",
        type: { text: "boolean" },
        description: "Opens the work detail disclosure by default.",
      },
      {
        name: "rule",
        type: { text: "boolean" },
        description: "Adds a trailing rule when Prompt Work is used outside the Prompt Message header slot. Top-level header rows draw their divider on the summary row.",
      },
      {
        name: "nested",
        type: { text: "boolean" },
        description: "Applies compact nested work-row treatment. This is also applied automatically when Prompt Work is placed inside another Prompt Work.",
      },
      {
        name: "pending",
        type: { text: "boolean" },
        description: "Marks the row as in progress. When combined with `status`, the label uses the Thinking shimmer treatment.",
      },
      {
        name: "status",
        type: { text: "boolean" },
        description: "Renders a non-interactive status row without accordion behavior or toggle icon, useful for Thinking states.",
      },
    ],
    slots: [
      {
        name: "icon",
        description: "Optional icon displayed before the summary label.",
      },
      {
        name: "default",
        description: "Work detail content, usually compact body rows describing reviewed files, applied changes, or checks.",
      },
    ],
  },
};
