export default {
  globs: ["src/components/**/*.ts"],
  outdir: "public",
  exclude: ["src/**/*.stories.ts", "src/**/*.test.ts", "src/**/*.spec.ts"],
  litelement: false, // Set to true if you're using Lit
  plugins: [
    () => ({
      name: "muibook-css-parts",
      packageLinkPhase({ customElementsManifest }) {
        const partMapParts = [
          "color",
          "font-family",
          "font-size",
          "font-weight",
          "letter-spacing",
          "line-height",
          "text-transform",
          "text-decoration",
          "text-align",
          "padding",
          "margin",
          "gap",
          "width",
          "height",
          "box-sizing",
          "display",
          "flex",
          "flex-direction",
          "flex-wrap",
          "justify-content",
          "align-items",
          "align-content",
          "align-self",
          "grid-template-columns",
          "grid-template-rows",
          "grid-column",
          "grid-row",
          "place-items",
          "place-content",
          "vertical-align",
          "background",
          "border",
          "border-radius",
          "box-shadow",
          "opacity",
          "transition",
          "outline",
        ];

        const partMapTags = new Set([
          "mui-grid",
          "mui-select",
          "mui-h-stack",
          "mui-v-stack",
          "mui-link",
          "mui-button",
          "mui-body",
        ]);

        for (const mod of customElementsManifest.modules || []) {
          for (const decl of mod.declarations || []) {
            if (!decl.tagName) continue;

            if (partMapTags.has(decl.tagName)) {
              decl.cssParts = [
                ...(decl.cssParts || []),
                ...partMapParts.map((name) => ({
                  name,
                  description: "Style hook from part-map",
                })),
              ];
            }

            if (decl.tagName === "mui-chip") {
              decl.cssParts = [
                ...(decl.cssParts || []),
                {
                  name: "dismiss-btn",
                  description: "Dismiss button inside chip",
                },
              ];
            }
          }
        }
      },
    }),
  ],
};
