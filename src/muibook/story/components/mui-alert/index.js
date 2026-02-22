import { getComponentDocs } from "../../../utils/story-data";

class storyAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Alert");
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
        name: "size",
        type: "string",
        options: "small, medium, large",
        default: "medium",
        description: "Sets alert density. Medium is default, with large and small available.",
      },
      {
        name: "label",
        type: "string",
        options: "Any text",
        default: "",
        description: "Overrides the default prefix label (e.g. Success!, Info:, Warning!, Error!).",
      },
      {
        name: "hide-label",
        type: "boolean",
        options: "true, false",
        default: "false",
        description: "Hides the label prefix completely so only slot content is shown.",
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

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-alert";<br>
        </mui-code>
      </spec-card>

      <props-card title="Alert">
        <mui-responsive breakpoint="768" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card 
        title="Success" 
        description="Indicates that an operation or action has been completed successfully." 
        usage="Form submissions that have been processed without errors|||Successful data updates or saves|||Confirmation of completed tasks or actions."
        usageLink="https://guides.muibook.com/alert"
        accessibility="ARIA-live of POLITE is set on this variant."
      >
        <div slot="body">
          <mui-alert variant="success" size="medium">Your message has been sent successfully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="success" size="medium"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Info"
        description="Provides general information or updates that are helpful but not critical."
        usage="Announcing new features or updates|||Providing contextual information or tips|||Informing users about non-urgent system statuses."
        usageLink="https://guides.muibook.com/alert"
        accessibility="ARIA-live of POLITE is set on this variant."
      >
        <div slot="body">
          <mui-alert variant="info" size="medium">Please read the comments carefully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="medium"&gt;
        <br />
        &nbsp;&nbsp;...
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card
        title="Warning"
        description="Alerts users to potential issues or situations that require caution."
        usage="Notifying about unsaved changes||| Indicating deprecated features or upcoming changes||| Highlighting actions that may have unintended consequences."
        usageLink="https://guides.muibook.com/alert"
        accessibility="ARIA-live of ASSERTIVE is set on this variant."
      >
        <div slot="body">
          <mui-alert variant="warning" size="medium">There was a problem with your network connection. <mui-link href="#">Learn more</mui-link></mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="warning" size="medium"&gt;
        <br />
        &nbsp;&nbsp;...
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card
        title="Error"
        description="Indicates that an error has occurred, requiring user attention or action."
        usage="Form validation errors||| System failures or exceptions||| Failed operations or transactions."
        usageLink="https://guides.muibook.com/alert"
        accessibility="ARIA-live of ASSERTIVE is set on this variant."
      >
        <div slot="body">
          <mui-alert variant="error" size="medium">Please read the comments carefully. <mui-link href="#">Learn more</mui-link></mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="error" size="medium"&gt;
        <br />
        &nbsp;&nbsp;...
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card
        title="Custom Label"
        description="Override the default label text with your own message prefix."
      >
        <div slot="body">
          <mui-alert variant="warning" size="medium" label="Maintenance:">Scheduled downtime starts at 11:30 PM.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="warning" size="medium" label="Maintenance:"&gt;
        <br />
        &nbsp;&nbsp;Scheduled downtime starts at 11:30 PM.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card
        title="Label Hidden"
        description="Hide the default/custom label prefix and render only your content."
      >
        <div slot="body">
          <mui-alert variant="info" size="medium" hide-label>System status updated successfully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="medium" hide-label&gt;
        <br />
        &nbsp;&nbsp;System status updated successfully.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card
        title="Large"
        description="Large alert size for higher prominence."
        usage="Use large for high-visibility feedback in spacious layouts.|||Prefer large when long content or strong emphasis is needed."
      >
        <div slot="body">
          <mui-alert variant="info" size="large">Please read the comments carefully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="large"&gt;
        <br />
        &nbsp;&nbsp;Please read the comments carefully.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card
        title="Medium"
        description="Medium alert size for denser layouts."
        usage="Use medium for most in-flow feedback in forms and content pages.|||This is the default size for balanced readability and density."
      >
        <div slot="body">
          <mui-alert variant="info" size="medium">Please read the comments carefully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="medium"&gt;
        <br />
        &nbsp;&nbsp;Please read the comments carefully.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card
        title="Small"
        description="Compact alert size for dense layouts."
        usage="Use small in compact UI areas such as side panels, data tables, and dense control groups.|||Avoid long multi-line copy at this size."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="small">Saved successfully.</mui-alert>
          <mui-alert variant="info" size="small">Your settings were updated.</mui-alert>
          <mui-alert variant="warning" size="small">Session expires in 2 minutes.</mui-alert>
          <mui-alert variant="error" size="small">We could not sync your data.</mui-alert>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="small"&gt;
        <br />
          &nbsp;&nbsp;Your settings were updated.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card
        title="Size Scale"
        description="Compare Large, Medium, and Small in one view."
        usage="Choose size based on layout density first, then message emphasis.|||Keep a consistent size within the same section unless hierarchy requires a change."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="info" size="large">Large alert size.</mui-alert>
          <mui-alert variant="info" size="medium">Medium alert size.</mui-alert>
          <mui-alert variant="info" size="small">Small alert size.</mui-alert>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="large"&gt;Large alert size.&lt;/mui-alert&gt;
        <br />
        &lt;mui-alert variant="info" size="medium"&gt;Medium alert size.&lt;/mui-alert&gt;
        <br />
        &lt;mui-alert variant="info" size="small"&gt;Small alert size.&lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card 
        title="Small / Undo" 
        description="Small alerts with text actions."
        usageLink="https://guides.muibook.com/alert"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="small">
            Message sent.
            <mui-button slot="action">Undo</mui-button>
          </mui-alert>
          <mui-alert variant="info" size="small">
            Draft saved.
            <mui-button slot="action">Undo</mui-button>
          </mui-alert>
          <mui-alert variant="warning" size="small">
            Network unstable.
            <mui-button slot="action">Retry</mui-button>
          </mui-alert>
          <mui-alert variant="error" size="small">
            Sync failed.
            <mui-button slot="action">Retry</mui-button>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="success" size="small"&gt;
          <br />
          &nbsp;&nbsp;Message sent.
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="action"&gt;Undo&lt;/mui-button&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Link Action / Sizes" 
        description="Link actions slotted across large, medium, and small alert sizes."
        usageLink="https://guides.muibook.com/alert"
        usage="Use for inline link actions across all alert density options."
        accessibility="Keep action links keyboard-focusable and readable at each size."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="large">
            Large success alert with link action.
            <mui-link slot="action">View</mui-link>
          </mui-alert>
          <mui-alert variant="info" size="large">
            Large info alert with link action.
            <mui-link slot="action">Details</mui-link>
          </mui-alert>
          <mui-alert variant="warning" size="large">
            Large warning alert with link action.
            <mui-link slot="action">Update</mui-link>
          </mui-alert>
          <mui-alert variant="error" size="large">
            Large error alert with link action.
            <mui-link slot="action">Learn more</mui-link>
          </mui-alert>

          <mui-alert variant="success" size="medium">
            Medium success alert with link action.
            <mui-link slot="action">View</mui-link>
          </mui-alert>
          <mui-alert variant="info" size="medium">
            Medium info alert with link action.
            <mui-link slot="action">Details</mui-link>
          </mui-alert>
          <mui-alert variant="warning" size="medium">
            Medium warning alert with link action.
            <mui-link slot="action">Update</mui-link>
          </mui-alert>
          <mui-alert variant="error" size="medium">
            Medium error alert with link action.
            <mui-link slot="action">Learn more</mui-link>
          </mui-alert>

          <mui-alert variant="success" size="small">
            Plan updated.
            <mui-link slot="action">View</mui-link>
          </mui-alert>
          <mui-alert variant="info" size="small">
            New version available.
            <mui-link slot="action">Details</mui-link>
          </mui-alert>
          <mui-alert variant="warning" size="small">
            Payment expires soon.
            <mui-link slot="action">Update</mui-link>
          </mui-alert>
          <mui-alert variant="error" size="small">
            Action failed.
            <mui-link slot="action">Learn more</mui-link>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="success" size="large"&gt;
          <br />
          &nbsp;&nbsp;Large success alert with link action.
          <br />
          &nbsp;&nbsp;&lt;mui-link slot="action"&gt;View&lt;/mui-link&gt;
          <br />
          &lt;/mui-alert&gt;
          <br /><br />
          &lt;mui-alert variant="info" size="medium"&gt;
          <br />
          &nbsp;&nbsp;Medium info alert with link action.
          <br />
          &nbsp;&nbsp;&lt;mui-link slot="action"&gt;Details&lt;/mui-link&gt;
          <br />
          &lt;/mui-alert&gt;
          <br /><br />
          &lt;mui-alert variant="warning" size="small"&gt;
          <br />
          &nbsp;&nbsp;Payment expires soon.
          <br />
          &nbsp;&nbsp;&lt;mui-link slot="action"&gt;Update&lt;/mui-link&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Small / Icon Action" 
        description="Small alerts with icon actions sized to match."
        usageLink="https://guides.muibook.com/alert"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="small">
            Saved successfully.
            <mui-button slot="action" icon-only>
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="info" size="small">
            New update available.
            <mui-button slot="action" icon-only>
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="warning" size="small">
            Session expires soon.
            <mui-button slot="action" icon-only>
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="error" size="small">
            Sync failed.
            <mui-button slot="action" icon-only>
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="info" size="small"&gt;
          <br />
          &nbsp;&nbsp;New update available.
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="action" icon-only&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-close size="x-small"&gt;&lt;/mui-icon-close&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-button&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Action / Close button" 
        description="Optional close action shown across alert sizes."
        usageLink="https://guides.muibook.com/alert"
        usage="Use large for default prominence.|||Use medium for balanced density.|||Use small for compact interfaces."
        accessibility="Ensure close action has an accessible name and remains keyboard focusable."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="large">
            Large alert with close action. <mui-link href="#">Learn more</mui-link>
            <mui-button slot="action">
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="info" size="medium">
            Medium alert with close action. <mui-link href="#">Learn more</mui-link>
            <mui-button slot="action">
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="warning" size="small">
            Small alert with close action. <mui-link href="#">Learn more</mui-link>
            <mui-button slot="action">
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="info" size="medium"&gt;
          <br />
          &nbsp;&nbsp;Medium alert with close action. &lt;mui-link href="#"&gt;Learn more&lt;/mui-link&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="action"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-close&gt;&lt;/mui-icon-close&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-button&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Action / Undo" 
        description="Optional action to for tasks like undoing an action."
        usageLink="https://guides.muibook.com/alert"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="medium">
            Your message has been sent successfully.
            <mui-button slot="action">
              Undo
            </mui-button>
          </mui-alert>

          <mui-alert variant="info" size="medium">
            Your message has been sent successfully.
            <mui-button slot="action">
              Undo
            </mui-button>
          </mui-alert>

          <mui-alert variant="warning" size="medium">
            Your message has been sent successfully.
            <mui-button slot="action">
              Undo
            </mui-button>
          </mui-alert>

          <mui-alert variant="error" size="medium">
            Your message has been sent successfully.
            <mui-button slot="action">
              Undo
            </mui-button>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="success" size="medium"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="action"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Undo
          <br />
          &nbsp;&nbsp;&lt;/mui-button&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>


      <story-card 
        title="Action / Link" 
        description="Optional action to for tasks like undoing an action."
        usageLink="https://guides.muibook.com/alert"
      >
        <mui-v-stack slot="body" space="var(--space-200)">

          <mui-alert variant="success" size="medium">
            Your subscription will expire today.
            <mui-link slot="action">
              Upgrade
            </mui-link>
          </mui-alert>

          <mui-alert variant="info" size="medium">
            Your subscription will expire today.
            <mui-link slot="action">
              Upgrade
            </mui-link>
          </mui-alert>

          <mui-alert variant="warning" size="medium">
            Your subscription will expire today.
            <mui-link slot="action">
              Upgrade
            </mui-link>
          </mui-alert>

          <mui-alert variant="error" size="medium">
            Your subscription will expire today.
            <mui-link slot="action">
              Upgrade
            </mui-link>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="warning" size="medium"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-link slot="action"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Upgrade
          <br />
          &nbsp;&nbsp;&lt;/mui-link&gt;
          <br />
          &lt;/mui-alert&gt;
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
  }
}

customElements.define("story-alert", storyAlert);
