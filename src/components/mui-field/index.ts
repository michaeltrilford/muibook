class MuiField extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "message", "label", "hide-label"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Static shadow DOM: slot + message container + styles
    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }

        mui-body { margin-top: var(--space-200); }
        mui-body::part(display) { display: flex; }
        mui-body::part(align-items) { align-items: center; }
        mui-body::part(gap) { gap: var(--space-100); }

        ::slotted(mui-checkbox) { padding-left: var(--space-025); }
      </style>

      <slot></slot>
      <div class="message-container"></div>
    `;
  }

  // -----------------------
  // Property getters/setters
  // -----------------------
  get variant() {
    return this.getAttribute("variant") || "default";
  }
  set variant(val: string) {
    this.setAttribute("variant", val);
  }

  get message() {
    return this.getAttribute("message") || "";
  }
  set message(val: string) {
    this.setAttribute("message", val);
  }

  get label() {
    return this.getAttribute("label") || "";
  }
  set label(val: string) {
    this.setAttribute("label", val);
  }

  get hideLabel() {
    return this.hasAttribute("hide-label");
  }
  set hideLabel(val: boolean) {
    if (val) this.setAttribute("hide-label", "");
    else this.removeAttribute("hide-label");
  }

  // -----------------------
  // Lifecycle methods
  // -----------------------
  connectedCallback() {
    this.renderMessage();
    this.passAttributesToChild();
  }

  attributeChangedCallback(name: string) {
    if (["variant", "message", "label", "hide-label"].includes(name)) {
      this.renderMessage();
      this.passAttributesToChild();
    }
  }

  // -----------------------
  // Helper methods
  // -----------------------
  passAttributesToChild() {
    if (!this.shadowRoot) return;
    const slot = this.shadowRoot.querySelector("slot");
    const slotted = slot?.assignedElements?.()[0]; // assumes only one
    if (!slotted) return;

    ["variant", "label", "hide-label"].forEach((attr) => {
      if (this.hasAttribute(attr)) {
        slotted.setAttribute(attr, this.getAttribute(attr) || "");
      } else {
        slotted.removeAttribute(attr);
      }
    });
  }

  renderMessage() {
    if (!this.shadowRoot) return;
    const container = this.shadowRoot.querySelector(".message-container");
    if (!container) return;

    const variant = this.variant;
    const message = this.message;

    let icon = "";
    if (variant === "success") icon = `<mui-icon-check></mui-icon-check>`;
    else if (variant === "warning") icon = `<mui-icon-warning></mui-icon-warning>`;
    else if (variant === "error") icon = `<mui-icon-attention></mui-icon-attention>`;

    container.innerHTML = message ? `<mui-body size="small" variant="${variant}">${icon}${message}</mui-body>` : "";
  }
}

if (!customElements.get("mui-field")) {
  customElements.define("mui-field", MuiField);
}
