import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Checkbox: {
    title: "Checkbox",
    description: "A checkbox component for capturing single or multiple selections.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/73VtPhD4eobLABsmN0X5KI/9ae64c37c0c6618fa48eff8154058f34/Checkbox_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=634-4686&t=aIjJqBxWOU1t0Jjp-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-checkbox--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-checkbox/index.ts"],
    website: ["https://muibook.com/checkbox"],
    guides: ["https://guides.muibook.com/checkbox"],

    usage: {
      list: [
        "Use size='x-small|small|medium|large' to scale checkbox controls with surrounding form content.",
      ],
    },

    accessibility: {
      designerList: [
        "A visible label or accessible name is required for screen reader support to describe the checkbox’s purpose.",
        "If no visible label is provided, use aria-label (or aria-labelledby) to supply an accessible name.",
        "Clear focus styles are present for keyboard users.",
        "The native disabled attribute is fully supported by assistive technologies.",
      ],
      engineerList: [
        "A visible label or accessible name is required for screen reader support to describe the checkbox’s purpose.",
        "If no visible label is provided, use aria-label (or aria-labelledby) to supply an accessible name.",
        "Clear focus styles are present for keyboard users.",
        "The native disabled attribute is fully supported by assistive technologies.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/1SHtTzFQSQIBPnva1futiT/6c55b1596af31b1f93a4da82ea2a4fa2/Checkbox_-_Anatomy.png",
      list: [
        "Unselected: Can become active through user interaction or changes in shared state.",
        "Checked: The checkbox is fully marked, indicating complete selection.",
        "Indeterminate: Used on parent checkboxes in multi-select groups to indicate partial selection.",
      ],
    },

    variants: {
      items: [
        {
          key: "",
          title: "",
          description: "",
          image: "",
        },
      ],
    },

    stories: {
      items: [
        {
          "key": "unchecked-default",
          "title": "Unchecked (Default)",
          "description": "No option or all options are unselected. The checkbox appears empty, indicating nothing is chosen.",
          "list": [
            "Use Checkbox for independent binary choices or multi-select option groups."
          ]
        },
        {
          "key": "checked",
          "title": "Checked",
          "description": "A single option or all options are selected. The checkbox is fully marked, showing complete selection.",
          "list": [
            "Use Checkbox for independent binary choices or multi-select option groups."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Scale checkbox size from x-small to large.",
          "list": [
            "Use Checkbox for independent binary choices or multi-select option groups."
          ]
        },
        {
          "key": "indeterminate",
          "title": "Indeterminate",
          "description": "Demonstrates indeterminate with Checkbox.",
          "list": [
            "Used on parent checkboxes in multi-select groups to show partial selection.",
            "Often acts as a control to clear selected child options.",
            "Parent reflects children: unchecked (none), checked (all), indeterminate (some).",
            "States switch based on user input and child selection.",
            "Your app controls the logic. The component renders the static UI."
          ]
        },
        {
          "key": "disabled",
          "title": "Disabled",
          "description": "The option is unavailable for interaction. It may be selected or unselected but cannot be changed by the user.",
          "list": [
            "Use Checkbox for independent binary choices or multi-select option groups."
          ]
        },
        {
          "key": "usage-terms-and-conditions",
          "title": "Usage: Terms & conditions",
          "description": "This checkbox is often used to confirm user agreement with legal terms. It typically starts unchecked and must be checked to proceed. It may become disabled if the form is locked or certain conditions aren’t met.",
          "list": [
            "Slot in a string of text and accompanied link or supporting elements.",
            "No body component is required as this is built in."
          ]
        }
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "onboarding-form",
          name: "Onboarding Form",
          description:
            "Demonstrates an onboarding form within a card, using logic to confirm terms acceptance. Components include Heading, Input Fields, Checkbox, and Button.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1NrgynTcdmVVKSYCsQwlOW/5fc4776c1860b498a59a2865b4e57ecb/Card-Onboarding-Composition.png",
        },
      ],
    },

    related: {
      items: [
        { name: "Switch", link: "https://guides.muibook.com/switch" },
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

    behaviour: {
      list: [""],
    },

    writing: {
      list: [""],
    },
  },
};
