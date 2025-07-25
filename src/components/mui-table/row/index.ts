class MuiRow extends HTMLElement {
  static get observedAttributes() {
    return ["columns"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "row");
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      :host {
        display: grid;
        grid-template-columns: ${this.getAttribute("columns")};
        grid-gap: var(--space-500);
        margin-bottom: var(--space-000);
        padding: var(--space-300) var(--space-000);
        border-top: var(--border-thin);
        align-items: center;
        min-height: 4.4rem;
      }
    </style>
    <slot></slot>
    `;
  }
}

if (!customElements.get("mui-row")) {
  customElements.define("mui-row", MuiRow);
}
