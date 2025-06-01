/* myApp */
class appNavbarSkip extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `

      :host {
        display: flex;
        width: 240px;
      }

      /* Target Parent */
      mui-button {
        position: absolute;
        left: 0;
        top: -54px;
        z-index: 1000;
        transition: top var(--speed-200);
        width: 100%;
      }
      mui-button:focus {
        top: 0;
      }

      /* Spacing Parts */
      mui-button::part(padding) {
        padding: 1.3rem var(--space-500);
      }

      mui-button::part(width) {
        width: 100%;
      }

      /* Layout Parts */

      mui-button::part(display) {
        display: block;
      }

      mui-button::part(text-align) {
        text-align: center;
      }

      /* Visual Parts */
      mui-button::part(border-radius) {
        border-radius: var(--radius-000);
      }

      mui-button::part(background) {
        background: var(--app-navbar-surface);
      }
      mui-button::part(border) {
        border: none;
      }

    `;

    // We provide the shadow root with some HTML
    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-button variant="tertiary" class="skip-to-main" role="button">Skip Nav</mui-button>
    `;

    const skipButton = shadowRoot.querySelector(".skip-to-main");
    if (skipButton) {
      skipButton.addEventListener("click", () => {
        const main = document.querySelector("app-container");
        if (main) {
          main.setAttribute("tabindex", "0"); // Make it tabbable
          main.focus(); // Focus the container
        }
      });

      const event = new CustomEvent("skip-link-ready", {
        detail: { skipButton },
      });
      window.dispatchEvent(event);
    }
  }
}

customElements.define("app-navbar-skip", appNavbarSkip);
