import { getComponentDocs } from "../../../utils/story-data";

class StoryHint extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Hint");

    const stories = /*html*/ `
      <story-api-types tag="mui-hint" title="Hint"></story-api-types>

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

      <story-card id="delay" title="Delay">
        <mui-v-stack slot="body" space="var(--space-200)" style="padding: var(--space-400);">
          <mui-hint placement="top">
            <mui-icon-info slot="trigger" color="default" size="small"></mui-icon-info>
            Default delay (500ms, clamped to 250-2000ms)
          </mui-hint>
          <mui-hint placement="right" delay="2000" initial-delay="2000">
            <mui-icon-warning slot="trigger" color="default" size="small"></mui-icon-warning>
            Long delay (2000ms)
          </mui-hint>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-hint delay="500" initial-delay="500"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-info slot="trigger" size="small"&gt;&lt;/mui-icon-info&gt;
          <br />
          &nbsp;&nbsp;Tooltip content
          <br />
          &lt;/mui-hint&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="disable-on-touch"
        title="Disable On Touch"
        description="Disables hint behaviour on coarse pointer devices."
        usage="Use this when the hint is a desktop enhancement and the trigger already communicates its action.|||This avoids persistent tooltip states on touch devices, while preserving hover and keyboard hint behaviour on desktop.">
        <mui-v-stack slot="body" space="var(--space-200)" style="padding: var(--space-400);">
          <mui-hint placement="top" disable-on-touch>
            <mui-button slot="trigger" size="small" icon-only variant="tertiary" aria-label="Download">
              <mui-icon-down-arrow-circle size="small"></mui-icon-down-arrow-circle>
            </mui-button>
            Download
          </mui-hint>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-hint placement="top" disable-on-touch&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="trigger" size="small" icon-only variant="tertiary" aria-label="Download"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-down-arrow-circle size="small"&gt;&lt;/mui-icon-down-arrow-circle&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;Download
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

        imports='["@muibook/components/mui-hint"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||placements::Placements|||delay::Delay|||disable-on-touch::Disable On Touch"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-hint", StoryHint);
