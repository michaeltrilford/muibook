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
        position: var(--app-navbar-toggle-floating-position, fixed);
        bottom: var(--app-navbar-toggle-floating-bottom, calc(var(--space-400) + env(safe-area-inset-bottom)));
        top: var(--app-navbar-toggle-floating-top, auto);
        left: var(--app-navbar-toggle-floating-left, var(--space-400));
        right: var(--app-navbar-toggle-floating-right, auto);
        z-index: 1;
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
          top: var(--app-navbar-toggle-floating-top-medium, calc(4rem + env(safe-area-inset-top)));
          bottom: var(--app-navbar-toggle-floating-bottom-medium, auto);
          left: var(--app-navbar-toggle-floating-left-medium, 2.8rem);
          right: var(--app-navbar-toggle-floating-right-medium, auto);
        }
      }

      @media (min-width: 1200px) {
        :host([floating]) {
          top: var(--app-navbar-toggle-floating-top-large, calc(3.8rem + env(safe-area-inset-top)));
          bottom: var(--app-navbar-toggle-floating-bottom-large, auto);
          left: var(--app-navbar-toggle-floating-left-large, 3.2rem);
          right: var(--app-navbar-toggle-floating-right-large, auto);
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
