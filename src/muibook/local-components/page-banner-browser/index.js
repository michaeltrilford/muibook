import Image from "../../images/guru/hero-guides-browser.png";
import "../../images/guides-logo";

class pageBannerBrowser extends HTMLElement {
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
        border-bottom: var(--border-thick);
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

      mui-grid {
        width: 100%;
      }

      mui-grid::part(align-items) {
        align-items: center;
      }

      @media (min-width: 1288px) {

        mui-grid::part(gap) {
          gap: var(--space-000);
        }
      }



        mui-grid::part(gap) {
          gap: var(--space-600);
        }

        mui-grid::part(align-items) {
          align-items: start;
        }
      

      mui-grid::part(width) {
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
          <mui-grid slot="showBelow" space="var(--space-600)" col="1fr">
            <mui-v-stack space="var(--space-500)" alignY="start">
              <mui-v-stack  space="var(--space-100)">
                <mui-h-stack space="var(--space-100)" alignY="center">
                  <mui-h-stack style="width: 28px;">
                    <guides-logo size="small"></guides-logo>
                  </mui-h-stack>
                  <mui-heading size="3" level="2">In-browser</mui-heading>
                </mui-h-stack>
                <mui-v-stack space="var(--space-400)" style="max-width: 50ch;">
                  <mui-body size="small">Prefer to work outside Figma? You can explore MUI guidelines directly in your browser with Guru Guides. No plugin required.</mui-body>
                </mui-v-stack>
              </mui-v-stack>
              <mui-button-group>
                <mui-link variant="primary" href="https://guides.muibook.com/" target="_blank">View Online</mui-link>
                <mui-link class="mui-button-secondary" variant="secondary" href="https://gurusuite.xyz/guides" target="_blank">About Guru</mui-link>
              <mui-button-group>
            </mui-v-stack>
            <img class="hero" src="${Image}" alt="Hero" />
          </mui-grid>
          <mui-grid slot="showAbove" col="1fr 440px">
            <mui-v-stack  space="var(--space-600)"  alignY="start" style="max-width: 41ch; padding-bottom: var(--space-700);">
              <mui-v-stack  space="var(--space-400)">
                <mui-h-stack space="var(--space-200)" alignY="center">
                  <mui-h-stack style="width: 38px;">
                    <guides-logo size="medium"></guides-logo>
                  </mui-h-stack>
                  <mui-heading size="2" level="2">In-browser</mui-heading>
                </mui-h-stack>
                <mui-v-stack space="var(--space-400)" style="max-width: 50ch;">
                  <mui-body size="medium">Prefer to work outside Figma? You can explore MUI guidelines directly in your browser with Guru Guides. No plugin required.</mui-body>
                </mui-v-stack>
              </mui-v-stack>
              <mui-button-group>
                <mui-link variant="primary" href="https://guides.muibook.com/" target="_blank">View Online</mui-link>
                <mui-link class="mui-button-secondary" variant="secondary" href="https://gurusuite.xyz/guides" target="_blank">About Guru</mui-link>
              <mui-button-group>
            </mui-v-stack>
            <img class="hero" src="${Image}" alt="Hero" />
          </mui-grid>
        </mui-responsive>
    `;
  }
}

customElements.define("page-banner-browser", pageBannerBrowser);
