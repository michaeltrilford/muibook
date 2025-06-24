class storyField extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-input, mui-select",
        default: "(required)",
        description: "Slot in text, icons or other appropriate micro compositions to support form experiences.",
      },
      {
        name: "variant",
        type: "string",
        options: "default, success, warning, error",
        default: "default",
        description: "--",
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Field"
        description="The mui-field component only renders a validation message if the message attribute is set. Showing/hiding the message is controlled by the form logic, or application state. This keeps mui-field simple, declarative, and reactive to the attributes it’s given."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-field/index.ts"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=112-620&t=GMqx21isUVAMpLJp-1"
        accessibility="
          A label is required for screen reader support to describe the input’s purpose.;
          If hide-label is used, the label is visually hidden but accessible via aria-label.;
          The label and form element are linked via for and id. If no id is provided, one is generated.;
          Clear focus styles are shown for keyboard users.;
          The native disabled attribute is fully supported by assistive tech.;
          Logs a console warning if no label is provided.
        "
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-field";<br>
          </mui-code>
        </spec-card>

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

        <story-card title="Input: Default" description="The label prop is forwarded from the parent field to the input element to associate the label with the input correctly.">
          <mui-field label="Email" slot="body">
            <mui-input type="email" placeholder="you@example.com"></mui-input>
          </mui-field>
          <mui-code slot="footer">
            &lt;mui-field label="Email"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-input type="email" placeholder="you@example.com"&gt;&lt;mui-input&gt;
            <br />
            &lt;mui-field&gt;
            <br />
          </mui-code>
        </story-card>

        <story-card title="Input: Default w/ Message" description="You are able to pass in a message that stays static on the page.">
          <mui-field label="Name" slot="body" message="This field doesn't accept special characters">
            <mui-input></mui-input>
          </mui-field>
          <mui-code slot="footer">
            &lt;mui-field label="Name" message="This field doesn't accept special characters"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-input&gt;&lt;mui-input&gt;
            <br />
            &lt;mui-field&gt;
            <br />
          </mui-code>
        </story-card>

        <story-card title="Input: Success w/ Message" description="The form logic will inject the success message onto the field component and render">
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


          <mui-code slot="footer">
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
          </mui-code>
        </story-card>


        <story-card title="Input: Warning w/ Message" description="The form logic will inject the warning message onto the field component and render">

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

          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card title="Input: Error w/ Message" description="The form logic will inject the error message onto the field component and render">

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

          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card title="Select: Error w/ Message" description="The form logic will inject the error message onto the field component and render">

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
                {"value": "ana", "label": "ANA"},
                {"value": "mono", "label": "Mono"}
              ]'>
            </mui-select>
          </mui-field>

          <mui-code slot="footer">
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
          </mui-code>
        </story-card>


        <story-card 
          title="Input & Select: Error w/ Message" 
          description="The form logic will inject the error message onto the field component and render"
          usage="
            Add input is the primary element, so this item should have validation;
            The select isn’t the primary input: It’s more of a supporting control (Filter | Unit | Currency);
            Grouped but semantically separate: While it’s next to the input, it’s not part of the input’s value;
            Validation usually targets primary fields like text, email, number — not auxiliary UI.
          "

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

          <mui-code slot="footer">
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
          </mui-code>
        </story-card>


      </mui-v-stack>

      

      </story-template>
    `;
  }

  connectedCallback() {
    // Add a click listener inside the shadowRoot
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

      // Toggle variant if data-variant is present
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
