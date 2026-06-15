import { getComponentDocs } from "../../../utils/story-data";
import MikeAvatar from "../../../images/mui/avatar-mike.jpg";

class storyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Button");
    const attrsReference = JSON.stringify([
      {
        component: "mui-button",
        parentAttrs: ["has-before", "has-after", "icon-only", "avatar-only"],
        childAttrs: [],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

      .overlay-canvas {
        position: relative;
        min-height: calc(var(--space-800) + var(--space-700));
        border-radius: var(--radius-200);
        border: var(--border-thin);
        border-color: var(--form-default-border-color);
        overflow: hidden;
        box-shadow: var(--shadow-medium);
        display: flex;
        align-items: end;
        justify-content: start;
        padding: var(--space-200);
        box-sizing: border-box;
      }

      .overlay-canvas::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(
            180deg,
            color-mix(in srgb, var(--canvas-tint, var(--grey-1200)) 20%, transparent) 0%,
            color-mix(in srgb, var(--canvas-tint, var(--grey-1200)) 58%, transparent) 100%
          ),
          var(--canvas-image) center / cover no-repeat;
        filter: saturate(0.9);
      }

      .overlay-canvas > * {
        position: relative;
        z-index: 1;
      }

    `;

    const stories = /*html*/ `
      <mui-v-stack space="var(--space-100)">
        <story-api-types tag="mui-button" title="Button"></story-api-types>

        <story-api-types tag="mui-button-group" title="Button Group"></story-api-types>
      </mui-v-stack>

      <story-card title="Form submissions" id="form-submissions" description="Unfortunately, Web Components can’t rely on type='submit' to handle form submissions due to Shadow DOM boundaries. Instead, manual submission logic needs to be applied to ensure expected behavior.">
        <mui-button variant="primary" slot="body">Sign up</mui-button>
        <story-code-block slot="footer" scrollable>
        <mui-link size="x-small" href="/onboarding">👨‍💻 View working file</mui-link>
        <br>
        <br>
        const&nbsp;signUpButton&nbsp;=&nbsp;this.shadowRoot.querySelector("mui-button");<br /><br />
        if&nbsp;(signUpButton)&nbsp;{<br />
        &nbsp;&nbsp;&nbsp;&nbsp;signUpButton.addEventListener("click",&nbsp;()&nbsp;=&gt;&nbsp;this.handleSubmit());<br />
        }<br /><br />
        &lt;mui-button&nbsp;variant="primary"&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;...<br />
        &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Inline Async Feedback"
        id="inline-async-feedback"
        description="Use short-lived button text changes to confirm local async actions in place. This keeps feedback attached to the control that started the work instead of sending users to a toast or global notification."
        usage="
          Use for quick async actions like copying, saving, adding, or syncing|||
          Keep the pending and success labels short so button width stays stable|||
          Use pending while the action is in flight to prevent duplicate requests without disabled styling|||
          Reset to the original label after the user has had time to read the success state
        "
      >
        <mui-v-stack slot="body" alignx="start" space="var(--space-100)">
          <mui-button
            size="small"
            variant="secondary"
            data-async-feedback
            data-default-label="Copy"
            data-pending-label="Copying"
            data-success-label="Copied"
          >
            Copy
          </mui-button>
          <mui-button
            size="small"
            variant="secondary"
            data-async-feedback
            data-default-label="Save"
            data-pending-label="Saving"
            data-success-label="Saved"
          >
            Save
          </mui-button>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          // Construct inline async feedback by changing the button state around the real async task.<br />
          // The pending prop prevents duplicate activation without applying disabled styling.<br />
          // The delay below only fakes async work for this demo; replace it with your real copy, save, or sync request.<br />
          <br />
          const button = this.shadowRoot.querySelector("[data-async-feedback]");<br />
          const delay = (duration) =&gt; new Promise((resolve) =&gt; setTimeout(resolve, duration));<br />
          <br />
          button.addEventListener("click", async () =&gt; {<br />
          &nbsp;&nbsp;if (button.hasAttribute("pending")) return;<br />
          <br />
          &nbsp;&nbsp;// Set pending while work is in flight.<br />
          &nbsp;&nbsp;button.setAttribute("pending", "");<br />
          <br />
          &nbsp;&nbsp;// Pending: show a spinner beside the in-progress label.<br />
          &nbsp;&nbsp;button.innerHTML = '&lt;mui-spinner slot="before" size="x-small"&gt;&lt;/mui-spinner&gt;' + button.dataset.pendingLabel;<br />
          <br />
          &nbsp;&nbsp;await delay(900); // Replace with await saveChanges(), navigator.clipboard.writeText(), etc.<br />
          &nbsp;&nbsp;// Success: briefly confirm completion with a check icon.<br />
          &nbsp;&nbsp;button.innerHTML = '&lt;mui-icon-check slot="before" size="x-small"&gt;&lt;/mui-icon-check&gt;' + button.dataset.successLabel;<br />
          <br />
          &nbsp;&nbsp;await delay(1400); // Optional: keep success visible long enough to read.<br />
          &nbsp;&nbsp;// Reset: return the control to its original label.<br />
          &nbsp;&nbsp;button.textContent = button.dataset.defaultLabel;<br />
          &nbsp;&nbsp;button.removeAttribute("pending");<br />
          });<br />
          <br />
          &lt;mui-button data-async-feedback&gt;Copy&lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="size-xx-small"
        title="Size: XX-Small"
        description="Ultra-compact button size for dense utility actions."
      >
        <mui-h-stack slot="body" alignx="start" space="var(--space-100)">
          <mui-button size="xx-small" variant="tertiary">Edit</mui-button>
          <mui-button size="xx-small" variant="primary">Save</mui-button>
          <mui-button size="xx-small" variant="primary" icon-only>
            <mui-icon-add></mui-icon-add>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="xx-small" variant="primary"&gt;Save&lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="size-x-small"
        title="Size: X-Small" 
        description="When a button includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the button will respect the value you set."
        usage="
          Micro-interactions that require clear, compact buttons|||
          Application toolbars|||
          Dense data tables|||
          Compact control panels|||
          Icon buttons in tight spaces|||
          Inline editing actions
        "
      >    

        <mui-v-stack slot="body" alignx="stretch">
          <mui-h-stack alignx="end" alignY="center" space="var(--space-300)">
            <mui-h-stack alignx="start" space="var(--space-050)">
              <mui-button size="x-small" variant="tertiary">Make offer</mui-button>
              <mui-button size="x-small" variant="primary">Buy now</mui-button>
            </mui-h-stack>
            <mui-rule
              direction="vertical"
              length="var(--space-500)">
            </mui-rule>
            <mui-body size='x-small' weight="bold">0.06 GWEI</mui-body>
          </mui-h-stack>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into a button, it automatically inherits the button’s default icon size (size="x-small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>

          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size='x-small' variant="primary">
              Add New
              <mui-icon-add slot="before"></mui-icon-add>
            </mui-button>

            <mui-button size='x-small' variant="primary">
              More
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>

            <mui-button size='x-small' variant="primary">
              <mui-icon-add></mui-icon-add>
            </mui-button>
          </mui-h-stack>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Toggle Button / Icon-Only</mui-body>
            <mui-body size="small" style="max-width: 60ch;">Authors can provide a custom icon size when needed. In the example below, the x-small toggle button uses (size="x-small") to maintain visual balance.</mui-body>
          </mui-v-stack>
          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size="x-small" id="btn" variant="primary">
              <mui-icon-toggle size='small'>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-v-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="x-small"&gt;...&lt;/mui-button&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card
        id="size-small"
        title="Size: Small" 
        description="When a button includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the button will respect the value you set."
        usage=" 
          Small/medium form inputs|||
          Toolbar actions or discrete filter controls
        "
      >  
        <mui-v-stack slot="body">
          <mui-responsive breakpoint="1280">
            <mui-h-stack alignx="space-between" aligny="center" slot="showAbove" style="border-radius: var(--radius-200); background: var(--surface-elevated-100); padding: var(--space-400); padding-right: var(--space-500);">
              <mui-h-stack space="var(--space-300)">
              <mui-input size="small" label="Search" hide-label placeholder="Search by name, email, or ID..." style="min-width: 25rem; max-width: 25rem;"></mui-input>
              <mui-select size="small" label="Status" hide-label
                style="min-width: 12rem;"
                  options='[
                  {"value": "default", "label": "Pending"},
                  {"value": "active", "label": "Active"}
                ]'>
              </mui-select>
              </mui-h-stack>
              <mui-h-stack space="var(--space-400)" aligny="center">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-chip dismiss size="small">
                    Admin
                  </mui-chip>
                </mui-h-stack>
                <mui-button size="small" variant="tertiary">Reset Filter</mui-button>
              </mui-h-stack>
            </mui-h-stack>
            <mui-v-stack alignx="stretch" aligny="center" space="var(--space-300)" slot="showBelow" style="border-radius: var(--radius-100); background: var(--surface-elevated-100); padding: var(--space-400); padding-right: var(--space-500);">
              <mui-input label="Search" hide-label placeholder="Search by name, email, or ID..."></mui-input>
              <mui-select label="Status" hide-label
                  options='[
                  {"value": "default", "label": "Pending"},
                  {"value": "active", "label": "Active"}
                ]'>
              </mui-select>
              <mui-h-stack space="var(--space-400)" aligny="center" alignx="space-between">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-chip dismiss size="small">
                    Admin
                  </mui-chip>
                </mui-h-stack>
                <mui-button size="small" variant="tertiary">Reset Filter</mui-button>
              </mui-h-stack>
            </mui-v-stack>
          </mui-responsive>
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into a button, it automatically inherits the button’s default icon size (size="x-small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>

          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size='small' variant="primary">
              Add New
              <mui-icon-add slot="before"></mui-icon-add>
            </mui-button>
            <mui-button size='small' variant="primary">
              More
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>
            <mui-button size='small' variant="primary">
              <mui-icon-add></mui-icon-add>
            </mui-button>
          </mui-h-stack>
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Toggle Button / Icon-Only</mui-body>
            <mui-body size="small" style="max-width: 60ch;">Authors can provide a custom icon size when needed. In the example below, the small toggle button uses (size="small") to maintain visual balance.</mui-body>
          </mui-v-stack>
          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size="small" id="btn" variant="primary">
              <mui-icon-toggle size='small'>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-v-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="small"&gt;...&lt;/mui-button&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card
        id="size-medium"
        title="Size: Medium (Default)" 
        description="When a button includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the button will respect the value you set."
        usage=" 
          Standard form inputs (text fields, selects)|||
          Card components (primary and secondary actions)|||
          Modal dialogs|||
          Navigation elements|||
          Default body text context
        "
      >
        <mui-v-stack slot="body">
          <mui-card>
            <mui-card-header>
              <mui-heading size="3">Header</mui-heading>
            </mui-card-header>
            <mui-card-body>Body content...</mui-card-body>
            <mui-card-footer>
              <mui-button-group right>
                <mui-button variant="secondary">Cancel</mui-button>
                <mui-button variant="primary">Submit</mui-button>
              </mui-button-group>
            </mui-card-footer>
          </mui-card>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into a button, it automatically inherits the button’s default icon size (size="small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>

          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button variant="primary">
              Add New
              <mui-icon-add slot="before"></mui-icon-add>
            </mui-button>
            <mui-button variant="primary">
              More
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-add size="small"></mui-icon-add>
            </mui-button>
          </mui-v-stack>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Input Usage</mui-body>
            <mui-body size="small" style="max-width: 64ch;">Only the medium-sized input supports the before and after slots. These slots are not available for small or large input variants.</mui-body>
          </mui-v-stack>

          <mui-input label="Enter amount">
            <mui-button slot="before">
              Action
              <mui-icon-globe slot="before"></mui-icon-globe>
            </mui-button>
            <mui-button slot="after">
              Action
              <mui-icon-globe slot="after"></mui-icon-globe>
            </mui-button>
          </mui-input>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Toggle Button / Icon-Only</mui-body>
            <mui-body size="small" style="max-width: 60ch;">Authors can provide a custom icon size when needed. In the example below, the medium toggle button uses (size="medium") to maintain visual balance.</mui-body>
          </mui-v-stack>
          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size="medium" id="btn" variant="primary">
              <mui-icon-toggle size='medium'>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-v-stack>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="medium"&gt;...&lt;/mui-button&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card
        id="size-large"
        title="Size: Large" 
        description="When a button includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the button will respect the value you set."
        usage=" 
          Large headings (H1, H2)|||
          Hero sections|||
          Large form inputs (search bars, prominent forms)|||
          Empty states with calls-to-action|||
          Marketing/landing page content
        "
      >
        <mui-v-stack slot="body">
          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into a button, it automatically inherits the button’s default icon size (size="medium"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>
          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size='large' variant="primary">
              Add New
              <mui-icon-add slot="before"></mui-icon-add>
            </mui-button>
            <mui-button size='large' variant="primary">
              More
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>
            <mui-button size='large' variant="primary">
              <mui-icon-add></mui-icon-add>
            </mui-button>
          </mui-v-stack>
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>
          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Toggle Button / Icon-Only</mui-body>
            <mui-body size="small" style="max-width: 60ch;">Authors can provide a custom icon size when needed. In the example below, the large toggle button uses (size="large") to maintain visual balance.</mui-body>
          </mui-v-stack>
          <mui-button size="large" id="btn" variant="primary">
            <mui-icon-toggle size="large">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="large"&gt;...&lt;/mui-button&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card title="Primary" id="primary">
        <mui-button variant="primary" slot="body">Submit</mui-button>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Secondary" id="secondary">
        <mui-button variant="secondary" slot="body">Cancel</mui-button>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="secondary"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Tertiary" id="tertiary">
        <mui-button variant="tertiary" slot="body">Cancel</mui-button>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="tertiary"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Attention" id="attention">
        <mui-button variant="attention" slot="body">Delete</mui-button>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="attention"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Stroke: Ring"
        id="stroke-ring"
        description="If you prefer using a ring shadow to style your borders, you can adopt that approach."
        usage='
          Use stroke="ring" to draw the button stroke with an inset shadow instead of a physical border.|||
          Prefer ring when you want to adjust the visible stroke without changing the button height, padding, or alignment against adjacent controls.|||
          Pair stroke="ring" with inputs or selects when you want an action to visually align with a thinner form-control stroke.|||
          Use stroke-ring-size="100" for the default ring. This maps to var(--stroke-size-100).|||
          Increase stroke-ring-size when the ring needs more visual contrast; supported token values are 100 through 500.
        '
      >
        <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
          <mui-button size="xx-small" variant="secondary" stroke="ring">XX-Small</mui-button>
          <mui-button size="x-small" variant="secondary" stroke="ring">X-Small</mui-button>
          <mui-button size="small" variant="secondary" stroke="ring">Small</mui-button>
          <mui-button size="medium" variant="secondary" stroke="ring">Medium</mui-button>
          <mui-button size="large" variant="secondary" stroke="ring">Large</mui-button>
          <mui-rule direction="horizontal" length="100%"></mui-rule>
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="start" wrap="wrap">
            <mui-button variant="primary" stroke="ring">Primary</mui-button>
            <mui-button variant="secondary" stroke="ring">Secondary</mui-button>
            <mui-button variant="tertiary" stroke="ring">Tertiary</mui-button>
            <mui-button variant="attention" stroke="ring">Attention</mui-button>
          </mui-h-stack>
          <mui-rule direction="horizontal" length="100%"></mui-rule>
          <mui-v-stack space="var(--space-100)" alignx="start">
            <mui-body size="small" weight="bold">Select + Action</mui-body>
            <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
              <mui-select
                size="small"
                label="Status"
                hide-label
                style="min-width: 14rem;"
                options='[
                  {"value": "default", "label": "Pending"},
                  {"value": "active", "label": "Active"}
                ]'>
              </mui-select>
              <mui-button size="small" variant="secondary" stroke="ring">Apply</mui-button>
            </mui-h-stack>
          </mui-v-stack>
          <mui-rule direction="horizontal" length="100%"></mui-rule>
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="start" wrap="wrap">
            <mui-button variant="secondary" stroke="ring" stroke-ring-size="100">100</mui-button>
            <mui-button variant="secondary" stroke="ring" stroke-ring-size="200">200</mui-button>
            <mui-button variant="secondary" stroke="ring" stroke-ring-size="300">300</mui-button>
            <mui-button variant="secondary" stroke="ring" stroke-ring-size="400">400</mui-button>
            <mui-button variant="secondary" stroke="ring" stroke-ring-size="500">500</mui-button>
          </mui-h-stack>
          <mui-rule direction="horizontal" length="100%"></mui-rule>
          <div
            class="overlay-canvas"
            style="
              --canvas-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80');
              --canvas-tint: var(--grey-1200);
              padding: var(--space-300);
            "
          >
            <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
              <mui-button variant="overlay" stroke="ring">Overlay</mui-button>
            </mui-h-stack>
          </div>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="xx-small" variant="secondary" stroke="ring"&gt;XX-Small&lt;/mui-button&gt;<br />
          &lt;mui-button size="x-small" variant="secondary" stroke="ring"&gt;X-Small&lt;/mui-button&gt;<br />
          &lt;mui-button size="small" variant="secondary" stroke="ring"&gt;Small&lt;/mui-button&gt;<br />
          &lt;mui-button size="medium" variant="secondary" stroke="ring"&gt;Medium&lt;/mui-button&gt;<br />
          &lt;mui-button size="large" variant="secondary" stroke="ring"&gt;Large&lt;/mui-button&gt;<br /><br />
          &lt;mui-button variant="primary" stroke="ring"&gt;Primary&lt;/mui-button&gt;<br />
          &lt;mui-button variant="secondary" stroke="ring"&gt;Secondary&lt;/mui-button&gt;<br />
          &lt;mui-button variant="tertiary" stroke="ring"&gt;Tertiary&lt;/mui-button&gt;<br />
          &lt;mui-button variant="attention" stroke="ring"&gt;Attention&lt;/mui-button&gt;<br />
          &lt;mui-select size="small" label="Status" hide-label&gt;...&lt;/mui-select&gt;<br />
          &lt;mui-button size="small" variant="secondary" stroke="ring"&gt;Apply&lt;/mui-button&gt;<br />
          &lt;mui-button variant="secondary" stroke="ring" stroke-ring-size="100"&gt;100&lt;/mui-button&gt;<br />
          &lt;mui-button variant="secondary" stroke="ring" stroke-ring-size="500"&gt;500&lt;/mui-button&gt;<br />
          &lt;mui-button variant="overlay" stroke="ring"&gt;Overlay&lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Overlay" id="overlay" description="Overlay actions on image surfaces using the overlay variant.">
        <mui-grid slot="body" col="1fr 1fr" space="var(--space-200)">
          <div
            class="overlay-canvas"
            style="
              --canvas-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80');
              --canvas-tint: var(--grey-1200);
            "
          >
            <mui-button variant="overlay">Dismiss</mui-button>
          </div>

          <div
            class="overlay-canvas"
            style="
              --canvas-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80');
              --canvas-tint: var(--grey-1100);
            "
          >
            <mui-button variant="overlay" icon-only aria-label="Close">
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </div>
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="overlay"&gt;Dismiss&lt;/mui-button&gt;<br />
          &lt;mui-button variant="overlay" icon-only aria-label="Close"&gt;...&lt;/mui-button&gt;
        </story-code-block>
      </story-card>


      <story-card title="Disabled" id="disabled">
        <mui-v-stack slot="body" space="var(--space-200)" alignX="start">
          <mui-button disabled>Submit</mui-button>
          <mui-button disabled variant="primary">Submit</mui-button>
          <mui-button disabled variant="secondary">Submit</mui-button>
          <mui-button disabled variant="tertiary">Submit</mui-button>
          <mui-button disabled variant="attention">Submit</mui-button>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button disabled&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="button-group"
        title="Header: Button-Group" 
        description="Example of actions that are present at the top of a page or card use."
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group|||
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-button-group align="right" slot="body">
          <mui-button variant="secondary">
            Export
            <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>
            <mui-button variant="primary">
              New Report
            </mui-button>
        </mui-button-group>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button-group align="right"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button variant="secondary"&gt;...&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button variant="primary"&gt;...&lt;/mui-button&gt;
          <br />
          &lt;/mui-button-group&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="footer-button-group"
        title="Footer: Button-Group" 
        description="Example of actions in a card, dialog or drawer."
      >
        <mui-button-group align="right" slot="body">
          <mui-button variant="secondary">Cancel</mui-button>
          <mui-button variant="primary">Submit</mui-button>
        </mui-button-group>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button-group align="right"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button variant="secondary"&gt;...&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button variant="primary"&gt;...&lt;/mui-button&gt;
          <br />
          &lt;/mui-button-group&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="button-group-layout"
        title="Button-Group: Layout"
        description="Use layout to control the group direction."
        usage='
          Use layout=&quot;row|column&quot; to define the group direction|||
          Column layout is intended for full-width stacked actions
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-v-stack slot="body" space="var(--space-300)" alignX="stretch">
          <mui-button-group layout="row">
            <mui-button variant="secondary">Cancel</mui-button>
            <mui-button variant="primary">Submit</mui-button>
          </mui-button-group>
          <mui-button-group layout="column">
            <mui-button variant="secondary">Secondary</mui-button>
            <mui-button variant="primary">Primary</mui-button>
          </mui-button-group>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button-group layout="row"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant="secondary"&gt;Cancel&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant="primary"&gt;Submit&lt;/mui-button&gt;<br />
          &lt;/mui-button-group&gt;<br /><br />
          &lt;mui-button-group layout="column"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant="secondary"&gt;Secondary&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant="primary"&gt;Primary&lt;/mui-button&gt;<br />
          &lt;/mui-button-group&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="button-group-alignment"
        title="Button-Group: Alignment"
        description="Use align to control button-group placement."
        usage='
          Use align=&quot;left|right&quot; to control placement within row groups|||
          The legacy right attribute is deprecated; prefer align=&quot;right&quot;
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-v-stack slot="body" space="var(--space-300)" alignX="stretch">
          <mui-button-group layout="row" align="left">
            <mui-button variant="secondary">Back</mui-button>
            <mui-button variant="primary">Continue</mui-button>
          </mui-button-group>
          <mui-button-group layout="row" align="right">
            <mui-button variant="secondary">Back</mui-button>
            <mui-button variant="primary">Continue</mui-button>
          </mui-button-group>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button-group layout="row" align="right"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant="secondary"&gt;Back&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant="primary"&gt;Continue&lt;/mui-button&gt;<br />
          &lt;/mui-button-group&gt;
        </story-code-block>
      </story-card>

      <story-card title="Icon (Before & After)"
        id="icon-before-after"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group|||
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >

        <mui-v-stack slot="body" space="var(--space-200)" alignX="start">
          <mui-button 
            variant="primary">
              Add New
              <mui-icon-add slot="before"></mui-icon-add>
          </mui-button>
          <mui-button 
            variant="primary">
              More
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
          </mui-button>
        </mui-v-stack>
        
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary"&gt;
          <br />
          &nbsp;&nbsp;Add New
          <br>
          &nbsp;&nbsp;&lt;mui-icon-add slot="before"&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-button&gt;
          <br>
          <br>
          &lt;mui-button variant="primary"&gt;
          <br />
          &nbsp;&nbsp;More
          <br>
          &nbsp;&nbsp;&lt;mui-icon-down-chevron slot="after"&gt;&lt;/mui-icon-down-chevron&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Primary: Icon-Only"
        id="primary-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group|||
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-button variant="primary">Share</mui-button>
            <mui-button variant="primary"><mui-icon-menu></mui-icon-menu></mui-button>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-button variant="primary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Secondary: Icon-Only"
        id="secondary-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group|||
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-button variant="secondary">Share</mui-button>
            <mui-button variant="secondary"><mui-icon-menu></mui-icon-menu></mui-button>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-button variant="secondary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="secondary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="tertiary-icon-only"
        title="Tertiary: Icon-Only" 
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group|||
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-button variant="tertiary">Share</mui-button>
            <mui-button variant="tertiary"><mui-icon-menu></mui-icon-menu></mui-button>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-button variant="tertiary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="tertiary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Attention: Icon-Only"
        id="attention-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group|||
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-button variant="attention">Share</mui-button>
            <mui-button variant="attention"><mui-icon-menu></mui-icon-menu></mui-button>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-button variant="attention" >
            <mui-icon-warning size="medium"></mui-icon-warning>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="attention"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Avatar-only Button"
        id="avatar-only-button"
        description="When a button only contains an Avatar, it collapses to a primitive interactive wrapper and the avatar drives the final size."
        usage='
          Use this when the avatar itself is the visible action target|||
          The button keeps semantics and interaction states while the avatar controls the footprint
        '
      >
        <mui-h-stack slot="body" space="var(--space-200)" alignY="center">
          <mui-button data-dialog="button-avatar-dialog" aria-label="Open Mike profile dialog">
            <mui-avatar size="medium" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
          </mui-button>

          <mui-button data-dialog="button-avatar-dialog-2" aria-label="Open Mike profile dialog">
            <mui-avatar size="large" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
          </mui-button>
        </mui-h-stack>

        <mui-dialog
          data-dialog="button-avatar-dialog"
          width="400px"
          slot="body"
          aria-labelledby="button-avatar-dialog-title"
          aria-describedby="button-avatar-dialog-desc"
        >
          <mui-heading size="4" level="4" slot="title" id="button-avatar-dialog-title">Mike Trilford</mui-heading>
          <mui-body id="button-avatar-dialog-desc">
            This example shows an avatar-only button opening a dialog from the Button component page.
          </mui-body>
          <mui-button slot="footer" variant="tertiary" data-close>Close</mui-button>
        </mui-dialog>

        <mui-dialog
          data-dialog="button-avatar-dialog-2"
          width="400px"
          slot="body"
          aria-labelledby="button-avatar-dialog-title-2"
          aria-describedby="button-avatar-dialog-desc-2"
        >
          <mui-heading size="4" level="4" slot="title" id="button-avatar-dialog-title-2">Mike Trilford</mui-heading>
          <mui-body id="button-avatar-dialog-desc-2">
            Avatar-only buttons can be used as compact profile and account action triggers.
          </mui-body>
          <mui-button slot="footer" variant="tertiary" data-close>Close</mui-button>
        </mui-dialog>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button data-dialog=&quot;button-avatar-dialog&quot; aria-label=&quot;Open Mike profile dialog&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar size=&quot;medium&quot; image=&quot;${MikeAvatar}&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;/mui-button&gt;<br />
          <br />
          &lt;mui-dialog data-dialog=&quot;button-avatar-dialog&quot; width=&quot;400px&quot; aria-labelledby=&quot;button-avatar-dialog-title&quot; aria-describedby=&quot;button-avatar-dialog-desc&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-heading slot=&quot;title&quot; id=&quot;button-avatar-dialog-title&quot;&gt;Mike Trilford&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&lt;mui-body id=&quot;button-avatar-dialog-desc&quot;&gt;...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;footer&quot; variant=&quot;tertiary&quot; data-close&gt;Close&lt;/mui-button&gt;<br />
          &lt;/mui-dialog&gt;
        </story-code-block>
      </story-card>

      <story-card title="Icon Toggle: Default" id="icon-toggle-default"
        usage='
          Use medium size icon when the icon-only action appears on its own. E.g. Menu|||
          Use small (default) size icon when paired with text-based action is used in a button group.
        '
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button variant="primary">  
            <mui-icon-toggle size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="secondary">  
            <mui-icon-toggle size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="tertiary">  
            <mui-icon-toggle size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="attention">  
            <mui-icon-toggle size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          const btn = document.getElementById('btn');<br />
          const toggle = btn.querySelector('mui-icon-toggle');<br />
          <br />
          btn.addEventListener('click', () =&gt; {<br />
          &nbsp;&nbsp;toggle.toggle = !toggle.toggle;<br />
          &nbsp;&nbsp;toggle.setAttribute('aria-pressed', toggle.toggle);<br />
          });
          <br />
          <br />
          &lt;mui-button id="btn" variant="primary"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-toggle&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;<br />
          &nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Icon Toggle: Rotate" id="icon-toggle-rotate"
        usage='
          Use medium size icon when the icon-only action appears on its own. E.g. Menu|||
          Use small (default) size icon when paired with text-based action is used in a button group.
        '
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button variant="primary">  
            <mui-icon-toggle rotate size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="secondary">  
            <mui-icon-toggle rotate size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="tertiary">  
            <mui-icon-toggle rotate size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="attention">  
            <mui-icon-toggle rotate size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          const btn = document.getElementById('btn');<br />
          const toggle = btn.querySelector('mui-icon-toggle');<br />
          <br />
          btn.addEventListener('click', () =&gt; {<br />
          &nbsp;&nbsp;toggle.toggle = !toggle.toggle;<br />
          &nbsp;&nbsp;toggle.setAttribute('aria-pressed', toggle.toggle);<br />
          });
          <br />
          <br />
          &lt;mui-button id="btn" variant="primary"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-toggle rotate&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;<br />
          &nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template title="Button" 
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
        attrs-reference='${attrsReference}'
      
        imports='["@muibook/components/mui-button"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          limit="10"
          links="form-submissions::Form submissions|||inline-async-feedback::Inline Async Feedback|||size-x-small::Size: X-Small|||size-small::Size: Small|||size-medium::Size: Medium|||size-large::Size: Large|||primary::Primary|||secondary::Secondary|||stroke-ring::Stroke: Ring|||tertiary::Tertiary|||overlay::Overlay|||attention::Attention|||disabled::Disabled|||button-group::Header: Button-Group|||footer-button-group::Footer: Button-Group|||button-group-layout::Button-Group: Layout|||button-group-alignment::Button-Group: Alignment|||primary-icon-only::Primary: Icon-Only|||secondary-icon-only::Secondary: Icon-Only|||tertiary-icon-only::Tertiary: Icon-Only|||attention-icon-only::Attention: Icon-Only|||avatar-only-button::Avatar-only Button|||icon-toggle-default::Icon Toggle: Default|||icon-toggle-rotate::Icon Toggle: Rotate"
        ></story-quicklinks>

        ${stories}
      </story-template>
    `;

    const buttons = this.shadowRoot.querySelectorAll("mui-button");

    buttons.forEach((btn) => {
      const toggle = btn.querySelector("mui-icon-toggle");
      if (!toggle) return;

      btn.addEventListener("click", () => {
        toggle.toggle = !toggle.toggle;
        toggle.setAttribute("aria-pressed", toggle.toggle);
      });
    });

    const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

    this.shadowRoot.querySelectorAll("mui-button[data-async-feedback]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (btn.hasAttribute("pending")) return;

        const defaultLabel = btn.dataset.defaultLabel || btn.textContent.trim();
        const pendingLabel = btn.dataset.pendingLabel || defaultLabel;
        const successLabel = btn.dataset.successLabel || defaultLabel;

        btn.setAttribute("pending", "");
        btn.innerHTML = `<mui-spinner slot="before" size="x-small"></mui-spinner>${pendingLabel}`;

        await delay(900);
        btn.innerHTML = `<mui-icon-check slot="before" size="x-small"></mui-icon-check>${successLabel}`;

        await delay(1400);
        btn.textContent = defaultLabel;
        btn.removeAttribute("pending");
      });
    });

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

    this.shadowRoot.querySelectorAll("mui-button[data-dialog]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-dialog");
        if (!target) return;
        const dialog = this.shadowRoot.querySelector(`mui-dialog[data-dialog="${target}"]`);
        dialog?.setAttribute("open", "");
      });
    });

    this.shadowRoot.querySelectorAll("mui-dialog[data-dialog]").forEach((dialog) => {
      dialog.querySelectorAll("mui-button[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => dialog.removeAttribute("open"));
      });
    });
  }
}

customElements.define("story-button", storyButton);
