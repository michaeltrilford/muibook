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

      <story-card title="Start State" description="Shows the generated start state for count-based and progress-based data.">
        <div class="canvas" slot="body">
          <mui-progress-ring value="0" max="4" display="value" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring progress="0" display="value" label="Transactions automated"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Count start. Generated: size="medium", center text shows "0/4"; tooltip defaults to "0 of 4". --&gt;<br>
          &lt;mui-progress-ring value="0" max="4" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br><br>
          &lt;!-- Progress start. Generated: size="medium", center text shows "0"; tooltip defaults to "0% complete". --&gt;<br>
          &lt;mui-progress-ring progress="0" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Progress" description="Use progress for percentage-based values.">
        <div class="canvas" slot="body">
          <mui-progress-ring size="x-small" progress="50" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="small" progress="50" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring progress="50" label="Transactions automated"></mui-progress-ring>
          <mui-progress-ring size="large" progress="50" label="Transactions automated"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Generated: default size is rendered as size="medium"; no center text; tooltip defaults to "50% complete". --&gt;<br>
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
          &lt;!-- Generated: default size is rendered as size="medium"; no center text; tooltip defaults to "2 of 4". --&gt;<br>
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
          &lt;!-- Generated: default size is rendered as size="medium"; all sizes show mui-icon-checkmark; x-small uses icon size xx-small. --&gt;<br>
          &lt;mui-progress-ring size="x-small" progress="100" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" progress="100" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring progress="100" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" progress="100" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Display" description="Center value is opt-in. The value is derived from value/max or progress.">
        <div class="canvas canvas-column" slot="body">
          <div class="canvas-row">
            <mui-progress-ring size="x-small" value="2" max="4" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="small" value="2" max="4" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring value="2" max="4" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="large" value="2" max="4" label="Transactions automated"></mui-progress-ring>
          </div>
          <div class="canvas-row">
            <mui-progress-ring size="x-small" value="2" max="4" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="small" value="2" max="4" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring value="2" max="4" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="large" value="2" max="4" display="value" label="Transactions automated"></mui-progress-ring>
          </div>
          <div class="canvas-row">
            <mui-progress-ring size="x-small" progress="50" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="small" progress="50" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring progress="50" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="large" progress="50" display="value" label="Transactions automated"></mui-progress-ring>
          </div>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Default display. Generated: default size is rendered as size="medium"; no center text; tooltip defaults to "2 of 4". --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br><br>
          &lt;!-- Value display. Generated: x-small hides center text; others show "2/4". --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="2" max="4" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="2" max="4" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="2" max="4" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="2" max="4" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br><br>
          &lt;!-- Progress value display. Generated: x-small hides center text; others show "50"; tooltip defaults to "50% complete". --&gt;<br>
          &lt;mui-progress-ring size="x-small" progress="50" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" progress="50" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring progress="50" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" progress="50" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Formatting" description="Generated center text is constrained so dense values do not crowd the ring.">
        <div class="canvas canvas-column" slot="body">
          <div class="canvas-row">
            <mui-progress-ring size="x-small" value="12" max="40" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="small" value="12" max="40" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring value="12" max="40" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="large" value="12" max="40" display="value" label="Transactions automated"></mui-progress-ring>
          </div>
          <div class="canvas-row">
            <mui-progress-ring size="x-small" progress="98.99999" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="small" progress="98.99999" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring progress="98.99999" display="value" label="Transactions automated"></mui-progress-ring>
            <mui-progress-ring size="large" progress="98.99999" display="value" label="Transactions automated"></mui-progress-ring>
          </div>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Dense fraction. Generated: x-small has no center text; small/medium/large render a compact stacked fraction. Tooltip defaults to "12 of 40". --&gt;<br>
          &lt;mui-progress-ring size="x-small" value="12" max="40" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" value="12" max="40" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring value="12" max="40" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" value="12" max="40" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br><br>
          &lt;!-- Rounded progress value. Generated: center text rounds to "99"; tooltip defaults to "99% complete". --&gt;<br>
          &lt;mui-progress-ring size="x-small" progress="98.99999" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="small" progress="98.99999" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring progress="98.99999" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring size="large" progress="98.99999" display="value" label="Transactions automated"&gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Display Value: Completed" description="Use display-value when the center text should show a custom completed count.">
        <div class="canvas" slot="body">
          <mui-progress-ring value="12" max="40" display-value="12" tooltip="12 of 40 completed" label="Transactions completed"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Generated: value/max drives progress; display-value overrides center text; tooltip clarifies the value meaning. --&gt;<br>
          &lt;mui-progress-ring<br>
          &nbsp;&nbsp;value="12"<br>
          &nbsp;&nbsp;max="40"<br>
          &nbsp;&nbsp;display-value="12"<br>
          &nbsp;&nbsp;tooltip="12 of 40 completed"<br>
          &nbsp;&nbsp;label="Transactions completed"<br>
          &gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Display Value: Remaining" description="Use display-value when the center text should show a custom remaining count.">
        <div class="canvas" slot="body">
          <mui-progress-ring value="12" max="40" display-value="28" tooltip="28 remaining" label="Transactions remaining"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Generated: value/max still drives progress; display-value can show a derived remaining count. --&gt;<br>
          &lt;mui-progress-ring<br>
          &nbsp;&nbsp;value="12"<br>
          &nbsp;&nbsp;max="40"<br>
          &nbsp;&nbsp;display-value="28"<br>
          &nbsp;&nbsp;tooltip="28 remaining"<br>
          &nbsp;&nbsp;label="Transactions remaining"<br>
          &gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Display Value: Hours" description="Use display-value for short time values while progress still drives the ring.">
        <div class="canvas" slot="body">
          <mui-progress-ring progress="72" display-value="3d" tooltip="3 days remaining" label="SLA remaining"></mui-progress-ring>
          <mui-progress-ring value="18" max="24" display-value="6h" tooltip="6 hours remaining" label="Daily window remaining"></mui-progress-ring>
          <mui-progress-ring progress="99" display-value="1m" color="attention" tooltip="1 minute remaining" label="Deadline remaining"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Generated: progress drives the ring; display-value shows a compact time value; tooltip explains the time unit. --&gt;<br>
          &lt;mui-progress-ring<br>
          &nbsp;&nbsp;progress="72"<br>
          &nbsp;&nbsp;display-value="3d"<br>
          &nbsp;&nbsp;tooltip="3 days remaining"<br>
          &nbsp;&nbsp;label="SLA remaining"<br>
          &gt;&lt;/mui-progress-ring&gt;<br><br>
          &lt;!-- Generated: value/max drives progress; display-value can show a derived remaining duration. --&gt;<br>
          &lt;mui-progress-ring<br>
          &nbsp;&nbsp;value="18"<br>
          &nbsp;&nbsp;max="24"<br>
          &nbsp;&nbsp;display-value="6h"<br>
          &nbsp;&nbsp;tooltip="6 hours remaining"<br>
          &nbsp;&nbsp;label="Daily window remaining"<br>
          &gt;&lt;/mui-progress-ring&gt;<br><br>
          &lt;!-- Use semantic color when the time value communicates urgency. --&gt;<br>
          &lt;mui-progress-ring<br>
          &nbsp;&nbsp;progress="99"<br>
          &nbsp;&nbsp;display-value="1m"<br>
          &nbsp;&nbsp;color="attention"<br>
          &nbsp;&nbsp;tooltip="1 minute remaining"<br>
          &nbsp;&nbsp;label="Deadline remaining"<br>
          &gt;&lt;/mui-progress-ring&gt;
        </story-code-block>
      </story-card>

      <story-card title="Display Value: Grade" description="Use color for score bands while center text keeps the default text color.">
        <div class="canvas" slot="body">
          <mui-progress-ring progress="86" display-value="B+" color="positive" tooltip="B+ grade, 86 score" label="Grade B plus"></mui-progress-ring>
          <mui-progress-ring progress="68" display-value="C-" color="warning" tooltip="C- grade, 68 score" label="Grade C minus"></mui-progress-ring>
          <mui-progress-ring progress="44" display-value="D-" color="attention" tooltip="D- grade, 44 score" label="Grade D minus"></mui-progress-ring>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Generated: progress drives the ring; display-value shows the grade; color applies to the indicator only. --&gt;<br>
          &lt;mui-progress-ring progress="86" display-value="B+" color="positive" tooltip="B+ grade, 86 score" label="Grade B plus"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring progress="68" display-value="C-" color="warning" tooltip="C- grade, 68 score" label="Grade C minus"&gt;&lt;/mui-progress-ring&gt;<br>
          &lt;mui-progress-ring progress="44" display-value="D-" color="attention" tooltip="D- grade, 44 score" label="Grade D minus"&gt;&lt;/mui-progress-ring&gt;
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
