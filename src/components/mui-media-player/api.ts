export const muiApi = {
  "mui-media-player": {
    description: "Renders native or embedded audio and video media from a supplied source.",
    attributes: [
      { name: "src", type: { text: "string" }, description: "Media URL to render." },
      { name: "type", type: { text: '"video" | "audio" | "youtube" | "soundcloud"' }, description: "Overrides media type detection for the source URL." },
      { name: "poster", type: { text: "string" }, description: "Poster image URL for native video media." },
      { name: "autoplay", type: { text: "boolean" }, default: "false", description: "Starts playback automatically when allowed by the browser." },
      { name: "muted", type: { text: "boolean" }, default: "false", description: "Starts native media muted." },
      { name: "loop", type: { text: "boolean" }, default: "false", description: "Restarts playback when media ends." },
      { name: "prefer-native-controls", type: { text: '"true" | "false"' }, default: "true", description: "Set to `false` to render the built-in custom controls for native media." },
    ],
    cssProperties: [
      { name: "--media-player-video-ratio", description: "Aspect ratio used for video media." },
      { name: "--media-player-soundcloud-ratio", description: "Aspect ratio used for SoundCloud media." },
      { name: "--media-player-seek-color", description: "Color used for the custom seek control." },
    ],
  },
};
