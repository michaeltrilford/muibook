import { getComponentDocs } from "../../../utils/story-data";

class storyCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Checkbox");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Checkbox"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-checkbox" title="Checkbox"></story-api-types>


      <story-card id="unchecked-default" title="${storyMeta["unchecked-default"].title}" description="${storyMeta["unchecked-default"].description}" usage="${storyMeta["unchecked-default"].usage}">

      <mui-checkbox slot="body"></mui-checkbox>
      <story-code-block slot="footer" scrollable>
        &nbsp;&nbsp;&lt;mui-checkbox&gt;&lt;/mui-checkbox&gt;
        <br />
      </story-code-block>
      </story-card>

      <story-card id="checked" title="${storyMeta["checked"].title}" description="${storyMeta["checked"].description}" usage="${storyMeta["checked"].usage}">
      <mui-checkbox checked slot="body"></mui-checkbox>
      <story-code-block slot="footer" scrollable>
        &nbsp;&nbsp;&lt;mui-checkbox checked&gt;&lt;/mui-checkbox&gt;
        <br />
      </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
      <mui-v-stack slot="body" space="var(--space-200)">
        <mui-checkbox size="x-small" checked>X-Small</mui-checkbox>
        <mui-checkbox size="small" checked>Small</mui-checkbox>
        <mui-checkbox size="medium" checked>Medium</mui-checkbox>
        <mui-checkbox size="large" checked>Large</mui-checkbox>
      </mui-v-stack>
      <story-code-block slot="footer" scrollable>
        &lt;mui-checkbox size="x-small" checked&gt;X-Small&lt;/mui-checkbox&gt;<br />
        &lt;mui-checkbox size="small" checked&gt;Small&lt;/mui-checkbox&gt;<br />
        &lt;mui-checkbox size="medium" checked&gt;Medium&lt;/mui-checkbox&gt;<br />
        &lt;mui-checkbox size="large" checked&gt;Large&lt;/mui-checkbox&gt;
      </story-code-block>
      </story-card>


      <story-card id="indeterminate" title="${storyMeta["indeterminate"].title}" description="${storyMeta["indeterminate"].description}" usage="${storyMeta["indeterminate"].usage}">
      <mui-checkbox indeterminate slot="body"></mui-checkbox>
      <story-code-block slot="footer" scrollable>
        &nbsp;&nbsp;&lt;mui-checkbox indeterminate&gt;&lt;/mui-checkbox&gt;
        <br />
      </story-code-block>
      </story-card>

      <story-card id="disabled" title="${storyMeta["disabled"].title}" description="${storyMeta["disabled"].description}" usage="${storyMeta["disabled"].usage}">
      <mui-h-stack slot="body">
        <mui-checkbox disabled>Disabled</mui-checkbox>
        <mui-checkbox disabled checked>Disabled</mui-checkbox>
        <mui-checkbox disabled indeterminate>Disabled</mui-checkbox>
      </mui-h-stack>
      <story-code-block slot="footer" scrollable>
        &nbsp;&nbsp;&lt;mui-checkbox disabled&gt;Disabled&lt;/mui-checkbox&gt;<br />
        &nbsp;&nbsp;&lt;mui-checkbox disabled checked&gt;Disabled Selected&lt;/mui-checkbox&gt;<br />
        &nbsp;&nbsp;&lt;mui-checkbox disabled indeterminate&gt;Disabled Mixed&lt;/mui-checkbox&gt;
      </story-code-block>
      </story-card>

      <story-card id="usage-terms-and-conditions" title="${storyMeta["usage-terms-and-conditions"].title}" description="${storyMeta["usage-terms-and-conditions"].description}" usage="${storyMeta["usage-terms-and-conditions"].usage}">
      <mui-field id="termsField" slot="body">
        <mui-checkbox id="agreeTerms">I agree to the <mui-link href="/terms" size="small">terms and conditions</mui-link></mui-checkbox>
      </mui-field>
      <story-code-block slot="footer" scrollable>
        <mui-link size="x-small" href="/onboarding">👨‍💻 View working file</mui-link>
        <br>
        <br>


        &lt;mui-field id="termsField"&gt;<br />
        &nbsp;&nbsp;&lt;mui-checkbox id="agreeTerms"&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;I agree to the &lt;mui-link href="/terms" size="small"&gt;terms and conditions&lt;/mui-link&gt;<br />
        &nbsp;&nbsp;&lt;/mui-checkbox&gt;<br />
        &lt;/mui-field&gt;
        <br />
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

        imports='["@muibook/components/mui-checkbox"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-checkbox", storyCheckbox);
