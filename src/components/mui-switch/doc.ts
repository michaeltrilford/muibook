import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Switch: {
    title: "Switch",
    description:
      "A Switch is a UI component used to toggle between two states, typically “on” and “off.” It provides a clear visual indication of an active or inactive setting.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/0dWww7c9wOs9YLPwgsTyy/323dcb62a6be394bbba8f268c8ae62b9/Switch_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=147-1003&t=FSv3FEahG8VQW1FZ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-switch--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-switch/index.ts"],
    website: ["https://muibook.com/#/switch"],
    guides: ["https://guides.muibook.com/switch"],

    usage: {
      list: [
        "Enable or disable a setting – Toggle features like dark mode or notifications.",
        "Control device states – Switch on/off smart devices or system settings.",
        "Trigger immediate actions – Instantly apply changes without requiring confirmation.",
        "Use size='x-small|small|medium|large' to match switch density with surrounding controls.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [
        "A label is required and applied as aria-label to describe the switch’s purpose.",
        "Uses role='switch' and updates aria-checked for assistive tech.",
        "The label isn’t shown visually—context is provided through icons or nearby text.",
        "disabled sets aria-disabled and blocks interaction.",
        "Supports keyboard navigation with visible focus styles.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/5XNIjIfzNIfo3uIavVlSCU/7bbdc09ee60c7fa03ab19ff2dab558a8/Switch_-_Anatomy.png",
      list: [
        "Thumb (Handle) – The movable part that toggles between the on and off states.",
        "Off Track: The background when the switch is in the “off” state.",
        "On Track: The background when the switch is in the “on” state.",
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

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "theme-switch",
          name: "Theme Switch",
          description:
            "This example from the Muibook Docs website demonstrates a switch component used to toggle the interface between light and dark modes.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/19NvfLGnzRI4MebRSU2aMH/d6ffcca7dffb6c7b843cafc83b812d90/SwitchTheme-Composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Checkbox",
          link: "https://guides.muibook.com/checkbox",
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
