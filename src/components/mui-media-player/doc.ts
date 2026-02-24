import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  MediaPlayer: {
    title: "Media Player",
    description:
      "Media Player renders native audio/video and provider embeds (YouTube, SoundCloud) from a single src input. This is a new exploration for the system and will iterate over time.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-media-player/index.ts"],
    website: ["https://muibook.com/#/media-player"],
    guides: ["https://guides.muibook.com/prompt"],
    usage: {
      list: [
        "Use for pasted media links when you want consistent in-product preview behavior.",
        "Rely on auto-detection for YouTube, SoundCloud, mp4/webm, and mp3/wav links.",
        "Set type only when you need to force a specific renderer.",
        "Native media controls include a seek-time hover bubble and a clickable time mode toggle (elapsed/total and remaining/total).",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: ["Provide meaningful context around media purpose and avoid autoplay unless required."],
    },
    anatomy: { image: "", list: ["Media frame", "Native controls (video/audio)", "Progress/time row (native only)"] },
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
