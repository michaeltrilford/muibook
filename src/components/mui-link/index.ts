import { getPartMap } from "../../utils/part-map";

/* Mui Link */
class MuiLink extends HTMLElement {
  static get observedAttributes() {
    return ["target", "href", "variant", "weight", "size", "download"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    if (!this.hasAttribute("weight")) this.setAttribute("weight", "regular");
    if (!this.hasAttribute("variant")) this.setAttribute("variant", "default");

    await this.waitForPartMap();

    this.render();

    requestAnimationFrame(() => this.updateSlotState());
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (!this.shadowRoot) return;

    if (name === "href") {
      const anchor = this.shadowRoot.querySelector("a");
      if (anchor) {
        anchor.setAttribute("href", newValue || "#");
      }
    }

    if (name === "target") {
      const anchor = this.shadowRoot.querySelector("a");
      if (anchor) {
        anchor.setAttribute("target", newValue || "_self");
      }
    }

    if (name === "download") {
      const anchor = this.shadowRoot.querySelector("a");
      if (!anchor) return;

      if (newValue !== null) {
        anchor.setAttribute("download", newValue === "" ? "" : newValue);
      } else {
        anchor.removeAttribute("download");
      }
    }
  }

  private updateSlotState() {
    const shadow = this.shadowRoot!;
    const slotDefault = shadow.querySelector("slot:not([name])") as HTMLSlotElement | null;
    const slotBefore = shadow.querySelector('slot[name="before"]') as HTMLSlotElement | null;
    const slotAfter = shadow.querySelector('slot[name="after"]') as HTMLSlotElement | null;

    const hasAssignedContent = (slot: HTMLSlotElement | null): boolean =>
      !!slot &&
      slot
        .assignedNodes({ flatten: true })
        .some(
          (node) =>
            node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim())
        );

    const hasBefore = hasAssignedContent(slotBefore);
    const hasAfter = hasAssignedContent(slotAfter);

    this.classList.toggle("has-before", hasBefore);
    this.classList.toggle("has-after", hasAfter);

    const assignedNodes = slotDefault?.assignedNodes({ flatten: true }) ?? [];

    const iconOnly =
      assignedNodes.length > 0 &&
      assignedNodes.every((node) =>
        node.nodeType === Node.ELEMENT_NODE
          ? (node as HTMLElement).classList.contains("mui-icon") ||
            (node as HTMLElement).tagName.toLowerCase() === "svg"
          : !node.textContent?.trim()
      );

    this.toggleAttribute("icon-only", iconOnly);
  }

