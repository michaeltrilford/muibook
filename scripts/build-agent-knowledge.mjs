import fs from "node:fs";

const rulesPath = "src/knowledge/rules.ts";
const compositionsPath = "src/knowledge/compositions.ts";
const keywordsPath = "src/knowledge/keywords.ts";

const agentPromptsPath = "src/agent/prompts/index.ts";
const agentKeywordsOutputPath = "src/agent/keywords/index.ts";

const writeFile = (path, content) => {
  fs.writeFileSync(path, `${content.trimEnd()}\n`);
};

for (const path of [rulesPath, compositionsPath, keywordsPath]) {
  if (!fs.existsSync(path)) {
    throw new Error(`Missing knowledge source: ${path}`);
  }
}

writeFile(
  agentPromptsPath,
  `import { agentCompositions } from "../../knowledge/compositions";
import { rules } from "../../knowledge/rules";

export const prompts = [
  {
    role: "system",
    content: rules,
  },
  {
    role: "assistant",
    name: "examples",
    content: JSON.stringify(agentCompositions),
  },
];`,
);

writeFile(agentKeywordsOutputPath, `export { agentKeywords as keywords } from "../../knowledge/keywords";`);
