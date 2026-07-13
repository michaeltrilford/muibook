import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Spinner: {
    title: "Spinner",
    description: "Spinner provides compact loading feedback for short async states.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2117-17103&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/loading-spinner--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-spinner/index.ts"],
    website: ["https://muibook.com/loader"],
    guides: ["https://guides.muibook.com/loader"],
    usage: {
      list: [
        "Use when content is loading and progress percentage is unavailable.",
        "Use size variants (xx-small to xx-large) to match surrounding density.",
        "Set label for assistive technology context.",
      ],
    },
    accessibility: { designerList: [""], engineerList: ["Provide a meaningful label when context is unclear."] },
    anatomy: { image: "", list: ["Animated ring", "Accessible label"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    stories: {
      items: [
        { key: "sizes", title: "Sizes", description: "Matches the Spinner to the surrounding interface density.", list: ["Use compact sizes inside actions and larger sizes for standalone loading regions.", "Do not resize a surrounding control when its Spinner appears."] },
        { key: "color-duration", title: "Color and Duration", description: "Customises Spinner emphasis and animation speed.", list: ["Maintain sufficient contrast against the current surface.", "Use duration changes sparingly and preserve reduced-motion support."] },
      ],
    },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Loader", link: "https://guides.muibook.com/loader" }] },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
