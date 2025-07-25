class MuiCardBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
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
      </style>
      <slot></slot>
    `;

    this.shadowRoot.innerHTML = html;

    requestAnimationFrame(() => {
      if (!this.shadowRoot) return;
      const slot = this.shadowRoot.querySelector("slot") as HTMLSlotElement | null;
      if (!slot) return;
      const nodes = slot.assignedNodes({ flatten: true });

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
              }
              // Slats do not count as layout components
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
        }
      });

      if (!hasLayoutComponent && !this.hasAttribute("condensed")) {
        this.classList.add("inner-space");
      }
    });
  }
}

if (!customElements.get("mui-card-body")) {
  customElements.define("mui-card-body", MuiCardBody);
}
