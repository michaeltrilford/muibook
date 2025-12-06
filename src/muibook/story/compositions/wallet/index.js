import Snow from "../../../images/mesh/snowy-mint.png";
import Visa from "../../../images/networks/visa-black.svg";
import Mui from "../../../images/mui/mui.svg";
import LogoPlaceholder from "../../../images/card/image-220.png";

class compWallet extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { 
        display: block;
      }
        .canvas {
          background: var(--app-story-wallet-card);
          padding: var(--space-400);
          margin-top: calc(var(--space-400) * -1);
          margin-bottom: calc(var(--space-400) * -1);
          margin-left: calc(var(--space-400) * -1);
          margin-right: calc(var(--space-400) * -1);
        }

    `;

    const transactions = /*html*/ `
      <story-card title="Transactions" description="This composition view demonstrates how foundational components can be used to build a wallet UI, while also surfacing where the system may need more flexibility. Creating compositions like this gives the Design System team valuable insight into how the system is working in practice and where refinements or improvements such as enhancements to the slat component may be needed.">
        <div class="canvas" slot="body">
        <mui-v-stack alignX="stretch" style="max-width: 365px; margin: 0 auto; padding-top: var(--space-700); padding-bottom: var(--space-700)">
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

            <mui-v-stack alignX="stretch" style="max-width: 100%;" space="var(--space-300)">

              <mui-tab-bar>
                <mui-tab-item active id="item1">Transactions</mui-tab-item>
                <mui-tab-item id="item2">Statements</mui-tab-item>
              </mui-tab-bar>

              <mui-tab-panel item="item1">

                <mui-slat-group>
                  <mui-slat variant="header">
                    <mui-heading slot="start" size="6">Today</mui-heading>
                    <mui-h-stack slot="end" alignX="end">
                      <mui-body size="small">22 July 2025</mui-body>
                    </mui-h-stack>
                  </mui-slat>
                  <mui-slat variant="row" col="1fr auto">

                    <mui-avatar slot="accessory">
                      <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
                    </mui-avatar>

                    <mui-v-stack slot="start" space="0">
                      <mui-body size="medium" weight="bold">Espresso Bar</mui-body>
                      <mui-body size="small">Food & Drink</mui-body>
                    </mui-v-stack>
                    <mui-v-stack space="0" slot="end" alignX="end">
                      <mui-body size="small">Pending</mui-body>
                      <mui-body size="small">-$8.12</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                  <mui-slat variant="row" col="1fr auto">

                    <mui-avatar slot="accessory">
                      <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
                    </mui-avatar>

                    <mui-v-stack slot="start" space="0">
                      <mui-body size="medium" weight="bold">Apple App Store</mui-body>
                      <mui-body size="small">Entertainment</mui-body>
                    </mui-v-stack>
                    <mui-v-stack space="0" slot="end" alignX="end">
                      <mui-body size="small">Pending</mui-body>
                      <mui-body size="small">-$4.99</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                  <mui-slat variant="header">
                    <mui-heading slot="start" size="6">Yesterday</mui-heading>
                    <mui-h-stack slot="end" alignX="end">
                      <mui-body size="small">21 July 2025</mui-body>
                    </mui-h-stack>
                  </mui-slat>
                  <mui-slat variant="row" col="1fr auto">

                    <mui-avatar slot="accessory">
                      <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
                    </mui-avatar>

                    <mui-v-stack slot="start" space="0">
                      <mui-body size="medium" weight="bold">IGA South Yarra</mui-body>
                      <mui-body size="small">Groceries</mui-body>
                    </mui-v-stack>
                    <mui-v-stack space="0" slot="end" alignX="end">
                      <mui-body size="small">Pending</mui-body>
                      <mui-body size="medium">-$26.89</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                </mui-slat-group>

              </mui-tab-panel>

              <mui-tab-panel item="item2">
                <mui-slat-group>
                  <mui-slat variant="header">
                    <mui-heading size="6" slot="start">Recents</mui-heading>
                  </mui-slat>
                  <mui-slat variant="action">
                    <mui-v-stack space="0" slot="start">
                      <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
                      <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                  <mui-slat variant="action">
                    <mui-body size="medium" weight="bold" slot="start">21 Mar 2025</mui-body>
                  </mui-slat>
                  <mui-slat variant="header">
                    <mui-heading size="6" slot="start">All</mui-heading>
                  </mui-slat>
                  <mui-slat variant="action">
                    <mui-body size="medium" weight="bold" slot="start">2025</mui-body>
                  </mui-slat>
                  <mui-slat variant="action">
                    <mui-body size="medium" weight="bold" slot="start">2024</mui-body>
                  </mui-slat>
                </mui-slat-group>
              </mui-tab-panel>

            </mui-v-stack>

          </mui-tab-controller>

        </mui-v-stack>

        </div>

        <story-code-block slot="footer" scrollable>
          <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/wallet/index.js" target="_blank">👨‍💻 View full file on Github</mui-link>
          <br />
          <br />
          <br />
          &lt;mui-v-stack<br>
          &nbsp;&nbsp;alignX=&quot;stretch&quot;<br>
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-panel&gt;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;item2&quot;&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-panel&gt;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-controller&gt;<br>
          &lt;/mui-v-stack&gt;

        </story-code-block>
      </story-card>

    `;

    const settings = /*html*/ `
      <story-card 
        title="Settings"
        description="An example of a settings screen where users can personalise their card by uploading custom artwork for the card background and logo."
        usage="
        This example uses the advanced persistent dropdown pattern to keep the dropdown open while interacting with the file upload component.; 
        Learn more about the <mui-link size='small' href='/#/dropdown'>dropdown</mui-link> component and its events in the documentation.;
        The code in this example is prototype code and not production ready, but it demonstrates how you can build this type of interaction with the MUI components.">
        ">
        
        <mui-v-stack alignX="stretch" space="var(--space-200)" slot="body" style="max-width: 365px; margin: 0 auto; padding-top: var(--space-700); padding-bottom: var(--space-700)">

          <mui-heading size="3" level="2">Personalise Card</mui-heading>

          <mui-slat-group data-group="card-artwork">

            <mui-slat variant="row" style="grid-template-columns: 2fr auto;">
              <mui-v-stack slot="start" space="0">
                <mui-body size="medium" weight="bold">Artwork</mui-body>
                <mui-body size="small" data-preferred-size>Preferred size: 395×248</mui-body>
                <mui-body size="small" data-file-name style="display: none;"></mui-body>
              </mui-v-stack>
              <mui-h-stack space="0" slot="end" alignX="end">
                <mui-button data-background-reset variant="tertiary" style="display: none;">Reset</mui-button>
                <mui-dropdown data-toggle-dropdown="background" data-file-preview="true" position="center">
                  <mui-button slot="action" variant="secondary">
                    <mui-icon-toggle data-toggle-control="background" rotate>
                      <mui-icon-add slot="start"></mui-icon-add>
                      <mui-icon-subtract slot="end"></mui-icon-subtract>
                    </mui-icon-toggle>
                  </mui-button>
                  <mui-v-stack space="var(--space-300)" style="padding: var(--space-300) var(--space-500) var(--space-500) var(--space-500);">
                  <mui-heading size="3" level="2">Preview</mui-heading>
                    <mui-smart-card
                      type="Debit"
                      number="1234"
                      partner="${Visa}"
                      logo="${LogoPlaceholder}"
                      variant="plain"
                    >
                    </mui-smart-card>
                    <mui-file-upload
                      acceptedFileTypes=".pdf,.jpg,.png,.svg"
                      currentFileName="Upload Artwork"></mui-file-upload>
                    </mui-v-stack>
                </mui-dropdown>
              </mui-h-stack>
            </mui-slat>

          </mui-slat-group>


        </mui-v-stack>

        <story-code-block slot="footer" scrollable>    

          &lt;mui-v-stack<br>
          &nbsp;&nbsp;alignX=&quot;stretch&quot;<br>
          &nbsp;&nbsp;space=&quot;var(--space-200)&quot;<br>
          &nbsp;&nbsp;style=&quot;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;max-width: 365px;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;margin: 0 auto;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;padding-top: var(--space-700);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;padding-bottom: var(--space-700)<br>
          &nbsp;&nbsp;&quot;&gt;<br><br>

          &nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot; level=&quot;2&quot;&gt;Personalise Card&lt;/mui-heading&gt;<br/><br/>
          &nbsp;&nbsp;&lt;mui-slat-group data-group=&quot;card-artwork&quot;&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;row&quot; style=&quot;grid-template-columns: 2fr auto;&quot;&gt;<br/><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;medium&quot; weight=&quot;bold&quot;&gt;Artwork&lt;/mui-body&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; data-preferred-size&gt;Preferred size: 395×248&lt;/mui-body&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; data-file-name style=&quot;display: none;&quot;&gt;&lt;/mui-body&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br/><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br/><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-background-reset variant=&quot;tertiary&quot; style=&quot;display: none;&quot;&gt;Reset&lt;/mui-button&gt;<br/><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown data-toggle-dropdown=&quot;background&quot; data-file-preview=&quot;true&quot; position=&quot;center&quot;&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot=&quot;action&quot; variant=&quot;secondary&quot;&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-toggle data-toggle-control=&quot;background&quot; rotate&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot=&quot;start&quot;&gt;&lt;/mui-icon-add&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot=&quot;end&quot;&gt;&lt;/mui-icon-subtract&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br/><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-300)&quot; style=&quot;padding: var(--space-300) var(--space-500) var(--space-500) var(--space-500);&quot;&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot; level=&quot;2&quot;&gt;Preview&lt;/mui-heading&gt;<br/>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-smart-card<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variant=&quot;plain&quot;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partner="./images/visa.svg"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type=&quot;Debit&quot;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number=&quot;1234&quot;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logo="./images/mui-card-black.svg"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logo-height=&quot;100&quot;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bg-image="./images/snowy-mint.png"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-smart-card&gt;<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-upload acceptedFileTypes=&quot;.pdf,.jpg,.png,.svg&quot; currentFileName=&quot;Upload Artwork&quot;&gt;&lt;/mui-file-upload&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br/><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br/><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br/>
          &nbsp;&nbsp;&lt;/mui-slat-group&gt;<br/>
          &lt;/mui-v-stack&gt;

          <br><br><br>

          // Persistent Toggle Logic<br>
          ///////////////////////////////////////////////////////////////////<br><br>
          shadowRoot.querySelectorAll("[data-toggle-dropdown]").forEach((dropdown) =&gt; {<br>
          &nbsp;&nbsp;const toggleId = dropdown.getAttribute("data-toggle-dropdown");<br>
          &nbsp;&nbsp;const toggle = shadowRoot.querySelector(&#96;[data-toggle-control="\${toggleId}"]&#96;);<br>
          &nbsp;&nbsp;if (!toggle) return;<br><br>
          &nbsp;&nbsp;dropdown.addEventListener("dropdown-toggle", (event) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const open = event.detail.open;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Toggle the icon + ARIA state<br>
          &nbsp;&nbsp;&nbsp;&nbsp;toggle.toggle = open;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;toggle.setAttribute("aria-pressed", String(open));<br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Toggle persistent dynamically<br>
          &nbsp;&nbsp;&nbsp;&nbsp;dropdown.toggleAttribute("persistent", open);<br>
          &nbsp;&nbsp;});<br><br>

          &nbsp;&nbsp;dropdown.addEventListener("focusout", function(event) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;var relatedTarget = event.relatedTarget;<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;// Ignore if focus is still within the dropdown<br>
            &nbsp;&nbsp;&nbsp;&nbsp;if (relatedTarget && dropdown.contains(relatedTarget)) return;<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;// Otherwise, focus has moved outside<br>
            &nbsp;&nbsp;&nbsp;&nbsp;toggle.toggle = false;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;toggle.setAttribute("aria-pressed", "false");<br>
            &nbsp;&nbsp;&nbsp;&nbsp;dropdown.removeAttribute("persistent"); // or close your menu here<br>
          &nbsp;&nbsp;});

          <br><br><br>
          
          // File Upload Logic<br>
          ///////////////////////////////////////////////////////////////////<br><br>
          shadowRoot.querySelectorAll("[data-file-preview]").forEach((dropdown) =&gt; {<br>
          &nbsp;&nbsp;let currentObjectURL = null;<br>
          &nbsp;&nbsp;const smartCard = dropdown.querySelector("mui-smart-card");<br>
          &nbsp;&nbsp;// Handle file upload<br>
          &nbsp;&nbsp;dropdown.addEventListener("file-upload", function(event) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const file = event.detail.file;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (!file) return;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const objectURL = URL.createObjectURL(file);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;currentObjectURL = objectURL;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const smartCard = dropdown.querySelector("mui-smart-card");<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (smartCard) smartCard.setAttribute("bg-image", objectURL);<br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;// Handle reset: Use data-reset-image<br>
          &nbsp;&nbsp;const resetBtn = dropdown.querySelector("[data-reset-image]");<br>
          &nbsp;&nbsp;if (resetBtn) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;resetBtn.addEventListener("click", () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (currentObjectURL) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;URL.revokeObjectURL(currentObjectURL);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentObjectURL = null;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (smartCard) smartCard.removeAttribute("bg-image");<br>
          &nbsp;&nbsp;&nbsp;&nbsp;});<br>
          &nbsp;&nbsp;}<br>
          });<br>


          
        </story-code-block>
      </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Wallet"
        description="Creating compositions provide the Design System a view of how the system is working and where it needs flexibility."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/wallet/index.js"
        storybook="https://stories.muibook.com/?path=/docs/compositions-wallet--docs"
      >
        ${transactions}
        ${settings}
      </story-template>
    `;

    // === Persistent Toggle Logic ===
    shadowRoot.querySelectorAll("[data-toggle-dropdown]").forEach((dropdown) => {
      const toggleId = dropdown.getAttribute("data-toggle-dropdown");
      const toggle = shadowRoot.querySelector(`[data-toggle-control="${toggleId}"]`);
      if (!toggle) return;

      dropdown.addEventListener("dropdown-toggle", (event) => {
        const open = event.detail.open;

        // Toggle the icon + ARIA state
        toggle.toggle = open;
        toggle.setAttribute("aria-pressed", String(open));

        // Toggle persistent dynamically
        dropdown.toggleAttribute("persistent", open);
      });

      dropdown.addEventListener("focusout", function(event) {
        var relatedTarget = event.relatedTarget;

        // Ignore if focus is still within the dropdown
        if (relatedTarget && dropdown.contains(relatedTarget)) return;

        // Otherwise, focus has moved outside
        toggle.toggle = false;
        toggle.setAttribute("aria-pressed", "false");
        dropdown.removeAttribute("persistent"); // or close your menu here
      });
    });

    // === Individual Reset Buttons for Background / Logo ===
    shadowRoot.querySelectorAll("[data-group='card-artwork']").forEach((group) => {
      // Background reset
      const bgResetBtn = group.querySelector("[data-background-reset]");
      if (bgResetBtn) {
        bgResetBtn.addEventListener("click", () => {
          // Clear bg-image for all cards in the group
          group.querySelectorAll("mui-smart-card").forEach((card) => {
            card.removeAttribute("bg-image");
          });

          // Reset only the background file-name in the same slat
          const parentSlat = bgResetBtn.closest("mui-slat");
          const fileNameEl = parentSlat?.querySelector("[data-file-name]");
          const dropdown = parentSlat?.querySelector("[data-toggle-dropdown='background']");
          const fileUpload = parentSlat?.querySelector("mui-file-upload"); // ← added

          if (fileNameEl) {
            fileNameEl.textContent = "";
            fileNameEl.style.display = "none";
          }

          // Reset the file-upload component completely
          if (fileUpload) {
            fileUpload.currentFileName = "Upload Artwork";
            fileUpload.selectedFileName = null;
            if (fileUpload.shadowRoot) {
              const label = fileUpload.shadowRoot.querySelector(".label");
              if (label) label.textContent = fileUpload.currentFileName;
            }
            fileUpload.value = null;
          }

          if (dropdown?._currentObjectURL) {
            URL.revokeObjectURL(dropdown._currentObjectURL);
            dropdown._currentObjectURL = null;
          }
        });
      }

      // Logo reset
      const logoResetBtn = group.querySelector("[data-logo-reset]");
      if (logoResetBtn) {
        logoResetBtn.addEventListener("click", () => {
          // Reset logo for all cards in the group
          group.querySelectorAll("mui-smart-card").forEach((card) => {
            card.setAttribute("logo", LogoPlaceholder);
          });

          // Reset only the logo file-name in the same slat
          const parentSlat = logoResetBtn.closest("mui-slat");
          const fileNameEl = parentSlat?.querySelector("[data-file-name]");
          const dropdown = parentSlat?.querySelector("[data-toggle-dropdown='logo']");
          const fileUpload = parentSlat?.querySelector("mui-file-upload"); // ← added

          if (fileNameEl) {
            fileNameEl.textContent = "";
            fileNameEl.style.display = "none";
          }

          // Reset the file-upload component completely
          if (fileUpload) {
            fileUpload.currentFileName = "Upload Artwork";
            fileUpload.selectedFileName = null;
            if (fileUpload.shadowRoot) {
              const label = fileUpload.shadowRoot.querySelector(".label");
              if (label) label.textContent = fileUpload.currentFileName;
            }
            fileUpload.value = null;
          }

          if (dropdown?._currentObjectURL) {
            URL.revokeObjectURL(dropdown._currentObjectURL);
            dropdown._currentObjectURL = null;
          }
        });
      }
    });

    // === File Upload Logic ===
    shadowRoot.querySelectorAll("[data-group='card-artwork']").forEach((group) => {
      group.querySelectorAll("[data-file-preview]").forEach((dropdown) => {
        let currentObjectURL = null;

        const isLogo = dropdown.dataset.toggleDropdown === "logo";
        const attr = isLogo ? "logo" : "bg-image";

        const parentSlat = dropdown.closest("mui-slat");
        const fileNameEl = parentSlat?.querySelector("[data-file-name]");
        const resetBtn = parentSlat?.querySelector(isLogo ? "[data-logo-reset]" : "[data-background-reset]");

        const preferredSizeEl = parentSlat?.querySelector("[data-preferred-size]");
        const maxSizeEl = parentSlat?.querySelector("[data-max-size]");

        // Handle file upload
        dropdown.addEventListener("file-upload", (event) => {
          const file = event.detail.file;
          if (!file) return;

          if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);
          const objectURL = URL.createObjectURL(file);
          currentObjectURL = objectURL;

          // Update all smart cards in the group
          group.querySelectorAll("mui-smart-card").forEach((card) => {
            card.setAttribute(attr, objectURL);
          });

          // Show truncated file name
          if (fileNameEl) {
            const maxLength = 10;
            const dotIndex = file.name.lastIndexOf(".");
            let base = dotIndex !== -1 ? file.name.slice(0, dotIndex) : file.name;
            const ext = dotIndex !== -1 ? file.name.slice(dotIndex) : "";
            if (base.length > maxLength) base = base.slice(0, maxLength) + "…";
            fileNameEl.textContent = `File: ${base}${ext}`;
            fileNameEl.style.display = "block";
          }

          // Hide size hints
          if (preferredSizeEl) preferredSizeEl.style.display = "none";
          if (maxSizeEl) maxSizeEl.style.display = "none";

          // Show reset button
          if (resetBtn) resetBtn.style.display = "block";
        });

        // Reset button logic
        if (resetBtn) {
          resetBtn.addEventListener("click", () => {
            // Reset cards
            group.querySelectorAll("mui-smart-card").forEach((card) => {
              if (isLogo) card.setAttribute("logo", LogoPlaceholder);
              else card.removeAttribute("bg-image");
            });

            // Hide file name
            if (fileNameEl) {
              fileNameEl.textContent = "";
              fileNameEl.style.display = "none";
            }

            // Show size hints again
            if (preferredSizeEl) preferredSizeEl.style.display = "block";
            if (maxSizeEl) maxSizeEl.style.display = "block";

            // Hide reset button
            resetBtn.style.display = "none";

            // Revoke object URL
            if (currentObjectURL) {
              URL.revokeObjectURL(currentObjectURL);
              currentObjectURL = null;
            }
          });
        }
      });
    });
  }
}

customElements.define("comp-wallet", compWallet);
