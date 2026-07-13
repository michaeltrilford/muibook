import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  ProgressRing: {
    title: "Progress Ring",
    description:
      "Progress Ring displays circular determinate progress with optional generated center text. It belongs to the Progress family and is best for compact progress summaries in dashboards, cards, tables, and responsive layouts.",

    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-progress-ring--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-progress-ring/index.ts"],
    website: ["https://muibook.com/progress"],
    guides: ["https://guides.muibook.com/progress"],

    usage: {
      list: [
        "Use Progress Ring for compact determinate progress where a linear bar would take too much horizontal space.",
        "Use display='value' only when the progress value should appear in the center.",
        "Use display-value for a short custom center value, such as a completed count, remaining count, grade, or time value.",
        "Use color='positive', color='warning', or color='attention' for semantic score bands or stateful progress summaries.",
        "Use progress for percentage-based values, or value and max for count-based values.",
        "Use the default auto display when the ring should stay quiet and leave detail to the tooltip.",
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
        "Center text: Optional generated short text inside small, medium, and large rings.",
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

    stories: {
      items: [
        {
          "key": "start-state",
          "title": "Start State",
          "description": "Shows the generated start state for count-based and progress-based data.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "progress",
          "title": "Progress",
          "description": "Use progress for percentage-based values.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "value-and-max",
          "title": "Value and Max",
          "description": "Use value and max when progress is based on completed items.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "complete",
          "title": "Complete",
          "description": "Progress at 100 renders a completion icon automatically.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "display",
          "title": "Display",
          "description": "Center value is opt-in. The value is derived from value/max or progress.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "formatting",
          "title": "Formatting",
          "description": "Generated center text is constrained so dense values do not crowd the ring.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "display-value-completed",
          "title": "Display Value: Completed",
          "description": "Use display-value when the center text should show a custom completed count.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "display-value-remaining",
          "title": "Display Value: Remaining",
          "description": "Use display-value when the center text should show a custom remaining count.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "display-value-hours",
          "title": "Display Value: Hours",
          "description": "Use display-value for short time values while progress still drives the ring.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "display-value-grade",
          "title": "Display Value: Grade",
          "description": "Use color for score bands while center text keeps the default text color.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "tooltip-hover",
          "title": "Tooltip: Hover",
          "description": "Add tooltip text when the visible value needs extra context.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        },
        {
          "key": "tooltip-click",
          "title": "Tooltip: Click",
          "description": "Use click when the tooltip should be an explicit disclosure.",
          "list": [
            "Use Progress Ring for compact determinate progress where a circular display suits the layout."
          ]
        }
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
        "When display is auto, center text is not rendered; value and max still calculate progress and generated tooltip text.",
        "When display is value, value and max render as a compact fraction when it fits, while progress-only values render the rounded numeric progress value.",
        "When display-value is set, it overrides generated center text while the ring still uses progress, or value and max, for the determinate value.",
        "When color is set, the ring uses progress color tokens for the indicator while center text keeps the default text color.",
        "When a generated fraction is too dense for the ring size, center text is omitted and the generated tooltip keeps the full value.",
        "When progress reaches 100, the center text is replaced by a checkmark for small, medium, and large rings.",
        "When size is x-small, generated center text is not rendered, but the completion icon is still shown.",
        "When tooltip is omitted, tooltip text is derived automatically from value and max, or from progress as natural language such as '50% complete'.",
        "When tooltip is set, it overrides the automatic tooltip text and opens on hover and focus by default.",
        "Use tooltip-trigger='click' when the disclosure should stay open until selected again or dismissed.",
      ],
    },

    writing: {
      list: [
        "Keep generated center text short, ideally a count or compact fraction. Do not use center text at x-small.",
        "Keep display-value short when using grades or time values, such as B+, D-, 3d, or 6h.",
        "Keep tooltip text concise and descriptive, such as '2 of 4 transactions automated'.",
      ],
    },
  },
};
