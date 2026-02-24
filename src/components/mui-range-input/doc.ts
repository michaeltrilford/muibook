import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  RangeInput: {
    title: "Range Input",
    description: "Range Input provides a reusable slider with optional floating value bubble.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-range-input/index.ts"],
    website: ["https://muibook.com/#/range-input"],
    guides: ["https://guides.muibook.com/input"],
    usage: {
      list: [
        "Use for scrubbers and bounded numeric selection.",
        "Set bubble to show hover/drag value feedback.",
        "Use bubble-format='time' for media timelines.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: ["Provide a clear aria label to describe the range purpose."],
    },
    anatomy: { image: "", list: ["Native range control", "Floating value bubble (optional)"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Media Player", link: "https://guides.muibook.com/prompt" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
