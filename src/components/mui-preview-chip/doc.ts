import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  PreviewChip: {
    title: "Preview Chip",
    description: "Preview Chip shows long pasted content in a structured box with title and badge context.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2117-17601&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/ai-llm-preview-chip--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-preview-chip/index.ts"],
    website: ["https://muibook.com/preview-chip"],
    guides: ["https://guides.muibook.com/prompt"],
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
    stories: { items: [
      { key: "predropped", title: "Pre-dropped Preview", description: "Shows long pasted input before submit.", list: [] },
      { key: "types", title: "Payload Types", description: "Set badge directly or let the component infer it from value.", list: [] },
      { key: "loading", title: "Loading State", description: "Use loading while async preview metadata or media checks resolve.", list: [] },
      { key: "pasted-image", title: "Pasted Image", description: "Image previews default to badge-only, with no text overlay.", list: [] },
      { key: "dismiss-tracking", title: "Dismiss Tracking", description: "Capture dismiss payloads for API calls and analytics before removing.", list: [] },
      { key: "open-dialog", title: "Formatted JSON Dialog", description: "Format the emitted value before presenting it in a consumer-managed dialog.", list: [] },
      { key: "open-dialog-image", title: "Click Image to Open Dialog", description: "Open a dialog with the full pasted image preview.", list: [] },
    ] },
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
