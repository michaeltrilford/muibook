import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Hint: {
    title: "Hint",
    description: "Hint provides a trigger + floating tooltip pattern for contextual help.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-hint/index.ts"],
    website: ["https://muibook.com/#/hint"],
    guides: ["https://guides.muibook.com/field"],
    usage: {
      list: [
        "Use for short contextual help that appears on hover or focus.",
        "Slot the trigger UI into slot='trigger' (icon, badge, text, or custom content).",
        "Set placement to top, bottom, left, or right to control tooltip position.",
        "Delay is intentional by default: hint open is clamped to 1000-2000ms (default 1500ms) to prevent instant pop.",
        "Use delay and initial-delay to tune open timing when needed.",
      ],
    },
    accessibility: { designerList: [""], engineerList: [""] },
    anatomy: { image: "", list: ["Trigger slot", "Tooltip content", "Placement behavior"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Body", link: "https://guides.muibook.com/body" },
        { name: "Form Message", link: "https://guides.muibook.com/field" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
