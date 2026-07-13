import type { MuiDocs } from '../../types/guidelines';

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
    website: ["https://muibook.com/accordion"],
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
    stories: {
      items: [
        {
          "key": "accordion-inline",
          "title": "Accordion Inline",
          "description": "The inline accordion is typically used within a block layout as a secondary UI element to a block element.",
          "list": [
            "Use Accordion for progressive disclosure when users benefit from scanning headings before opening detail."
          ]
        },
        {
          "key": "accordion-group-and-block",
          "title": "Accordion Group & Block",
          "description": "The block accordion is typically used within a page layout full-width to the parent container.",
          "list": [
            "Use Accordion for progressive disclosure when users benefit from scanning headings before opening detail."
          ]
        },
        {
          "key": "accordion-group-and-block-exclusive",
          "title": "Accordion Group & Block: Exclusive",
          "description": "The block accordion is typically used within a page layout full-width to the parent container.",
          "list": [
            "Use Accordion for progressive disclosure when users benefit from scanning headings before opening detail."
          ]
        },
        {
          "key": "tab-behaviour-button",
          "title": "Tab Behaviour: Button",
          "description": "A demo showcasing how a nested button will be ignored by the tabbing functionality if collapsed.",
          "list": [
            "Use Accordion for progressive disclosure when users benefit from scanning headings before opening detail."
          ]
        },
        {
          "key": "tab-behaviour-link",
          "title": "Tab Behaviour: Link",
          "description": "A demo showcasing how a nested link will be ignored by the tabbing functionality if collapsed.",
          "list": [
            "Use Accordion for progressive disclosure when users benefit from scanning headings before opening detail."
          ]
        },
        {
          "key": "detail-space-none",
          "title": "Detail Space: None",
          "description": "In accordion-block, you are able to turn off the space within the detail section.",
          "list": [
            "Ideal for using the accordion block to contain navigation items",
            "Support full-bleed content such as images or documents."
          ]
        },
        {
          "key": "card-w-accordion",
          "title": "Card w/ Accordion",
          "description": "Demonstrates the Card w/ Accordion Accordion treatment.",
          "list": [
            "When slotted into a Card in the light DOM, accordion-block automatically adds the card-slot class to adjust padding",
            "If it’s nested inside a local component (shadow DOM) and then slotted into a Card, it won’t detect the slot, so you’ll need to add the card-slot class manually."
          ]
        },
        {
          "key": "card-header-w-accordion",
          "title": "Card Header w/ Accordion",
          "description": "You can add in a mui-rule to help add a division between the header and body of the card",
          "list": [
            "When slotted into a Card in the light DOM, accordion-block automatically adds the card-slot class to adjust padding",
            "If it’s nested inside a local component (shadow DOM) and then slotted into a Card, it won’t detect the slot, so you’ll need to add the card-slot class manually."
          ]
        },
        {
          "key": "accordion-slat-detection",
          "title": "Accordion: Slat Detection",
          "description": "Demonstrates the Accordion: Slat Detection Accordion treatment.",
          "list": [
            "When an accordion is used with mui-slat-group, the attribute of usage='accordion' is applied automatically",
            "Opt-out by not using the mui-slat-group, but you will have to craft your own layout."
          ]
        },
        {
          "key": "card-slat-detection",
          "title": "Card: Slat Detection",
          "description": "Demonstrates the Card: Slat Detection Accordion treatment.",
          "list": [
            "When a card and accordion is used togther with mui-slat-group, the attribute of usage='card' is applied automatically.",
            "Opt-out by not using the mui-slat-group, but you will have to craft your own layout."
          ]
        },
        {
          "key": "accordion-core",
          "title": "Accordion Core",
          "description": "Use your imagination and compose your own accordion experience with some overhead in effort. Below is a variety of examples using cards and different techniques to toggle an icon based on the open state.",
          "list": [
            "Use Accordion for progressive disclosure when users benefit from scanning headings before opening detail."
          ]
        }
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
