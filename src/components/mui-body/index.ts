import { getPartMap } from "../../utils/part-map";

class MuiBody extends HTMLElement {
  static get observedAttributes() {
    return ["size", "weight", "variant", "truncate", "clamp"];
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
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue && this.shadowRoot) {
      this.render();
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const partMap = getPartMap("text", "spacing", "layout", "visual");
    const lineClamp = this.getLineClamp();

    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      :host {
        display: block;
        --body-line-clamp: ${lineClamp};
      }
      :host([has-before]),
      :host([has-after]) {
        display: inline-flex;
      }

      :host([truncate]) {
        display: block;
        min-width: 0;
        max-width: 100%;
        width: 100%;
      }

      :host p {
        color: var(--text-color);
        margin: var(--space-000);
        display: block;
        min-width: 0;
        width: 100%;
      }

      :host([menu-slot]) p {
        box-sizing: border-box;
        border: var(--action-tertiary-border);
      }

      :host([variant="secondary"][menu-slot]) p {
        color: var(--menu-section-header);
      }

      :host([menu-slot][size="xx-small"]) p {
        padding-block: var(--action-padding-block-x-small);
        padding-inline: var(--action-padding-inline-x-small);
        padding-block-start: var(--space-100);
        padding-block-end: var(--space-025);
      }

      :host([menu-slot][size="x-small"]) p {
        padding-block: var(--action-padding-block-small);
        padding-inline: var(--action-padding-inline-small);
        padding-block-start: var(--space-200);
        padding-block-end: var(--space-050);
      }

      :host([menu-slot][size="small"]) p {
        padding-block: var(--action-padding-block);
        padding-inline: var(--action-padding-inline);
        padding-block-start: var(--space-300);
        padding-block-end: var(--space-050);
      }

      :host([menu-slot][size="medium"]) p {
        padding-block: var(--action-padding-block-large);
        padding-inline: var(--action-padding-inline-large);
        padding-block-start: var(--space-400);
        padding-block-end: var(--space-100);
      }

      :host([menu-slot][menu-inset][size="xx-small"]) p {
        padding-inline: calc(var(--action-padding-inline-x-small) - var(--menu-inset));
      }

      :host([menu-slot][menu-inset][size="x-small"]) p {
        padding-inline: calc(var(--action-padding-inline-small) - var(--menu-inset));
      }

      :host([menu-slot][menu-inset][size="small"]) p {
        padding-inline: calc(var(--action-padding-inline) - var(--menu-inset));
      }

      :host([menu-slot][menu-inset][size="medium"]) p {
        padding-inline: calc(var(--action-padding-inline-large) - var(--menu-inset));
      }

      :host([has-before]) p,
      :host([has-after]) p {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--space-100);
        width: auto;
        max-width: 100%;
      }

      .content {
        max-width: 100%;
        min-width: 0;
      }

      :host([truncate]) p,
      :host([clamp]) p {
        max-width: 100%;
      }

