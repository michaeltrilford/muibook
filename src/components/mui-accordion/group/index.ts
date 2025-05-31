interface AccordionBlockElement extends HTMLElement {
  closeAccordion: () => void;
}

class muiAccordionGroup extends HTMLElement {
  private accordions: AccordionBlockElement[];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.accordions = [];
  }

  connectedCallback() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `<slot></slot>`;

    requestAnimationFrame(() => {
      if (!this.shadowRoot) return;
      const slot = this.shadowRoot.querySelector("slot");
      if (!slot) return;
      const assignedElements = slot.assignedElements({ flatten: true });

      this.accordions = assignedElements.filter(
        (el): el is AccordionBlockElement =>
          el.tagName === "MUI-ACCORDION-BLOCK" &&
          typeof (el as any).closeAccordion === "function"
      );

      // Clear existing attributes
      this.accordions.forEach((el) => {
        el.removeAttribute("first-child");
        el.removeAttribute("last-child");
      });

      // Add attributes to the first and last accordion blocks
      if (this.accordions.length > 0) {
        this.accordions[0].setAttribute("first-child", "");
        this.accordions[this.accordions.length - 1].setAttribute(
          "last-child",
          ""
        );
      }

      // Handle exclusive opening
      this.accordions.forEach((accordion) => {
        accordion.addEventListener("accordion-opened", () => {
          if (this.hasAttribute("exclusive")) {
            this.accordions.forEach((other) => {
              if (other !== accordion) {
                other.closeAccordion();
              }
            });
          }
        });
      });
    });
  }
}

customElements.define("mui-accordion-group", muiAccordionGroup);
