import { getComponentDocs } from "../../../utils/story-data";
import VisaBlack from "../../../images/networks/visa-black.svg";
import Guides from "../../../images/guru/guides.svg";

class storyDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Dialog");

    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; } 

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
      }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{mui-body}, {mui-elements}, {elements}",
        default: "(required)",
        description: "Slot in content to be displayed within the dialog.",
      },
      {
        name: "slot=&#8220;title&#8221;",
        required: true,
        type: "slot (named)",
        options: "{mui-heading}",
        default: "(required)",
        description: "Slot in a heading element to title the dialog.",
      },
      {
        name: "slot=&#8220;actions&#8221;",
        type: "slot (named)",
        options: "Cancel/Save, etc.",
        default: "",
        description:
          "Slot in action buttons for the dialog, always placed in the footer. refer to mui-button documentation for use.",
      },
      {
        name: "width",
        type: "string",
        options: "px, %, em, rem, etc.",
        default: "350px",
        description: "Set the width of the dialog.",
      },
      {
        name: "content-padding",
        type: "string",
        options: "none",
        default: "",
        description: "Set to none to remove internal content padding and allow full-bleed layouts.",
      },
      {
        name: "open",
        type: "boolean",
        options: "",
        default: "",
        description:
          "Pair with state to toggle the visibility of the dialog. Alternatively, use an element with the same data-dialog value to open the dialog.",
      },
      {
        name: "data-dialog",
        type: "boolean",
        options: "Cancel",
        default: "",
        description:
          "Recommended to pair with an element that has the same data-dialog value to open the dialog. Refer to code examples.",
      },
      {
        name: "aria-labelledby",
        type: "boolean",
        options: "dialog-title-2",
        default: "",
        description:
          "Add an element with the same id as the value to provide an accessible name for the dialog. Refer to code examples.",
      },
      {
        name: "aria-describedby",
        type: "boolean",
        options: "dialog-desc-2",
        default: "",
        description:
          "Add an element with the same id as the value to provide an accessible description for the dialog. Refer to code examples.",
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

    const closePropItems = [
      {
        name: "data-close",
        type: "boolean",
        options: "",
        default: "",
        description:
          "Add the boolean and state to an action within the footer that closes the dialog. Refer to code examples.",
      },
    ];

    const closeRows = closePropItems
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

    const closeAccordions = closePropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === closePropItems.length - 1 ? "last-child" : "";

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
          import "@muibook/components/mui-dialog";<br>
        </mui-code>
      </spec-card>

      <mui-v-stack space="var(--space-400)">
        <props-card title="Dialog">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>
        <props-card title="Close">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${closeRows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${closeAccordions}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>
      </mui-v-stack>

      <!-- Dialog with Actions -->
      <story-card title="Confirmation Dialog">
        <mui-button variant="primary" data-dialog="hook-1" slot="body">Open Dialog</mui-button>
        <mui-dialog data-dialog="hook-1" width="400px" slot="body" aria-labelledby="dialog-title-1" aria-describedby="dialog-desc-1">
          <mui-heading size="4" level="4" slot="title" id="dialog-title-1">Dialog Title</mui-heading>
          <mui-body id="dialog-desc-1">This is some dialog content</mui-body>
          <mui-button slot="actions" variant="secondary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="primary">Confirm</mui-button>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="primary" data-dialog="hook-1"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-1" width="400px" aria-labelledby="dialog-title-1" aria-describedby="dialog-desc-1"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-1"&gt;Dialog Title&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body id="dialog-desc-1"&gt;This is some dialog content&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Cancel&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-dialog&gt;
          
          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;});<br>
          });<br>
          <br>
          &lt;!-- Close buttons inside each dialog --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-dialog[data-dialog]&quot;).forEach((dialog) =&gt; {<br>
          &nbsp;&nbsp;dialog.querySelectorAll(&quot;mui-button[data-close]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; dialog.removeAttribute(&quot;open&quot;));<br>
          &nbsp;&nbsp;});<br>
          });<br>

        </story-code-block>
      </story-card>

      <story-card title="Delete Confirmation">
        <mui-button data-dialog="hook-2" slot="body" variant="attention">Delete</mui-button>

        <mui-dialog data-dialog="hook-2" width="400px" slot="body" aria-labelledby="dialog-title-2" aria-describedby="dialog-desc-2">
          <mui-heading size="4" level="4" slot="title"id="dialog-title-2">Delete repository?</mui-heading>
          <mui-body id="dialog-desc-2">Are you sure you want to delete this item? This action cannot be undone.</mui-body>
          <mui-button slot="actions" variant="secondary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="attention">Delete</mui-button>
        </mui-dialog>

        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="attention" data-dialog="hook-2"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-2" width="400px" aria-labelledby="dialog-title-2" aria-describedby="dialog-desc-2"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-2"&gt;Delete repository?&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body id="dialog-desc-2"&gt;Are you sure you want to delete this item? This action cannot be undone.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Cancel&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&lt;mui-button slot="actions" variant="attention"&gt;Delete&lt;/mui-button&gt;<br>
          &lt;/mui-dialog&gt;

          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          &nbsp;&nbsp;this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;});<br>
          &nbsp;&nbsp;});<br>
          <br>
          &lt;!-- Close buttons inside each dialog --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-dialog[data-dialog]&quot;).forEach((dialog) =&gt; {<br>
          &nbsp;&nbsp;dialog.querySelectorAll(&quot;mui-button[data-close]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; dialog.removeAttribute(&quot;open&quot;));<br>
          &nbsp;&nbsp;});<br>
          });<br>


        </story-code-block>
      </story-card>

      <!-- Tip / Guidance Dialog -->
      <story-card title="Tip Dialog">
        <mui-button data-dialog="hook-3" slot="body">Show Tip</mui-button>
        <mui-dialog data-dialog="hook-3" width="400px" slot="body" aria-labelledby="dialog-title-3" aria-describedby="dialog-desc-3">
          <mui-heading size="4" level="4" slot="title" id="dialog-title-3">Keyboard Shortcuts</mui-heading>

          <span id="dialog-desc-3" class="visually-hidden">
            This dialog lists available keyboard shortcuts for saving and undoing actions.
          </span>

          <mui-list as="ul">
            <mui-list-item>'Ctrl + S' to save</mui-list-item>
            <mui-list-item>'Ctrl + Z' to undo your last action.</mui-list-item>
          </mui-list>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          .visually-hidden {<br>
          &nbsp;&nbsp;position: absolute;<br>
          &nbsp;&nbsp;width: 1px;<br>
          &nbsp;&nbsp;height: 1px;<br>
          &nbsp;&nbsp;padding: 0;<br>
          &nbsp;&nbsp;margin: -1px;<br>
          &nbsp;&nbsp;overflow: hidden;<br>
          &nbsp;&nbsp;clip: rect(0,0,0,0);<br>
          &nbsp;&nbsp;white-space: nowrap;<br>
          &nbsp;&nbsp;border: 0;<br>
          }<br>
          <br>

          &lt;mui-button variant="primary" data-dialog="hook-3"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-3" width="400px" aria-labelledby="dialog-title-3" aria-describedby="dialog-desc-3"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-3"&gt;Keyboard Shortcuts&lt;/mui-heading&gt;<br>


            <br>

            &nbsp;&nbsp;&lt;span id="dialog-desc-3" class="visually-hidden"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;This dialog lists available keyboard shortcuts for saving and undoing actions.<br>
            &nbsp;&nbsp;&lt;/span&gt;<br>

            <br>
            &nbsp;&nbsp;&lt;mui-list as="ul"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-list-item&gt;'Ctrl + S' to save&lt;/mui-list-item&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-list-item&gt;'Ctrl + Z' to undo your last action.&lt;/mui-list-item&gt;<br>
            &nbsp;&nbsp;&lt;/mui-list&gt;<br>
            <br>

          &lt;/mui-dialog&gt;

          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;});<br>
          });<br>
          <br>

        </story-code-block>
      </story-card>

      <!-- Media Dialog with Close Action -->
      <story-card title="Media Dialog w/ Close">
        <mui-button data-dialog="hook-4" slot="body">Open Preview</mui-button>
        <mui-dialog data-dialog="hook-4" width="600px" slot="body" aria-labelledby="dialog-title-4" aria-describedby="dialog-desc-4">
          <mui-heading size="4" level="4" slot="title" id="dialog-title-4">Preview Card</mui-heading>

          <span id="dialog-desc-4" class="visually-hidden">
            This card preview shows a Visa Debit card with masked number ending 1234.
          </span>

          <mui-v-stack space="var(--space-200)" alignX="center" style="padding: var(--space-800) 0;">
            <mui-smart-card
              variant="plain"
              partner="${VisaBlack}"
              type="Debit"
              number="1234"
              logo="${Guides}"
              logo-height="80"
              bg-color="#a4fc67"
            >
            </mui-smart-card>
          </mui-v-stack>

        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          .visually-hidden {<br>
          &nbsp;&nbsp;position: absolute;<br>
          &nbsp;&nbsp;width: 1px;<br>
          &nbsp;&nbsp;height: 1px;<br>
          &nbsp;&nbsp;padding: 0;<br>
          &nbsp;&nbsp;margin: -1px;<br>
          &nbsp;&nbsp;overflow: hidden;<br>
          &nbsp;&nbsp;clip: rect(0,0,0,0);<br>
          &nbsp;&nbsp;white-space: nowrap;<br>
          &nbsp;&nbsp;border: 0;<br>
          }<br>
          <br>

          &lt;mui-button variant="primary" data-dialog="hook-4"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-4" width="600px" aria-labelledby="dialog-title-4" aria-describedby="dialog-desc-4"&gt;<br>

            <br>
          
            &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-4"&gt;Preview Card&lt;/mui-heading&gt;<br>

            <br>

            &nbsp;&nbsp;&lt;span id="dialog-desc-4" class="visually-hidden"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;This card preview shows a Visa Debit card with masked number ending 1234.<br>
            &nbsp;&nbsp;&lt;/span&gt;<br>

            <br>

            &nbsp;&nbsp;&lt;mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-smart-card&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-smart-card&gt;<br>
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &lt;/mui-dialog&gt;

          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;});<br>
          });<br>
          <br>

        </story-code-block>
      </story-card>

      <!-- Loading / Progress Dialog -->
      <story-card title="Loading Dialog">
        <mui-button data-dialog="hook-5" slot="body">Start Upload</mui-button>
        <mui-dialog data-dialog="hook-5" width="500px" slot="body" aria-labelledby="dialog-title-5" aria-describedby="dialog-desc-5">
          <mui-heading size="4" level="4" slot="title" id="dialog-title-5">Uploading</mui-heading>
          <mui-v-stack space="var(--space-400)" alignX="center" style="padding: var(--space-800) 0;">
            <mui-progress style="width: 55%" state="pending"></mui-progress>
            <mui-loader loading animation="pulsate" duration="3s">
              <mui-body size="small" id="dialog-desc-5">Uploading your files… please wait.</mui-body>
            </mui-loader>
          </mui-v-stack>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="primary" data-dialog="hook-5"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-5" width="300px" aria-labelledby="dialog-title-5" aria-describedby="dialog-desc-5"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-5"&gt;Uploading&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-loader loading animation="pulsate" duration="1.5s"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body id="dialog-desc-5"&gt;Uploading your files… please wait.&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-loader&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &lt;/mui-dialog&gt;
          
          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;});<br>
          });<br>

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

    // Open dialog buttons
    this.shadowRoot.querySelectorAll("mui-button[data-dialog]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-dialog");
        const dialog = this.shadowRoot.querySelector(`mui-dialog[data-dialog="${target}"]`);
        if (dialog) dialog.setAttribute("open", "");
      });
    });

    // Close buttons inside each dialog
    this.shadowRoot.querySelectorAll("mui-dialog[data-dialog]").forEach((dialog) => {
      dialog.querySelectorAll("mui-button[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => dialog.removeAttribute("open"));
      });
    });
  }
}

customElements.define("story-dialog", storyDialog);
