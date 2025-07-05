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

    const tablePropItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-row-group",
        default: "(required)",
        description: "Houses the table content",
      },
    ];

    const rowGroupPropItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-row",
        default: "(required)",
        description: "Houses the table rows",
      },
      {
        name: "heading",
        type: "boolean",
        options: "heading",
        default: "",
        description: "Defines the table header",
      },
    ];

    const rowPropItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-cell",
        default: "(required)",
        description: "Populate the table rows",
      },
      {
        name: "columns",
        type: "string",
        options: "1fr 1fr 1fr, 1fr 1fr auto, etc...",
        default: "",
        description:
          "Define the overall table layout using the grid-template-columns CSS property. Any valid grid-template-columns value can be used to control column sizing and distribution.",
      },
    ];

    const cellPropItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{text}, {elements}",
        default: "(required)",
        description: "Provides the content for the cell element",
      },
      {
        name: "action",
        type: "boolean",
        options: "action",
        default: "",
        description:
          "When a single action is added—typically in the last column—use the action boolean to apply it to both the cell and its header. Set the corresponding column width on the row to auto to ensure proper sizing.",
      },
      {
        name: "checkbox",
        type: "boolean",
        options: "checkbox",
        default: "",
        description:
          "When a checkbox is added—typically in the first column—use the checkbox boolean to apply it to both the cell and its header. Set the corresponding column width on the row to auto to ensure proper sizing.",
      },
      {
        name: "class",
        type: "CSS class",
        options: "",
        default: "",
        description:
          "An alternative to using the action boolean when adding custom elements to a column. Allows for more control by applying a custom CSS class to style the table. Not limited to the last column.",
      },
    ];

    const cellRows = cellPropItems
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

    const cellAccordions = cellPropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === cellPropItems.length - 1 ? "last-child" : "";

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

    const rowRows = rowPropItems
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

    const rowAccordions = rowPropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === rowPropItems.length - 1 ? "last-child" : "";

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

    const rowGroupRows = rowGroupPropItems
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

    const rowGroupAccordions = rowGroupPropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === rowGroupPropItems.length - 1 ? "last-child" : "";

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

    const tableRows = tablePropItems
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

    const tableAccordions = tablePropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === tablePropItems.length - 1 ? "last-child" : "";

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

    const Columns = `1fr 1fr 1fr`;
    const Columns_Action = `1fr 1fr auto`;
    const Columns_ProgressTable = `1fr 1fr 1fr 126px`;

    const ProgressDesktopView = /*html*/ `
      <mui-table> 
        <mui-row-group heading> 
          <mui-row columns="${Columns_ProgressTable}"> 
            <mui-cell>File</mui-cell> 
            <mui-cell>Due date</mui-cell> 
            <mui-cell>Status</mui-cell> 
            <mui-cell>Automation</mui-cell> 
          </mui-row> 
        </mui-row-group> 
        <mui-row-group> 
          <mui-row columns="${Columns_ProgressTable}"> 
            <mui-cell align-y="center"><mui-body size="small">Alison Max</mui-body></mui-cell> 
            <mui-cell align-y="center"><mui-v-stack space="var(--space-050)"><mui-body size="small">27/07/2020</mui-body><mui-badge>Quarterly</mui-badge></mui-v-stack></mui-cell> 
            <mui-cell align-y="center"><mui-badge>Unlodged</mui-badge></mui-cell> 
            <mui-cell align-y="center">${LocalRing}</mui-cell> 
          </mui-row> 
        </mui-row-group> 
      </mui-table>
    `;

    const ProgressMobileView = /*html*/ `
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

    const TableData = [
      {
        name: "Figma",
        billed: "Monthly",
        cost: "$20.00",
      },
      {
        name: "Sketch",
        billed: "Monthly",
        cost: "$12.00",
      },
    ];

    const TableRow = TableData.map(
      (prop) => /*html*/ `
        <mui-row columns="${Columns}">
          <mui-cell>${prop.name}</mui-cell>
          <mui-cell><mui-badge>${prop.billed}</mui-badge></mui-cell>
          <mui-cell>${prop.cost}</mui-cell>
        </mui-row>
      `
    ).join("");

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Table"
        description="This system uses custom elements designed for flexibility and styling control. It leverages CSS Grid to give developers precise control over column layout, spacing, and responsiveness, while maintaining alignment with screen reader expectations."
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-table"
        accessibility="
          mui-table uses role='table';
          mui-row-group uses role='rowgroup';
          mui-row uses role='row';
          mui-cell uses role='cell';
          Follows table semantics for screen reader support
        "
      >

        <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small">
              import "@muibook/components/mui-table";<br>
            </mui-code>
          </spec-card>

          <spec-card title="Props: Table">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${tableRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${tableAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

          <spec-card title="Props: RowGroup">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${rowGroupRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${rowGroupAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

          <spec-card title="Props: Row">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${rowRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${rowAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

          <spec-card title="Props: Cell">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${cellRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${cellAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

          <story-card title="Table">
            <div class="canvas" slot="body">
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns}">
                    <mui-cell>Col One</mui-cell>
                    <mui-cell>Col Two</mui-cell>
                    <mui-cell>Col Three</mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns}">
                    <mui-cell>Col One</mui-cell>
                    <mui-cell>Col Two</mui-cell>
                    <mui-cell>Col Three</mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns}">
                    <mui-cell>Col One</mui-cell>
                    <mui-cell>Col Two</mui-cell>
                    <mui-cell>Col Three</mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </div>
            <mui-code slot="footer">
              const Columns = &#96;1fr 1fr 1fr&#96;;<br>
              <br>
              &lt;mui-table&gt;
              <br />
              <br />
              &nbsp;&nbsp;// Table Header
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br />
              <br />
              &nbsp;&nbsp;&lt;mui-row-group heading&gt;
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
              &nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              <br />
              &nbsp;&nbsp;// Table Body
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br />
              <br />
              &nbsp;&nbsp;&lt;mui-row-group&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
              &nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              <br />
              &lt;/mui-table&gt;
            </mui-code>
          </story-card>

          <story-card 
            title="Table w/ Action"
            description="When a single action is added, it is usually placed in the last column. Use the action boolean to apply it to both the cell and its header. Set the corresponding column width on the row to auto to ensure proper sizing."          
          >
            <div class="canvas" slot="body">
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
                      <mui-button variant="tertiary" > <mui-icon-add></mui-icon-add></mui-button>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-button variant="tertiary" > <mui-icon-add></mui-icon-add></mui-button>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </div>
            <mui-code slot="footer">
              const Columns_Action = &#96;1fr 1fr auto&#96;;<br>
              <br>
              &lt;mui-table&gt;
              <br />
              <br />
              &nbsp;&nbsp;// Table Header
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br />
              <br />
              &nbsp;&nbsp;&lt;mui-row-group heading&gt;
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;
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
              <br />
              &nbsp;&nbsp;// Table Body
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br />
              <br />
              &nbsp;&nbsp;&lt;mui-row-group&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;...&lt;/mui-cell&gt;
                  <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;
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
              <br />
              &lt;/mui-table&gt;
            </mui-code>
          </story-card>

          <story-card 
            title="Mapping Data"
            description="Use the .map() method to dynamically inject rows into your table based on your data set."
          >
            <div class="canvas" slot="body">
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns}">
                    <mui-cell>Name</mui-cell>
                    <mui-cell>Billed</mui-cell>
                    <mui-cell>Cost</mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  ${TableRow}
                </mui-row-group>
              </mui-table>
            </div>
            <mui-code slot="footer">
              <br />
              <br />
              &nbsp;&nbsp;// Table Data
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br />
              <br />
              &nbsp;&nbsp;const TableData = [<br>
              &nbsp;&nbsp;&nbsp;&nbsp;{<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: &quot;Figma&quot;,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;billed: &quot;Monthly&quot;,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cost: &quot;$20.00&quot;,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;},<br>
              &nbsp;&nbsp;&nbsp;&nbsp;{<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: &quot;Sketch&quot;,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;billed: &quot;Monthly&quot;,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cost: &quot;$12.00&quot;,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;},<br>
              &nbsp;&nbsp;];<br>
              <br />
              <br />
              &nbsp;&nbsp;// Map Data to Component
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br />
              <br />
              &nbsp;&nbsp;const TableRow = TableData.map(<br>
              &nbsp;&nbsp;&nbsp;&nbsp;(prop) =&gt; /*html*/ &#96;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns=&quot;\${Columns}&quot;&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;\${prop.name}&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge&gt;\${prop.billed}&lt;/mui-badge&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;\${prop.cost}&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&#96;<br>
              &nbsp;&nbsp;).join(&quot;&quot;);<br>
              <br>
              <br>
              &lt;mui-table&gt;
              <br />
              <br />
              &nbsp;&nbsp;// Table Header
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br />
              <br />
              &nbsp;&nbsp;&lt;mui-row-group heading&gt;
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Name&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Billed&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Cost&lt;/mui-cell&gt;
                  <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
              &nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              <br />
              &nbsp;&nbsp;// Table Body
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br />
              <br />
              &nbsp;&nbsp;&lt;mui-row-group&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp; &#x24;{TableRow}
              <br />
              &nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              <br />
              &lt;/mui-table&gt;
            </mui-code>
          </story-card>

          <story-card title="Responsive Table" github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-table/index.js">
            <div class="canvas" slot="body">
              <mui-responsive breakpoint="1080">
                <mui-h-stack slot="showAbove" space="16px" alignY="center">
                  ${ProgressDesktopView}
                </mui-h-stack>
                <div slot="showBelow">
                  ${ProgressMobileView}
                </div>
              </mui-responsive>
            </div>
            <mui-code slot="footer">
              &lt;mui-responsive breakpoint="600"&gt;
              <br />
              <br />

              &nbsp;&nbsp;// Desktop Composition
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br>
              <br>
              &nbsp;&nbsp;&lt;div slot="showAbove"&gt;
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#x24;{ProgressDesktopView}
              <br />
              &nbsp;&nbsp;&lt;/div&gt;
              <br />
              <br />
              &nbsp;&nbsp;// Mobile Composition
              <br>
              &nbsp;&nbsp;/////////////////////////////////////
              <br>
              <br>
              &nbsp;&nbsp;&lt;div slot="showBelow"&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp; &#x24;{ProgressMobileView}
              <br />
              &nbsp;&nbsp;&lt;/div&gt;
              <br />
              <br />
              &lt;/mui-responsive&gt;
            </mui-code>
          </story-card>

          <story-card 
            title="Card with Table"
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
                          <mui-button variant="tertiary" > <mui-icon-add></mui-icon-add></mui-button>
                        </mui-cell>
                      </mui-row>
                      <mui-row columns="${Columns_Action}">
                        <mui-cell>Whalen</mui-cell>
                        <mui-cell>$1,100.00</mui-cell>
                        <mui-cell action>
                          <mui-button variant="tertiary"> <mui-icon-add></mui-icon-add></mui-button>
                        </mui-cell>
                      </mui-row>
                    </mui-row-group>
                  </mui-table>
                </mui-card-body>
              </mui-card>
            </div>
            <mui-code slot="footer">
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary"&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-table&gt;<br>
              &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
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
                          <mui-button variant="tertiary" ><mui-icon-add></mui-icon-add></mui-button>
                        </mui-cell>
                      </mui-row>
                      <mui-row columns="${Columns_Action}">
                        <mui-cell>Whalen</mui-cell>
                        <mui-cell>$1,100.00</mui-cell>
                        <mui-cell action>
                          <mui-button variant="tertiary" ><mui-icon-add></mui-icon-add></mui-button>
                        </mui-cell>
                      </mui-row>
                    </mui-row-group>
                  </mui-table>
                </mui-card-body>
              </mui-card>
            </div>
            <mui-code slot="footer">
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary"&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary"&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
              <br>
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
