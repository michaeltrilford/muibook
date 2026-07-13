import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  RangeInput: {
    title: "Range Input",
    description: "Range Input provides a reusable slider with optional floating value bubble.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17847&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-range-input--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-range-input/index.ts"],
    website: ["https://muibook.com/range-input"],
    guides: ["https://guides.muibook.com/range-input"],
    usage: {
      list: [
        "Use for scrubbers and bounded numeric selection.",
        "Set bubble to show hover/drag value feedback.",
        "Use bubble-format='time' for media timelines.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: ["Provide a clear aria label to describe the range purpose."],
    },
    anatomy: { image: "", list: ["Native range control", "Floating value bubble (optional)"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "Numeric range input with a custom track and thumb.",
          "list": [
            "Use Range Input when users can choose an approximate value within a bounded range."
          ]
        },
        {
          "key": "bubble-time-format",
          "title": "Bubble + Time Format",
          "description": "Shows formatted bubble for scrubber usage.",
          "list": [
            "Use Range Input when users can choose an approximate value within a bounded range."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Range Input scales its thumb and track from x-small through large; medium preserves the original size.",
          "list": [
            "Use Range Input when users can choose an approximate value within a bounded range."
          ]
        },
        {
          "key": "disabled",
          "title": "Disabled",
          "description": "Disabled state for read-only displays.",
          "list": [
            "Use Range Input when users can choose an approximate value within a bounded range."
          ]
        }
      ],
    },

    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Media Player", link: "https://guides.muibook.com/prompt" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
