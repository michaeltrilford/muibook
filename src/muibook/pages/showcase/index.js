import Image from "../../images/pages/guru-guides.png";

class ShowcasePage extends HTMLElement {
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
        title="Project Showcase"
        description="Examples of products and websites built with MUI"
      >

        <page-card>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Guru Guides</mui-heading>
                <mui-body size="medium">
                  A Figma plugin that delivers UX guidelines and customisable content, seamlessly integrating design system guides into Figma workflows.
                </mui-body>
                <mui-body size="medium">
                  <mui-link href="https://guides.gurusuite.xyz/" target="_blank">Website</mui-link>&nbsp;&nbsp;•&nbsp;&nbsp;
                  <mui-link href="https://www.figma.com/community/plugin/1471341082690554711/guru-guides" target="_blank">Figma Plugin</mui-link>
                </mui-body>
              </mui-v-stack>


              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Guru Outcomes</mui-heading>
                <mui-body size="medium">
                  Transform your goals into actionable results and drive meaningful progress • <mui-link href="https://outcomes.gurusuite.xyz/" target="_blank">Web-App</mui-link>
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Muiplay</mui-heading>
                <mui-body size="medium">
                  Use <mui-link href="https://play.muibook.com/">Muiplay</mui-link> to instantly explore layout ideas using AI before refining with MuiKit in Figma. The playground is a proof of concept and leverages free AI services, which may lead to occasional downtime or slower response times.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Muibook Guides</mui-heading>
                <mui-body size="medium">
                  The Muibook Guidelines are built using the Guru Guides engine, but full uses the Muibook components to create the experience. You can explore <mui-link href="https://guides.muibook.com/">MUI guidelines</mui-link> directly in your browser with Guru Guides. No plugin required.
                </mui-body>
                <mui-body size="medium">
                  In addition to the standalone website, Muibook guideline users can download the <mui-link href="https://www.figma.com/community/plugin/1471341082690554711/guru-guides" target="_blank">Guru Guides Figma plugin</mui-link> to access the guidelines directly within Figma.
                </mui-body>
              </mui-v-stack>

            </mui-v-stack>


            <mui-image>
              <img slot="image" src="${Image}" alt="Guru Guides" />
              <figcaption slot="caption"><mui-link href="https://www.figma.com/community/plugin/1471341082690554711/guru-guides" target="_blank">Guru Guides</mui-link> - Figma Plugin</figcaption>
            </mui-image> 

            <mui-image>
            </mui-image> 
          </mui-grid>

        </page-card>

      </story-template>
    `;
  }
}

customElements.define("showcase-page", ShowcasePage);
