export const muiApi = {
  "mui-responsive": {
    description: "Switches between slotted layout alternatives at one or two viewport breakpoints.",
    attributes: [
      {
        name: "breakpoint",
        type: { text: "number | string" },
        description: "Single pixel breakpoint for switching between `showBelow` and `showAbove` content.",
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
      { name: "showBelow", description: "Content displayed at or below the active lower or single breakpoint." },
      { name: "showMiddle", description: "Content displayed between `breakpoint-low` and `breakpoint-high`." },
      { name: "showAbove", description: "Content displayed above the active upper or single breakpoint." },
    ],
  },
};
