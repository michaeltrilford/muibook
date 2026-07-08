export const muiApi = {
  "mui-prompt-message": {
    description: "Provides a conversation message row with optional avatar content and consistently scaled message content.",
    attributes: [
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Scales the avatar, content typography, padding, and spacing together.",
      },
      {
        name: "variant",
        type: { text: '"default" | "ghost"' },
        default: "default",
        description: "Selects a surfaced message shell or an unpadded, borderless transparent treatment.",
      },
      {
        name: "align",
        type: { text: '"start" | "end"' },
        default: "start",
        description: "Aligns the message host to the logical start or end of the conversation column.",
      },
      {
        name: "width",
        type: { text: '"full" | "medium" | "content"' },
        default: "full",
        description: "Controls the message host width without requiring inline layout styles.",
      },
      {
        name: "footer-position",
        type: { text: '"inside" | "outside"' },
        default: "inside",
        description: "Controls whether footer slot content renders inside the message bubble or outside below it.",
      },
      {
        name: "footer-visibility",
        type: { text: '"hover" | "always"' },
        default: "hover",
        description: "Controls whether footer actions reveal on hover/focus or remain visible for active/pinned messages.",
      },
    ],
    slots: [
      { name: "avatar", description: "Optional leading identity content, typically a `mui-avatar`. Omit it for agent or system messages without profile imagery." },
      { name: "header", description: "Optional message header content such as status, work summary, timing, or disclosure controls." },
      { name: "", description: "Message content, typically a `mui-body` element or text." },
      { name: "footer", description: "Optional message footer content such as copy, retry, review, timestamp, or response actions." },
    ],
    cssProperties: [
      {
        name: "--prompt-message-body-space",
        description: "Overrides the vertical rhythm between direct body slot children. Defaults to `var(--space-500)`.",
      },
    ],
  },
};
