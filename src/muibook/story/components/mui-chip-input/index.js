import { getComponentDocs } from "../../../utils/story-data";

class storyChipInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ChipInput");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "id",
        type: "string",
        options: "{text}",
        default: "",
        description: "Identifier linked with label and input.",
      },
      {
        name: "label",
        type: "string",
        options: "{text}",
        default: "",
        description: "Visible and accessible field label.",
      },
      {
        name: "hide-label",
        type: "boolean",
        options: "hide-label",
        default: "",
        description: "Visually hides the label while preserving accessibility.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Matches chip/input sizing scale.",
      },
      {
        name: "placement",
        type: "string",
        options: "before, after",
        default: "before",
        description: "Places selected chips before or after the text input.",
      },
      {
        name: "mobile-stack",
        type: "boolean",
        options: "mobile-stack",
        default: "",
        description: "Stacks slot content on mobile-width containers.",
      },
      {
        name: "breakpoint",
        type: "number",
        options: "{px value}",
        default: "",
        description: "Applies stacked slot layout at and below this viewport width.",
      },
      {
        name: "placeholder",
        type: "string",
        options: "{text}",
        default: "Type to add",
        description: "Placeholder text shown in the text input.",
      },
      {
        name: "options",
        type: "string",
        options: "JSON array of strings/objects or comma-separated text",
        default: "[]",
        description: "Available suggestions for selection. Object form supports extra metadata.",
      },
      {
        name: "value",
        type: "string",
        options: "JSON array of strings/objects or comma-separated text",
        default: "[]",
        description: "Selected values. Object form is preserved in chip-input-change payload.",
      },
      {
        name: "allow-custom",
        type: "boolean",
        options: "allow-custom",
        default: "",
        description: "Allows creating values not present in options.",
      },
      {
        name: "name",
        type: "string",
        options: "{text}",
        default: "",
        description: "Form field name for hidden submitted values.",
      },
      {
        name: "disabled",
        type: "boolean",
        options: "disabled",
        default: "",
        description: "Disables input and chip interaction.",
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
        `,
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";

        return /*html*/ `
            <mui-accordion-block
              style="position: relative; z-index: 1;"
              size="medium"
              heading=${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}
              ${isLastChild}>
              <story-type-slat
                slot="detail"
                name="${prop.name}"
                type="${prop.type}" 
                options="${prop.options || ""}"
                default="${prop.default || ""}"
                description="${prop.description}">
              </story-type-slat>
            </mui-accordion-block>
          `;
      })
      .join("");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-chip-input";<br>
        </mui-code>
      </spec-card>

      <props-card title="Chip Input">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card title="Default">
        <div slot="body">
          <mui-chip-input
            label="Tags"
            placeholder="Type and select"
            options='["Video","Image","Audio","Docs","Tutorial"]'
            value='["Image","Docs"]'
          ></mui-chip-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input
          <br />
          &nbsp;&nbsp;label="Tags"
          <br />
          &nbsp;&nbsp;placeholder="Type and select"
          <br />
          &nbsp;&nbsp;options='["Video","Image","Audio","Docs","Tutorial"]'
          <br />
          &nbsp;&nbsp;value='["Image","Docs"]'
          <br />
          &gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Allow Custom">
        <div slot="body">
          <mui-chip-input
            label="Topics"
            placeholder="Type then press enter"
            options='["Design","Accessibility","Performance"]'
            allow-custom
          ></mui-chip-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input
          <br />
          &nbsp;&nbsp;label="Topics"
          <br />
          &nbsp;&nbsp;placeholder="Type then press enter"
          <br />
          &nbsp;&nbsp;options='["Design","Accessibility","Performance"]'
          <br />
          &nbsp;&nbsp;allow-custom
          <br />
          &gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Breakpoint Layout">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-chip-input
            label="Before @ 900"
            breakpoint="900"
            options='["Video","Image","Audio","Docs","Tutorial"]'
            value='["Image","Docs","Audio"]'
          ></mui-chip-input>
          <mui-chip-input
            label="After @ 900"
            placement="after"
            breakpoint="900"
            options='["Video","Image","Audio","Docs","Tutorial"]'
            value='["Image","Docs","Audio"]'
          ></mui-chip-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input label="Before @ 900" breakpoint="900" ...&gt;&lt;/mui-chip-input&gt;<br />
          &lt;mui-chip-input label="After @ 900" placement="after" breakpoint="900" ...&gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Object Data">
        <div slot="body">
          <mui-chip-input
            label="Assets"
            options='[
              {"value":"vid_1","label":"Video","type":"media"},
              {"value":"img_1","label":"Image","type":"media"},
              {"value":"doc_1","label":"Docs","type":"resource"}
            ]'
            value='[
              {"value":"img_1","label":"Image","type":"media"},
              {"value":"doc_1","label":"Docs","type":"resource"}
            ]'
          ></mui-chip-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input label="Assets" options='[{...}]' value='[{...}]'&gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Sizes">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-chip-input size="x-small" label="X-Small" options='["Alpha","Beta","Gamma"]' value='["Alpha"]'></mui-chip-input>
          <mui-chip-input size="small" label="Small" options='["Alpha","Beta","Gamma"]' value='["Beta"]'></mui-chip-input>
          <mui-chip-input size="medium" label="Medium" options='["Alpha","Beta","Gamma"]' value='["Gamma"]'></mui-chip-input>
          <mui-chip-input size="large" label="Large" options='["Alpha","Beta","Gamma"]'></mui-chip-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input size="x-small" label="X-Small" options='["Alpha","Beta","Gamma"]' value='["Alpha"]'&gt;&lt;/mui-chip-input&gt;<br />
          &lt;mui-chip-input size="small" label="Small" options='["Alpha","Beta","Gamma"]' value='["Beta"]'&gt;&lt;/mui-chip-input&gt;<br />
          &lt;mui-chip-input size="medium" label="Medium" options='["Alpha","Beta","Gamma"]' value='["Gamma"]'&gt;&lt;/mui-chip-input&gt;<br />
          &lt;mui-chip-input size="large" label="Large" options='["Alpha","Beta","Gamma"]'&gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Disabled">
        <div slot="body">
          <mui-chip-input
            label="Disabled"
            options='["One","Two","Three"]'
            value='["One","Two"]'
            disabled
          ></mui-chip-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input label="Disabled" options='["One","Two","Three"]' value='["One","Two"]' disabled&gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data?.title || "Chip Input"}"
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

customElements.define("story-chip-input", storyChipInput);
