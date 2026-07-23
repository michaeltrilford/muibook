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
      { name: "close-size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Sets the built-in header close icon scale and matching header minimum height. Medium uses a small Button; large uses a medium Button." },
      { name: "hide-header", type: { text: "boolean" }, default: "false", description: "Hides the built-in header even when title slot content is present. Use for unified/headerless dialogs such as confirmations, or when custom body content provides the heading and dismissal path." },
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
      { name: "title", description: "Optional title content. Providing it displays the header and close action unless hide-header is set." },
      { name: "actions", description: "Optional footer actions." },
    ],
    events: [
      { name: "mui-dialog-open", description: "Dispatched when the dialog opens." },
      { name: "mui-dialog-close", description: "Dispatched when the dialog closes." },
    ],
    cssProperties: [
      { name: "--dialog-background", description: "Dialog surface background." },
      { name: "--header-min-height", description: "Shared minimum height applied to the Dialog header." },
      { name: "--header-min-height-x-small", description: "Dialog header minimum height when close-size is x-small." },
      { name: "--header-min-height-small", description: "Dialog header minimum height when close-size is small." },
      { name: "--header-min-height-medium", description: "Dialog header minimum height when close-size is medium." },
      { name: "--header-min-height-large", description: "Dialog header minimum height when close-size is large." },
      { name: "--dialog-border", description: "Optional dialog border value. Defaults to `none`." },
      { name: "--dialog-radius", description: "Dialog corner radius." },
    ],
  },
};
