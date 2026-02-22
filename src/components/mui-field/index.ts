class MuiField extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "message", "label", "hide-label", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Static shadow DOM: slot + message container + styles
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }
        .field-content {
          display: flex;
          flex-direction: column;
        }
        .message-container {
          display: none;
        }
        :host([has-message]) .message-container {
          display: flex;
          margin-top: var(--space-300);
        }
        :host([size="x-small"][has-message]) .message-container { margin-top: var(--space-100); }
        :host([size="small"][has-message]) .message-container { margin-top: var(--space-100); }
        :host([size="medium"][has-message]) .message-container { margin-top: var(--space-300); }
        :host([size="large"][has-message]) .message-container { margin-top: var(--space-300); }

        ::slotted(mui-checkbox) { padding-left: var(--space-025); }
      </style>

      <div class="field-content">
        <slot></slot>
      </div>
      <div class="message-container">
        <slot name="message"></slot>
        <div class="message-fallback"></div>
      </div>
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

  get size() {
    return this.getAttribute("size") || "medium";
  }
  set size(val: string) {
    this.setAttribute("size", val);
  }

  // -----------------------
  // Lifecycle methods
  // -----------------------
  connectedCallback() {
    this.bindSlotEvents();
    this.renderMessage();
    this.passAttributesToChild();
  }

  attributeChangedCallback(name: string) {
    if (["variant", "message", "label", "hide-label", "size"].includes(name)) {
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

    ["variant", "label", "hide-label", "size"].forEach((attr) => {
      if (this.hasAttribute(attr)) {
        slotted.setAttribute(attr, this.getAttribute(attr) || "");
      } else {
        slotted.removeAttribute(attr);
      }
    });
  }

  renderMessage() {
    if (!this.shadowRoot) return;
    const fallback = this.shadowRoot.querySelector(".message-fallback") as HTMLElement | null;
    const messageSlot = this.shadowRoot.querySelector('slot[name="message"]') as HTMLSlotElement | null;
    if (!fallback || !messageSlot) return;

    const variant = this.variant;
    const message = this.message;

    let icon = "";
    if (variant === "success") icon = `<mui-icon-check slot="before"></mui-icon-check>`;
    else if (variant === "warning") icon = `<mui-icon-warning slot="before"></mui-icon-warning>`;
    else if (variant === "error") icon = `<mui-icon-attention slot="before"></mui-icon-attention>`;

    const hasSlottedMessage = messageSlot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE) return (node.textContent || "").trim().length > 0;
      return false;
    });

    if (hasSlottedMessage) {
      fallback.innerHTML = "";
      this.setAttribute("has-message", "");
      return;
    }

    fallback.innerHTML = message ? `<mui-body size="small" variant="${variant}">${icon}${message}</mui-body>` : "";
    if (message) this.setAttribute("has-message", "");
    else this.removeAttribute("has-message");
  }

  bindSlotEvents() {
    if (!this.shadowRoot) return;

    const messageSlot = this.shadowRoot.querySelector('slot[name="message"]') as HTMLSlotElement | null;
    if (messageSlot) {
      messageSlot.addEventListener("slotchange", () => this.renderMessage());
    }

    const contentSlot = this.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (contentSlot) {
      contentSlot.addEventListener("slotchange", () => this.passAttributesToChild());
    }
  }
}

if (!customElements.get("mui-field")) {
  customElements.define("mui-field", MuiField);
}
