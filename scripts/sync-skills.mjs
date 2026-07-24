import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, "..");

const filesToCopy = [
  {
    src: "skills/create-web-components/SKILL.md",
    dest: "public/skills/create-web-components/SKILL.md",
  },
  {
    src: "skills/create-ux-guidelines/SKILL.md",
    dest: "public/skills/create-ux-guidelines/SKILL.md",
  },
  {
    src: "skills/style-web-components/SKILL.md",
    dest: "public/skills/style-web-components/SKILL.md",
  },
  {
    src: "skills/redactd-canvas-muibook/SKILL.md",
    dest: "public/skills/redactd-canvas-muibook/SKILL.md",
  },
];

const legacyFiles = [
  "public/create-web-components-skill.md",
  "public/create-ux-guidelines-skill.md",
  "public/compose-web-components-skill.md",
  "public/style-web-components-skill.md",
];

for (const file of legacyFiles) {
  fs.rmSync(path.join(sourceDir, file), { force: true });
}

for (const { src, dest } of filesToCopy) {
  const srcPath = path.join(sourceDir, src);
  const destPath = path.join(sourceDir, dest);

  if (!fs.existsSync(srcPath)) {
    throw new Error(`Missing skill source: ${src}`);
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied: ${src} -> ${dest}`);
}
