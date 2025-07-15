class storyLink extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

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
        description: "Adjust the size of the link text size to align with mui-body options.",
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Link"
        description="The mui-link defines a hyperlink, which is used to link from one page to another."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-663&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-link/index.ts"
        guides="https://guides.muibook.com/link"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-link";<br>
          </mui-code>
        </spec-card>

        <spec-card title="Props">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card title="Sizes" description="Link sizes should match the surrounding body text size when nested within a paragraph.">

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

            <mui-code slot="footer" scrollable>
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
            </mui-code>

        </story-card>

        <story-card title="URL">
          <div slot="body">
            <mui-link target="_blank" href="links.html">Unsubscribe</mui-link>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-link href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="External link">
          <div slot="body">
            <mui-link target="_blank">Unsubscribe</mui-link>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-link target="_blank" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Primary Link">
          <div slot="body">
            <mui-link target="_blank" variant="primary">Fork Github</mui-link>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-link variant="primary" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Secondary Link">
          <div slot="body">
            <mui-link target="_blank" variant="secondary">View report</mui-link>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-link variant="secondary" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Tertiary Link">
          <div slot="body">
            <mui-link target="_blank" variant="tertiary">View report</mui-link>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-link variant="tertiary" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Attention Link">
          <div slot="body">
            <mui-link target="_blank" variant="attention">Fork Github</mui-link>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-link variant="attention" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Icon: Link (Before & After)"
          usage='
            Use small size icon when it is paired with text or the icon-only action is used in a button group;
            Use medium size icon (default) when the icon-only action appears on its own. E.g. Menu.
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
          
          <mui-code slot="footer" scrollable>
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
          </mui-code>
        </story-card>

        <story-card 
          title="Icon: Button (Before & After)"
          usage='
            Use small size icon when it is paired with text or the icon-only action is used in a button group;
            Use medium size icon (default) when the icon-only action appears on its own. E.g. Menu.
          '
          usageLink="https://guides.muibook.com/link"
        >

          <mui-v-stack slot="body" space="var(--space-200)" alignX="start">

            <mui-link 
              variant="primary">
                Download
                <mui-icon-down-arrow-circle slot="before" size="x-small"></mui-icon-down-arrow-circle>
            </mui-link>

            <mui-link 
              variant="primary">
                View more
                <mui-icon-right-chevron slot="after" size="x-small"></mui-icon-right-chevron>
            </mui-link>

          </mui-v-stack>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-link variant="primary"&gt;
            <br />
            &nbsp;&nbsp;Download
            <br>
            &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle slot="before" size="x-small"&gt;&lt;/mui-icon-down-arrow-circle&gt;
            <br />
            &lt;/mui-link&gt;
            <br>
            <br>
            &lt;mui-link variant="primary"&gt;
            <br />
            &nbsp;&nbsp;View more
            <br>
            &nbsp;&nbsp;&lt;mui-icon-right-chevron slot="after" size="x-small"&gt;&lt;/mui-icon-right-chevron&gt;
            <br />
            &lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Primary: Icon-Only"
          usage='
            Use medium size icon (default) when the icon-only action appears on its own. E.g. Menu; 
            Use small size icon when it is paired with text or the icon-only action is used in a button group.
          '
          usageLink="https://guides.muibook.com/link"  
        >
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-link variant="primary" >
              <mui-icon-add></mui-icon-add>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-subtract></mui-icon-subtract>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-grid></mui-icon-grid>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-notification></mui-icon-notification>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-menu></mui-icon-menu>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-message></mui-icon-message>
            </mui-link>
          </mui-h-stack>
          <mui-code slot="footer" scrollable>
            &lt;mui-link variant="primary"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Secondary: Icon-Only"
          usage='
            Use medium size icon (default) when the icon-only action appears on its own. E.g. Menu; 
            Use small size icon when it is paired with text or the icon-only action is used in a button group.
          '
          usageLink="https://guides.muibook.com/link"    
        >
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-link variant="secondary" >
              <mui-icon-add variant="secondary" size="small"></mui-icon-add>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-subtract></mui-icon-subtract>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-grid></mui-icon-grid>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-notification></mui-icon-notification>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-menu></mui-icon-menu>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-message></mui-icon-message>
            </mui-link>
          </mui-h-stack>
          <mui-code slot="footer" scrollable>
            &lt;mui-link variant="secondary"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Tertiary: Icon-Only"
          usage='
            Use medium size icon (default) when the icon-only action appears on its own. E.g. Menu; 
            Use small size icon when it is paired with text or the icon-only action is used in a button group.
          '
          usageLink="https://guides.muibook.com/link"    
        >
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-link variant="tertiary" >
              <mui-icon-add></mui-icon-add>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-subtract></mui-icon-subtract>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-grid></mui-icon-grid>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-notification></mui-icon-notification>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-menu></mui-icon-menu>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-message></mui-icon-message>
            </mui-link>
          </mui-h-stack>
          <mui-code slot="footer" scrollable>
            &lt;mui-link variant="tertiary"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Attention: Icon-Only"
          usage='
            Use medium size icon (default) when the icon-only action appears on its own. E.g. Menu; 
            Use small size icon when it is paired with text or the icon-only action is used in a button group.
          '
          usageLink="https://guides.muibook.com/link"    
        >
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-link variant="attention" >
              <mui-icon-add></mui-icon-add>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-subtract></mui-icon-subtract>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-grid></mui-icon-grid>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-notification></mui-icon-notification>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-menu></mui-icon-menu>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-message></mui-icon-message>
            </mui-link>
          </mui-h-stack>
          <mui-code slot="footer" scrollable>
            &lt;mui-link variant="attention"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Part Selectors" description="Ideal for building custom web-component compositions using MUI and scoped CSS styles.">
          <div slot="body">
            <mui-link class="custom-wc" target="_blank" href="links.html">Unsubscribe</mui-link>
          </div>
          <mui-code slot="footer" scrollable>
      
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


          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-link", storyLink);
