class MuiTabItem extends HTMLElement {
  private beforeSlot?: HTMLSlotElement | null;
  private afterSlot?: HTMLSlotElement | null;

  private getIconSizeFromTabSize() {
    const size = this.getAttribute("size") || "medium";
    if (size === "x-small") return "x-small";
    if (size === "small") return "x-small";
    if (size === "large") return "medium";
    return "small";
  }

  private getBadgeSizeFromTabSize() {
    const size = this.getAttribute("size") || "medium";
    if (size === "x-small") return "x-small";
    if (size === "small") return "small";
    if (size === "large") return "large";
    return "medium";
  }

  private hasAssignedContent(slot: HTMLSlotElement | null | undefined): boolean {
    if (!slot) return false;
    return slot
      .assignedNodes({ flatten: true })
      .some(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()))
      );
  }

  private syncSlottedAffordances(slot: HTMLSlotElement | null | undefined) {
    if (!slot) return;
    const assigned = slot.assignedElements({ flatten: true });
    assigned.forEach((el) => {
      const tag = el.tagName.toLowerCase();
      if (tag.startsWith("mui-icon-")) {
        el.setAttribute("size", this.getIconSizeFromTabSize());
        el.setAttribute("color", this.hasAttribute("active") ? "var(--tab-icon-active)" : "var(--tab-icon)");
      }
      if (tag === "mui-badge") {
        // Enforce host-driven badge sizing for consistency.
        el.setAttribute("size", this.getBadgeSizeFromTabSize());
      }
    });
  }

  private updateSlotState() {
    const hasBefore = this.hasAssignedContent(this.beforeSlot);
    const hasAfter = this.hasAssignedContent(this.afterSlot);
    this.toggleAttribute("has-before", hasBefore);
    this.toggleAttribute("has-after", hasAfter);

    this.syncSlottedAffordances(this.beforeSlot);
    this.syncSlottedAffordances(this.afterSlot);
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["active", "size", "variant"];
  }

  attributeChangedCallback(name: string): void {
    if (name === "active") {
      this.updateActiveState();
    } else if (name === "size" || name === "variant") {
      this.updateSlotState();
    }
  }

  connectedCallback() {
    if (!this.shadowRoot) return;
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");

    this.setAttribute("tabindex", this.hasAttribute("active") ? "0" : "-1");
    // Clear existing shadow DOM content
    this.shadowRoot.innerHTML = "";

    const style = document.createElement("style");
    style.textContent = /*css*/ `
      :host {
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--action-padding);
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
        font-weight: var(--font-weight-semi-bold);
        color: var(--tab-text-color);
        background: transparent;
        white-space: nowrap;
        cursor: pointer;
        min-height: var(--action-icon-only-size);
        box-sizing: border-box;
        border-radius: calc(var(--tab-radius) - 0.2rem);
      }

      .inner {
        display: grid;
        width: 100%;
        box-sizing: border-box;
        align-items: center;
        justify-content: stretch;
        gap: var(--space-100);
        grid-template-columns: auto;
      }

      :host([has-before]) .inner {
        grid-template-columns: auto 1fr;
      }

      :host([has-after]) .inner {
        grid-template-columns: 1fr auto;
      }

      :host([has-before][has-after]) .inner {
        grid-template-columns: auto 1fr auto;
      }

      .label {
        display: inline-flex;
        justify-content: center;
        justify-self: center;
      }

      slot[name="before"] {
        justify-self: start;
      }

      slot[name="after"] {
        justify-self: end;
      }

      :host([has-after]) {
        padding-right: var(--action-after-slot-padding);
      }

      :host([has-before]) {
        padding-left: var(--action-before-slot-padding);
      }

      :host([has-after][has-before]) {
        padding-right: var(--action-after-slot-padding);
        padding-left: var(--action-before-slot-padding);
      }

      ::slotted([slot="before"]),
      ::slotted([slot="after"]) {
        display: inline-flex;
        align-items: center;
        line-height: 1;
      }

      :host([has-before]) ::slotted(mui-badge[slot="before"]) {
        margin-right: var(--tab-badge-offset);
      }

      :host([has-after]) ::slotted(mui-badge[slot="after"]) {
        margin-left: var(--tab-badge-offset);
      }

      :host([size="x-small"][has-before]) ::slotted(mui-badge[slot="before"]) {
        margin-right: var(--tab-badge-offset);
      }

      :host([size="x-small"][has-after]) ::slotted(mui-badge[slot="after"]) {
        margin-left: var(--tab-badge-offset);
      }

      :host([size="large"][has-before]) ::slotted(mui-badge[slot="before"]) {
        margin-right: var(--tab-badge-offset-large);
      }

      :host([size="large"][has-after]) ::slotted(mui-badge[slot="after"]) {
        margin-left: var(--tab-badge-offset-large);
      }

      :host([size="x-small"]) {
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
        font-weight: var(--font-weight-semi-bold);
        padding: var(--action-padding-x-small);
        min-height: var(--action-icon-only-size-x-small);
      }

      :host([size="x-small"][has-after]) {
        padding-right: var(--action-after-slot-padding-x-small);
      }

      :host([size="x-small"][has-before]) {
        padding-left: var(--action-before-slot-padding-x-small);
      }

      :host([size="x-small"][has-after][has-before]) {
        padding-right: var(--action-after-slot-padding-x-small);
        padding-left: var(--action-before-slot-padding-x-small);
      }

      :host([size="x-small"]) .inner {
        gap: var(--space-050);
      }

      :host([size="small"]) {
        font-size: var(--text-font-size-s);
        line-height: var(--text-line-height-s);
        padding: var(--action-padding-small);
        min-height: var(--action-icon-only-size-small);
      }

      :host([size="small"][has-after]) {
        padding-right: var(--action-after-slot-padding-small);
      }

      :host([size="small"][has-before]) {
        padding-left: var(--action-before-slot-padding-small);
      }

      :host([size="small"][has-after][has-before]) {
        padding-right: var(--action-after-slot-padding-small);
        padding-left: var(--action-before-slot-padding-small);
      }

      :host([size="small"]) .inner {
        gap: var(--space-100);
      }

      :host([size="large"]) {
        font-size: var(--text-font-size-l);
        line-height: var(--text-line-height-l);
        padding: var(--action-padding-large);
        min-height: var(--action-icon-only-size-large);
      }

      :host([size="large"][has-after]) {
        padding-right: var(--action-after-slot-padding-large);
      }

      :host([size="large"][has-before]) {
        padding-left: var(--action-before-slot-padding-large);
      }

      :host([size="large"][has-after][has-before]) {
        padding-right: var(--action-after-slot-padding-large);
        padding-left: var(--action-before-slot-padding-large);
      }

      :host([size="large"]) .inner {
        gap: var(--space-200);
      }

      /* Outer-edge padding for slot affordances */
      :host([has-before]),
      :host([has-after][has-before]) {
        padding-left: calc(var(--action-before-slot-padding) + var(--tab-edge-padding-extra));
      }

      :host([has-after]),
      :host([has-after][has-before]) {
        padding-right: calc(var(--action-after-slot-padding) + var(--tab-edge-padding-extra));
      }

      :host([size="x-small"][has-before]),
      :host([size="x-small"][has-after][has-before]) {
        padding-left: calc(var(--action-before-slot-padding-x-small) + var(--tab-edge-padding-extra-x-small));
      }

      :host([size="x-small"][has-after]),
      :host([size="x-small"][has-after][has-before]) {
        padding-right: calc(var(--action-after-slot-padding-x-small) + var(--tab-edge-padding-extra-x-small));
      }

      :host([size="small"][has-before]),
      :host([size="small"][has-after][has-before]) {
        padding-left: calc(var(--action-before-slot-padding-small) + var(--tab-edge-padding-extra-small));
      }

      :host([size="small"][has-after]),
      :host([size="small"][has-after][has-before]) {
        padding-right: calc(var(--action-after-slot-padding-small) + var(--tab-edge-padding-extra-small));
      }

      :host([size="large"][has-before]),
      :host([size="large"][has-after][has-before]) {
        padding-left: calc(var(--action-before-slot-padding-large) + var(--tab-edge-padding-extra-large));
      }

      :host([size="large"][has-after]),
      :host([size="large"][has-after][has-before]) {
        padding-right: calc(var(--action-after-slot-padding-large) + var(--tab-edge-padding-extra-large));
      }

      :host([active]) {
        color: var(--tab-text-color-active);
      }

      :host([active]:focus-visible) {
        outline: var(--outline-thick);
        outline-offset: -5px;
      }

      :host([variant="dots"]:focus-visible) {
        outline: var(--outline-medium);
        outline-offset: var(--stroke-size-200);
      }

      :host([variant="dots"]) {
        width: var(--tab-dot-size);
        height: var(--tab-dot-size);
        min-height: var(--tab-dot-size);
        min-width: var(--tab-dot-size);
        border-radius: 999px;
        padding: var(--space-000);
        background: var(--tab-dot-color);
      }

      :host([variant="dots"]) .inner {
        width: 100%;
        height: 100%;
        gap: var(--space-000);
        display: block;
      }

      :host([variant="dots"]) .label {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
      }

      :host([variant="dots"]) slot[name="before"],
      :host([variant="dots"]) slot[name="after"] {
        display: none;
      }

      :host([variant="dots"][active]) {
        background: var(--tab-dot-color-active);
      }
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${style.textContent}</style>
      <div class="inner">
        <slot name="before"></slot>
        <span class="label"><slot></slot></span>
        <slot name="after"></slot>
      </div>
    `;

    this.beforeSlot = this.shadowRoot.querySelector('slot[name="before"]');
    this.afterSlot = this.shadowRoot.querySelector('slot[name="after"]');
    this.beforeSlot?.addEventListener("slotchange", () => this.updateSlotState());
    this.afterSlot?.addEventListener("slotchange", () => this.updateSlotState());

    this.updateSlotState();
    this.updateActiveState();
  }

  updateActiveState() {
    const isActive = this.hasAttribute("active");
    this.setAttribute("role", "tab");
    this.setAttribute("aria-selected", isActive ? "true" : "false");
    this.setAttribute("tabindex", isActive ? "0" : "-1");

    this.syncSlottedAffordances(this.beforeSlot);
    this.syncSlottedAffordances(this.afterSlot);
  }
}

if (!customElements.get("mui-tab-item")) {
  customElements.define("mui-tab-item", MuiTabItem);
}
