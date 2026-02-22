import { getComponentDocs } from "../../../utils/story-data";

class StoryHint extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Hint");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-hint";<br>
        </mui-code>
      </spec-card>

      <story-card id="default" title="Default">
        <mui-v-stack slot="body" space="var(--space-200)" style="padding: var(--space-400);">
          <mui-hint>
            <mui-icon-info slot="trigger" color="default" size="small"></mui-icon-info>
            Default tooltip content
          </mui-hint>
          <mui-hint placement="right">
            <mui-icon-warning slot="trigger" color="default" size="small"></mui-icon-warning>
            Warning tooltip content
          </mui-hint>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-hint&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-info slot="trigger" size="small"&gt;&lt;/mui-icon-info&gt;
          <br />
          &nbsp;&nbsp;Default tooltip content
          <br />
          &lt;/mui-hint&gt;
        </story-code-block>
      </story-card>

      <story-card id="placements" title="Placements">
        <mui-v-stack slot="body" space="var(--space-200)" style="padding: var(--space-400);">
          <mui-hint placement="top">
            <mui-icon-info slot="trigger" color="default" size="small"></mui-icon-info>
            Top placement
          </mui-hint>
          <mui-hint placement="bottom">
            <mui-icon-info slot="trigger" color="default" size="small"></mui-icon-info>
            Bottom placement
          </mui-hint>
          <mui-hint placement="left">
            <mui-icon-info slot="trigger" color="default" size="small"></mui-icon-info>
            Left placement
          </mui-hint>
          <mui-hint placement="right">
            <mui-icon-info slot="trigger" color="default" size="small"></mui-icon-info>
            Right placement
          </mui-hint>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-hint placement="top"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-info slot="trigger" size="small"&gt;&lt;/mui-icon-info&gt;
          <br />
          &nbsp;&nbsp;Top placement
          <br />
          &lt;/mui-hint&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Hint"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||placements::Placements"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-hint", StoryHint);
