import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  MediaPlayer: {
    title: "Media Player",
    description:
      "Media Player renders direct audio/video with native media playback and Muibook controls, plus provider embeds (YouTube, SoundCloud) from a single src input. This is a new exploration for the system and will iterate over time.",
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
        "Muibook controls include local seek, volume, elapsed/remaining time toggle, and an options menu for utility actions like download and opening the source.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: ["Provide meaningful context around media purpose and avoid autoplay unless required."],
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
