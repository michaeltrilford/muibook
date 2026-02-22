import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Select: {
    title: "Select",
    description:
      "A versatile dropdown component for selecting from a list of options, supporting customisable styles and accessibility features.",

    hero: [""],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=117-2068&t=GMqx21isUVAMpLJp-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-select--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-select/index.ts"],
    website: [""],
    guides: ["https://guides.muibook.com/select"],

    usage: {
      list: [
        "Use for single or multiple selections from predefined options.",
        "Ideal for forms, filters, or settings where space is limited.",
        "Use size='x-small|small|medium|large' to align select scale with surrounding form controls.",
        "Use the optional attribute when a field is not required to show a clear (optional) marker in the label.",
        "Ensure options are clear and concise, with logical ordering.",
        "Avoid overly long lists without search or grouping functionality.",
      ],
    },

    accessibility: {
      designerList: [
        "A label is required for screen reader support, describing the purpose of the select.",
        "If hide-label is used, the label is visually hidden but still accessible via aria-label.",
        "The label and select are linked using for and id attributes. If no id is provided, one is generated.",
        "Optional fields can be explicitly communicated with the optional attribute without changing label association.",
        "Keyboard users see a clear focus style when navigating.",
        "The disabled attribute is native and fully supported by assistive tech.",
      ],
      engineerList: [
        "A label is required for screen reader support, describing the purpose of the select.",
        "If hide-label is used, the label is visually hidden but still accessible via aria-label.",
        "The label and select are linked using for and id attributes. If no id is provided, one is generated.",
        "Optional fields can be explicitly communicated with the optional attribute without changing label association.",
        "Keyboard users see a clear focus style when navigating.",
        "The disabled attribute is native and fully supported by assistive tech.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/HcG0gphexJNvxrV1ZMe0G/39cb6647101b8fe95ead10bfe9f1bd6d/Select_-_Anatomy.png",
      list: [
        "Label: Describes the purpose of the Select; required for accessibility. Can be hidden if the context is clear. Ensure the label text is still provided for developers to support screen reader access.",
        "Trigger: Displays the currently selected option and opens the list on interaction.",
        "Dropdown List: Contains selectable options in a list format.",
        "Option: Individual choice the user can select; shows label, stores value.",
      ],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description:
            "Use for common form inputs where users must choose a single value from a clear and limited set.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/30vMoYiARbWBhbR62myex2/85b9d6dee432edea9a4c351222889227/Select-Default.png",
        },
        {
          key: "hide-label",
          title: "Hide Label",
          description:
            "Use in dense layouts where a visual label would be redundant, such as grouped fields with clear section headings. Ensure the label name is documented for developers, as the component requires a label for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1zrjFOW3ZR5j33sryrXbn8/3ff80a7e652247f53cde5798e1d8bcfa/Select-Hide-Label.png",
        },
        {
          key: "disabled",
          title: "Disabled",
          description: "Use when options are not currently applicable but should still be visible for context",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/25y8iR59VPmcf0FM17kjdw/eaafac160c620fd8bf6a5974a9a1ae75/Select-Disabled.png",
        },
        {
          key: "error",
          title: "Error",
          description:
            "Use to indicate required or invalid input. Error messaging is handled by the Field component, so the Select is intended to be used in conjunction with it.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7siP5JLSnR2QxsP39mCWjx/ff55b2736582144e779c505fa4f20008/Select-Error.png",
        },
        {
          key: "before",
          title: "Before",
          description:
            "The Select component is placed before the input area; use for supporting context like filter type. Select width should be defined in code. In Figma, replace the nested Select with a local version and apply a min-width to simulate the correct layout.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4FZPRXjCsLDe4mxqaJP0dm/5804a1a1784de47ef6576462687d1f3b/Select-Before.png",
        },
        {
          key: "after",
          title: "After",
          description:
            "The Select component is placed after the input area; use for complementary context like currency type. Select width should be defined in code. In Figma, replace the nested Select with a local version and apply a min-width to simulate the correct layout.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7A9Py3FXpCnl7a9VcOA9Rj/59a226fe300af04ff2e7d5f5c1e9d855/Select-After.png",
        },
      ],
    },

    compositions: {
      description: "",
      items: [
        {
          key: "",
          name: "",
          description: "",
          image: "",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Field",
          link: "https://guides.muibook.com/field",
        },
        {
          name: "Input",
          link: "https://guides.muibook.com/input",
        },
        {
          name: "File Upload",
          link: "https://guides.muibook.com/file-upload",
        },
        {
          name: "Add on",
          link: "https://guides.muibook.com/add-on",
        },
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
