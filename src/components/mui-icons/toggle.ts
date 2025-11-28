class MuiIconToggle extends HTMLElement {
  static get observedAttributes() {
    return ["toggle", "rotate", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.classList.add("mui-icon");

    if (!this.shadowRoot!.innerHTML) this.render();

    // Trigger size logic at first render
    this.attributeChangedCallback("size", null, this.getAttribute("size"));

    const startSlot = this.shadowRoot!.querySelector('slot[name="start"]') as HTMLSlotElement;
    const endSlot = this.shadowRoot!.querySelector('slot[name="end"]') as HTMLSlotElement;

    startSlot.addEventListener("slotchange", () => this.applySize());
    endSlot.addEventListener("slotchange", () => this.applySize());
  }

  attributeChangedCallback(name: string, _oldValue: string | null, _newValue: string | null) {
    if (name === "size") {
      const size = this.getAttribute("size") || "medium";

      const sizeMap: Record<"x-small" | "small" | "medium" | "large", string> = {
        "x-small": "1.6rem",
        small: "2.1rem",
        medium: "2.4rem",
        large: "2.8rem",
      };

      const resolvedSize = sizeMap[size as keyof typeof sizeMap] ?? sizeMap.medium;
      this.style.setProperty("--icon-toggle-size", resolvedSize);

      this.applySize(); // Also apply the size to slotted icons
    }
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
  private applySize() {
    const size = this.getAttribute("size") || "medium";

    const slots = this.shadowRoot!.querySelectorAll("slot");
    slots.forEach((slot) => {
      slot.assignedElements({ flatten: true }).forEach((el) => {
        // Always propagate the toggle's size to slotted elements
        (el as HTMLElement).setAttribute("size", size);
      });
    });
  }

  render() {
    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          position: relative;
          height: var(--icon-toggle-size);
          width: var(--icon-toggle-size);
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

if (!customElements.get("mui-icon-toggle")) {
  customElements.define("mui-icon-toggle", MuiIconToggle);
}
