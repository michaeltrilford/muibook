import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  FormMessage: {
    title: "Form Message",
    description:
      "Form Message provides supporting text below form controls for guidance, validation, and status messaging.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17821&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-form-message--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-form-message/index.ts"],
    website: ["https://muibook.com/form-message"],
    guides: ["https://guides.muibook.com/field"],
    usage: {
      list: [
        "Use for supporting text below form controls.",
        "Use inside mui-field with slot='message' for consistent spacing and placement.",
        "When used in Form Group layouts, attach each Form Message to its specific Field using slot='message'.",
        "Form Message wraps Mui Body with form-oriented defaults.",
        "Form Message renders an info icon by default; provide slot='before' to replace it.",
        "Use variant='info' for lighter informational guidance that should remain less visually impactful than warning, success, or error states.",
        "Supporting copy is intentionally knocked back so inputs and selections stay visually primary.",
        "Slot icons in before/after using Mui Body slot behavior.",
        "Style state feedback through slotted icon color and text styling in usage context.",
        "Use size to match nearby body text (x-small, small, medium, large).",
      ],
    },
    accessibility: { designerList: [""], engineerList: [""] },
    anatomy: { image: "", list: ["Optional leading slot", "Hint text", "Optional trailing slot"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Field", link: "https://guides.muibook.com/field" },
        { name: "Input", link: "https://guides.muibook.com/input" },
      ],
    },
    rules: [
      {
        heading: "",
        description: "",
        doContent: [{ description: "", image: "" }],
        dontContent: [{ description: "", image: "" }],
      },
    ],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
