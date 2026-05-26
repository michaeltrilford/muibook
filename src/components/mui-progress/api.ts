export const muiApi = {
  "mui-progress": {
    description: "Displays determinate progress or an indeterminate pending or syncing state.",
    attributes: [
      { name: "progress", type: { text: "number" }, default: "0", description: "Sets determinate progress, clamped from 0 to 100." },
      { name: "state", type: { text: '"pending" | "syncing"' }, description: "Displays an indeterminate state instead of determinate progress." },
    ],
    cssProperties: [
      { name: "--progress-track-background", description: "Background color of the progress track." },
      { name: "--progress-bar-background", description: "Background color of the determinate bar." },
      { name: "--progress-syncing-bar-background", description: "Background color of the syncing indicator." },
      { name: "--progress-radius", description: "Radius applied to the track and progress bar." },
      { name: "--progress-syncing-width", description: "Width of the animated syncing indicator." },
      { name: "--progress-pending-stripe-size", description: "Stripe width used by the pending state." },
    ],
  },
};
