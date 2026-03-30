import "../../mui-icons/right-chevron";
import "../../mui-heading";

class MuiAccordionInline extends HTMLElement {
  static get observedAttributes() {
    return ["heading", "level"];
  }

  private summaryEl!: HTMLElement | null;
  private detailEl!: HTMLElement | null;
  private chevronEl!: HTMLElement | null;
  private detailSlotEl: HTMLSlotElement | null = null;

  private readonly handleSummaryClick = () => this.toggleAccordion();

  private readonly handleSummaryKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.toggleAccordion();
    }
  };

  private readonly handleDetailSlotChange = () => {
    this.syncOpenHeight();
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue || !this.isConnected) return;
    this.render();
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
    if (!this.detailEl || !this.detailEl.hasAttribute("open")) return;

    requestAnimationFrame(() => {
      if (!this.detailEl || !this.detailEl.hasAttribute("open")) return;
      this.detailEl.style.maxHeight = this.detailEl.scrollHeight + "px";
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    const wasOpen = this.detailEl?.hasAttribute("open") ?? false;
    const headingText = this.getAttribute("heading") || "Heading...";
    const headingLevel = this.getAttribute("level") || "3";

    const html = /*html*/ `
    <style>
      :host {
        display: inline-flex;
        flex-direction: column;
      }

      .accordion-summary {
        display: flex;
        align-items: center;
        margin-bottom: var(--space-000);
        cursor: pointer;
      }

      .accordion-summary:focus-visible {
        outline: var(--outline-thick);
      }

      mui-heading:hover {
        cursor: pointer;
      }

      mui-icon-right-chevron {
        margin-right: var(--space-100);
        transition: var(--speed-200) ease-in-out;
      }

      mui-icon-right-chevron[open] {
        transform: rotate(90deg);
      }

      .accordion-detail {
        display: block;
        margin-bottom: var(--space-000);
        max-height: 0;
        transition: max-height var(--speed-100) ease-in-out;
        overflow-y: hidden;
      }

      .accordion-detail[open] {
        transition: max-height var(--speed-400) ease-in-out;
      }

      .accordion-detail-inner {
        display: block;
        margin-top: 1.2rem;
      }

      .accordion-detail-inner > *:last-child {
        margin-bottom: var(--space-000);
      }
    </style>

    <div class="accordion-summary" tabindex="0" role="button" aria-expanded="false">
      <mui-icon-right-chevron size="x-small"></mui-icon-right-chevron>
      <mui-heading size="6" level="${headingLevel}">${headingText}</mui-heading>
    </div>

    <div class="accordion-detail">
      <div class="accordion-detail-inner" inert>
        <slot name="detail">Insert Content</slot>
      </div>
    </div>
    `;

    this.shadowRoot.innerHTML = html;

    this.summaryEl = this.shadowRoot.querySelector(".accordion-summary");
    this.detailEl = this.shadowRoot.querySelector(".accordion-detail");
    this.chevronEl = this.shadowRoot.querySelector("mui-icon-right-chevron");
    this.detailSlotEl = this.shadowRoot.querySelector('slot[name="detail"]');

    this.bindEvents();

    if (wasOpen && this.detailEl && this.chevronEl && this.summaryEl) {
      this.detailEl.setAttribute("open", "");
      this.chevronEl.setAttribute("open", "");
      this.summaryEl.setAttribute("aria-expanded", "true");
      const inner = this.detailEl.querySelector(".accordion-detail-inner");
      inner?.removeAttribute("inert");
      this.detailEl.style.maxHeight = this.detailEl.scrollHeight + "px";
    }
  }

  toggleAccordion() {
    if (!this.detailEl || !this.chevronEl || !this.summaryEl) return;

    const isOpen = this.detailEl.hasAttribute("open");
    this.detailEl.toggleAttribute("open");
    this.chevronEl.toggleAttribute("open");
    this.summaryEl.setAttribute("aria-expanded", String(!isOpen));

    const inner = this.detailEl.querySelector(".accordion-detail-inner");
    if (inner) {
      if (isOpen) {
        inner.setAttribute("inert", "");
        this.detailEl.style.maxHeight = "0";
      } else {
        inner.removeAttribute("inert");
        const scrollHeight = this.detailEl.scrollHeight;
        this.detailEl.style.maxHeight = scrollHeight + "px";
      }
    }
  }
}

if (!customElements.get("mui-accordion-inline")) {
  customElements.define("mui-accordion-inline", MuiAccordionInline);
}
