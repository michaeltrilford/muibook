import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, "..");

const filesToCopy = [
  {
    src: "src/knowledge/create-web-components-skill.md",
    dest: "public/create-web-components-skill.md",
  },
  {
    src: "src/knowledge/create-ux-guidelines-skill.md",
    dest: "public/create-ux-guidelines-skill.md",
  },
  {
    src: "src/knowledge/compose-web-components-skill.md",
    dest: "public/compose-web-components-skill.md",
  },
  {
    src: "src/knowledge/style-web-components-skill.md",
    dest: "public/style-web-components-skill.md",
  },
];

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
