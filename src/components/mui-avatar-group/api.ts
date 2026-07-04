export const muiApi = {
  "mui-avatar-group": {
    description: "Stacks multiple avatars with controlled overlap and a separating ring.",
    attributes: [
      {
        name: "size",
        type: { text: '"xxx-small" | "xx-small" | "x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Default size applied to slotted avatars that do not declare their own size.",
      },
      {
        name: "overlap",
        type: { text: '"loose" | "tight" | "compact"' },
        default: "tight",
        description: "Controls how strongly avatars overlap each other.",
      },
      {
        name: "fan",
        type: { text: "boolean" },
        description: "Expands the stacked avatars on hover or keyboard focus within the group.",
      },
      {
        name: "label",
        type: { text: "string" },
        default: "Avatar group",
        description: "Accessible label for the grouped avatars.",
      },
    ],
    slots: [{ name: "", description: "One or more `mui-avatar` elements." }],
    cssProperties: [
      { name: "--avatar-group-ring-color", description: "Ring color used to separate overlapping avatars. Defaults to the current surface and is adjusted in supported card and slat contexts." },
      { name: "--avatar-group-ring-width", description: "Width of the separating ring around each avatar." },
      { name: "--avatar-group-overlap", description: "Manual overlap distance between avatars." },
      { name: "--avatar-group-fan-overlap", description: "Overlap distance used when `fan` is active and the group is hovered or focused." },
      { name: "--avatar-group-transition", description: "Transition used when avatars fan in or out." },
    ],
  },
};
