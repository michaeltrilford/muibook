import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const skillDir = path.join(root, "skills/muibook-components");

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const write = (file, value) => {
  const output = typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, output.endsWith("\n") ? output : `${output}\n`);
};

const manifest = readJson("public/custom-elements.json");
const packageJson = readJson("package.json");

const components = (manifest.modules ?? [])
  .flatMap((module) => module.declarations ?? [])
  .filter((declaration) => declaration.customElement && declaration.tagName)
  .map((declaration) => ({
    tag: declaration.tagName,
    name: declaration.name,
    ...(declaration.description ? { description: declaration.description } : {}),
    attributes: (declaration.attributes ?? []).map((attribute) => ({
      name: attribute.name,
      ...(attribute.type?.text ? { type: attribute.type.text } : {}),
      ...(attribute.default !== undefined ? { default: attribute.default } : {}),
      ...(attribute.description ? { description: attribute.description } : {}),
    })),
    slots: (declaration.slots ?? []).map((slot) => ({
      name: slot.name || "default",
      ...(slot.description ? { description: slot.description } : {}),
    })),
  }))
  .sort((a, b) => a.tag.localeCompare(b.tag));

const flattenTokens = (value, parts = [], result = {}) => {
  if (value && typeof value === "object" && "value" in value) {
    result[`--${parts.join("-")}`] = value.value;
    return result;
  }
  for (const [key, child] of Object.entries(value ?? {})) {
    flattenTokens(child, [...parts, key], result);
  }
  return result;
};

const baseTokens = flattenTokens(readJson("token-build/tokens/mui.json"));
const tokenCss = fs.readFileSync(path.join(root, "public/css/mui-tokens.css"), "utf8");
const semanticPrefixes = [
  "categorical-",
  "form-",
  "feedback-",
  "action-",
  "surface",
  "backdrop-overlay",
  "shadow-",
  "outline-",
  "border-",
  "text-",
  "heading-text-",
];
const semanticTokens = {};
for (const match of tokenCss.matchAll(/^\s*(--[a-z0-9-]+):\s*([^;]+);/gim)) {
  const [, token, value] = match;
  const name = token.slice(2);
  if (semanticPrefixes.some((prefix) => name === prefix || name.startsWith(prefix))) {
    semanticTokens[token] ??= [];
    if (!semanticTokens[token].includes(value)) semanticTokens[token].push(value);
  }
}

