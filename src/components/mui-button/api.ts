export const muiApi = {
  "mui-button": {
    description: "Triggers an action with semantic button behaviour, visual emphasis variants, and optional leading or trailing content.",
    attributes: [
      {
        name: "onclick",
        type: { text: "string" },
        description: "Inline click handler passed through to the internal native button.",
      },
      {
        name: "type",
        type: { text: '"button" | "submit" | "reset"' },
        default: "button",
        description: "Native button type applied inside the component.",
      },
      {
        name: "aria-label",
        type: { text: "string" },
        description: "Accessible name for icon-only or avatar-only buttons without visible action text.",
      },
      {
        name: "disabled",
        type: { text: "boolean" },
        default: "false",
        description: "Disables button interaction.",
      },
      {
        name: "pending",
        type: { text: "boolean" },
        default: "false",
        description: "Blocks repeat activation during async work without applying disabled styling.",
      },
      {
        name: "variant",
        type: { text: '"primary" | "secondary" | "tertiary" | "overlay" | "attention" | "unstyled"' },
        default: "primary",
        description:
          "Visual emphasis and intent of the action. Unstyled removes action chrome, sizing, padding, and typography so structured slotted content such as Card owns the presentation.",
      },
      {
        name: "stroke",
        type: { text: '"border" | "ring"' },
        default: "border",
        description: "Controls whether the action stroke is drawn with the normal border or an inset ring shadow.",
      },
      {
        name: "stroke-ring-size",
        type: { text: '"100" | "200" | "300" | "400" | "500" | string' },
        default: "100",
        description: "Ring stroke width when `stroke=\"ring\"` is used. Token values map to `--stroke-size-*`; use `100` by default and increase only when more contrast is needed.",
      },
      {
        name: "focus-ring",
        type: { text: '"inset" | "outset"' },
        default: "default",
        description: "Controls focus outline placement. The default is inset; use `outset` only when the focus ring should sit outside the action.",
      },
      {
        name: "size",
        type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Button scale; also controls automatic icon, File Icon, avatar, badge, and Switch sizing.",
      },
      {
        name: "align",
        type: { text: '"start"' },
        description: "Aligns content to the inline start and pushes trailing slot content to the inline end.",
      },
      {
        name: "usage",
        type: { text: '"input"' },
        description: "Uses field-compatible styling when the button is slotted before or after an input.",
      },
    ],
    slots: [
      { name: "", description: "Action label or a single icon or avatar for a compact action." },
      { name: "before", description: "Leading icon, avatar, badge, or other supporting content." },
      { name: "after", description: "Trailing icon, avatar, badge, Switch, or other supporting content. Activating the Button toggles a direct slotted Switch." },
    ],
    cssProperties: [
      {
        name: "--action-focus-outline",
        description: "Controls the button focus-visible outline. Defaults to stroke-size-400.",
      },
      {
        name: "--action-focus-outline-offset",
        description: "Controls the button focus-visible outline offset. Defaults to an inset stroke-size-400 offset.",
      },
      {
        name: "--action-focus-outline-inset-offset",
        description: "Controls the default inset focus outline offset. Defaults to stroke-size-400.",
      },
      {
        name: "--action-focus-outline-outset-offset",
        description: "Controls the positive outline offset when `focus-ring=\"outset\"` is used. Defaults to stroke-size-200.",
      },
    ],
  },
};
