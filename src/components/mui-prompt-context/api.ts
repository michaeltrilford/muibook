export const muiApi = {
  "mui-prompt-context": {
    description:
      "Displays a compact prompt context row that can be slotted above `mui-prompt`, usually for an active task, selected context, steering target, or attached instruction.",
    slots: [
      {
        name: "default",
        description: "Primary context summary. Slotted `mui-body` content is truncated by default so the row stays compact.",
      },
      {
        name: "actions",
        description: "Optional actions for steering, removing, or opening more options for the context row.",
      },
    ],
  },
};
