import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  PromptPreview: {
    title: "Prompt Preview",
    description: "Prompt Preview shows long pasted content in a structured box with title and badge context.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-prompt-preview/index.ts"],
    website: ["https://muibook.com/#/prompt-preview"],
    guides: ["https://guides.muibook.com/input"],
    usage: {
      list: [
        "Use before prompt submission when users paste long content.",
        "Show first-line identity and concise snippet for fast scanning.",
        "Use badge to classify payload types like JSON, CSS, or Insightful.",
        "Use `bg-image` to render a visual source and `image-tint` to tune color tone.",
        "Use `inverted` for high-contrast white-on-dark surfaces.",
        "Use `loading` during async enrichment flows (metadata, URL checks, or media probing).",
        "Set `loading-label` to provide clear accessible loading feedback.",
        "Use the `dismiss` event to track analytics/API updates before removing a preview.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: ["Keep preview text readable and avoid replacing the editable source input."],
    },
    anatomy: { image: "", list: ["Preview box", "Image surface (optional)", "Name line", "Type badge", "Snippet body"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Prompt", link: "https://guides.muibook.com/input" },
        { name: "Badge", link: "https://guides.muibook.com/badge" },
        { name: "Body", link: "https://guides.muibook.com/body" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
