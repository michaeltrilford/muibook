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

const skill = `---
name: muibook-components
description: Lightweight, generated knowledge of current Muibook Web Components, public attributes, slots, base and semantic tokens, and selected composition examples. Use when Codex needs to create or review Muibook markup or choose valid Muibook components without requiring the Muibook knowledge MCP.
---

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

console.log(`Generated single-file Muibook component skill: ${path.relative(root, path.join(skillDir, "SKILL.md"))}`);
console.log(`Components: ${components.length}; selected compositions: ${Object.keys(selectedCompositions).length}`);
