import { getComponentDocs } from "../../../utils/story-data";

class StoryRangeInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("RangeInput");

    const propItems = [
      { name: "min", type: "number", options: "", default: "0", description: "Minimum value." },
      { name: "max", type: "number", options: "", default: "100", description: "Maximum value." },
      { name: "value", type: "number", options: "", default: "0", description: "Current value." },
      { name: "step", type: "number", options: "", default: "1", description: "Increment step." },
      { name: "disabled", type: "boolean", options: "", default: "false", description: "Disables interaction." },
      { name: "bubble", type: "boolean", options: "", default: "false", description: "Shows hover/drag bubble." },
      { name: "bubble-format", type: "string", options: "number, time", default: "number", description: "Bubble formatter." },
      { name: "label", type: "string", options: "", default: "Range input", description: "Accessible label." },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            name="${prop.name}"
            type="${prop.type}"
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `,
      )
      .join("");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-range-input";<br>
        </mui-code>
      </spec-card>

      <props-card title="Range Input">
        <story-type-table slot="body">
          ${rows}
        </story-type-table>
      </props-card>

      <story-card id="default" title="Default" description="Basic numeric range input.">
        <mui-range-input slot="body" min="0" max="100" value="40" step="1" label="Volume"></mui-range-input>
        <story-code-block slot="footer" scrollable>
          &lt;mui-range-input min="0" max="100" value="40" step="1" label="Volume"&gt;&lt;/mui-range-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="bubble" title="Bubble + Time Format" description="Shows formatted bubble for scrubber usage.">
        <mui-range-input slot="body" min="0" max="320" value="74" step="1" bubble bubble-format="time" label="Seek"></mui-range-input>
        <story-code-block slot="footer" scrollable>
          &lt;mui-range-input min="0" max="320" value="74" bubble bubble-format="time" label="Seek"&gt;&lt;/mui-range-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="disabled" title="Disabled" description="Disabled state for read-only displays.">
        <mui-range-input slot="body" min="0" max="100" value="25" disabled label="Disabled range"></mui-range-input>
        <story-code-block slot="footer" scrollable>
          &lt;mui-range-input min="0" max="100" value="25" disabled label="Disabled range"&gt;&lt;/mui-range-input&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; }
      </style>
      <story-template
        title="${data?.title || "Range Input"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||bubble::Bubble + Time Format|||disabled::Disabled"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-range-input", StoryRangeInput);
