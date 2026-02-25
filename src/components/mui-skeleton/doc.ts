import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Skeleton: {
    title: "Skeleton",
    description: "Skeleton provides reusable placeholder blocks for loading and wireframe prototyping flows.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-skeleton/index.ts"],
    website: ["https://muibook.com/#/skeleton"],
    guides: ["https://guides.muibook.com/loader"],
    usage: {
      list: [
        "Use line skeletons for text placeholders and rect/circle for media/avatar placeholders.",
        "Prefer token, rem, and percentage sizing over fixed pixel values for responsive placeholder design.",
        "Use Muibook layout components (mui-v-stack, mui-h-stack, mui-grid) to compose skeleton structures.",
        "Use duration to slow down shimmer in calmer loading contexts.",
        "Use max-width to constrain placeholder length without inline styles.",
        "Use before/after slots to compose action or avatar placeholders around loading content.",
        "Set loading='false' to reveal real content in the same markup shell.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [
        "Skeleton is decorative by default; keep it paired with semantic loading context at section/page level.",
        "Respect prefers-reduced-motion by avoiding mandatory motion-only communication.",
      ],
    },
    anatomy: { image: "", list: ["Before slot", "Skeleton blocks", "After slot", "Optional content reveal slot"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Loader", link: "https://guides.muibook.com/loader" },
        { name: "Spinner", link: "https://guides.muibook.com/loader" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
