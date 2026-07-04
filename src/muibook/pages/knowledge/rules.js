class KnowledgeRulesPage extends HTMLElement {
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
        title="Rules"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/knowledge/rules.ts"
        x-large
      >
        <div class="content-container resource-page">
          <mui-grid class="config" space="var(--space-600)">
          <mui-v-stack space="var(--space-600)">
            <mui-v-stack space="var(--space-400)">
              <mui-body size="medium">
                Rules are the global AI coding contract for generating Muibook component trees. They describe output shape, component normalization, slot behavior, and design-system constraints.
              </mui-body>
              <mui-body size="medium">
                They are intentionally separate from component API docs. APIs explain what a component supports; rules explain how an assistant should produce valid Muibook structures.
              </mui-body>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">What They Cover</mui-heading>
              <mui-list as="ul">
                <mui-list-item size="medium">JSON tree shape and required node fields.</mui-list-item>
                <mui-list-item size="medium">Component normalization from scanned or shorthand names into valid Muibook component types.</mui-list-item>
                <mui-list-item size="medium">Slot and children rules for actions, layout, cards, and leaf components.</mui-list-item>
                <mui-list-item size="medium">Design-system guardrails that prevent invalid, unsupported, or off-pattern markup.</mui-list-item>
              </mui-list>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">AI Agent Relationship</mui-heading>
              <mui-body size="medium">
                The optimised AI Agent prompt imports these rules as the system message. This keeps the local LLM payload small while still using the same authored source as the larger Knowledge bundle.
              </mui-body>
              <mui-link href="/prompts">View optimised file</mui-link>
            </mui-v-stack>
          </mui-v-stack>

          <mui-v-stack space="var(--space-400)">
            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Package Imports</mui-heading>
              <mui-code scrollable>
                import { rules } from &quot;@muibook/components/knowledge/rules&quot;;<br />
                import { prompts } from &quot;@muibook/components/agent/prompts&quot;;
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Dist Paths</mui-heading>
              <mui-code scrollable>
                /dist/esm/knowledge/rules/index.js<br />
                /dist/esm/agent/prompts/index.js<br />
                /dist/types/knowledge/rules.d.ts
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Knowledge Repo</mui-heading>
              <mui-code scrollable>
                https://github.com/michaeltrilford/muibook-knowledge<br /><br />
                /rules.ts
              </mui-code>
            </mui-v-stack>
          </mui-v-stack>
        </mui-grid>
        </div>
      </story-template>
    `;
  }
}

customElements.define("knowledge-rules-page", KnowledgeRulesPage);
