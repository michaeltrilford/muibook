/* Mui ButtonGroup */
class MuiButtonGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    let html = /*html*/ `
    <style>      
      :host {
        display: flex;
        gap: var(--space-200);
      }
      :host([right]) {
        justify-content: flex-end;
      }
    </style>
    <slot></slot>`;
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = html;
  }
}

customElements.define("mui-button-group", MuiButtonGroup);
