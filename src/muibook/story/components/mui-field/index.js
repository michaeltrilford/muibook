import { getComponentDocs } from "../../../utils/story-data";

class storyField extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Field");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-input, mui-textarea, mui-select, mui-radio-group",
        default: "(required)",
        description: "Slot in text, icons or other appropriate micro compositions to support form experiences.",
      },
      {
        name: "slot=message",
        type: "slot (named)",
        options: "mui-form-hint, mui-body",
        default: "",
        description: "Named message slot for rich helper and validation content.",
      },
      {
        name: "variant",
        type: "string",
        options: "default, optional, success, warning, error",
        default: "default",
        description: "--",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Forwards size to the slotted form control.",
      },
      {
        name: "label",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description:
          "Provides the form element with a unique label.  If without, a console warning will remind you to add label.",
      },
      {
        name: "hide-label",
        type: "boolean",
        options: "hide-label",
        default: "",
        description: "Hides the label but it is still present for screen readers",
      },
      {
        name: "message",
        type: "string",
        options: "{text}",
        default: "",
        description: "--",
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

    const stories = /*html*/ `
        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-field";<br>
          </mui-code>
        </spec-card>

        <props-card title="Field">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>

        <story-card 
          title="Input: Default" 
          description="The label prop is forwarded from the parent field to the input element to associate the label with the input correctly."
          usageLink="https://guides.muibook.com/field"
        >
          <mui-field label="Email" slot="body">
            <mui-input type="email" placeholder="you@example.com"></mui-input>
          </mui-field>
          <story-code-block slot="footer" scrollable>
            &lt;mui-field label="Email"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-input type="email" placeholder="you@example.com"&gt;&lt;/mui-input&gt;
            <br />
            &lt;/mui-field&gt;
            <br />
          </story-code-block>
        </story-card>

        <story-card
          title="Input: Sizes"
          description="Field forwards size to the slotted control."
          usageLink="https://guides.muibook.com/field"
        >
          <mui-v-stack slot="body" space="var(--space-200)">
            <mui-field label="X-Small" size="x-small">
              <mui-input placeholder="X-Small"></mui-input>
            </mui-field>
            <mui-field label="Small" size="small">
              <mui-input placeholder="Small"></mui-input>
            </mui-field>
            <mui-field label="Medium" size="medium">
              <mui-input placeholder="Medium"></mui-input>
            </mui-field>
            <mui-field label="Large" size="large">
              <mui-input placeholder="Large"></mui-input>
            </mui-field>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-field label="small" size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Select: Sizes"
          description="Field forwards size to select controls."
          usageLink="https://guides.muibook.com/field"
        >
          <mui-v-stack slot="body" space="var(--space-200)">
            <mui-field label="X-Small" size="x-small">
              <mui-select
                options='[
                  {"value": "one", "label": "Option 1"},
                  {"value": "two", "label": "Option 2"}
                ]'>
              </mui-select>
            </mui-field>
            <mui-field label="Small" size="small">
              <mui-select
                options='[
                  {"value": "one", "label": "Option 1"},
                  {"value": "two", "label": "Option 2"}
                ]'>
              </mui-select>
            </mui-field>
            <mui-field label="Medium" size="medium">
              <mui-select
                options='[
                  {"value": "one", "label": "Option 1"},
                  {"value": "two", "label": "Option 2"}
                ]'>
              </mui-select>
            </mui-field>
            <mui-field label="Large" size="large">
              <mui-select
                options='[
                  {"value": "one", "label": "Option 1"},
                  {"value": "two", "label": "Option 2"}
                ]'>
              </mui-select>
            </mui-field>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-field label="small" size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-select options='[{...}]'&gt;&lt;/mui-select&gt;<br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Textarea: Sizes"
          description="Field forwards size to textarea controls."
          usageLink="https://guides.muibook.com/field"
        >
          <mui-v-stack slot="body" space="var(--space-200)">
            <mui-field label="X-Small" size="x-small">
              <mui-textarea placeholder="X-Small"></mui-textarea>
            </mui-field>
            <mui-field label="Small" size="small">
              <mui-textarea placeholder="Small"></mui-textarea>
            </mui-field>
            <mui-field label="Medium" size="medium">
              <mui-textarea placeholder="Medium"></mui-textarea>
            </mui-field>
            <mui-field label="Large" size="large">
              <mui-textarea placeholder="Large"></mui-textarea>
            </mui-field>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-field label="small" size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-textarea&gt;&lt;/mui-textarea&gt;<br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>

        <story-card title="Form Group: Field Messages" description="Recommended pattern: in Form Group layouts, each Field owns its helper and validation message. Supporting copy is intentionally knocked back so input controls stay primary."
          usage="Attach helper and validation content directly to the owning field.|||Inside Form Group, keep messages on each field instead of standalone hint rows."
          usageLink="https://guides.muibook.com/field"
        >
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-form-group heading="Access Settings" hide-label>
              <mui-field label="API Key">
                <mui-input value="pk_live_..." variant="error"></mui-input>
                <mui-form-hint slot="message" style="color: var(--text-color-error);">
                  <mui-icon-attention slot="before" color="var(--text-color-error)"></mui-icon-attention>
                  This key is invalid. Regenerate and try again.
                </mui-form-hint>
              </mui-field>
              <mui-field label="Project Name">
                <mui-input placeholder="Atlas Redesign"></mui-input>
                <mui-form-hint slot="message" style="color: var(--text-color-optional);">
                  <mui-icon-info slot="before" color="var(--text-color-optional)"></mui-icon-info>
                  Visible to your workspace.
                </mui-form-hint>
              </mui-field>
              <mui-field label="Environment">
                <mui-select options='[{"label":"Development","value":"dev"},{"label":"Staging","value":"staging"},{"label":"Production","value":"prod"}]' value="prod"></mui-select>
                <mui-form-hint slot="message" style="color: var(--text-color-warning);">
                  <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
                  Production changes require admin approval.
                </mui-form-hint>
              </mui-field>
            </mui-form-group>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-form-group&gt;<br />
            &nbsp;&nbsp;&lt;mui-field label="API Key"&gt;...&lt;/mui-field&gt;<br />
            &nbsp;&nbsp;&lt;mui-field label="Project Name"&gt;...&lt;/mui-field&gt;<br />
            &nbsp;&nbsp;&lt;mui-field label="Environment"&gt;...&lt;/mui-field&gt;<br />
            &lt;/mui-form-group&gt;
          </story-code-block>
        </story-card>

        <story-card title="Input: Default w/ Message" description="You are able to pass in a message that stays static on the page."
          usageLink="https://guides.muibook.com/field"
        >
          <mui-field label="Name" slot="body" message="This field doesn't accept special characters">
            <mui-input></mui-input>
          </mui-field>
          <story-code-block slot="footer" scrollable>
            &lt;mui-field label="Name" message="This field doesn't accept special characters"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-input&gt;&lt;/mui-input&gt;
            <br />
            &lt;/mui-field&gt;
            <br />
          </story-code-block>
        </story-card>

        <story-card title="Input: Optional w/ Message" description="Use optional when guidance is informational and not a validation state."
          usageLink="https://guides.muibook.com/field"
        >
          <mui-field label="Website" slot="body" variant="optional" message="Optional field for portfolio link">
            <mui-input placeholder="https://"></mui-input>
          </mui-field>
          <story-code-block slot="footer" scrollable>
            &lt;mui-field label="Website" variant="optional" message="Optional field for portfolio link"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-input placeholder="https://"&gt;&lt;/mui-input&gt;
            <br />
            &lt;/mui-field&gt;
            <br />
          </story-code-block>
        </story-card>

        <story-card title="Input: Success w/ Message" description="The form logic will inject the success message onto the field component and render"
          usageLink="https://guides.muibook.com/field"
        >
          <!-- Change here: remove onclick, add data-toggle attribute -->
          <mui-button
            variant="secondary"
            style="margin-bottom: var(--space-500)"
            slot="body" 
            data-toggle="field-success-toggle" 
            data-message="Password strength: Strong"
            data-variant="success"
          >
            Test Validation
          </mui-button>

          <mui-field id="field-success-toggle" label="Password" slot="body">
            <mui-input type="password" value="temp1234"></mui-input>
          </mui-field>


          <story-code-block slot="footer" scrollable>
            <br />
            {
            <br />
            &nbsp;&nbsp;"formMessages": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;"passwordSuccess": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message": "✓ Password strength: Strong",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"variant": "success"<br />
            &nbsp;&nbsp;&nbsp;&nbsp;},<br />
            &nbsp;&nbsp;}<br />
            }
            <br />
            <br />
            &lt;mui-field label="Password"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-input type="password" value="••••••••"&gt;&lt;/mui-input&gt;
            <br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>


        <story-card title="Input: Warning w/ Message" description="The form logic will inject the warning message onto the field component and render"
          usageLink="https://guides.muibook.com/field"
        >

          <!-- Change here: remove onclick, add data-toggle attribute -->
          <mui-button
            variant="secondary"
            style="margin-bottom: var(--space-500)"
            slot="body" 
            data-toggle="field-warning-toggle" 
            data-message="Please double-check your email address for typos"
            data-variant="warning"
          >
            Test Validation
          </mui-button>

          <mui-field id="field-warning-toggle" label="Email" slot="body">
            <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
          </mui-field>

          <story-code-block slot="footer" scrollable>
            <br />
            {
            <br />
            &nbsp;&nbsp;"formMessages": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;"emailWarning": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message": "⚠ Please double-check your email address for typos",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"variant": "warning"<br />
            &nbsp;&nbsp;&nbsp;&nbsp;},<br />
            &nbsp;&nbsp;}<br />
            }
            <br />
            <br />
            &lt;mui-field label="Email"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;
            <br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>

        <story-card title="Input: Error w/ Message" description="The form logic will inject the error message onto the field component and render"
          usageLink="https://guides.muibook.com/field"
        >

          <!-- Change here: remove onclick, add data-toggle attribute -->
          <mui-button
            variant="secondary" 
            style="margin-bottom: var(--space-500)" 
            slot="body" 
            data-toggle="field-error-toggle" 
            data-message="Enter a valid email to proceed"
            data-variant="error"
          >
            Test Validation
          </mui-button>

          <mui-field id="field-error-toggle" label="Email" slot="body">
            <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
          </mui-field>

          <story-code-block slot="footer" scrollable>
            <br />
            {
            <br />
            &nbsp;&nbsp;"formMessages": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;"emailError": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message": "Enter a valid email to proceed",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"variant": "error"<br />
            &nbsp;&nbsp;&nbsp;&nbsp;}<br />
            &nbsp;&nbsp;}<br />
            }
            <br />
            <br />
            &lt;mui-field label="Email"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;
            <br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>

        <story-card title="Select: Error w/ Message" description="The form logic will inject the error message onto the field component and render"
          usageLink="https://guides.muibook.com/field"
        >

          <!-- Change here: remove onclick, add data-toggle attribute -->
          <mui-button
            variant="secondary" 
            style="margin-bottom: var(--space-500)" 
            slot="body" 
            data-toggle="select-field-error-toggle" 
            data-message="Please select one option"
            data-variant="error"
          >
            Test Validation
          </mui-button>

          <mui-field id="select-field-error-toggle" label="Brand" slot="body">
            <mui-select
                options='[
                {"value": "default", "label": "Select Option"},
                {"value": "mui", "label": "Mui"},
                {"value": "jal", "label": "JAL"},
                {"value": "ana", "label": "ANA"}
              ]'>
            </mui-select>
          </mui-field>

          <story-code-block slot="footer" scrollable>
            <br />
            {
            <br />
            &nbsp;&nbsp;"formMessages": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;"emailError": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message": "Please select one option",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"variant": "error"<br />
            &nbsp;&nbsp;&nbsp;&nbsp;}<br />
            &nbsp;&nbsp;}<br />
            }
            <br />
            <br />
            &lt;mui-field label="Brand"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-select options='[{...}]'&gt;&lt;/mui-select&gt;
            <br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>


        <story-card 
          title="Input & Select: Error w/ Message" 
          description="The form logic will inject the error message onto the field component and render"
          usage="
            Add input is the primary element, so this item should have validation|||
            The select isn’t the primary input: It’s more of a supporting control (Filter | Unit | Currency)|||
            Grouped but semantically separate: While it’s next to the input, it’s not part of the input’s value|||
            Validation usually targets primary fields like text, email, number — not auxiliary UI.
          "
          usageLink="https://guides.muibook.com/field"

        >
          <!-- Change here: remove onclick, add data-toggle attribute -->
          <mui-button
            variant="secondary" 
            style="margin-bottom: var(--space-500)" 
            slot="body" 
            data-toggle="field-input-select-error-toggle" 
            data-message="Enter an amount to transfer"
            data-variant="error"
          >
            Test Validation
          </mui-button>

          <mui-field id="field-input-select-error-toggle" label="Amount to transfer" slot="body">
            <mui-input type="number">
              <mui-select
                slot="after"
                label="Currency"
                hide-label
                style="width: 100px;"
                options='[
                  { "value": "jpy", "label": "JPY" },
                  { "value": "usd", "label": "USD" }
                ]'>
              </mui-select>
            </mui-input>
          </mui-field>

          <story-code-block slot="footer" scrollable>
            <br />
            {
            <br />
            &nbsp;&nbsp;"formMessages": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;"transferError": {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message": "Enter an amount to transfer",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"variant": "error"<br />
            &nbsp;&nbsp;&nbsp;&nbsp;}<br />
            &nbsp;&nbsp;}<br />
            }
            <br />

            &lt;mui-field label=&quot;Amount to transfer&quot; slot=&quot;body&quot;&gt;<br>
            &nbsp;&nbsp;&lt;mui-input type=&quot;number&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-select<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot=&quot;after&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label=&quot;Currency&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hide-label<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style=&quot;width: 100px;&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options='[<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ &quot;value&quot;: &quot;jpy&quot;, &quot;label&quot;: &quot;JPY&quot; },<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ &quot;value&quot;: &quot;usd&quot;, &quot;label&quot;: &quot;USD&quot; }<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]'<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-select&gt;<br>
            &nbsp;&nbsp;&lt;/mui-input&gt;<br>
            &lt;/mui-field&gt;
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
      >
        ${stories}
      </story-template>
    `;

    this.addEventListeners();
  }

  // Add toggle behaviour once DOM is rendered
  addEventListeners() {
    this.shadowRoot.addEventListener("click", (event) => {
      const button = event.target.closest("[data-toggle]");
      if (!button) return;

      const targetId = button.getAttribute("data-toggle");
      const message = button.getAttribute("data-message") || "Password strength is strong";
      const variant = button.getAttribute("data-variant");

      const field = this.shadowRoot.getElementById(targetId);
      if (!field) return;

      // Toggle message
      if (field.hasAttribute("message")) {
        field.removeAttribute("message");
      } else {
        field.setAttribute("message", message);
      }

      // Toggle variant
      if (variant) {
        if (field.getAttribute("variant") === variant) {
          field.removeAttribute("variant");
        } else {
          field.setAttribute("variant", variant);
        }
      }
    });
  }
}

customElements.define("story-field", storyField);
