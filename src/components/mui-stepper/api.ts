export const muiApi = {
  "mui-stepper": {
    description: "Displays progress across a multi-step flow with optional interactive navigation.",
    attributes: [
      { name: "direction", type: { text: '"horizontal" | "vertical"' }, default: "horizontal", description: "Sets the step flow direction." },
      { name: "active-step", type: { text: "number" }, default: "1", description: "Sets the current active step position." },
      { name: "size", type: { text: '"x-small" | "small" | "medium"' }, default: "medium", description: "Controls the stepper visual scale." },
      { name: "interactive", type: { text: "boolean" }, default: "false", description: "Enables click and keyboard navigation between steps." },
      {
        name: "linear",
        type: { text: "boolean" },
        default: "false",
        description: "Restricts interactive navigation to the current and next available step.",
      },
    ],
    slots: [{ name: "", description: "Accepts one or more `mui-step` children." }],
    events: [{ name: "step-change", description: "Emitted when the active step changes during interactive use." }],
  },
  "mui-step": {
    description: "Defines an individual step inside `mui-stepper` with a title, state, and optional secondary content.",
    attributes: [
      { name: "title", type: { text: "string" }, description: "Sets the step label text." },
      {
        name: "state",
        type: { text: '"upcoming" | "active" | "completed" | "success" | "pending" | "error" | "disabled"' },
        default: "upcoming",
        description: "Overrides the visual state for the individual step.",
      },
      { name: "hide-icon", type: { text: "boolean" }, default: "false", description: "Hides the step state icon and dot marker." },
    ],
    slots: [{ name: "secondary", description: "Secondary supporting content rendered with the step title." }],
    cssProperties: [
      { name: "--stepper-color", description: "Controls the default step text and connector color." },
      { name: "--stepper-success-color", description: "Controls the success state color." },
      { name: "--stepper-error-color", description: "Controls the error state color." },
      {
        name: "--stepper-title-only",
        description: "Controls the vertical title offset when a step has no secondary slot content.",
      },
    ],
  },
};
