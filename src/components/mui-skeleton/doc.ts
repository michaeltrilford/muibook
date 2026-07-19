import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Skeleton: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["before","after"],
    },
    title: "Skeleton",
    description: "Skeleton provides reusable placeholder blocks for loading and wireframe prototyping flows.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17873&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/loading-skeleton--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-skeleton/index.ts"],
    website: ["https://muibook.com/skeleton"],
    guides: ["https://guides.muibook.com/skeleton"],
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
    stories: {
      items: [
        { key: "multi-line", title: "Multi-line", description: "Represents several lines of loading copy.", list: ["Match line count and approximate width to the loaded content.", "Use responsive units and layout tokens rather than fixed pixels."] },
        { key: "line", title: "Line", description: "Represents a single line of loading text.", list: ["Use for headings, labels, and isolated text values."] },
        { key: "duration", title: "Shimmer Duration", description: "Adjusts the shimmer animation speed.", list: ["Use a consistent duration across placeholders in the same loading region."] },
        { key: "shapes", title: "Shapes", description: "Represents rectangular media and circular avatars.", list: ["Match the shape and dimensions of the content that will replace it."] },
        { key: "slots", title: "Before and After Slots", description: "Composes leading and trailing placeholders around content lines.", list: ["Use slots when the loaded layout includes avatars, actions, or other accessories."] },
        { key: "toggle", title: "Loading Toggle", description: "Reveals real content in the same layout shell.", list: ["Set loading='false' only after the replacement content is ready to display."] },
      ],
    },
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
