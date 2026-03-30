/* Mui ButtonGroup */
class MuiButtonGroup extends HTMLElement {
  static get observedAttributes() {
    return ["layout", "align", "right"];
  }

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
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
      :host([layout="column"]) {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
      }
      :host([layout="column"]) ::slotted(*) {
        width: 100%;
        box-sizing: border-box;
      }
      :host([align="right"]:not([layout="column"])) {
        justify-content: flex-end;
      }
      :host([right]:not([align]):not([layout="column"])) {
        justify-content: flex-end;
      }
    </style>
    <slot></slot>`;
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = html;
  }
}

if (!customElements.get("mui-button-group")) {
  customElements.define("mui-button-group", MuiButtonGroup);
}
