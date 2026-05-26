import { getComponentDocs } from "../../../utils/story-data";

class storySwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Switch");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-switch" title="Switch" open></story-api-types>


        <story-card title="Unchecked"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="Unchecked"></mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch label="Unchecked"&gt;&lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card title="Checked"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="On Example" checked></mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch checked label="On Example"&gt;&lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card title="Sizes"
          description="Explore x-small, small, medium, and large switch sizes."
          usageLink="https://guides.muibook.com/switch"
        >
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-h-stack space="var(--space-300)" alignY="center">
              <mui-switch label="X-Small" size="x-small"></mui-switch>
              <mui-switch label="Small" size="small"></mui-switch>
              <mui-switch label="Medium" size="medium"></mui-switch>
              <mui-switch label="Large" size="large"></mui-switch>
            </mui-h-stack>
            <mui-h-stack space="var(--space-300)" alignY="center">
              <mui-switch label="X-Small Icons" size="x-small">
                <mui-icon-sun slot="off-icon"></mui-icon-sun>
                <mui-icon-moon slot="on-icon"></mui-icon-moon>
              </mui-switch>
              <mui-switch label="Small Icons" size="small">
                <mui-icon-sun slot="off-icon"></mui-icon-sun>
                <mui-icon-moon slot="on-icon"></mui-icon-moon>
              </mui-switch>
              <mui-switch label="Medium Icons" size="medium">
                <mui-icon-sun slot="off-icon"></mui-icon-sun>
                <mui-icon-moon slot="on-icon"></mui-icon-moon>
              </mui-switch>
              <mui-switch label="Large Icons" size="large">
                <mui-icon-sun slot="off-icon"></mui-icon-sun>
                <mui-icon-moon slot="on-icon"></mui-icon-moon>
              </mui-switch>
            </mui-h-stack>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch label="X-Small" size="x-small"&gt;&lt;/mui-switch&gt;<br />
            &lt;mui-switch label="Small" size="small"&gt;&lt;/mui-switch&gt;<br />
            &lt;mui-switch label="Medium" size="medium"&gt;&lt;/mui-switch&gt;<br />
            &lt;mui-switch label="Large" size="large"&gt;&lt;/mui-switch&gt;<br />
            <br />
            &lt;mui-switch label="Medium Icons" size="medium"&gt;<br />
            &nbsp;&nbsp;&lt;mui-icon-sun slot="off-icon"&gt;&lt;/mui-icon-sun&gt;<br />
            &nbsp;&nbsp;&lt;mui-icon-moon slot="on-icon"&gt;&lt;/mui-icon-moon&gt;<br />
            &lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card title="Disabled w/ Unchecked"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="Unchecked w/ Disabled" disabled></mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch label="Unchecked w/ Disabled"&gt;&lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card title="Disabled w/ Checked"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch disabled label="Checked w/ Disabled" checked></mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch checked disabled label="Checked w/ Disabled"&gt;&lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card title="Icons: Off"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="Dark mode toggle">
              <mui-icon-sun slot="off-icon"></mui-icon-sun>
              <mui-icon-moon slot="on-icon"></mui-icon-moon>
            </mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch label="Dark mode toggle"&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-icon-sun slot="off-icon"&gt;&lt;/mui-icon-sun&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-icon-moon slot="on-icon"&gt;&lt;/mui-icon-moon&gt;
              <br />
            &lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card title="Icons: On"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="Dark mode toggle" checked>
              <mui-icon-sun slot="off-icon"></mui-icon-sun>
              <mui-icon-moon slot="on-icon"></mui-icon-moon>
            </mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch label="Dark mode toggle" checked&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-icon-sun slot="off-icon"&gt;&lt;/mui-icon-sun&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-icon-moon slot="on-icon"&gt;&lt;/mui-icon-moon&gt;
              <br />
            &lt;/mui-switch&gt;
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
      
        imports='["@muibook/components/mui-switch"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-switch", storySwitch);
