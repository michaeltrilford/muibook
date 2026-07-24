import { agentCompositionKeys, agentCompositions, compositionConfig, compositionStories, compositions } from "./compositions";
import { agentKeywordKeys, agentKeywords, keywords } from "./keywords";
import { rules } from "./json-rules";

export { agentCompositionKeys, agentCompositions, agentKeywordKeys, agentKeywords, compositionConfig, compositionStories, compositions, keywords, rules };

export const knowledge = {
  global: {
    rules,
    keywords,
    compositions,
    compositionConfig,
    compositionStories,
  },
  agent: {
    compositionKeys: agentCompositionKeys,
    compositions: agentCompositions,
    keywordKeys: agentKeywordKeys,
    keywords: agentKeywords,
  },
} as const;
