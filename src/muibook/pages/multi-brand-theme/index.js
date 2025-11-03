import Image from "../../images/pages/brand-theme.jpg";

class MultiBrandTheme extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .config::part(display) {
        grid-template-columns: 1fr;
      }

      mui-image {
        border: var(--border-thin);
        border-color: var(--app-story-banner-border-color);
        border-radius: var(--radius-400);
        overflow: hidden;
      }

      @media (min-width: 1230px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 65ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @media (min-width: 1390px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 65ch) 500px;
          gap: 9.6rem;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Multi-Brand"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >
          
          <mui-grid class="config"  space="var(--space-400)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium">Connect alternative brands via the design tokens. To support multiple brands, you must first have a complete <mui-link size="medium" href="/#/base-theme">base theme</mui-link> defined for both light and dark modes.</mui-body>
                <mui-body size="medium">Each brand theme will extend and override this foundation.</mui-body>
                <mui-body><strong>Define your base theme:</strong> Use the mui-tokens.css package via NPM or CDN, or start from a forked version of the mui-tokens.css repository.</mui-body>
                <mui-body><strong>Customise your brand:</strong> Decide which parts of the system need to change for each brand theme. Then copy the relevant tokens into your brand-specific file and update their values accordingly.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Brand Configuration</mui-heading>
                <mui-body>
                  Set multiple brands using the HTML attribute, and optionally add UI and logic to switch between them.
                </mui-body>
                <mui-code>
                  &lt;html
                  <br />
                  &nbsp;&nbsp;lang="en"
                  <br />
                  &nbsp;&nbsp;data-brand="your-brand" 
                  <br />
                  &nbsp;&nbsp;data-theme="light"
                  <br />
                  &gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;...
                  <br />
                  &lt;/html&gt;
                </mui-code>
              </mui-v-stack>

            
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Design Token Overview</mui-heading>
                <mui-body>Design tokens are organised into four tiers, each mapped to the sections below. These ultimately feed into the components within the design system.</mui-body>
                <mui-body size="medium">
                  <mui-link size="medium" href="#/brand-design-tokens">Brand</mui-link>, 
                  <mui-link size="medium" href="#/semantic-design-tokens">Semantic</mui-link>, 
                  <mui-link size="medium" href="#/contextual-design-tokens">Contextual</mui-link> and 
                  <mui-link size="medium" href="#/components-design-tokens">Component</mui-link> tokens.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Brand Sections</mui-heading>
                <mui-body size="medium"><strong>Brand primitives</strong> Define core tokens like colors, fonts, and spacing, which is the foundation for every component.</mui-body>
                <mui-body size="medium"><strong>Light mode:</strong> Apply your brand tokens to a light theme. Test for accessibility and visual consistency.</mui-body>
                <mui-body size="medium"><strong>Dark mode:</strong> Use high-contrast tokens to adapt your brand for dark environments.</mui-body>
                <mui-body size="medium"><strong>Set the foundation:</strong> Link light and dark themes to a shared base to ensure a consistent experience.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Multi-Brand Theme</mui-heading>
                <mui-body size="medium">
                  See how 
                  <mui-link href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/css/themes/jal.css" target="_blank">JAL</mui-link>, 
                  <mui-link href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/css/themes/ana.css" target="_blank">ANA</mui-link>, 
                  <mui-link href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/css/themes/modern.css" target="_blank">Modern</mui-link>
                  build on the core MUI theme. Only override the values you need; everything else falls back to the  
                  <mui-link href="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css" target="_blank">mui-tokens</mui-link> 
                  theme.
                </mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Author Tokens" />
            </mui-image> 
          </mui-grid>

          <mui-code slot="footer">
            <mui-link 
              size="x-small" 
              href="https://github.com/michaeltrilford/muibook/tree/main/src/muibook/css/themes" 
              target="_blank">👨‍💻 View Brand example files on Github</mui-link>
            <br />
            <br />
            <br />
            CSS: BRAND THEME STRUCTURE
            <br />
            <br />
            &#47;* ===================================== *&#47;<br />
            &#47;* 1. BRAND PRIMITIVES<br />
            &#47;* ===================================== *&#47;<br />
            html[data-brand="your-brand"] {<br />
            &nbsp;&nbsp;...<br />
            }<br />
            <br />
            &#47;* ===================================== *&#47;<br />
            &#47;* 2. LIGHT MODE <br />
            &#47;* ===================================== *&#47;<br />
            html[data-brand="your-brand"][data-theme="light"] {<br />
            &nbsp;&nbsp;...<br />
            }<br />
            <br />
            &#47;* ===================================== *&#47;<br />
            &#47;* 3. DARK MODE<br />
            &#47;* ===================================== *&#47;<br />
            html[data-brand="your-brand"][data-theme="dark"] {<br />
            &nbsp;&nbsp;...<br />
            }<br />
            <br />
            &#47;* ===================================== *&#47;<br />
            &#47;* 4. SET THE FOUNDATION<br />
            &#47;* ===================================== *&#47;<br />
            html[data-brand="your-brand"] {<br />
            &nbsp;&nbsp;...<br />
            }<br />
            <br />
          </mui-code>


      </story-template>
    `;
  }
}

customElements.define("multi-brand-theme", MultiBrandTheme);
