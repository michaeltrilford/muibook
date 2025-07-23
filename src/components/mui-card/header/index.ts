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
      @media (min-width: 768px) {
        :host {
          padding: var(--space-500) var(--space-600);
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
