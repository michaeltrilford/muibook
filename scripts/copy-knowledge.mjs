import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir = path.resolve(__dirname, "..");
const destDir = path.resolve(sourceDir, "../muibook-knowledge");

const filesToCopy = [
  { src: "public/custom-elements.json", dest: "custom-elements.json" },
  { src: "public/dynamic-attrs.json", dest: "dynamic-attrs.json" },
  { src: "AGENTS.md", dest: "AGENTS.md" },
  { src: "DESIGN.md", dest: "DESIGN.md" },
  { src: "src/knowledge/README.md", dest: "README.md" },
  { src: "src/knowledge/index.ts", dest: "index.ts" },
  { src: "src/knowledge/rules.ts", dest: "rules.ts" },
  { src: "src/knowledge/compositions.ts", dest: "compositions.ts" },
  { src: "src/knowledge/keywords.ts", dest: "keywords.ts" },
];

console.log(`Copying knowledge files to: ${destDir}`);

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

for (const { src, dest } of filesToCopy) {
  const srcPath = path.join(sourceDir, src);
  const destPath = path.join(destDir, dest);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied: ${src} -> ${dest}`);
  } else {
    console.warn(`⚠ Warning: Source file does not exist: ${src}`);
  }
}

console.log("Knowledge sync complete!");
