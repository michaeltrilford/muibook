export const muiApi = {
  "mui-prompt-message": {
    description: "Provides a conversation message row with an avatar slot and consistently scaled message content.",
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
        description: "Selects a surfaced message shell or a borderless transparent treatment.",
      },
      {
        name: "density",
        type: { text: '"default" | "compact"' },
        default: "default",
        description: "Controls the padding density of the message shell.",
      },
    ],
    slots: [
      { name: "avatar", description: "Leading identity content, typically a `mui-avatar`." },
      { name: "", description: "Message content, typically a `mui-body` element or text." },
    ],
  },
};
