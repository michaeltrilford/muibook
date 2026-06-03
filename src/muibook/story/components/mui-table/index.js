import { getComponentDocs } from "../../../utils/story-data";

class storyTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Table");
    const attrsReference = JSON.stringify([
      {
        component: "mui-row",
        parentAttrs: ["in-card"],
        childAttrs: [],
      },
    ]);

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

    const stories = /*html*/ `
          <mui-v-stack space="var(--space-100)">
            <story-api-types tag="mui-table" title="Table"></story-api-types>
            <story-api-types tag="mui-row-group" title="Table Row Group"></story-api-types>
            <story-api-types tag="mui-row" title="Table Row"></story-api-types>
            <story-api-types tag="mui-cell" title="Table Cell"></story-api-types>
          </mui-v-stack>

          <story-card title="Table">
            <div class="canvas" slot="body">
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns}">
                    <mui-cell>One</mui-cell>
                    <mui-cell>Two</mui-cell>
                    <mui-cell>Three</mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns}">
                    <mui-cell>One</mui-cell>
                    <mui-cell>Two</mui-cell>
                    <mui-cell>Three</mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns}">
                    <mui-cell>One</mui-cell>
                    <mui-cell>Two</mui-cell>
                    <mui-cell>Three</mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </div>
            <story-code-block slot="footer" scrollable>
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
            </story-code-block>
          </story-card>

          <story-card title="XX-Small Action Size">
            <div class="canvas" slot="body">
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns_Action}" size="xx-small">
                    <mui-cell>Office</mui-cell>
                    <mui-cell>Cost</mui-cell>
                    <mui-cell action></mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns_Action}" size="xx-small">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="xx-small" icon-only><mui-icon-ellipsis size="x-small"></mui-icon-ellipsis></mui-button>
                        <mui-button size="xx-small">Edit</mui-button>
                        <mui-button size="xx-small">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}" size="xx-small">
                    <mui-cell>Peters</mui-cell>
                    <mui-cell>$2,350.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="xx-small" icon-only><mui-icon-ellipsis size="x-small"></mui-icon-ellipsis></mui-button>
                        <mui-button size="xx-small">Edit</mui-button>
                        <mui-button size="xx-small">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </div>
            <story-code-block slot="footer" scrollable>
              const Columns_Action = &#96;1fr 1fr auto&#96;;<br />
              <br />
              &lt;mui-row columns="\${Columns_Action}" size="xx-small"&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell action&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" size="xx-small" icon-only&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size="x-small"&gt;&lt;/mui-icon-ellipsis&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="xx-small"&gt;Edit&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="xx-small"&gt;Archive&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
              &nbsp;&nbsp;&lt;/mui-cell&gt;<br />
              &lt;/mui-row&gt;
            </story-code-block>
          </story-card>

          <story-card title="X-Small Action Size">
            <div class="canvas" slot="body">
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns_Action}" size="x-small">
                    <mui-cell>Office</mui-cell>
                    <mui-cell>Cost</mui-cell>
                    <mui-cell action></mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns_Action}" size="x-small">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="x-small" icon-only><mui-icon-ellipsis size="x-small"></mui-icon-ellipsis></mui-button>
                        <mui-button size="x-small">Edit</mui-button>
                        <mui-button size="x-small">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}" size="x-small">
                    <mui-cell>Peters</mui-cell>
                    <mui-cell>$2,350.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="x-small" icon-only><mui-icon-ellipsis size="x-small"></mui-icon-ellipsis></mui-button>
                        <mui-button size="x-small">Edit</mui-button>
                        <mui-button size="x-small">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </div>
            <story-code-block slot="footer" scrollable>
              const Columns_Action = &#96;1fr 1fr auto&#96;;<br />
              <br />
              &lt;mui-row columns="\${Columns_Action}" size="x-small"&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell action&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" size="x-small" icon-only&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size="x-small"&gt;&lt;/mui-icon-ellipsis&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="x-small"&gt;Edit&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="x-small"&gt;Archive&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
              &nbsp;&nbsp;&lt;/mui-cell&gt;<br />
              &lt;/mui-row&gt;
            </story-code-block>
          </story-card>

          <story-card title="Small Action Size">
            <div class="canvas" slot="body">
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns_Action}" size="small">
                    <mui-cell>Office</mui-cell>
                    <mui-cell>Cost</mui-cell>
                    <mui-cell action></mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns_Action}" size="small">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="small" icon-only><mui-icon-ellipsis size="small"></mui-icon-ellipsis></mui-button>
                        <mui-button size="small">Edit</mui-button>
                        <mui-button size="small">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}" size="small">
                    <mui-cell>Peters</mui-cell>
                    <mui-cell>$2,350.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="small" icon-only><mui-icon-ellipsis size="small"></mui-icon-ellipsis></mui-button>
                        <mui-button size="small">Edit</mui-button>
                        <mui-button size="small">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </div>
            <story-code-block slot="footer" scrollable>
              const Columns_Action = &#96;1fr 1fr auto&#96;;<br />
              <br />
              &lt;mui-row columns="\${Columns_Action}" size="small"&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell action&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" size="small" icon-only&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size="small"&gt;&lt;/mui-icon-ellipsis&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="small"&gt;Edit&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="small"&gt;Archive&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
              &nbsp;&nbsp;&lt;/mui-cell&gt;<br />
              &lt;/mui-row&gt;
            </story-code-block>
          </story-card>

          <story-card title="Medium Action Size">
            <div class="canvas" slot="body">
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns_Action}" size="medium">
                    <mui-cell>Office</mui-cell>
                    <mui-cell>Cost</mui-cell>
                    <mui-cell action></mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns_Action}" size="medium">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="medium" icon-only><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
                        <mui-button size="medium">Edit</mui-button>
                        <mui-button size="medium">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}" size="medium">
                    <mui-cell>Peters</mui-cell>
                    <mui-cell>$2,350.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="medium" icon-only><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
                        <mui-button size="medium">Edit</mui-button>
                        <mui-button size="medium">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </div>
            <story-code-block slot="footer" scrollable>
              const Columns_Action = &#96;1fr 1fr auto&#96;;<br />
              <br />
              &lt;mui-row columns="\${Columns_Action}" size="medium"&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell action&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" size="medium" icon-only&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size="medium"&gt;&lt;/mui-icon-ellipsis&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="medium"&gt;Edit&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="medium"&gt;Archive&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
              &nbsp;&nbsp;&lt;/mui-cell&gt;<br />
              &lt;/mui-row&gt;
            </story-code-block>
          </story-card>

          <story-card title="Large Action Size">
            <div class="canvas" slot="body">
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns_Action}" size="large">
                    <mui-cell>Office</mui-cell>
                    <mui-cell>Cost</mui-cell>
                    <mui-cell action></mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns_Action}" size="large">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="large" icon-only><mui-icon-ellipsis size="large"></mui-icon-ellipsis></mui-button>
                        <mui-button size="large">Edit</mui-button>
                        <mui-button size="large">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}" size="large">
                    <mui-cell>Peters</mui-cell>
                    <mui-cell>$2,350.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right">
                        <mui-button slot="action" variant="tertiary" size="large" icon-only><mui-icon-ellipsis size="large"></mui-icon-ellipsis></mui-button>
                        <mui-button size="large">Edit</mui-button>
                        <mui-button size="large">Archive</mui-button>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>
            </div>
            <story-code-block slot="footer" scrollable>
              const Columns_Action = &#96;1fr 1fr auto&#96;;<br />
              <br />
              &lt;mui-row columns="\${Columns_Action}" size="large"&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br />
              &nbsp;&nbsp;&lt;mui-cell action&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" size="large" icon-only&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size="large"&gt;&lt;/mui-icon-ellipsis&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="large"&gt;Edit&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="large"&gt;Archive&lt;/mui-button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
              &nbsp;&nbsp;&lt;/mui-cell&gt;<br />
              &lt;/mui-row&gt;
            </story-code-block>
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
            <story-code-block slot="footer" scrollable>
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
            </story-code-block>
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
            <story-code-block slot="footer" scrollable>
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
            </story-code-block>
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
                          <mui-dropdown position="right">
                            <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
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
                            <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
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

          <story-card title="Card Header w/ Table" description="You can add in a mui-rule to help add a division between the header and body of the card">
            <div slot="body">
              <mui-card>
                <mui-card-header>
                  <mui-heading size="3">Design Tools</mui-heading>
                </mui-card-header>
                <mui-rule></mui-rule>
                <mui-card-body>
                  <mui-table>
                    <mui-row-group heading>
                      <mui-row columns="${Columns_Action}">
                        <mui-cell>Company</mui-cell>
                        <mui-cell>Monthly Cost</mui-cell>
                        <mui-cell action>
                        </mui-cell>
                      </mui-row>
                    </mui-row-group>
                    <mui-row-group>
                      <mui-row columns="${Columns_Action}">
                        <mui-cell>Figma</mui-cell>
                        <mui-cell>$20.00</mui-cell>
                        <mui-cell action>
                          <mui-dropdown position="right">
                            <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
                            <mui-button>Option one</mui-button>
                            <mui-button>Option two</mui-button>
                          </mui-dropdown>
                        </mui-cell>
                      </mui-row>
                      <mui-row columns="${Columns_Action}">
                        <mui-cell>Sketch</mui-cell>
                        <mui-cell>$12.00</mui-cell>
                        <mui-cell action>
                          <mui-dropdown position="right">
                            <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
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
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
        attrs-reference='${attrsReference}'
      
        imports='["@muibook/components/mui-table"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-table", storyTable);
