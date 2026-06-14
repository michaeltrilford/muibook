class KnowledgeKeywordsPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .config::part(display) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 1230px) {
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
        title="Knowledge Keywords"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/knowledge/keywords.ts"
      >
        <mui-grid class="config" space="var(--space-600)">
          <mui-v-stack space="var(--space-600)">
            <mui-v-stack space="var(--space-400)">
              <mui-body size="medium">
                Keywords are lightweight intent mappings that connect user language to likely Muibook components, patterns, and documentation areas.
              </mui-body>
              <mui-body size="medium">
                They are useful before a model call, inside command palettes, or anywhere a product needs fast routing from natural language to design-system intent.
              </mui-body>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">What They Cover</mui-heading>
              <mui-list as="ul">
                <mui-list-item size="medium">Component synonyms, shorthand names, and product-language aliases.</mui-list-item>
                <mui-list-item size="medium">Search and intent-routing hints for local tools.</mui-list-item>
                <mui-list-item size="medium">A curated <mui-code size="small" inline>agentKeywords</mui-code> subset for smaller local LLM payloads.</mui-list-item>
              </mui-list>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">AI Agent Relationship</mui-heading>
              <mui-body size="medium">
                The AI Agent keyword export is generated from Knowledge keywords, but it only includes the selected groups needed by the optimised local workflow.
              </mui-body>
              <mui-link href="/keywords">View optimised file</mui-link>
            </mui-v-stack>
          </mui-v-stack>

          <mui-v-stack space="var(--space-400)">
            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Package Imports</mui-heading>
              <mui-code scrollable>
                import { keywords } from &quot;@muibook/components/knowledge/keywords&quot;;<br />
                import { agentKeywords } from &quot;@muibook/components/knowledge/keywords&quot;;<br />
                import { keywords as lightweightKeywords } from &quot;@muibook/components/agent/keywords&quot;;
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Dist Paths</mui-heading>
              <mui-code scrollable>
                /dist/esm/knowledge/keywords/index.js<br />
                /dist/esm/agent/keywords/index.js<br />
                /dist/types/knowledge/keywords.d.ts
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Knowledge Repo</mui-heading>
              <mui-code scrollable>
                https://github.com/michaeltrilford/muibook-knowledge<br /><br />
                /keywords.ts
              </mui-code>
            </mui-v-stack>
          </mui-v-stack>
        </mui-grid>
      </story-template>
    `;
  }
}

customElements.define("knowledge-keywords-page", KnowledgeKeywordsPage);
