import { getPartMap } from "../../utils/part-map";

/* Mui Link */
class MuiLink extends HTMLElement {
  static get observedAttributes() {
    return ["target", "href", "variant", "disabled", "weight", "size", "download", "usage"];
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

    if (name === "disabled") {
      const anchor = this.shadowRoot.querySelector("a");
      if (anchor) {
        if (newValue !== null) {
          anchor.setAttribute("aria-disabled", "true");
          anchor.setAttribute("href", "javascript:void(0)");
        } else {
          anchor.setAttribute("aria-disabled", "false");
          anchor.setAttribute("href", this.getAttribute("href") || "#");
        }
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

    if (name === "size" && _oldValue !== newValue && this.shadowRoot) {
      requestAnimationFrame(() => {
        const shadow = this.shadowRoot;
        if (!shadow) return;

        const slots = [
          shadow.querySelector("slot:not([name])"),
          shadow.querySelector('slot[name="before"]'),
          shadow.querySelector('slot[name="after"]'),
        ] as (HTMLSlotElement | null)[];

        const isIconOnly = this.hasAttribute("icon-only");

        slots.forEach((slot) => {
          if (slot) {
            const nodes = slot.assignedNodes({ flatten: true });
            this.updateIconSizes(nodes, isIconOnly);
            this.updateAvatarSizes(nodes);
          }
        });
      });
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

    this.toggleAttribute("has-before", hasBefore);
    this.toggleAttribute("has-after", hasAfter);

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

    if (iconOnly) {
      this.updateIconSizes(assignedNodes, true);
    } else {
      const allSlots = [slotBefore, slotDefault, slotAfter];
      allSlots.forEach((slot) => {
        if (slot) {
          const nodes = slot.assignedNodes({ flatten: true });
          this.updateIconSizes(nodes, false);
          this.updateAvatarSizes(nodes);
        }
      });
    }
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
      a[aria-disabled="true"] { color: var(--link-text-color-default-disabled); text-decoration-color: color-mix(in srgb, var(--link-text-color-default-disabled) 80%, transparent); cursor: not-allowed; }
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
      :host([variant="attention"]),
      :host([usage="input"]) { display: inline-block; text-align: center; }

      :host([variant="primary"]) a,
      :host([variant="secondary"]) a,
      :host([variant="tertiary"]) a,
      :host([variant="attention"]) a,
      :host([usage="input"]) a {
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

      :host([variant="primary"]) a[aria-disabled="true"] {
        background: var(--action-primary-background-disabled); 
        color: var(--action-primary-text-color-disabled);
        border: var(--action-primary-border-disabled);
        cursor: not-allowed;
      }

      :host([variant="primary"]) a ::slotted(.mui-icon) { fill: var(--action-primary-text-color); }
      :host([variant="primary"]) a:hover ::slotted(.mui-icon) { fill: var(--action-primary-text-color-hover); }
      :host([variant="primary"]) a:focus ::slotted(.mui-icon) { fill: var(--action-primary-text-color-focus); }
      :host([variant="primary"]) a[aria-disabled="true"] ::slotted(.mui-icon) { fill: var(--action-primary-text-color-disabled); }

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

      :host([variant="secondary"]) a[aria-disabled="true"] {
        background: var(--action-secondary-background-disabled);
        color: var(--action-secondary-text-color-disabled);
        border: var(--action-secondary-border-disabled); 
        cursor: not-allowed;
      }

      :host([variant="secondary"]) a ::slotted(.mui-icon) { fill: var(--action-secondary-text-color); }
      :host([variant="secondary"]) a:hover ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-hover); }
      :host([variant="secondary"]) a:focus ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-focus); }
      :host([variant="secondary"]) a[aria-disabled="true"] ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-disabled); }

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

      :host([variant="tertiary"]) a[aria-disabled="true"] {
        background: var(--action-tertiary-background-disabled);
        color: var(--action-tertiary-text-color-disabled);
        border: var(--action-tertiary-border-disabled);
        cursor: not-allowed;
      }

      :host([variant="tertiary"]) a ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color); }
      :host([variant="tertiary"]) a:hover ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-hover); }
      :host([variant="tertiary"]) a:focus ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-focus); }
      :host([variant="tertiary"]) a[aria-disabled="true"] ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-disabled); }

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

      :host([variant="attention"]) a[aria-disabled="true"] {
        background: var(--action-attention-background-disabled);
        color: var(--action-attention-text-color-disabled);
        border: var(--action-attention-border-disabled);
        cursor: not-allowed;
      }

      :host([variant="attention"]) a ::slotted(.mui-icon) { fill: var(--action-attention-text-color); }
      :host([variant="attention"]) a:hover ::slotted(.mui-icon) { fill: var(--action-attention-text-color-hover); }
      :host([variant="attention"]) a:focus ::slotted(.mui-icon) { fill: var(--action-attention-text-color-focus); }
      :host([variant="attention"]) a[aria-disabled="true"] ::slotted(.mui-icon) { fill: var(--action-attention-text-color-disabled); }

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

      :host([alert-positive-slot]) {
        --alert-text: var(--feedback-positive-text);
        --alert-icon: var(--feedback-positive-icon);
        --alert-bg-hover: var(--feedback-positive-action-background);
      }

      :host([alert-info-slot]) {
        --alert-text: var(--feedback-info-text);
        --alert-icon: var(--feedback-info-icon);
        --alert-bg-hover: var(--feedback-info-action-background);
      }

      :host([alert-warning-slot]) {
        --alert-text: var(--feedback-warning-text);
        --alert-icon: var(--feedback-warning-icon);
        --alert-bg-hover: var(--feedback-warning-action-background);
      }

      :host([alert-attention-slot]) {
        --alert-text: var(--feedback-attention-text);
        --alert-icon: var(--feedback-attention-icon);
        --alert-bg-hover: var(--feedback-attention-action-background);
      }

      :host([alert-slot]) a {
        font-weight: var(--font-weight-semi-bold);
        color: var(--alert-text);
      }

      :host([alert-slot]) a:hover,
      :host([alert-slot]) a:focus-visible {
        background: var(--alert-bg-hover);
        color: var(--alert-text);
      }

      :host([alert-slot]) ::slotted(.mui-icon),
      :host([alert-slot]):hover ::slotted(.mui-icon),
      :host([alert-slot]):focus-visible ::slotted(.mui-icon) {
        fill: var(--alert-icon);
      }

      /* AVATAR */

      /* Link - Default */
      :host([variant="default"][size="x-small"]) a ::slotted(mui-avatar) {
        margin-right: var(--space-025);
      }
      :host([variant="default"][size="small"]) a ::slotted(mui-avatar),
      :host([variant="default"][size="medium"]) a ::slotted(mui-avatar),
      :host([variant="default"][size="large"]) a ::slotted(mui-avatar) {
        margin-right: var(--space-025);
      }

      /* Link Button */
      :host(:not([variant="default"])) a ::slotted(mui-avatar) {
        --avatar-background-override: var(--action-avatar-background);
      }

      /* Link Button: Sizes */
      :host(:not([variant="default"])[size="x-small"]) a ::slotted(mui-avatar) {
        margin-right: var(--space-025);
      }
      :host(:not([variant="default"])[size="small"]) a ::slotted(mui-avatar),
      :host(:not([variant="default"])[size="medium"]) a ::slotted(mui-avatar),
      :host(:not([variant="default"])[size="large"]) a ::slotted(mui-avatar) {
        margin-right: var(--space-050);
      }

      /* Link Button: Background */
      :host(:not([variant="default"])) a[aria-disabled="true"] ::slotted(mui-avatar),
      :host(:not([variant="default"])) a[aria-disabled="true"]:hover ::slotted(mui-avatar),
      :host(:not([variant="default"])) a[aria-disabled="true"]:focus ::slotted(mui-avatar) {
        --avatar-background-override: var(--action-avatar-background);
      }

      /* Disabled */
      :host a[aria-disabled="true"] ::slotted(mui-avatar),
      :host a[aria-disabled="true"]:hover ::slotted(mui-avatar),
      :host a[aria-disabled="true"]:focus ::slotted(mui-avatar) {
        opacity: 0.5;
      }

      :host(:not([variant="default"])) a:hover ::slotted(mui-avatar),
      :host(:not([variant="default"])) a:focus ::slotted(mui-avatar) {
        --avatar-background-override: var(--action-avatar-background-hover);
      }



      /* Before & After Icon
      ========================================= */
      :host([has-after]) a,
      :host([has-before]) a,
      :host([has-after][has-before]) a { 
        display: grid; 
        align-items: center; 
        gap: var(--space-100);
      }

      :host([has-after][has-before]) a {
        grid-template-columns: auto 1fr auto;
      }

      :host([has-after]) a {
        grid-template-columns: 1fr auto;
      }

      :host([has-before]) a {
        grid-template-columns: auto 1fr;
      }

      :host([has-after][has-before][variant]:not([variant="default"])) a,
      :host([has-after][has-before][usage="input"]) a {
        padding-right: var(--action-after-slot-padding);
        padding-left: var(--action-before-slot-padding);
      }

      :host([has-after][variant]:not([variant="default"])) a,
      :host([has-after][usage="input"]) a {
        padding-right: var(--action-after-slot-padding);
      }

      :host([has-before][variant]:not([variant="default"])) a,
      :host([has-before][usage="input"]) a {
        padding-left: var(--action-before-slot-padding);
      }

      /* ========================================================================== */
      /* STYLE ADJUSTMENTS WHEN BUTTON IS SLOTTED WITHIN INPUT                      */
      /* Related styles unique to this usage is found in the mui-input/index.js     */
      /* ========================================================================== */
      :host([slot="before"][usage="input"]) a,
      :host([slot="after"][usage="input"]) a {
        border: var(--border-thin);
        min-height: 4.4rem;
        background: var(--input-background);
        color: var(--action-secondary-text-color);
        border-color: var(--form-default-border-color);
      }

      :host([slot="before"][usage="input"]) a:hover,
      :host([slot="before"][usage="input"]) a:focus-visible,
      :host([slot="after"][usage="input"]) a:hover,
      :host([slot="after"][usage="input"]) a:focus-visible {
        background: var(--input-background);
        color: var(--action-secondary-text-color-hover);
        border-color: var(--form-default-border-color-hover);
        border-width: var(--stroke-size-100);
      }

      :host([slot="after"][usage="input"]) a ::slotted(.mui-icon),
      :host([slot="before"][usage="input"]) a ::slotted(.mui-icon) { 
        fill: var(--action-secondary-text-color); 
      }

      :host([slot="after"][usage="input"]) a:hover ::slotted(.mui-icon),
      :host([slot="before"][usage="input"]) a:hover ::slotted(.mui-icon) { 
        fill: var(--action-secondary-text-color-hover); 
      }

      :host([slot="after"][usage="input"]) a:focus-visible ::slotted(.mui-icon),
      :host([slot="before"][usage="input"]) a:focus-visible ::slotted(.mui-icon) { 
        fill: var(--action-secondary-text-color-focus); 
      }

      /* ========================================================================== */
      /* BEFORE: When a BUTTON has slot="before" applied to host for INPUT usage    */
      /* ========================================================================== */
      :host([slot="before"][usage="input"]) a {
        border-right: none;
        border-top-right-radius: var(--radius-000);
        border-bottom-right-radius: var(--radius-000);
      }

      :host([slot="before"][usage="input"]) a:hover,
      :host([slot="before"][usage="input"]) a:focus-visible {
        border-right: none;
        box-shadow: var(--stroke-size-100) 0 0 0 var(--form-default-border-color-hover);
      }

      /* ========================================================================== */
      /* AFTER: When a BUTTON has slot="after" applied to host for INPUT usage      */
      /* ========================================================================== */
      :host([slot="after"][usage="input"]) a {
        border-left: none;
        border-top-left-radius: var(--radius-000);
        border-bottom-left-radius: var(--radius-000);
      }

      :host([slot="after"][usage="input"]) a:hover,
      :host([slot="after"][usage="input"]) a:focus-visible {
        border-left: none;
        box-shadow: calc(-1 * var(--stroke-size-100)) 0 0 0 var(--form-default-border-color-hover);
      }

      /* ========================================================================== */
      /* Size Variants with Before & After Icon padding adjustments                 */
      /* ========================================================================== */

      :host([size="x-small"][variant]:not([variant="default"])) a,
      :host([size="x-small"][variant]:not([variant="default"])) a:hover,
      :host([size="x-small"][variant]:not([variant="default"])) a:focus,
      :host([size="x-small"][variant]:not([variant="default"])) a[aria-disabled="true"] {
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
        font-weight: var(--font-weight-semi-bold);
        padding: var(--action-padding-x-small);
        border-width: var(--stroke-size-100);
        border-radius: var(--action-radius-x-small);
      }

      :host([size="small"][variant]:not([variant="default"])) a {
        font-size: var(--text-font-size-s);
        line-height: var(--text-line-height-s);
        padding: var(--action-padding-small);
        border-radius: var(--action-radius-small);
      }

      :host([size="medium"][variant]:not([variant="default"])) a {
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
        padding: var(--action-padding);
        border-radius: var(--action-radius-medium);
      }

      :host([size="large"][variant]:not([variant="default"])) a {
        font-size: var(--text-font-size-l);
        line-height: var(--text-line-height-l);
        padding: var(--action-padding-large);
        border-radius: var(--action-radius-large);
      }

      /* Icon-only size variants */
      :host([size="x-small"][variant]:not([variant="default"])[icon-only]) a {
        height: var(--action-icon-only-size-x-small);
        width: var(--action-icon-only-size-x-small);
        padding: var(--action-icon-only-padding);
      }

      :host([size="small"][variant]:not([variant="default"])[icon-only]) a {
        height: var(--action-icon-only-size-small);
        width: var(--action-icon-only-size-small);
        padding: var(--action-icon-only-padding);
      }

      :host([size="medium"][variant]:not([variant="default"])[icon-only]) a {
        height: var(--action-icon-only-size);
        width: var(--action-icon-only-size);
        padding: var(--action-icon-only-padding);
      }

      :host([size="large"][variant]:not([variant="default"])[icon-only]) a {
        height: var(--action-icon-only-size-large);
        width: var(--action-icon-only-size-large);
        padding: var(--action-icon-only-padding);
      }

      /* Before & After Icon padding adjustments for x-small */
      :host([size="x-small"][variant]:not([variant="default"])[has-after]) a,
      :host([size="x-small"][variant]:not([variant="default"])[has-before]) a,
      :host([size="x-small"][variant]:not([variant="default"])[has-after][has-before]) a { 
        gap: var(--space-025);
      }

      :host([size="x-small"][variant]:not([variant="default"])[has-after][has-before]) a {
        padding-right: var(--action-after-slot-padding-x-small);
        padding-left: var(--action-before-slot-padding-x-small);
      }

      :host([size="x-small"][variant]:not([variant="default"])[has-after]) a {
        padding-right: var(--action-after-slot-padding-x-small);
      }

      :host([size="x-small"][variant]:not([variant="default"])[has-before]) a {
        padding-left: var(--action-before-slot-padding-x-small);
      }

      /* Before & After Icon padding adjustments for small */
      :host([size="small"][variant]:not([variant="default"])[has-after]) a,
      :host([size="small"][variant]:not([variant="default"])[has-before]) a,
      :host([size="small"][variant]:not([variant="default"])[has-after][has-before]) a { 
        gap: var(--space-050);
      }

      :host([size="small"][variant]:not([variant="default"])[has-after][has-before]) a {
        padding-right: var(--action-after-slot-padding-small);
        padding-left: var(--action-before-slot-padding-small);
      }

      :host([size="small"][variant]:not([variant="default"])[has-after]) a {
        padding-right: var(--action-after-slot-padding-small);
      }

      :host([size="small"][variant]:not([variant="default"])[has-before]) a {
        padding-left: var(--action-before-slot-padding-small);
      }

      /* Before & After Icon padding adjustments for medium */
      :host([size="medium"][variant]:not([variant="default"])[has-after][has-before]) a {
        padding-right: var(--action-after-slot-padding);
        padding-left: var(--action-before-slot-padding);
      }

      :host([size="medium"][variant]:not([variant="default"])[has-after]) a {
        padding-right: var(--action-after-slot-padding);
      }

      :host([size="medium"][variant]:not([variant="default"])[has-before]) a {
        padding-left: var(--action-before-slot-padding);
      }

      /* Before & After Icon padding adjustments for large */
      :host([size="large"][variant]:not([variant="default"])[has-after]) a,
      :host([size="large"][variant]:not([variant="default"])[has-before]) a,
      :host([size="large"][variant]:not([variant="default"])[has-after][has-before]) a { 
        gap: var(--space-200);
      }

      :host([size="large"][variant]:not([variant="default"])[has-after][has-before]) a {
        padding-right: var(--action-after-slot-padding-large);
        padding-left: var(--action-before-slot-padding-large);
      }

      :host([size="large"][variant]:not([variant="default"])[has-after]) a {
        padding-right: var(--action-after-slot-padding-large);
      }

      :host([size="large"][variant]:not([variant="default"])[has-before]) a {
        padding-left: var(--action-before-slot-padding-large);
      }


    </style>

    <a
      part="${partMap}" 
      target="${this.getAttribute("target") || "_self"}" 
      href="${this.hasAttribute("disabled") ? "javascript:void(0)" : this.getAttribute("href") || "#"}"
      aria-disabled="${this.hasAttribute("disabled") ? "true" : "false"}"
      ${
        this.hasAttribute("download") && !this.hasAttribute("disabled")
          ? `download="${this.getAttribute("download") || ""}"`
          : ""
      }
      >
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </a>
    `;
  }

  // Update avatar sizes based on button size
  updateAvatarSizes(nodes: Node[]): void {
    const buttonSize = this.getAttribute("size") || "medium";
    const variant = this.getAttribute("variant") || "default";
    const isDefaultVariant = variant === "default";

    // Map link sizes to avatar sizes
    // Default variant (plain link) uses smaller avatars
    const avatarSizeMap: Record<string, string> = isDefaultVariant
      ? {
          "x-small": "x-small",
          small: "x-small",
          medium: "x-small",
          large: "small",
        }
      : {
          "x-small": "x-small",
          small: "x-small",
          medium: "small",
          large: "medium",
        };

    const targetAvatarSize = avatarSizeMap[buttonSize] || "small";

    nodes.forEach((node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const isAvatar = el.tagName.toLowerCase() === "mui-avatar";

        if (isAvatar) {
          el.setAttribute("size", targetAvatarSize);
        }
      }
    });
  }

  updateIconSizes(nodes: Node[], isIconOnly: boolean): void {
    const linkSize = this.getAttribute("size") || "medium";

    // Map link sizes to icon sizes
    const iconSizeMap: Record<string, string> = {
      "x-small": "x-small",
      small: "x-small",
      medium: isIconOnly ? "medium" : "small",
      large: isIconOnly ? "large" : "medium",
    };

    const targetIconSize = iconSizeMap[linkSize] || "small";

    nodes.forEach((node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toLowerCase();
        const isIcon = tagName === "svg" || el.classList.contains("mui-icon") || tagName === "mui-icon";

        // Only set size if the element doesn't already have one
        if (isIcon && !el.hasAttribute("size")) {
          el.setAttribute("size", targetIconSize);
        }
      }
    });
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
