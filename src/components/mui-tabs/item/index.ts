class MuiTabItem extends HTMLElement {
  private iconEl?: HTMLElement;
  private updateIcon(iconTag: string | null) {
    if (!this.shadowRoot) return;

    // Remove previous icon
    if (this.iconEl) {
      this.shadowRoot.removeChild(this.iconEl);
      this.iconEl = undefined;
    }

    // Defensive: only create if a valid tag name exists
    if (iconTag && iconTag.trim() !== "" && customElements.get(iconTag)) {
      const iconEl = document.createElement(iconTag);
      iconEl.setAttribute("color", this.hasAttribute("active") ? "var(--tab-icon-active)" : "var(--tab-icon)");
      iconEl.setAttribute("size", "small");
      this.shadowRoot.insertBefore(iconEl, this.shadowRoot.firstChild); // insert before slot
      this.iconEl = iconEl;
    }
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["active", "icon"];
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
    if (name === "active") {
      this.updateActiveState();
    } else if (name === "icon") {
      this.updateIcon(newValue);
    }
  }

  connectedCallback() {
    if (!this.shadowRoot) return;
    const iconTag = this.getAttribute("icon");

    this.setAttribute("tabindex", this.hasAttribute("active") ? "0" : "-1");
    // Clear existing shadow DOM content
    this.shadowRoot.innerHTML = "";

    const style = document.createElement("style");
    style.textContent = /*css*/ `
      :host {
        user-select: none;
        display: flex;
        justify-content: center;
        gap: var(--space-100);
        align-items: center;
        padding: var(--space-200) var(--space-400);
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
        font-weight: var(--font-weight-bold);
        color: var(--tab-text-color);
        background: transparent;
        white-space: nowrap;
        cursor: pointer;
        min-height: 4.2rem;
        box-sizing: border-box;
        border-radius: calc(var(--tab-radius) - 0.2rem);
      }

      :host([active]) {
        color: var(--tab-text-color-active);
      }

      :host([active]:focus-visible) {
        outline: var(--outline-thick);
        outline-offset: -5px;
      }

      ::slotted(*) {
        margin-left: var(--space-100);
      }
    `;

    this.shadowRoot.appendChild(style);

    // Defensive check: only create if a valid tag name and custom element is defined
    if (iconTag && iconTag.trim() !== "" && customElements.get(iconTag)) {
      const iconEl = document.createElement(iconTag);
      iconEl.setAttribute("color", "var(--tab-icon)");
      iconEl.setAttribute("size", "small");
      this.shadowRoot.appendChild(iconEl);
      this.iconEl = iconEl;
    }

    const slot = document.createElement("slot");
    this.shadowRoot.appendChild(slot);

    this.updateActiveState();
  }

  updateActiveState() {
    const isActive = this.hasAttribute("active");
    this.setAttribute("role", "tab");
    this.setAttribute("aria-selected", isActive ? "true" : "false");
    this.setAttribute("tabindex", isActive ? "0" : "-1");

    if (this.iconEl) {
      // Pass the CSS variable itself, not computed values
      this.iconEl.setAttribute("color", isActive ? "var(--tab-icon-active)" : "var(--tab-icon)");
    }
  }
}

if (!customElements.get("mui-tab-item")) {
  customElements.define("mui-tab-item", MuiTabItem);
}
