import { getComponentDocs } from "../../../utils/story-data";

class storyTextarea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Textarea");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "variant",
        type: "string",
        options: "default, success, warning, error",
        default: "default",
        description: "Sets visual validation state.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Controls textarea sizing scale.",
      },
      {
        name: "id",
        type: "string",
        options: "{text}",
        default: "",
        description: "Identifier linked with label for accessibility.",
      },
      {
        name: "label",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Accessible label for the textarea.",
      },
      {
        name: "hide-label",
        type: "boolean",
        options: "hide-label",
        default: "",
        description: "Hides visual label but keeps accessibility label.",
      },
      {
        name: "optional",
        type: "boolean",
        options: "optional",
        default: "",
        description: "Adds an (optional) marker to the label.",
      },
      {
        name: "rows",
        type: "number",
        options: "{number}",
        default: "4",
        description: "Initial number of visible rows.",
      },
      {
        name: "disabled",
        type: "boolean",
        options: "disabled",
        default: "",
        description: "Disables text input.",
      },
      {
        name: "name",
        type: "string",
        options: "{text}",
        default: "",
        description: "Form field name.",
      },
      {
        name: "value",
        type: "string",
        options: "{text}",
        default: "",
        description: "Current textarea value.",
      },
      {
        name: "placeholder",
        type: "string",
        options: "{text}",
        default: "",
        description: "Hint shown when textarea is empty.",
      },
      {
        name: "max-length",
        type: "number",
        options: "{number}",
        default: "",
        description: "Sets a max character length and shows a live character count.",
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

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-textarea";<br>
        </mui-code>
      </spec-card>

      <props-card title="Textarea">
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
          <mui-textarea label="Description" placeholder="Write your notes..."></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Description" placeholder="Write your notes..."&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Rows">
        <div slot="body">
          <mui-textarea label="Summary" rows="6" placeholder="6 visible rows"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Summary" rows="6" placeholder="6 visible rows"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Variant: Error">
        <div slot="body">
          <mui-textarea label="Feedback" variant="error" value="Needs correction"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Feedback" variant="error" value="Needs correction"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Hide Label">
        <div slot="body">
          <mui-textarea label="Hidden Label" hide-label placeholder="Accessible without visible label"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Hidden Label" hide-label placeholder="Accessible without visible label"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Disabled">
        <div slot="body">
          <mui-textarea label="Disabled" disabled value="Read-only content"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Disabled" disabled value="Read-only content"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Optional Label">
        <div slot="body">
          <mui-textarea label="Additional Context" optional placeholder="Optional details..."></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Additional Context" optional placeholder="Optional details..."&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Character Count">
        <div slot="body">
          <mui-textarea label="Summary" max-length="180" placeholder="Up to 180 characters"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Summary" max-length="180" placeholder="Up to 180 characters"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data?.title || "Textarea"}"
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

customElements.define("story-textarea", storyTextarea);
