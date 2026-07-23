import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, "..");
const destDir = path.resolve(sourceDir, "../RedactdCanvas/plugins/assets/muibook-knowledge");

const filesToCopy = [
  { src: "public/custom-elements.json", dest: "custom-elements.json" },
  { src: "public/dynamic-attrs.json", dest: "dynamic-attrs.json" },
  { src: "DESIGN.md", dest: "DESIGN.md" },
  { src: "src/knowledge/rules.ts", dest: "rules.ts" },
  { src: "src/knowledge/compositions.ts", dest: "compositions.ts" },
  { src: "src/knowledge/keywords.ts", dest: "keywords.ts" },
  { src: "skills/muibook-components/SKILL.md", dest: "skills/muibook-components/SKILL.md" },
];

console.log(`Copying Redactd Canvas knowledge files to: ${destDir}`);
fs.mkdirSync(destDir, { recursive: true });

for (const { src, dest } of filesToCopy) {
  const srcPath = path.join(sourceDir, src);
  const destPath = path.join(destDir, dest);

  if (!fs.existsSync(srcPath)) {
    throw new Error(`Missing knowledge source: ${src}`);
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied: ${src} -> ${dest}`);
}

console.log("Redactd Canvas knowledge sync complete.");
