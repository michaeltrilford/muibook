import { getComponentDocs } from "../../../utils/story-data";

class StoryProgressRing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ProgressRing");

    const styles = /*css*/ `
      :host { display: block; }

      .canvas {
        background: var(--surface-elevated-100);
        display: flex;
        align-items: center;
        gap: var(--space-500);
        flex-wrap: wrap;
        padding: var(--space-600);
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }
      .canvas-column {
        align-items: flex-start;
        flex-direction: column;
      }
      .canvas-row {
        display: flex;
        align-items: center;
        gap: var(--space-500);
        flex-wrap: wrap;
      }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-progress-ring" title="Progress Ring"></story-api-types>

      <story-card title="Default" description="Plain progress stays visually quiet by default.">
        <div class="canvas" slot="body">
          <mui-progress-ring size="x-small" progress="50" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="small" progress="50" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring progress="50" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="large" progress="50" label="Transactions automated"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Generated: no center text; tooltip defaults to "50% complete". --&gt;<br>
          &lt;mui-progress-ring size="x-small" progress="50" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" progress="50" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring progress="50" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" progress="50" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Value and Max" description="Use value and max when progress is based on completed items.">
        <div class="canvas" slot="body">
          <mui-progress-ring size="x-small" value="2" max="4" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="small" value="2" max="4" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring value="2" max="4" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="large" value="2" max="4" label="Transactions automated"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Generated: x-small has no center text; small/medium/large show "2/4"; tooltip defaults to "2 of 4". --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Complete" description="Progress at 100 renders a completion icon automatically.">
        <div class="canvas" slot="body">
          <mui-progress-ring size="x-small" progress="100" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="small" progress="100" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring progress="100" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="large" progress="100" label="Transactions automated"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Generated: all sizes show mui-icon-checkmark; x-small uses icon size xx-small. --&gt;<br>
          &lt;mui-progress-ring size="x-small" progress="100" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" progress="100" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring progress="100" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" progress="100" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Display">
        <div class="canvas canvas-column" slot="body">
          <div class="canvas-row">
            <mui-progress-ring size="x-small" value="2" max="4" display="fraction" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="small" value="2" max="4" display="fraction" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring value="2" max="4" display="fraction" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="large" value="2" max="4" display="fraction" label="Transactions automated"></mui-progress-ring>
          </div>
          <div class="canvas-row">
            <mui-progress-ring size="x-small" value="2" max="4" display="percent" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="small" value="2" max="4" display="percent" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring value="2" max="4" display="percent" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="large" value="2" max="4" display="percent" label="Transactions automated"></mui-progress-ring>
          </div>
          <div class="canvas-row">
            <mui-progress-ring size="x-small" value="2" max="4" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="small" value="2" max="4" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring value="2" max="4" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="large" value="2" max="4" display="value" label="Transactions automated"></mui-progress-ring>
          </div>
          <div class="canvas-row">
            <mui-progress-ring size="x-small" value="2" max="4" display="none" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="small" value="2" max="4" display="none" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring value="2" max="4" display="none" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="large" value="2" max="4" display="none" label="Transactions automated"></mui-progress-ring>
          </div>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Fraction display. Generated: x-small still hides center text; others show "2/4". --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" display="fraction" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" display="fraction" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" display="fraction" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" display="fraction" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br><br>
          &lt;!-- Percent display. Generated: x-small hides center text; others show "50" with no % character. --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" display="percent" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" display="percent" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" display="percent" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" display="percent" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br><br>
          &lt;!-- Value display. Generated: x-small hides center text; others show "2". --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br><br>
          &lt;!-- None display. Generated: no center text at any size. --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" display="none" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" display="none" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" display="none" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" display="none" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Sizes">
        <div class="canvas" slot="body">
          <mui-progress-ring size="x-small" value="2" max="4" display="percent" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="small" value="2" max="4" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring value="2" max="4" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="large" value="2" max="4" label="Transactions automated"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Generated: x-small hides center text; small/medium/large show "2/4". --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" display="percent" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Tooltip: Hover" description="Add tooltip text when the visible value needs extra context.">
        <div class="canvas" slot="body">
          <mui-progress-ring size="x-small" value="2" max="4" tooltip="2 of 4 transactions automated" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="small" value="2" max="4" tooltip="2 of 4 transactions automated" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring value="2" max="4" tooltip="2 of 4 transactions automated" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="large" value="2" max="4" tooltip="2 of 4 transactions automated" label="Transactions automated"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Explicit tooltip overrides the generated "2 of 4" tooltip text. --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" tooltip="2 of 4 transactions automated" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" tooltip="2 of 4 transactions automated" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" tooltip="2 of 4 transactions automated" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" tooltip="2 of 4 transactions automated" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Tooltip: Click" description="Use click when the tooltip should be an explicit disclosure.">
        <div class="canvas" slot="body">
          <mui-progress-ring
            size="x-small"
            value="2"
            max="4"
            tooltip="2 of 4 transactions automated"
            tooltip-trigger="click"
            tooltip-placement="bottom"
            label="Transactions automated"
          ></mui-progress-ring>
          <mui-progress-ring
            size="small"
            value="2"
            max="4"
            tooltip="2 of 4 transactions automated"
            tooltip-trigger="click"
            tooltip-placement="bottom"
            label="Transactions automated"
          ></mui-progress-ring>
          <mui-progress-ring
            value="2"
            max="4"
            tooltip="2 of 4 transactions automated"
            tooltip-trigger="click"
            tooltip-placement="bottom"
            label="Transactions automated"
          ></mui-progress-ring>
          <mui-progress-ring
            size="large"
            value="2"
            max="4"
            tooltip="2 of 4 transactions automated"
            tooltip-trigger="click"
            tooltip-placement="bottom"
            label="Transactions automated"
          ></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Click tooltip: same generated ring content, explicit tooltip text, bottom placement. --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" tooltip="2 of 4 transactions automated" tooltip-trigger="click" tooltip-placement="bottom" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" tooltip="2 of 4 transactions automated" tooltip-trigger="click" tooltip-placement="bottom" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" tooltip="2 of 4 transactions automated" tooltip-trigger="click" tooltip-placement="bottom" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" tooltip="2 of 4 transactions automated" tooltip-trigger="click" tooltip-placement="bottom" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
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
      
        imports='["@muibook/components/mui-progress-ring"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-progress-ring", StoryProgressRing);
