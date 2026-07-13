import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  FormGroup: {
    title: "Form Group",
    description:
      "Form Group organizes related form controls inside a Form Section with optional second-level headings.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17795&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-form-group--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-form-group/index.ts"],
    website: ["https://muibook.com/form-group"],
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
    stories: {
      items: [
        {
          "key": "vertical-group",
          "title": "Vertical Group",
          "description": "Stacked group with heading, choice controls, and field-level guidance.",
          "list": [
            "Use a stacked group when the controls belong to the same decision area.",
            "Keep helper and status copy attached to the relevant field.",
            "When the message belongs to a specific mui-field inside the group, use slot=&quot;message&quot; on that field.",
            "Use a colored mui-form-message for static guidance that needs more emphasis; use the default greyscale version for lighter supporting copy."
          ]
        },
        {
          "key": "horizontal-group",
          "title": "Horizontal Group",
          "description": "Split row layout with responsive stack on mobile.",
          "list": [
            "Use a horizontal group for paired follow-up fields.",
            "Wrap the group in a mui-v-stack with appropriate spacing when supporting content needs to sit above or below it.",
            "Keep helper or status copy outside the horizontal group rather than inserting mui-form-message directly into the group.",
            "Because the supporting message sits outside the field/group in this pattern, slot=&quot;message&quot; is not required.",
            "Use a colored mui-form-message when the note needs more emphasis, or leave it greyscale for lighter supporting copy."
          ]
        },
        {
          "key": "select-action",
          "title": "Select + Action",
          "description": "Use space and aligny to build an input-family row with a trailing action.",
          "list": [
            "Pair stroke=&quot;ring&quot; with inputs or selects when you want an action to visually align with a thinner form-control stroke.",
            "Keep the ring explicit on the action, rather than relying on form-group to change descendant button styling."
          ]
        },
        {
          "key": "heading-level-space",
          "title": "Heading Level + Space",
          "description": "Heading semantics and heading spacing can be adjusted independently of grouped control spacing.",
          "list": [
            "Use Form Group to control spacing and direction for a related set of fields or controls."
          ]
        }
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
