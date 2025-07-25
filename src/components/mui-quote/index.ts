class MuiQuote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    let html = /*html*/ `
    <style>
      :host { display: block; }
      blockquote {
        border-left: var(--border-thick);
        padding-left: var(--space-500);
        font-size: var(--space-500);
        line-height: 1.5;
        margin: var(--space-500) var(--space-000);
        font-style: italic;
      }
    </style>
    <blockquote><slot></slot></blockquote>
    `;
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = html;
  }
}

if (!customElements.get("mui-quote")) {
  customElements.define("mui-quote", MuiQuote);
}
