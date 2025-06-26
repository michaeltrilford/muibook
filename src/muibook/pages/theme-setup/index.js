import Image from "../../images/pages/mui-tokens.jpg";

class ThemeSetup extends HTMLElement {
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
        title="Theme Setup"
        description="Connect your theme — token-powered, brand-ready, and dark mode friendly."
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >


      <mui-v-stack space="var(--space-700)">

        <page-card>
          
          <mui-grid slot="body" class="config"  space="var(--space-400)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">Configure your brand’s colors, typography, and spacing — without touching 
                component code. Start with the GitHub template and plan how your brand will come to life, including 
                support for both light and dark mode.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Design tokens</mui-heading>
                <mui-body size="medium">
                  <mui-link size="medium" href="#/brand-design-tokens">Brand</mui-link>, 
                  <mui-link size="medium" href="#/semantic-design-tokens">Semantic</mui-link>, 
                  <mui-link size="medium" href="#/contextual-design-tokens">Contextual</mui-link> and 
                  <mui-link size="medium" href="#/components-design-tokens">Component</mui-link> tokens.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Brand primitives</mui-heading>
                <mui-body size="medium">Set your brand’s core design tokens such as color palettes, font stacks, 
                and spacing values. These primitives serve as the building blocks for every component.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Light mode</mui-heading>
                <mui-body size="medium">Apply your brand primitives to the light color scheme. Ensure accessibility 
                and visual harmony by testing components against your chosen values.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Dark mode</mui-heading>
                <mui-body size="medium">Customise the dark theme by adjusting contrast, brightness, and other token 
                values to provide a cohesive experience in low-light environments.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Set the foundation</mui-heading>
                <mui-body size="medium">Establish consistency across your product by using the template to unify 
                theming across all modes. Fork the repository and start customizing your theme today.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Demo Theme</mui-heading>
                <mui-body size="medium">
                  See how 
                  <mui-link href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/css/themes/jal.css" target="_blank">JAL</mui-link>, 
                  <mui-link href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/css/themes/ana.css" target="_blank">ANA</mui-link>, 
                  <mui-link href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/css/themes/modern.css" target="_blank">Modern</mui-link>, 
                  <mui-link href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/css/themes/mono.css" target="_blank">Mono</mui-link> 
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
            <br />
            HTML: DATA-THEME (REQUIRED)
            <br />
            <br />
            &lt;html lang="en" data-theme="light"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/html&gt;
            <br />
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
            <br />

          </mui-code>


        </page-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("theme-setup", ThemeSetup);
