import Image from "../../images/guru/hero-guides-plugin.png";
import Image2 from "../../images/guru/hero-outcomes.png";
import Image3 from "../../images/mui/mui-play.png";
import Image4 from "../../images/mui/mui-guides.png";
import Image5 from "../../images/pages/redactd.png";
import Image6 from "../../images/pages/upvote.png";

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
          grid-template-columns: 1fr 1fr;
          gap: var(--space-800);
          justify-content: space-between;
          align-items: start;
        }
      }

      @media (min-width: 1390px) {
        .config::part(display) {
          column-gap: var(--space-800);
          row-gap: var(--space-800);
        }
      }

      .guru-guides-image {
        padding: 24px; 
        padding-bottom: 0;
        box-sizing: border-box;
        background: var(--surface-elevated-200);
      }
      .website-image {
        padding: 24px; 
        box-sizing: border-box;
        background: var(--surface-elevated-200);
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Projects"
        description="Products and websites that utilise the Muibook Design System."
      >
          
          <mui-grid class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Redactd</mui-heading>
                <mui-body size="medium">
                  Build and compose real web layouts directly with Web Components, moving from prompt to production-ready UI in-browser for any framework. Design by hand or via prompts, switch modes freely, import components via CDN, and export clean HTML or JSON with structured UX guidance.
                </mui-body>
              </mui-v-stack>
              <mui-image>
                <img class="website-image" slot="image" src="${Image5}" alt="Redactd" />
                <figcaption slot="caption"><mui-link href="https://redactd.xyz" target="_blank">redactd.xyz</mui-link></figcaption>
              </mui-image>
            </mui-v-stack>

            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">UpVote</mui-heading>
                <mui-body size="medium">
                  UpVote helps users capture and prioritise opportunities and commitments in one place, from jobs and OKRs to travel, bills, and ongoing priorities. Items can be upvoted so the most important work rises to the top, powered by a consistent Muibook Web Components interface.
                </mui-body>
              </mui-v-stack>
              <mui-image>
                <img class="website-image" slot="image" src="${Image6}" alt="UpVote" />
                <figcaption slot="caption"><mui-link href="https://upvote.redactd.xyz" target="_blank">upvote.redactd.xyz</mui-link></figcaption>
              </mui-image>
            </mui-v-stack>

            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Guru Guides</mui-heading>
                <mui-body size="medium">
                  A Figma plugin delivering UX guidelines and customisable content, integrating design system guides into Figma.
                </mui-body>
                <mui-body size="medium">
                  <mui-link href="https://guides.gurusuite.xyz/" target="_blank">Website</mui-link>&nbsp;&nbsp;•&nbsp;&nbsp;
                  <mui-link href="https://www.figma.com/community/plugin/1471341082690554711/guru-guides" target="_blank">Figma Plugin</mui-link>
                </mui-body>
              </mui-v-stack>
              <mui-image>
                <img class="guru-guides-image" slot="image" src="${Image}" alt="Guru Guides" />
                <figcaption slot="caption"><mui-link href="https://www.figma.com/community/plugin/1471341082690554711/guru-guides" target="_blank">Guru Guides</mui-link> - Figma Plugin</figcaption>
              </mui-image> 
            </mui-v-stack>

            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Guru Outcomes</mui-heading>
                <mui-body size="medium">
                  Transform your goals into clear, actionable results and drive meaningful progress.
                </mui-body>
                <mui-body size="medium">
                  <mui-link href="https://outcomes.gurusuite.xyz/" target="_blank">Web-App</mui-link>&nbsp;&nbsp;•&nbsp;&nbsp;
                  <mui-link href="https://gurusuite.xyz/home" target="_blank">Learn More</mui-link>
                </mui-body>
              </mui-v-stack>
              <mui-image>
                <img class="guru-guides-image" slot="image" src="${Image2}" alt="Guru Outcomes" />
                <figcaption slot="caption"><mui-link href="https://outcomes.gurusuite.xyz/" target="_blank">Guru Outcomes</mui-link> - Web-App</figcaption>
              </mui-image> 
            </mui-v-stack>

            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Muiplay</mui-heading>
                <mui-body size="medium">
                  Use Muiplay to quickly explore layout ideas with AI before refining them in MuiKit for Figma. The playground is a proof of concept that relies on free AI services, so downtime or slow responses may occur.
                </mui-body>
              </mui-v-stack>
              <mui-image>
                <img class="website-image" slot="image" src="${Image3}" alt="Muiplay" />
                <figcaption slot="caption"><mui-link href="https://play.muibook.com/" target="_blank">play.muibook.com</mui-link></figcaption>
              </mui-image> 
            </mui-v-stack>

            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Muibook Guides</mui-heading>
                <mui-body size="medium">
                  The Guidelines are built with <mui-link href="https://gurusuite.xyz" target="_blank">Guru Guides</mui-link> engine and use Muibook components for the front-end UI. In Figma, users can access these guidelines directly through the Guru Guides plugin shown above.
                </mui-body>
              </mui-v-stack>
              <mui-image>
                <img class="website-image" slot="image" src="${Image4}" alt="Guides.Muibook.com" />
                <figcaption slot="caption"><mui-link href="https://guides.muibook.com/" target="_blank">guides.muibook.com</mui-link></figcaption>
              </mui-image> 
            </mui-v-stack>

          </mui-grid>

      </story-template>
    `;
  }
}

customElements.define("showcase-page", ShowcasePage);
