import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  FormSection: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["header","footer"],
    },
    title: "Form Section",
    description:
      "A Form Section groups related form controls under a clear section heading.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17769&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-form-section--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-form-section/index.ts"],
    website: ["https://muibook.com/form-section"],
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
    stories: {
      items: [
        {
          "key": "account-setup-section",
          "title": "Account Setup Section",
          "description": "Real form grouping with Field, Input, Select, and Form Message. Intended for use on a surface background.",
          "list": [
            "Use one form section for each major form area.",
            "Use form group to cluster related fields.",
            "Hide group labels when they repeat the section title.",
            "Use the default greyscale mui-form-message for lighter supporting copy tied to a specific field."
          ]
        },
        {
          "key": "billing-preferences-section",
          "title": "Billing Preferences Section",
          "description": "Grouped controls with radio choices and inline guidance. Intended for use on a surface background.",
          "list": [
            "Use horizontal groups for paired fields.",
            "Default split is 1fr / 20rem and stacks on mobile.",
            "Use form hints for helper or status text.",
            "Use a colored mui-form-message for stronger static section/group guidance, or the default greyscale version for lighter supporting copy."
          ]
        },
        {
          "key": "no-legend",
          "title": "No Legend",
          "description": "Form section composition without a section heading/legend.",
          "list": [
            "Use the default greyscale mui-form-message when the supporting copy should stay visually quiet within the section."
          ]
        },
        {
          "key": "header-footer-slots",
          "title": "Header + Footer Slots",
          "description": "Custom section chrome/actions using form-section header/footer slots while keeping fieldset semantics.",
          "list": [
            "Use header/footer slots for custom section chrome while retaining fieldset semantics.",
            "If header/footer uses mui-h-stack, switch to mui-v-stack at smaller breakpoints."
          ]
        },
        {
          "key": "card-spacing-compare",
          "title": "Card Spacing Compare",
          "description": "Reference spacing using mui-card and mui-card-body for side-by-side comparison.",
          "list": [
            "Use Form Section to group related fields under a clear section heading and description."
          ]
        },
        {
          "key": "license-intake",
          "title": "License Intake",
          "description": "Lean licensing inquiry pattern using Form Section with Field-level messaging.",
          "list": [
            "Use Form Section to group related fields under a clear section heading and description."
          ]
        },
        {
          "key": "host-event-contracts",
          "title": "Host Event Contracts",
          "description": "Form logic listens on the custom element host, reads event.detail, and checks host value or checked properties without querying shadow DOM internals.",
          "list": [
            "Use Form Section to group related fields under a clear section heading and description."
          ]
        }
      ],
    },

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
