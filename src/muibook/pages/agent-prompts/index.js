import Image from "../../images/pages/muiplay.png";

class AgentPromptsPage extends HTMLElement {
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

      mui-image {
        border: var(--border-thin);
        border-color: var(--app-story-banner-border-color);
        border-radius: var(--radius-400);
        overflow: hidden;
      }

      @container (min-width: 960px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 65ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @container (min-width: 1120px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 570px;
          gap: 9.6rem;
        }
      }

      @container (min-width: 1730px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 690px;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Agent Prompts"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/agent/prompts/index.ts"
        x-large
      >
          
          <div class="content-container resource-page">
          <mui-grid class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium">Agent Prompts are a baseline prompt contract for generating Muibook component trees. Muiplay used this approach to turn layout prompts into real Web Component markup.</mui-body>
                <mui-body size="medium">In product tools like Redactd or Outcomes, prompts are usually extended or replaced with product-specific rules, output shapes, scoring, and workflow context. Treat this file as a reusable starting point, not the only prompt your product should use.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Prompt Contract</mui-heading>
                <mui-body size="medium">
                  Use prompts to define the allowed component inventory, JSON shape, naming rules, slot behavior, and examples that keep generated layouts predictable.
                </mui-body>
              </mui-v-stack>


              <mui-code scrollable>
              export const prompts = [
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
        </div>

      </story-template>
    `;
  }
}

customElements.define("agent-prompts-page", AgentPromptsPage);
