class MuiR extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "observe", "breakpoint", "breakpoint-low", "breakpoint-high"];
  }

  private slotEl: HTMLSlotElement | null = null;
  private legacySlotEl: HTMLSlotElement | null = null;
  private mqlLow: MediaQueryList | null = null;
  private mqlHigh: MediaQueryList | null = null;
  private mqlSingle: MediaQueryList | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private cleanup: (() => void) | null = null;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = `
      <style>${styles}</style>
      <slot><slot data-legacy></slot></slot>
    `;

    this.slotEl = shadowRoot.querySelector("slot:not([data-legacy])");
    this.legacySlotEl = shadowRoot.querySelector("slot[data-legacy]");
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
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  private getSlotName(width: number, low: string | null, high: string | null, breakpoint: string | null): string | null {
    if (low && high) {
      const lowVal = parseInt(low);
      const highVal = parseInt(high);
      if (Number.isNaN(lowVal) || Number.isNaN(highVal)) return null;

      return width <= lowVal ? "show-below" : width >= highVal ? "show-above" : "show-middle";
    }

    if (breakpoint) {
      const bpVal = parseInt(breakpoint);
      if (Number.isNaN(bpVal)) return null;

      return width <= bpVal ? "show-below" : "show-above";
    }

    return null;
  }

  private setSlotName(slotName: string | null) {
    if (!this.slotEl || !this.legacySlotEl) return;

    if (!slotName) {
      this.slotEl.removeAttribute("name");
      this.legacySlotEl.removeAttribute("name");
      return;
    }

    const legacySlotName = slotName.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
    this.slotEl.setAttribute("name", slotName);
    this.legacySlotEl.setAttribute("name", legacySlotName);
  }

  private getObservedElement(): Element {
    const observe = this.getAttribute("observe");
    if (!observe || observe === "self") return this;
    if (observe === "parent") return this.parentElement || this;

    try {
      return this.closest(observe) || this;
    } catch {
      return this;
    }
  }

  private setupResponsive() {
    const variant = this.getAttribute("variant") || "viewport";
    const breakpoint = this.getAttribute("breakpoint");
    const low = this.getAttribute("breakpoint-low");
    const high = this.getAttribute("breakpoint-high");

    this.teardownResponsive();
    if (!this.slotEl) return;

    if (variant === "container") {
      const observedElement = this.getObservedElement();
      const updateSlotName = (width: number) => {
        const slotName = this.getSlotName(width, low, high, breakpoint);
        if (slotName) {
          this.setSlotName(slotName);
        } else {
          this.setSlotName(null);
        }
      };

      updateSlotName(observedElement.getBoundingClientRect().width);

      this.resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        updateSlotName(entry.contentRect.width);
      });
      this.resizeObserver.observe(observedElement);
      return;
    }

    if (low && high) {
      const lowVal = parseInt(low);
      const highVal = parseInt(high);
      if (Number.isNaN(lowVal) || Number.isNaN(highVal)) return;

      this.mqlLow = window.matchMedia(`(max-width: ${lowVal}px)`);
      this.mqlHigh = window.matchMedia(`(min-width: ${highVal}px)`);

      const updateSlotName = () => {
        const isBelow = this.mqlLow!.matches;
        const isAbove = this.mqlHigh!.matches;
        const slotName = isBelow ? "show-below" : isAbove ? "show-above" : "show-middle";

        this.setSlotName(slotName);
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
        this.setSlotName(this.mqlSingle!.matches ? "show-below" : "show-above");
      };

      updateSlotName();

      this.mqlSingle.addEventListener("change", updateSlotName);
      this.cleanup = () => {
        this.mqlSingle?.removeEventListener("change", updateSlotName);
      };
    } else {
      this.setSlotName(null);
    }
  }
}

if (!customElements.get("mui-responsive")) {
  customElements.define("mui-responsive", MuiR);
}
