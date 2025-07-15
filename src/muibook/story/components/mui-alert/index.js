class storyAlert extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "variant",
        type: "string",
        options: "success, info, warning, error",
        default: "success",
        description: "Describe the intent or mood of a alert",
      },
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{text}, mui-link",
        default: "(required)",
        description: "Content placed inside the component. Can include mui-links and text nodes, or both.",
      },
      {
        name: "slot=&#8220;action&#8221;",
        type: "slot (named)",
        options: "mui-button, mui-link",
        default: "",
        description: "Slot a mui-button or mui-link into the Alert component for dismissing or tasks.",
      },
      {
        name: "style",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use styles to add layout based CSS to the host element.",
      },
      {
        name: "class",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use add a classname to add layout based CSS to the host element.",
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
        title="Alert"
        description="Alerts are to surface meaningful system messages related to the users' current task or action."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-4444&t=ZA9uH4LK37tSuk6r-1"
        guides="https://guides.muibook.com/alert"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-alert/index.ts"

        accessibility="
          ARIA-live is built in, using POLITE + ASSERTIVE for screen readers.; 
          The role is set to ALERT for immediate screen reader feedback.
        "
      >

        <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small" scrollable>
              import "@muibook/components/mui-alert";<br>
            </mui-code>
          </spec-card>

          <spec-card title="Props: Alert">
            <mui-responsive breakpoint="768" slot="body">
              <story-type-table slot="showAbove">
                ${rows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

          <story-card 
            title="Success" 
            description="Indicates that an operation or action has been completed successfully." 
            usage="Form submissions that have been processed without errors.;Successful data updates or saves.;Confirmation of completed tasks or actions."
            usageLink="https://guides.muibook.com/alert"
            accessibility="ARIA-live of POLITE is set on this variant."
          >
            <div slot="body">
              <mui-alert variant="success">Your message has been sent successfully.</mui-alert>
            </div>
            <mui-code slot="footer" scrollable>
              &lt;mui-alert variant="success"&gt;
              <br />
              &nbsp;&nbsp;...
              <br />
              &lt;/mui-alert&gt;
            </mui-code>
          </story-card>

          <story-card
            title="Info"
            description="Provides general information or updates that are helpful but not critical."
            usage="Announcing new features or updates.; Providing contextual information or tips.; Informing users about non-urgent system statuses."
            usageLink="https://guides.muibook.com/alert"
            accessibility="ARIA-live of POLITE is set on this variant."
          >
            <div slot="body">
              <mui-alert variant="info">Please read the comments carefully.</mui-alert>
            </div>
            <mui-code slot="footer" scrollable>
            &lt;mui-alert variant="info"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-alert&gt;
          </mui-code>
          </story-card>

          <story-card
            title="Warning"
            description="Alerts users to potential issues or situations that require caution."
            usage="Notifying about unsaved changes.; Indicating deprecated features or upcoming changes.; Highlighting actions that may have unintended consequences."
            accessibility="ARIA-live of ASSERTIVE is set on this variant."
          >
            <div slot="body">
              <mui-alert variant="warning">There was a problem with your network connection. <mui-link href="#">Learn more</mui-link></mui-alert>
            </div>
            <mui-code slot="footer" scrollable>
            &lt;mui-alert variant="warning"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-alert&gt;
          </mui-code>
          </story-card>

          <story-card
            title="Error"
            description="Indicates that an error has occurred, requiring user attention or action."
            usage="Form validation errors.; System failures or exceptions.; Failed operations or transactions."
            usageLink="https://guides.muibook.com/alert"
            accessibility="ARIA-live of ASSERTIVE is set on this variant."
          >
            <div slot="body">
              <mui-alert variant="error">Please read the comments carefully. <mui-link href="#">Learn more</mui-link></mui-alert>
            </div>
            <mui-code slot="footer" scrollable>
            &lt;mui-alert variant="error"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-alert&gt;
          </mui-code>
          </story-card>

          <story-card 
            title="Action / Close button" 
            description="Optional action to help dismiss or action a task" 
          >
            <mui-v-stack slot="body" space="var(--space-200)">

              <mui-alert variant="success">
                Please read the comments carefully. <mui-link href="#">Learn more</mui-link>
                <mui-button slot="action">
                  <mui-icon-close></mui-icon-close>
                </mui-button>
              </mui-alert>

              <mui-alert variant="info">
                Please read the comments carefully. <mui-link href="#">Learn more</mui-link>
                <mui-button slot="action">
                  <mui-icon-close></mui-icon-close>
                </mui-button>
              </mui-alert>

              <mui-alert variant="warning">
                Please read the comments carefully. <mui-link href="#">Learn more</mui-link>
                <mui-button slot="action">
                  <mui-icon-close></mui-icon-close>
                </mui-button>
              </mui-alert>

              <mui-alert variant="error">
                Please read the comments carefully. <mui-link href="#">Learn more</mui-link>
                <mui-button slot="action">
                  <mui-icon-close></mui-icon-close>
                </mui-button>
              </mui-alert>
            </mui-v-stack>

            <mui-code slot="footer" scrollable>
              &lt;mui-alert variant="error"&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-button slot="action"&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-close&gt;&lt;/mui-icon-close&gt;
              <br />
              &nbsp;&nbsp;&lt;/mui-button&gt;
              <br />
              &lt;/mui-alert&gt;
            </mui-code>
          </story-card>

          <story-card 
            title="Action / Undo" 
            description="Optional action to for tasks like undoing an action." 
          >
            <mui-v-stack slot="body" space="var(--space-200)">
              <mui-alert variant="success">
                Your message has been sent successfully.
                <mui-button slot="action">
                  Undo
                </mui-button>
              </mui-alert>

              <mui-alert variant="info">
                Your message has been sent successfully.
                <mui-button slot="action">
                  Undo
                </mui-button>
              </mui-alert>

              <mui-alert variant="warning">
                Your message has been sent successfully.
                <mui-button slot="action">
                  Undo
                </mui-button>
              </mui-alert>

              <mui-alert variant="error">
                Your message has been sent successfully.
                <mui-button slot="action">
                  Undo
                </mui-button>
              </mui-alert>
            </mui-v-stack>

            <mui-code slot="footer" scrollable>
              &lt;mui-alert variant="success"&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-button slot="action"&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Undo
              <br />
              &nbsp;&nbsp;&lt;/mui-button&gt;
              <br />
              &lt;/mui-alert&gt;
            </mui-code>
          </story-card>


          <story-card 
            title="Action / Link" 
            description="Optional action to for tasks like undoing an action." 
          >
            <mui-v-stack slot="body" space="var(--space-200)">

              <mui-alert variant="success">
                Your subscription will expire today.
                <mui-link slot="action">
                  Upgrade
                </mui-link>
              </mui-alert>

              <mui-alert variant="info">
                Your subscription will expire today.
                <mui-link slot="action">
                  Upgrade
                </mui-link>
              </mui-alert>

              <mui-alert variant="warning">
                Your subscription will expire today.
                <mui-link slot="action">
                  Upgrade
                </mui-link>
              </mui-alert>

              <mui-alert variant="error">
                Your subscription will expire today.
                <mui-link slot="action">
                  Upgrade
                </mui-link>
              </mui-alert>
            </mui-v-stack>

            <mui-code slot="footer" scrollable>
              &lt;mui-alert variant="warning"&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-link slot="action"&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Upgrade
              <br />
              &nbsp;&nbsp;&lt;/mui-link&gt;
              <br />
              &lt;/mui-alert&gt;
            </mui-code>
          </story-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-alert", storyAlert);
