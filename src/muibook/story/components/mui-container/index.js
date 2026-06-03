import { getComponentDocs } from "../../../utils/story-data";

class storyContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Container");

    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; } 
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-container" title="Container"></story-api-types>

      <story-card title="Small">
        <mui-container small slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container small&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card title="Medium">
      <mui-container medium slot="body">
        <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
      </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container medium&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card title="Large">
        <mui-container large slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container large&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card title="Fluid">
        <mui-container fluid slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container fluid&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card title="Center">
        <mui-container small center slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container center&gt;...&lt;/mui-container&gt;
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
      
        imports='["@muibook/components/mui-container"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-container", storyContainer);
