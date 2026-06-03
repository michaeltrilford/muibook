import { getComponentDocs } from "../../../utils/story-data";

class storyGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Grid");

    const styles = /*css*/ `
      :host { display: block; }
      .sized-grid {
        box-sizing: border-box;
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface-recessed-100);
      }
    `;

    const Box = /*html*/ `
      <mui-card>
        <mui-card-body>{content}</mui-card-body>
      </mui-card>
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-grid" title="Grid"></story-api-types>

      <story-card title="Default">

        <mui-grid slot="body" space="var(--space-200)">
          ${Box}
          ${Box}
        </mui-grid>
        
        <story-code-block slot="footer" scrollable>
          &lt;mui-grid col="1fr 1fr" space="var(--space-200)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-grid&gt;
        </story-code-block>
      </story-card>

      <story-card title="Three Column">
        <mui-grid col="1fr 1fr 1fr" slot="body" space="var(--space-200)">
          ${Box}
          ${Box}
          ${Box}
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-grid col="1fr 1fr 1fr" space="var(--space-200)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-grid&gt;
        </story-code-block>
      </story-card>

      <story-card title="Sized Alignment" description="Set a height to align items within a defined layout area.">
        <mui-grid class="sized-grid" height="20rem" padding="var(--space-300)" col="1fr 1fr" aligny="center" space="var(--space-200)" slot="body">
          ${Box}
          ${Box}
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-grid height="20rem" padding="var(--space-300)" col="1fr 1fr" aligny="center" space="var(--space-200)"&gt;<br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;<br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;<br />
          &lt;/mui-grid&gt;
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
      
        imports='["@muibook/components/mui-grid"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-grid", storyGrid);
