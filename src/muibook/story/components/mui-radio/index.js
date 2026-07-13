import { getComponentDocs } from "../../../utils/story-data";

class storyRadio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Radio");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Radio"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <mui-v-stack space="var(--space-100)">
        <story-api-types tag="mui-radio" title="Radio"></story-api-types>

        <story-api-types tag="mui-radio-group" title="Radio Group"></story-api-types>
      </mui-v-stack>

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <mui-radio slot="body">Option</mui-radio>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio&gt;Option&lt;/mui-radio&gt;
        </story-code-block>
      </story-card>

      <story-card id="checked" title="${storyMeta["checked"].title}" description="${storyMeta["checked"].description}" usage="${storyMeta["checked"].usage}">
        <mui-radio checked slot="body">Option</mui-radio>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio checked&gt;Option&lt;/mui-radio&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-radio size="x-small" checked>X-Small</mui-radio>
          <mui-radio size="small" checked>Small</mui-radio>
          <mui-radio size="medium" checked>Medium</mui-radio>
          <mui-radio size="large" checked>Large</mui-radio>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio size="x-small" checked&gt;X-Small&lt;/mui-radio&gt;<br />
          &lt;mui-radio size="small" checked&gt;Small&lt;/mui-radio&gt;<br />
          &lt;mui-radio size="medium" checked&gt;Medium&lt;/mui-radio&gt;<br />
          &lt;mui-radio size="large" checked&gt;Large&lt;/mui-radio&gt;
        </story-code-block>
      </story-card>

      <story-card id="disabled" title="${storyMeta["disabled"].title}" description="${storyMeta["disabled"].description}" usage="${storyMeta["disabled"].usage}">
        <mui-h-stack slot="body" space="var(--space-300)">
          <mui-radio disabled>Disabled</mui-radio>
          <mui-radio disabled checked>Disabled Selected</mui-radio>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio disabled&gt;Disabled&lt;/mui-radio&gt;<br />
          &lt;mui-radio disabled checked&gt;Disabled Selected&lt;/mui-radio&gt;
        </story-code-block>
      </story-card>

      <story-card id="radio-group" title="${storyMeta["radio-group"].title}" description="${storyMeta["radio-group"].description}" usage="${storyMeta["radio-group"].usage}">
        <mui-radio-group slot="body" value="pro">
          <mui-radio value="starter">Starter</mui-radio>
          <mui-radio value="pro">Pro</mui-radio>
          <mui-radio value="enterprise">Enterprise</mui-radio>
        </mui-radio-group>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio-group value="pro"&gt;<br />
          &nbsp;&nbsp;&lt;mui-radio value="starter"&gt;Starter&lt;/mui-radio&gt;<br />
          &nbsp;&nbsp;&lt;mui-radio value="pro"&gt;Pro&lt;/mui-radio&gt;<br />
          &nbsp;&nbsp;&lt;mui-radio value="enterprise"&gt;Enterprise&lt;/mui-radio&gt;<br />
          &lt;/mui-radio-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="checkbox-radio-side-by-side" title="${storyMeta["checkbox-radio-side-by-side"].title}" description="${storyMeta["checkbox-radio-side-by-side"].description}" usage="${storyMeta["checkbox-radio-side-by-side"].usage}">
        <mui-h-stack slot="body" space="var(--space-400)" alignY="center">
          <mui-checkbox checked>Checkbox</mui-checkbox>
          <mui-radio checked>Radio</mui-radio>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-h-stack space="var(--space-400)" alignY="center"&gt;<br />
          &nbsp;&nbsp;&lt;mui-checkbox checked&gt;Checkbox&lt;/mui-checkbox&gt;<br />
          &nbsp;&nbsp;&lt;mui-radio checked&gt;Radio&lt;/mui-radio&gt;<br />
          &lt;/mui-h-stack&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template
        title="${data?.title || "Radio"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"

        imports='["@muibook/components/mui-radio", "@muibook/components/mui-radio-group"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-radio", storyRadio);
