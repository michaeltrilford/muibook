import "../../mui-icons/down-chevron";
import "../../mui-heading";

/* Mui Accordion */
class MuiAccordionBlock extends HTMLElement {
  static get observedAttributes() {
    return ["heading", "size", "level", "detail-space"];
  }

  private summaryEl: HTMLElement | null = null;
  private detailEl: HTMLElement | null = null;
  private chevronEl: HTMLElement | null = null;
  private detailSlotEl: HTMLSlotElement | null = null;
  private accordionId!: string;

  private readonly handleSummaryClick = () => this.toggleAccordion();

  private readonly handleSummaryKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.toggleAccordion();
    }
  };

  private readonly handleDetailSlotChange = () => {
    this.applyAccordionUsage();
    this.syncOpenHeight();
  };

  private getDetailEl(): HTMLElement | null {
    if (!this.detailEl) {
      this.detailEl = this.shadowRoot?.querySelector(".accordion-detail") || null;
    }
    return this.detailEl;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.accordionId = `accordion-detail-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue || !this.isConnected) return;
    this.render();
  }

  private applyAccordionUsage() {
    requestAnimationFrame(() => {
      const slot = this.detailSlotEl || this.shadowRoot?.querySelector('slot[name="detail"]') as HTMLSlotElement | null;

      if (!slot) return;

      const slottedNodes = slot.assignedElements({ flatten: true });
      slottedNodes.forEach((node) => {
        const slatGroups =
          node.tagName?.toLowerCase() === "mui-slat-group"
            ? [node]
            : Array.from(node.querySelectorAll?.("mui-slat-group") || []);

        slatGroups.forEach((slatGroup) => {
          if (!slatGroup.hasAttribute("usage")) {
            slatGroup.setAttribute("usage", "accordion");
          }
        });
      });
    });
  }

  private bindEvents() {
    this.summaryEl?.removeEventListener("click", this.handleSummaryClick);
    this.summaryEl?.removeEventListener("keydown", this.handleSummaryKeydown);
    this.summaryEl?.addEventListener("click", this.handleSummaryClick);
    this.summaryEl?.addEventListener("keydown", this.handleSummaryKeydown);

    this.detailSlotEl?.removeEventListener("slotchange", this.handleDetailSlotChange);
    this.detailSlotEl?.addEventListener("slotchange", this.handleDetailSlotChange);
  }

  private syncOpenHeight() {
    const detailEl = this.getDetailEl();
    if (!detailEl || !detailEl.hasAttribute("open")) return;

    requestAnimationFrame(() => {
      const liveDetailEl = this.getDetailEl();
      if (!liveDetailEl || !liveDetailEl.hasAttribute("open")) return;
      liveDetailEl.style.maxHeight = liveDetailEl.scrollHeight + "px";
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    const wasOpen = this.getDetailEl()?.hasAttribute("open") ?? false;
    const headingText = this.getAttribute("heading") || "Heading...";
    const size = this.getAttribute("size") || "medium";
    const headingLevel = this.getAttribute("level") || "3";
    const detailSpace = this.getAttribute("detail-space");
    const detailSpaceClass = detailSpace ? `detail-space-${detailSpace}` : "";

    const html = /*html*/ `
    <style>

      :host { display: block; }

      .accordion-summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: var(--border-thin);
        cursor: pointer;
      }

      .accordion-summary:focus-visible {
        outline: var(--outline-thick);
      }

      .accordion-summary:hover .icon {
        background: var(--surface-elevated-200);
      }

      .icon {
        padding: var(--space-200);
        box-sizing: border-box;
        display: flex;
        border-radius: var(--radius-200);
      }

      mui-icon-down-chevron {
        transition: transform var(--speed-200) ease-in-out;
        transform: rotate(0deg);
      }

      mui-heading {
        width: 100%;
      }

      mui-icon-down-chevron[open] {
        transform: rotate(-180deg);
      }

      .accordion-detail {
        max-height: 0;
        overflow: hidden;
        transition: max-height var(--speed-300) ease;
        box-shadow: inset 0 1px 0 0 var(--border-color);
      }

      .accordion-detail-inner {
        padding: var(--space-500);
      }

      .accordion-detail-inner > *:last-child {
        margin-bottom: 0;
      }

      .size-small-summary {
        padding: var(--space-300) var(--space-500);
      }
      .size-medium-summary {
        padding: var(--space-400) var(--space-500);
      }
      .size-large-summary {
        padding: var(--space-500) var(--space-600);
      }

      .size-small-detail {
        padding: var(--space-500);
      }
      .size-medium-detail {
        padding: var(--space-500);
      }
      .size-large-detail {
        padding: var(--space-600);
      }

      .detail-space-none {
        padding: 0;
      }

      :host([first-child]) .accordion-summary {
        border-top: none;
      }

      :host([card-slot]) .accordion-summary {
        padding-left: var(--space-500);
        padding-right: var(--space-500);
        border-top-color: color-mix(in srgb, var(--border-color) 50%, transparent);
      }
      @media (min-width: 768px) {
        :host([card-slot]) .accordion-summary {
          padding-left: var(--space-600);
          padding-right: var(--space-600);
        }
      }
      :host([card-slot]) .accordion-detail-inner {
        padding-left: var(--space-500);
        padding-right: var(--space-500);
      }
      :host([card-slot]) .accordion-detail {
        box-shadow: inset 0 1px 0 0 color-mix(in srgb, var(--border-color) 50%, transparent);
      }
      @media (min-width: 768px) {
        :host([card-slot]) .accordion-detail-inner {
          padding-left: var(--space-600);
          padding-right: var(--space-600);
        }
      }
      :host([card-slot]) .detail-space-none {
        padding: 0;
      }
      @media (min-width: 768px) {
        :host([card-slot]) .detail-space-none {
          padding: 0;
        }
      }

    </style>

    <div
      class="accordion-summary size-${size}-summary"
      role="button"
      tabindex="0"
      aria-expanded="false"
      aria-controls="${this.accordionId}"
    >
      <mui-heading size="6" level="${headingLevel}">${headingText}</mui-heading>
      <div class="icon">
        <mui-icon-down-chevron size="x-small"></mui-icon-down-chevron>
      </div>
    </div>

    <div id="${this.accordionId}" class="accordion-detail">
      <div class="accordion-detail-inner size-${size}-detail ${detailSpaceClass}" inert>
        <slot name="detail">Insert Content</slot>
      </div>
    </div>
    `;

    this.shadowRoot.innerHTML = html;
    this.summaryEl = this.shadowRoot.querySelector(".accordion-summary");
    this.detailEl = this.shadowRoot.querySelector(".accordion-detail");
    this.chevronEl = this.shadowRoot.querySelector("mui-icon-down-chevron");
    this.detailSlotEl = this.shadowRoot.querySelector('slot[name="detail"]');

    if (!this.summaryEl || !this.detailEl || !this.chevronEl) {
      console.error("Accordion elements not found");
      return;
    }

    this.bindEvents();
    this.applyAccordionUsage();
    this.setOpen(wasOpen);
    if (wasOpen) {
      this.detailEl.style.maxHeight = this.detailEl.scrollHeight + "px";
    }
  }

  toggleAccordion() {
    const detailEl = this.getDetailEl();
    if (!detailEl) return;

    const isOpen = detailEl.hasAttribute("open");
    const nextOpen = !isOpen;

    this.setOpen(nextOpen);

    if (nextOpen) {
      const scrollHeight = detailEl.scrollHeight;
      detailEl.style.maxHeight = scrollHeight + "px";
    } else {
      detailEl.style.maxHeight = "0";
    }
  }

  setOpen(state: boolean) {
    const detailEl = this.getDetailEl();
    if (!detailEl || !this.chevronEl || !this.summaryEl) return;

    const innerDetail = detailEl.querySelector(".accordion-detail-inner");

    if (state) {
      detailEl.setAttribute("open", "");
      this.chevronEl.setAttribute("open", "");
      this.summaryEl.setAttribute("aria-expanded", "true");
      if (innerDetail) innerDetail.removeAttribute("inert");

      this.dispatchEvent(new CustomEvent("accordion-opened", { bubbles: true, composed: true }));
    } else {
      detailEl.removeAttribute("open");
      this.chevronEl.removeAttribute("open");
      this.summaryEl.setAttribute("aria-expanded", "false");
      if (innerDetail) innerDetail.setAttribute("inert", "");
      detailEl.style.maxHeight = "0";
    }
  }

  closeAccordion() {
    this.setOpen(false);
  }
}

if (!customElements.get("mui-accordion-block")) {
  customElements.define("mui-accordion-block", MuiAccordionBlock);
}
