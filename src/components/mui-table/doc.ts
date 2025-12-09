import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Table: {
    title: "Table",
    description:
      "Displays data in a grid layout to support scanability and comparison across rows and columns. Best suited for structured, repeatable content.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/34Yd6uWrfM5Ihv4rdniHYy/9e1698ce2c23d6c74006bf3f2ae93066/Table_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=958-8696&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-table--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-table"],
    website: ["https://muibook.com/#/table"],
    guides: ["https://guides.muibook.com/table"],

    usage: {
      list: [
        "Use for structured content that benefits from a grid format.",
        "Ideal for comparing data across multiple rows and columns.",
        "Supports sorting, filtering, or action buttons if needed.",
        "Avoid for unstructured, visual, or narrative-based content.",
        "Tables should adapt for smaller viewports by switching to the Slat component.",
        "Prioritise key content and simplify structure when transitioning to mobile views.",
      ],
    },

    accessibility: {
      designerList: [
        "mui-table uses role='table'.",
        "mui-row-group uses role='rowgroup'.",
        "mui-row uses role='row'.",
        "mui-cell uses role='cell'.",
        "Follows table semantics for screen reader support.",
      ],
      engineerList: [
        "mui-table uses role='table'.",
        "mui-row-group uses role='rowgroup'.",
        "mui-row uses role='row'.",
        "mui-cell uses role='cell'.",
        "Follows table semantics for screen reader support.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/2KHxAyGbYW7qwySwCLYrbo/0ffc98c3eef07098afaf64bebc6afd4a/Table_-_Anatomy.png",
      list: [
        "Heading: The header row of the table accepts headings and other arrangements as needed.",
        "Data: The row contains standard data as well as other arrangements, such as grouped content.",
        "Actions: The main actions for each table row can be included in a dedicated column or slot.",
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
          key: "prop-types-table",
          name: "Prop Types Table",
          description:
            "Attached is a standard example demonstrating how to use the table to present general data for component prop types.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1JeUHjbeqVNgTvlVZkeHjw/7f652efbea5cc6aa436449905e2ae48e/table_-_composition.png",
        },
        {
          key: "simple-table-dropdown",
          name: "Simple Table w/ Dropdown",
          description:
            "Example of a simple table with a dropdown action positioned on the far right, following the content. Demonstrates the table used within a card layout, as it might appear on a page or settings view.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3IIRPg0pdQB66NJniCZvlo/2600a8bee4ad1c79a63dc48d3032ee34/table-composition-design-pricing.png",
        },
        {
          key: "compliance-dashboard-table",
          name: "Compliance Dashboard Table",
          description: "This example shows a desktop view of a table used within an accounting compliance dashboard.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3vUKA5C5iJ3LvjLwf2WiO9/274ffe423dbe828244294f6809172ce1/table-composition-compliance-dashboard.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "",
          link: "",
        },
      ],
    },

    rules: [
      {
        heading: "Icon-Only Actions",
        description: "",
        doContent: [
          {
            description: "Use a 'medium' size icon when using an icon-only medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/3syzrNBEXbBjp5hGEUvF4M/0471f4b16939d8ee54deaf48997ff455/action-icon-do.png",
          },
        ],
        dontContent: [
          {
            description: "Avoid 'x-small', 'medium' or 'large' size icons within an icon-only medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5V2TE85dY848jz1dP6Y0lC/b8e433c8abad5a4402ff1f86ddb8c848/action-icon-dont.png",
          },
        ],
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
