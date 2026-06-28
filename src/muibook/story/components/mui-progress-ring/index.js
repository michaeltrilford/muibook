import { getComponentDocs } from "../../../utils/story-data";

class StoryProgressRing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ProgressRing");

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
      <story-api-types tag="mui-progress-ring" title="Progress Ring"></story-api-types>

      <story-card title="Default" description="Displays compact circular progress with optional center content.">
        <mui-h-stack class="canvas" slot="body" alignX="start" alignY="center">
          <mui-progress-ring progress="50" label="Transactions automated">2/4</mui-progress-ring>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-progress-ring progress="50" label="Transactions automated"&gt;2/4&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Value and Max" description="Use value and max when progress is based on completed items.">
        <mui-h-stack class="canvas" slot="body" alignX="start" alignY="center">
          <mui-progress-ring value="2" max="4" label="Transactions automated">2/4</mui-progress-ring>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-progress-ring value="2" max="4" label="Transactions automated"&gt;2/4&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Sizes">
        <mui-h-stack class="canvas" slot="body" alignX="start" alignY="center" space="var(--space-500)">
          <mui-progress-ring size="small" value="2" max="4" label="Transactions automated">2/4</mui-progress-ring>
          <mui-progress-ring value="2" max="4" label="Transactions automated">2/4</mui-progress-ring>
          <mui-progress-ring size="large" value="2" max="4" label="Transactions automated">2/4</mui-progress-ring>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-progress-ring size="small" value="2" max="4" label="Transactions automated"&gt;2/4&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" label="Transactions automated"&gt;2/4&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" label="Transactions automated"&gt;2/4&lt;/mui-progress-ring&gt;
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
      
        imports='["@muibook/components/mui-progress-ring"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-progress-ring", StoryProgressRing);
