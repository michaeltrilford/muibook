// src/utils/getPartMap.ts

export const PartTypes: Record<string, string[]> = {
  text: [
    "color",
    "font-family",
    "font-size",
    "font-weight",
    "letter-spacing",
    "line-height",
    "text-transform",
    "text-decoration",
    "text-align",
  ],
  spacing: ["padding", "margin", "gap", "width", "height", "box-sizing"],
  layout: [
    "display",
    "flex",
    "flex-direction",
    "flex-wrap",
    "justify-content",
    "align-items",
    "align-content",
    "align-self",
    "grid-template-columns",
    "grid-template-rows",
    "grid-column",
    "grid-row",
    "place-items",
    "place-content",
    "vertical-align",
  ],
  visual: [
    "background",
    "border",
    "border-radius",
    "box-shadow",
    "opacity",
    "transition",
    "outline",
    "color",
  ],
};

export const Parts = Object.values(PartTypes).flat();

export function getPartMap(...types: (keyof typeof PartTypes)[]): string {
  return types
    .map((type) => PartTypes[type] || [])
    .flat()
    .join(" ");
}
