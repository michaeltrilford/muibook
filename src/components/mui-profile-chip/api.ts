export const muiApi = {
  "mui-profile-chip": {
    description:
      "Composes an avatar, primary label, and secondary label into a compact profile identity pattern for media metadata, creator rows, and compact profile references.",
    attributes: [
      { name: "primary", type: { text: "string" }, description: "Fallback primary label when slot='primary' is not provided." },
      { name: "secondary", type: { text: "string" }, description: "Fallback secondary label when slot='secondary' is not provided." },
      { name: "image", type: { text: "string" }, description: "Avatar image URL. Uses initials from label when omitted." },
      { name: "label", type: { text: "string" }, description: "Accessible avatar label and initials source." },
      { name: "href", type: { text: "string" }, description: "Optional profile URL. When provided, the avatar is rendered as a link." },
      { name: "target", type: { text: "string" }, default: "_self", description: "Anchor browsing context for the avatar link." },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Profile chip scale. Controls the internal avatar size and primary and secondary text sizes.",
      },
      {
        name: "usage",
        type: { text: '"default" | "media-player"' },
        default: "default",
        description:
          "Media Player applies media-player automatically when the chip is slotted into metadata; set manually only for non-Media Player previews that need the same treatment.",
      },
    ],
    slots: [
      { name: "primary", description: "Optional custom primary content when richer typography or inline composition is needed." },
      { name: "secondary", description: "Optional custom secondary content, such as a link, count, badge, or icon." },
    ],
    cssProperties: [
      { name: "--profile-chip-text-color", description: "Text color used by primary and secondary labels." },
      { name: "--profile-chip-secondary-color", description: "Secondary text color used by secondary labels." },
      { name: "--profile-chip-link-color", description: "Default link color used inside the profile chip." },
      { name: "--profile-chip-avatar-border", description: "Border applied to the internal avatar." },
      { name: "--profile-chip-avatar-shadow", description: "Shadow applied to the internal avatar." },
    ],
  },
};
