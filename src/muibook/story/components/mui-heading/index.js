import { getComponentDocs } from "../../../utils/story-data";

class storyHeading extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Heading");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-heading" title="Heading"></story-api-types>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="1">Heading 1</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="1"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="2">Heading 2</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="2"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="3">Heading 3</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="3"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="4">Heading 4</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="4"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="5">Heading 5</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="5"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="6">Heading 6</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="6"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card title="Overflow" description="Use truncate for one-line heading overflow and clamp for bounded multi-line headings.">
        <div slot="body">
          <mui-v-stack space="var(--space-400)" alignx="start">
            <div style="width: min(100%, 28rem); border: var(--border-thin); border-radius: var(--radius-200); padding: var(--space-300);">
              <mui-v-stack space="var(--space-100)">
                <mui-body size="small" variant="optional">Truncate</mui-body>
                <mui-heading size="4" level="3" truncate>
                  Enterprise subscription analytics workspace overview
                </mui-heading>
              </mui-v-stack>
            </div>

            <div style="width: min(100%, 28rem); border: var(--border-thin); border-radius: var(--radius-200); padding: var(--space-300);">
              <mui-v-stack space="var(--space-100)">
                <mui-body size="small" variant="optional">Clamp</mui-body>
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
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-heading", storyHeading);
