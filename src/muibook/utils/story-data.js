// This file loads data from custom-elements.json

// UX guideline documentation is stored in each component’s Doc.ts file.
// We include generic content that supports the Muibook storefront, but we intentionally
// exclude Storybook-specific data since it isn’t reused across the system.

let manifestCache = null;
let docsCache = null;

async function loadManifest() {
  if (manifestCache) return manifestCache;

  const response = await fetch("/custom-elements.json");
  manifestCache = await response.json();
  return manifestCache;
}

async function loadAllDocs() {
  if (docsCache) return docsCache;

  const manifest = await loadManifest();
  const allDocs = {};

  // Find all doc.ts modules
  manifest.modules?.forEach((module) => {
    if (module.path.includes("/doc.ts")) {
      // Get the muiDocs declaration
      const muiDocsDeclaration = module.declarations?.find((d) => d.name === "muiDocs");

      if (muiDocsDeclaration?.default) {
        try {
          // Parse the JavaScript object literal (not JSON)
          const parsed = new Function(`return ${muiDocsDeclaration.default}`)();
          // Merge into allDocs
          Object.assign(allDocs, parsed);
        } catch (e) {
          console.error(`Failed to parse docs from ${module.path}:`, e);
        }
      }
    }
  });

  docsCache = allDocs;
  return allDocs;
}

export async function getComponentDocs(tagName) {
  const allDocs = await loadAllDocs();

  if (!allDocs[tagName]) {
    console.warn(`Guidelines not found for ${tagName}`);
    return null;
  }

  return allDocs[tagName];
}
