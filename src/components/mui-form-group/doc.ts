import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  FormGroup: {
    title: "Form Group",
    description:
      "Form Group organizes related form controls inside a Form Section with optional second-level headings.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-form-group/index.ts"],
    website: ["https://muibook.com/#/form-group"],
    guides: ["https://guides.muibook.com/field"],
    usage: {
      list: [
        "Use inside Form Section to create second-level groups.",
        "Set heading to label a group.",
        "Use hide-heading when a heading is redundant.",
        "Use variant='horizontal' for split rows that collapse on mobile.",
        "Override horizontal columns with --form-group-horizontal-template.",
        "For hints and validation copy, use mui-field slot='message' for consistent spacing.",
        "Avoid standalone helper rows between fields; keep messaging attached to each field.",
        "Use heading-level to set the correct semantic heading hierarchy without changing the visual heading size.",
      ],
    },
    accessibility: { designerList: [""], engineerList: [""] },
    anatomy: { image: "", list: ["Optional heading", "Grouped slotted controls"] },
    variants: {
      items: [
        { key: "default", title: "Default", description: "Stacked vertical group.", image: "" },
        { key: "horizontal", title: "Horizontal", description: "Two-column group that stacks on mobile.", image: "" },
      ],
    },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Form Section", link: "https://guides.muibook.com/field" },
        { name: "Field", link: "https://guides.muibook.com/field" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
