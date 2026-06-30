/* myApp */
class appNavbarToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    let html = /*html*/ `
    <style>

      :host {
        width: 100%;
        margin-bottom: 0;
        background: var(--app-navbar-surface-opacity);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: inset 0 1px 0 0 var(--border-color);
        padding: var(--space-400) var(--space-500);
        display: flex;
        justify-content: space-between;
        z-index: 2;
        box-sizing: border-box;
        align-items: center;
        padding-bottom: calc(var(--space-400) + env(safe-area-inset-bottom));

        @media (min-width: 961px) {
          display: none;
        }
        
      }

      :host([floating]) {
        position: fixed;
        bottom: calc(var(--space-400) + env(safe-area-inset-bottom));
        top: auto;
        left: var(--space-400);
        z-index: 100;
        width: auto;
        background: transparent;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: none;
        padding: 0;
        display: inline-flex;
      }

      @media (min-width: 961px) {
        :host([floating]) {
          top: calc(4rem + env(safe-area-inset-top));
          bottom: auto;
          left: 3rem;
        }
      }

      @media (min-width: 1200px) {
        :host([floating]) {
          top: calc(3.8rem + env(safe-area-inset-top));
          bottom: auto;
          left: 3.4rem;
        }
      }

      :host([hidden]) {
        display: none;
      }

    </style>

    <!-- Navigation Bar Toggle -->
    <slot></slot>
    <slot name="home-link"></slot>


    `;

    this.shadowRoot.innerHTML = html;
  }
}

customElements.define("app-navbar-toggle", appNavbarToggle);
