import { agentCompositionKeys, agentCompositions, compositionConfig, compositions } from "./compositions";
import { agentKeywordKeys, agentKeywords, keywords } from "./keywords";
import { rules } from "./rules";

export { agentCompositionKeys, agentCompositions, agentKeywordKeys, agentKeywords, compositionConfig, compositions, keywords, rules };

export const knowledge = {
  global: {
    rules,
    keywords,
    compositions,
    compositionConfig,
  },
  agent: {
    compositionKeys: agentCompositionKeys,
    compositions: agentCompositions,
    keywordKeys: agentKeywordKeys,
    keywords: agentKeywords,
  },
} as const;
