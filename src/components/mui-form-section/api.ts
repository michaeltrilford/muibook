export const muiApi = {
  "mui-form-section": {
    description: "Groups related form controls in a labelled fieldset with optional header and footer content.",
    attributes: [
      { name: "heading", type: { text: "string" }, description: "Section legend text rendered in the default heading row." },
      { name: "heading-level", type: { text: "1 | 2 | 3 | 4 | 5 | 6" }, default: "4", description: "Semantic heading level used by the default heading row." },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables the underlying fieldset and its form controls." },
      { name: "borderless", type: { text: "boolean" }, default: "false", description: "Removes the fieldset border when used inside another surface." },
    ],
    slots: [
      { name: "", description: "Primary form controls or grouped section content." },
      { name: "header", description: "Custom heading content that replaces the default visual heading row." },
      { name: "footer", description: "Actions or supporting footer content, typically a `mui-form-section-footer`." },
    ],
  },
};