const compositionsSource = fs.readFileSync(path.join(root, "src/knowledge/compositions.ts"), "utf8");
const transpiled = ts.transpileModule(compositionsSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compositionModule = await import(`data:text/javascript;base64,${Buffer.from(transpiled).toString("base64")}`);
const normalizeRedactdNode = (node) => {
  if (!node || typeof node !== "object" || Array.isArray(node)) return node;

  const props = node.props && typeof node.props === "object" && !Array.isArray(node.props) ? { ...node.props } : {};
  if (typeof node.slot === "string" && node.slot.trim()) props.slot = node.slot.trim();

  return {
    type: node.type,
    id: node.id,
    props,
    children: Array.isArray(node.children) ? node.children.map(normalizeRedactdNode) : [],
  };
};
const selectedCompositions = Object.fromEntries(
  compositionModule.agentCompositionKeys.map((key) => [key, normalizeRedactdNode(compositionModule.compositions[key])]),
);

const compactText = (value = "") => String(value).replace(/\s+/g, " ").trim();
const componentReference = components
  .map((component) => {
    const attributes = component.attributes.map((attribute) => attribute.name).join(", ") || "none";
    const slots = component.slots.map((slot) => slot.name).join(", ") || "none";
    return `- \`${component.tag}\` — ${compactText(component.description || component.name)} Attributes: ${attributes}. Slots: ${slots}.`;
  })
  .join("\n");

const wrapList = (items, perLine = 6) => {
  const lines = [];
  for (let index = 0; index < items.length; index += perLine) {
    lines.push(items.slice(index, index + perLine).join(", "));
  }
  return lines.join("\n");
};

const compositionReference = Object.entries(selectedCompositions)
  .map(
    ([name, composition]) => `### ${name}

\`\`\`json
${JSON.stringify(composition)}
\`\`\``,
  )
  .join("\n\n");

const chartData = fs.readFileSync(path.join(root, "src/knowledge/fragments/chart-data.md"), "utf8");
const designAssets = fs.readFileSync(path.join(root, "src/knowledge/fragments/design-assets.md"), "utf8");

const skill = `---
name: muibook-components
description: Lightweight, generated knowledge of current Muibook Web Components, public attributes, slots, base and semantic tokens, and selected composition examples. Use when Codex needs to create or review Muibook markup or choose valid Muibook components without requiring the Muibook knowledge MCP.
---

<!-- DO NOT EDIT THIS FILE MANUALLY -->
<!-- This file is auto-generated by scripts/build-muibook-skill.mjs -->
<!-- Content is compiled from src/knowledge/fragments and package components. -->

# Muibook Components

Use this single-file snapshot of Muibook ${packageJson.version} when the full knowledge MCP is unavailable or unnecessary.

This skill provides component knowledge. When paired with \`redactd-canvas-muibook\`, that skill
owns the Redactd tree contract, validation, browser transport, and paste workflow.

## Workflow

1. Search the component reference below for relevant tag names and purposes.
2. Use only the listed public attribute and slot names. Use the MCP when exact types, defaults, events, parts, or component tokens are required.
3. Prefer the listed semantic tokens for meaningful UI styling; use base tokens for foundations.
4. Adapt the embedded compositions when a selected example matches the requested interface.
5. For Redactd Canvas work, hand the selected components or composition tree to
   \`redactd-canvas-muibook\`. The compositions below already use its canonical
   \`{ id, type, props, children }\` shape, including slot placement in \`props.slot\`.
6. If the Muibook MCP is available, use its \`start_here\` tool for richer or newer guidance. Treat a newer MCP version as authoritative.

## Boundaries

- Do not invent components, attributes, slots, or token names.
- Do not treat internal state or dynamic destination attributes as public props.
- Do not expect exact attribute types, defaults, events, parts, component-specific tokens, full UX guidance, or the complete composition library in this lightweight skill; use the Muibook MCP for those needs.
- Keep native custom-element tag names when writing HTML. When another tool maps names such as \`Button\` to \`mui-button\`, follow that tool's schema while preserving the verified public props.
- Do not perform Redactd browser or API transport from this skill. Defer that workflow to
  \`redactd-canvas-muibook\`.

## Composition Rules

- Build layouts with Muibook primitives such as Container, VStack, HStack, and Grid. Do not add generic wrapper elements solely to create layout, spacing, or margins.
- Put named slot placement on the child through its documented native \`slot\` attribute. In Redactd trees, store that value in \`props.slot\`; never add slot as a top-level node field.
- Let documented parent-child context do its work. Do not recreate joined corners, inherited sizing, Menu action normalization, Card surface usage, or similar component behavior with local overrides.
- Prefer Slat over an ad hoc HStack for row-like wireframe items with primary content on the left and secondary metadata, value, status, timestamp, badge, count, or action on the right. Use SlatGroup for repeated rows such as activity feeds, settings rows, account details, notifications, transaction lists, project updates, search results, or compact records. Put primary content in \`slot="start"\` and trailing metadata/action in \`slot="end"\`. Always explicitly set \`variant="row"\` on standard Slat items unless creating a section header (\`variant="header"\`), interactive row (\`variant="action"\`), or custom layout; Slat items inside SlatGroup or CardBody rely on explicit \`variant\` ("row", "header", or "action") for correct automatic alignment and card/group styles.
- Use \`col="1fr auto"\` as the default col for Slat. Do not invent a custom Slat column string from an image prompt unless the source clearly requires non-default column tracks; the default Slat columns are preferred for accessory/start/end compositions.
- For top-and-bottom positioning inside VStack (such as pushing a footer or action button to the bottom), set \`fill\` or \`height\` on VStack and apply \`style="align-self: end;"\` to the slotted child. Use \`fill\` when VStack sits inside a bounded parent (e.g. CardBody, Drawer, or Dialog); use \`height\` when specifying an explicit length (e.g. \`height="300px"\`).
- Explicitly define layout boundaries to prevent unpredictable canvas rendering. For VStack and HStack, always output \`width="auto"\` and \`height="auto"\` unless a specific dimension or \`fill\` is required.
- For Grid, never leave \`col\` empty. It defaults to two columns (\`1fr 1fr\`), so omitting it can lead to unexpected layouts.
- For Dialog and Drawer, omit \`width\` and \`height\` properties to inherit their design system defaults (350px and 320px respectively) unless explicitly overriding them for a specific use case.
- For Drawer, use \`open\` plus \`side\` for overlay, push, and persistent drawers. The side property (left or right) should match the position of the menu icon trigger. Do not use \`left-open\`, \`right-open\`, \`left-width\`, \`right-width\`, or the \`left\`/\`right\`/\`page\` slots unless \`variant="workspace"\`; those controls are workspace-only.
- In Drawer navigation, compose nav items as Button or Link with \`align="start"\`, \`variant="tertiary"\` as the default (non-prominent) emphasis, and a \`slot="before"\` _Icon matching the item's meaning. Use mui-icon-rectangle as a generic placeholder icon only when no semantically matching icon exists.
- When composing a user profile or avatar pattern, use AvatarChip (with image, label, and primary/secondary slotted Body) rather than constructing a custom avatar layout. If the profile pattern requires a menu or dropdown, wrap the AvatarChip inside a Button (with \`variant="secondary"\` and \`slot="action"\`) inside a Dropdown, and use Menu with Buttons for the dropdown actions.
- For equal Grid columns, use \`col: "repeat(N, minmax(0, 1fr))"\`. Do not use numeric counts or repeated bare \`1fr\` tracks.
- Layout spacing values must use complete CSS token references such as \`var(--space-400)\`; never use \`space-400\`, \`400\`, or another bare scale value. Use \`var(--space-000)\` for zero spacing.
- CSS length props and style values must include valid units or CSS functions. For \`height\`, \`width\`, \`max-height\`, \`min-height\`, padding, margin, gap, and similar CSS lengths, use values such as \`320px\`, \`20rem\`, \`100%\`, \`100vh\`, \`auto\`, or \`var(--space-500)\`; never output bare numeric strings such as \`320\` or \`20\` unless the component API explicitly documents a number scale for that prop.
- Prefer container-based responsiveness for reusable components and compositions. Use viewport responsiveness only for page-level or app-shell decisions that genuinely depend on browser width.
- Card has no size scale. Its width comes from Grid, Container, the parent layout, or an explicit constrained style. Card Body \`size\` controls internal padding only: medium is the default, small is compact, large is spacious, and none is edge-to-edge. Let Grid size repeated Cards rather than styling each Card width independently.
- Use Heading levels 1-6 for document structure. Use \`level="none"\` only for prominent display text, such as a metric value, that must not enter the heading outline.
- Compose forms with Form Section, Form Group, Field, and the appropriate form control. Keep labels, messages, validation, and control behavior in those components instead of rebuilding them from generic text and layout primitives.

## Host State And Framework Boundaries

- Use boolean attributes by presence in native HTML. Do not write \`disabled="false"\`; omit the attribute when false.
- Use documented string values for enum attributes and use host JavaScript properties for structured values such as chart datasets.
- Listen to composed host events and read documented \`event.detail\` values. Framework wrappers should attach listeners, pass attributes and properties, and forward refs without recreating shadow-DOM behavior.
- Set value, checked, disabled, and similar state on the custom-element host. Prefer the host's public \`focus()\` method over reaching into its shadow root.

## Structured Chart Data

${chartData}

${designAssets}


## Component Reference

${componentReference}

## Token Reference

Base token names:

\`\`\`text
${wrapList(Object.keys(baseTokens))}
\`\`\`

Semantic token names:

\`\`\`text
${wrapList(Object.keys(semanticTokens))}
\`\`\`

## Selected Compositions

These compact JSON trees use the Redactd canvas schema and Muibook composition names such as
\`Button\` and \`Card\`. They can be handed directly to \`redactd-canvas-muibook\` or mapped to native
\`mui-*\` elements while preserving their verified props.

${compositionReference}
`;

fs.rmSync(path.join(skillDir, "agents"), { recursive: true, force: true });
fs.rmSync(path.join(skillDir, "references"), { recursive: true, force: true });
write(path.join(skillDir, "SKILL.md"), skill);
write(path.join(root, "public/skills/muibook-components/SKILL.md"), skill);

console.log(`Generated single-file Muibook component skill: ${path.relative(root, path.join(skillDir, "SKILL.md"))}`);
console.log(`Components: ${components.length}; selected compositions: ${Object.keys(selectedCompositions).length}`);
