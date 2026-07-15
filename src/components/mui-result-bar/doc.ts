import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  ResultBar: {
    title: "Result Bar",
    description:
      "Result bar provides a compact card/slat shell for agent outputs and generated artefact actions.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-result-bar/index.ts"],
    website: ["https://muibook.com/result"],
    guides: ["https://guides.muibook.com/prompt"],
    usage: {
      list: [
        "Use inside Chat Message content when an agent produces a file edit, generated artefact, preview, or reviewable result.",
        "Use slot='accessory' for the compact result marker.",
        "Use slot='start' for the primary result label and supporting copy.",
        "Use slot='actions' for controls such as Undo, Review, Open, Approve, or Dismiss.",
        "Prefer this component over hand-authored card, card body, and slat markup in prompt/agent surfaces.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [
        "Keep action labels explicit and avoid icon-only actions unless an aria-label is provided.",
        "Use semantic buttons or links in the actions slot.",
      ],
    },
    anatomy: { image: "", list: ["Card shell", "Accessory slot", "Start slot", "Actions slot"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    stories: { items: [
      { key: "accessory", title: "Accessory", list: ["Use inside prompt responses for generated files, edits, artefacts, and reviewable results.", "Use accessory for a compact marker, start for result copy, and actions for direct controls."] },
      { key: "without-accessory", title: "Without Accessory", list: ["Omit the accessory slot when the result should read as a simple action row."] },
      { key: "file-edits", title: "Accordion Result", list: ["Opt into the accordion variant to present worker outputs with interactive actions and collapsible accordion content."] },
    ] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Chat Message", link: "https://guides.muibook.com/chat-message" },
        { name: "Slat", link: "https://guides.muibook.com/slat" },
        { name: "Card", link: "https://guides.muibook.com/card" },
      ],
    },
    rules: [
      {
        heading: "Keep Result Rows Focused",
        description: "Use Result for one generated object or reviewable action group.",
        doContent: [{ description: "Show a clear title, supporting metadata, and one or two direct actions.", image: "" }],
        dontContent: [{ description: "Do not turn Result into a full dashboard or unrelated card layout.", image: "" }],
      },
    ],
    behaviour: {
      list: [
        "Result uses a Card Body with size none and a row slat internally.",
      ],
    },
    writing: {
      list: [
        "Keep result titles short and action labels direct.",
      ],
    },
  },
};
