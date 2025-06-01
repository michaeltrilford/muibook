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
    `;

    const AgentPrompt = /*html*/ `

      <style>
        .canvas {
          background: var(--surface);
          padding: var(--space-400);
          margin-top: calc(var(--space-400) * -1);
          margin-bottom: calc(var(--space-400) * -1);
          margin-left: calc(var(--space-400) * -1);
          margin-right: calc(var(--space-400) * -1);
        }

        .prompt-input { 
          padding: var(--space-400);
          padding-bottom: var(--space-200);
          background: var(--surface-elevated-alpha);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-300);
        }

        .prompt-toolbar::part(justify-content) {
          justify-content: space-between;
        }
      </style>

      <div class="canvas">
        <mui-v-stack class="prompt-input" space="var(--space-200)">
          <mui-input label="Default" hide-label placeholder="Reply to Mui..."></mui-input>

          <mui-h-stack class="prompt-toolbar" space="var(--space-200)">
            <mui-h-stack space="var(--space-000)">
              <mui-icon-toggle rotate variant="tertiary">
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
              <mui-button variant="tertiary" icon-only>
                <mui-icon-globe></mui-icon-globe>
              </mui-button>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-icon-toggle rotate variant="tertiary">
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-stop slot="end"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-h-stack>
          </mui-h-stack>
        </mui-v-stack>
      </div>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Wallet"
        description=""
      >

      <mui-v-stack space="var(--space-700)">

        <story-card title="Transactions">

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

            <mui-slat style="padding-left: var(--space-400); padding-right: var(--space-400);">
              <mui-v-stack slot="start" space="0" slot="end">
                <mui-body size="small" weight="bold">Espresso Bar</mui-body>
                <mui-body size="x-small">Food & Drink</mui-body>
              </mui-v-stack>
              <mui-v-stack space="0" slot="end" alignX="end">
                <mui-body size="x-small">Pending</mui-body>
                <mui-body size="small">-$8.12</mui-body>
              </mui-v-stack>
            </mui-slat>

            <mui-slat style="padding-left: var(--space-400); padding-right: var(--space-400);">
              <mui-v-stack slot="start" space="0" slot="end">
                <mui-body size="small" weight="bold">Apple App Store</mui-body>
                <mui-body size="x-small">Entertainment</mui-body>
              </mui-v-stack>
              <mui-v-stack space="0" slot="end" alignX="end">
                <mui-body size="x-small">Pending</mui-body>
                <mui-body size="small">-$4.99</mui-body>
              </mui-v-stack>
            </mui-slat>

            <mui-slat style="padding-left: var(--space-400); padding-right: var(--space-400);">
              <mui-v-stack slot="start" space="0" slot="end">
                <mui-body size="small" weight="bold">IGA South Yarra</mui-body>
                <mui-body size="x-small">Groceries</mui-body>
              </mui-v-stack>
              <mui-v-stack space="0" slot="end" alignX="end">
                <mui-body size="x-small">Pending</mui-body>
                <mui-body size="small">-$26.89</mui-body>
              </mui-v-stack>
            </mui-slat>

          </mui-v-stack>

          <mui-code slot="footer">
          &lt;mui-v-stack<br>
          &nbsp;&nbsp;alignX="stretch"<br>
          &nbsp;&nbsp;style="<br>
          &nbsp;&nbsp;&nbsp;&nbsp;max-width: 365px;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;margin: 0 auto;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;padding-top: var(--space-700);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;padding-bottom: var(--space-700)<br>
          &nbsp;&nbsp;"<br>
          &gt;<br><br>

          &nbsp;&nbsp;&lt;mui-smart-card<br>
          &nbsp;&nbsp;&nbsp;&nbsp;variant="virtual"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;provider="visa"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;type="Debit"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;number="1234"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;logo="./images/mui-card-black.svg"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;logo-height="100"<br>
          &nbsp;&nbsp;&gt;&lt;/mui-smart-card&gt;<br><br>

          &nbsp;&nbsp;&lt;mui-slat<br>
          &nbsp;&nbsp;&nbsp;&nbsp;style="padding-left: var(--space-400);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding-right: var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Espresso Bar&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Food &amp; Drink&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="end" space="0" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Pending&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;-$8.12&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

          &nbsp;&nbsp;&lt;mui-slat<br>
          &nbsp;&nbsp;&nbsp;&nbsp;style="padding-left: var(--space-400);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding-right: var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Apple App Store&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Entertainment&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="end" space="0" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Pending&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;-$4.99&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

          &nbsp;&nbsp;&lt;mui-slat<br>
          &nbsp;&nbsp;&nbsp;&nbsp;style="padding-left: var(--space-400);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding-right: var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;IGA South Yarra&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Groceries&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="end" space="0" alignX="end"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Pending&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;-$26.89&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

          &lt;/mui-v-stack&gt;
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("comp-wallet", compWallet);
