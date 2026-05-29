export const muiApi = {
  "mui-button": {
    description: "Triggers an action with semantic button behaviour, visual emphasis variants, and optional leading or trailing content.",
    attributes: [
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
        name: "variant",
        type: { text: '"primary" | "secondary" | "tertiary" | "overlay" | "attention"' },
        default: "primary",
        description: "Visual emphasis and intent of the action.",
      },
      {
        name: "stroke",
        type: { text: '"border" | "ring"' },
        default: "border",
        description: "Controls whether the action stroke is drawn with the normal border or an inset ring shadow.",
      },
      {
        name: "stroke-ring-size",
        type: { text: '"050" | "100" | "200" | "300" | "400" | "500" | string' },
        default: "050",
        description: "Ring stroke width when `stroke=\"ring\"` is used. Token values map to `--stroke-size-*`; use `050` by default and increase only when more contrast is needed.",
      },
      {
        name: "size",
        type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Button scale; also controls automatic icon, avatar, and badge sizing.",
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
      { name: "after", description: "Trailing icon, avatar, badge, or other supporting content." },
    ],
  },
};
