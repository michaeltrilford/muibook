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
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Prompt", link: "https://guides.muibook.com/prompt" },
        { name: "Prompt Preview", link: "https://guides.muibook.com/prompt-preview" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
