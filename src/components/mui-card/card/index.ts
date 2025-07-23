/* Mui Card */
class MuiCard extends HTMLElement {
  static get observedAttributes() {
    return ["footer"];
  }

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
        border-radius: var(--card-radius);
        background: var(--surface-elevated-100);
      }
      ::slotted(*:last-child) {
        margin-bottom: 0;
      }
      ::slotted(.inner-space-top) {
      padding-top: 0;
      }
    </style>
    <slot></slot>
    `;

    this.shadowRoot.innerHTML = html;

    const slot = this.shadowRoot.querySelector("slot");

    if (slot) {
      slot.addEventListener("slotchange", () => {
        const nodes = slot.assignedElements();
        const hasHeader = nodes.some((node) => node.tagName?.toLowerCase() === "mui-card-header");
        const body = nodes.find((node) => node.tagName?.toLowerCase() === "mui-card-body");

        if (body) {
          if (hasHeader) {
            body.classList.add("inner-space-top");
          } else {
            body.classList.remove("inner-space-top");
          }
        }
      });
    }
  }
}

if (!customElements.get("mui-card")) {
  customElements.define("mui-card", MuiCard);
}
