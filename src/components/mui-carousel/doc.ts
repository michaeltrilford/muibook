// UX guideline documentation is stored in each component’s Doc.ts file.
// We include generic content that supports the Muibook storefront, but we intentionally
// exclude Storybook-specific data since it isn’t reused across the system.

interface VariantItem {
  key: string;
  title: string;
  description: string;
  image?: string;
}

interface CompositionItem {
  key: string;
  name: string;
  description: string;
  image?: string;
}

interface RuleItem {
  description?: string;
  image?: string;
}

interface ComponentDoc {
  title?: string;
  hero?: string[];
  figma?: string[];
  github?: string[];
  guides?: string[];
  storybook?: string[];
  website?: string[];
  description: string;

  usage?: {
    list: string[];
  };

  accessibility?: {
    designerList?: string[];
    engineerList?: string[];
  };

  anatomy?: {
    image?: string;
    list: string[];
  };

  variants?: {
    items: VariantItem[];
  };

  compositions?: {
    description?: string;
    items: CompositionItem[];
  };

  related?: {
    items: { name: string; link: string }[];
  };

  rules?: {
    heading: string;
    description: string;
    doContent?: RuleItem[];
    dontContent?: RuleItem[];
  }[];

  behaviour?: {
    image?: string;
    description?: string;
    list: string[];
  };

  writing?: {
    list: string[];
  };
}

type MuiDocs = Record<string, ComponentDoc>;

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
    storybook: ["https://stories.muibook.com/?path=/docs/navigation-carousel--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-carousel"],
    website: ["https://muibook.com/#/carousel"],
    guides: ["https://guides.muibook.com/carousel"],

    usage: {
      list: [
        "Use to present grouped content that benefits from both tabbed access and horizontal transitions.",
        "Ideal for feature highlights, onboarding steps, or content previews.",
        "Ensure tab labels are short and clearly indicate the content behind each panel.",
        "Avoid using for unrelated content or when vertical scrolling is more appropriate.",
        "When adding custom content, account for the placement of carousel controls and maintain sufficient whitespace for readability and alignment.",
        "Swap out default controls when a different interaction pattern better suits the content or context.",
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
      list: [""],
    },

    writing: {
      list: [""],
    },
  },
};
