class MuiChip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["state", "usage", "close"];
  }

  connectedCallback() {
    this.render();
    this.updateIconSlots();

    if (!this.hasAttribute("tabindex") && !this.hasAttribute("close")) {
      this.setAttribute("tabindex", "0");
    } else if (this.hasAttribute("close")) {
      this.removeAttribute("tabindex");
    }

    this.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  }

  attributeChangedCallback() {
    this.render();
    this.updateIconSlots();
  }

  updateIconSlots() {
    requestAnimationFrame(() => {
      const shadow = this.shadowRoot;
      if (!shadow) return;

      const slotBefore = shadow.querySelector('slot[name="before"]') as HTMLSlotElement | null;
      const slotAfter = shadow.querySelector('slot[name="after"]') as HTMLSlotElement | null;

      const hasAssignedContent = (slot: HTMLSlotElement | null): boolean => {
        if (!slot) return false;
        return slot.assignedNodes({ flatten: true }).some((node: Node) => {
          return (
            node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim())
          );
        });
      };

      const hasBefore = hasAssignedContent(slotBefore);
      const hasAfter = hasAssignedContent(slotAfter);

      this.classList.toggle("has-before", hasBefore);
      this.classList.toggle("has-after", hasAfter);
    });
  }

  render() {
    const styles = /*css*/ `
      :host {
        display: inline-grid;
        align-items: center;
        height: 4rem;
        box-sizing: border-box;
        border: var(--border-thin);
        padding: var(--space-100) var(--space-400);
        gap: var(--space-200);
        background: var(--chip-background);
        border-color: var(--chip-border-color);
        border-radius: var(--chip-radius);
      }

      /* CLICKABLE */
      :host([variant="clickable"]) {
        cursor: pointer;
        transition: border-color var(--speed-200), background-color var(--speed-200);
      }

      /* Before & After Slot
      ========================================= */
      
      :host([variant="clickable"].has-after.has-before) {
        grid-template-columns: auto 1fr auto;
        padding-right: var(--space-200);
        padding-left: var(--space-200);
      }

      :host([variant="clickable"].has-after) {
        grid-template-columns: 1fr auto;
        padding-right: var(--space-200);
      }

      :host([variant="clickable"].has-before) {
        grid-template-columns: auto 1fr;
        padding-left: var(--space-200);
      }

      /* Usage: input */
      :host([usage="input"]) {
        border-radius: var(--input-radius);
      }

      /* Hover and focus (natural) */
      :host([variant="clickable"]:hover) {
        background: var(--chip-background-hover);
        border-color: var(--chip-border-color-hover);
        box-shadow: inset 0 0 0 1px var(--chip-border-color-hover);
      }

      :host([variant="clickable"]:focus) {
        outline: none;
      }

      :host([variant="clickable"]:focus-visible) {
        background: var(--chip-background-focus);
        border-color: var(--chip-border-color-focus);
        outline: var(--outline-thick);
      }

      /* Active: mouse down OR programmatic */
      :host([variant="clickable"]:active),
      :host([variant="clickable"][state="active"]) {
        background: var(--chip-background-active);
        box-shadow: inset 0 0 0 1px var(--chip-border-color-active);
        border-color: var(--chip-border-color-active);
      }

      :host([variant="clickable"]:active) mui-body::part(color),
      :host([variant="clickable"][state="active"]) mui-body::part(color) {
        color: var(--chip-text-color-active);
      }

      ::slotted(.mui-icon) {
        box-sizing: border-box;
        padding: var(--space-025);
        width: var(--space-500);
        height: var(--space-500);
        fill: var(--chip-icon-fill);
      }

      :host(.has-before) ::slotted(.mui-icon) { 
        margin-right: -4px;
      }

      :host(.has-after) ::slotted(.mui-icon) { 
        margin-left: -4px;
      }

          

      /* CLOSE */

      /* Disable pointer and focus styles when close attribute is present */
      :host([close]) {
        grid-template-columns: 1fr auto;
        padding-right: calc(var(--space-100) + 0.1rem);
      }

      /* Has Before */
      :host([close].has-before) {
        grid-template-columns: auto 1fr auto;
        padding-left: var(--space-200);
      }

      /* Close Icon */
      mui-button::part(background) {
        height: initial;
        width: initial;
        padding: var(--space-025);
        border-radius: var(--radius-400);
        background: var(--chip-close-action-background);
      }
      mui-button::part(background):hover {
        background: var(--chip-close-action-background-hover);
      }
    `;

    if (this.hasAttribute("close")) {
      // Close mode
      this.shadowRoot!.innerHTML = /*html*/ `
        <style>${styles}</style>
        <slot name="before"></slot>
        <mui-body size="small" weight="bold">
          <slot></slot>
        </mui-body>
        <mui-button part="close-btn" variant="tertiary" aria-label="Remove chip">
          <mui-icon-close size="x-small"></mui-icon-close>
        </mui-button>
      `;

      this.shadowRoot!.querySelector('[part="close-btn"]')?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.dispatchEvent(
          new CustomEvent("close", {
            bubbles: true,
            composed: true,
            detail: { id: this.id },
          })
        );
      });
    } else {
      // Default mode
      this.setAttribute("variant", "clickable");
      this.shadowRoot!.innerHTML = /*html*/ `
          <style>${styles}</style>
          <slot name="before"></slot>
          <mui-body size="small" weight="bold">
            <slot></slot>
          </mui-body>
          <slot name="after"></slot>
        `;
    }
  }
}

if (!customElements.get("mui-chip")) {
  customElements.define("mui-chip", MuiChip);
}
