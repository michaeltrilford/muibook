import VisaBlack from "../../../images/networks/visa-black.svg";
import Guides from "../../../images/guru/guides.svg";

class storyDialog extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; } 
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
        options: "",
        default: "",
        description:
          "Recommended to pair with an element that has the same data-dialog value to open the dialog. Refer to code examples.",
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
        <mui-dialog data-dialog="hook-1" width="400px" slot="body">
          <mui-heading size="4" level="4" slot="title">Dialog Title</mui-heading>
          <mui-body>This is some dialog content</mui-body>
          <mui-button slot="actions" variant="secondary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="primary">Confirm</mui-button>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="primary" data-dialog="hook-1"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-1" width="400px"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Dialog Title&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;This is some dialog content&lt;/mui-body&gt;<br>
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

        <mui-dialog data-dialog="hook-2" width="400px" slot="body">
          <mui-heading size="4" level="4" slot="title">Delete repository?</mui-heading>
          <mui-body>Are you sure you want to delete this item? This action cannot be undone.</mui-body>
          <mui-button slot="actions" variant="secondary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="attention">Delete this repository</mui-button>
        </mui-dialog>

        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="attention" data-dialog="hook-2"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-2" width="400px"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Delete repository?&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Are you sure you want to delete this item? This action cannot be undone.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Cancel&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&lt;mui-button slot="actions" variant="attention"&gt;Delete this repository&lt;/mui-button&gt;<br>


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
        <mui-dialog data-dialog="hook-3" width="400px" slot="body">
          <mui-heading size="4" level="4" slot="title">Keyboard Shortcuts</mui-heading>
          <mui-list as="ul">
            <mui-list-item>'Ctrl + S' to save</mui-list-item>
            <mui-list-item>'Ctrl + Z' to undo your last action.</mui-list-item>
          </mui-list>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="primary" data-dialog="hook-3"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-3" width="400px"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Keyboard Shortcuts&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&lt;mui-body&gt;Use &lt;kbd&gt;Ctrl + S&lt;/kbd&gt; to save and &lt;kbd&gt;Ctrl + Z&lt;/kbd&gt; to undo your last action.&lt;/mui-body&gt;<br>
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
        <mui-dialog data-dialog="hook-4" width="600px" slot="body">
          <mui-heading size="4" level="4" slot="title">Preview Card</mui-heading>
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

          &lt;mui-button variant="primary" data-dialog="hook-4"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-4" width="600px"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Preview Card&lt;/mui-heading&gt;<br>
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
        <mui-dialog data-dialog="hook-5" width="500px" slot="body">
          <mui-heading size="4" level="4" slot="title">Uploading</mui-heading>
          <mui-v-stack space="var(--space-200)" alignX="center" style="padding: var(--space-800) 0;">
            <mui-loader loading animation="pulsate" duration="1.5s">
              <mui-body>Uploading your files… please wait.</mui-body>
            </mui-loader>
          </mui-v-stack>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="primary" data-dialog="hook-5"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-5" width="300px"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Uploading&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-loader loading animation="pulsate" duration="1.5s"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Uploading your files… please wait.&lt;/mui-body&gt;<br>
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Dialog" 
        description="A modal window that prompts users to take a specific action or provide additional information without navigating away from the current context."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-dialog/index.ts"
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
