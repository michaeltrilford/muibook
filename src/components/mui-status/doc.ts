import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Status: {
    title: "Status",
    description:
      "A status is a compact visual indicator used to communicate the state of an object, record, workflow, or system condition. It is non-interactive by default, but can be interactive when composed as a trigger or compact state action.",

    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17706&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/feedback-status--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-status/index.ts"],
    website: ["https://muibook.com/status"],
    guides: ["https://guides.muibook.com/status"],

    usage: {
      list: [
        "Use Status for short object, record, workflow, or system state labels such as Active, Draft, Pending, Synced, or Review.",
        "Use Status for data-heavy pages where the state needs to read as a field value rather than decorative metadata.",
        "Use Status for state values in table cells and slat end slots, such as Paid, Pending, Urgent, Open, or Unlodged.",
        "Omit variant for the default low-emphasis grey status.",
        "Use variant for semantic feedback states and color for non-semantic categorical labels.",
        "Use size='x-small' next to badges or in very dense context rows, use size='small' in dense lists, tables, and slats, and use medium as the default.",
        "Use the before and after slots for icons only when they clarify the state.",
        "Add action only when the status itself should be interactive, such as performing an action or opening another control.",
        "Use Badge for cleaner presentational metadata on cards, messages, hero areas, controls, and marketing-style UI.",
        "Use Body or FormMessage for helper text; use Alert or Message for page-level notices.",
        "Keep status text short and avoid full-sentence guidance.",
      ],
    },

    accessibility: {
      designerList: [
        "Do not rely on color alone; pair important status states with clear text or an icon.",
      ],
      engineerList: [
        "Status sets role='status'. Info and positive variants use polite live-region behaviour; warning and attention use assertive live-region behaviour.",
        "When action is present, Status uses button semantics and keyboard activation instead of live-region status semantics.",
      ],
    },

    anatomy: {
      image: "",
      list: [
        "Before slot: Optional leading icon or marker.",
        "Text: Short state label.",
        "After slot: Optional trailing icon or action indicator.",
      ],
    },

    variants: {
      items: [
        { key: "default", title: "Default", description: "For default or low-emphasis statuses without a variant attribute.", image: "" },
        { key: "info", title: "Info", description: "For informational status values.", image: "" },
        { key: "positive", title: "Positive", description: "For successful or complete statuses.", image: "" },
        { key: "warning", title: "Warning", description: "For statuses that may need review.", image: "" },
        { key: "attention", title: "Attention", description: "For critical or blocked statuses.", image: "" },
        {
          key: "color",
          title: "Color",
          description:
            "Standalone colors map to the shared categorical color range for labels that are not semantic feedback states.",
          image: "",
        },
      ],
    },

    stories: {
      items: [
        { key: "default", title: "Default", description: "A compact visual indicator for records, workflows, or system conditions.", list: ["Use Status when the text describes the state of an object.", "Use Badge for supporting labels and Message for persistent page-level notices."] },
        { key: "variants", title: "Variants", description: "Communicates semantic status intent.", list: ["Omit variant for a neutral state.", "Use info, positive, warning, or attention according to the state meaning."] },
        { key: "sizes", title: "Sizes", description: "Matches Status density to its surrounding content.", list: ["Use x-small in compact controls and dense tables.", "Use small or medium when the state needs more prominence or includes accessories."] },
        { key: "standalone-colors", title: "Standalone Colors", description: "Applies categorical colour without implying feedback severity.", list: ["Use color for categories, teams, tags, or grouped workflow labels.", "Use variant for semantic intent such as positive, warning, or attention."] },
        { key: "slots", title: "Before and After Slots", description: "Adds an icon or compact accessory to the Status.", list: ["Icons inherit proportional sizing from Status.", "Keep accessories concise in dense layouts."] },
        { key: "action", title: "Action", description: "Makes Status an interactive compact state control.", list: ["Add action only when Status opens a menu, changes a filter, or performs a state action.", "The action treatment supplies button semantics, keyboard activation, and focus styling."] },
        { key: "dropdown", title: "Dropdown Composition", description: "Uses Status as the selected value and trigger for a Dropdown.", list: ["Own the selected value in the parent application.", "Use Dropdown for menu behavior and Status for the visible state."] },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [],
    },

    related: {
      items: [
        { name: "Badge", link: "https://guides.muibook.com/badge" },
        { name: "Message", link: "https://guides.muibook.com/message" },
        { name: "Dropdown", link: "https://guides.muibook.com/dropdown" },
      ],
    },

    rules: [
      {
        heading: "Status vs Badge",
        description:
          "Status should label the state of a specific thing and can be interactive when used as a trigger. Badge should support presentational UI as non-interactive lightweight metadata.",
        doContent: [{ description: "Use Status for operational state fields in tables, slats, dashboards, and record views.", image: "" }],
        dontContent: [{ description: "Do not use Status for decorative labels, paragraph guidance, or page-level notifications.", image: "" }],
      },
    ],

    behaviour: {
      list: [
        "Status supports x-small, small, and medium sizes.",
        "Status is non-interactive by default.",
        "Use action when Status is composed as a trigger, such as a dropdown action.",
        "Status can be composed inside other components, including dropdown actions or slat accessories.",
      ],
    },

    writing: {
      list: [
        "Use one to three words where possible.",
        "Prefer state labels such as Active, Draft, Pending, Review, Blocked, or Synced.",
      ],
    },
  },
};
