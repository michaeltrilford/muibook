import { getComponentDocs } from "../../../utils/story-data";

class StorySpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Spinner");

    const stories = /*html*/ `
      <story-api-types tag="mui-spinner" title="Spinner"></story-api-types>

      <story-card id="sizes" title="Sizes">
        <mui-h-stack slot="body" alignX="start" alignY="center" space="var(--space-400)" style="padding: var(--space-500);">
          <mui-spinner size="xx-small"></mui-spinner>
          <mui-spinner size="x-small"></mui-spinner>
          <mui-spinner size="small"></mui-spinner>
          <mui-spinner size="medium"></mui-spinner>
          <mui-spinner size="large"></mui-spinner>
          <mui-spinner size="x-large"></mui-spinner>
          <mui-spinner size="xx-large"></mui-spinner>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-spinner size="xx-small"&gt;&lt;/mui-spinner&gt;<br>
          &lt;mui-spinner size="x-small"&gt;&lt;/mui-spinner&gt;<br>
          &lt;mui-spinner size="small"&gt;&lt;/mui-spinner&gt;<br>
          &lt;mui-spinner size="medium"&gt;&lt;/mui-spinner&gt;<br>
          &lt;mui-spinner size="large"&gt;&lt;/mui-spinner&gt;<br>
          &lt;mui-spinner size="x-large"&gt;&lt;/mui-spinner&gt;<br>
          &lt;mui-spinner size="xx-large"&gt;&lt;/mui-spinner&gt;
        </story-code-block>
      </story-card>

      <story-card id="custom" title="Color and Duration">
        <mui-h-stack slot="body" alignX="start" alignY="center" space="var(--space-500)" style="padding: var(--space-500);">
          <mui-spinner color="var(--text-color-warning)" label="Loading warning content"></mui-spinner>
          <mui-spinner color="var(--text-color-success)" duration="1.2s" label="Loading success content"></mui-spinner>
          <mui-spinner color="var(--text-color-error)" duration="0.6s" label="Loading error content"></mui-spinner>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-spinner color="var(--text-color-warning)" label="Loading warning content"&gt;&lt;/mui-spinner&gt;<br>
          &lt;mui-spinner color="var(--text-color-success)" duration="1.2s" label="Loading success content"&gt;&lt;/mui-spinner&gt;<br>
          &lt;mui-spinner color="var(--text-color-error)" duration="0.6s" label="Loading error content"&gt;&lt;/mui-spinner&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Spinner"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      
        imports='["@muibook/components/mui-spinner"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="sizes::Sizes|||custom::Color and Duration"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-spinner", StorySpinner);
