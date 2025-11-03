import Image from "../../images/pages/muiplay.png";

class AgentPromptsPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .config::part(display) {
        grid-template-columns: 1fr;
      }

      mui-image {
        border: var(--border-thin);
        border-color: var(--app-story-banner-border-color);
        border-radius: var(--radius-400);
        overflow: hidden;
      }

      @media (min-width: 1230px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 65ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @media (min-width: 1390px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 65ch) 500px;
          gap: 9.6rem;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Agent Prompts"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/agent/prompts/index.ts"
      >
          
          <mui-grid class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium">Agent Prompts are structured instructions designed to define the behavior and responses of AI agents clearly and consistently.</mui-body>
                <mui-body size="medium">By formalizing these prompts, you ensure scalable, maintainable, and reusable logic across different AI implementations.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Structured Task Instructions</mui-heading>
                <mui-body size="medium">
                  Create reusable and clear directives that help AI agents interpret user intent and generate predictable, context-aware responses.
                </mui-body>
              </mui-v-stack>


              <mui-code scrollable>
              export const muiPrompts = [
              <br>
              &nbsp;&nbsp;&#123;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;role: &quot;system&quot;,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;content: &quot;You are an assistant that converts UI prompts into...&quot;<br>
              &nbsp;&nbsp;&#125;,<br>
              &nbsp;&nbsp;&#123; role: &quot;user&quot;, content: &quot;[card] Create a vertical stack with two cards&quot; &#125;,<br>
              &nbsp;&nbsp;&#123;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;role: &quot;assistant&quot;,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;content:
              &nbsp;&nbsp;&quot;
              &nbsp;&nbsp;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=\&quot;var(--space-400)\&quot;&gt;\n
              &nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;\n
              &nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;\n
              &nbsp;&nbsp;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;
              &nbsp;&nbsp;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&quot;
              &nbsp;&nbsp;<br>
              &nbsp;&nbsp;&#125;,<br><br>
              &nbsp;&nbsp;// Container examples<br>
              &nbsp;&nbsp;&#123; role: &quot;user&quot;, content: &quot;[layout] Create a small container&quot; &#125;,<br>
              &nbsp;&nbsp;&#123; role: &quot;assistant&quot;, content: &quot;&lt;mui-container small&gt;...&lt;/mui-container&gt;&quot; &#125;,<br>
              &nbsp;&nbsp;&#123; role: &quot;user&quot;, content: &quot;[layout] Create a medium container&quot; &#125;,<br>
              &nbsp;&nbsp;&#123; role: &quot;assistant&quot;, content: &quot;&lt;mui-container medium&gt;...&lt;/mui-container&gt;&quot; &#125;,<br>
              &nbsp;&nbsp;<br>
              &nbsp;&nbsp;&#46;&#46;&#46; View the <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/src/agent/prompts/index.ts" target="_blank" rel="noopener noreferrer">Github for full example</mui-link> &#46;&#46;&#46; <br>
              <br>
              ];<br>
              </mui-code>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Agent Prompts" />
            </mui-image>  
          </mui-grid>

      </story-template>
    `;
  }
}

customElements.define("agent-prompts-page", AgentPromptsPage);
