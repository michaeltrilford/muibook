class KnowledgeFragmentsPage extends HTMLElement {
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
        title="Fragments"
        github="https://github.com/michaeltrilford/muibook/tree/main/src/knowledge/fragments"
        x-large
      >
        <div class="content-container resource-page">
          <mui-grid class="config" space="var(--space-600)">
          <mui-v-stack space="var(--space-600)">
            <mui-v-stack space="var(--space-400)">
              <mui-body size="medium">
                Fragments are shared markdown text snippets that are injected into generated files during the build step.
              </mui-body>
              <mui-body size="medium">
                They serve as a single source of truth, ensuring that the JSON Rules output and the Muibook HTML Skills remain perfectly in sync.
              </mui-body>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Available Fragments</mui-heading>
              <mui-list as="ul">
                <mui-list-item size="medium"><strong>chart-data.md</strong>: Guidelines for constructing structured data for charting components.</mui-list-item>
                <mui-list-item size="medium"><strong>design-assets.md</strong>: Curated lists of available design system assets like illustrations and brand icons.</mui-list-item>
                <mui-list-item size="medium"><strong>json-components.md</strong>: Core component mapping rules from scanned elements to Redactd primitives.</mui-list-item>
              </mui-list>
            </mui-v-stack>
          </mui-v-stack>

          <mui-v-stack space="var(--space-400)">
            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Source Directory</mui-heading>
              <mui-code scrollable>
                /src/knowledge/fragments
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Injected Build Targets</mui-heading>
              <mui-code scrollable>
                /src/knowledge/json-rules.ts<br />
                /skills/muibook-components/SKILL.md
              </mui-code>
            </mui-v-stack>
          </mui-v-stack>
        </mui-grid>
        </div>
      </story-template>
    `;
  }
}

customElements.define("knowledge-fragments-page", KnowledgeFragmentsPage);
