class storyDrawer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .canvas {
        background: var(--surface);
        padding: 1px;
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }

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

      .page-header {
        background: var(--surface-elevated-100);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-400) var(--space-400) var(--space-400) var(--space-500);
        border-bottom: var(--border-thin);
        box-sizing: border-box;
        min-height: 7.7rem;
      }

      .page-main {
        background: var(--surface-elevated-200);
      }

      .page-content {
        padding: var(--space-500) var(--space-500);
        box-sizing: border-box;
        overflow: scroll;
      }

      .persistent-content {
        padding: var(--space-500) var(--space-500);
        box-sizing: border-box;
        height: calc(100dvh - (7.7rem  + (env(safe-area-inset-top) + env(safe-area-inset-bottom)) ));
        overflow: scroll;
      }

      @media (max-width: 768px) {
        .page-content,
        .persistent-content {
          height: auto;
        }
      }
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
        name: "open",
        type: "boolean",
        options: "",
        default: "",
        description:
          "Pair with state to toggle the visibility of the dialog. Alternatively, use an element with the same data-drawer value to open the dialog.",
      },
      {
        name: "data-drawer",
        type: "boolean",
        options: "",
        default: "",
        description:
          "Recommended to pair with an element that has the same data-drawer value to open the dialog. Refer to code examples.",
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

    const invoiceHeader = /*html*/ `
      <mui-h-stack space="var(--space-300)" alignY="center">
        <mui-heading size="4" level="4">New Invoice</mui-heading>
        <mui-badge>Preview</mui-badge>
      </mui-h-stack>
    `;

    const content = /*html*/ `
      <mui-v-stack space="var(--space-300);">
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
      </mui-v-stack>
    `;

    const invoice = /*html*/ `
      <mui-v-stack space="var(--space-600);" style="margin-bottom: var(--space-500)">
      
        <mui-h-stack alignX="space-between">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>  
            <div style="height:var(--heading-font-size-100); width: 200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-400); min-width: 80px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-100); min-width: 80px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-h-stack>

        <mui-v-stack alignX="stretch" space="var(--space-300);">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100);">
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-v-stack>

      </mui-v-stack>
    `;

    const bill = /*html*/ `
      <mui-v-stack space="var(--space-600);" style="margin-bottom: var(--space-500)">

        <mui-h-stack alignX="space-between">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-100); width: 60px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-400); width: 100px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100);" alignX="end">
            <div style="height: 0.8rem; width: 40px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 0.8rem; width: 60px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 0.8rem; width: 30px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-h-stack>

        <mui-grid col="1fr auto">
          <mui-v-stack space="var(--space-300);" alignX="end">
            <div style="height: 9.6rem; width: 180px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-grid>

        <mui-v-stack alignX="stretch" space="var(--space-300);">
          <mui-v-stack space="var(--space-300);">
            <div style="height: 1.6rem; width: 90px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>

          <mui-v-stack space="var(--space-100);">
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-v-stack>

      </mui-v-stack>
    `;

    const stories = /*html*/ `
    
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-drawer";<br>
        </mui-code>
      </spec-card>

      <mui-v-stack space="var(--space-400)">
        <props-card title="Drawer">
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

      <story-card title="Overlay Drawer: Left" description="The drawer is positioned fixed to the viewport edge">
        <mui-button variant="primary" data-drawer="drawer-1" slot="body">Open Overlay Drawer</mui-button>
        
        <mui-drawer variant="overlay" data-drawer="drawer-1" width="400px" side="left" slot="body" z-index="200">
          <mui-heading size="4" level="4" slot="title">Overlay Drawer</mui-heading>
            ${content}
          <mui-button slot="actions" variant="secondary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="primary">Confirm</mui-button>
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="drawer-1"&gt;Open Overlay Drawer&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="drawer-1" width="400px" side="right"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Overlay Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&lt;mui-body&gt;This drawer overlays content and can be dismissed.&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>

      <story-card title="Overlay Drawer: Right" description="The drawer is positioned fixed to the viewport edge">
        <mui-button variant="primary" data-drawer="drawer-2" slot="body">Open Overlay Drawer</mui-button>
        
        <mui-drawer variant="overlay" data-drawer="drawer-2" width="400px" side="right" slot="body" z-index="200">
          <mui-heading size="4" level="4" slot="title">Overlay Drawer</mui-heading>
          ${content}
          <mui-button slot="actions" variant="secondary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="primary">Confirm</mui-button>
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="drawer-1"&gt;Open Overlay Drawer&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="drawer-1" width="400px" side="right"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Overlay Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&lt;mui-body&gt;This drawer overlays content and can be dismissed.&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>

      <story-card title="Left-side: Push Drawer" description="The Push Drawer slides in from the left and shifts the page content to the right. This variant is intended for full-screen page views rather than smaller page sections. It creates a clear separation between the drawer and the main content, keeping focus while ensuring the full page remains accessible. On mobile, the drawer overlays the content. If a different mobile experience is needed, state or media queries can be used to swap the component for a layout better suited to small screens.">
        <div class="canvas" slot="body">  
          <mui-drawer variant="push" data-drawer="drawer-3" width="320px" side="left" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right">
                  <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
                  <mui-button variant="tertiary" data-drawer="drawer-3">Edit Details</mui-button>
                  <mui-button disabled variant="tertiary">Add line-item</mui-button>
                </mui-dropdown>
              </div>
              <div class="page-content">
                ${invoice}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Invoice Details</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Customer" value="Hank Barry"></mui-input>
                <mui-input label="Invoice ID" value="IV001"></mui-input>
                <mui-input label="Purchase ID" value="9900"></mui-input>
                <mui-input label="Issued" value="16/10/2025"></mui-input>
                <mui-input label="Due" value="15/11/2025"></mui-input>
                <mui-input label="Invoice note" value="Thank you for your business Hank, we hope you enjoy the delicious product - Wendy"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" data-close>Cancel</mui-button>
            <mui-button slot="actions" variant="primary">Save</mui-button>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-grid col="1fr auto"&gt;<br>
          &nbsp;&nbsp;&lt;mui-container&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Main body content goes here.&lt;/p&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="primary" data-drawer="drawer-3"&gt;Open Drawer&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;/mui-container&gt;<br><br>
          &nbsp;&nbsp;&lt;mui-drawer variant="push" data-drawer="drawer-3" width="300px" side="left"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Push Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;This drawer pushes content aside.&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Close&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;/mui-drawer&gt;<br>
          &lt;/mui-grid&gt;
        </story-code-block>
      </story-card>

      <story-card title="Right-side: Push Drawer" 
        description="The Push Drawer slides in from the right and shifts the page content to the left. This variant is intended for full-screen page views rather than smaller page sections. It creates a clear separation between the drawer and the main content, keeping focus while ensuring the full page remains accessible. On mobile, the drawer overlays the content. If a different mobile experience is needed, state or media queries can be used to swap the component for a layout better suited to small screens.">
        <div class="canvas" slot="body">
          <mui-drawer slot="body" variant="push" data-drawer="drawer-4" width="320px" side="right" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right">
                  <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
                  <mui-button variant="tertiary" data-drawer="drawer-4">Edit Details</mui-button>
                  <mui-button disabled variant="tertiary">Add line-item</mui-button>
                </mui-dropdown>
              </div>
              <div class="page-content">
                ${invoice}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Invoice Details</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Customer" value="Hank Barry"></mui-input>
                <mui-input label="Invoice ID" value="IV001"></mui-input>
                <mui-input label="Purchase ID" value="9900"></mui-input>
                <mui-input label="Issued" value="16/10/2025"></mui-input>
                <mui-input label="Due" value="15/11/2025"></mui-input>
                <mui-input label="Invoice note" value="Thank you for your business Hank, we hope you enjoy the delicious product - Wendy"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" data-close>Cancel</mui-button>
            <mui-button slot="actions" variant="primary">Save</mui-button>
          </mui-drawer>
        </div>  
        <story-code-block slot="footer" scrollable>
          &lt;mui-grid col="1fr auto"&gt;<br>
          &nbsp;&nbsp;&lt;mui-container&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Main body content goes here.&lt;/p&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="primary" data-drawer="drawer-2"&gt;Open Drawer&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;/mui-container&gt;<br><br>
          &nbsp;&nbsp;&lt;mui-drawer variant="push" data-drawer="drawer-2" width="300px" side="left"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Push Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;This drawer pushes content aside.&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Close&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;/mui-drawer&gt;<br>
          &lt;/mui-grid&gt;
        </story-code-block>
      </story-card>

      <story-card title="Right-side: Persistent Drawer" description="The Persistent Drawer remains fixed in place without sliding in or out. Positioned on the right side of the main content and becomes part of the layout itself. On mobile, the view naturally stacks vertically. If a different mobile experience is required, you can use state or media queries to switch the component to an alternative layout that better suits small screens.">
        <div class="canvas" slot="body">
          <mui-drawer variant="persistent" width="320px" slot="body" side="right" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                <mui-heading size="4" level="4">Smart Bills</mui-heading>
              </div>
              <div class="page-content">
                ${bill}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Review Items</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Item" value="Hank Barry"></mui-input>
                <mui-input label="Description" value="Telstra Upfront 5G Internet"></mui-input>
                <mui-input label="Allocate to" value="Internet"></mui-input>
                <mui-input label="Qty" value="1"></mui-input>
                <mui-input label="Unit price" value="85.50"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary">Back</mui-button>
            <mui-button slot="actions" variant="primary">Next</mui-button>
          </mui-drawer>
        </div>  
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="persistent" data-drawer="drawer-4" width="250px" side="left"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Persistent Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&lt;mui-body&gt;Always visible, no close button.&lt;/mui-body&gt;<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card title="Left-side: Persistent Drawer" description="The Persistent Drawer remains fixed in place without sliding in or out. Positioned on the left side of the main content and becomes part of the layout itself. On mobile, the view naturally stacks vertically. If a different mobile experience is required, you can use state or media queries to switch the component to an alternative layout that better suits small screens.">
        <div class="canvas" slot="body">
          <mui-drawer variant="persistent" width="320px" slot="body" side="left" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                <mui-heading size="4" level="4">Smart Bills</mui-heading>
              </div>
              <div class="page-content">
                ${bill}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Review Items</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Item" value="Hank Barry"></mui-input>
                <mui-input label="Description" value="Telstra Upfront 5G Internet"></mui-input>
                <mui-input label="Allocate to" value="Internet"></mui-input>
                <mui-input label="Qty" value="1"></mui-input>
                <mui-input label="Unit price" value="85.50"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary">Back</mui-button>
            <mui-button slot="actions" variant="primary">Next</mui-button>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="persistent" width="250px" side="left"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Persistent Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&lt;mui-body&gt;Always visible, no close button.&lt;/mui-body&gt;<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>



    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Drawer (WIP)" 
        description="A drawer view that prompts users to take a specific action or provide additional information without navigating away from the current context."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-dialog/index.ts"
        accessibility="
          Uses role='dialog' and aria-modal='true' for screen readers.;
          Focus is managed by the browser’s native dialog behavior when open.;
          The close button includes aria-label='Close Icon'.;
          Footer is hidden when empty to reduce screen reader noise.;
          Clicking the backdrop closes the dialog.;
          No extra labels are required from the consumer. Accessible by default.
        "
      >
        ${stories}
      </story-template>
    `;

    // Open dialog buttons
    this.shadowRoot.querySelectorAll("mui-button[data-drawer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-drawer");
        const drawer = this.shadowRoot.querySelector(`mui-drawer[data-drawer="${target}"]`);
        if (drawer) drawer.setAttribute("open", "");
      });
    });

    // Close buttons inside each dialog
    this.shadowRoot.querySelectorAll("mui-drawer[data-drawer]").forEach((drawer) => {
      drawer.querySelectorAll("mui-button[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => drawer.removeAttribute("open"));
      });
    });
  }
}

customElements.define("story-drawer", storyDrawer);
