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

      <story-card id="small" title="Small">
        <mui-container small slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container small&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="medium" title="Medium">
      <mui-container medium slot="body">
        <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
      </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container medium&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="x-medium" title="X Medium">
        <mui-container x-medium slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container x-medium&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="large" title="Large">
        <mui-container large slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container large&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="x-large" title="X Large">
        <mui-container x-large slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container x-large&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="width"
        title="Width"
        description="Use width when a layout needs an explicit max-width without changing the shared t-shirt size scale."
        usage="Width overrides the selected size.|||Use size for common layout rhythm and width for one-off page constraints.|||Numeric values map to the design rem scale, so width='960' resolves to 96rem. CSS lengths like width='64rem' are also supported.">
        <mui-container width="960" slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container width="960"&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="fluid" title="Fluid">
        <mui-container fluid slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container fluid&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="center" title="Center">
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
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="small::Small|||medium::Medium|||x-medium::X Medium|||large::Large|||x-large::X Large|||width::Width|||fluid::Fluid|||center::Center"
        ></story-quicklinks>

        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-container", storyContainer);
