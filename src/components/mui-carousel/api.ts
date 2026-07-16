export const muiApi = {
  "mui-carousel-controller": {
    description: "Coordinates carousel controls and item panels, with optional automatic rotation.",
    attributes: [
      { name: "auto-rotate", type: { text: "boolean" }, default: "false", description: "Cycles through carousel items automatically while visible and not interacted with." },
      { name: "rotate-interval", type: { text: "number" }, default: "10000", description: "Delay between automatic carousel transitions in milliseconds." },
      { name: "borderless", type: { text: "boolean" }, default: "false", description: "Removes the Carousel frame border while retaining its surface and radius." },
      { name: "radius", type: { text: '"none"' }, description: "Use none to remove the Carousel surface radius while retaining overflow clipping." },
      { name: "swipe", type: { text: '"none"' }, description: "Use none to disable the default touch, pen, and mouse swipe navigation." },
    ],
    slots: [
      { name: "controls", description: "A `mui-tab-bar` that selects carousel items." },
      { name: "item", description: "Related `mui-carousel-panel` item content." },
    ],
    cssProperties: [
      { name: "--carousel-background", description: "Carousel surface background." },
      { name: "--carousel-radius", description: "Carousel surface radius." },
      { name: "--carousel-tab-position", description: "Offset applied to slotted controls." },
    ],
  },
  "mui-carousel-panel": {
    description: "Displays content associated with a selected carousel control.",
    attributes: [
      { name: "item", type: { text: "string" }, description: "Identifier matched by the related carousel tab item." },
    ],
    slots: [{ name: "", description: "Carousel panel content." }],
  },
};
