export const muiApi = {
  "mui-link": {
    description: "Provides anchor navigation as an inline link or action-styled link with optional supporting content.",
    attributes: [
      { name: "href", type: { text: "string" }, default: "#", description: "Navigation destination URL." },
      {
        name: "target",
        type: { text: "string" },
        default: "_self",
        description: "Anchor browsing context, such as `_self` or `_blank`.",
      },
      {
        name: "variant",
        type: { text: '"default" | "primary" | "secondary" | "tertiary" | "overlay" | "attention"' },
        default: "default",
        description: "Uses standard inline-link styling or an action-style treatment.",
      },
      {
        name: "stroke",
        type: { text: '"border" | "ring"' },
        default: "border",
        description: "Controls whether action-style link strokes are drawn with the normal border or an inset ring shadow.",
      },
      {
        name: "stroke-ring-size",
        type: { text: '"100" | "200" | "300" | "400" | "500" | string' },
        default: "100",
        description:
          'Ring stroke width when `stroke="ring"` is used on action-style links. Token values map to `--stroke-size-*`.',
      },
      {
        name: "focus-ring",
        type: { text: '"inset" | "outset"' },
        default: "default",
        description: "Controls focus outline placement. The default is inset; use `outset` only when the focus ring should sit outside the action.",
      },
      {
        name: "disabled",
        type: { text: "boolean" },
        default: "false",
        description: "Disables navigation and exposes the anchor as aria-disabled.",
      },
      {
        name: "weight",
        type: { text: '"regular" | "medium" | "bold"' },
        default: "regular",
        description: "Font weight of link content.",
      },
      {
        name: "size",
        type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Link scale; also controls automatic icon, File Icon, avatar, badge, and Switch sizing.",
      },
      {
        name: "align",
        type: { text: '"start"' },
        description: "Aligns content to the inline start and pushes trailing slot content to the inline end.",
      },
      {
        name: "download",
        type: { text: "string | boolean" },
        description: "Downloads the linked resource; provide a value to set a download filename.",
      },
      {
        name: "usage",
        type: { text: '"input"' },
        description: "Uses field-compatible styling when the link is slotted before or after an input.",
      },
    ],
    slots: [
      { name: "", description: "Link label or a single icon for an icon-only link action." },
      { name: "before", description: "Leading icon, avatar, badge, or other supporting content." },
      { name: "after", description: "Trailing icon, avatar, badge, or other supporting content." },
    ],
    cssProperties: [
      {
        name: "--action-focus-outline",
        description: "Controls the link focus-visible outline. Defaults to stroke-size-400.",
      },
      {
        name: "--action-focus-outline-offset",
        description: "Controls the link focus-visible outline offset. Defaults to an inset stroke-size-400 offset.",
      },
      {
        name: "--action-focus-outline-inset-offset",
        description: "Controls the default inset focus outline offset. Defaults to stroke-size-400.",
      },
      {
        name: "--action-focus-outline-outset-offset",
        description: "Controls the positive outline offset when `focus-ring=\"outset\"` is used. Defaults to stroke-size-200.",
      },
      {
        name: "--link-focus-radius",
        description: "Controls the default inline link focus outline radius. Defaults to radius-200.",
      },
    ],
  },
};
