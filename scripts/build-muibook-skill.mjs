import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const skillDir = path.join(root, "skills/muibook-components");
const referencesDir = path.join(skillDir, "references");

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
const selectedCompositions = Object.fromEntries(
  compositionModule.agentCompositionKeys.map((key) => [key, compositionModule.compositions[key]]),
);

const skill = `---
name: muibook-components
description: Lightweight, generated knowledge of current Muibook Web Components, public attributes, slots, base and semantic tokens, and selected composition examples. Use when Codex needs to create or review Muibook markup or choose valid Muibook components without requiring the Muibook knowledge MCP.
---

# Muibook Components

Use the generated references as a compact snapshot of Muibook ${packageJson.version}.

## Workflow

1. Search [references/components.json](references/components.json) for relevant component names and purposes.
2. Read the matching component records before writing markup. Use only listed public attributes and slots.
3. Use [references/tokens.json](references/tokens.json) when base or semantic token names are needed. Prefer semantic tokens for meaningful UI styling.
4. Read [references/compositions.json](references/compositions.json) when a selected example helps demonstrate how components fit together.
5. If the Muibook MCP is available, use its \`start_here\` tool for richer or newer guidance. Treat the MCP as authoritative when its version is newer than this snapshot.

## Boundaries

- Do not invent components, attributes, slots, or token names.
- Do not treat internal state or dynamic destination attributes as public props.
- Do not expect component-specific tokens, full UX guidance, styling architecture, or the complete composition library in this lightweight skill; use the Muibook MCP for those needs.
- Keep native custom-element tag names when writing HTML. When another tool maps names such as \`Button\` to \`mui-button\`, follow that tool's schema while preserving the verified public props.
`;

const openaiYaml = `interface:
  display_name: "Muibook Components"
  short_description: "Current Muibook components, props, tokens, and examples"
  default_prompt: "Use the Muibook component reference to create this interface with valid components and props."
`;

write(path.join(skillDir, "SKILL.md"), skill);
write(path.join(skillDir, "agents/openai.yaml"), openaiYaml);
write(path.join(referencesDir, "components.json"), {
  generatedFrom: "public/custom-elements.json",
  packageVersion: packageJson.version,
  componentCount: components.length,
  components,
});
write(path.join(referencesDir, "tokens.json"), {
  generatedFrom: ["token-build/tokens/mui.json", "public/css/mui-tokens.css"],
  packageVersion: packageJson.version,
  note: "Base tokens are raw foundations. Semantic tokens may list light and dark theme mappings. Component-specific tokens are excluded.",
  base: baseTokens,
  semantic: semanticTokens,
});
write(path.join(referencesDir, "compositions.json"), {
  generatedFrom: "src/knowledge/compositions.ts#agentCompositions",
  packageVersion: packageJson.version,
  compositionCount: Object.keys(selectedCompositions).length,
  compositions: selectedCompositions,
});

console.log(`Generated Muibook component skill: ${path.relative(root, skillDir)}`);
console.log(`Components: ${components.length}; selected compositions: ${Object.keys(selectedCompositions).length}`);
