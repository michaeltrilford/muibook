class MuiR extends HTMLElement {
  static get observedAttributes() {
    return ["breakpoint", "breakpoint-low", "breakpoint-high"];
  }

  private slotEl: HTMLSlotElement | null = null;
  private mqlLow: MediaQueryList | null = null;
  private mqlHigh: MediaQueryList | null = null;
  private mqlSingle: MediaQueryList | null = null;

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
    const low = this.getAttribute("breakpoint-low");
    const high = this.getAttribute("breakpoint-high");

    if (!this.slotEl) return;

    if (low && high) {
      const lowVal = parseInt(low);
      const highVal = parseInt(high);
      this.mqlLow = window.matchMedia(`(max-width: ${lowVal}px)`);
      this.mqlHigh = window.matchMedia(`(min-width: ${highVal}px)`);

      const updateSlotName = () => {
        const isBelow = this.mqlLow!.matches;
        const isAbove = this.mqlHigh!.matches;
        const slotName = isBelow ? "showBelow" : isAbove ? "showAbove" : "showMiddle";

        this.slotEl!.setAttribute("name", slotName);
      };

      updateSlotName();

      this.mqlLow.addEventListener("change", updateSlotName);
      this.mqlHigh.addEventListener("change", updateSlotName);
    } else if (breakpoint) {
      const bpVal = parseInt(breakpoint);
      this.mqlSingle = window.matchMedia(`(max-width: ${bpVal}px)`);

      const updateSlotName = (matches: boolean) => {
        this.slotEl!.setAttribute("name", matches ? "showBelow" : "showAbove");
      };

      updateSlotName(this.mqlSingle.matches);

      this.mqlSingle.addEventListener("change", (e) => {
        updateSlotName(e.matches);
      });
    }
  }
}

if (!customElements.get("mui-responsive")) {
  customElements.define("mui-responsive", MuiR);
}
