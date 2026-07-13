import { getComponentDocs } from "../../../utils/story-data";

class storySwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Switch");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Switch"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-switch" title="Switch" open></story-api-types>


        <story-card id="unchecked" title="${storyMeta["unchecked"].title}" description="${storyMeta["unchecked"].description}" usage="${storyMeta["unchecked"].usage}">
          <div slot="body">
            <mui-switch label="Unchecked"></mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch label="Unchecked"&gt;&lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card id="checked" title="${storyMeta["checked"].title}" description="${storyMeta["checked"].description}" usage="${storyMeta["checked"].usage}">
          <div slot="body">
            <mui-switch label="On Example" checked></mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch checked label="On Example"&gt;&lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
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

        <story-card id="disabled-with-unchecked" title="${storyMeta["disabled-with-unchecked"].title}" description="${storyMeta["disabled-with-unchecked"].description}" usage="${storyMeta["disabled-with-unchecked"].usage}">
          <div slot="body">
            <mui-switch label="Unchecked w/ Disabled" disabled></mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch label="Unchecked w/ Disabled"&gt;&lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card id="disabled-with-checked" title="${storyMeta["disabled-with-checked"].title}" description="${storyMeta["disabled-with-checked"].description}" usage="${storyMeta["disabled-with-checked"].usage}">
          <div slot="body">
            <mui-switch disabled label="Checked w/ Disabled" checked></mui-switch>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-switch checked disabled label="Checked w/ Disabled"&gt;&lt;/mui-switch&gt;
          </story-code-block>
        </story-card>

        <story-card id="icons-off" title="${storyMeta["icons-off"].title}" description="${storyMeta["icons-off"].description}" usage="${storyMeta["icons-off"].usage}">
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

        <story-card id="icons-on" title="${storyMeta["icons-on"].title}" description="${storyMeta["icons-on"].description}" usage="${storyMeta["icons-on"].usage}">
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
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-switch", storySwitch);
