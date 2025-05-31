class storyAccordion extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "heading",
        required: true,
        type: "string",
        options: "{text}",
        default: "",
        description: "Provides the accordion element with a heading",
      },
      {
        name: "size",
        type: "string",
        options: "small, medium, large",
        default: "medium",
        description: "Adjust the size of the Accordion",
      },
      {
        name: "slot",
        required: true,
        type: "HTML attribute",
        options: "slot=“detail”",
        default: "",
        description: "Hides the label but it is still present for screen readers",
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
        github="https://github.com/michaeltrilford/muibook/tree/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-accordion"
        accessibility="
          Accordion summary uses role='button' and tabindex='0' for keyboard access.;
          Supports Enter and Space keys for toggling.;
          aria-expanded reflects open/closed state.;
          aria-controls links summary to detail with a unique ID.;
          mui-heading applies semantic heading with role='heading' and aria-level.;
          Chevron icon rotates visually and the state is conveyed via aria-expanded.
        "
      >

      <mui-v-stack space="var(--space-700)">


        <spec-card title="Props: Accordion Block">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card 
          title="Tab Scenarios: Button" 
          description="The inline accordion is typically used within a block layout as a secondary UI element to a block element."
        >
          <div slot="body">
            <mui-accordion-inline heading="Heading">
              <div slot="detail">
                <mui-button variant="primary">Focus on Open</mui-button>
              </div>
            </mui-accordion-inline>
          </div>
          <mui-code slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Tab Scenarios: Link" 
          description="The inline accordion is typically used within a block layout as a secondary UI element to a block element."
        >
          <div slot="body">
            <mui-accordion-inline heading="Heading">
              <div slot="detail">
                <mui-link variant="primary">Focus on Open</mui-link>
              </div>
            </mui-accordion-inline>
          </div>
          <mui-code slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Accordion Inline" 
          description="The inline accordion is typically used within a block layout as a secondary UI element to a block element."
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
          <mui-code slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Accordion Group & Block" 
          description="The block accordion is typically used within a page layout full-width to the parent container."
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
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card 
          title="Accordion Group & Block: Exclusive" 
          description="The block accordion is typically used within a page layout full-width to the parent container."
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
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card title="Card w/ Accordion">
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
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card title="Card Header w/ Accordion" description="You can add in a mui-rule to help add a division between the header and body of the card">
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
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-accordion", storyAccordion);
