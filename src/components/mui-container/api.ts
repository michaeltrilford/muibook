export const muiApi = {
  "mui-container": {
    description: "Constrains content to a centered or fixed-width layout band with optional size variants.",
    attributes: [
      { name: "center", type: { text: "boolean" }, default: "false", description: "Centers the container horizontally within its parent." },
      { name: "fluid", type: { text: "boolean" }, default: "false", description: "Removes the max-width constraint." },
      { name: "small", type: { text: "boolean" }, default: "false", description: "Constrains the container to the small width." },
      { name: "medium", type: { text: "boolean" }, default: "false", description: "Constrains the container to the medium width." },
      { name: "large", type: { text: "boolean" }, default: "false", description: "Constrains the container to the large width." },
    ],
    slots: [{ name: "", description: "Container content." }],
  },
};
