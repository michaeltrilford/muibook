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
        background: var(--app-navbar-surface);
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

    </style>

    <!-- Navigation Bar Toggle -->
    <slot></slot>
    <slot name="home-link"></slot>


    `;

    this.shadowRoot.innerHTML = html;
  }
}

customElements.define("app-navbar-toggle", appNavbarToggle);
