import { getComponentDocs } from "../../../utils/story-data";

class storyAddon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("AddOn");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-addon" title="Add On"></story-api-types>

        <story-card title="Text"
          description="Use for units, currency, or short static labels"
          usageLink="https://guides.muibook.com/add-on"
        >
          <div slot="body">
            <mui-input label="Enter amount">
              <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
            </mui-input>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-input label="Enter amount"&gt;
            <br />

            &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-addon&gt;
            <br />

            &lt;/mui-input&gt;
            <br />
          </story-code-block>
        </story-card>

        <story-card title="Icon"
          description="Use for symbolic cues or clarification of the input’s intent"
          usageLink="${data.guides}"
        >
          <div slot="body">
            <mui-input label="Enter your date">
              <mui-addon slot="after">
                <mui-hint placement="top">
                  <mui-icon-info slot="trigger" size="small"></mui-icon-info>
                  Date format: DD/MM/YYYY
                </mui-hint>
              </mui-addon>
            </mui-input>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-input label="Enter your date"&gt;
            <br />

            &nbsp;&nbsp;&lt;mui-addon slot="after"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-hint placement="top"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-info slot="trigger" size="small"&gt;&lt;/mui-icon-info&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date format: DD/MM/YYYY
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-hint&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-addon&gt;
            <br />

            &lt;/mui-input&gt;
            <br />
          </story-code-block>
        </story-card>

        <story-card title="Input Sizes"
          description="Add On across large, medium, small, and x-small input sizes."
          usageLink="${data.guides}"
        >
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-input label="Large" size="large">
              <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
            </mui-input>
            <mui-input label="Medium" size="medium">
              <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
            </mui-input>
            <mui-input label="Small" size="small">
              <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
            </mui-input>
            <mui-input label="X-Small" size="x-small">
              <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
            </mui-input>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-input label="Large" size="large"&gt;<br />
            &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;&lt;mui-body&gt;USD&lt;/mui-body&gt;&lt;/mui-addon&gt;<br />
            &lt;/mui-input&gt;<br />
            <br />
            &lt;mui-input label="Medium" size="medium"&gt;<br />
            &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;&lt;mui-body&gt;USD&lt;/mui-body&gt;&lt;/mui-addon&gt;<br />
            &lt;/mui-input&gt;<br />
            <br />
            &lt;mui-input label="Small" size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;&lt;mui-body&gt;USD&lt;/mui-body&gt;&lt;/mui-addon&gt;<br />
            &lt;/mui-input&gt;<br />
            <br />
            &lt;mui-input label="X-Small" size="x-small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;&lt;mui-body&gt;USD&lt;/mui-body&gt;&lt;/mui-addon&gt;<br />
            &lt;/mui-input&gt;
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

        imports='["@muibook/components/mui-addon"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-addon", storyAddon);
