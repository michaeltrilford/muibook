class storyCheckbox extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "{text}, mui-link, mui-icon-[name]",
        default: "",
        description: "Add text to the checkbox option",
      },
      {
        name: "id",
        type: "string",
        options: "{text}",
        default: "",
        description: "",
      },
      {
        name: "checked",
        type: "boolean",
        options: "checked",
        default: "",
        description: "Check the checkbox",
      },
      {
        name: "indeterminate",
        type: "boolean",
        options: "indeterminate",
        default: "",
        description: "The indeterminate state provides visual feedback that some, but not all options are selected.",
      },
      {
        name: "disabled",
        type: "boolean",
        options: "disabled",
        default: "",
        description: "Disable the checkbox",
      },
      {
        name: "aria-label",
        type: "string",
        default: "",
        description: "Provides an accessible name for the checkbox when no visible text is present.",
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
          import "@muibook/components/mui-checkbox";<br>
        </mui-code>
      </spec-card>

      <props-card title="Checkbox">
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
      title="Unchecked (Default)"
      description="No option or all options are unselected. The checkbox appears empty, indicating nothing is chosen."
      usageLink="https://guides.muibook.com/input"
      >

      <mui-checkbox slot="body"></mui-checkbox>
      <story-code-block slot="footer" scrollable>
        &nbsp;&nbsp;&lt;mui-checkbox&gt;&lt;/mui-checkbox&gt;
        <br />
      </story-code-block>
      </story-card>

      <story-card 
      title="Checked"
      description="A single option or all options are selected. The checkbox is fully marked, showing complete selection."
      usageLink="https://guides.muibook.com/input"
      >
      <mui-checkbox checked slot="body"></mui-checkbox>
      <story-code-block slot="footer" scrollable>
        &nbsp;&nbsp;&lt;mui-checkbox checked&gt;&lt;/mui-checkbox&gt;
        <br />
      </story-code-block>
      </story-card>


      <story-card 
      title="Indeterminate" 
      usage="
        Used on parent checkboxes in multi-select groups to show partial selection.; 
        Often acts as a control to clear selected child options.;
        Parent reflects children: unchecked (none), checked (all), indeterminate (some).;
        States switch based on user input and child selection.;
        Your app controls the logic. The component renders the static UI.
      "
      usageLink="https://guides.muibook.com/input"
      >
      <mui-checkbox indeterminate slot="body"></mui-checkbox>
      <story-code-block slot="footer" scrollable>
        &nbsp;&nbsp;&lt;mui-checkbox indeterminate&gt;&lt;/mui-checkbox&gt;
        <br />
      </story-code-block>
      </story-card>

      <story-card 
      title="Disabled"
      description="The option is unavailable for interaction. It may be selected or unselected but cannot be changed by the user."
      usageLink="https://guides.muibook.com/input"
      > 
      <mui-h-stack slot="body">
        <mui-checkbox disabled></mui-checkbox>
        <mui-checkbox disabled checked></mui-checkbox>
        <mui-checkbox disabled indeterminate></mui-checkbox>
      </mui-h-stack>
      <story-code-block slot="footer" scrollable>
        &nbsp;&nbsp;&lt;mui-checkbox disabled&gt;&lt;/mui-checkbox&gt;<br />
        &nbsp;&nbsp;&lt;mui-checkbox disabled checked&gt;&lt;/mui-checkbox&gt;<br />
        &nbsp;&nbsp;&lt;mui-checkbox disabled indeterminate&gt;&lt;/mui-checkbox&gt;
      </story-code-block>
      </story-card>

      <story-card 
      title="Usage: Terms & conditions" 
      description="This checkbox is often used to confirm user agreement with legal terms. It typically starts unchecked and must be checked to proceed. It may become disabled if the form is locked or certain conditions aren’t met." usage="Slot in a string of text and accompanied link or supporting elements.; No body component is required as this is built in."
      usageLink="https://guides.muibook.com/input"
      >
      <mui-field id="termsField" slot="body">
        <mui-checkbox id="agreeTerms">I agree to the <mui-link href="/terms" size="small">terms and conditions</mui-link></mui-checkbox>
      </mui-field>
      <story-code-block slot="footer" scrollable>
        <mui-link size="x-small" href="/#/onboarding">👨‍💻 View working file</mui-link>
        <br>
        <br>


        &lt;mui-field id="termsField"&gt;<br />
        &nbsp;&nbsp;&lt;mui-checkbox id="agreeTerms"&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;I agree to the &lt;mui-link href="/terms" size="small"&gt;terms and conditions&lt;/mui-link&gt;<br />
        &nbsp;&nbsp;&lt;/mui-checkbox&gt;<br />
        &lt;/mui-field&gt;
        <br />
      </story-code-block>
      </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Checkbox"
        description="A checkbox component for capturing single or multiple selections."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-checkbox/index.ts"
        guides="https://guides.muibook.com/checkbox"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=634-4686&t=aIjJqBxWOU1t0Jjp-1"
        storybook="https://stories.muibook.com/?path=/docs/inputs-checkbox--docs"
        accessibility="
          A visible label or accessible name is required for screen reader support to describe the checkbox’s purpose.;
          If no visible label is provided, use aria-label (or aria-labelledby) to supply an accessible name.;
          Clear focus styles are present for keyboard users.;
          The native disabled attribute is fully supported by assistive technologies.
        "
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-checkbox", storyCheckbox);
