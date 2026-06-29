import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  ProgressRing: {
    title: "Progress Ring",
    description:
      "Progress Ring displays circular determinate progress with generated center text. It belongs to the Progress family and is best for compact progress summaries in dashboards, cards, tables, and responsive layouts.",

    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-progress-ring--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-progress-ring/index.ts"],
    website: ["https://muibook.com/progress"],
    guides: ["https://guides.muibook.com/progress"],

    usage: {
      list: [
        "Use Progress Ring for compact determinate progress where a linear bar would take too much horizontal space.",
        "Use display to choose generated center text such as a fraction, numeric percent value, value, or no text.",
        "Use progress for percentage-based values, or value and max for count-based values.",
        "Use the default auto display when plain progress values should stay quiet but count-based progress should still show a fraction.",
        "Use x-small as an icon-sized indicator only; it does not render center text.",
        "Use a clear label when the generated center text is abbreviated or absent.",
        "Use tooltip to override the automatically generated tooltip text when the ring needs more specific context.",
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
        "Center text: Generated short text inside small, medium, and large rings.",
        "Tooltip: Optional embedded text disclosure for hover, focus, or click interaction.",
      ],
    },

    variants: {
      items: [
        { key: "x-small", title: "X-Small", description: "Use as an icon-sized indicator without center text.", image: "" },
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
        { name: "Hint", link: "https://guides.muibook.com/hint" },
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
        "When display is auto, value and max render as a fraction, while progress-only values render no center text.",
        "When progress reaches 100, the center text is replaced by a checkmark for small, medium, and large rings.",
        "When size is x-small, generated center text is not rendered, but the completion icon is still shown.",
        "When tooltip is omitted, tooltip text is derived automatically from value and max, or from progress as natural language such as '50% complete'.",
        "When tooltip is set, it overrides the automatic tooltip text and opens on hover and focus by default.",
        "Use tooltip-trigger='click' when the disclosure should stay open until selected again or dismissed.",
      ],
    },

    writing: {
      list: [
        "Keep generated center text short, ideally a count, fraction, or numeric percent value. Do not use center text at x-small.",
        "Keep tooltip text concise and descriptive, such as '2 of 4 transactions automated'.",
      ],
    },
  },
};
