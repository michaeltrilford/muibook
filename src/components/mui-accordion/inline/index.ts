import "../../mui-icons/right-chevron";
import "../../../components/mui-heading";

class MuiAccordionInline extends HTMLElement {
  private summaryEl!: HTMLElement | null;
  private detailEl!: HTMLElement | null;
  private chevronEl!: HTMLElement | null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!customElements.get("mui-icon-right-chevron")) {
      console.warn(
        "mui-accordion-block requires <mui-icon-right-chevron> to be defined. Please ensure it is imported and registered."
      );
    }

    if (!customElements.get("mui-heading")) {
      console.warn(
        "[mui-accordion-block] Warning: <mui-heading> is not registered. Please import it to ensure proper functionality."
      );
    }

    if (!this.shadowRoot) return;
    const headingText = this.getAttribute("heading") || "Heading...";
    const headingLevel = this.getAttribute("level") || "3";

    let html = /*html*/ `
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
        max-height: 200vh;
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

    this.summaryEl?.addEventListener("click", this.toggleAccordion.bind(this));
    this.summaryEl?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleAccordion();
      }
    });
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
      } else {
        inner.removeAttribute("inert");
      }
    }
  }
}

customElements.define("mui-accordion-inline", MuiAccordionInline);
