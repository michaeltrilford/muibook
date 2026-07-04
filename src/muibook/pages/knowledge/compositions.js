class KnowledgeCompositionsPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .resource-page mui-code {
        border-radius: var(--radius-200);
        --code-background: var(--surface);
      }

      .content-container {
        container-type: inline-size;
        display: grid;
        gap: var(--space-600);
      }

      .config::part(display) {
        grid-template-columns: 1fr;
      }

      @container (min-width: 960px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 70ch) 480px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Compositions"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/knowledge/compositions.ts"
        x-large
      >
        <div class="content-container resource-page">
          <mui-grid class="config" space="var(--space-600)">
          <mui-v-stack space="var(--space-600)">
            <mui-v-stack space="var(--space-400)">
              <mui-body size="medium">
                Compositions are curated Muibook component-tree examples for common interface patterns. They help humans, builders, and AI tooling understand how components should be assembled together.
              </mui-body>
              <mui-body size="medium">
                Use them when a tool needs a reliable example of structure, slot usage, naming, spacing, and component hierarchy rather than isolated component APIs.
              </mui-body>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">What They Include</mui-heading>
              <mui-list as="ul">
                <mui-list-item size="medium">Full composition examples for richer knowledge-base and Codex-style tooling.</mui-list-item>
                <mui-list-item size="medium">A curated <mui-code size="small" inline>agentCompositions</mui-code> subset for lightweight local LLM prompts.</mui-list-item>
                <mui-list-item size="medium">Composition UX guidance through example structure: where content lives, how slots are used, and how layouts stay valid.</mui-list-item>
              </mui-list>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">AI Agent Relationship</mui-heading>
              <mui-body size="medium">
                The AI Agent prompt export imports the curated composition subset from Knowledge. Add new examples freely, then only add their keys to the agent subset when they should be included in the optimised local prompt payload.
              </mui-body>
              <mui-link href="/prompts">View optimised file</mui-link>
            </mui-v-stack>
          </mui-v-stack>

          <mui-v-stack space="var(--space-400)">
            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Package Imports</mui-heading>
              <mui-code scrollable>
                import { compositions } from &quot;@muibook/components/knowledge/compositions&quot;;<br />
                import { agentCompositions } from &quot;@muibook/components/knowledge/compositions&quot;;
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Dist Paths</mui-heading>
              <mui-code scrollable>
                /dist/esm/knowledge/compositions/index.js<br />
                /dist/types/knowledge/compositions.d.ts
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Knowledge Repo</mui-heading>
              <mui-code scrollable>
                https://github.com/michaeltrilford/muibook-knowledge<br /><br />
                /compositions.ts
              </mui-code>
            </mui-v-stack>
          </mui-v-stack>
        </mui-grid>
        </div>
      </story-template>
    `;
  }
}

customElements.define("knowledge-compositions-page", KnowledgeCompositionsPage);
