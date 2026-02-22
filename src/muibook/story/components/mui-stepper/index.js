import { getComponentDocs } from "../../../utils/story-data";

class storyStepper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Stepper");

    const styles = /*css*/ `
      :host { display: block; }

      .nav-link {
        width: 100%;
        text-align: left;
      }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

      /* Accordion Core */
      [data-icon-animation="accordion-inline"] {
        transition: var(--speed-200) ease-in-out;
      }

      [data-icon-animation="accordion-inline"][open] {
        transform: rotate(90deg);
      }

      [data-icon-animation="accordion-block"] {
        transition: transform var(--speed-200) ease-in-out;

      }

      [data-icon-animation="accordion-block"][open] {
        transform: rotate(-180deg);
      }



    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-step",
        default: "(required)",
        description: "Define the detail content for the expanded section within the Accordion.",
      },
      {
        name: "direction",
        type: "string",
        options: "horizontal, vertical",
        default: "horizontal",
        description: "Adjust the direction",
      },
      {
        name: "active-step",
        type: "number",
        options: "1..n",
        default: "1",
        description: "Active step",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium",
        default: "medium",
        description: "Controls dot, icon, and label scale.",
      },
      {
        name: "interactive",
        type: "boolean",
        options: "interactive",
        default: "",
        description: "Allows clicking steps and keyboard navigation.",
      },
      {
        name: "linear",
        type: "boolean",
        options: "linear",
        default: "",
        description: "In interactive mode, limits navigation to current/next steps.",
      },
      {
        name: "class",
        type: "CSS class",
        options: "",
        default: "",
        description: "",
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

    const stepPropItems = [
      {
        name: "title",
        type: "string",
        options: "{text}",
        default: "",
        description: "Provides the step with a title",
      },
      {
        name: "state",
        type: "string",
        options: "upcoming, active, completed, success, pending, error, disabled",
        default: "upcoming",
        description: "Optional explicit state override for the step.",
      },
    ];

    const stepRows = stepPropItems
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

    const stepAccordions = stepPropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === stepPropItems.length - 1 ? "last-child" : "";

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
            import "@muibook/components/mui-stepper";<br>
          </mui-code>
        </spec-card>

        <mui-v-stack space="var(--space-400)">
          <props-card title="Stepper">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${rows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>
          <props-card title="Step">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${stepRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${stepAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>
        </mui-v-stack>

        <story-card
          id="horizontal"
          title="Horizontal" 
          description="Horizontal direction"
        >
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="1">
              <mui-step title="Details">
              </mui-step>
              <mui-step title="Items">
              </mui-step>
              <mui-step title="Pay">
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
          </story-code-block>
        </story-card>

        <story-card
          id="interactive"
          title="Interactive"
          description="Use arrow keys, Home/End, or click a step. Emits step-change."
        >
          <div slot="body">
            <mui-stepper id="stepper-interactive" direction="horizontal" active-step="2" interactive>
              <mui-step title="Details"></mui-step>
              <mui-step title="Items"></mui-step>
              <mui-step title="Review"></mui-step>
              <mui-step title="Pay"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="2" interactive&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Review"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="small"
          title="Small"
          description="Compact stepper variant for dense layouts."
        >
          <div slot="body">
            <mui-stepper direction="horizontal" size="small" active-step="2">
              <mui-step title="Details"></mui-step>
              <mui-step title="Items"></mui-step>
              <mui-step title="Pay"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" size="small" active-step="2"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="x-small"
          title="X-Small"
          description="Extra compact variant using xx-small state icons."
        >
          <div slot="body">
            <mui-stepper direction="horizontal" size="x-small" active-step="2">
              <mui-step title="Details"></mui-step>
              <mui-step title="Items"></mui-step>
              <mui-step title="Pay"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" size="x-small" active-step="2"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="error-example"
          title="Error Example"
          description="Representative validation failure in a multi-step flow."
        >
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="2">
              <mui-step title="Details" state="success"></mui-step>
              <mui-step title="Billing" state="error"></mui-step>
              <mui-step title="Review" state="upcoming"></mui-step>
              <mui-step title="Pay" state="upcoming"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="2"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Details" state="success"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Billing" state="error"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Review" state="upcoming"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Pay" state="upcoming"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="disabled-example"
          title="Disabled Example"
          description="Representative flow where downstream steps are locked."
        >
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="2">
              <mui-step title="Profile" state="success"></mui-step>
              <mui-step title="Verification" state="pending"></mui-step>
              <mui-step title="Approval" state="disabled"></mui-step>
              <mui-step title="Done" state="disabled"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="2"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Profile" state="success"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Verification" state="pending"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Approval" state="disabled"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Done" state="disabled"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="checkout-flow"
          title="Checkout Flow States"
          description="Representative payment flow with success, active processing, and blocked completion."
        >
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="3">
              <mui-step title="Cart" state="success"></mui-step>
              <mui-step title="Address" state="success"></mui-step>
              <mui-step title="Payment" state="pending"></mui-step>
              <mui-step title="Confirm" state="disabled"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="3"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Cart" state="success"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Address" state="success"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Payment" state="pending"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Confirm" state="disabled"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="verification-flow"
          title="Verification Timeline"
          description="Representative account verification sequence with a failed review and follow-up check."
        >
          <div slot="body">
            <mui-stepper direction="vertical" active-step="3">
              <mui-step title="Identity submitted" state="success">
                <mui-body size="x-small" slot="secondary">Documents uploaded</mui-body>
              </mui-step>
              <mui-step title="Compliance review" state="error">
                <mui-body size="x-small" slot="secondary">Mismatch found</mui-body>
              </mui-step>
              <mui-step title="Resubmission" state="active">
                <mui-body size="x-small" slot="secondary">In progress</mui-body>
              </mui-step>
              <mui-step title="Final approval" state="upcoming">
                <mui-body size="x-small" slot="secondary">Waiting for review</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="vertical" active-step="3"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Identity submitted" state="success"&gt;...&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Compliance review" state="error"&gt;...&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Resubmission" state="active"&gt;...&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Final approval" state="upcoming"&gt;...&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="vertical"
          title="Vertical" 
          description="Vertical direction"
        >
          <div slot="body">
            <mui-stepper direction="vertical" active-step="1">
              <mui-step title="Details">
              </mui-step>
              <mui-step title="Items">
              </mui-step>
              <mui-step title="Pay">
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="vertical" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
          </story-code-block>
        </story-card>

        <story-card
          id="horizontal-secondary"
          title="Horizontal: Secondary" 
          description="Horizontal direction"
        >
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="1">
              <mui-step title="Details">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Items">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Pay">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
          </story-code-block>
        </story-card>

        <story-card
          id="vertical-secondary"
          title="Vertical: Secondary" 
          description="Vertical direction"
        >
          <div slot="body">
            <mui-stepper direction="vertical" active-step="1">
              <mui-step title="Details">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Items">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Pay">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="vertical" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
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
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          limit="10"
          links="horizontal::Horizontal|||x-small::X-Small|||small::Small|||error-example::Error Example|||disabled-example::Disabled Example|||checkout-flow::Checkout Flow States|||verification-flow::Verification Timeline|||vertical::Vertical|||horizontal-secondary::Horizontal: Secondary|||vertical-secondary::Vertical: Secondary"
        ></story-quicklinks>

        ${stories}

      </story-template>
    `;

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    this.shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = this.shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("story-stepper", storyStepper);
