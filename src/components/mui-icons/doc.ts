import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Icons: {
    title: "Icons",
    description:
      "Simple, symbolic visuals used to communicate meaning quickly and support recognition across an interface. Icons enhance usability when used with labels, reinforce actions, and help reduce cognitive load in dense layouts.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/4JIAdTt9tCZkaCvewnabib/a56d78d389553d207664fbe7f103d572/Icons_-_Home_Image.png",
    ],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-311&t=fSFYVey9aCoE5oQa-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/content-icons--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-icons"],
    website: ["https://muibook.com/#/icons"],
    guides: ["https://guides.muibook.com/icons"],

    usage: {
      list: [
        "Use to support labels or actions, not replace them.",
        "Ideal for reinforcing meaning in buttons, menus, or navigation.",
        "Ensure consistency in size, style, and alignment across the product.",
        "Avoid using icons without clear meaning or universal recognition.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/2f8wjsLiD2PWa8l1teXquC/e63402df34cb2b2def97c8c5bd13111d/icons-anatomy.png",
      list: [""],
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
          key: "ai-playground",
          name: "AI Playground (Error)",
          description:
            "Demonstrates the Muiplay AI Playground showing a floating error positioned close to the field where a prompt is required to generate a task.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/40RfRPVAN9dvWO7UFuIiUC/52de3cffd69a5bcc2e457f8de03bb9cf/Play-Alert-Composition.png",
        },
        {
          key: "wallet",
          name: "Wallet",
          description:
            "This example shows a wallet view featuring a digital card, transaction and statement tabs. It demonstrates how foundational components like tabs, slats, and buttons can be composed to create flexible, real-world layouts.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/6RoGBcahh63o16PAcEsgyX/36f5c8d9bf0e8754a574955b32ee6eda/Tab_Bar_-_Composition.png",
        },
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
          name: "Link",
          link: "https://guides.muibook.com/link",
        },
        {
          name: "Button",
          link: "https://guides.muibook.com/button",
        },
        {
          name: "Input",
          link: "https://guides.muibook.com/input",
        },
        {
          name: "Add on",
          link: "https://guides.muibook.com/add-on",
        },
        {
          name: "Slat",
          link: "https://guides.muibook.com/slat",
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
