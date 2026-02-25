class MuiAddon extends HTMLElement {
  static get observedAttributes() {
    return ["slot", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this.render();
    this.syncSlottedContent();
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void {
    if ((name === "slot" || name === "size") && oldVal !== newVal) {
      this.render();
      this.syncSlottedContent();
    }
  }

  private syncSlottedContent() {
    const slotEl = this.shadowRoot?.querySelector("slot") as HTMLSlotElement | null;
    if (!slotEl) return;
    const size = this.getAttribute("size") || "medium";
    slotEl.assignedElements({ flatten: true }).forEach((el) => {
      if (el.tagName.toLowerCase() === "mui-body") {
        el.setAttribute("size", size);
      }
    });
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          min-height: 4.4rem;
          padding: var(--space-200) var(--space-400);
          background: var(--addon-background);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          min-width: 4.4rem;
          white-space: nowrap;
        }
        :host([size="x-small"]) {
          min-height: var(--action-icon-only-size-x-small);
          min-width: var(--action-icon-only-size-x-small);
          padding: var(--action-padding-x-small);
        }
        :host([size="small"]) {
          min-height: var(--action-icon-only-size-small);
          min-width: var(--action-icon-only-size-small);
          padding: var(--action-padding-small);
        }
        :host([size="medium"]) {
          min-height: 4.4rem;
          min-width: 4.4rem;
          padding: var(--space-200) var(--space-400);
        }
        :host([size="large"]) {
          min-height: var(--action-icon-only-size-large);
          min-width: var(--action-icon-only-size-large);
          padding: var(--space-300) var(--space-500);
        }
        :host([slot="before"]) {
          border-right: none;
          border-top-left-radius: var(--radius-100);
          border-bottom-left-radius: var(--radius-100);
        }
        :host([slot="after"]) {
          border-left: none;
          border-top-right-radius: var(--radius-100);
          border-bottom-right-radius: var(--radius-100);
        }
      </style>
      <slot></slot>
    `;
    const slotEl = this.shadowRoot.querySelector("slot") as HTMLSlotElement | null;
    slotEl?.addEventListener("slotchange", () => this.syncSlottedContent());
  }
}

if (!customElements.get("mui-addon")) {
  customElements.define("mui-addon", MuiAddon);
}
