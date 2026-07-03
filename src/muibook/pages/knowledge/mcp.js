class KnowledgeMcpPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .content-container {
        container-name: mcp-page;
        container-type: inline-size;
        display: grid;
        gap: var(--space-600);
      }

      .config::part(display) {
        grid-template-columns: 1fr;
      }

      @container mcp-page (min-width: 960px) {
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
        title="Knowledge MCP"
        github="https://github.com/michaeltrilford/muibook-knowledge"
        x-large
      >
        <div class="content-container resource-page">
          <mui-grid class="config" space="var(--space-600)">
            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium">
                  The Muibook Knowledge Model Context Protocol (MCP) server allows AI coding assistants (like Cursor, Claude Desktop, and Copilot) to query the design system's rules, specifications, and code compositions directly in real-time.
                </mui-body>
                <mui-body size="medium">
                  Rather than forcing models to guess component specifications or parse raw source code, the MCP server provides semantic tools to query the design system's exact capabilities, guidelines, and templates.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Available MCP Tools</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium"><strong>find_components</strong>: Locates component names and descriptions using synonym/intent mapping.</mui-list-item>
                  <mui-list-item size="medium"><strong>get_component_specs</strong>: Fetches properties, attributes, events, slots, and CSS custom properties for specific tags.</mui-list-item>
                  <mui-list-item size="medium"><strong>get_component_ux_guidelines</strong>: Retrieves guidelines and UX design rules to ensure components are styled and configured correctly.</mui-list-item>
                  <mui-list-item size="medium"><strong>get_compositions</strong>: Displays copy-pasteable layout templates and complex component composition examples.</mui-list-item>
                  <mui-list-item size="medium"><strong>get_rules</strong>: Returns the global coding contract and normalization schema for components.</mui-list-item>
                </mui-list>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">How to Use It</mui-heading>
                <mui-body size="medium">
                  You can install and run the MCP server locally using <code>npx</code> or configure it directly in your AI assistant's configuration file (e.g. <code>claude_desktop_config.json</code>).
                </mui-body>
              </mui-v-stack>
            </mui-v-stack>

            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Standalone Repository</mui-heading>
                <mui-body size="medium">
                  The MCP server code and pre-compiled JSON assets reside in the standalone repository:
                </mui-body>
                <mui-code scrollable>
                  https://github.com/michaeltrilford/muibook-knowledge
                </mui-code>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Local Run Command</mui-heading>
                <mui-code scrollable>
                  npx -y @muibook/knowledge-mcp
                </mui-code>
              </mui-v-stack>
            </mui-v-stack>
          </mui-grid>
        </div>
      </story-template>
    `;
  }
}

customElements.define("knowledge-mcp-page", KnowledgeMcpPage);
