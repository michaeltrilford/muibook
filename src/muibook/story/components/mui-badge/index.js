import { getComponentDocs } from "../../../utils/story-data";

class storyBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Badge");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-badge" title="Badge"></story-api-types>

        <story-card title="Default">
          <div slot="body">
            <mui-badge>New</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Sizes">
          <div slot="body">
            <mui-v-stack space="var(--space-200)" alignx="start">
              <mui-badge size="xx-small">2</mui-badge>
              <mui-badge size="x-small">2</mui-badge>
              <mui-badge size="small">2</mui-badge>
              <mui-badge size="medium">2</mui-badge>
              <mui-badge size="large">2</mui-badge>
            </mui-v-stack>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge size="xx-small"&gt;2&lt;/mui-badge&gt;<br />
            &lt;mui-badge size="x-small"&gt;2&lt;/mui-badge&gt;<br />
            &lt;mui-badge size="small"&gt;2&lt;/mui-badge&gt;<br />
            &lt;mui-badge size="medium"&gt;2&lt;/mui-badge&gt;<br />
            &lt;mui-badge size="large"&gt;2&lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Neutral">
          <div slot="body">
            <mui-badge variant="neutral">Offline</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant="neutral"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Positive">
          <div slot="body">
            <mui-badge variant="positive">Paid</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant="positive"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Warning">
          <div slot="body">
            <mui-badge variant="warning">Busy</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant="warning"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Attention">
          <div slot="body">
            <mui-badge variant="attention">Urgent</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant="attention"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Overlay">
          <div slot="body">
            <mui-badge variant="overlay">IMG</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant="overlay"&gt;IMG&lt;/mui-badge&gt;
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
      
        imports='["@muibook/components/mui-badge"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-badge", storyBadge);
