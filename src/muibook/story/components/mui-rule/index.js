import { getComponentDocs } from "../../../utils/story-data";

class storyRule extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Rule");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Rule"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
    const attrsReference = JSON.stringify([
      {
        component: "mui-rule",
        parentAttrs: ["in-card", "in-form-section", "in-dialog", "in-drawer"],
        childAttrs: [],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-rule" title="Rule"></story-api-types>

      <story-card id="horizontal" title="${storyMeta["horizontal"].title}" description="${storyMeta["horizontal"].description}" usage="${storyMeta["horizontal"].usage}">
        <div slot="body">
          <mui-rule direction="horizontal" length="100%" style="margin: var(--space-700) 0;"></mui-rule>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-rule
          <br />
          &nbsp;&nbsp;direction="horizontal"
          <br />
          &nbsp;&nbsp;length="100%"&gt;
          <br />
          &lt;/mui-rule&gt;
        </story-code-block>
      </story-card>

      <story-card id="vertical" title="${storyMeta["vertical"].title}" description="${storyMeta["vertical"].description}" usage="${storyMeta["vertical"].usage}">
        <div slot="body">
          <mui-rule direction="vertical" length="100px"></mui-rule>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-rule
          <br />
          &nbsp;&nbsp;direction="vertical"
          <br />
          &nbsp;&nbsp;length="100px"&gt;
          <br />
          &lt;/mui-rule&gt;
        </story-code-block>
      </story-card>

      <story-card id="horizontal-custom-weight" title="${storyMeta["horizontal-custom-weight"].title}" description="${storyMeta["horizontal-custom-weight"].description}" usage="${storyMeta["horizontal-custom-weight"].usage}">
        <div slot="body">
          <mui-rule direction="horizontal" length="100%" weight="2px" style="margin: var(--space-700) 0;"></mui-rule>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-rule
          <br />
          &nbsp;&nbsp;direction="horizontal"
          <br />
          &nbsp;&nbsp;length="100%"
          <br />
          &nbsp;&nbsp;weight="2px"&gt;
          <br />
          &lt;/mui-rule&gt;
        </story-code-block>
      </story-card>

      <story-card id="vertical-custom-weight" title="${storyMeta["vertical-custom-weight"].title}" description="${storyMeta["vertical-custom-weight"].description}" usage="${storyMeta["vertical-custom-weight"].usage}">
        <div slot="body">
          <mui-rule direction="vertical" length="100px" weight="2px"></mui-rule>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-rule
          <br />
          &nbsp;&nbsp;direction="vertical"
          <br />
          &nbsp;&nbsp;length="100px"
          <br />
          &nbsp;&nbsp;weight="2px"&gt;
          <br />
          &lt;/mui-rule&gt;
        </story-code-block>
      </story-card>

      <story-card id="weight-thin-and-thick" title="${storyMeta["weight-thin-and-thick"].title}" description="${storyMeta["weight-thin-and-thick"].description}" usage="${storyMeta["weight-thin-and-thick"].usage}">
        <mui-v-stack slot="body" space="var(--space-700)">
          <mui-rule direction="horizontal" length="100%" weight="thin"></mui-rule>
          <mui-rule direction="horizontal" length="100%" weight="thick"></mui-rule>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-rule weight="thin"&gt;&lt;/mui-rule&gt;
          <br />
          &lt;mui-rule weight="thick"&gt;&lt;/mui-rule&gt;
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
        attrs-reference='${attrsReference}'

        imports='["@muibook/components/mui-rule"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-rule", storyRule);
