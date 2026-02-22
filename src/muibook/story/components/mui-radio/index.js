import { getComponentDocs } from "../../../utils/story-data";

class storyRadio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Radio");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "value",
        type: "string",
        options: "{text}",
        default: "",
        description: "Value returned when radio is selected.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Controls radio control and label scale.",
      },
      {
        name: "checked",
        type: "boolean",
        options: "checked",
        default: "",
        description: "Sets the radio as selected.",
      },
      {
        name: "disabled",
        type: "boolean",
        options: "disabled",
        default: "",
        description: "Disables interaction.",
      },
      {
        name: "slot",
        type: "slot (default)",
        options: "{text}",
        default: "",
        description: "Visible radio label content.",
      },
    ];

    const groupPropItems = [
      {
        name: "name",
        type: "string",
        options: "{text}",
        default: "(auto-generated)",
        description: "Shared radio name for grouping.",
      },
      {
        name: "value",
        type: "string",
        options: "{text}",
        default: "",
        description: "Currently selected radio value.",
      },
      {
        name: "disabled",
        type: "boolean",
        options: "disabled",
        default: "",
        description: "Disables all radios in the group.",
      },
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
        `
      )
      .join("");

    const groupRows = groupPropItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            name="${prop.name}"
            type="${prop.type}" 
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `
      )
      .join("");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-radio";<br>
          import "@muibook/components/mui-radio-group";
        </mui-code>
      </spec-card>

      <props-card title="Radio">
        <mui-v-stack slot="body" space="var(--space-200)">
          <story-type-table>
            ${rows}
          </story-type-table>
        </mui-v-stack>
      </props-card>

      <props-card title="Radio Group">
        <mui-v-stack slot="body" space="var(--space-200)">
          <story-type-table>
            ${groupRows}
          </story-type-table>
        </mui-v-stack>
      </props-card>

      <story-card title="Default">
        <mui-radio slot="body">Option</mui-radio>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio&gt;Option&lt;/mui-radio&gt;
        </story-code-block>
      </story-card>

      <story-card title="Checked">
        <mui-radio checked slot="body">Option</mui-radio>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio checked&gt;Option&lt;/mui-radio&gt;
        </story-code-block>
      </story-card>

      <story-card title="Sizes">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-radio size="x-small" checked>X-Small</mui-radio>
          <mui-radio size="small" checked>Small</mui-radio>
          <mui-radio size="medium" checked>Medium</mui-radio>
          <mui-radio size="large" checked>Large</mui-radio>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio size="x-small" checked&gt;X-Small&lt;/mui-radio&gt;<br />
          &lt;mui-radio size="small" checked&gt;Small&lt;/mui-radio&gt;<br />
          &lt;mui-radio size="medium" checked&gt;Medium&lt;/mui-radio&gt;<br />
          &lt;mui-radio size="large" checked&gt;Large&lt;/mui-radio&gt;
        </story-code-block>
      </story-card>

      <story-card title="Disabled">
        <mui-h-stack slot="body" space="var(--space-300)">
          <mui-radio disabled>Disabled</mui-radio>
          <mui-radio disabled checked>Disabled Selected</mui-radio>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio disabled&gt;Disabled&lt;/mui-radio&gt;<br />
          &lt;mui-radio disabled checked&gt;Disabled Selected&lt;/mui-radio&gt;
        </story-code-block>
      </story-card>

      <story-card title="Radio Group">
        <mui-radio-group slot="body" value="pro">
          <mui-radio value="starter">Starter</mui-radio>
          <mui-radio value="pro">Pro</mui-radio>
          <mui-radio value="enterprise">Enterprise</mui-radio>
        </mui-radio-group>
        <story-code-block slot="footer" scrollable>
          &lt;mui-radio-group value="pro"&gt;<br />
          &nbsp;&nbsp;&lt;mui-radio value="starter"&gt;Starter&lt;/mui-radio&gt;<br />
          &nbsp;&nbsp;&lt;mui-radio value="pro"&gt;Pro&lt;/mui-radio&gt;<br />
          &nbsp;&nbsp;&lt;mui-radio value="enterprise"&gt;Enterprise&lt;/mui-radio&gt;<br />
          &lt;/mui-radio-group&gt;
        </story-code-block>
      </story-card>

      <story-card title="Checkbox + Radio (Side By Side)">
        <mui-h-stack slot="body" space="var(--space-400)" alignY="center">
          <mui-checkbox checked>Checkbox</mui-checkbox>
          <mui-radio checked>Radio</mui-radio>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-h-stack space="var(--space-400)" alignY="center"&gt;<br />
          &nbsp;&nbsp;&lt;mui-checkbox checked&gt;Checkbox&lt;/mui-checkbox&gt;<br />
          &nbsp;&nbsp;&lt;mui-radio checked&gt;Radio&lt;/mui-radio&gt;<br />
          &lt;/mui-h-stack&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template
        title="${data?.title || "Radio"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-radio", storyRadio);