      :host([truncate]) .content {
        display: block;
        max-width: 100%;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host([clamp]:not([truncate])) .content {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: var(--body-line-clamp);
      }

      ::slotted([slot="before"]),
      ::slotted([slot="after"]) {
        flex-shrink: 0;
        margin-top: var(--body-inline-icon-offset-medium, var(--body-inline-icon-offset, var(--stroke-size-200)));
      }

      :host([size="xx-small"]) ::slotted([slot="before"]),
      :host([size="xx-small"]) ::slotted([slot="after"]),
      :host([size="x-small"]) ::slotted([slot="before"]),
      :host([size="x-small"]) ::slotted([slot="after"]) {
        margin-top: var(--body-inline-icon-offset-x-small, var(--body-inline-icon-offset, var(--stroke-size-100)));
      }

      :host([size="small"]) ::slotted([slot="before"]),
      :host([size="small"]) ::slotted([slot="after"]) {
        margin-top: var(
          --body-inline-icon-offset-small, var(--body-inline-icon-offset)
        );
      }

      :host([size="large"]) ::slotted([slot="before"]),
      :host([size="large"]) ::slotted([slot="after"]) {
        margin-top: var(--body-inline-icon-offset-large, var(--body-inline-icon-offset, var(--stroke-size-300)));
      }

      :host([size="xx-small"]) p {
        font-size: var(--text-font-size-xxs);
        line-height: var(--text-line-height-xxs);
      }

      :host([size="x-small"]) p {
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
      }

      :host([size="small"]) p {
        font-size: var(--text-font-size-s); 
        line-height: var(--text-line-height-s);
      }

      :host([size="medium"]) p {
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
      }

      :host([size="large"]) p {
        font-size: var(--text-font-size-l); 
        line-height: var(--text-line-height-l);
      }

      :host([weight="regular"]) p { font-weight: var(--font-weight-regular); }
      :host([weight="medium"]) p { font-weight: var(--font-weight-medium); }
      :host([weight="bold"]) p { font-weight: var(--font-weight-bold); }

      /* Variant */
      :host([variant="default"]) p {
        color: var(--text-color);
      }

      :host([variant="secondary"]) p {
        color: var(--text-color-secondary);
      }

      :host([variant="info"]) p {
        color: var(--text-color-info);
      }
      :host([variant="positive"]) p {
        color: var(--text-color-positive);
      }
      :host([variant="warning"]) p {
        color: var(--text-color-warning);
      }
      :host([variant="attention"]) p {
        color: var(--text-color-attention);
      }

      :host([variant="default"]) ::slotted(.mui-icon) {
        fill: var(--text-color);
      }
      :host([variant="secondary"]) ::slotted(.mui-icon) {
        fill: var(--text-color-secondary);
      }
      :host([variant="info"]) ::slotted(.mui-icon) {
        fill: var(--text-color-info);
      }
      :host([variant="positive"]) ::slotted(.mui-icon) {
        fill: var(--text-color-positive);
      }
      :host([variant="warning"]) ::slotted(.mui-icon) {
        fill: var(--text-color-warning);
      }
      :host([variant="attention"]) ::slotted(.mui-icon) {
        fill: var(--text-color-attention);
      }

    </style>
    
    <p part="${partMap}">
      <slot name="before"></slot>
      <span class="content" part="content"><slot></slot></span>
      <slot name="after"></slot>
    </p>
    `;

    this.setupSlotBehavior();
  }

  private getLineClamp() {
    const value = Number(this.getAttribute("clamp"));
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 2;
  }

  private setupSlotBehavior() {
    if (!this.shadowRoot) return;

    const beforeSlot = this.shadowRoot.querySelector('slot[name="before"]') as HTMLSlotElement | null;
    const afterSlot = this.shadowRoot.querySelector('slot[name="after"]') as HTMLSlotElement | null;

    const update = () => {
      const beforeEls = beforeSlot?.assignedElements({ flatten: true }) ?? [];
      const afterEls = afterSlot?.assignedElements({ flatten: true }) ?? [];

      if (beforeEls.length > 0) this.setAttribute("has-before", "");
      else this.removeAttribute("has-before");

      if (afterEls.length > 0) this.setAttribute("has-after", "");
      else this.removeAttribute("has-after");

      this.syncInlineSlotSizes([...beforeEls, ...afterEls]);
    };

    beforeSlot?.addEventListener("slotchange", update);
    afterSlot?.addEventListener("slotchange", update);
    update();
  }

  private syncInlineSlotSizes(elements: Element[]) {
    const sizeMap: Record<string, string> = {
      "xx-small": "xx-small",
      "x-small": "x-small",
      small: "small",
      medium: "small",
      large: "medium",
    };

    const iconSize = sizeMap[this.getAttribute("size") || "medium"] || "small";
    const badgeSizeMap: Record<string, string> = {
      "xx-small": "xx-small",
      "x-small": "xx-small",
      small: "x-small",
      medium: "small",
      large: "medium",
    };
    const badgeSize = badgeSizeMap[this.getAttribute("size") || "medium"] || "small";

    elements.forEach((el) => {
      if (el.tagName.startsWith("MUI-ICON-")) {
        el.setAttribute("size", iconSize);
      }
      if (el.tagName === "MUI-BADGE") {
        el.setAttribute("size", badgeSize);
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

if (!customElements.get("mui-body")) {
  customElements.define("mui-body", MuiBody);
}
