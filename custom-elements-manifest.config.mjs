import fs from "node:fs";
import path from "node:path";

const readDynamicAttrs = (() => {
  const cache = new Map();

  return (modulePath) => {
    if (!modulePath) return null;
    if (cache.has(modulePath)) return cache.get(modulePath);

    const filePath = path.join(process.cwd(), path.dirname(modulePath), "dynamic-attrs.json");
    if (!fs.existsSync(filePath)) {
      cache.set(modulePath, null);
      return null;
    }

    try {
      const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
      cache.set(modulePath, parsed);
      return parsed;
    } catch {
      cache.set(modulePath, null);
      return null;
    }
  };
})();

const mergeNamedDocs = (existing = [], additional = []) => {
  const additionsByName = new Map(additional.map((item) => [item.name, item]));
  const merged = existing.map((item) => (additionsByName.has(item.name) ? { ...item, ...additionsByName.get(item.name) } : item));
  const existingNames = new Set(existing.map((item) => item.name));

  return [...merged, ...additional.filter((item) => !existingNames.has(item.name))];
};

const filterNamedDocs = (items = [], namesToRemove = []) => {
  if (!items?.length || !namesToRemove.length) return items;
  const blockedNames = new Set(namesToRemove);
  return items.filter((item) => !blockedNames.has(item.name));
};

const readApiDocs = (customElementsManifest) => {
  const apiByTag = {};

  for (const mod of customElementsManifest.modules || []) {
    if (!mod.path?.endsWith("/api.ts")) continue;

    const apiDeclaration = mod.declarations?.find((declaration) => declaration.name === "muiApi");
    if (!apiDeclaration?.default) continue;

    const api = Function(`"use strict"; return (${apiDeclaration.default});`)();
    Object.assign(apiByTag, api);
  }

  return apiByTag;
};

const removeEmptyDescriptions = (value) => {
  if (Array.isArray(value)) {
    value.forEach(removeEmptyDescriptions);
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    if (key === "description" && child === "") {
      delete value[key];
      continue;
    }

    removeEmptyDescriptions(child);
  }
};

const removePrivateMembers = (customElementsManifest) => {
  for (const mod of customElementsManifest.modules || []) {
    for (const declaration of mod.declarations || []) {
      if (!declaration.members) continue;

      declaration.members = declaration.members.filter((member) => member.privacy !== "private");
      if (declaration.members.length === 0) delete declaration.members;
    }
  }
};

const removeEmptyModules = (customElementsManifest) => {
  customElementsManifest.modules = (customElementsManifest.modules || []).filter((mod) => {
    const hasDeclarations = Array.isArray(mod.declarations) && mod.declarations.length > 0;
    const hasExports = Array.isArray(mod.exports) && mod.exports.length > 0;
    return hasDeclarations || hasExports;
  });
};

export default {
  globs: ["src/components/**/*.ts"],
  outdir: "public",
  exclude: ["src/**/*.stories.ts", "src/**/*.test.ts", "src/**/*.spec.ts"],
  litelement: false, // Set to true if you're using Lit
  plugins: [
    {
      name: "muibook-css-parts",
      packageLinkPhase({ customElementsManifest }) {
        const dynamicAttrsManifest = {};
        const apiByTag = readApiDocs(customElementsManifest);
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

        const internalAttributesByTag = {
          "mui-step": ["resolved-state", "direction", "size"],
        };

        customElementsManifest.modules = (customElementsManifest.modules || []).filter((mod) => !mod.path?.endsWith("/api.ts"));

        for (const mod of customElementsManifest.modules || []) {
          for (const decl of mod.declarations || []) {
            if (!decl.tagName) continue;

            const api = apiByTag[decl.tagName];
            if (api) {
              if (api.description) decl.description = api.description;
              if (api.members) decl.members = api.members;
              decl.attributes = mergeNamedDocs(decl.attributes, api.attributes);
              if (api.contextualAttributes?.length) {
                decl.contextualAttributes = mergeNamedDocs(decl.contextualAttributes, api.contextualAttributes);
              }
              decl.slots = mergeNamedDocs(decl.slots, api.slots);
              decl.events = mergeNamedDocs(decl.events, api.events);
              decl.cssProperties = mergeNamedDocs(decl.cssProperties, api.cssProperties);
            }

            decl.attributes = filterNamedDocs(decl.attributes, internalAttributesByTag[decl.tagName]);

            if (!api?.members) delete decl.members;

            if (partMapTags.has(decl.tagName)) {
              decl.cssParts = [
                ...(decl.cssParts || []),
                ...partMapParts.map((name) => ({ name })),
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

            const dynamicAttrs = readDynamicAttrs(mod.path);
            if (dynamicAttrs) {
              dynamicAttrsManifest[decl.tagName] = dynamicAttrs;
            }
          }
        }

        removeEmptyDescriptions(customElementsManifest);
        removePrivateMembers(customElementsManifest);
        removeEmptyModules(customElementsManifest);

        fs.writeFileSync(
          path.join(process.cwd(), "public", "dynamic-attrs.json"),
          JSON.stringify(
            {
              version: 1,
              generatedAt: new Date().toISOString(),
              components: dynamicAttrsManifest,
            },
            null,
            2
          )
        );
      },
    },
  ],
};
