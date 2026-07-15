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
    storybook: ["https://stories.muibook.com/?path=/docs/navigation-tab-bar--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-tabs"],
    website: ["https://muibook.com/tab-bar"],
    guides: ["https://guides.muibook.com/tab-bar"],

    usage: {
      list: [
        "Use to organise related content or views at the same level of hierarchy.",
        "Ideal for toggling between sections without navigating away from the page.",
        "Use the size API (x-small, small, medium, large) to align tabs with adjacent buttons.",
        "Use named slots (before/after) to compose icons and badges in tab items.",
        "Use variant='dots' for compact pagination controls such as carousel navigation.",
        "Use variant='ghost' when you want only active-tab emphasis without outer tab bar chrome.",
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

    stories: {
      items: [
        { key: "default", title: "Default", description: "Switches between related views at the same hierarchy level.", list: ["Keep labels short and use tabs only for closely related content."] },
        { key: "surface-usage", title: "Surface Usage", description: "Adapts the Tab Bar hierarchy when composed inside a framed surface.", list: ["Card, Card Body, Drawer, Dialog, and Carousel automatically apply usage='surface' through neutral layout wrappers while preserving the nearest nested surface owner.", "Surface usage applies the base surface to the Tab Bar background and border, with the elevated surface behind the active tab."] },
        { key: "stroke-none", title: "Stroke: None", description: "Removes the outer stroke when a recessed or surrounding surface already defines the Tab Bar area.", list: ["Use only when another boundary clearly contains the Tab Bar.", "The Tab Bar uses visible overflow in this mode so focus and shadow treatments are not clipped by the parent boundary."] },
        { key: "inset", title: "Inset Tab", description: "Applies a floating inset treatment to the active tab.", list: ["Use for compact tool surfaces where a pill treatment suits the surrounding controls."] },
        { key: "radius", title: "Radius", description: "Adjusts the base radius of the Tab Bar and items.", list: ["Match the radius to adjacent controls and the containing surface."] },
        { key: "controller", title: "Tab Controller and Tab Panel", description: "Connects tab selection to matching content panels.", list: ["Use matching values between each Tab Item and Tab Panel.", "Use full-width only when tabs should divide the available width evenly."] },
        { key: "speed", title: "Animation Speed", description: "Customises the active indicator transition duration.", list: ["Keep transitions brief and consistent with nearby navigation."] },
        { key: "sizes", title: "Size Variants", description: "Matches Tab Bar density to its layout context.", list: ["Use one size consistently within a tab group."] },
        { key: "button-parity", title: "Size Parity with Button", description: "Aligns Tab Bar and Button dimensions in shared toolbars.", list: ["Use matching size values for controls that share a row."] },
        { key: "slots", title: "Before and After Slots", description: "Adds icons, badges, or compact accessories to tab labels.", list: ["Keep accessories concise and preserve clear tab names."] },
        { key: "default-width", title: "Default Width", description: "Sizes the Tab Bar to its content.", list: ["Use content width when tabs do not need to fill their container."] },
        { key: "dots", title: "Dots Variant", description: "Provides compact pagination controls for carousels and similar views.", list: ["Use only when position is understandable without text labels."] },
        { key: "ghost", title: "Ghost Variant", description: "Emphasises only the active tab without outer Tab Bar chrome.", list: ["Use when the surrounding surface already provides enough structure."] },
        { key: "full-width", title: "Full Width", description: "Distributes tab items evenly across the available width.", list: ["Use for a small, stable set of peer views.", "Avoid full width when labels vary substantially in length."] },
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
