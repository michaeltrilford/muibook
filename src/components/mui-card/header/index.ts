/* Mui Card Header */
class MuiCardHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    if (!this.shadowRoot) return;
    let html = /*html*/ `
    <style>
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: var(--space-400) var(--space-500);
      }

      :host([size="none"]) {
        padding: var(--space-000);
      }

      :host([size="small"]) {
        padding: var(--space-200) var(--space-300);
      }

      :host([size="medium"]) {
        padding: var(--space-400) var(--space-500);
      }

      :host([size="large"]) {
        padding: var(--space-600) var(--space-700);
      }

      @media (min-width: 768px) {
        :host,
        :host([size="medium"]) {
          padding: var(--space-500) var(--space-600);
        }

        :host([size="large"]) {
          padding: var(--space-600) var(--space-800);
        }
      }
    </style>
    <slot></slot>
    `;

    this.shadowRoot.innerHTML = html;
  }
}

if (!customElements.get("mui-card-header")) {
  customElements.define("mui-card-header", MuiCardHeader);
}
