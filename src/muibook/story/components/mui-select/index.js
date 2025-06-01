class storySelect extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "options",
        required: true,
        type: "array",
        options: "[{...}]",
        default: "",
        description:
          "A JSON-encoded string representing the options for the select dropdown. Each option has a value and label.",
      },
      {
        name: "id",
        type: "string",
        options: "{text}",
        default: "",
        description:
          "Identifier to group the label and input to allow user to focus on the input by clicking the label.",
      },
      {
        name: "label",
        required: true,
        type: "string",
        options: "{text}",
        default: "",
        description:
          "Provide the input with a unique label. If without, a console warning will remind you to add label.",
      },
      {
        name: "hide-label",
        type: "boolean",
        options: "hide-label",
        default: "",
        description: "Ensures the label is accessible to screen readers while visually hiding it to avoid redundancy",
      },
      {
        name: "disabled",
        type: "boolean",
        options: "disabled",
        default: "",
        description: "Disable the select",
      },
      {
        name: "name",
        type: "string",
        options: "{text}",
        default: "",
        description: "The name attribute is used when submitting forms.",
      },
      {
        name: "value",
        type: "string",
        options: "{text}",
        default: "",
        description: "Define which option is selected by default.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            ${prop.required ? "required" : ""}
            name="${prop.name}"
            type="${prop.type}" 
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";

        return /*html*/ `
            <mui-accordion-block
              style="position: relative; z-index: 1;" 
              size="medium" 
              heading=${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)} 
              ${isLastChild}>
              <story-type-slat
                slot="detail"
                ${prop.required ? "required" : ""}
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Select" 
        description="A versatile dropdown component for selecting from a list of options, supporting customisable styles and accessibility features."
        github="https://github.com/michaeltrilford/muibook/blob/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-select/index.ts"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=117-2068&t=GMqx21isUVAMpLJp-1"
        accessibility="
          A label is required for screen reader support, describing the purpose of the select.;
          If hide-label is used, the label is visually hidden but still accessible via aria-label.;
          The label and select are linked using for and id attributes. If no id is provided, one is generated.;
          Keyboard users see a clear focus style when navigating.;
          The disabled attribute is native and fully supported by assistive tech.;
          Logs a console warning if no label is provided.
        "
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Props">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>


        <story-card title="Default" description="A select requires a list of options.">
          <div slot="body">
            <mui-select
              label="Default"
              options='[
                {"value": "default", "label": "Mui"},
                {"value": "jal", "label": "JAL"},
                {"value": "ana", "label": "ANA"},
                {"value": "mono", "label": "Mono"}
              ]'>
            </mui-select>
          </div>
          <mui-code slot="footer">
            &lt;mui-select label="Default"
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options='[
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "default", "label": "Mui"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "jal", "label": "JAL"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "ana", "label": "ANA"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "mono", "label": "Mono"}
                <br />
              &nbsp;&nbsp;]'&gt;
              <br />
            &lt;/mui-select&gt;

          </mui-code>
        </story-card>

        <story-card title="Hide Label" description="Ensures the label is accessible to screen readers while visually hiding it to avoid redundancy.">
          <div slot="body">
            <mui-select 
              label="Density"
              hide-label
              options='[
                {"value": "spacious", "label": "Spacious"},
                {"value": "compact", "label": "Compact"}
              ]'>
            </mui-select>
          </div>
          <mui-code slot="footer">
            &lt;mui-select
            <br />
              &nbsp;&nbsp;label="Brand"
              <br />
              &nbsp;&nbsp;hide-label
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options='[
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "spacious", "label": "Spacious"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "compact", "label": "Compact"}
                <br />
              &nbsp;&nbsp;]'&gt;
              <br />
            &lt;/mui-select&gt;

          </mui-code>
        </story-card>


        <story-card title="Value" description="Define which option is selected by default.">
          <div slot="body">
            <mui-select
              value="compact"
              label="Density"
              hide-label
              options='[
                {"value": "spacious", "label": "Spacious"},
                {"value": "compact", "label": "Compact"}
              ]'>
            </mui-select>
          </div>
          <mui-code slot="footer">
            &lt;mui-select
            <br />
              &nbsp;&nbsp;label="Brand"
              <br />
              &nbsp;&nbsp;hide-label
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options='[
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "spacious", "label": "Spacious"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "compact", "label": "Compact"}
                <br />
              &nbsp;&nbsp;]'&gt;
              <br />
            &lt;/mui-select&gt;

          </mui-code>
        </story-card>

        <story-card title="Disabled">
          <div slot="body">
            <mui-select
              disabled
              label="Brand"
              hide-label
              options='[
                {"value": "spacious", "label": "Spacious"},
                {"value": "compact", "label": "Compact"}
              ]'>
            </mui-select>
          </div>
          <mui-code slot="footer">
            &lt;mui-select

            <br />
              &nbsp;&nbsp;disabled
              <br />
              &nbsp;&nbsp;label="Brand"
              <br />
              &nbsp;&nbsp;hide-label
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options='[
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "spacious", "label": "Spacious"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "compact", "label": "Compact"}
                <br />
              &nbsp;&nbsp;]'&gt;
              <br />
            &lt;/mui-select&gt;

          </mui-code>
        </story-card>

        <story-card title="Before: Select">
          <div slot="body">
            <mui-input type="search" label="Search">
              <mui-select
                style="width: 120px;"
                slot="before"
                label="Filter"
                hide-label
                  options='[
                  {"value": "all", "label": "All"},
                  {"value": "images", "label": "Images"},
                  {"value": "video", "label": "Video"}
                ]'>
              </mui-select>
          </div>
          <mui-code slot="footer">
            &lt;mui-input type="search" label="Search"&gt;<br>
            &nbsp;&nbsp;&lt;mui-select<br>
            &nbsp;&nbsp;&nbsp;&nbsp;slot="before"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;label="Filter"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;hide-label<br>
            &nbsp;&nbsp;&nbsp;&nbsp;style="width: 120px;"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;options='[<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "all", "label": "All" },<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "images", "label": "Images" },<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "video", "label": "Video" }<br>
            &nbsp;&nbsp;&nbsp;&nbsp;]'&gt;<br>
            &nbsp;&nbsp;&lt;/mui-select&gt;<br>
            &lt;/mui-input&gt;
          </<mui-code>
        </story-card>

        <story-card title="After: Select">
          <div slot="body">
            <mui-input type="number" label="Amount to transfer">
              <mui-select
                style="width: 100px;"
                slot="after"
                label="Currency"
                hide-label
                  options='[
                  {"value": "jpy", "label": "JPY"},
                  {"value": "usd", "label": "USD"}
                ]'>
              </mui-select>
          </div>
          <mui-code slot="footer">
            &lt;mui-input type="number" label="Amount to transfer"&gt;<br>
            &nbsp;&nbsp;&lt;mui-select<br>
            &nbsp;&nbsp;&nbsp;&nbsp;slot="after"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;label="Currency"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;hide-label<br>
            &nbsp;&nbsp;&nbsp;&nbsp;style="width: 100px;"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;options='[<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "jpy", "label": "JPY" },<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "usd", "label": "USD" }<br>
            &nbsp;&nbsp;&nbsp;&nbsp;]'&gt;<br>
            &nbsp;&nbsp;&lt;/mui-select&gt;<br>
            &lt;/mui-input&gt;
          </<mui-code>
        </story-card>


      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-select", storySelect);