  render() {
    if (!this.shadowRoot) return;

    const partMap = getPartMap("text", "spacing", "layout", "visual");

    this.shadowRoot.innerHTML = /*html*/ `
    <style>

      :host { display: inline-flex; width: auto; text-align: initial }

      a {
        color: var(--link-text-color-default);
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-sizing: border-box;
        text-decoration: underline;
        text-underline-offset: var(--space-050);
        text-decoration-color: color-mix(in srgb, var(--text-color) 50%, transparent);
        width: inherit;
        display: inherit;
      }

      /* Turned back on for focus-visible */
      a:focus, a:active, a:hover { outline: var(--space-000); }
      a:hover { color: var(--link-text-color-default-hover); text-decoration-color: color-mix(in srgb, var(--link-text-color-default-hover) 80%, transparent); }
      a:focus { color: var(--link-text-color-default-focus); text-decoration-color: color-mix(in srgb, var(--link-text-color-default-focus) 80%, transparent); }
      a:disabled { color: var(--link-text-color-default-disabled); text-decoration-color: color-mix(in srgb, var(--link-text-color-default-disabled) 80%, transparent); cursor: not-allowed; }
      a, a:before, a:after {box-sizing: border-box;}
      a:focus-visible { outline: var(--outline-thick); }

      :host([size="x-small"]) a {
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
      }

      :host([size="small"]) a {
        font-size: var(--text-font-size-s); 
        line-height: var(--text-line-height-s);
      }

      :host([size="medium"]) a {
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
      }
      :host([size="large"]) a {
        font-size: var(--text-font-size-l); 
        line-height: var(--text-line-height-l);
      }

      :host([weight="regular"]) a { font-weight: var(--font-weight-regular); }
      :host([weight="medium"]) a { font-weight: var(--font-weight-medium); }
      :host([weight="bold"]) a { font-weight: var(--font-weight-bold); }



      /* Button  
      ========================================= */

      :host([variant="primary"]),
      :host([variant="secondary"]),
      :host([variant="tertiary"]),
      :host([variant="attention"]) { display: inline-block; text-align: center; }

      :host([variant="primary"]) a,
      :host([variant="secondary"]) a,
      :host([variant="tertiary"]) a,
      :host([variant="attention"]) a {
        display: inherit;
        text-align: inherit;
        width: 100%;
        text-decoration: none;
        padding: var(--action-padding);
        border-radius: var(--action-radius);
        font-size: var(--action-font-size);
        font-weight: var(--action-font-weight);
        line-height: var(--action-line-height);
      }



      /* Button Primary 
      ========================================= */

      :host([variant="primary"]) a {
        background: var(--action-primary-background);
        color: var(--action-primary-text-color);
        border: var(--action-primary-border);
      }

      :host([variant="primary"]) a:hover {
        background: var(--action-primary-background-hover);
        color: var(--action-primary-text-color-hover);
        border: var(--action-primary-border-hover);
      }

      :host([variant="primary"]) a:focus-visible {
        background: var(--action-primary-background-focus); 
        color: var(--action-primary-text-color-focus);
        border: var(--action-primary-border-focus);
      }

      :host([variant="primary"]) a:disabled {
        background: var(--action-primary-background-disabled); 
        color: var(--action-primary-text-color-disabled);
        border: var(--action-primary-border-disabled);
        cursor: not-allowed;
      }

      :host([variant="primary"]) a ::slotted(.mui-icon) { fill: var(--action-primary-text-color); }
      :host([variant="primary"]) a:hover ::slotted(.mui-icon) { fill: var(--action-primary-text-color-hover); }
      :host([variant="primary"]) a:focus ::slotted(.mui-icon) { fill: var(--action-primary-text-color-focus); }
      :host([variant="primary"]) a:disabled ::slotted(.mui-icon) { fill: var(--action-primary-text-color-disabled); }

      /* Button Secondary 
      ========================================= */
      :host([variant="secondary"]) a {
        background: var(--action-secondary-background);
        color: var(--action-secondary-text-color);
        border: var(--action-secondary-border); 
      }

      :host([variant="secondary"]) a:hover {
        background: var(--action-secondary-background-hover);
        color: var(--action-secondary-text-color-hover);
        border: var(--action-secondary-border-hover); 
      }

      :host([variant="secondary"]) a:focus-visible {
        background: var(--action-secondary-background-focus);
        color: var(--action-secondary-text-color-focus);
        border: var(--action-secondary-border-focus); 
      }

      :host([variant="secondary"]) a:disabled {
        background: var(--action-secondary-background-disabled);
        color: var(--action-secondary-text-color-disabled);
        border: var(--action-secondary-border-disabled); 
        cursor: not-allowed;
      }

      :host([variant="secondary"]) a ::slotted(.mui-icon) { fill: var(--action-secondary-text-color); }
      :host([variant="secondary"]) a:hover ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-hover); }
      :host([variant="secondary"]) a:focus ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-focus); }
      :host([variant="secondary"]) a:disabled ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-disabled); }

      /* Button Tertiary
      ========================================= */
      :host([variant="tertiary"]) a {
        background: var(--action-tertiary-background);
        color: var(--action-tertiary-text-color);
        border: var(--action-tertiary-border);
      }

      :host([variant="tertiary"]) a:hover {
        color: var(--action-tertiary-text-color-hover);
        background: var(--action-tertiary-background-hover);
        border: var(--action-tertiary-border-hover);
      }

      :host([variant="tertiary"]) a:focus-visible {
        color: var(--action-tertiary-text-color-focus);
        background: var(--action-tertiary-background-focus); 
        border: var(--action-tertiary-border-focus);
      }

      :host([variant="tertiary"]) a:disabled {
        background: var(--action-tertiary-background-disabled);
        color: var(--action-tertiary-text-color-disabled);
        border: var(--action-tertiary-border-disabled);
        cursor: not-allowed;
      }

      :host([variant="tertiary"]) a ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color); }
      :host([variant="tertiary"]) a:hover ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-hover); }
      :host([variant="tertiary"]) a:focus ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-focus); }
      :host([variant="tertiary"]) a:disabled ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-disabled); }

      /* Button Attention
      ========================================= */
      :host([variant="attention"]) a {
        background: var(--action-attention-background);
        color: var(--action-attention-text-color);
        border: var(--action-attention-border);
      }

      :host([variant="attention"]) a:hover {
        background: var(--action-attention-background-hover);
        color: var(--action-attention-text-color-hover);
        border: var(--action-attention-border-hover);
      }

      :host([variant="attention"]) a:focus-visible  {
        background: var(--action-attention-background-focus);
        color: var(--action-attention-text-color-focus);
        border: var(--action-attention-border-focus);
      }

      :host([variant="attention"]) a:disabled {
        background: var(--action-attention-background-disabled);
        color: var(--action-attention-text-color-disabled);
        border: var(--action-attention-border-disabled);
        cursor: not-allowed;
      }

      :host([variant="attention"]) a ::slotted(.mui-icon) { fill: var(--action-attention-text-color); }
      :host([variant="attention"]) a:hover ::slotted(.mui-icon) { fill: var(--action-attention-text-color-hover); }
      :host([variant="attention"]) a:focus ::slotted(.mui-icon) { fill: var(--action-attention-text-color-focus); }
      :host([variant="attention"]) a:disabled ::slotted(.mui-icon) { fill: var(--action-attention-text-color-disabled); }

      /* Icon only
      ========================================= */
      :host([icon-only]) a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        width: 44px;
        padding: var(--action-icon-only-padding);
      }
      /* ===================================== */

      :host(.alert-positive-slot) {
        --alert-text: var(--feedback-positive-text);
        --alert-icon: var(--feedback-positive-icon);
        --alert-bg-hover: var(--feedback-positive-action-background);
      }

      :host(.alert-info-slot) {
        --alert-text: var(--feedback-info-text);
        --alert-icon: var(--feedback-info-icon);
        --alert-bg-hover: var(--feedback-info-action-background);
      }

      :host(.alert-warning-slot) {
        --alert-text: var(--feedback-warning-text);
        --alert-icon: var(--feedback-warning-icon);
        --alert-bg-hover: var(--feedback-warning-action-background);
      }

      :host(.alert-attention-slot) {
        --alert-text: var(--feedback-attention-text);
        --alert-icon: var(--feedback-attention-icon);
        --alert-bg-hover: var(--feedback-attention-action-background);
      }

      :host(.alert-slot) a {
        font-weight: var(--font-weight-semi-bold);
        color: var(--alert-text);
      }

      :host(.alert-slot) a:hover,
      :host(.alert-slot) a:focus-visible {
        background: var(--alert-bg-hover);
        color: var(--alert-text);
      }

      :host(.alert-slot) ::slotted(.mui-icon),
      :host(.alert-slot):hover ::slotted(.mui-icon),
      :host(.alert-slot):focus-visible ::slotted(.mui-icon) {
        fill: var(--alert-icon);
      }

      /* Before & After Icon
      ========================================= */
      :host(.has-after) a,
      :host(.has-before) a,
      :host(.has-after.has-before) a { 
        display: grid; 
        align-items: center; 
        gap: var(--space-100);
      }
      
      :host(.has-after.has-before) a {
        grid-template-columns: auto 1fr auto;
      }

      :host(.has-after) a {
        grid-template-columns: 1fr auto;
      }

      :host(.has-before) a {
        grid-template-columns: auto 1fr;
      }

      :host(.has-after.has-before[variant]) a {
        padding-right: var(--action-after-slot-padding);
        padding-left: var(--action-before-slot-padding);
      }

      :host(.has-after[variant]) a {
        padding-right: var(--action-after-slot-padding);
      }

      :host(.has-before[variant]) a {
        padding-left: var(--action-before-slot-padding);
      }

    </style>

    <a
      part="${partMap}" 
      target="${this.getAttribute("target") || "_self"}" 
      href="${this.getAttribute("href") || "#"}"
      ${this.hasAttribute("download") ? `download="${this.getAttribute("download") || ""}"` : ""}
      >
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </a>
    `;
  }

  waitForPartMap(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (typeof getPartMap === "function") return resolve();
      const check = () => {
        if (typeof getPartMap === "function") {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }
}

if (!customElements.get("mui-link")) {
  customElements.define("mui-link", MuiLink);
}
