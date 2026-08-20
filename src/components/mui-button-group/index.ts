/* Mui ButtonGroup */
class MuiButtonGroup extends HTMLElement {
  static get observedAttributes() {
    return ["layout", "align", "right", "space"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.syncSpace();
    let html = /*html*/ `
    <style>      
      :host {
        display: flex;
        gap: var(--button-group-space);
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

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === "space" && oldValue !== newValue) this.syncSpace();
  }

  private syncSpace() {
    const space = this.getAttribute("space")?.trim() || "var(--space-300)";
    this.style.setProperty("--button-group-space", space);
  }
}

if (!customElements.get("mui-button-group")) {
  customElements.define("mui-button-group", MuiButtonGroup);
}
