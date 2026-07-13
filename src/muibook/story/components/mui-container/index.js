import { getComponentDocs } from "../../../utils/story-data";

class storyContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Container");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Container"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-container" title="Container"></story-api-types>

      <story-card id="small" title="${storyMeta["small"].title}" description="${storyMeta["small"].description}" usage="${storyMeta["small"].usage}">
        <mui-container small slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container small&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="medium" title="${storyMeta["medium"].title}" description="${storyMeta["medium"].description}" usage="${storyMeta["medium"].usage}">
      <mui-container medium slot="body">
        <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
      </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container medium&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="x-medium" title="${storyMeta["x-medium"].title}" description="${storyMeta["x-medium"].description}" usage="${storyMeta["x-medium"].usage}">
        <mui-container x-medium slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container x-medium&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="large" title="${storyMeta["large"].title}" description="${storyMeta["large"].description}" usage="${storyMeta["large"].usage}">
        <mui-container large slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container large&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="x-large" title="${storyMeta["x-large"].title}" description="${storyMeta["x-large"].description}" usage="${storyMeta["x-large"].usage}">
        <mui-container x-large slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container x-large&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="width" title="${storyMeta["width"].title}" description="${storyMeta["width"].description}" usage="${storyMeta["width"].usage}">
        <mui-container width="960" slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container width="960"&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="fluid" title="${storyMeta["fluid"].title}" description="${storyMeta["fluid"].description}" usage="${storyMeta["fluid"].usage}">
        <mui-container fluid slot="body">
          <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
        </mui-container>
        <story-code-block slot="footer" scrollable>
          &lt;mui-container fluid&gt;...&lt;/mui-container&gt;
        </story-code-block>
      </story-card>

      <story-card id="center" title="${storyMeta["center"].title}" description="${storyMeta["center"].description}" usage="${storyMeta["center"].usage}">
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
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>

        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-container", storyContainer);
