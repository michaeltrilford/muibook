import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  RadioGroup: {
    title: "Radio Group",
    description: "Radio Group manages a related set of radios so exactly one option can be selected, labelled, and submitted together.",

    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-radio-group/index.ts"],
    website: ["https://muibook.com/#/radio-group"],
    guides: [""],

    usage: {
      list: [
        "Use mui-radio-group when a user must select exactly one option from a known set.",
        "Set label when the group needs a visible question or section prompt.",
        "Use hide-label when nearby context already explains the group but an accessible label is still required.",
        "Use optional when the user may leave the group unselected.",
        "Set value on the group to control which radio is selected across the entire set.",
        "Use one size on the group so all child radios stay visually aligned.",
      ],
    },

    accessibility: {
      designerList: [
        "Use a clear group label so the set reads as one question rather than isolated controls.",
        "Reserve radio groups for mutually exclusive choices. If users can choose more than one option, use Checkbox instead.",
      ],
      engineerList: [
        "mui-radio-group provides radiogroup semantics and forwards a shared name to child radios.",
        "Use the group label or aria-labelledby so assistive technology can announce the question before the options.",
        "Emit and listen to the group change event when app state should update from the selected value.",
      ],
    },

    anatomy: {
      image: "",
      list: ["Group label", "Optional indicator", "Radio set"],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "A standard labelled radio group for one required choice.",
          image: "",
        },
        {
          key: "optional",
          title: "Optional",
          description: "Use when the group is supplementary and can be left unselected.",
          image: "",
        },
        {
          key: "hidden-label",
          title: "Hidden Label",
          description: "Use when surrounding layout already provides the visible context but the group still needs an accessible label.",
          image: "",
        },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "settings-choice",
          name: "Settings Choice",
          description: "A group of mutually exclusive account or preference options controlled as one field.",
          image: "",
        },
      ],
    },

    related: {
      items: [
        { name: "Radio", link: "https://guides.muibook.com/radio" },
        { name: "Field", link: "https://guides.muibook.com/field" },
        { name: "Checkbox", link: "https://guides.muibook.com/checkbox" },
      ],
    },

    rules: [
      {
        heading: "Use for single selection",
        description: "Radio Group is for one choice from a fixed set, not for independent toggles.",
        doContent: [
          {
            description: "Use a radio group for choices like plan, delivery speed, or notification preference where only one answer is valid.",
            image: "",
          },
        ],
        dontContent: [
          {
            description: "Do not use radio group when users may select multiple options or when each option is an independent setting.",
            image: "",
          },
        ],
      },
    ],

    behaviour: {
      list: [
        "The group syncs a shared name and size to all child radios.",
        "When value is set on the group, the matching child radio becomes checked and other checked radios are cleared.",
        "When disabled is set on the group, all child radios are disabled together.",
      ],
    },

    writing: {
      list: [
        "Write the label as the question or decision the radios answer, and keep option text mutually exclusive and easy to compare.",
      ],
    },
  },
};
