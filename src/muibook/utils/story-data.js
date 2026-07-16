// This file loads data from custom-elements.json

// UX guideline documentation is stored in each component’s Doc.ts file.
// We include generic content that supports the Muibook storefront, but we intentionally
// exclude Storybook-specific data since it isn’t reused across the system.

let manifestCache = null;
let docsCache = null;
let dynamicAttrsCache = null;

async function loadManifest() {
  if (manifestCache) return manifestCache;

  const response = await fetch("/custom-elements.json");
  manifestCache = await response.json();
  return manifestCache;
}

async function loadDynamicAttrs() {
  if (dynamicAttrsCache) return dynamicAttrsCache;

  try {
    const response = await fetch("/dynamic-attrs.json");
    dynamicAttrsCache = response.ok ? await response.json() : { components: {} };
  } catch {
    dynamicAttrsCache = { components: {} };
  }

  return dynamicAttrsCache;
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

export function escapeStoryAttribute(value = "") {
  return String(value).replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function createStoryMeta(storyItems = []) {
  return Object.fromEntries(
    storyItems.map((story) => [
      story.key,
      {
        ...story,
        title: escapeStoryAttribute(story.title),
        description: escapeStoryAttribute(story.description),
        usage: escapeStoryAttribute((story.list || []).join("|||")),
      },
    ]),
  );
}

export async function getComponentApi(tagName) {
  const manifest = await loadManifest();

  for (const module of manifest.modules || []) {
    const declaration = module.declarations?.find((item) => item.tagName === tagName);
    if (declaration) return declaration;
  }

  console.warn(`Component API not found for ${tagName}`);
  return null;
}

export async function getComponentDynamicAttrs(tagName) {
  const dynamicAttrs = await loadDynamicAttrs();
  return dynamicAttrs.components?.[tagName] || null;
}
