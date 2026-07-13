import { getComponentDocs } from "../../../utils/story-data";

class storyHeading extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Heading");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Heading"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-heading" title="Heading"></story-api-types>

      <story-card noHeader id="size-1" title="${storyMeta["size-1"].title}" description="${storyMeta["size-1"].description}" usage="${storyMeta["size-1"].usage}">
        <div slot="body">
          <mui-heading size="1">Heading 1</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="1"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader id="size-2" title="${storyMeta["size-2"].title}" description="${storyMeta["size-2"].description}" usage="${storyMeta["size-2"].usage}">
        <div slot="body">
          <mui-heading size="2">Heading 2</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="2"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader id="size-3" title="${storyMeta["size-3"].title}" description="${storyMeta["size-3"].description}" usage="${storyMeta["size-3"].usage}">
        <div slot="body">
          <mui-heading size="3">Heading 3</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="3"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader id="size-4" title="${storyMeta["size-4"].title}" description="${storyMeta["size-4"].description}" usage="${storyMeta["size-4"].usage}">
        <div slot="body">
          <mui-heading size="4">Heading 4</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="4"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader id="size-5" title="${storyMeta["size-5"].title}" description="${storyMeta["size-5"].description}" usage="${storyMeta["size-5"].usage}">
        <div slot="body">
          <mui-heading size="5">Heading 5</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="5"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader id="size-6" title="${storyMeta["size-6"].title}" description="${storyMeta["size-6"].description}" usage="${storyMeta["size-6"].usage}">
        <div slot="body">
          <mui-heading size="6">Heading 6</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="6"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card id="overflow" title="${storyMeta["overflow"].title}" description="${storyMeta["overflow"].description}" usage="${storyMeta["overflow"].usage}">
        <div slot="body">
          <mui-v-stack space="var(--space-400)" alignx="start">
            <div style="width: min(100%, 28rem); border: var(--border-thin); border-radius: var(--radius-200); padding: var(--space-300);">
              <mui-v-stack space="var(--space-100)">
                <mui-body size="small" variant="secondary">Truncate</mui-body>
                <mui-heading size="4" level="3" truncate>
                  Enterprise subscription analytics workspace overview
                </mui-heading>
              </mui-v-stack>
            </div>

            <div style="width: min(100%, 28rem); border: var(--border-thin); border-radius: var(--radius-200); padding: var(--space-300);">
              <mui-v-stack space="var(--space-100)">
                <mui-body size="small" variant="secondary">Clamp</mui-body>
                <mui-heading size="3" level="3" clamp="2">
                  Enterprise subscription analytics and lifecycle reporting workspace overview
                </mui-heading>
              </mui-v-stack>
            </div>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size=&quot;4&quot; level=&quot;3&quot; truncate&gt;
          <br>
          &nbsp;&nbsp;{long heading}
          <br>
          &lt;/mui-heading&gt;
          <br>
          <br>
          &lt;mui-heading size=&quot;3&quot; level=&quot;3&quot; clamp=&quot;2&quot;&gt;
          <br>
          &nbsp;&nbsp;{long heading}
          <br>
          &lt;/mui-heading&gt;
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

        imports='["@muibook/components/mui-heading"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-heading", storyHeading);
