import Image from "../../images/guru/hero-guides-plugin.png";
import "../../images/guides-logo";

class pageBannerPlugin extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { display: block; }

      .banner {
        display: flex;
        justify-content: center;
        padding: var(--space-500) var(--space-600) var(--space-000) var(--space-600);
        border-radius: var(--radius-300);
        background: var(--app-story-banner-gradient-start);
        background: linear-gradient(0deg, var(--app-story-banner-gradient-start) 0%, var(--app-story-banner-gradient-end) 100%);
        border: var(--feedback-neutral-border);
        border-color: var(--app-story-banner-border-color);
        box-shadow:
          6px 6px 16px var(--black-opacity-10),
          -6px -6px 14px var(--black-opacity-10);
      }

      @media (min-width: 1288px) {
        .banner {
          padding: var(--space-700) var(--space-700) var(--space-000) var(--space-700);
        } 
      }

      .banner-grid {
        width: 100%;
      }

      .banner-grid::part(align-items) {
        align-items: center;
      }

      @media (min-width: 1288px) {

        .banner-grid::part(gap) {
          gap: var(--space-000);
        }
      }


        .banner-grid::part(gap) {
          gap: var(--space-600);
        }

        .banner-grid::part(align-items) {
          align-items: start;
        }
      

      .banner-grid::part(width) {
        max-width: 118.0rem;
      }

      .hero {
        width: 100%;
        height: auto;
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
        <mui-responsive breakpoint="1287" class="banner">
          <mui-grid slot="showBelow" space="var(--space-600)" col="1fr" class="banner-grid">
            <mui-v-stack space="var(--space-500)" alignY="start">
              <mui-v-stack  space="var(--space-100)">
                <mui-h-stack space="var(--space-100)" alignY="center">
                  <mui-h-stack style="width: 28px;">
                    <guides-logo size="small"></guides-logo>
                  </mui-h-stack>
                  <mui-heading size="3" level="2">Access in Figma</mui-heading>
                </mui-h-stack>
                <mui-v-stack space="var(--space-400)" style="max-width: 50ch;">
                  <mui-body size="small">MUI integrates with Guru Guides to provide in-context design guidelines direct in Figma, making component guidance easy to access where designers need it most.</mui-body>
                </mui-v-stack>
              </mui-v-stack>
              <mui-button-group>
                <mui-link variant="primary" href="https://www.figma.com/community/plugin/1471341082690554711/guru-guides" target="_blank">Install Plugin</mui-link>
                <mui-link class="mui-button-secondary" variant="secondary" href="https://gurusuite.xyz/guides" target="_blank">About Guru</mui-link>
              <mui-button-group>
            </mui-v-stack>
            <img class="hero" src="${Image}" alt="Hero" />
          </mui-grid>
          <mui-grid slot="showAbove" col="1fr 440px" class="banner-grid">
            <mui-v-stack  space="var(--space-600)"  alignY="start" style="max-width: 41ch; padding-bottom: var(--space-700);">
              <mui-v-stack  space="var(--space-400)">
                <mui-h-stack space="var(--space-200)" alignY="center">
                  <mui-h-stack style="width: 38px;">
                    <guides-logo size="medium"></guides-logo>
                  </mui-h-stack>
                  <mui-heading size="2" level="2">Access in Figma</mui-heading>
                </mui-h-stack>
                <mui-v-stack space="var(--space-400)" style="max-width: 50ch;">
                  <mui-body size="medium">MUI integrates with Guru Guides to provide in-context design guidelines direct in Figma, making component guidance easy to access where designers need it most.</mui-body>
                </mui-v-stack>
              </mui-v-stack>
              <mui-button-group>
                <mui-link variant="primary" href="https://www.figma.com/community/plugin/1471341082690554711/guru-guides" target="_blank">Install Plugin</mui-link>
                <mui-link class="mui-button-secondary" variant="secondary" href="https://gurusuite.xyz/guides" target="_blank">About Guru</mui-link>
              <mui-button-group>
            </mui-v-stack>
            <img class="hero" src="${Image}" alt="Hero" />
          </mui-grid>
        </mui-responsive>
    `;

    // Wait for the DOM to render
    requestAnimationFrame(() => {
      const copyButtons = shadowRoot.querySelectorAll("mui-button");

      copyButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const parentInput = button.closest("mui-input");
          const value = parentInput?.getAttribute("value");

          if (value) {
            try {
              await navigator.clipboard.writeText(value);
              button.innerText = "Copied!";
              setTimeout(() => {
                button.innerText = "Copy";
              }, 1500);
            } catch (err) {
              console.error("Failed to copy text: ", err);
              button.innerText = "Error";
              setTimeout(() => {
                button.innerText = "Copy";
              }, 1500);
            }
          }
        });
      });
    });
  }
}

customElements.define("page-banner-plugin", pageBannerPlugin);
