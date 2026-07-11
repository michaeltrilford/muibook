import { getComponentDocs } from "../../../utils/story-data";

class storyRule extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Rule");
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

      <story-card title="Horizontal">
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

      <story-card title="Vertical">
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

      <story-card title="Horizontal: Custom Weight">
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

      <story-card title="Vertical: Custom Weight">
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

      <story-card title="Weight: Thin and Thick">
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
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-rule", storyRule);
