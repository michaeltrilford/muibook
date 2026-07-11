import { getComponentDocs } from "../../../utils/story-data";
import Image from "../../../images/story/image-1080.png";

class storyCards extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Card");
    const attrsReference = JSON.stringify([
      {
        component: "mui-card",
        parentAttrs: [],
        childAttrs: [],
      },
      {
        component: "mui-card-body",
        parentAttrs: ["has-card-slat-group", "has-accordion-slat-group", "inner-space-top"],
        childAttrs: [],
      },
      {
        component: "mui-card-footer",
        parentAttrs: ["has-button-group"],
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

    `;
    const Columns_Action = `1fr 1fr auto`;

    const stories = /*html*/ `
      <mui-v-stack space="var(--space-100)">
        <story-api-types tag="mui-card" title="Card"></story-api-types>
        <story-api-types tag="mui-card-header" title="Card Header"></story-api-types>
        <story-api-types tag="mui-card-body" title="Card Body"></story-api-types>
        <story-api-types tag="mui-card-footer" title="Card Footer"></story-api-types>
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
              <mui-button-group align="right">
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
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group align="right"&gt;
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
                      <mui-dropdown position="right" size="medium">
                        <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
                        <mui-menu>
                          <mui-button>Option one</mui-button>
                          <mui-button>Option two</mui-button>
                        </mui-menu>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Whalen</mui-cell>
                    <mui-cell>$1,100.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right" size="medium">
                        <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
                        <mui-menu>
                          <mui-button>Option one</mui-button>
                          <mui-button>Option two</mui-button>
                        </mui-menu>
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; position="right"&gt;&lt;mui-menu&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br>
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
              <mui-heading size="3">Design Tools</mui-heading>
            </mui-card-header>
            <mui-rule></mui-rule>
            <mui-card-body>
              <mui-table>
                <mui-row-group heading>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Company</mui-cell>
                    <mui-cell>Cost</mui-cell>
                    <mui-cell action>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Figma</mui-cell>
                    <mui-cell>$20.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right" size="medium">
                        <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
                        <mui-menu>
                          <mui-button>Option one</mui-button>
                          <mui-button>Option two</mui-button>
                        </mui-menu>
                      </mui-dropdown>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="${Columns_Action}">
                    <mui-cell>Sketch</mui-cell>
                    <mui-cell>$12.00</mui-cell>
                    <mui-cell action>
                      <mui-dropdown position="right" size="medium">
                        <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
                        <mui-menu>
                          <mui-button>Option one</mui-button>
                          <mui-button>Option two</mui-button>
                        </mui-menu>
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; position="right"&gt;&lt;mui-menu&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns_Action}"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell action&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; position="right"&gt;&lt;mui-menu&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br>
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
          mui-slat-group is added within the mui-card-body to apply an offset for the slat items|||
          Place slats directly inside mui-card-body to inherit alignment|||
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
          Place slats directly inside mui-card-body to inherit alignment|||
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

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data.title}"
        description="${data.description}"
        attrs-reference='${attrsReference}'
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"

        imports='["@muibook/components/mui-card"]'>

        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          limit="10"
          links="card::Card|||card-footer::Card: Footer|||card-image::Card: Image|||card-table::Card: Table|||card-header-table::Card: Header & Table|||slat-group::Slat Group|||slat-group-divider::Slat Group: Dividers|||slat-group-detection::Slat Group: Detection|||card-accordion::Card: Accordion|||card-header-accordion::Card: Header & Accordion"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;

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
  }
}

customElements.define("story-cards", storyCards);
