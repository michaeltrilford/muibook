import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  FormSectionFooter: {
    title: "Form Section Footer",
    description: "Footer wrapper for Form Section actions and divider patterns.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17769&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-form-section-footer--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-form-section-footer/index.ts"],
    website: ["https://muibook.com/form-section-footer"],
    guides: ["https://guides.muibook.com/form-section"],
    usage: {
      list: [
        "Use in slot='footer' on mui-form-section for consistent footer spacing.",
        "Place mui-rule first when you need a visual separation before actions.",
        "Keep responsive action layouts inside the footer wrapper.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: ["Footer actions remain keyboard accessible based on slotted controls."],
    },
    anatomy: {
      image: "",
      list: ["Footer wrapper", "Optional divider (mui-rule)", "Action content"],
    },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Form Section", link: "https://guides.muibook.com/form-section" },
        { name: "Form Group", link: "https://guides.muibook.com/form-group" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};

