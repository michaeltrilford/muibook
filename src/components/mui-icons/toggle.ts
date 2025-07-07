class MuiIconToggle extends HTMLElement {
  static get observedAttributes() {
    return ["toggle", "rotate"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.classList.add("mui-icon");

    if (!this.shadowRoot!.innerHTML) this.render();

    // Set size="small" on current children
    this.applySmallSize();

    // Also react to future slot changes
    const startSlot = this.shadowRoot!.querySelector('slot[name="start"]') as HTMLSlotElement;
    const endSlot = this.shadowRoot!.querySelector('slot[name="end"]') as HTMLSlotElement;

    startSlot.addEventListener("slotchange", () => this.applySmallSize());
    endSlot.addEventListener("slotchange", () => this.applySmallSize());
  }

  attributeChangedCallback() {
    // No re-render needed, attributes drive styling via CSS
  }

  get toggle() {
    return this.hasAttribute("toggle");
  }
  set toggle(val: boolean) {
    this.toggleAttribute("toggle", !!val);
  }

  get rotate() {
    return this.hasAttribute("rotate");
  }
  set rotate(val: boolean) {
    this.toggleAttribute("rotate", !!val);
  }

  /* ------------------------------------------------------------------ */
  /* PRIVATE: force size="small" on all assigned elements               */
  /* ------------------------------------------------------------------ */
  private applySmallSize() {
    const slots = this.shadowRoot!.querySelectorAll("slot");
    slots.forEach((slot) => {
      slot.assignedElements({ flatten: true }).forEach((el) => {
        // Always overwrite – user cannot override
        (el as HTMLElement).setAttribute("size", "small");
      });
    });
  }

  render() {
    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          position: relative;
          height: 2.4rem;
          width: 2.4rem;
        }

        ::slotted(*) {
          position: absolute;
          transform-origin: 50% 50%;
          transition: var(--speed-200) ease-in-out;
          fill: currentColor; 
        }

        ::slotted([slot="start"]) {
          transform: scale(1);
        }

        ::slotted([slot="end"]) {
          transform: scale(0);
        }

        :host([toggle]) ::slotted([slot="start"]) {
          transform: scale(0);
        }

        :host([toggle]) ::slotted([slot="end"]) {
          transform: scale(1);
        }

        :host([rotate][toggle]) ::slotted([slot="end"]) {
          transform: scale(1) rotate(-360deg);
        }
      </style>

      <slot name="start"></slot>
      <slot name="end"></slot>
    `;
  }
}

customElements.define("mui-icon-toggle", MuiIconToggle);
