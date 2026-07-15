import { applySurfaceUsage } from "../../../utils/surface-usage";

class MuiCardBody extends HTMLElement {
  static get observedAttributes() {
    return ["size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string | null, _newValue: string | null): void {
    if (name === "size") {
      this.updateSlottedContent();
    }
  }

  updateSlottedContent(): void {
    requestAnimationFrame(() => {
      if (!this.shadowRoot) return;
      const slot = this.shadowRoot.querySelector("slot") as HTMLSlotElement | null;
      if (!slot) return;
      const nodes = slot.assignedNodes({ flatten: true });

      // CLEAR ALL ATTRIBUTES FIRST
      this.removeAttribute("inner-space");
      this.removeAttribute("has-card-slat-group");
      this.removeAttribute("has-accordion-slat-group");

      let hasLayoutComponent = false;
      const sizeNoneSlats: HTMLElement[] = [];

      applySurfaceUsage(this);

      nodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          // Check for <mui-accordion-group>
          const isAccordion = element.tagName.toLowerCase() === "mui-accordion-group";
          const accordion = isAccordion ? element : element.querySelector("mui-accordion-group");

          if (accordion instanceof HTMLElement) {
            const blocks = accordion.querySelectorAll("mui-accordion-block");
            blocks.forEach((block: Element) => {
              (block as HTMLElement).setAttribute("card-slot", "");
            });

            hasLayoutComponent = true;
          }

          // Check for all <mui-slat> and <mui-file-diff> elements
          const slats = Array.from(element.querySelectorAll("mui-slat, mui-file-diff"));
          if (element.tagName.toLowerCase() === "mui-slat" || element.tagName.toLowerCase() === "mui-file-diff") {
            slats.unshift(element);
          }

          slats.forEach((slat) => {
            const variant = slat.getAttribute("variant") || "action"; // default for file-diff is action
            if (variant === "action" || variant === "row") {
              slat.setAttribute("card-slot", "");
              slat.removeAttribute("card-body-size-none-slot-first");
              slat.removeAttribute("card-body-size-none-slot-last");
              if (this.getAttribute("size") === "none") {
                slat.setAttribute("card-body-size-none-slot", "");
                sizeNoneSlats.push(slat as HTMLElement);
              } else {
                slat.removeAttribute("card-body-size-none-slot");
              }
            }
          });

          // Check for <mui-table>
          const isTable = element.tagName.toLowerCase() === "mui-table";
          const table = isTable ? element : element.querySelector("mui-table");

          if (table instanceof HTMLElement) {
            table.setAttribute("card-slot", "");

            const cells = table.querySelectorAll("mui-cell");
            cells.forEach((cell: Element) => {
              (cell as HTMLElement).setAttribute("card-slot", "");
            });

            hasLayoutComponent = true;
          }

          // Check for <mui-avatar-group>
          const isAvatarGroup = element.tagName.toLowerCase() === "mui-avatar-group";
          const avatarGroups = isAvatarGroup ? [element] : Array.from(element.querySelectorAll("mui-avatar-group"));

          avatarGroups.forEach((avatarGroup) => {
            (avatarGroup as HTMLElement).setAttribute("card-slot", "");
          });

          // Check for <mui-chip-rail>
          const isChipRail = element.tagName.toLowerCase() === "mui-chip-rail";
          const chipRails = isChipRail ? [element] : Array.from(element.querySelectorAll("mui-chip-rail"));

          chipRails.forEach((chipRail) => {
            (chipRail as HTMLElement).setAttribute("card-slot", "");
          });

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
                this.setAttribute("has-accordion-slat-group", "");
              } else {
                this.setAttribute("inner-space", "");
                this.setAttribute("has-card-slat-group", "");
              }
            });
          }
        }
      });

      if (sizeNoneSlats.length) {
        const allSlats = nodes.flatMap((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return [];
          const element = node as HTMLElement;
          const found = Array.from(element.querySelectorAll("mui-slat, mui-file-diff"));
          if (element.tagName.toLowerCase() === "mui-slat" || element.tagName.toLowerCase() === "mui-file-diff") {
            found.unshift(element);
          }
          return found;
        });

        const firstSlat = allSlats[0] as HTMLElement | undefined;
        const lastSlat = allSlats[allSlats.length - 1] as HTMLElement | undefined;

        if (firstSlat?.hasAttribute("card-body-size-none-slot")) {
          firstSlat.setAttribute("card-body-size-none-slot-first", "");
        }
        if (lastSlat?.hasAttribute("card-body-size-none-slot")) {
          lastSlat.setAttribute("card-body-size-none-slot-last", "");
        }
      }

      if (!hasLayoutComponent && this.getAttribute("size") !== "none") {
        this.setAttribute("inner-space", "");
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

        :host([inner-space]) {
          padding: var(--space-500);
        }
        @media (min-width: 768px) {
          :host([inner-space]) {
            padding: var(--space-600);
          }
        }

        :host([has-card-slat-group]) {
          padding-bottom: var(--space-200);
        }
        @media (min-width: 768px) {
          :host([has-card-slat-group]) {
            padding-bottom: var(--space-500);
          }
        }

        :host([size="none"]),
        :host([size="none"][inner-space]),
        :host([size="none"][has-card-slat-group]),
        :host([size="none"][has-accordion-slat-group]) {
          padding: var(--space-000);
        }

        :host([size="small"]),
        :host([size="small"][inner-space]),
        :host([size="small"][has-card-slat-group]),
        :host([size="small"][has-accordion-slat-group]) {
          padding: var(--space-300);
        }

        :host([size="medium"]),
        :host([size="medium"][inner-space]),
        :host([size="medium"][has-card-slat-group]),
        :host([size="medium"][has-accordion-slat-group]) {
          padding: var(--space-500);
        }

        :host([size="large"]),
        :host([size="large"][inner-space]),
        :host([size="large"][has-card-slat-group]),
        :host([size="large"][has-accordion-slat-group]) {
          padding: var(--space-700);
        }

        @media (min-width: 768px) {
          :host([size="medium"]),
          :host([size="medium"][inner-space]),
          :host([size="medium"][has-card-slat-group]),
          :host([size="medium"][has-accordion-slat-group]) {
            padding: var(--space-600);
          }

          :host([size="large"]),
          :host([size="large"][inner-space]),
          :host([size="large"][has-card-slat-group]),
          :host([size="large"][has-accordion-slat-group]) {
            padding: var(--space-800);
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
