import Snow from "../../../images/mesh/snowy-mint.png";
import Visa from "../../../images/networks/visa-black.svg";
import Mui from "../../../images/mui/mui.svg";

class compWallet extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { 
        display: block;
      }

      .slat {
        padding-left: var(--space-400);
        padding-right: var(--space-400);
      }

      mui-button::part(padding) {
        border: 0;
        padding: var(--space-400) var(--space-400);
        background: var(--surface-elevated-100);
      }
      mui-button:focus {
        z-index: 1;
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Wallet"
        description="Creating compositions provide the Design System a view of how the system is working and where it needs flexibility."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/wallet/index.js"
      >

      <mui-v-stack space="var(--space-700)">

        <story-card title="Transactions" description="This composition view demonstrates how foundational components can be used to build a wallet UI, while also surfacing where the system may need more flexibility. Creating compositions like this gives the Design System team valuable insight into how the system is working in practice and where refinements or improvements such as enhancements to the slat component may be needed.">


          <mui-v-stack alignX="stretch" slot="body" style="max-width: 365px; margin: 0 auto; padding-top: var(--space-700); padding-bottom: var(--space-700)">
            <mui-smart-card
              variant="animated"
              partner="${Visa}"
              type="Debit"
              number="1234"
              logo="${Mui}"
              logo-height="100"
              bg-image="${Snow}"
            >
            </mui-smart-card>


            <mui-tab-controller>

              <mui-v-stack alignX="stretch" style="max-width: 100%;">

                <mui-tab-bar>
                  <mui-tab-item active id="item1">Transactions</mui-tab-item>
                  <mui-tab-item id="item2">Statements</mui-tab-item>
                </mui-tab-bar>

                <mui-tab-panel item="item1">
                  <mui-v-stack alignX="stretch" space="var(--space-000)">
                    <mui-slat variant="row">
                      <mui-v-stack slot="start" space="0">
                        <mui-body size="medium" weight="bold">Espresso Bar</mui-body>
                        <mui-body size="small">Food & Drink</mui-body>
                      </mui-v-stack>
                      <mui-v-stack space="0" slot="end" alignX="end">
                        <mui-body size="small">Pending</mui-body>
                        <mui-body size="small">-$8.12</mui-body>
                      </mui-v-stack>
                    </mui-slat>

                    <mui-slat variant="row">
                      <mui-v-stack slot="start" space="0">
                        <mui-body size="medium" weight="bold">Apple App Store</mui-body>
                        <mui-body size="small">Entertainment</mui-body>
                      </mui-v-stack>
                      <mui-v-stack space="0" slot="end" alignX="end">
                        <mui-body size="small">Pending</mui-body>
                        <mui-body size="small">-$4.99</mui-body>
                      </mui-v-stack>
                    </mui-slat>

                    <mui-slat variant="row">
                      <mui-v-stack slot="start" space="0">
                        <mui-body size="medium" weight="bold">IGA South Yarra</mui-body>
                        <mui-body size="small">Groceries</mui-body>
                      </mui-v-stack>
                      <mui-v-stack space="0" slot="end" alignX="end">
                        <mui-body size="small">Pending</mui-body>
                        <mui-body size="medium">-$26.89</mui-body>
                      </mui-v-stack>
                    </mui-slat>
                  </mui-v-stack>
                </mui-tab-panel>

                <mui-tab-panel item="item2">
                  <mui-v-stack alignX="stretch" space="var(--space-500)">
                    <mui-v-stack space="var(--space-025)">
                      <mui-slat variant="header">
                        <mui-heading size="6" slot="start">Recents</mui-heading>
                      </mui-slat>
                      <mui-slat variant="action">
                        <mui-v-stack space="0" slot="start">
                          <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
                          <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
                        </mui-v-stack>
                        <mui-icon-right-chevron slot="end" size="x-small"></mui-icon-right-chevron>
                      </mui-slat>
                      <mui-slat variant="action">
                        <mui-body size="medium" weight="bold" slot="start">21 Mar 2025</mui-body>
                        <mui-icon-right-chevron slot="end" size="x-small"></mui-icon-right-chevron>
                      </mui-slat>
                    </mui-v-stack>
                    <mui-v-stack space="var(--space-025)">
                      <mui-slat variant="header">
                        <mui-heading size="6" slot="start">All</mui-heading>
                      </mui-slat>
                      <mui-slat variant="action">
                        <mui-body size="medium" weight="bold" slot="start">2025</mui-body>
                        <mui-icon-right-chevron slot="end" size="x-small"></mui-icon-right-chevron>
                      </mui-slat>
                      <mui-slat variant="action">
                        <mui-body size="medium" weight="bold" slot="start">2024</mui-body>
                        <mui-icon-right-chevron slot="end" size="x-small"></mui-icon-right-chevron>
                      </mui-slat>
                    </mui-v-stack>
                  </mui-v-stack>
                </mui-tab-panel>

              </mui-v-stack>

            </mui-tab-controller>

          </mui-v-stack>

          <mui-code slot="footer" scrollable>
            <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/wallet/index.js" target="_blank">👨‍💻 View full file on Github</mui-link>
            <br />
            <br />
            <br />
            &lt;mui-v-stack<br>
            &nbsp;&nbsp;alignX=&quot;stretch&quot;<br>
            &nbsp;&nbsp;slot=&quot;body&quot;<br>
            &nbsp;&nbsp;style=&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;max-width: 365px;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;margin: 0 auto;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;padding-top: var(--space-700);<br>
            &nbsp;&nbsp;&nbsp;&nbsp;padding-bottom: var(--space-700)<br>
            &nbsp;&nbsp;&quot;&gt;<br>

            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-smart-card<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variant=&quot;animated&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partner="./images/visa.svg"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type=&quot;Debit&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number=&quot;1234&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logo="./images/mui-card-black.svg"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logo-height=&quot;100&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg-image="./images/snowy-mint.png"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-smart-card&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-controller&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alignX=&quot;stretch&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style=&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max-width: 100%;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-bar&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id=&quot;item1&quot;&gt;Transactions&lt;/mui-tab-item&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id=&quot;item2&quot;&gt;Statements&lt;/mui-tab-item&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;item1&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack alignX=&quot;stretch&quot; space=&quot;var(--space-400)&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-panel&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;item2&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alignX=&quot;stretch&quot;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;space=&quot;var(--space-500)&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-panel&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-controller&gt;<br>
            &lt;/mui-v-stack&gt;

          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("comp-wallet", compWallet);
