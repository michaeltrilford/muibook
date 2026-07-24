import { agentCompositions } from "../../knowledge/compositions";
import { rules } from "../../knowledge/json-rules";

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
];
