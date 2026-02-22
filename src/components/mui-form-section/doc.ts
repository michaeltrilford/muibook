import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  FormSection: {
    title: "Form Section",
    description:
      "A Form Section groups related form controls under a clear section heading.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-form-section/index.ts"],
    website: ["https://muibook.com/#/form-section"],
    guides: ["https://guides.muibook.com/field"],
    usage: {
      list: [
        "Use to group related inputs into meaningful chunks in long forms.",
        "Use Form Group inside Form Section for second-level grouping and horizontal splits.",
        "Pair with Field, Input, Select, Radio Group, and Form Hint for complete form flows.",
        "Place helper/validation copy in mui-field slot='message' (for example, with mui-form-hint) instead of standalone section-level hints.",
        "Use disabled when an entire section should be temporarily non-interactive.",
        "Use borderless when the section sits on an already-defined container surface.",
      ],
    },
    accessibility: { designerList: [""], engineerList: [""], },
    anatomy: { image: "", list: ["Legend heading", "Slotted form content"], },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Field", link: "https://guides.muibook.com/field" },
        { name: "Form Group", link: "https://guides.muibook.com/field" },
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Form Hint", link: "https://guides.muibook.com/field" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
