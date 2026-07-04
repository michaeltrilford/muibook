export const muiApi = {
  "mui-search-input": {
    description:
      "Composes mui-input, mui-button and icons into a search affordance that can vertically reveal over adjacent slotted controls.",
    members: [{ kind: "field", name: "value", type: { text: "string" }, description: "Gets or sets the current search query." }],
    attributes: [
      { name: "id", type: { text: "string" }, description: "Identifier forwarded to the internal search input." },
      { name: "label", type: { text: "string" }, default: "Search", description: "Accessible label for the search input." },
      {
        name: "placeholder",
        type: { text: "string" },
        default: "Search...",
        description: "Hint displayed when no search value is entered.",
      },
      { name: "value", type: { text: "string" }, default: "", description: "Current search query." },
      { name: "name", type: { text: "string" }, description: "Form field name forwarded to the internal input." },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Search input and action size scale.",
      },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables search interaction." },
      {
        name: "open",
        type: { text: "boolean" },
        default: "false",
        description: "Reveals the search row and hides after-slot content when present.",
      },
      {
        name: "autofocus",
        type: { text: "boolean" },
        default: "false",
        description: "Focuses the search input when connected or when the revealed state opens.",
      },
      {
        name: "cancel-label",
        type: { text: "string" },
        default: "Cancel",
        description: "Visible label for the cancel action.",
      },
    ],
    slots: [
      {
        name: "action",
        description: "Optional compact action that opens the revealed search view. Defaults to an icon-only tertiary search button.",
      },
      {
        name: "after",
        description: "Adjacent controls that appear beside the compact search action before search is revealed.",
      },
    ],
    events: [
      { name: "input", description: "Composed, bubbling event dispatched during query entry with `detail.value`." },
      { name: "change", description: "Composed, bubbling event dispatched when the internal search input changes with `detail.value`." },
      { name: "toggle", description: "Composed, bubbling event dispatched when revealed state changes with `detail.open`." },
    ],
    methods: [
      { name: "focus", description: "Moves focus to the internal search input." },
      { name: "openSearch", description: "Sets the component to revealed search state." },
      { name: "closeSearch", description: "Returns the component to compact state." },
      { name: "toggleSearch", description: "Toggles between compact and revealed search states." },
    ],
  },
};
