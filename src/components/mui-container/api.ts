export const muiApi = {
  "mui-container": {
    description: "Constrains content to a centered or fixed-width layout band with optional size variants.",
    attributes: [
      { name: "center", type: { text: "boolean" }, default: "false", description: "Centers the container horizontally within its parent." },
      { name: "fluid", type: { text: "boolean" }, default: "false", description: "Removes the max-width constraint." },
      { name: "small", type: { text: "boolean" }, default: "false", description: "Constrains the container to the small width." },
      { name: "medium", type: { text: "boolean" }, default: "false", description: "Constrains the container to the medium width." },
      { name: "x-medium", type: { text: "boolean" }, default: "false", description: "Constrains the container to the extra-medium width between medium and large." },
      { name: "large", type: { text: "boolean" }, default: "false", description: "Constrains the container to the large width." },
      {
        name: "size",
        type: { text: "small | medium | x-medium | large | fluid" },
        default: "",
        description: "Attribute-based size API for choosing a container width while preserving the legacy boolean size attributes.",
      },
      {
        name: "width",
        type: { text: "string" },
        default: "",
        description: "Explicit max-width override. Accepts CSS length values or numeric design widths, where 960 maps to 96rem.",
      },
    ],
    slots: [{ name: "", description: "Container content." }],
  },
};
