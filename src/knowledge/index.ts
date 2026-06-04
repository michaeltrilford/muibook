import { agentCompositionKeys, agentCompositions, compositions } from "./compositions";
import { agentKeywordKeys, agentKeywords, keywords } from "./keywords";
import { rules } from "./rules";

export { agentCompositionKeys, agentCompositions, agentKeywordKeys, agentKeywords, compositions, keywords, rules };

export const knowledge = {
  global: {
    rules,
    keywords,
    compositions,
  },
  agent: {
    compositionKeys: agentCompositionKeys,
    compositions: agentCompositions,
    keywordKeys: agentKeywordKeys,
    keywords: agentKeywords,
  },
} as const;
