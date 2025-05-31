class muiR extends HTMLElement {
  static get observedAttributes() {
    return ["breakpoint"];
  }

  private slotEl: HTMLSlotElement | null = null;
  private mql: MediaQueryList | null = null;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = `
      <style>${styles}</style>
      <slot></slot>
    `;

    this.slotEl = shadowRoot.querySelector("slot");
  }

  connectedCallback() {
    const breakpoint = this.getAttribute("breakpoint");
    if (!breakpoint || !this.slotEl) return;

    this.mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const updateSlotName = (matches: boolean) => {
      this.slotEl!.setAttribute("name", matches ? "showBelow" : "showAbove");
    };

    updateSlotName(this.mql.matches);

    this.mql.addEventListener("change", (e) => {
      updateSlotName(e.matches);
    });
  }
}

customElements.define("mui-responsive", muiR);
