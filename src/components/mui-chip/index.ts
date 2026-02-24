class MuiChip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["active", "usage", "dismiss", "size", "disabled", "variant"];
  }

  connectedCallback() {
    this.render();
    this.updateIconSlots();

    if (!this.hasAttribute("tabindex") && !this.hasAttribute("dismiss")) {
      this.setAttribute("tabindex", "0");
    } else if (this.hasAttribute("dismiss")) {
      this.removeAttribute("tabindex");
    }

    this.addEventListener("keydown", (e) => {
      if (this.hasAttribute("disabled")) return;
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

      this.toggleAttribute("has-before", hasBefore);
      this.toggleAttribute("has-after", hasAfter);

      this.forceAvatarSize(slotBefore);
      this.forceAvatarSize(slotAfter);
    });
  }

  forceAvatarSize(slot: HTMLSlotElement | null) {
    if (!slot) return;

    const size = this.getAttribute("size") || "medium";
    const iconSizeMap: Record<string, string> = {
      "x-small": "xx-small",
      small: "x-small",
      medium: "medium",
      large: "medium",
    };
    const iconSize = iconSizeMap[size] || "medium";

    const assignedNodes = slot.assignedNodes({ flatten: true });
    assignedNodes.forEach((node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();

        if (tagName === "mui-avatar") {
          element.setAttribute("size", "x-small");
        } else if (tagName.startsWith("mui-icon-")) {
          element.setAttribute("size", iconSize);
        }
      }
    });
  }

  render() {
    const size = this.getAttribute("size") || "medium";
    const bodySizeMap: Record<string, string> = {
      "x-small": "x-small",
      small: "x-small",
      medium: "small",
      large: "medium",
    };
    const dismissIconSizeMap: Record<string, string> = {
      "x-small": "xx-small",
      small: "xx-small",
      medium: "x-small",
      large: "small",
    };
    const dismissButtonSizeMap: Record<string, string> = {
      "x-small": "x-small",
      small: "x-small",
      medium: "small",
      large: "small",
    };
    const bodySize = bodySizeMap[size] || "small";
    const dismissIconSize = dismissIconSizeMap[size] || "x-small";
    const dismissButtonSize = dismissButtonSizeMap[size] || "small";

    const styles = /*css*/ `
      :host {
        display: inline-flex;
        box-sizing: border-box;
      }
      :host([disabled]) {
        opacity: 0.4;
      }

      .container {
        display: inline-grid;
        align-items: center;
        height: var(--chip-height-medium);
        box-sizing: border-box;
        border: var(--border-thin);
        padding: var(--chip-padding-medium);
        gap: var(--chip-gap-medium);
        background: var(--chip-background);
        border-color: var(--chip-border-color);
        border-radius: var(--chip-radius);
        filter: var(
          --chip-filter,
          drop-shadow(0 var(--stroke-size-100) var(--stroke-size-200) var(--black-opacity-20))
        );
      }

      :host([size="x-small"]) .container {
        height: var(--chip-height-x-small);
        padding: var(--chip-padding-x-small);
        gap: var(--chip-gap-x-small);
        border-radius: var(--chip-radius-x-small);
      }

      :host([size="small"]) .container {
        height: var(--chip-height-small);
        padding: var(--chip-padding-small);
        gap: var(--chip-gap-small);
        border-radius: var(--chip-radius-small);
      }

      :host([size="medium"]) .container {
        height: var(--chip-height-medium);
        border-radius: var(--chip-radius-medium);
      }

      :host([size="large"]) .container {
        height: var(--chip-height-large);
        padding: var(--chip-padding-large);
        gap: var(--chip-gap-large);
        border-radius: var(--chip-radius-large);
      }

      /* CLICKABLE */
      :host([variant="clickable"]) {
        cursor: pointer;
        transition: border-color var(--speed-200), background-color var(--speed-200);
      }
      :host([variant="ghost"]) {
        cursor: pointer;
        transition: border-color var(--speed-200), background-color var(--speed-200);
      }

      /* Before & After Slot
      ========================================= */
      
      :host([has-after][has-before]) .container {
        grid-template-columns: auto 1fr auto;
        padding-right: var(--space-200);
        padding-left: var(--space-200);
      }

      :host([has-after]) .container {
        grid-template-columns: 1fr auto;
        padding-right: var(--space-200);
      }

      :host([has-before]) .container {
        grid-template-columns: auto 1fr;
        padding-left: var(--space-200);
      }

      /* Usage: input */
      :host([usage="input"]) .container {
        border-radius: var(--input-radius);
        border: none;
      }

      :host([usage="input"][slot="before"]),
      :host([usage="input"][slot="after"]) {
        background: var(--chip-input-background, #333333);
        padding: var(--chip-input-shell-padding, 2px);
        border: var(--chip-input-shell-border, 1px solid var(--form-default-border-color));
        box-sizing: border-box;
      }

      :host([usage="input"][slot="before"]) {
        border-right: none;
        border-top-left-radius: var(--input-radius);
        border-bottom-left-radius: var(--input-radius);
      }

      :host([usage="input"][slot="after"]) {
        border-left: none;
        border-top-right-radius: var(--input-radius);
        border-bottom-right-radius: var(--input-radius);
      }

      /* Hover and focus (natural) */
      :host([variant="clickable"]:hover) .container {
        background: var(--chip-background-hover);
        border-color: var(--chip-border-color-hover);
        box-shadow: inset 0 0 0 1px var(--chip-border-color-hover);
      }
      :host([variant="ghost"]) .container {
        background: var(--chip-ghost-background, transparent);
        border-color: var(--chip-ghost-border-color, color-mix(in srgb, var(--border-color) 50%, transparent));
      }
      :host([variant="ghost"]:hover) .container {
        background: var(--chip-ghost-background-hover, color-mix(in srgb, var(--surface-elevated-100) 55%, transparent));
        border-color: var(--chip-ghost-border-color-hover, color-mix(in srgb, var(--border-color) 70%, transparent));
      }

      :host([variant="clickable"]:focus) {
        outline: none;
      }

      :host([variant="clickable"]:focus-visible) .container {
        background: var(--chip-background-focus);
        border-color: var(--chip-border-color-focus);
        outline: var(--outline-thick);
      }
      :host([variant="ghost"]:focus-visible) .container {
        background: var(--chip-ghost-background-focus, color-mix(in srgb, var(--surface-elevated-100) 62%, transparent));
        border-color: var(--chip-ghost-border-color-focus, color-mix(in srgb, var(--border-color) 80%, transparent));
        outline: var(--outline-thick);
      }

      /* Active: mouse down OR programmatic */
      :host([variant="clickable"]:active) .container,
      :host([variant="clickable"][active]) .container {
        background: var(--chip-background-active);
        box-shadow: inset 0 0 0 1px var(--chip-border-color-active);
        border-color: var(--chip-border-color-active);
      }
      :host([variant="ghost"]:active) .container,
      :host([variant="ghost"][active]) .container {
        background: var(--chip-ghost-background-active, color-mix(in srgb, var(--surface-elevated-100) 68%, transparent));
        box-shadow: inset 0 0 0 1px var(--chip-ghost-border-color-active, color-mix(in srgb, var(--border-color) 85%, transparent));
        border-color: var(--chip-ghost-border-color-active, color-mix(in srgb, var(--border-color) 85%, transparent));
      }

      :host([variant="clickable"]:active) mui-body::part(color),
      :host([variant="clickable"][active]) mui-body::part(color) {
        color: var(--chip-text-color-active);
      }

      ::slotted(.mui-icon) {
        box-sizing: border-box;
        padding: var(--space-025);
        fill: var(--chip-icon-fill);
      }

      :host([has-before]) ::slotted(.mui-icon) { 
        margin-right: -4px;
      }

      :host([has-after]) ::slotted(.mui-icon) { 
        margin-left: -4px;
      }

          

      /* DISMISS */

      /* Disable pointer and focus styles when dismiss attribute is present */
      :host([dismiss]) .container {
        grid-template-columns: 1fr auto;
        padding-right: calc(var(--space-200) + 0.1rem);
      }

      :host([dismiss][size="x-small"]) .container {
        padding-right: calc(var(--space-050) + 0.1rem);
      }

      :host([dismiss][size="small"]) .container {
        padding-right: calc(var(--space-100) + 0.1rem);
      }

      :host([dismiss][size="large"]) .container {
        padding-right: calc(var(--space-300) + 0.1rem);
      }

      /* Has Before */
      :host([dismiss][has-before]) .container {
        grid-template-columns: auto 1fr auto;
        padding-left: var(--space-200);
      }

      /* Dismiss Icon */
      mui-button::part(background) {
        height: initial;
        width: initial;
        padding: var(--space-025);
        border-radius: var(--radius-400);
        background: var(--chip-dismiss-action-background);
        filter: var(--chip-dismiss-action-filter, var(--chip-filter));
      }
      mui-button::part(background):hover {
        background: var(--chip-dismiss-action-background-hover);
      }
      :host([disabled]) mui-button {
        pointer-events: none;
      }
    `;

    if (this.hasAttribute("dismiss")) {
      // Dismiss mode
        this.shadowRoot!.innerHTML = /*html*/ `
        <style>${styles}</style>
        <span class="container">
          <slot name="before"></slot>
          <mui-body size="${bodySize}" weight="bold">
            <slot></slot>
          </mui-body>
          <mui-button
            part="dismiss-btn"
            variant="tertiary"
            size="${dismissButtonSize}"
            aria-label="Remove chip"
            ${this.hasAttribute("disabled") ? "disabled" : ""}
          >
            <mui-icon-close size="${dismissIconSize}"></mui-icon-close>
          </mui-button>
        </span>
      `;

      this.shadowRoot!.querySelector('[part="dismiss-btn"]')?.addEventListener("click", (e) => {
        if (this.hasAttribute("disabled")) return;
        e.stopPropagation();
        this.dispatchEvent(
          new CustomEvent("dismiss", {
            bubbles: true,
            composed: true,
            detail: { id: this.id },
          })
        );
      });
    } else {
      // Default mode
      if (!this.hasAttribute("variant")) this.setAttribute("variant", "clickable");
      this.shadowRoot!.innerHTML = /*html*/ `
          <style>${styles}</style>
          <span class="container">
            <slot name="before"></slot>
            <mui-body size="${bodySize}" weight="bold">
              <slot></slot>
            </mui-body>
            <slot name="after"></slot>
          </span>
        `;
    }
  }
}

if (!customElements.get("mui-chip")) {
  customElements.define("mui-chip", MuiChip);
}
