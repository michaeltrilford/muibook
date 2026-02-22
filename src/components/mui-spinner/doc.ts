import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Spinner: {
    title: "Spinner",
    description: "Spinner provides compact loading feedback for short async states.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-spinner/index.ts"],
    website: ["https://muibook.com/#/loader"],
    guides: ["https://guides.muibook.com/loader"],
    usage: {
      list: [
        "Use when content is loading and progress percentage is unavailable.",
        "Prefer small or medium sizes inside controls and cards.",
        "Set label for assistive technology context.",
      ],
    },
    accessibility: { designerList: [""], engineerList: ["Provide a meaningful label when context is unclear."] },
    anatomy: { image: "", list: ["Animated ring", "Accessible label"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Loader", link: "https://guides.muibook.com/loader" }] },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
