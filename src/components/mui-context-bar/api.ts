export const muiApi = {
  "mui-context-bar": {
    description:
      "Displays a compact prompt context row in the `context-above` or `context-below` slot of `mui-prompt`, usually for an active task, selected context, steering target, or attached instruction.",
    slots: [
      {
        name: "default",
        description:
          "Primary context summary. Slotted `mui-body`, `mui-link`, `mui-button`, and `mui-status` content is normalized to `size='x-small'`; direct slotted `mui-body` content is truncated by default so the row stays compact.",
      },
      {
        name: "actions",
        description:
          "Optional actions for steering, removing, or opening more options for the context row. Slotted `mui-body`, `mui-link`, `mui-button`, and `mui-status` content is normalized to `size='x-small'`.",
      },
    ],
  },
};
