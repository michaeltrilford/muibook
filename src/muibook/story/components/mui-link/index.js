class storyLink extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

      mui-link.custom-wc::part(color) {
        color: var(--red-600);
      }

      mui-link.custom-wc::part(color):hover {
        color: var(--red-800);
      }

      mui-link.custom-wc::part(font-weight) {
        font-weight: var(--font-weight-700);
      }

      mui-link.custom-wc::part(text-decoration) {
        text-decoration: none;
      }
      mui-link.custom-wc::part(text-decoration):hover {
        text-decoration: underline;
      }

    `;

    const propItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "{text}",
        default: "",
        description:
          "Add text or a single icon to the call-to-action. If using a custom icon, ensure it includes the mui-icon class to inherit styling.",
      },
      {
        name: "slot=&#8220;before&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name]",
        default: "",
        description: "Slot in an icon to appear before the text on a link or link button.",
      },
      {
        name: "slot=&#8220;after&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name]",
        default: "",
        description: "Slot in an icon to appear after the text inside a link or link button.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Change the size of the link action",
      },
      {
        name: "variant",
        type: "string",
        options: "primary, secondary, tertiary, attention",
        default: "",
        description:
          "Apply a button style to the link, often used for navigation options or other actions that leverage an anchor link.",
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
        type: "CSS",
        options: "Valid CSS",
        default: "",
        description: "You are able to use add a classname to add layout based CSS to the host element.",
      },
      {
        name: "part",
        type: "CSS",
        options: "mui-link::part(add-css-selector)",
        default: "",
        description:
          "Controlled trust-based customisation for modifying internal aspects of a link. <mui-link href='/#/text-part-selectors' size='x-small'>Learn more</mui-link>",
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
          import "@muibook/components/mui-link";<br>
        </mui-code>
      </spec-card>

      <props-card title="Link">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card title="Link: Sizes" id="link-sizes" description="Link sizes should match the surrounding body text size when nested within a paragraph.">

          <div slot="body">
            <mui-v-stack space="var(--space-500)">
              <div>
                <mui-heading size="4" >X-Small</mui-heading>
                <mui-link size="x-small">Link text</mui-link>
              </div>
              <div>
                <mui-heading size="4" >Small</mui-heading>
                <mui-link size="small">Link text</mui-link>
              </div>
              <div>
                <mui-heading size="4" >Medium</mui-heading>
                <mui-link size="medium">Link text</mui-link>
              </div>
              <div>
                <mui-heading size="4" >Large</mui-heading>
                <mui-link size="large">Link text</mui-link>
              </div>
            </mui-v-stack>
          </div>

          <story-code-block slot="footer" scrollable>
            &lt;mui-link size="x-small"&gt;
            <br />
            &nbsp;&nbsp;Link text
            <br />
            &lt;/mui-link&gt;
            <br />
            <br />
            &lt;mui-link size="small"&gt;
            <br />
            &nbsp;&nbsp;Link text
            <br />
            &lt;/mui-link&gt;
            <br />
            <br />
            &lt;mui-link size="medium"&gt;
            <br />
            &nbsp;&nbsp;Link text
            <br />
            &lt;/mui-link&gt;
            <br />
            <br />
            &lt;mui-link size="large"&gt;
            <br />
            &nbsp;&nbsp;Link text
            <br />
            &lt;/mui-link&gt;
          </story-code-block>

      </story-card>

      <story-card
        id="link-button-x-small"
        title="Link Button: X-Small" 
        description="When a link includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the action will respect the value you set."
        usage="
          Highly compact UI regions;
          Dense application toolbars;
          Tight data tables;
          Compact control panels
        "
      >    

        <mui-v-stack slot="body" alignx="stretch">
          <mui-h-stack alignx="end" alignY="center" space="var(--space-050)">
            <mui-link size="x-small" variant="primary">Email us</mui-link>
            <mui-link size="x-small" variant="tertiary">Learn more</mui-link>
          </mui-h-stack>
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>
          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-link size='x-small' variant="primary">
              Learn more
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link size='x-small' variant="primary">
              Learn more
              <mui-icon-info slot="after"></mui-icon-info>
            </mui-link>
            <mui-link size='x-small' variant="primary">
              <mui-icon-info></mui-icon-info>
            </mui-link>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link size="x-small"&gt;...&lt;/mui-link&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card
        id="link-button-small"
        title="Link Button: Small" 
        description="When an action includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the action will respect the value you set."
        usage=" 
          Toolbar actions with mixed icon/text;
          Discrete filters and utility actions;
          Secondary or supporting navigation
        "
      >  
        <mui-v-stack slot="body">

          <mui-h-stack alignx="space-between" aligny="center" style="border-radius: var(--radius-200); background: var(--surface-elevated-100); padding: var(--space-400); padding-right: var(--space-500);">
            <mui-h-stack space="var(--space-300)">
            <mui-input label="Search" hide-label placeholder="Search by name, email, or ID..." style="min-width: 25rem; max-width: 25rem;"></mui-input>
            <mui-select label="Status" hide-label
              style="min-width: 12rem;"
                options='[
                {"value": "default", "label": "Pending"},
                {"value": "active", "label": "Active"}
              ]'>
            </mui-select>
            </mui-h-stack>
            <mui-h-stack space="var(--space-500)" aligny="center">
              <mui-link size="small" variant="tertiary">Need Help?</mui-link>
            </mui-h-stack>
          </mui-h-stack>
            
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into an action, it automatically inherits the action's default icon size (size="x-small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>

          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-link size='small' variant="primary">
              Learn more
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link size='small' variant="primary">
              Learn more
              <mui-icon-info slot="after"></mui-icon-info>
            </mui-link>
            <mui-link size='small' variant="primary">
              <mui-icon-info></mui-icon-info>
            </mui-link>
          </mui-h-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link size="small"&gt;...&lt;/mui-link&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card
        id="link-button-medium"
        title="Link Button: Medium (Default)" 
        description="When an action includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the action will respect the value you set."
        usage=" 
          Standard text-level actions;
          Card actions (primary/secondary);
          Modal and dialog interactions;
          Navigation elements within body text;
          Places where links appear in default reading flow;
          Form inputs (e.g., hero search bars)
        "
      >
        <mui-v-stack slot="body">
          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into an action, it automatically inherits the action's default icon size (size="small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>
          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-link variant="primary">
              Learn more
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link variant="primary">
              Learn more
              <mui-icon-info slot="after"></mui-icon-info>
            </mui-link>
            <mui-link variant="primary">
              <mui-icon-info size="small"></mui-icon-info>
            </mui-link>
          </mui-h-stack>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Input Usage</mui-body>
            <mui-body size="small" style="max-width: 64ch;">Only the medium-sized input supports the before and after slots. These slots are not available for small or large input variants.</mui-body>
          </mui-v-stack>

          <mui-input label="Enter amount">
            <mui-link slot="before">
              Action
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link slot="after">
              Action
              <mui-icon-info slot="after"></mui-icon-info>
            </mui-link>
          </mui-input>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-link size="medium"&gt;...&lt;/mui-link&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card
        id="link-button-large"
        title="Link Button: Large" 
        description="When an action includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the action will respect the value you set."
        usage=" 
          Large headings (H1/H2) and hero layouts;
          Prominent calls to action in content;
          Empty states and marketing content;
          Interfaces where the link must stand out more than standard body actions
        "
      >
        <mui-v-stack slot="body">
          <mui-h-stack alignx="space-between">
            <mui-heading size='1' level='1'>Home</mui-heading>
            <mui-link size="large" variant="primary">Learn more<mui-icon-info slot="after"></mui-icon-info></mui-link>
          </mui-h-stack>
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>
          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into an action, it automatically inherits the action's default icon size (size="medium"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>
          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-link size='large' variant="primary">
              Learn more
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link size='large' variant="primary">
              Learn more
              <mui-icon-info slot="after"></mui-icon-info>
            </mui-link>
            <mui-link size='large' variant="primary">
              <mui-icon-info></mui-icon-info>
            </mui-link>
          </mui-h-stack>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-link size="large"&gt;...&lt;/mui-link&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card title="URL" id="url">
        <div slot="body">
          <mui-link target="_blank" href="links.html">Unsubscribe</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card title="External link" id="external">
        <div slot="body">
          <mui-link target="_blank">Unsubscribe</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link target="_blank" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card title="Primary Link" id="primary-link">
        <div slot="body">
          <mui-link target="_blank" variant="primary">Fork Github</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="primary" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card title="Secondary Link" id="secondary-link">
        <div slot="body">
          <mui-link target="_blank" variant="secondary">View report</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="secondary" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card title="Tertiary Link" id="tertiary-link">
        <div slot="body">
          <mui-link target="_blank" variant="tertiary">View report</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="tertiary" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card title="Attention Link" id="attention-link">
        <div slot="body">
          <mui-link target="_blank" variant="attention">Fork Github</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="attention" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Link (Before & After)"
        id="link"
        usage='
          Use x-small size icon when it is paired with text
        '
        usageLink="https://guides.muibook.com/link"        
      >

        <mui-v-stack slot="body" space="var(--space-400)" alignX="start">

          <mui-link>
            Download
            <mui-icon-down-arrow-circle slot="before" size="x-small"></mui-icon-down-arrow-circle>
          </mui-link>

          <mui-link>
            View more
            <mui-icon-right-chevron slot="after" size="x-small"></mui-icon-right-chevron>
          </mui-link>

        </mui-v-stack>
        
        <story-code-block slot="footer" scrollable>
          &lt;mui-link&gt;
          <br />
          &nbsp;&nbsp;Download
          <br>
          &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="before" 
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;size="x-small"&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-icon-down-arrow-circle&gt;
          <br />
          &lt;/mui-link&gt;
          <br>
          <br>
          &lt;mui-link&gt;
          <br />
          &nbsp;&nbsp;View more
          <br>
          &nbsp;&nbsp;&lt;mui-icon-right-chevron 
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="after"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;size="x-small"&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-icon-right-chevron&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Link Button (Before & After)"
        id="link-button"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/link"
      >

        <mui-v-stack slot="body" space="var(--space-200)" alignX="start">

          <mui-link 
            variant="primary">
              Download
              <mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle>
          </mui-link>

          <mui-link 
            variant="primary">
              View more
              <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-link>

        </mui-v-stack>
        
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="primary"&gt;
          <br />
          &nbsp;&nbsp;Download
          <br>
          &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle slot="before"&gt;&lt;/mui-icon-down-arrow-circle&gt;
          <br />
          &lt;/mui-link&gt;
          <br>
          <br>
          &lt;mui-link variant="primary"&gt;
          <br />
          &nbsp;&nbsp;View more
          <br>
          &nbsp;&nbsp;&lt;mui-icon-right-chevron slot="after"&gt;&lt;/mui-icon-right-chevron&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Primary: Icon-Only"
        id="primary-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/link"  
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-link variant="primary">Download<mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle></mui-link>
            <mui-link variant="primary"><mui-icon-add></mui-icon-add></mui-link>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-link variant="primary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-link>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="primary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Secondary: Icon-Only"
        id="secondary-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/link"    
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-link variant="secondary">Download<mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle></mui-link>
            <mui-link variant="secondary"><mui-icon-add></mui-icon-add></mui-link>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-link variant="secondary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-link>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="secondary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Tertiary: Icon-Only"
        id="tertiary-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/link"    
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-link variant="tertiary">Download<mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle></mui-link>
            <mui-link variant="tertiary"><mui-icon-add></mui-icon-add></mui-link>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-link variant="tertiary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-link>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="tertiary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Attention: Icon-Only"
        id="attention-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/link"    
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-link variant="attention">Download<mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle></mui-link>
            <mui-link variant="attention"><mui-icon-add></mui-icon-add></mui-link>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-link variant="attention" >
            <mui-icon-warning size="medium"></mui-icon-warning>
          </mui-link>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="attention"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card title="Part Selectors" id="part" description="Ideal for building custom web-component compositions using MUI and scoped CSS styles.">
        <div slot="body">
          <mui-link class="custom-wc" target="_blank" href="links.html">Unsubscribe</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
    
          // Scoped CSS (Web component)
          <br />
          <br />

          class customUI extends HTMLElement {<br>
          &nbsp;&nbsp;static get observedAttributes() {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;return [...];<br>
          &nbsp;&nbsp;}<br><br>

          &nbsp;&nbsp;constructor() {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;super();<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const shadowRoot = this.attachShadow({
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mode: "open"
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;});
          <br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;const styles = &#96;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:host { ... }<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Part Selector<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/////////////////////////////
          <br />
          <br />

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(color) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: var(--red-600);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(color):hover {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: var(--red-700);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(font-weight) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;font-weight: var(--font-weight-700);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(text-decoration) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text-decoration: none;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(text-decoration):hover {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text-decoration: underline;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&#96;;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;shadowRoot.innerHTML = &#96;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;style&gt;&#36;{styles}&lt;/style&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link href="..."&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&#96;;<br>
          &nbsp;&nbsp;}<br>
          }<br><br>

          customElements.define("custom-ui", customUI);


        </story-code-block>
      </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Link"
        description="The mui-link defines a hyperlink, which is used to link from one page to another."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-663&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-link/index.ts"
        guides="https://guides.muibook.com/link"
        storybook="https://stories.muibook.com/?path=/docs/actions-link--docs"
      >

        <mui-message heading="Quicklinks" slot="message">
          <mui-h-stack class="token-item-menu" alignY="center" style="padding-bottom: var(--space-100);">
            <mui-link size="small" data-scroll-link="link-sizes">Link: Sizes</mui-link>  
            <mui-link size="small" data-scroll-link="link-button-x-small">Link Button: X-Small</mui-link>
            <mui-link size="small" data-scroll-link="link-button-small">Link Button: Small</mui-link>
            <mui-link size="small" data-scroll-link="link-button-medium">Link Button: Medium</mui-link>
            <mui-link size="small" data-scroll-link="link-button-large">Link Button: Large</mui-link>
            <mui-link size="small" data-scroll-link="url">URL</mui-link>
            <mui-link size="small" data-scroll-link="external">External Link</mui-link>
            <mui-link size="small" data-scroll-link="primary">Primary Link</mui-link>
            <mui-link size="small" data-scroll-link="tertiary">Tertiary Link</mui-link>
            <mui-link size="small" data-scroll-link="attention">Attention Link</mui-link>
            <mui-link size="small" data-scroll-link="disabled">Disabled Link</mui-link>
            <mui-link size="small" data-scroll-link="link">Link (Before & After)</mui-link>
            <mui-link size="small" data-scroll-link="link-button">Link Button (Before & After)</mui-link>
            <mui-link size="small" data-scroll-link="primary-icon-only">Primary: Icon-Only</mui-link>
            <mui-link size="small" data-scroll-link="secondary-icon-only">Secondary: Icon-Only</mui-link>
            <mui-link size="small" data-scroll-link="tertiary-icon-only">Tertiary: Icon-Only</mui-link>
            <mui-link size="small" data-scroll-link="attention-icon-only">Attention: Icon-Only</mui-link>
            <mui-link size="small" data-scroll-link="part">Part Selectors</mui-link>            
          </mui-h-stack>
        </mui-message>

        ${stories}
      </story-template>
    `;

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("story-link", storyLink);
