class MuiCardFooter extends HTMLElement {
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
          width: 100%;
          box-sizing: border-box;
        }

        :host(.inner-space) {
          padding: var(--space-400) var(--space-500);
        }

        @media (min-width: 768px) {
          :host(.inner-space) {
            padding: var(--space-500) var(--space-600);
          }
        }

        :host(.hidden) {
          display: none;
        }

        ::slotted(mui-code) {
          border-bottom-right-radius: calc(var(--card-radius) - 1px);
          border-bottom-left-radius: calc(var(--card-radius) - 1px);
        }

        :host(.has-button-group) {
          padding-top: 0;
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

      const visibleNodes = nodes.filter((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) return true;
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "") return true;
        return false;
      });

      if (visibleNodes.length === 0) {
        this.classList.add("hidden");
        return;
      }

      let hasCode = false;
      let hasButtonGroup = false;
      visibleNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          const tag = element.tagName.toLowerCase();

          if (tag === "mui-code" || element.querySelector?.("mui-code")) {
            hasCode = true;
          }

          if (tag === "mui-button-group" || element.querySelector?.("mui-button-group")) {
            hasButtonGroup = true;
          }
        }
      });

      if (!hasCode) {
        this.classList.add("inner-space");
      }

      if (hasButtonGroup) {
        this.classList.add("has-button-group");
      }
    });
  }
}

if (!customElements.get("mui-card-footer")) {
  customElements.define("mui-card-footer", MuiCardFooter);
}
