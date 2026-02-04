import "../../mui-icons/down-chevron";
import "../../mui-heading";

/* Mui Accordion */
class MuiAccordionBlock extends HTMLElement {
  private summaryEl: HTMLElement | null = null;
  private detailEl: HTMLElement | null = null;
  private chevronEl: HTMLElement | null = null;
  private accordionId!: string;

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
    if (!this.shadowRoot) return;
    const headingText = this.getAttribute("heading") || "Heading...";
    const size = this.getAttribute("size") || "medium";
    const headingLevel = this.getAttribute("level") || "3";
    const detailSpace = this.getAttribute("detail-space");
    const detailSpaceClass = detailSpace ? `detail-space-${detailSpace}` : "";

    let html = /*html*/ `
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

      /* Card Slot (Supports: Table Cell, Accordion Block) */
      :host([card-slot]) .accordion-summary {
        padding-left: var(--space-500);
        padding-right: var(--space-500);
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

    // Auto-assign usage="card" to slat-groups inside the detail slot
    requestAnimationFrame(() => {
      const slot = this.shadowRoot!.querySelector('slot[name="detail"]') as HTMLSlotElement;

      if (slot) {
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
      }
    });

    this.summaryEl = this.shadowRoot.querySelector(".accordion-summary");
    this.detailEl = this.shadowRoot.querySelector(".accordion-detail");
    this.chevronEl = this.shadowRoot.querySelector("mui-icon-down-chevron");

    if (!this.summaryEl || !this.detailEl || !this.chevronEl) {
      console.error("Accordion elements not found");
      return;
    }

    this.summaryEl?.addEventListener("click", () => this.toggleAccordion());
    this.summaryEl?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleAccordion();
      }
    });
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
      detailEl.style.maxHeight = "0"; // ensure height collapses
    }
  }

  closeAccordion() {
    this.setOpen(false);
  }
}

if (!customElements.get("mui-accordion-block")) {
  customElements.define("mui-accordion-block", MuiAccordionBlock);
}
