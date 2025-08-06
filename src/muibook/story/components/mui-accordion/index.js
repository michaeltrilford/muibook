class storyAccordion extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
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
        name: "heading",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Provides the accordion element with a heading",
      },
      {
        name: "slot=&#8220;detail&#8221;",
        required: true,
        type: "slot (named)",
        options: "mui-list, mui-body, {elements}, etc",
        default: "(required)",
        description: "Define the detail content for the expanded section within the Accordion.",
      },
      {
        name: "size",
        type: "string",
        options: "small, medium, large",
        default: "medium",
        description: "Adjust the size of the Accordion",
      },
      {
        name: "detail-space",
        type: "string",
        options: "none",
        default: "",
        description: "Turn off padding inside the detail section",
      },
      {
        name: "class",
        type: "CSS class",
        options: "card-slot",
        default: "",
        description:
          "By default, when Accordion is slotted into the mui-card, padding is automatically added. However, if the mui-accordion is nested within a shadow dom, you have to apply the class for correct padding",
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Accordion"
        description="The Accordion is a component stores content underneath a collapsible heading, revealing it through progressive disclosure in the user interface."
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-accordion"
        guides="https://guides.muibook.com/accordion"
        accessibility="
          Accordion summary uses role='button' and tabindex='0' for keyboard access.;
          Supports Enter and Space keys for toggling.;
          aria-expanded reflects open/closed state.;
          aria-controls links summary to detail with a unique ID.;
          mui-heading applies semantic heading with role='heading' and aria-level.;
          Chevron icon rotates visually and the state is conveyed via aria-expanded.
        "
      >

          <mui-message heading="Quicklinks" slot="message">
            <mui-h-stack class="token-item-menu" alignY="center">
              <mui-link data-scroll-link="accordion-inline">Inline</mui-link>
              <mui-link data-scroll-link="accordion-group-and-block">Group & Block</mui-link>
              <mui-link data-scroll-link="accordion-group-and-block-exclusive">Group & Block: Exclusive</mui-link>
              <mui-link data-scroll-link="tab-behaviour-button">Tab Behaviour: Button</mui-link>
              <mui-link data-scroll-link="tab-behaviour-link">Tab Behaviour: Link</mui-link>
              <mui-link data-scroll-link="detail-space-none">Detail Space: None</mui-link>
              <mui-link data-scroll-link="card-accordion">Card: Accordion</mui-link>
              <mui-link data-scroll-link="card-header-accordion">Card Header: Accordion</mui-link>
              <mui-link data-scroll-link="accordion-slat-detect">Accordion: Slat Detection</mui-link>
              <mui-link data-scroll-link="card-slat-detect">Card: Slat Detection</mui-link>   
              <mui-link data-scroll-link="accordion-core">Accordion Core</mui-link>              
            </mui-h-stack>
          </mui-message>

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-accordion";<br>
          </mui-code>
        </spec-card>

        <props-card title="Accordion Block">
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
          id="accordion-inline"
          title="Accordion Inline" 
          description="The inline accordion is typically used within a block layout as a secondary UI element to a block element."
          usageLink="https://guides.muibook.com/accordion"
        >
          <div slot="body">
            <mui-accordion-inline heading="Heading">
              <mui-list as="ul" slot="detail">
                <mui-list-item>Coffee</mui-list-item>
                <mui-list-item>Tea</mui-list-item>
                <mui-list-item>Milk</mui-list-item>
              </mui-list>
            </mui-accordion-inline>
          </div>
          <story-code slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code>
        </story-card>

        <story-card
          id="accordion-group-and-block"
          title="Accordion Group & Block" 
          description="The block accordion is typically used within a page layout full-width to the parent container."
          usageLink="https://guides.muibook.com/accordion"
        >
          <mui-accordion-group slot="body">
            <mui-accordion-block heading="Heading">
              <div slot="detail">
                  Content
              </div>
            </mui-accordion-block>
            <mui-accordion-block heading="Heading">
              <div slot="detail">
                  Content
              </div>
            </mui-accordion-block>
          </mui-accordion-group>
          <story-code slot="footer">
            &lt;mui-accordion-group&gt;
            <br />  
            &nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-accordion-block&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-accordion-block&gt;
            <br />
            &lt;mui-accordion-group&gt;
          </story-code>
        </story-card>

        <story-card
          id="accordion-group-and-block-exclusive"
          title="Accordion Group & Block: Exclusive" 
          description="The block accordion is typically used within a page layout full-width to the parent container."
          usageLink="https://guides.muibook.com/accordion"
        >
          <mui-accordion-group exclusive slot="body">
            <mui-accordion-block heading="Heading">
              <div slot="detail">
                  Content
              </div>
            </mui-accordion-block>
            <mui-accordion-block heading="Heading">
              <div slot="detail">
                  Content
              </div>
            </mui-accordion-block>
          </mui-accordion-group>
          <story-code slot="footer">
            &lt;mui-accordion-group exclusive&gt;
            <br />  
            &nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-accordion-block&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-accordion-block&gt;
            <br />
            &lt;mui-accordion-group&gt;
          </story-code>
        </story-card>

        <story-card
          id="tab-behaviour-button"
          title="Tab Behaviour: Button" 
          description="A demo showcasing how a nested button will be ignored by the tabbing functionality if collapsed."
        >
          <div slot="body">
            <mui-accordion-inline heading="Heading">
              <div slot="detail">
                <mui-button variant="primary">Focus on Open</mui-button>
              </div>
            </mui-accordion-inline>
          </div>
          <story-code slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code>
        </story-card>

        <story-card
          id="tab-behaviour-link"
          title="Tab Behaviour: Link" 
          description="A demo showcasing how a nested link will be ignored by the tabbing functionality if collapsed."
        >
          <div slot="body">
            <mui-accordion-inline heading="Heading">
              <div slot="detail">
                <mui-link variant="primary">Focus on Open</mui-link>
              </div>
            </mui-accordion-inline>
          </div>
          <story-code slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code>
        </story-card>

        <story-card
          id="detail-space-none"
          title="Detail Space: None" 
          description="In accordion-block, you are able to turn off the space within the detail section."
          usage="Ideal for using the accordion block to contain navigation items; Support full-bleed content such as images or documents."
          usageLink="https://guides.muibook.com/accordion"
        >
          <mui-accordion-block heading="Design Tokens" detail-space="none" slot="body" style="width: 26rem;">
            <mui-v-stack slot="detail" space="var(--space-000)" style="padding: var(--space-100)">
              <mui-link variant="tertiary" class="nav-link">Primitive</mui-link>
              <mui-link variant="tertiary" class="nav-link">Semantic</mui-link>
              <mui-link variant="tertiary" class="nav-link">Contextual</mui-link>
            </mui-v-stack>
          </mui-accordion-block>
          <story-code slot="footer">
            const styles = &#96;<br>
            &nbsp;&nbsp;.nav-link {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;width: 100%;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;text-align: left;<br>
            &nbsp;&nbsp;}<br>
            &#96;<br><br>

            &lt;mui-accordion-block heading="Design Tokens" detail-space="none" style="width: 26rem;"&gt;<br>
            &nbsp;&nbsp;&lt;mui-v-stack slot="detail" space="var(--space-000)" style="padding: var(--space-100)"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link variant="tertiary" class="nav-link"&gt;Primitive&lt;/mui-link&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link variant="tertiary" class="nav-link"&gt;Semantic&lt;/mui-link&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link variant="tertiary" class="nav-link"&gt;Contextual&lt;/mui-link&gt;<br>
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &lt;/mui-accordion-block&gt;
          </story-code>
        </story-card>

        <story-card 
          id="card-accordion" 
          title="Card w/ Accordion" 
          usage="
            When slotted into a Card in the light DOM, accordion-block automatically adds the card-slot class to adjust padding.;
            If it’s nested inside a local component (shadow DOM) and then slotted into a Card, it won’t detect the slot, so you’ll need to add the card-slot class manually."
        >
          <div slot="body">
            <mui-card>
              <mui-card-body>
                <mui-accordion-group exclusive>
                  <mui-accordion-block heading="Heading">
                    <div slot="detail">
                        Content
                    </div>
                  </mui-accordion-block>
                  <mui-accordion-block heading="Heading">
                    <div slot="detail">
                        Content
                    </div>
                  </mui-accordion-block>
                </mui-accordion-group>
              </mui-card-body>
            </mui-card>
          </div>
          <story-code slot="footer">
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-group exclusive&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-group&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code>
        </story-card>

        <story-card id="card-header-accordion" title="Card Header w/ Accordion" 
          description="You can add in a mui-rule to help add a division between the header and body of the card"
          usage="
            When slotted into a Card in the light DOM, accordion-block automatically adds the card-slot class to adjust padding.;
            If it’s nested inside a local component (shadow DOM) and then slotted into a Card, it won’t detect the slot, so you’ll need to add the card-slot class manually."  
        >
          <div slot="body">
            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Title</mui-heading>
              </mui-card-header>
              <mui-rule></mui-rule>
              <mui-card-body>
                <mui-accordion-group exclusive>
                  <mui-accordion-block heading="Heading">
                    <div slot="detail">
                      Content
                    </div>
                  </mui-accordion-block>
                  <mui-accordion-block heading="Heading">
                    <div slot="detail">
                      Content
                    </div>
                  </mui-accordion-block>
                </mui-accordion-group>
              </mui-card-body>
            </mui-card>
          </div>
          <story-code slot="footer">
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;Title&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-group exclusive&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-group&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code>
        </story-card>

        <story-card
          id="accordion-slat-detect"
          title="Accordion: Slat Detection"
          usage="When an accordion is used with mui-slat-group, the attribute of usage='accordion' is applied automatically.; Opt-out by not using the mui-slat-group, but you will have to craft your own layout."
        >
          <div slot="body">
            <mui-accordion-group exclusive>
              <mui-accordion-block heading="Default">
                <mui-v-stack slot="detail">
                  <mui-body>Use the mui-slat-group and when placed inside of a mui-card, the usage=“card” attribute is automatically applied for consistent styling.</mui-body>
                  <mui-slat-group>
                    <mui-slat variant="header">
                      <mui-heading slot="start" size="6">Today</mui-heading>
                      <mui-h-stack slot="end" alignX="end">
                        <mui-body size="small">22 July 2025</mui-body>
                      </mui-h-stack>
                    </mui-slat>
                    <mui-slat variant="action">
                      <mui-v-stack slot="start" space="0">
                        <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                        <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                      </mui-v-stack>
                      <mui-v-stack space="0" slot="end" alignX="end">
                        <mui-body size="x-small">10:32 AM</mui-body>
                      </mui-v-stack>
                    </mui-slat>
                    <mui-slat variant="action">
                      <mui-v-stack slot="start" space="0">
                        <mui-body size="small" weight="bold">Password changed</mui-body>
                        <mui-body size="x-small">Security settings updated</mui-body>
                      </mui-v-stack>
                      <mui-v-stack space="0" slot="end" alignX="end">
                        <mui-body size="x-small">08:47 AM</mui-body>
                      </mui-v-stack>
                    </mui-slat>
                    <mui-rule></mui-rule>
                    <!-- Yesterday -->
                    <mui-slat variant="header">
                      <mui-heading slot="start" size="6">Yesterday</mui-heading>
                      <mui-h-stack slot="end" alignX="end">
                        <mui-body size="small">21 July 2025</mui-body>
                      </mui-h-stack>
                    </mui-slat>
                    <mui-slat variant="action">
                      <mui-v-stack slot="start" space="0">
                        <mui-body size="small" weight="bold">2FA code sent</mui-body>
                        <mui-body size="x-small">Method: SMS</mui-body>
                      </mui-v-stack>
                      <mui-v-stack space="0" slot="end" alignX="end">
                        <mui-body size="x-small">04:19 PM</mui-body>
                      </mui-v-stack>
                    </mui-slat>
                  </mui-slat-group>
                </mui-v-stack>
      
              </mui-accordion-block>
              <mui-accordion-block heading="Opt-out">
                <mui-v-stack slot="detail" space="var(--space-200)" style="max-width: 400px; margin: var(--space-200) auto 0;">
                  <mui-body style="padding-left: var(--space-400); padding-right: var(--space-400)">Opt-out by simply not using the mui-slat-group helper, however extra effort is required to craft the layout.</mui-body>
                  <mui-v-stack space="var(--space-000)">
                    <mui-slat variant="header">
                      <mui-heading slot="start" size="6">Today</mui-heading>
                      <mui-h-stack slot="end" alignX="end">
                        <mui-body size="small">22 July 2025</mui-body>
                      </mui-h-stack>
                    </mui-slat>
                    <mui-v-stack space="var(--space-050)">
                      <mui-slat variant="action">
                        <mui-v-stack slot="start" space="0">
                          <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                          <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                        </mui-v-stack>
                        <mui-v-stack space="0" slot="end" alignX="end">
                          <mui-body size="x-small">10:32 AM</mui-body>
                        </mui-v-stack>
                      </mui-slat>
                      <mui-slat variant="action">
                        <mui-v-stack slot="start" space="0">
                          <mui-body size="small" weight="bold">Password changed</mui-body>
                          <mui-body size="x-small">Security settings updated</mui-body>
                        </mui-v-stack>
                        <mui-v-stack space="0" slot="end" alignX="end">
                          <mui-body size="x-small">08:47 AM</mui-body>
                        </mui-v-stack>
                      </mui-slat>
                    </mui-v-stack>
                    <mui-rule style="margin-top: var(--space-300)"></mui-rule>
                    <!-- Yesterday -->
                    <mui-slat variant="header">
                      <mui-heading slot="start" size="6">Yesterday</mui-heading>
                      <mui-h-stack slot="end" alignX="end">
                        <mui-body size="small">21 July 2025</mui-body>
                      </mui-h-stack>
                    </mui-slat>
                    <mui-v-stack space="var(--space-050)">
                      <mui-slat variant="action">
                        <mui-v-stack slot="start" space="0">
                          <mui-body size="small" weight="bold">2FA code sent</mui-body>
                          <mui-body size="x-small">Method: SMS</mui-body>
                        </mui-v-stack>
                        <mui-v-stack space="0" slot="end" alignX="end">
                          <mui-body size="x-small">04:19 PM</mui-body>
                        </mui-v-stack>
                      </mui-slat>
                    </mui-v-stack>
                  </mui-v-stack>
                </mui-v-stack>
              </mui-accordion-block>
            </mui-accordion-group>
          </div>
          <story-code slot="footer">
            &nbsp;&nbsp;&lt;mui-accordion-group exclusive&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Default"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Use the mui-slat-group and when placed inside of a mui-card, the usage=“card” attribute is automatically applied for consistent styling.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Signed in from new device&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;10:32 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Password changed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Security settings updated&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;08:47 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Opt-out"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="detail" space="var(--space-200)" style="max-width: 400px; margin: var(--space-200) auto 0;"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-group&gt;<br>
          </story-code>
        </story-card>

        <story-card
          id="card-slat-detect"
          title="Card: Slat Detection"
          usage="When a card and accordion is used togther with mui-slat-group, the attribute of usage='card' is applied automatically.; Opt-out by not using the mui-slat-group, but you will have to craft your own layout."
        >
          <div slot="body">
            <mui-card>
              <mui-card-body>
                <mui-accordion-group exclusive>
                  <mui-accordion-block heading="Default">
                    <mui-v-stack slot="detail">
                      <mui-body>Use the mui-slat-group and when placed inside of a mui-card, the usage=“card” attribute is automatically applied for consistent styling.</mui-body>
                      <mui-slat-group>
                        <mui-slat variant="header">
                          <mui-heading slot="start" size="6">Today</mui-heading>
                          <mui-h-stack slot="end" alignX="end">
                            <mui-body size="small">22 July 2025</mui-body>
                          </mui-h-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                            <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">10:32 AM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">Password changed</mui-body>
                            <mui-body size="x-small">Security settings updated</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">08:47 AM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                        <mui-rule></mui-rule>
                        <!-- Yesterday -->
                        <mui-slat variant="header">
                          <mui-heading slot="start" size="6">Yesterday</mui-heading>
                          <mui-h-stack slot="end" alignX="end">
                            <mui-body size="small">21 July 2025</mui-body>
                          </mui-h-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">2FA code sent</mui-body>
                            <mui-body size="x-small">Method: SMS</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">04:19 PM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                      </mui-slat-group>
                    </mui-v-stack>
          
                  </mui-accordion-block>
                  <mui-accordion-block heading="Opt-out">
                    <mui-v-stack slot="detail" space="var(--space-200)" style="max-width: 400px; margin: var(--space-200) auto 0;">
                      <mui-body style="padding-left: var(--space-400); padding-right: var(--space-400)">Opt-out by simply not using the mui-slat-group helper, however extra effort is required to craft the layout.</mui-body>
                      <mui-v-stack space="var(--space-000)">
                        <mui-slat variant="header">
                          <mui-heading slot="start" size="6">Today</mui-heading>
                          <mui-h-stack slot="end" alignX="end">
                            <mui-body size="small">22 July 2025</mui-body>
                          </mui-h-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                            <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">10:32 AM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">Password changed</mui-body>
                            <mui-body size="x-small">Security settings updated</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">08:47 AM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                        <mui-rule style="margin-top: var(--space-300)"></mui-rule>
                        <!-- Yesterday -->
                        <mui-slat variant="header">
                          <mui-heading slot="start" size="6">Yesterday</mui-heading>
                          <mui-h-stack slot="end" alignX="end">
                            <mui-body size="small">21 July 2025</mui-body>
                          </mui-h-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">2FA code sent</mui-body>
                            <mui-body size="x-small">Method: SMS</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">04:19 PM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                      </mui-v-stack>
                    </mui-v-stack>
                  </mui-accordion-block>
                </mui-accordion-group>
              </mui-card-body>
            </mui-card>
          </div>
          <story-code slot="footer">
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-group exclusive&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Default"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Use the mui-slat-group and when placed inside of a mui-card, the usage=“card” attribute is automatically applied for consistent styling.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Signed in from new device&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;10:32 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Password changed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Security settings updated&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;08:47 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Opt-out"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="detail" space="var(--space-200)" style="max-width: 400px; margin: var(--space-200) auto 0;"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code>
        </story-card>

        <story-card
          id="accordion-core"
          title="Accordion Core" 
          description="Use your imagination and compose your own accordion experience with some overhead in effort. Below is a variety of examples using cards and different techniques to toggle an icon based on the open state."
        >
          <mui-v-stack slot="body">

            <mui-accordion-core>              
              <mui-h-stack space="var(--space-200)" alignY="center" slot="summary">
                <mui-icon-right-chevron></mui-icon-right-chevron>
                <mui-heading size="3">Accordion Inline</mui-heading>
              </mui-h-stack>
              <div slot="detail" style="padding-top: var(--space-400);">
                <mui-body>This is the detailed content inside the accordion.</mui-body>
              </div>
            </mui-accordion-core>

            <mui-card>
              <mui-accordion-core>              
                <mui-card-header slot="summary">                
                  <mui-h-stack space="var(--space-100)" alignX="space-between" alignY="center">
                    <mui-heading size="3">Accordion Block</mui-heading>
                    <mui-icon-down-chevron></mui-icon-down-chevron>
                  </mui-h-stack>
                </mui-card-header>
                <div slot="detail">
                  <mui-rule></mui-rule>
                  <mui-card-body>
                    <mui-body>This is the detailed content inside the accordion.</mui-body>
                  </mui-card-body>
                </div>
              </mui-accordion-core>
            </mui-card>

            <mui-card>
              <mui-accordion-core>              
                <mui-card-header slot="summary">                
                  <mui-h-stack space="var(--space-100)" alignX="space-between" alignY="center">
                    <mui-heading size="3">Accordion w/ Icon Toggle</mui-heading>
                    <mui-icon-toggle rotate>
                        <mui-icon-add slot="start"></mui-icon-add>
                        <mui-icon-subtract slot="end"></mui-icon-subtract>
                      </mui-icon-toggle>
                  </mui-h-stack>
                </mui-card-header>
                <div slot="detail">
                  <mui-rule></mui-rule>
                  <mui-card-body>
                    <mui-body>This is the detailed content inside the accordion.</mui-body>
                  </mui-card-body>
                </div>
              </mui-accordion-core>
            </mui-card>
                    
          </mui-v-stack>

          <story-code slot="footer">

            // Custom: Accordion Inline<br>
            /* ================================================================ */<br><br>
            
            // Styles must be added where the component is used to pierce the shadow DOM.<br>
            // This only works with &lt;mui-icon-right-chevron&gt;<br>
            // Attributes are set by &lt;mui-accordion-core&gt;.<br><br>

            [data-icon-animation=&quot;accordion-inline&quot;] {<br>
            &nbsp;&nbsp;transition: var(--speed-200) ease-in-out;<br>
            }<br><br>

            [data-icon-animation=&quot;accordion-inline&quot;][open] {<br>
            &nbsp;&nbsp;transform: rotate(90deg);<br>
            }<br><br>

            &nbsp;&nbsp;&lt;mui-accordion-core&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-200)&quot; alignY=&quot;center&quot; slot=&quot;summary&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-right-chevron&gt;&lt;/mui-icon-right-chevron&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot;&gt;Accordion Inline&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot=&quot;detail&quot; style="padding-top: var(--space-400);"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;This is the detailed content inside the accordion.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&lt;/mui-accordion-core&gt;<br><br><br><br>

            
            // Custom: Accordion Block<br>
            /* ================================================================ */<br><br>
            
            // Styles must be added where the component is used to pierce the shadow DOM.<br>
            // This only works with &lt;mui-icon-down-chevron&gt;<br>
            // Attributes are set by &lt;mui-accordion-core&gt;.<br><br>

            [data-icon-animation=&quot;accordion-block&quot;] {<br>
            &nbsp;&nbsp;transition: transform var(--speed-200) ease-in-out;<br>
            }<br><br>

            [data-icon-animation=&quot;accordion-block&quot;][open] {<br>
            &nbsp;&nbsp;transform: rotate(-180deg);<br>
            }<br><br>

            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-accordion-core&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-header slot=&quot;summary&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignX=&quot;space-between&quot; alignY=&quot;center&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot;&gt;Accordion Block&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-down-chevron&gt;&lt;/mui-icon-down-chevron&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot=&quot;detail&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;This is the detailed content inside the accordion.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&lt;/mui-accordion-core&gt;<br>
            &lt;/mui-card&gt;<br><br><br><br>

            
            // Custom: Accordion (Icon-Toggle)<br>
            /* ================================================================ */<br><br>
            
            // Experiment with the &lt;mui-icon-toggle&gt; to utilise the toggle behaviour for the accordion.<br>
            // Attributes are set by &lt;mui-accordion-core&gt;.<br><br>


            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-accordion-core&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-header slot=&quot;summary&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignX=&quot;space-between&quot; alignY=&quot;center&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot;&gt;Accordion w/ Icon Toggle&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-toggle rotate&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot=&quot;start&quot;&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot=&quot;end&quot;&gt;&lt;/mui-icon-subtract&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot=&quot;detail&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;This is the detailed content inside the accordion.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&lt;/mui-accordion-core&gt;<br>
            &lt;/mui-card&gt;
          </story-code>


        </story-card>


      </mui-v-stack>

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

customElements.define("story-accordion", storyAccordion);
