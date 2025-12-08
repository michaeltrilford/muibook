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
  guides?: string[];
  github?: string[];
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
    list: string[];
  };
  writing?: {
    list: string[];
  };
}

// Wrapper keyed by component name
type MuiDocs = Record<string, ComponentDoc>;

export const muiDocs: MuiDocs = {
  Accordion: {
    title: "Accordion",
    description:
      "A collapsible container used to reveal sections of related content. Useful for progressive disclosure, especially when space is limited or the content is secondary. On smaller viewports, accordions can replace tables to group and reveal related rows of data.",
    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/1TykTEhPNTJlZdyzqAayEH/b5293336f033020bbcef964db811cdd3/Accordion_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=958-8558&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-accordion--docs"],
    website: ["https://muibook.com/#/accordion"],
    guides: ["https://guides.muibook.com/accordion"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-accordion/index.ts"],
    usage: {
      list: [
        "Use to progressively reveal grouped or secondary content.",
        "Can replace tables on small viewports when content is grouped by row.",
        "Ideal for mobile or narrow layouts where space is constrained.",
        "Stack, slat, or grid layouts can be used inside an accordion for custom structures.",
      ],
    },
    accessibility: {
      designerList: [
        "Accordion summary uses role='button' and tabindex='0' for keyboard access.",
        "Supports Enter and Space keys for toggling.",
        "aria-expanded reflects open/closed state.",
        "aria-controls links summary to detail with a unique ID.",
        "mui-heading applies semantic heading with role='heading' and aria-level.",
        "Chevron icon rotates visually and the state is conveyed via aria-expanded.",
      ],
      engineerList: [
        "Accordion summary uses role='button' and tabindex='0' for keyboard access.",
        "Supports Enter and Space keys for toggling.",
        "aria-expanded reflects open/closed state.",
        "aria-controls links summary to detail with a unique ID.",
        "mui-heading applies semantic heading with role='heading' and aria-level.",
        "Chevron icon rotates visually and the state is conveyed via aria-expanded.",
      ],
    },
    anatomy: {
      list: [
        "Heading: Provides the accordion with a heading",
        "Icon: A chevron icon that indicates the state of the Accordion",
        "Detail: Define the detail content for the expanded section within the Accordion.",
      ],
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/4JgAhsxwz3YOt28fLTVgDB/b404f3407eb06e2f26a196da04f7d217/Accordion_-_Anatomy.png",
    },
    variants: {
      items: [
        {
          key: "accordion-block",
          title: "Accordion Block",
          description: "The block accordion is typically used within a page layout full-width to the parent container.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1L2XfteVwNBQcFlddTYmfi/c791eb538285e2cfb919342e84228811/accordion-block_-_Variants.png",
        },
        {
          key: "accordion-inline",
          title: "Accordion Inline",
          description:
            "The inline accordion is typically used within a block layout as a secondary UI element to a block element.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/RMnvBLRsW3Vvq9V3yaTcW/86afba39ed0b7ffc00d0033b1b1bfd07/accordion_inline_-_Variants.png",
        },
      ],
    },
    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "menu-groups",
          name: "Menu Groups",
          description:
            "Accordions can be used in menus to collapse and expand groups of related items, helping keep navigation organized and reducing visual clutter.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/zFHrSdH3CYbZXOv8WFKkL/90cad70c32b40fca61a875263d4cc366/accordion_menu_-_composition.png",
        },
        {
          key: "code-snippets",
          name: "Code snippets",
          description:
            "An accordion in a card footer allows code snippets or supporting details to be revealed on demand, keeping the card compact while still providing access to additional information.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7FKVgkCxv3UenOQTC9Tr4R/25c357aceea16b169c48775d7363df1d/accordion_card_footer_-_composition.png",
        },
        {
          key: "account-activity",
          name: "Account Activity (Accordion + Card)",
          description:
            "Accordions can split account activity into segments, such as by year, with the ability to expand each section for detailed transactions. This makes large sets of data easier to scan and navigate.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4PEUUHgxpuDM6nDgdGOotY/bf078e07bc3fbabf07f03b99800e5306/accordion_card_body_-_composition.png",
        },
      ],
    },
    rules: [
      {
        heading: "",
        description: "",
        doContent: [
          { description: "", image: "" },
          { description: "", image: "" },
        ],
        dontContent: [{ description: "" }, { description: "" }],
      },
    ],
    behaviour: {
      list: [""],
    },
    writing: {
      list: [""],
    },
    related: {
      items: [
        { name: "Card", link: "https://guides.muibook.com/card" },
        { name: "Slat", link: "https://guides.muibook.com/slat" },
      ],
    },
  },
};
