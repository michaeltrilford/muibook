import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Carousel: {
    title: "Carousel",
    description:
      "A carousel component with tab-based navigation, enabling users to switch between views or content sections with ease.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/55yS6ecrFIoh0pA08R98VB/07a93872e746c5723b7b4b21f0a9d56a/Carousel_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=958-8697&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/visuals-carousel--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-carousel"],
    website: ["https://muibook.com/carousel"],
    guides: ["https://guides.muibook.com/carousel"],

    usage: {
      list: [
        "Use to present grouped content that benefits from both tabbed access and horizontal transitions.",
        "Ideal for feature highlights, onboarding steps, or content previews.",
        "Ensure tab labels are short and clearly indicate the content behind each panel.",
        "Avoid using for unrelated content or when vertical scrolling is more appropriate.",
        "When adding custom content, account for the placement of carousel controls and maintain sufficient whitespace for readability and alignment.",
        "Swap out default controls when a different interaction pattern better suits the content or context.",
        "Carousel owns a framed surface by default. Use borderless, radius='none', or both when composing it flush inside another surface.",
        "Swipe and pointer dragging are enabled by default. Use swipe='none' when complex panel interaction requires gestures to remain application-owned.",
      ],
    },

    accessibility: {
      designerList: [
        "Users can navigate between carousel items using the left/right arrow keys, as well as Home and End keys.",
        "The active tab is always keyboard-focusable and shows a visible focus outline for clarity.",
        "Tabs are marked up using semantic roles (like tablist and tab) to help assistive technologies understand the structure.",
        "Behind the scenes, attributes like aria-selected and tabindex update automatically to reflect which tab is active.",
      ],
      engineerList: [
        "Left/Right arrows, Home and End keys let keyboard users navigate between carousel items.",
        "aria-selected and tabindex attributes are updated on each tab-item when it becomes active or inactive.",
        "Each active tab-item can receive focus and shows a focus-visible outline.",
        "tab-bar uses role=tablist to group related tab-items and each tab-item uses role=tab within the tab-bar.",
        "Pointer gestures ignore interactive panel controls and suppress text selection only after a horizontal drag is confirmed.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/7lrQyuy00XTDGTww5lWXsH/427804b3af03935cc06e8a691a5006a0/Carousel_-_Anatomy.png",
      list: [
        "The outer wrapper that defines the structure, sliding behaviour, and background styling of the carousel.",
        "A flexible area where custom content is added. Designers are responsible for setting internal spacing, layout, and composition.",
        "Navigation elements such as tabs, dots, or arrows that float above the content. These controls can be customized or replaced based on the use case.",
      ],
    },

    variants: {
      items: [
        {
          key: "position",
          title: "Position",
          description:
            "Carousel controls can be positioned at any side or corner of the container, including top center, right middle, bottom center, left middle, top left, top right, bottom left, and bottom right.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/Yc6eg8YWdiiSiiPzR588D/bdfbad0967d9cc059310bd1406c656c5/position-bottom.png",
        },
      ],
    },

    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "A flexible, composable carousel that gives you full control over the content and internal layout.",
          "list": [
            "Carousel controls are set to bottom-center by default",
            "Carousel automatically applies usage='surface' to its Tab Bar controls so the controls match the elevated Carousel surface.",
            "Swipe horizontally with touch, pen, or mouse to move between panels; vertical page scrolling remains available.",
            "Use swipe='none' to turn off gesture navigation while retaining Tabs and keyboard controls.",
            "Internal padding is required",
            "The var(--carousel-tab-offset) is available to help with control spacing - though, not required",
            "You will need knowledge of CSS to add your specific custom content."
          ]
        },
        {
          "key": "auto-rotate",
          "title": "Auto Rotate",
          "description": "Demonstrates how to add set-up auto-rotate of the carousel panels.",
          "list": [
            "Use auto rotation only when users can pause it and content remains readable."
          ]
        },
        {
          "key": "borderless",
          "title": "Borderless",
          "description": "Removes the Carousel frame border while retaining its surface and radius.",
          "list": [
            "Use borderless when another component already provides the surrounding border."
          ]
        },
        {
          "key": "no-radius",
          "title": "No Radius",
          "description": "Removes the Carousel surface radius while retaining its default border.",
          "list": [
            "Use radius='none' when the Carousel must meet adjacent content with square edges.",
            "Combine radius='none' with borderless only when the Carousel needs to be fully flush."
          ]
        },
        {
          "key": "dots-controls",
          "title": "Dots Controls",
          "description": "Uses the Tabs dots variant for compact carousel pagination.",
          "list": [
            "Use dots for a small set of slides where labels are unnecessary."
          ]
        },
        {
          "key": "custom-layout",
          "title": "Custom Layout",
          "description": "Demonstrates how to add custom compositions and layouts within the carousel panels.",
          "list": [
            "Keep each panel structurally consistent and reserve internal layout decisions for panel content."
          ]
        },
        {
          "key": "map-data",
          "title": "Map Data",
          "description": "Map dynamic data to generate carousel tabs and panels.",
          "list": [
            "Use stable values to connect generated tabs and panels."
          ]
        }
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
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
          name: "Tab Bar",
          link: "https://guides.muibook.com/tab-bar",
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
      list: [
        "Horizontal swipe and pointer dragging are enabled by default for touch, pen, and mouse input.",
        "After 4px of horizontal movement confirms drag intent, release moves exactly one panel in the drag direction.",
        "Vertical gestures retain page scrolling, while gestures beginning on interactive controls remain owned by those controls.",
        "Cancelled gestures and outward drags at the first or last panel return to the current panel.",
        "Use swipe='none' to disable gesture navigation without changing Tab or keyboard behavior."
      ],
    },

    writing: {
      list: [""],
    },
  },
};
