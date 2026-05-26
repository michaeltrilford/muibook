export const muiApi = {
  "mui-image": {
    description: "Frames a slotted image with optional cropping, focal positioning and caption content.",
    attributes: [
      { name: "height", type: { text: "string" }, description: "Sets the rendered image container height using any valid CSS height value." },
      { name: "fit", type: { text: '"contain" | "cover" | "fill" | "none" | "scale-down"' }, default: "contain", description: "Controls how the image fits its container." },
      { name: "crop", type: { text: "boolean" }, default: "false", description: "Enables cropped image presentation." },
      { name: "position", type: { text: "string" }, default: "center center", description: "Sets the object position when a focal position is not supplied." },
      { name: "focal-x", type: { text: "string" }, description: "Sets the horizontal focal point used for cropped images." },
      { name: "focal-y", type: { text: "string" }, description: "Sets the vertical focal point used for cropped images." },
      { name: "zoom", type: { text: "number" }, default: "1", description: "Scales the image around its focal position." },
      { name: "radius", type: { text: "string" }, default: "var(--radius-300)", description: "Sets the frame border radius." },
      { name: "aspect-ratio", type: { text: "string" }, description: "Sets the media aspect ratio using any valid CSS aspect-ratio value." },
    ],
    slots: [
      { name: "image", description: "Image media, normally an `img` element." },
      { name: "caption", description: "Optional caption content, normally a `figcaption` element." },
    ],
  },
};
