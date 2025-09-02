class MuiAccordionCore extends HTMLElement {
  private summaryEl!: HTMLElement | null;
  private detailEl!: HTMLElement | null;
  private chevronEl!: HTMLElement | null;
  private iconToggleEl!: HTMLElement | null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["open"];
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    // Get slots content from light DOM before rendering shadow DOM
    // so you can check if icon-toggle is present inside summary slot
    const summarySlotEl = this.querySelector('[slot="summary"]');
    const detailSlotEl = this.querySelector('[slot="detail"]');

    if (!summarySlotEl || !detailSlotEl) return;

    this.iconToggleEl = summarySlotEl.querySelector("mui-icon-toggle");

    // Compose styles conditionally based on presence of iconToggle
    const styleContent = `
      :host {
        display: block;
      }
      .accordion-summary {
        cursor: pointer;
        display: flex;
        align-items: center;
        outline-offset: 2px;
        border-radius: inherit;
      }
      .accordion-summary:focus-visible {
        outline: var(--outline-thick);
      }
      .accordion-detail {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
    `;

    this.shadowRoot.innerHTML = /* html */ `
      <style>${styleContent}</style>
      <div class="accordion-summary" tabindex="0" role="button" aria-expanded="false">
        <slot name="summary"></slot>
      </div>
      <div class="accordion-detail" role="region" aria-hidden="true">
        <slot name="detail"></slot>
      </div>
    `;

    this.summaryEl = this.shadowRoot.querySelector(".accordion-summary");
    this.detailEl = this.shadowRoot.querySelector(".accordion-detail");

    this.iconToggleEl = summarySlotEl.querySelector("mui-icon-toggle");

    if (!this.iconToggleEl) {
      const rightChevron = summarySlotEl.querySelector("mui-icon-right-chevron") as HTMLElement | null;
      const downChevron = summarySlotEl.querySelector("mui-icon-down-chevron") as HTMLElement | null;

      if (rightChevron) {
        this.chevronEl = rightChevron;
        rightChevron.setAttribute("data-icon-animation", "accordion-inline");
      } else if (downChevron) {
        this.chevronEl = downChevron;
        downChevron.setAttribute("data-icon-animation", "accordion-block");
      }
    }

    this.summaryEl?.addEventListener("click", () => this.toggleAccordion());
    this.summaryEl?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleAccordion();
      }
    });

    // Ensure initial state reflects the "open" attribute
    if (this.hasAttribute("open")) {
      this.openAccordion();
    }
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "open" && this.detailEl && this.summaryEl) {
      if (newValue !== null) {
        this.openAccordion();
      } else {
        this.closeAccordion();
      }
    }
  }

  toggleAccordion() {
    this.open = !this.open;
  }

  openAccordion() {
    if (!this.detailEl || !this.summaryEl) return;

    const scrollHeight = this.detailEl.scrollHeight;
    this.detailEl.style.maxHeight = scrollHeight + "px";
    this.detailEl.setAttribute("open", "");
    this.detailEl.setAttribute("aria-hidden", "false");
    this.summaryEl.setAttribute("aria-expanded", "true");
    this.chevronEl?.setAttribute("open", "");

    if (this.iconToggleEl) {
      (this.iconToggleEl as any).toggle = true;
      this.iconToggleEl.setAttribute("aria-pressed", "true");
    }
  }

  closeAccordion() {
    if (!this.detailEl || !this.summaryEl) return;

    this.detailEl.style.maxHeight = "0";
    this.detailEl.removeAttribute("open");
    this.detailEl.setAttribute("aria-hidden", "true");
    this.summaryEl.setAttribute("aria-expanded", "false");
    this.chevronEl?.removeAttribute("open");

    if (this.iconToggleEl) {
      (this.iconToggleEl as any).toggle = false;
      this.iconToggleEl.setAttribute("aria-pressed", "false");
    }
  }
}

if (!customElements.get("mui-accordion-core")) {
  customElements.define("mui-accordion-core", MuiAccordionCore);
}
