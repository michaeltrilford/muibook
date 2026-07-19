import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, "..");

const readJson = (relativePath) => {
  const filePath = path.join(sourceDir, relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeJson = (relativePath, value) => {
  const filePath = path.join(sourceDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
  console.log(`Wrote: ${relativePath}`);
};

readJson("public/custom-elements.json");
readJson("public/dynamic-attrs.json");

const skillIndex = {
  schemaVersion: 1,
  description: "Authored skill guides available in the Muibook knowledge bundle.",
  skills: [
    {
      id: "create-web-components",
      file: "skills/create-web-components/SKILL.md",
      title: "Create Web Components",
      useWhen: "Building or reviewing native Web Components with explicit APIs, shadow DOM, slots, tokens, part maps, runtime attrs, wrappers, and knowledge exports.",
    },
    {
      id: "muibook-components",
      aliases: ["compose-web-components"],
      file: "skills/muibook-components/SKILL.md",
      title: "Muibook Components",
      useWhen: "Choosing and composing Muibook components into complete interfaces using verified APIs, layout primitives, slots, tokens, and selected examples.",
    },
    {
      id: "style-web-components",
      file: "skills/style-web-components/SKILL.md",
      title: "Style Web Components",
      useWhen: "Applying themes, token layers, surface decisions, CSS variables, parts, and targeted override patterns.",
    },
    {
      id: "create-ux-guidelines",
      file: "skills/create-ux-guidelines/SKILL.md",
      title: "Create UX Guidelines",
      useWhen: "Writing or reviewing component UX guidelines, anatomy, accessibility, variants, behavior, composition examples, and asset publishing guidance.",
    },
  ],
};

const resourceIndex = {
  schemaVersion: 1,
  description: "Machine-readable front door for the Muibook knowledge bundle.",
  recommendedFirstResource: "knowledge-map.md",
  recommendedFirstMcpTool: "start_here",
  resources: [
    {
      id: "knowledge-map",
      file: "knowledge-map.md",
      mcpUri: "muibook://index",
      kind: "front-door",
      useWhen: "Starting any Muibook knowledge task.",
    },
    {
      id: "mcp-instructions",
      file: "mcp-instructions.md",
      mcpUri: "muibook://mcp-instructions",
      kind: "agent-instructions",
      useWhen: "Teaching an agent how to route Muibook MCP calls.",
    },
    {
      id: "resource-index",
      file: "resource-index.json",
      mcpUri: "muibook://resources",
      kind: "resource-index",
      useWhen: "Finding the available knowledge files and their MCP resource URIs.",
    },
    {
      id: "custom-elements",
      file: "custom-elements.json",
      mcpUri: "muibook://custom-elements",
      kind: "generated-api",
      useWhen: "Reading full public component API metadata.",
    },
    {
      id: "dynamic-attrs",
      file: "dynamic-attrs.json",
      mcpUri: "muibook://dynamic-attrs",
      kind: "runtime-metadata",
      useWhen: "Handling runtime or destination-only attrs for wrappers, builders, exporters, and canvases.",
    },
    {
      id: "design",
      file: "DESIGN.md",
      mcpUri: "muibook://design",
      kind: "design-system",
      useWhen: "Making token, theme, surface, typography, spacing, radius, or layout decisions.",
    },
    {
      id: "rules",
      file: "rules.ts",
      mcpUri: "muibook://rules",
      kind: "generation-rules",
      useWhen: "Generating or reviewing component trees.",
    },
    {
      id: "keywords",
      file: "keywords.ts",
      mcpUri: "muibook://keywords",
      kind: "routing-data",
      useWhen: "Mapping natural-language intent to components.",
    },
    {
      id: "compositions",
      file: "compositions.ts",
      mcpUri: "muibook://compositions",
      kind: "examples",
      useWhen: "Finding realistic component-tree examples.",
    },
    {
      id: "skills",
      file: "skill-index.json",
      mcpUri: "muibook://skills",
      kind: "skill-index",
      useWhen: "Choosing a deeper task-specific skill guide.",
    },
  ],
};

writeJson("public/skill-index.json", skillIndex);
writeJson("public/resource-index.json", resourceIndex);
