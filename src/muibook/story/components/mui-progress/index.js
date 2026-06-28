import { getComponentDocs } from "../../../utils/story-data";

class storyProgress extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Progress");

    const styles = /*css*/ `
      :host { display: block; }

      .canvas {
        background: var(--surface-elevated-100);
        padding: var(--space-600);
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }

    `;

    const stories = /*html*/ `
          <story-api-types tag="mui-progress" title="Progress Bar"></story-api-types>

        <story-card title="Progress Bar" description="Displays a numeric value to indicate loading or completion state.">
          <div class="canvas" slot="body">
            <mui-progress progress="50"></mui-progress>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-progress progress="50"&gt;...&lt;/mui-progress&gt;
          </story-code-block>
        </story-card>

        <story-card 
          title="State: Pending" 
          description="Use when the system is waiting for an external response, such as a server request or sync, and progress cannot be measured."  
        >
          <div class="canvas" slot="body">
            <mui-progress state="pending"></mui-progress>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-progress state="pending"&gt;...&lt;/mui-progress&gt;
          </story-code-block>
        </story-card>

        <story-card title="State: Syncing" description="Use when the system is actively retrying, cycling, or performing time-based checks, where exact progress is unknown.">
          <div class="canvas" slot="body">
            <mui-progress state="syncing"></mui-progress>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-progress state="syncing"&gt;...&lt;/mui-progress&gt;
          </story-code-block>
        </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
      
        imports='["@muibook/components/mui-progress"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-progress", storyProgress);
