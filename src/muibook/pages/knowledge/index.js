class KnowledgePage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

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
          grid-template-columns: minmax(0, 70ch) 420px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @container (min-width: 1120px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 560px;
          gap: 9.6rem;
        }
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Knowledge"
        github="https://github.com/michaeltrilford/muibook/tree/main/src/knowledge"
        x-large
      >
        <div class="content-container resource-page">
          <mui-grid class="config" space="var(--space-600)">
          <mui-v-stack space="var(--space-600)">
            <mui-v-stack space="var(--space-400)">
              <mui-body size="medium">
                Muibook Knowledge is the structured context layer for tools that need to understand the design system without scraping examples by hand.
              </mui-body>
              <mui-body size="medium">
                It combines generated component metadata with authored rules, keywords, and composition examples so AI agents, builders, Redactd-style editors, and Codex plugins can work from the same source of truth.
              </mui-body>
              <mui-body size="medium">
                A mirrored export is available at <mui-link size="medium" href="https://github.com/michaeltrilford/muibook-knowledge" target="_blank" rel="noopener noreferrer">michaeltrilford/muibook-knowledge</mui-link> for consumers that want the knowledge files without installing or reading the full component repo.
              </mui-body>
            </mui-v-stack>

            <story-quicklinks
              heading="Knowledge Areas"
              links="design-manifest::Design Manifest|||compositions::Compositions|||rules::Rules|||keywords::Keywords|||knowledge-mcp::Knowledge MCP|||agent-output::AI Agent Output|||package-paths::Package Paths"
            ></story-quicklinks>

            <mui-v-stack id="design-manifest" space="var(--space-300)">
              <mui-heading level="3" size="5">Design Manifest</mui-heading>
              <mui-body size="medium">
                The design manifest is published as <mui-code size="small">custom-elements.json</mui-code>. It carries component names, API metadata, slots, CSS parts, types, and component UX guidance generated from the component docs layer.
              </mui-body>
              <mui-list as="ul">
                <mui-list-item size="medium">Components: the tag inventory and source module metadata.</mui-list-item>
                <mui-list-item size="medium">Types: attributes, properties, slots, events, CSS parts, and CSS custom properties.</mui-list-item>
                <mui-list-item size="medium">Component UX Guidelines: authored guidance from component docs that helps tools use components correctly.</mui-list-item>
              </mui-list>
            </mui-v-stack>

            <mui-v-stack id="compositions" space="var(--space-300)">
              <mui-heading level="3" size="5">Compositions</mui-heading>
              <mui-body size="medium">
                Compositions are curated examples for common Muibook layouts and product patterns. They are useful as copyable implementation references and as example data for agents that need to generate valid component trees.
              </mui-body>
              <mui-list as="ul">
                <mui-list-item size="medium">Full composition data is exported from Knowledge for richer tooling.</mui-list-item>
                <mui-list-item size="medium">A curated subset is selected for the lightweight AI Agent prompt output.</mui-list-item>
                <mui-list-item size="medium">Composition UX Guidelines explain why the structure is valid, not just what markup to render.</mui-list-item>
              </mui-list>
            </mui-v-stack>

            <mui-v-stack id="rules" space="var(--space-300)">
              <mui-heading level="3" size="5">Rules</mui-heading>
              <mui-body size="medium">
                Rules are global AI coding rules for generating Muibook component trees. They define output shape, component naming, slot rules, normalization rules, and design-system constraints.
              </mui-body>
              <mui-body size="medium">
                The same source rules feed the optimised AI Agent prompt export, so local LLM flows get a smaller contract while the full Knowledge package remains available for larger tooling.
              </mui-body>
            </mui-v-stack>

            <mui-v-stack id="keywords" space="var(--space-300)">
              <mui-heading level="3" size="5">Keywords</mui-heading>
              <mui-body size="medium">
                Keywords map user language to component intent. They are useful for command palettes, lightweight routing, search, and pre-model intent detection.
              </mui-body>
              <mui-body size="medium">
                The full keyword map stays in Knowledge, while the AI Agent keyword export uses the curated subset needed by local LLM workflows.
              </mui-body>
            </mui-v-stack>

            <mui-v-stack id="knowledge-mcp" space="var(--space-300)">
              <mui-heading level="3" size="5">Knowledge MCP</mui-heading>
              <mui-body size="medium">
                The Model Context Protocol (MCP) server allows AI assistants to retrieve Muibook specs, UX guidelines, component contracts, and copy-pasteable compositions in real-time.
              </mui-body>
              <mui-body size="medium">
                A standalone repository hosting the MCP server is available at <mui-link size="medium" href="https://github.com/michaeltrilford/muibook-knowledge" target="_blank" rel="noopener noreferrer">michaeltrilford/muibook-knowledge</mui-link>.
              </mui-body>
            </mui-v-stack>

            <mui-v-stack id="agent-output" space="var(--space-300)">
              <mui-heading level="3" size="5">AI Agent Output</mui-heading>
              <mui-body size="medium">
                The AI Agent resources are optimised outputs built from Knowledge. They are intentionally smaller than the full knowledge base so local app prompts have more room for user context.
              </mui-body>
              <mui-list as="ul">
                <mui-list-item size="medium"><mui-code size="small">agent/prompts</mui-code> combines Knowledge rules with the curated composition examples.</mui-list-item>
                <mui-list-item size="medium"><mui-code size="small">agent/keywords</mui-code> exports the curated keyword groups for lightweight intent matching.</mui-list-item>
              </mui-list>
            </mui-v-stack>
          </mui-v-stack>

          <mui-v-stack id="package-paths" space="var(--space-400)">
            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Package Imports</mui-heading>
              <mui-code scrollable>
                import manifest from &quot;@muibook/components/custom-elements.json&quot;;<br />
                import dynamicAttrs from &quot;@muibook/components/dynamic-attrs.json&quot;;<br />
                import { knowledge } from &quot;@muibook/components/knowledge&quot;;<br />
                import { compositions } from &quot;@muibook/components/knowledge/compositions&quot;;<br />
                import { rules } from &quot;@muibook/components/knowledge/rules&quot;;<br />
                import { keywords } from &quot;@muibook/components/knowledge/keywords&quot;;<br />
                import { prompts } from &quot;@muibook/components/agent/prompts&quot;;<br />
                import { keywords as agentKeywords } from &quot;@muibook/components/agent/keywords&quot;;
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Dist Paths</mui-heading>
              <mui-code scrollable>
                /dist/esm/custom-elements.json<br />
                /dist/esm/dynamic-attrs.json<br />
                /dist/esm/knowledge/index.js<br />
                /dist/esm/knowledge/compositions/index.js<br />
                /dist/esm/knowledge/rules/index.js<br />
                /dist/esm/knowledge/keywords/index.js<br />
                /dist/esm/agent/prompts/index.js<br />
                /dist/esm/agent/keywords/index.js
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Knowledge Repo</mui-heading>
              <mui-body size="medium">
                The package build can copy the generated manifest, dynamic attrs, root guidance, and authored Knowledge files into the standalone repository.
              </mui-body>
              <mui-code scrollable>
                npm run build<br /><br />
                https://github.com/michaeltrilford/muibook-knowledge
              </mui-code>
            </mui-v-stack>
          </mui-v-stack>
        </mui-grid>
        </div>
      </story-template>
    `;
  }
}

customElements.define("knowledge-page", KnowledgePage);
