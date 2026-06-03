import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Hint: {
    title: "Hint",
    description: "Hint provides a trigger + floating tooltip pattern for contextual help.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17739&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-hint--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-hint/index.ts"],
    website: ["https://muibook.com/hint"],
    guides: ["https://guides.muibook.com/hint"],
    usage: {
      list: [
        "Use for short contextual help that appears on hover or focus.",
        "Slot the trigger UI into slot='trigger' (icon, badge, text, or custom content).",
        "When the trigger is already focusable, such as a button or link, focus remains on that control.",
        "When the trigger is plain content, Hint adds fallback keyboard focus so the tooltip can still be discovered.",
        "Set placement to top, bottom, left, or right to control tooltip position.",
        "Delay is intentional by default: hint open is clamped to 250-2000ms (default 500ms) to prevent instant pop.",
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
