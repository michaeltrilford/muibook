import Image from "../../../images/story/image-1080.png";

class storyCards extends HTMLElement {
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

    `;

    const Columns = `1fr 1fr 1fr`;
    const Columns_Action = `1fr 1fr auto`;
    const Columns_ProgressTable = `1fr 1fr 1fr 126px`;

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
      {
        name: "condensed",
        required: false,
        type: "boolean",
        options: "condensed",
        default: "",
        description: "Turn off the padding",
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

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-card";<br>
        </mui-code>
      </spec-card>

      <mui-v-stack space="var(--space-400)">
        <props-card title="Card" description="The mui-card houses the header, body and footer.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsCard}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsCard}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>

        <props-card title="Card Header" description="The mui-card-header will house suitable mui components or other relevant elements.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsCardHeader}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsCardHeader}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>

        <props-card title="Card Body" description="The mui-card-body will house suitable mui components or other relevant elements.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsCardBody}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsCardBody}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>

        <props-card title="Card Footer" description="The mui-card-footer will house actions or other relevant elements.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsCardFooter}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsCardFooter}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>
      </mui-v-stack>

      <story-card id="card" title="Card">
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
        <story-code-block slot="footer" scrollable>
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
        </story-code-block>
      </story-card>

      <story-card id="card-footer" title="Card: Footer">
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
        <story-code-block slot="footer" scrollable>
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
        </story-code-block>
      </story-card>

      <story-card id="card-image" title="Card: Image">
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
        <story-code-block slot="footer" scrollable>
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
        </story-code-block>
      </story-card>

      <story-card 
        title="Card: Table"
        description="When a table is slotted into a card, it inherits curated left and right spacing to ensure it fits well within the card layout."
      >
        <div slot="body">
          <mui-card>
            <mui-card-body>
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Office</mui-cell>
                    <mui-cell>Cost</mui-cell>
                    <mui-cell action></mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
                        <mui-button>Option one</mui-button>
                        <mui-button>Option two</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
                        <mui-button>Option one</mui-button>
                        <mui-button>Option two</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </mui-card-body>
          </mui-card>
        </div>
        <story-code-block slot="footer" scrollable>
          const Columns_Action = &#96;1fr 1fr auto&#96;;<br>
          <br>
          &lt;mui-card&gt;<br>
          &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-table&gt;
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Table Header
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/////////////////////////////////////
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Table Body
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/////////////////////////////////////
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis&gt;&lt;/mui-icon-ellipsis&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-table&gt;<br>
          &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
          &lt;/mui-card&gt;
        </story-code-block>
      </story-card>

      <story-card title="Card: Header & Table" description="You can add in a mui-rule to help add a division between the header and body of the card">
        <div slot="body">
          <mui-card>
            <mui-card-header>
              <mui-heading size="3">Title</mui-heading>
            </mui-card-header>
            <mui-rule></mui-rule>
            <mui-card-body>
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Office</mui-cell>
                    <mui-cell>Cost</mui-cell>
                    <mui-cell action>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
                        <mui-button>Option one</mui-button>
                        <mui-button>Option two</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
                        <mui-button>Option one</mui-button>
                        <mui-button>Option two</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </mui-card-body>
          </mui-card>
        </div>
        <story-code-block slot="footer" scrollable>
          const Columns_Action = &#96;1fr 1fr auto&#96;;<br>
          <br>
          &lt;mui-card&gt;<br>
          &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;Title&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
          &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-table&gt;
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Table Header
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/////////////////////////////////////
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Table Body
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/////////////////////////////////////             
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-table&gt;<br>
          &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
          &lt;/mui-card&gt;
        </story-code-block>
      </story-card>

      <story-card 
        id="slat-group"
        title="Slat Group"
        description="
          If a mui-slat is slotted directly into the mui-card-body, 
          if will automatically align the slats with the heading to ensure consistent alignment within a card.
        "
        usage="
          mui-slat-group is added within the mui-card-body to apply an offset for the slat items;
          Place slats directly inside mui-card-body to inherit alignment.;
          Use this layout only for cards with limited width. For wider layouts, consider using a table.
        "
      >
        <mui-card slot="body">

          <mui-card-header>
            <mui-heading size="3">Account Activity</mui-heading>
            <mui-body>Here’s a summary of recent actions on your account.</mui-body>
          </mui-card-header>

          <mui-card-body>
            <!-- Today -->
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
          </mui-card-body>
          
        </mui-card>

        <story-code-block slot="footer" scrollable>
          &lt;mui-card&gt;<br>
          &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;Account Activity&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Here’s a summary of recent actions on your account.&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;/mui-card-header&gt;<br><br>

          &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Today --&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Signed in from new device&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;10:32 AM&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Password changed&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Security settings updated&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;08:47 AM&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Yesterday --&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Yesterday&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;21 July 2025&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;2FA code sent&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Method: SMS&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;04:19 PM&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
          &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
          &lt;/mui-card&gt;
        </story-code-block>
      </story-card>

      <story-card 
        id="slat-group-divider"
        title="Slat Group: Dividers" 
        description="
          If a mui-slat is slotted directly into the mui-card-body, 
          if will automatically align the slats with the heading to ensure consistent alignment within a card.
        "
        usage="
          mui-slat-group is added within the mui-card-body to apply an offset for the slat items;
          Place slats directly inside mui-card-body to inherit alignment.;
          Use this layout only for cards with limited width. For wider layouts, consider using a table.
        "
      >
        <mui-card slot="body">

          <mui-card-header>
            <mui-heading size="3">Account Activity</mui-heading>
            <mui-body>Here’s a summary of recent actions on your account.</mui-body>
          </mui-card-header>

          <mui-card-body>
            <!-- Today -->
            <mui-slat-group>
              <mui-rule></mui-rule>
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
          </mui-card-body>
          
        </mui-card>

        <story-code-block slot="footer" scrollable>
          &lt;mui-card&gt;<br>
          &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;Account Activity&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Here’s a summary of recent actions on your account.&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;/mui-card-header&gt;<br><br>

          &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Today --&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Signed in from new device&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;10:32 AM&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Password changed&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Security settings updated&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;08:47 AM&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Yesterday --&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Yesterday&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;21 July 2025&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;2FA code sent&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Method: SMS&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;04:19 PM&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
          &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
          &lt;/mui-card&gt;
        </story-code-block>

      </story-card>

      <story-card
        id="slat-group-detection"
        title="Card: Slat Detection"
        description="When you opt-out, you will have to craft your own spacing."
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
        <story-code-block slot="footer" scrollable>
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
        </story-code-block>
      </story-card>

      <story-card
        id="card-accordion"
        title="Card: Accordion"
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
        <story-code-block slot="footer" scrollable>
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
        </story-code-block>
      </story-card>

      <story-card
        id="card-header-accordion"
        title="Card: Header & Accordion"
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
        <story-code-block slot="footer" scrollable>
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
        </story-code-block>
      </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Card" 
        description="The Card provides the ability to group items or components." 
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-861&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-card"
        guides="https://guides.muibook.com/card"
        storybook="https://stories.muibook.com/?path=/docs/layout-card--docs"
      >

        <mui-message heading="Quicklinks" slot="message">
          <mui-h-stack class="token-item-menu" alignY="center" style="padding-bottom: var(--space-100);">
            <mui-link size="small" data-scroll-link="card">Card</mui-link>
            <mui-link size="small" data-scroll-link="card-footer">Card: Footer</mui-link>
            <mui-link size="small" data-scroll-link="card-image">Card: Image</mui-link>
            <mui-link size="small" data-scroll-link="card-table">Card: Table</mui-link>
            <mui-link size="small" data-scroll-link="card-header-table">Card: Header & Table</mui-link>
            <mui-link size="small" data-scroll-link="slat-group">Slat Group</mui-link>
            <mui-link size="small" data-scroll-link="slat-group-divider">Slat Group: Dividers</mui-link>
            <mui-link size="small" data-scroll-link="slat-group-detection">Slat Group: Detection</mui-link>
            <mui-link size="small" data-scroll-link="card-accordion">Card: Accordion</mui-link>
            <mui-link size="small" data-scroll-link="card-header-accordion">Card: Header & Accordion</mui-link>
            
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

customElements.define("story-cards", storyCards);
