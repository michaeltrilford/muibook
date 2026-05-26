export const muiApi = {
  "mui-dialog": {
    description: "Presents modal content and optional actions in a native dialog surface.",
    members: [
      { kind: "method", name: "open", description: "Opens the dialog." },
      { kind: "method", name: "close", description: "Closes the dialog." },
    ],
    attributes: [
      { name: "open", type: { text: "boolean" }, default: "false", description: "Controls whether the dialog is open." },
      { name: "width", type: { text: "string" }, default: "350px", description: "Dialog width. Accepts any valid CSS width value." },
      { name: "content-max-height", type: { text: '"none" | string' }, description: "Use `none` to disable the default scrollable content maximum height." },
      { name: "content-padding", type: { text: '"none" | string' }, description: "Use `none` to remove default content padding." },
    ],
    contextualAttributes: [
      {
        name: "data-close",
        type: { text: "boolean" },
        default: "false",
        description: "Marker applied to a slotted action; integration code uses it to call the owning dialog's `close()` method.",
        appliesTo: "[slot=\"actions\"]",
      },
    ],
    slots: [
      { name: "", description: "Dialog body content." },
      { name: "title", description: "Optional title content. Providing it displays the header and close action." },
      { name: "actions", description: "Optional footer actions." },
    ],
    events: [
      { name: "mui-dialog-open", description: "Dispatched when the dialog opens." },
      { name: "mui-dialog-close", description: "Dispatched when the dialog closes." },
    ],
    cssProperties: [
      { name: "--dialog-background", description: "Dialog surface background." },
      { name: "--dialog-border", description: "Optional dialog border value. Defaults to `none`." },
      { name: "--dialog-radius", description: "Dialog corner radius." },
    ],
  },
};
