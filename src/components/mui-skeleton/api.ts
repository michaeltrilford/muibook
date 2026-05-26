export const muiApi = {
  "mui-skeleton": {
    description: "Renders placeholder shapes and lines for loading states, with optional before and after slot composition.",
    attributes: [
      { name: "shape", type: { text: '"line" | "rect" | "circle"' }, default: "line", description: "Sets the placeholder shape." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Controls the base placeholder scale." },
      { name: "width", type: { text: "string" }, default: "100%", description: "Sets the rendered width." },
      { name: "max-width", type: { text: "string" }, description: "Constrains the maximum rendered width." },
      { name: "height", type: { text: "string" }, description: "Overrides the rendered height." },
      { name: "radius", type: { text: "string" }, description: "Overrides the placeholder corner radius." },
      { name: "lines", type: { text: "number" }, default: "1", description: "Sets the number of generated placeholder lines." },
      { name: "line-widths", type: { text: "string" }, description: "Provides comma-separated widths for generated lines." },
      { name: "gap", type: { text: "string" }, description: "Controls spacing between generated lines." },
      {
        name: "animation",
        type: { text: '"shimmer" | "pulsate" | "none"' },
        description: "Selects the placeholder animation mode.",
      },
      { name: "duration", type: { text: "string" }, description: "Overrides shimmer or pulsate timing." },
      {
        name: "loading",
        type: { text: '"true" | "false"' },
        default: "true",
        description: "Set to `false` to reveal the slotted content instead of placeholders.",
      },
    ],
    slots: [
      { name: "", description: "Real content revealed when `loading=\"false\"`." },
      { name: "before", description: "Leading placeholder content, commonly used for avatar or icon blocks." },
      { name: "after", description: "Trailing placeholder content, commonly used for actions or badges." },
    ],
    cssProperties: [
      { name: "--skeleton-gap", description: "Controls the internal spacing between generated lines." },
      { name: "--skeleton-animation-speed", description: "Controls shimmer and pulsate timing." },
      { name: "--skeleton-radius", description: "Controls the default placeholder radius." },
      { name: "--skeleton-background", description: "Controls the skeleton base color." },
      { name: "--skeleton-highlight", description: "Controls the shimmer highlight color." },
    ],
  },
};
