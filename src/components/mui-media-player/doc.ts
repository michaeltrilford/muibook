import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  MediaPlayer: {
    title: "Media Player",
    description:
      "Media Player renders direct audio/video with native media playback and Muibook controls, plus provider embeds (YouTube, SoundCloud) from a single src input. The metadata slot keeps the player composable for titles, avatars, links, badges, and product actions while the component applies contextual media-player theming where possible.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17634&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/media-media-player--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-media-player/index.ts"],
    website: ["https://muibook.com/media-player"],
    guides: ["https://guides.muibook.com/media-player"],
    usage: {
      list: [
        "Use for pasted media links when you want consistent in-product preview behavior.",
        "Rely on auto-detection for YouTube, SoundCloud, mp4/webm, and mp3/wav links.",
        "Set type only when you need to force a specific renderer.",
        "Use the default Muibook controls backed by the native audio or video element.",
        "Use thumbnail to opt into a richer audio presentation.",
        "Use waveform as an opt-in audio enhancement when the source can be fetched and decoded by the browser.",
        "Slotted metadata content receives contextual text, link, and action tokens where possible so composed content follows the underlying surface or image-overlay theme.",
        "Use overlay variants for actions over video or artwork, and normal action hierarchy such as tertiary on surface-based audio.",
        "Muibook controls include local seek, volume, elapsed/remaining time toggle, and an options menu for utility actions like download and opening the source.",
        "On compact layouts, the time action shows a single value and toggles between elapsed time and remaining time.",
        "Media Player control hints use disable-on-touch so tooltips remain a desktop enhancement and do not persist over touch controls.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [
        "Provide meaningful context around the media purpose using surrounding copy, `media-title`, or composed `slot='meta-before'` content.",
        "Keep playback user-initiated by default. If autoplay is needed, expose it as an explicit user or product setting instead of enabling it silently.",
        "When autoplay is enabled, prefer muted playback and avoid autoplaying content with speech, alerts, or important audio.",
        "Ensure slotted metadata actions have clear accessible names and do not make the entire metadata area interactive unless the whole area is intentionally actionable.",
        "Use real links for navigation and buttons for local actions such as opening a dialog, profile panel, or menu.",
        "Do not rely on visual metadata alone; titles, creator names, and action labels should remain available to assistive technology.",
        "Keep each media control accessible through its own label because control hints are disabled on touch-like devices.",
        "Treat generated waveforms as decorative support unless the same timing or structure is also available through text or controls.",
      ],
    },
    anatomy: { image: "", list: ["Media frame", "Native media element", "Optional audio visual section", "Controls row", "Progress/time control"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    stories: {
      items: [
        {
          "key": "video",
          "title": "Video",
          "description": "Direct video file rendered with the native video element and Muibook controls.",
          "list": [
            "Use Muibook controls when the player needs to match the product visual language.",
            "The native video element remains the playback engine underneath the UI.",
            "Use poster for iOS Safari so the preview has a stable image before playback.",
            "Picture-in-Picture only appears when the browser reports support; iPhone may hide it when the current video or browser context does not support it.",
            "Fullscreen may start playback first on iPhone because native video fullscreen must be triggered from the media element."
          ]
        },
        {
          "key": "center-action",
          "title": "Center Action",
          "description": "Direct video file rendered with an always-visible centered play/pause action.",
          "list": [
            "Use center-play when the preview needs an obvious primary playback action before the user explores the bottom controls.",
            "The centered action toggles between play and pause while the native video element remains the playback engine underneath the UI."
          ]
        },
        {
          "key": "video-loading",
          "title": "Video Loading",
          "description": "Direct video file rendered with the centered loading affordance forced on.",
          "list": [
            "Use loading when an externally managed media load needs visible feedback.",
            "This story forces the state so spinner size, placement, and contrast can be inspected without waiting for real buffering.",
            "Remove loading for normal playback; the player still shows the affordance automatically during native buffering events."
          ]
        },
        {
          "key": "metadata",
          "title": "Metadata",
          "description": "Direct video file rendered with metadata and a responsive subscribe action.",
          "list": [
            "Use this pattern when the media identity and a supporting commercial or creator action need to share the top metadata area.",
            "Use mui-avatar-chip in slot='meta-before' for reusable avatar and profile copy composition.",
            "Use slot='meta-after' for the action so the space between remains available for media playback interaction.",
            "Use overlay action styling when the action sits over video or artwork."
          ]
        },
        {
          "key": "audio",
          "title": "Audio",
          "description": "Direct audio file rendered as a compact player.",
          "list": [
            "Use this state when the player only needs playback controls.",
            "The native audio element remains the playback engine underneath the UI."
          ]
        },
        {
          "key": "audio-waveform",
          "title": "Audio Waveform",
          "description": "Direct audio file rendered with an opt-in generated waveform.",
          "list": [
            "Use waveform when audio needs a visual signature without adding artwork.",
            "The waveform is generated from the audio source when the browser can fetch and decode the file.",
            "Remote audio can fail to render a waveform when CORS blocks decoding, so keep the player usable without it."
          ]
        },
        {
          "key": "audio-artwork",
          "title": "Audio Artwork",
          "description": "Direct audio file rendered with artwork replacing the basic metadata presentation.",
          "list": [
            "Add artwork when the audio needs a stronger visual presentation.",
            "The artwork fills the visual area while the native audio element remains the playback engine underneath the UI."
          ]
        },
        {
          "key": "audio-artwork-waveform",
          "title": "Audio Artwork Waveform",
          "description": "Direct audio file rendered with artwork and an opt-in generated waveform.",
          "list": [
            "Use waveform with artwork when the audio needs both an image-led presentation and a visible sense of sound structure.",
            "The active waveform colour follows the same range colour as the player controls, while inactive bars stay quieter over the artwork.",
            "Keep this opt-in because waveform generation depends on the browser being able to fetch and decode the audio source."
          ]
        },
        {
          "key": "youtube-embed",
          "title": "YouTube Embed",
          "description": "Auto-detected YouTube URL rendered as embed.",
          "list": [
            "Use a supported YouTube URL and provide surrounding context for the embedded media."
          ]
        },
        {
          "key": "soundcloud-embed",
          "title": "SoundCloud Embed",
          "description": "Auto-detected SoundCloud URL rendered as embed.",
          "list": [
            "Use a supported SoundCloud URL and expect provider-owned controls and behavior."
          ]
        }
      ],
    },

    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Prompt", link: "https://guides.muibook.com/prompt" },
        { name: "Preview Chip", link: "https://guides.muibook.com/preview-chip" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
