export const muiApi = {
  "mui-work-log": {
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
        description: "Adds a trailing rule when Worker is used outside the Chat Message header slot. Top-level header rows draw their divider on the summary row.",
      },
      {
        name: "nested",
        type: { text: "boolean" },
        description: "Applies compact nested work-row treatment. This is also applied automatically when Worker is placed inside another Worker.",
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
        description: "Optional leading status or task icon. Typically used for an activity indicator.",
      },
      {
        name: "before",
        description: "Optional composable area before the main text label.",
      },
      {
        name: "after",
        description: "Optional composable area after the main text label. Can be used for extra actions, badges, etc.",
      },
      {
        name: "default",
        description: "Worker execution detail rows. Renders as accordion content.",
      },
    ],
  },
};
