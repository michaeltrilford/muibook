class MuiR extends HTMLElement {
  static get observedAttributes() {
    return ["breakpoint", "breakpoint-low", "breakpoint-high"];
  }

  private slotEl: HTMLSlotElement | null = null;
  private mqlLow: MediaQueryList | null = null;
  private mqlHigh: MediaQueryList | null = null;
  private mqlSingle: MediaQueryList | null = null;
  private cleanup: (() => void) | null = null;

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
    this.setupResponsive();
  }

  disconnectedCallback() {
    this.teardownResponsive();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (!MuiR.observedAttributes.includes(name)) return;
    this.setupResponsive();
  }

  private teardownResponsive() {
    this.cleanup?.();
    this.cleanup = null;
    this.mqlLow = null;
    this.mqlHigh = null;
    this.mqlSingle = null;
  }

  private setupResponsive() {
    const breakpoint = this.getAttribute("breakpoint");
    const low = this.getAttribute("breakpoint-low");
    const high = this.getAttribute("breakpoint-high");

    this.teardownResponsive();
    if (!this.slotEl) return;

    if (low && high) {
      const lowVal = parseInt(low);
      const highVal = parseInt(high);
      if (Number.isNaN(lowVal) || Number.isNaN(highVal)) return;

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
      this.cleanup = () => {
        this.mqlLow?.removeEventListener("change", updateSlotName);
        this.mqlHigh?.removeEventListener("change", updateSlotName);
      };
    } else if (breakpoint) {
      const bpVal = parseInt(breakpoint);
      if (Number.isNaN(bpVal)) return;

      this.mqlSingle = window.matchMedia(`(max-width: ${bpVal}px)`);

      const updateSlotName = () => {
        this.slotEl!.setAttribute("name", this.mqlSingle!.matches ? "showBelow" : "showAbove");
      };

      updateSlotName();

      this.mqlSingle.addEventListener("change", updateSlotName);
      this.cleanup = () => {
        this.mqlSingle?.removeEventListener("change", updateSlotName);
      };
    } else {
      this.slotEl.removeAttribute("name");
    }
  }
}

if (!customElements.get("mui-responsive")) {
  customElements.define("mui-responsive", MuiR);
}
