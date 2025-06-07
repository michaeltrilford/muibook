class MuiIconToggle extends HTMLElement {
  static get observedAttributes() {
    return ["variant"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.addEventListener("click", () => {
      this.toggleAttribute("toggle");

      // Blur the button after click to remove persistent focus
      if (!this.shadowRoot) return;
      const button = this.shadowRoot.querySelector("mui-button") as HTMLElement | null;
      if (button) {
        button.blur();
        requestAnimationFrame(() => {
          button.focus({ preventScroll: true });
        });
      }
    });

    this.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.click(); // triggers toggle on Space key press
      }
    });
  }

  connectedCallback() {
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "primary");
    }
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === "variant" && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute("variant") || "primary";
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
        }

        ::slotted(*) {
          position: absolute;
          top: auto;
          left: auto;
          transform-origin: 50% 50%;
          transition: var(--speed-200) ease-in-out;
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

        :host([rotate]) ::slotted([slot="end"]) {
          transform: scale(0) rotate(0deg);
        }

        :host([toggle][rotate]) ::slotted([slot="end"]) {
          transform: scale(1) rotate(-360deg);
        }

      </style>

      <mui-button ${variant ? `variant="${variant}"` : ""}>
        <slot name="start"></slot>
        <slot name="end"></slot>
      </mui-button>
    `;
  }
}

customElements.define("mui-icon-toggle", MuiIconToggle);
