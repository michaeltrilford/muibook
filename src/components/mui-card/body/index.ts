class MuiCardBody extends HTMLElement {
  static get observedAttributes() {
    return ["condensed"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string | null, _newValue: string | null): void {
    if (name === "condensed") {
      // Re-run the slotted content logic when condensed changes
      this.updateSlottedContent();
    }
  }

  updateSlottedContent(): void {
    requestAnimationFrame(() => {
      if (!this.shadowRoot) return;
      const slot = this.shadowRoot.querySelector("slot") as HTMLSlotElement | null;
      if (!slot) return;
      const nodes = slot.assignedNodes({ flatten: true });

      // CLEAR ALL CLASSES FIRST
      this.classList.remove("inner-space", "has-card-slat-group", "has-accordion-slat-group");

      let hasLayoutComponent = false;

      nodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          // Check for <mui-accordion-group>
          const isAccordion = element.tagName.toLowerCase() === "mui-accordion-group";
          const accordion = isAccordion ? element : element.querySelector("mui-accordion-group");

          if (accordion instanceof HTMLElement) {
            const blocks = accordion.querySelectorAll("mui-accordion-block");
            blocks.forEach((block: Element) => {
              (block as HTMLElement).classList.add("card-slot");
            });

            hasLayoutComponent = true;
          }

          // Check for all <mui-slat> elements
          const slats =
            element.tagName.toLowerCase() === "mui-slat" ? [element] : Array.from(element.querySelectorAll("mui-slat"));

          slats.forEach((slat) => {
            const variant = slat.getAttribute("variant");
            if (variant === "action" || variant === "row") {
              slat.classList.add("card-slot");
              if (this.hasAttribute("condensed")) {
                slat.classList.add("condensed-slot");
              } else {
                slat.classList.remove("condensed-slot");
              }
            }
          });

          // Check for <mui-table>
          const isTable = element.tagName.toLowerCase() === "mui-table";
          const table = isTable ? element : element.querySelector("mui-table");

          if (table instanceof HTMLElement) {
            const cells = table.querySelectorAll("mui-cell");
            cells.forEach((cell: Element) => {
              (cell as HTMLElement).classList.add("card-slot");
            });

            hasLayoutComponent = true;
          }

          // Check for <mui-slat-group>
          const isSlatGroup = element.tagName.toLowerCase() === "mui-slat-group";
          const slatGroups = isSlatGroup ? [element] : Array.from(element.querySelectorAll("mui-slat-group"));

          if (slatGroups.length) {
            hasLayoutComponent = true;

            slatGroups.forEach((slatGroup) => {
              // Always set usage to "card"
              slatGroup.setAttribute("usage", "card");

              // Detect if inside an accordion block
              const insideAccordion = slatGroup.closest("mui-accordion-block");

              if (insideAccordion) {
                this.classList.add("has-accordion-slat-group");
              } else {
                this.classList.add("inner-space", "has-card-slat-group");
              }
            });
          }
        }
      });

      if (!hasLayoutComponent && !this.hasAttribute("condensed")) {
        this.classList.add("inner-space");
      }
    });
  }

  render() {
    if (!this.shadowRoot) return;
    const html = /*html*/ `
      <style>
        :host {
          display: block;
          box-sizing: border-box;
        }
        
        :host(.inner-space) {
          padding: var(--space-500);
        }
        @media (min-width: 768px) {
          :host(.inner-space) {
            padding: var(--space-600);
          }
        }

        :host(.has-card-slat-group) {
          padding-bottom: var(--space-200);
        }
        @media (min-width: 768px) {
        :host(.has-card-slat-group) {
          padding-bottom: var(--space-500);
        }
        }
        
      </style>
      <slot></slot>
    `;

    this.shadowRoot.innerHTML = html;
    this.updateSlottedContent();
  }
}

if (!customElements.get("mui-card-body")) {
  customElements.define("mui-card-body", MuiCardBody);
}
