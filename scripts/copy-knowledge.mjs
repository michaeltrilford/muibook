import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir = path.resolve(__dirname, "..");
const destDir = path.resolve(sourceDir, "../muibook-knowledge");

await import("./build-knowledge-indexes.mjs");

const filesToCopy = [
  { src: "public/custom-elements.json", dest: "custom-elements.json" },
  { src: "public/dynamic-attrs.json", dest: "dynamic-attrs.json" },
  { src: "public/resource-index.json", dest: "resource-index.json" },
  { src: "public/skill-index.json", dest: "skill-index.json" },
  { src: "AGENTS.md", dest: "AGENTS.md" },
  { src: "DESIGN.md", dest: "DESIGN.md" },
  { src: "src/knowledge/README.md", dest: "README.md" },
  { src: "src/knowledge/index.ts", dest: "index.ts" },
  { src: "src/knowledge/knowledge-map.md", dest: "knowledge-map.md" },
  { src: "src/knowledge/mcp-instructions.md", dest: "mcp-instructions.md" },
  { src: "src/knowledge/rules.ts", dest: "rules.ts" },
  { src: "src/knowledge/compositions.ts", dest: "compositions.ts" },
  { src: "src/knowledge/keywords.ts", dest: "keywords.ts" },
  { src: "src/knowledge/create-web-components-skill.md", dest: "create-web-components-skill.md" },
  { src: "src/knowledge/create-ux-guidelines-skill.md", dest: "create-ux-guidelines-skill.md" },
  { src: "src/knowledge/compose-web-components-skill.md", dest: "compose-web-components-skill.md" },
  { src: "src/knowledge/style-web-components-skill.md", dest: "style-web-components-skill.md" },
];

console.log(`Copying knowledge files to: ${destDir}`);

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

for (const { src, dest } of filesToCopy) {
  const srcPath = path.join(sourceDir, src);
  const destPath = path.join(destDir, dest);

  if (fs.existsSync(srcPath)) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied: ${src} -> ${dest}`);
  } else {
    console.warn(`⚠ Warning: Source file does not exist: ${src}`);
  }
}

console.log("Knowledge sync complete!");
