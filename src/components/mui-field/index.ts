import "../mui-icons/check";
import "../mui-icons/warning";
import "../mui-icons/attention";

class MuiField extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "message"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const variant = this.getAttribute("variant") || "default";
    this.setAttribute("variant", variant);
  }

  connectedCallback() {
    this.render();
    this.passAttributesToChild();
  }

  attributeChangedCallback(name: string, _oldValue: string | null, _newValue: string | null) {
    if (name === "variant" || name === "message") {
      this.render();
      this.passAttributesToChild();
    }
  }

  passAttributesToChild() {
    if (!this.shadowRoot) return;
    const slot = this.shadowRoot.querySelector("slot");
    const slotted = slot?.assignedElements?.()[0]; // assumes only one

    if (!slotted) return;

    const attributesToPass = ["variant", "label", "hide-label"];
    attributesToPass.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        slotted.setAttribute(attr, this.getAttribute(attr) || "");
      } else {
        slotted.removeAttribute(attr);
      }
    });
  }

  render() {
    const message = this.getAttribute("message");
    const variant = this.getAttribute("variant");
    if (!this.shadowRoot) return;

    let icon = "";
    if (variant === "success") icon = "check";
    else if (variant === "warning") icon = "warning";
    else if (variant === "error") icon = "attention";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }

        mui-body {
          margin-top: var(--space-200);
        }
        mui-body::part(display) {
          display: flex;
        }
        mui-body::part(align-items) {
          align-items: center;
        }
        mui-body::part(gap) {
          gap: var(--space-100);
        }
      </style>

      <slot></slot>
      ${
        message
          ? `
        <mui-body size="small" variant="${variant}">
          ${icon ? `<mui-icon-${icon}></mui-icon-${icon}>` : ""}
          ${message}
        </mui-body>`
          : ""
      }
    `;
  }
}

if (!customElements.get("mui-field")) {
  customElements.define("mui-field", MuiField);
}
