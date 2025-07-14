import Image from "../../../images/story/image-1080.png";

class storyCards extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const Columns = `1fr 1fr 1fr auto`;

    // Card
    const propItemsCard = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-card-header, mui-card-body, mui-card-footer",
        default: "(required)",
        description: "This component will apply special styles depending on slotted items.",
      },
    ];

    const rowsCard = propItemsCard
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

    const accordionsCard = propItemsCard
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsCard.length - 1 ? "last-child" : "";

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

    // Header
    const propItemsCardHeader = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-heading, mui-body, mui-button, mui-link, etc...",
        default: "(required)",
        description: "Add items inside the card header.",
      },
    ];

    const rowsCardHeader = propItemsCardHeader
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

    const accordionsCardHeader = propItemsCardHeader
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsCardHeader.length - 1 ? "last-child" : "";

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

    // Body
    const propItemsCardBody = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-image, mui-table, mui-slat, mui-accordion-group, etc...",
        default: "(required)",
        description:
          "Add items inside the card body. Some MUI components, like Accordion or Table, automatically style slotted content to optimise space.",
      },
    ];

    const rowsCardBody = propItemsCardBody
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

    const accordionsCardBody = propItemsCardBody
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsCardBody.length - 1 ? "last-child" : "";

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

    // Footer
    const propItemsCardFooter = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-button-group, mui-button, mui-link, mui-code, etc...",
        default: "(required)",
        description: "Append items after the main body of the card.",
      },
    ];

    const rowsCardFooter = propItemsCardFooter
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

    const accordionsCardFooter = propItemsCardFooter
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsCardFooter.length - 1 ? "last-child" : "";

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
        title="Card" 
        description="The Card provides the ability to group items or components." 
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-861&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-card"
        guides="https://guides.muibook.com/card"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-card";<br>
          </mui-code>
        </spec-card>

        <spec-card title="Props: Card" description="The mui-card houses the header, body and footer.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsCard}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsCard}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <spec-card title="Props: Card Header" description="The mui-card-header will house suitable mui components or other relevant elements.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsCardHeader}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsCardHeader}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <spec-card title="Props: Card Body" description="The mui-card-body will house suitable mui components or other relevant elements.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsCardBody}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsCardBody}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <spec-card title="Props: Card Footer" description="The mui-card-footer will house actions or other relevant elements.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsCardFooter}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsCardFooter}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card title="Card">
          <div slot="body">
            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Card</mui-heading>
              </mui-card-header>
              <mui-card-body>
                <mui-body>Etiam porta sem malesuada magna mollis euismod. Fusce dapibus,
                  tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                  fermentum massa justo sit amet risus.
                </mui-body>
              </mui-card-body>
            </mui-card>
          </div>
          <mui-code slot="footer">
            &lt;mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card-header&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;...&lt;/mui-heading&gt;            
            <br />
            &nbsp;&nbsp;&lt;/mui-card-header&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card-body&gt;Basic
            card&lt;/mui-card-body&gt;
            <br />
            &lt;/mui-card&gt;
          </mui-code>
        </story-card>

        <story-card title="Card w/ footer actions">
          <div slot="body">
            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Title</mui-heading>
              </mui-card-header>
              <mui-card-body>
                <mui-body>Etiam porta sem malesuada magna mollis euismod. Fusce dapibus,
                  tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                  fermentum massa justo sit amet risus.
                </mui-body>
              </mui-card-body>
              <mui-card-footer>
                <mui-button-group right>
                  <mui-button variant="secondary">Cancel</mui-button>
                  <mui-button variant="primary">Submit</mui-button>
                </mui-button-group>
              </mui-card-footer>
            </mui-card>
          </div>
          <mui-code slot="footer">
            &lt;mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card-header&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;...&lt;/mui-heading&gt;            
            <br />
            &nbsp;&nbsp;&lt;/mui-card-header&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card-body&gt;...&lt;/mui-card-body&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card-footer&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group right&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button
            variant="secondary">Cancel&lt;/mui-button&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button
            variant="primary">Submit&lt;/mui-button&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-card-footer&gt;
            <br />
            &lt;/mui-card&gt;
          </mui-code>
        </story-card>

        <story-card title="Card with image">
          <div slot="body">
            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Title</mui-heading>
              </mui-card-header>
              <mui-card-body>
                <mui-image>
                  <img slot="image" src="${Image}" alt="image-1080" />
                </mui-image>
              </mui-card-body>
            </mui-card>
          </div>
          <mui-code slot="footer">
            &lt;mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card-header&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;...&lt;/mui-heading&gt;            
            <br />
            &nbsp;&nbsp;&lt;/mui-card-header&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-image&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img slot="image" src="images/story/image-1080.png" alt="image-1080" /&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-image&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;
            <br />
            &lt;/mui-card&gt;
          </mui-code>
        </story-card>

        <story-card title="Card w/ Table">
          <div slot="body">
            <mui-card>
              <mui-card-body>
                <mui-table>
                  <mui-row-group heading>
                    <mui-row columns="${Columns}">
                      <mui-cell heading>Office</mui-cell>
                      <mui-cell heading>Revenue</mui-cell>
                      <mui-cell heading>Cost</mui-cell>
                      <mui-cell heading action>
                      </mui-cell>
                    </mui-row>
                  </mui-row-group>
                  <mui-row-group>
                    <mui-row columns="${Columns}">
                      <mui-cell>Whalen</mui-cell>
                      <mui-cell>$4,400.00</mui-cell>
                      <mui-cell>$1,100.00</mui-cell>
                      <mui-cell action>
                        <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                    <mui-row columns="${Columns}">
                      <mui-cell>Whalen</mui-cell>
                      <mui-cell>$4,400.00</mui-cell>
                      <mui-cell>$1,100.00</mui-cell>
                      <mui-cell action>
                        <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                  </mui-row-group>
                </mui-table>
              </mui-card-body>
            </mui-card>
          </div>
          <mui-code slot="footer">
            const Columns = &#96;1fr 1fr 1fr auto&#96;;<br>
            <br>
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-table&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Office&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Revenue&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Cost&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading action&gt;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add size="small"&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add size="small"&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-table&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-footer&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-code&gt;&lt;/mui-code&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-footer&gt;<br>
            &lt;/mui-card&gt;
          </mui-code>
        </story-card>

        <story-card title="Card Header w/ Table">
          <div slot="body">
            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Title</mui-heading>
              </mui-card-header>
              <mui-rule></mui-rule>
              <mui-card-body>
                <mui-table>
                  <mui-row-group heading>
                    <mui-row columns="${Columns}">
                      <mui-cell heading>Office</mui-cell>
                      <mui-cell heading>Revenue</mui-cell>
                      <mui-cell heading>Cost</mui-cell>
                      <mui-cell heading action>
                      </mui-cell>
                    </mui-row>
                  </mui-row-group>
                  <mui-row-group>
                    <mui-row columns="${Columns}">
                      <mui-cell>Whalen</mui-cell>
                      <mui-cell>$4,400.00</mui-cell>
                      <mui-cell>$1,100.00</mui-cell>
                      <mui-cell action>
                        <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                    <mui-row columns="${Columns}">
                      <mui-cell>Whalen</mui-cell>
                      <mui-cell>$4,400.00</mui-cell>
                      <mui-cell>$1,100.00</mui-cell>
                      <mui-cell action>
                        <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                  </mui-row-group>
                </mui-table>
              </mui-card-body>
            </mui-card>
          </div>
          <mui-code slot="footer">
            const Columns = &#96;1fr 1fr 1fr auto&#96;;<br>
            <br>
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;Title&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-table&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Office&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Revenue&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Cost&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading action&gt;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell"&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add size="small"&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add size="small"&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-table&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
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

        <story-card title="Card Header w/ Accordion">
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

customElements.define("story-cards", storyCards);
