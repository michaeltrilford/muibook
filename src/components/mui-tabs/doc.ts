import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Tabs: {
    title: "Tabs",
    description:
      "Allows users to switch between views or content sections by selecting from a group of tabs. Tabs keep related content within a single surface, reducing the need for navigation and maintaining context.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/5EC8Uj4pMaQGe2UcNntYLX/040eb1feec8def04504dfa3729494b52/Tab_bar_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=126-560&t=ZfvVjZFxH7mQ72pi-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/navigation-tabbar--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-tabs"],
    website: ["https://muibook.com/#/tab-bar"],
    guides: ["https://guides.muibook.com/tab-bar"],

    usage: {
      list: [
        "Use to organise related content or views at the same level of hierarchy.",
        "Ideal for toggling between sections without navigating away from the page.",
        "Keep labels short, clear, and consistently styled.",
        "Avoid using when content is unrelated or exceeds a manageable number of tabs.",
      ],
    },

    accessibility: {
      designerList: [
        "Keyboard users can navigate across tabs using the left/right arrow keys, as well as Home and End keys to jump to the first or last tab.",
        "The active tab always shows a clear focus outline and can be navigated to using the keyboard.",
        "Tabs are grouped in a way that assistive technologies can understand, using standard roles and attributes.",
        "The system keeps track of which tab is active behind the scenes, so screen readers and keyboard users always stay in sync.",
      ],
      engineerList: [
        "Left/Right arrows, Home and End keys let keyboard users navigate between tab-items.",
        "aria-selected and tabindex attributes are updated on each tab-item when it becomes active or inactive.",
        "Each active tab-item can receive focus and shows a focus-visible outline.",
        "tab-bar uses role=tablist to group related tab-items and each tab-item uses role=tab within the tab-bar.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/koeu63xbKYOWZgs8i0eev/983e09362714a2dcdcc7262889ba1236/Tabs_-_Anatomy.png",
      list: [
        "Active: Indicates the currently selected tab.",
        "Inactive: Indicates a tab that is not selected and is waiting for user interaction.",
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
          key: "wallet",
          name: "Wallet",
          description:
            "This example shows a wallet view featuring a digital card, transaction and statement tabs. It demonstrates how foundational components like tabs, slats, and buttons can be composed to create flexible, real-world layouts.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/6RoGBcahh63o16PAcEsgyX/36f5c8d9bf0e8754a574955b32ee6eda/Tab_Bar_-_Composition.png",
        },
        {
          key: "product-carousel",
          name: "Product Carousel",
          description: "Demonstrates how to add custom compositions and layouts within the carousel panels.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4NRMfGil4AcMUh7FDhYyHz/7c4636822eba6d3ae15e684f50d10fdd/Carousel_-_Composition.png",
        },
        {
          key: "carousel-showcase",
          name: "Carousel Showcase",
          description:
            "This example from the GuruSuite website demonstrates the carousel used to showcase two of the products on offer.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2TaRRm351HyujF9mT2w1wH/3958f69e939d20618751742130dc5f06/GuruSuite-Carousel-Composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Carousel",
          link: "https://guides.muibook.com/carousel",
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
