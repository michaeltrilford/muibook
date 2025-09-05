import Image from "../../images/pages/mui-tokens.jpg";

class BaseTheme extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .config::part(display) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 1230px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @media (min-width: 1390px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 500px;
          gap: 9.6rem;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Base Theme"
        description="Style your brand without editing component code."
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >

        <page-card>
          
          <mui-grid slot="body" class="config"  space="var(--space-400)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">Plan how your brand will come to life with support for both light and dark modes.</mui-body>
                <mui-body size="large">There are two main approaches to integrating the theme into your project:</mui-body>
                <mui-body><strong>Override method:</strong> Import the mui-tokens.css package via NPM or CDN option, then create a new CSS file to override only the tokens you need using the structure outlined on this page.</mui-body>
                <mui-body><strong>Fork method:</strong> Fork the mui-tokens.css repository and directly modify the relevant sections to suit your brand.</mui-body>
              </mui-v-stack>

              <mui-rule></mui-rule>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Theme Configuration</mui-heading>
                <mui-body>
                 Set the default theme (“light” or “dark”) using the HTML attribute, and optionally add UI and logic to switch between them.

                </mui-body>
                <mui-code>
                  &lt;html lang="en" data-theme="light"&gt;
                  <br />
                  &nbsp;&nbsp;...
                  <br />
                  &lt;/html&gt;
                </mui-code>
              </mui-v-stack>


              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Design Token Overview</mui-heading>
                <mui-body size="medium">Design tokens are organised into four tiers, each mapped to the sections below. These ultimately feed into the components within the design system.</mui-body>
                <mui-body size="medium">
                  <mui-link size="medium" href="#/brand-design-tokens">Brand</mui-link>, 
                  <mui-link size="medium" href="#/semantic-design-tokens">Semantic</mui-link>, 
                  <mui-link size="medium" href="#/contextual-design-tokens">Contextual</mui-link> and 
                  <mui-link size="medium" href="#/components-design-tokens">Component</mui-link> tokens.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Theme Sections</mui-heading>
                <mui-body size="medium"><strong>Brand primitives</strong> Define core tokens like colors, fonts, and spacing, which is the foundation for every component.</mui-body>
                <mui-body size="medium"><strong>Light mode:</strong> Apply your brand tokens to a light theme. Test for accessibility and visual consistency.</mui-body>
                <mui-body size="medium"><strong>Dark mode:</strong> Use high-contrast tokens to adapt your brand for dark environments.</mui-body>
                <mui-body size="medium"><strong>Set the foundation:</strong> Link light and dark themes to a shared base to ensure a consistent experience.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Multi-Brand Theme</mui-heading>

                <mui-body size="medium">If you support multiple brands, <mui-link href="#/multi-brand-theme">Learn more</mui-link> about using the brand-theme approach to manage theme variations.</mui-body>
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
              <figcaption slot="caption">mui-styles/mui-tokens.css</figcaption>
            </mui-image> 
          </mui-grid>

          <mui-code slot="footer">
            <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css" target="_blank">👨‍💻 View file on Github</mui-link>
            <br />
            <br />
            <br />
            CSS: THEME STRUCTURE
            <br />
            <br />
            &#47;* ===================================== *&#47;<br />
            &#47;* 1. BRAND PRIMITIVES<br />
            &#47;* ===================================== *&#47;<br />
            :where(html) {<br />
            &nbsp;&nbsp;...<br />
            }<br />
            <br />
            &#47;* ===================================== *&#47;<br />
            &#47;* 2. LIGHT MODE <br />
            &#47;* ===================================== *&#47;<br />
            html[data-theme=&#39;light&#39;] {<br />
            &nbsp;&nbsp;...<br />
            }<br />
            <br />
            &#47;* ===================================== *&#47;<br />
            &#47;* 3. DARK MODE<br />
            &#47;* ===================================== *&#47;<br />
            html[data-theme=&#39;dark&#39;] {<br />
            &nbsp;&nbsp;...<br />
            }<br />
            <br />
            &#47;* ===================================== *&#47;<br />
            &#47;* 4. SET THE FOUNDATION<br />
            &#47;* ===================================== *&#47;<br />
            :where(html) {<br />
            &nbsp;&nbsp;...<br />
            }<br />
            <br />
          </mui-code>

        </page-card>

      </story-template>
    `;
  }
}

customElements.define("base-theme", BaseTheme);
