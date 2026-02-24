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
        "Use Form Section when semantics matter (fieldset + grouped form controls). Use Card for generic content grouping that is not a form.",
        "Use Form Group inside Form Section for second-level grouping and horizontal splits.",
        "Use heading-level to map section headings to the correct document outline while keeping visual size consistent.",
        "Pair with Field, Input, Select, Radio Group, and Form Message for complete form flows.",
        "Use slot='header' and slot='footer' when you need custom section chrome/actions while preserving fieldset semantics.",
        "Prefer mui-form-section-footer in slot='footer' for consistent divider and action spacing.",
        "When header/footer layout uses mui-h-stack, switch to mui-v-stack at smaller breakpoints for readability and touch comfort.",
        "Place helper/validation copy in mui-field slot='message' (for example, with mui-form-message) instead of standalone section-level hints.",
        "For page composition, wrap each major region in mui-v-stack and use larger section spacing (for example, var(--space-800)) between Form Section, document links, and FAQ blocks.",
        "Keep section-level actions in a dedicated trailing-aligned stack (for example, mui-v-stack alignx='end') rather than embedding controls inside form content rows.",
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
        { name: "Form Section Footer", link: "https://guides.muibook.com/form-section" },
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Form Message", link: "https://guides.muibook.com/field" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
