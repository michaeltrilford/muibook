export const muiApi = {
  "mui-form-group": {
    description: "Groups related form controls with optional headings and configurable layout spacing.",
    attributes: [
      { name: "heading", type: { text: "string" }, description: "Heading displayed above the grouped controls." },
      { name: "heading-level", type: { text: '"1" | "2" | "3" | "4" | "5" | "6"' }, default: "5", description: "Semantic heading level used without changing the visual heading size." },
      { name: "heading-space", type: { text: "string" }, description: "Spacing below the group heading. Accepts any valid CSS spacing value or design token." },
      { name: "hide-heading", type: { text: "boolean" }, default: "false", description: "Hides the group heading when surrounding structure already supplies the context." },
      { name: "hide-label", type: { text: "boolean" }, default: "false", description: "Legacy alias for `hide-heading`." },
      { name: "variant", type: { text: '"default" | "horizontal"' }, default: "default", description: "Layout orientation for grouped content. `horizontal` stacks below the mobile breakpoint." },
      { name: "space", type: { text: "string" }, default: "var(--space-500)", description: "Gap between grouped items. Accepts any valid CSS gap value or design token." },
      { name: "aligny", type: { text: "string" }, default: "start", description: "Vertical alignment of items in a horizontal group, for example aligning a button with a select control." },
    ],
    slots: [{ name: "", description: "Related form controls and supporting content." }],
    cssProperties: [
      { name: "--form-group-horizontal-template", description: "Grid columns for the horizontal layout." },
      { name: "--form-group-space", description: "Gap between grouped items and default heading separation." },
      { name: "--form-group-heading-space", description: "Spacing below the group heading." },
      { name: "--form-group-align-y", description: "Vertical alignment applied to horizontal group content." },
    ],
  },
};
