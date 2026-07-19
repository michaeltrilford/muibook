export const muiApi = {
  "mui-responsive": {
    description: "Switches between slotted layout alternatives at one or two viewport or container breakpoints.",
    attributes: [
      {
        name: "variant",
        type: { text: '"viewport" | "container"' },
        default: "viewport",
        description:
          "Chooses whether breakpoints respond to the viewport width or the mui-responsive host container width.",
      },
      {
        name: "observe",
        type: { text: '"self" | "parent" | string' },
        default: "self",
        description:
          "Container query target used with `variant='container'`. Use `parent` for the direct parent, or a selector to observe the closest matching ancestor.",
      },
      {
        name: "breakpoint",
        type: { text: "number | string" },
        description: "Single pixel breakpoint for switching between `show-below` and `show-above` content.",
      },
      {
        name: "breakpoint-low",
        type: { text: "number | string" },
        description: "Lower pixel breakpoint for three-view layouts. Used with `breakpoint-high`.",
      },
      {
        name: "breakpoint-high",
        type: { text: "number | string" },
        description: "Upper pixel breakpoint for three-view layouts. Used with `breakpoint-low`.",
      },
    ],
    slots: [
      { name: "", description: "Content displayed when no breakpoint switching attributes are provided." },
      { name: "show-below", description: "Content displayed at or below the active lower or single breakpoint." },
      { name: "show-middle", description: "Content displayed between `breakpoint-low` and `breakpoint-high`." },
      { name: "show-above", description: "Content displayed above the active upper or single breakpoint." },
    ],
  },
};
