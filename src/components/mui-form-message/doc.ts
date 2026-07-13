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
        "Use variant='info' for lighter informational guidance that should remain less visually impactful than warning, positive, or attention states.",
        "Supporting copy is intentionally knocked back so inputs and selections stay visually primary.",
        "Slot icons in before/after using Mui Body slot behavior.",
        "Style state feedback through slotted icon color and text styling in usage context.",
        "Use size to match nearby body text (x-small, small, medium, large).",
      ],
    },
    accessibility: { designerList: [""], engineerList: [""] },
    anatomy: { image: "", list: ["Optional leading slot", "Hint text", "Optional trailing slot"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    stories: {
      items: [
        {
          "key": "message-patterns",
          "title": "Message Patterns",
          "description": "Icon-led supporting text with semantic color from usage context.",
          "list": [
            "Use a colored mui-form-message when the static message needs more emphasis.",
            "Use the default greyscale version for lighter supporting copy.",
            "This component does not replace mui-field slot=&quot;message&quot; when the message belongs to a specific field; it is the message content used within that pattern."
          ]
        },
        {
          "key": "billing-preferences-section",
          "title": "Billing Preferences Section",
          "description": "Grouped controls with radio choices and inline guidance. Intended for use on a surface background.",
          "list": [
            "Use Form Message on the owning field for helper and validation copy.",
            "Use horizontal groups for paired follow-up fields.",
            "Default split is 1fr / 20rem and stacks on mobile.",
            "Use a colored mui-form-message for stronger static guidance, or the default greyscale version for lighter supporting copy.",
            "This component does not replace the message functionality on mui-field; when the copy belongs to one field, keep it in that field’s slot=&quot;message&quot;."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Form Message sizing across x-small, small, medium, and large, including all variant options.",
          "list": [
            "Use Form Message inside Field for helper, validation, or control status copy."
          ]
        }
      ],
    },

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
