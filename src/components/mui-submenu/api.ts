export const muiApi = {
  "mui-submenu": {
    description: "Reveals a portalled, viewport-aware nested Menu from a Button trigger.",
    attributes: [
      {
        name: "size",
        type: "x-small | small | medium | large",
        default: "medium",
        description: "Sets the trigger and nested Menu size. A parent Menu automatically enforces its own size.",
      },
    ],
    slots: [
      {
        name: "",
        description: "A direct Button trigger followed by the direct Menu containing the nested actions. Submenu supplies the trigger treatment and chevron.",
      },
    ],
  },
};
