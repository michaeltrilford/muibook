import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  ProgressRing: {
    title: "Progress Ring",
    description:
      "Progress Ring displays circular determinate progress with optional center content. It belongs to the Progress family and is best for compact progress summaries in dashboards, cards, tables, and responsive layouts.",

    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-progress-ring--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-progress-ring/index.ts"],
    website: ["https://muibook.com/progress"],
    guides: ["https://guides.muibook.com/progress"],

    usage: {
      list: [
        "Use Progress Ring for compact determinate progress where a linear bar would take too much horizontal space.",
        "Use center content for short values such as 2/4 or 75%.",
        "Use progress for percentage-based values, or value and max for count-based values.",
        "Use a clear label when the center content is abbreviated or absent.",
      ],
    },

    accessibility: {
      designerList: ["Do not rely on ring color alone; pair important progress with text or surrounding labels."],
      engineerList: ["Progress Ring sets role='progressbar' and exposes aria-valuemin, aria-valuemax, and aria-valuenow."],
    },

    anatomy: {
      image: "",
      list: [
        "Track: The circular background stroke.",
        "Indicator: The circular foreground stroke representing progress.",
        "Center content: Optional short text inside the ring.",
      ],
    },

    variants: {
      items: [
        { key: "small", title: "Small", description: "Use in dense table cells and compact summaries.", image: "" },
        { key: "medium", title: "Medium", description: "Default ring size.", image: "" },
        { key: "large", title: "Large", description: "Use in larger dashboard or card summaries.", image: "" },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [],
    },

    related: {
      items: [
        { name: "Progress", link: "https://guides.muibook.com/progress" },
        { name: "Table", link: "https://guides.muibook.com/table" },
        { name: "Responsive", link: "https://guides.muibook.com/responsive" },
      ],
    },

    rules: [
      {
        heading: "Use for compact progress",
        description: "Progress Ring is for compact progress summaries. Use Progress for full-width linear progress across a surface.",
        doContent: [{ description: "Use Progress Ring in dashboard summaries, table cells, or responsive compact views.", image: "" }],
        dontContent: [{ description: "Do not use Progress Ring for indeterminate pending or syncing states.", image: "" }],
      },
    ],

    behaviour: {
      list: [
        "Progress Ring is determinate only.",
        "Progress is clamped between 0 and 100.",
        "When progress is omitted, value and max are used to calculate progress.",
      ],
    },

    writing: {
      list: ["Keep center content short, ideally a count, fraction, or percentage."],
    },
  },
};
