class storyTable extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
      .canvas {
        background: var(--surface-elevated-200);
        padding: var(--space-400);
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }

      .local-ring {
        height: 6rem;
        display: flex;
        justify-content: center;
        width: 100%;
      }
      .local-ring_text {
        fill: #1b2830;
        font-size: 1.2rem;
        -webkit-transform: translateY(0.34em);
        transform: translateY(0.34em);
        font-weight: bold;
      }
    `;

    const Columns = `1fr 1fr 1fr auto`;

    const propItems = [
      {
        name: "text",
        required: true,
        type: "string",
        options: "{text}",
        default: "",
        description: "Provides the text for the cell element",
      },
      {
        name: "heading",
        type: "boolean",
        options: "",
        default: "",
        description: "Define the heading styles for the table",
      },
      {
        name: "class",
        type: "CSS class",
        options: "card-slot",
        default: "",
        description:
          "By default, when Table is slotted into the mui-card, padding is automatically added. However, if the mui-accordion is nested within a shadow dom, you have to apply the class for correct padding",
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

    const LocalRing = /*html*/ `
      <div class="local-ring">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 42 42" 
          style="text-anchor: middle; width: 100%;"
        >
          <circle class="local-ring__hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
          <circle class="local-ring__ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="4"></circle>
          <circle class="local-ring__segment VE4Mc" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#000000" stroke-width="4" stroke-dasharray="50,50" stroke-dashoffset="25"></circle>
          <g><text x="50%" y="50%" class="local-ring_text">2/4</text></g>
        </svg>
      </div>
    `;

    const ProgressTableColumns = `1fr 1fr 1fr 126px`;

    const ProgressTableView = /*html*/ `
      <mui-table> 
        <mui-row-group heading> 
          <mui-row columns="${ProgressTableColumns}"> 
            <mui-cell>File</mui-cell> 
            <mui-cell>Due date</mui-cell> 
            <mui-cell>Status</mui-cell> 
            <mui-cell>Automation</mui-cell> 
          </mui-row> 
        </mui-row-group> 
        <mui-row-group> 
          <mui-row columns="${ProgressTableColumns}"> 
            <mui-cell align-y="center"><mui-body size="small">Alison Max</mui-body></mui-cell> 
            <mui-cell align-y="center"><mui-v-stack space="var(--space-050)"><mui-body size="small">27/07/2020</mui-body><mui-badge>Quarterly</mui-badge></mui-v-stack></mui-cell> 
            <mui-cell align-y="center"><mui-badge>Unlodged</mui-badge></mui-cell> 
            <mui-cell align-y="center">${LocalRing}</mui-cell> 
          </mui-row> 
        </mui-row-group> 
      </mui-table>
    `;

    const ProgressSlatView = /*html*/ `
        <mui-v-stack space="var(--space-400)">
          ${LocalRing}
          <mui-heading 
            size="6" 
            style="width: 100%; text-align: center;"
          >
            Transactions automated
          </mui-heading>
          
          <mui-rule></mui-rule>

          <mui-grid col="1fr 1fr 1fr">
          <mui-v-stack space="var(--space-100)">
            <mui-body size="small"><strong>Client</strong></mui-body>
            <mui-body size="small">Alison Max</mui-body>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100)">
            <mui-body size="small" style="text-align: center;"><strong>Due date</strong></mui-body>
            <mui-body size="small" style="text-align: center;">27/07/2020</mui-body>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100)">
            <mui-body size="small" style="text-align: right;"><strong>Status</strong></mui-body>
            <mui-body size="small" style="text-align: right;">Unlodged</mui-body>
          </mui-v-stack>
        </mui-grid>

        </mui-v-stack>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Table"
        description="An HTML table consists of one table element and one or more tr, th, and td elements."
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-table"
      >

        <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small">
              import "@muibook/components/mui-table";<br>
            </mui-code>
          </spec-card>

        <spec-card title="Props: Cell">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

          <story-card title="Table">
            <div class="canvas" slot="body">
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="1fr 1fr 1fr auto">
                    <mui-cell>Office</mui-cell>
                    <mui-cell>Revenue</mui-cell>
                    <mui-cell>Cost</mui-cell>
                    <mui-cell action>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="1fr 1fr 1fr auto">
                    <mui-cell data-label="Office:">Whalen</mui-cell>
                    <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                    <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                    <mui-cell data-label="" action>
                      <mui-button variant="tertiary" > <mui-icon-add></mui-icon-add></mui-button>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="1fr 1fr 1fr auto">
                    <mui-cell data-label="Office:">Whalen</mui-cell>
                    <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                    <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                    <mui-cell data-label="" action>
                      <mui-button variant="tertiary" > <mui-icon-add></mui-icon-add></mui-button>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </div>
            <mui-code slot="footer">
              &lt;mui-table&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-row-group heading&gt;
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="1fr 1fr 1fr auto"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;...&lt;/mui-cell&gt;
                  <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
              &nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-row-group&gt;
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="1fr 1fr 1fr auto"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;...&lt;/mui-cell&gt;
                  <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
              &nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              &lt;/mui-table&gt;
            </mui-code>
          </story-card>

          <story-card title="Responsive table">
            <div class="canvas" slot="body">
              <mui-responsive breakpoint="1080">
                <mui-h-stack slot="showAbove" space="16px" alignY="center">
                  ${ProgressTableView}
                </mui-h-stack>
                <div slot="showBelow">
                  ${ProgressSlatView}
                </div>
              </mui-responsive>
            </div>
            <mui-code slot="footer">
              &lt;mui-responsive breakpoint="600"&gt;
              <br />
              <br />
              &nbsp;&nbsp;&lt;div slot="showAbove"&gt;
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#x24;{ProgressTableView}
              <br />
              &nbsp;&nbsp;&lt;/div&gt;
              <br />
              <br />
              &nbsp;&nbsp;&lt;div slot="showBelow"&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp; &#x24;{ProgressSlatView}
              <br />
              &nbsp;&nbsp;&lt;/div&gt;
              <br />
              <br />
              &lt;/mui-responsive&gt;
            </mui-code>
          </story-card>

        <story-card title="Card w/ Table">
          <div slot="body">
            <mui-card>
              <mui-card-body>
                <mui-table>
                  <mui-row-group heading>
                    <mui-row columns="${Columns}">
                      <mui-cell>Office</mui-cell>
                      <mui-cell>Revenue</mui-cell>
                      <mui-cell>Cost</mui-cell>
                      <mui-cell action></mui-cell>
                    </mui-row>
                  </mui-row-group>
                  <mui-row-group>
                    <mui-row columns="${Columns}">
                      <mui-cell data-label="Office:">Whalen</mui-cell>
                      <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                      <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                      <mui-cell data-label="" action>
                        <mui-button variant="tertiary" > <mui-icon-add></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                    <mui-row columns="${Columns}">
                      <mui-cell data-label="Office:">Whalen</mui-cell>
                      <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                      <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                      <mui-cell data-label="" action>
                        <mui-button variant="tertiary" > <mui-icon-add></mui-icon-add></mui-button>
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell &gt;Office&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell &gt;Revenue&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell &gt;Cost&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Office:"&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Revenue:"&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Cost:"&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="" action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Office:"&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Revenue:"&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Cost:"&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="" action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;<br>
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

        <story-card title="Card Header w/ Table" description="You can add in a mui-rule to help add a division between the header and body of the card">
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
                      <mui-cell>Office</mui-cell>
                      <mui-cell>Revenue</mui-cell>
                      <mui-cell>Cost</mui-cell>
                      <mui-cell action>
                      </mui-cell>
                    </mui-row>
                  </mui-row-group>
                  <mui-row-group>
                    <mui-row columns="${Columns}">
                      <mui-cell data-label="Office:">Whalen</mui-cell>
                      <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                      <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                      <mui-cell data-label="" action>
                        <mui-button variant="tertiary" > <mui-icon-add></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                    <mui-row columns="${Columns}">
                      <mui-cell data-label="Office:">Whalen</mui-cell>
                      <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                      <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                      <mui-cell data-label="" action>
                        <mui-button variant="tertiary" > <mui-icon-add></mui-icon-add></mui-button>
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Office&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Revenue&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Cost&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Office:"&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Revenue:"&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Cost:"&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="" action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Office:"&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Revenue:"&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Cost:"&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="" action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-table&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </mui-code>
        </story-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-table", storyTable);
