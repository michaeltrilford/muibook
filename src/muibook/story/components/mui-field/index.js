import { getComponentDocs } from "../../../utils/story-data";

class storyField extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Field");
    const attrsReference = JSON.stringify([
      {
        component: "mui-field",
        parentAttrs: ["has-message"],
        childAttrs: [],
      },
    ]);

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
        options: "mui-form-message, mui-body",
        default: "",
        description: "Named message slot for rich helper and validation content.",
      },
      {
        name: "variant",
        type: "string",
        options: "default, success, warning, error",
        default: "default",
        description: "--",
      },
      {
        name: "optional",
        type: "boolean",
        options: "optional",
        default: "",
        description: "Forwards optional to the slotted form control label treatment.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Set once on Field; forwards size to the slotted form control and slot=message content.",
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
                <mui-form-message slot="message" style="color: var(--text-color-error);">
                  <mui-icon-attention slot="before" color="var(--text-color-error)"></mui-icon-attention>
                  This key is invalid. Regenerate and try again.
                </mui-form-message>
              </mui-field>
              <mui-field label="Project Name">
                <mui-input placeholder="Atlas Redesign"></mui-input>
                <mui-form-message slot="message" style="color: var(--text-color-optional);">
                  <mui-icon-info slot="before" color="var(--text-color-optional)"></mui-icon-info>
                  Visible to your workspace.
                </mui-form-message>
              </mui-field>
              <mui-field label="Environment">
                <mui-select options='[{"label":"Development","value":"dev"},{"label":"Staging","value":"staging"},{"label":"Production","value":"prod"}]' value="prod"></mui-select>
                <mui-form-message slot="message" style="color: var(--text-color-warning);">
                  <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
                  Production changes require admin approval.
                </mui-form-message>
              </mui-field>
            </mui-form-group>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-form-group heading="Access Settings" hide-label&gt;<br />
            &nbsp;&nbsp;&lt;mui-field label="API Key"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input variant="error" value="pk_live_..."&gt;&lt;/mui-input&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-form-message slot="message"&gt;This key is invalid. Regenerate and try again.&lt;/mui-form-message&gt;<br />
            &nbsp;&nbsp;&lt;/mui-field&gt;<br />
            &nbsp;&nbsp;&lt;mui-field label="Project Name"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input placeholder="Atlas Redesign"&gt;&lt;/mui-input&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-form-message slot="message"&gt;Visible to your workspace.&lt;/mui-form-message&gt;<br />
            &nbsp;&nbsp;&lt;/mui-field&gt;<br />
            &lt;/mui-form-group&gt;
          </story-code-block>
        </story-card>

        <story-card title="Form Group: Field Messages by Size" description="Field-owned messages inside Form Group across x-small, small, medium, and large sizes."
          usage="Set size once on mui-field. Size is inherited by the slotted control and message content."
          usageLink="https://guides.muibook.com/field"
        >
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-form-group heading="Access Settings" hide-label>
              <mui-field label="X Small" size="x-small">
                <mui-input variant="error" value="pk_live_..."></mui-input>
                <mui-form-message slot="message" style="color: var(--text-color-error);">
                  <mui-icon-attention slot="before" size="x-small" color="var(--text-color-error)"></mui-icon-attention>
                  This key is invalid.
                </mui-form-message>
              </mui-field>
              <mui-field label="Small" size="small">
                <mui-input placeholder="Atlas Redesign"></mui-input>
                <mui-form-message slot="message" style="color: var(--text-color-optional);">
                  <mui-icon-info slot="before" size="small" color="var(--text-color-optional)"></mui-icon-info>
                  Visible to your workspace.
                </mui-form-message>
              </mui-field>
              <mui-field label="Medium" size="medium">
                <mui-select
                  options='[{"label":"Development","value":"dev"},{"label":"Staging","value":"staging"},{"label":"Production","value":"prod"}]'
                  value="prod"
                ></mui-select>
                <mui-form-message slot="message" style="color: var(--text-color-warning);">
                  <mui-icon-warning slot="before" size="medium" color="var(--text-color-warning)"></mui-icon-warning>
                  Production changes require admin approval.
                </mui-form-message>
              </mui-field>
              <mui-field label="Large" size="large">
                <mui-textarea placeholder="Describe access policy..."></mui-textarea>
                <mui-form-message slot="message" style="color: var(--text-color-optional);">
                  <mui-icon-info slot="before" size="large" color="var(--text-color-optional)"></mui-icon-info>
                  Reviewed weekly by workspace admins.
                </mui-form-message>
              </mui-field>
            </mui-form-group>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-form-group heading="Access Settings" hide-label&gt;<br />
            &nbsp;&nbsp;&lt;mui-field label="X Small" size="x-small"&gt;...&lt;/mui-field&gt;<br />
            &nbsp;&nbsp;&lt;mui-field label="Small" size="small"&gt;...&lt;/mui-field&gt;<br />
            &nbsp;&nbsp;&lt;mui-field label="Medium" size="medium"&gt;...&lt;/mui-field&gt;<br />
            &nbsp;&nbsp;&lt;mui-field label="Large" size="large"&gt;...&lt;/mui-field&gt;<br />
            &lt;/mui-form-group&gt;
          </story-code-block>
        </story-card>

        <story-card title="Optional Label Sizes" description="Review Optional label treatment across x-small, small, medium, and large form sizes."
          usage="Optional remains intentionally smaller than the main label at each tier so field labels stay primary."
          usageLink="https://guides.muibook.com/field"
        >
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-field label="X Small" size="x-small" optional>
              <mui-input placeholder="x-small input"></mui-input>
            </mui-field>

            <mui-field label="Small" size="small" optional>
              <mui-select
                options='[{"label":"Option A","value":"a"},{"label":"Option B","value":"b"}]'
                value="a"
              ></mui-select>
            </mui-field>

            <mui-field label="Medium" size="medium" optional>
              <mui-input placeholder="medium input"></mui-input>
            </mui-field>

            <mui-field label="Large" size="large" optional>
              <mui-textarea rows="3" placeholder="large textarea"></mui-textarea>
            </mui-field>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-field label="Medium" size="medium" optional&gt;<br />
            &nbsp;&nbsp;&lt;mui-input placeholder="medium input"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;!-- optional is inherited from mui-field --&gt;
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
          <mui-v-stack slot="body" space="var(--space-400)">
            <mui-button
              variant="secondary"
              data-toggle="field-success-toggle-xs,field-success-toggle-s,field-success-toggle-m,field-success-toggle-l"
              data-message="Password strength: Strong"
              data-variant="success"
            >
              Test Validation
            </mui-button>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">x-small</mui-body>
              <mui-field id="field-success-toggle-xs" label="Password" size="x-small">
                <mui-input type="password" value="temp1234"></mui-input>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">small</mui-body>
              <mui-field id="field-success-toggle-s" label="Password" size="small">
                <mui-input type="password" value="temp1234"></mui-input>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">medium</mui-body>
              <mui-field id="field-success-toggle-m" label="Password" size="medium">
                <mui-input type="password" value="temp1234"></mui-input>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">large</mui-body>
              <mui-field id="field-success-toggle-l" label="Password" size="large">
                <mui-input type="password" value="temp1234"></mui-input>
              </mui-field>
            </mui-v-stack>
          </mui-v-stack>

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
            &lt;mui-button data-toggle="field-success-toggle-xs,field-success-toggle-s,field-success-toggle-m,field-success-toggle-l" data-message="Password strength: Strong" data-variant="success"&gt;Test Validation&lt;/mui-button&gt;<br />
            <br />
            &lt;mui-field label="Password" size="x-small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input type="password" value="••••••••"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Password" size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input type="password" value="••••••••"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Password" size="medium"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input type="password" value="••••••••"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Password" size="large"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input type="password" value="••••••••"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>


        <story-card title="Input: Warning w/ Message" description="The form logic will inject the warning message onto the field component and render"
          usageLink="https://guides.muibook.com/field"
        >
          <mui-v-stack slot="body" space="var(--space-400)">
            <mui-button
              variant="secondary"
              data-toggle="field-warning-toggle-xs,field-warning-toggle-s,field-warning-toggle-m,field-warning-toggle-l"
              data-message="Please double-check your email address for typos"
              data-variant="warning"
            >
              Test Validation
            </mui-button>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">x-small</mui-body>
              <mui-field id="field-warning-toggle-xs" label="Email" size="x-small">
                <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">small</mui-body>
              <mui-field id="field-warning-toggle-s" label="Email" size="small">
                <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">medium</mui-body>
              <mui-field id="field-warning-toggle-m" label="Email" size="medium">
                <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">large</mui-body>
              <mui-field id="field-warning-toggle-l" label="Email" size="large">
                <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
              </mui-field>
            </mui-v-stack>
          </mui-v-stack>

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
            &lt;mui-button data-toggle="field-warning-toggle-xs,field-warning-toggle-s,field-warning-toggle-m,field-warning-toggle-l" data-message="Please double-check your email address for typos" data-variant="warning"&gt;Test Validation&lt;/mui-button&gt;<br />
            <br />
            &lt;mui-field label="Email" size="x-small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Email" size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Email" size="medium"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Email" size="large"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>

        <story-card title="Input: Error w/ Message" description="The form logic will inject the error message onto the field component and render"
          usageLink="https://guides.muibook.com/field"
        >
          <mui-v-stack slot="body" space="var(--space-400)">
            <mui-button
              variant="secondary" 
              data-toggle="field-error-toggle-xs,field-error-toggle-s,field-error-toggle-m,field-error-toggle-l" 
              data-message="Enter a valid email to proceed"
              data-variant="error"
            >
              Test Validation
            </mui-button>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">x-small</mui-body>
              <mui-field id="field-error-toggle-xs" label="Email" size="x-small">
                <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">small</mui-body>
              <mui-field id="field-error-toggle-s" label="Email" size="small">
                <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">medium</mui-body>
              <mui-field id="field-error-toggle-m" label="Email" size="medium">
                <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">large</mui-body>
              <mui-field id="field-error-toggle-l" label="Email" size="large">
                <mui-input placeholder="you@example.com" value="michael@muibook.com"></mui-input>
              </mui-field>
            </mui-v-stack>
          </mui-v-stack>

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
            &lt;mui-button data-toggle="field-error-toggle-xs,field-error-toggle-s,field-error-toggle-m,field-error-toggle-l" data-message="Enter a valid email to proceed" data-variant="error"&gt;Test Validation&lt;/mui-button&gt;<br />
            <br />
            &lt;mui-field label="Email" size="x-small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Email" size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Email" size="medium"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Email" size="large"&gt;<br />
            &nbsp;&nbsp;&lt;mui-input placeholder="you@example.com" value="michael@muibook.com"&gt;&lt;/mui-input&gt;<br />
            &lt;/mui-field&gt;
          </story-code-block>
        </story-card>

        <story-card title="Select: Error w/ Message" description="The form logic will inject the error message onto the field component and render"
          usageLink="https://guides.muibook.com/field"
        >
          <mui-v-stack slot="body" space="var(--space-400)">
            <mui-button
              variant="secondary" 
              data-toggle="select-field-error-toggle-xs,select-field-error-toggle-s,select-field-error-toggle-m,select-field-error-toggle-l" 
              data-message="Please select one option"
              data-variant="error"
            >
              Test Validation
            </mui-button>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">x-small</mui-body>
              <mui-field id="select-field-error-toggle-xs" label="Brand" size="x-small">
                <mui-select
                    options='[
                    {"value": "default", "label": "Select Option"},
                    {"value": "mui", "label": "Mui"},
                    {"value": "jal", "label": "JAL"},
                    {"value": "ana", "label": "ANA"}
                  ]'>
                </mui-select>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">small</mui-body>
              <mui-field id="select-field-error-toggle-s" label="Brand" size="small">
                <mui-select
                    options='[
                    {"value": "default", "label": "Select Option"},
                    {"value": "mui", "label": "Mui"},
                    {"value": "jal", "label": "JAL"},
                    {"value": "ana", "label": "ANA"}
                  ]'>
                </mui-select>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">medium</mui-body>
              <mui-field id="select-field-error-toggle-m" label="Brand" size="medium">
                <mui-select
                    options='[
                    {"value": "default", "label": "Select Option"},
                    {"value": "mui", "label": "Mui"},
                    {"value": "jal", "label": "JAL"},
                    {"value": "ana", "label": "ANA"}
                  ]'>
                </mui-select>
              </mui-field>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-body size="small" variant="optional">large</mui-body>
              <mui-field id="select-field-error-toggle-l" label="Brand" size="large">
                <mui-select
                    options='[
                    {"value": "default", "label": "Select Option"},
                    {"value": "mui", "label": "Mui"},
                    {"value": "jal", "label": "JAL"},
                    {"value": "ana", "label": "ANA"}
                  ]'>
                </mui-select>
              </mui-field>
            </mui-v-stack>
          </mui-v-stack>

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
            &lt;mui-button data-toggle="select-field-error-toggle-xs,select-field-error-toggle-s,select-field-error-toggle-m,select-field-error-toggle-l" data-message="Please select one option" data-variant="error"&gt;Test Validation&lt;/mui-button&gt;<br />
            <br />
            &lt;mui-field label="Brand" size="x-small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-select options='[{...}]'&gt;&lt;/mui-select&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Brand" size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-select options='[{...}]'&gt;&lt;/mui-select&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Brand" size="medium"&gt;<br />
            &nbsp;&nbsp;&lt;mui-select options='[{...}]'&gt;&lt;/mui-select&gt;<br />
            &lt;/mui-field&gt;<br />
            <br />
            &lt;mui-field label="Brand" size="large"&gt;<br />
            &nbsp;&nbsp;&lt;mui-select options='[{...}]'&gt;&lt;/mui-select&gt;<br />
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
        attrs-reference='${attrsReference}'
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
      
        imports='["@muibook/components/mui-field"]'>
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

      const targetIds = (button.getAttribute("data-toggle") || "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);
      const message = button.getAttribute("data-message") || "Password strength is strong";
      const variant = button.getAttribute("data-variant");

      targetIds.forEach((targetId) => {
        const field = this.shadowRoot.getElementById(targetId);
        if (!field) return;

        if (field.hasAttribute("message")) {
          field.removeAttribute("message");
        } else {
          field.setAttribute("message", message);
        }

        if (variant) {
          if (field.getAttribute("variant") === variant) {
            field.removeAttribute("variant");
          } else {
            field.setAttribute("variant", variant);
          }
        }
      });
    });
  }
}

customElements.define("story-field", storyField);
