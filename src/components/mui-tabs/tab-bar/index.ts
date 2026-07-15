class MuiTabBar extends HTMLElement {
  private _resizeTimeout: number | null;
  private _activeTab: HTMLElement | null;
  private _observedTab: HTMLElement | null;
  private _hasInitialized: boolean;
  private _animationSpeed: number = 200;
  private _resizeObserver: ResizeObserver;
  private _slot: HTMLSlotElement | null = null;
  static get observedAttributes() {
    return ["size", "variant", "stroke", "radius"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._handleResize = this._handleResize.bind(this);
    this._hasInitialized = false;
    this._resizeTimeout = null;
    this._observedTab = null;
    this._activeTab = null;

    // Use a more performant approach with transform instead of left/width adjustments
    this._resizeObserver = new ResizeObserver(() => {
      if (this._activeTab) {
        this._updateHighlight(this._activeTab);
      }
    });
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if ((name === "size" || name === "variant" || name === "stroke") && oldValue !== newValue) {
      this._applySizeToChildren();
      this._applyVariantToChildren();
      if (this._activeTab) this._updateHighlight(this._activeTab);
    }

    if (name === "radius" && oldValue !== newValue) {
      this._syncRadiusAttribute();
    }
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this._syncRadiusAttribute();

    const animationSpeed = this.getAttribute("speed") || "200";
    this._animationSpeed = parseInt(animationSpeed, 10);

    const children = Array.from(this.children);
    this._applySizeToChildren(children as HTMLElement[]);
    this._applyVariantToChildren(children as HTMLElement[]);

    this.setAttribute("role", "tablist");

    const orientation = this.getAttribute("orientation") || "horizontal";
    this.setAttribute("aria-orientation", orientation);

    this.addEventListener("keydown", (e: KeyboardEvent) => {
      const children = Array.from(this.children);
      const activeIndex = children.findIndex((el) => el.hasAttribute("active"));
      const orientation = this.getAttribute("aria-orientation") || "horizontal";

      let nextIndex = activeIndex;

      switch (e.key) {
        case "ArrowRight":
          if (orientation === "horizontal") {
            nextIndex = (activeIndex + 1) % children.length;
            e.preventDefault();
          }
          break;

        case "ArrowLeft":
          if (orientation === "horizontal") {
            nextIndex = (activeIndex - 1 + children.length) % children.length;
            e.preventDefault();
          }
          break;

        case "ArrowDown":
          if (orientation === "vertical") {
            nextIndex = (activeIndex + 1) % children.length;
            e.preventDefault();
          }
          break;

        case "ArrowUp":
          if (orientation === "vertical") {
            nextIndex = (activeIndex - 1 + children.length) % children.length;
            e.preventDefault();
          }
          break;

        case "Home":
          nextIndex = 0;
          e.preventDefault();
          break;

        case "End":
          nextIndex = children.length - 1;
          e.preventDefault();
          break;

        default:
          return;
      }

      const nextTab = children[nextIndex] as HTMLElement;
      if (nextTab) {
        this.setActiveTab(nextTab);
        nextTab.focus();
      }
    });

    this._applyChildPositions(children as HTMLElement[]);

    this.addEventListener("click", (e: Event) => {
      const path = typeof (e as Event).composedPath === "function" ? (e as Event).composedPath() : [];
      const tabFromPath = path.find(
        (entry) => entry instanceof HTMLElement && entry.tagName.toLowerCase() === "mui-tab-item"
      ) as HTMLElement | undefined;
      const tabFromTarget = e.target instanceof HTMLElement ? e.target.closest("mui-tab-item") : null;
      const tab = tabFromPath || tabFromTarget;
      if (!tab || !this.contains(tab)) return;
      this.setActiveTab(tab as HTMLElement);
    });

    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          --tab-animation-speed: ${this._animationSpeed}ms;
          --tab-stroke-size: var(--stroke-size-100);
          --tab-item-size-x-small: calc(var(--action-size-x-small) - (var(--tab-stroke-size) * 2));
          --tab-item-size-small: calc(var(--action-size-small) - (var(--tab-stroke-size) * 2));
          --tab-item-size-medium: calc(var(--action-size-medium) - (var(--tab-stroke-size) * 2));
          --tab-item-size-large: calc(var(--action-size-large) - (var(--tab-stroke-size) * 2));
          --tab-active-shadow: var(--tab-shadow-active);
          --tab-active-inset-width: var(--stroke-size-300);
          position: relative;
          display: inline-flex;
          border-width: var(--tab-stroke-size);
          border-style: var(--stroke-solid);
          border-color: var(--tab-border-color);
          border-radius: var(--tab-radius);
          background: var(--tab-background);
          box-sizing: border-box;
          overflow: hidden;
        }

        :host([active-inset]) {
          --tab-active-shadow: none;
        }

        :host(:not([usage="surface"]):not([active-inset])) {
          --tab-border-color: var(--tab-border-color-surface);
        }

        :host([usage="surface"]) {
          --tab-border-color: var(--tab-border-color-surface);
          --tab-background: var(--tab-background-surface);
          --tab-background-active: var(--tab-background-active-surface);
        }

        :host([usage="surface"][active-inset]) {
          --tab-border-color: var(--tab-border-color-active-inset);
        }

        :host([stroke="none"]) {
          --tab-stroke-size: 0px;
          --tab-item-size-x-small: var(--action-size-x-small);
          --tab-item-size-small: var(--action-size-small);
          --tab-item-size-medium: var(--action-size-medium);
          --tab-item-size-large: var(--action-size-large);
          border: none;
          overflow: visible;
        }

        :host([full-width]) {
          display: flex;
          width: 100%;
        }

        :host([variant="dots"]) {
          --tab-stroke-size: 0px;
          --tab-item-size-x-small: var(--action-size-x-small);
          --tab-item-size-small: var(--action-size-small);
          --tab-item-size-medium: var(--action-size-medium);
          --tab-item-size-large: var(--action-size-large);
          border: none;
          border-radius: var(--radius-000);
          background: transparent;
          gap: var(--tab-dot-gap);
          overflow: visible;
          align-items: center;
        }

        :host([variant="ghost"]) {
          --tab-stroke-size: 0px;
          --tab-item-size-x-small: var(--action-size-x-small);
          --tab-item-size-small: var(--action-size-small);
          --tab-item-size-medium: var(--action-size-medium);
          --tab-item-size-large: var(--action-size-large);
          border: none;
          background: transparent;
          box-shadow: var(--tabs-ghost-box-shadow);
        }

        :host([variant="ghost"]) .highlight {
          box-shadow: none;
        }

        :host([variant="dots"][full-width]) {
          justify-content: center;
        }

        .highlight {
          border-radius: calc(var(--tab-radius) - 0.2rem);
          position: absolute;
          top: 0;
          bottom: 0;
          background: var(--tab-background-active);
          transition: transform var(--tab-animation-speed) cubic-bezier(0.25, 1, 0.5, 1), width var(--tab-animation-speed) cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 0;
          padding: var(--space-200) var(--space-400);
          box-sizing: border-box;
          box-shadow: var(--tab-active-shadow);
          transform: translateX(0);
          width: 0;
        }

        .highlight::after {
          content: none;
        }

        :host([active-inset]) .highlight {
          background: var(--tab-background);
          box-shadow: none;
        }

        :host([active-inset]) .highlight::after {
          content: "";
          position: absolute;
          inset: var(--tab-active-inset-width);
          border-radius: calc(var(--tab-radius) - var(--tab-active-inset-width));
          background: var(--tab-background-active);
          box-shadow: var(--tab-active-shadow);
        }

        :host([variant="dots"]) .highlight {
          display: none;
        }

        ::slotted(mui-tab-item) {
          position: relative;
          z-index: 1;
          flex: 1;
        }

        :host([variant="dots"]) ::slotted(mui-tab-item) {
          flex: 0;
        }
      </style>
      <div class="highlight"></div>
      <slot></slot>
    `;

    this._slot = this.shadowRoot.querySelector("slot");
    this._slot?.addEventListener("slotchange", this._handleSlotChange);

    // Attach resize handler
    window.addEventListener("resize", this._handleResize);

    // Start observing the component itself for resize events
    this._resizeObserver.observe(this);

    // Initial highlight positioning with requestAnimationFrame for smoother initialization
    requestAnimationFrame(() => {
      const highlight = this.shadowRoot!.querySelector(".highlight") as HTMLElement;
      highlight.style.transition = "none";

      // Find the active tab or use the first tab
      const active =
        (children.find((el) => el.hasAttribute("active")) as HTMLElement | undefined) || (children[0] as HTMLElement);

      if (active) {
        this._activeTab = active;
        active.setAttribute("active", "");
        this._updateHighlight(active);

        // Start observing this tab
        this._observedTab = active;
        this._resizeObserver.observe(active);
      }

      // Force a repaint before enabling transitions
      void highlight.offsetWidth;

      requestAnimationFrame(() => {
        highlight.style.transition = "";
        this._hasInitialized = true;
      });
    });
  }

  private _applySizeToChildren(childrenParam?: HTMLElement[]) {
    const size = this.getAttribute("size") || "medium";
    const children = childrenParam || (Array.from(this.children) as HTMLElement[]);
    children.forEach((child) => {
      if (child.tagName.toLowerCase() === "mui-tab-item") {
        child.setAttribute("size", size);
      }
    });
  }

  private _applyVariantToChildren(childrenParam?: HTMLElement[]) {
    const variant = this.getAttribute("variant") || "default";
    const children = childrenParam || (Array.from(this.children) as HTMLElement[]);
    children.forEach((child) => {
      if (child.tagName.toLowerCase() === "mui-tab-item") {
        child.setAttribute("variant", variant);
      }
    });
  }

  private _applyChildPositions(children: HTMLElement[]) {
    children.forEach((child, index) => {
      child.classList.remove("first", "middle", "last", "only");

      if (children.length === 1) child.classList.add("only");
      else if (index === 0) child.classList.add("first");
      else if (index === children.length - 1) child.classList.add("last");
      else child.classList.add("middle");
    });
  }

  private _handleSlotChange = () => {
    const children = Array.from(this.children) as HTMLElement[];
    this._applySizeToChildren(children);
    this._applyVariantToChildren(children);
    this._applyChildPositions(children);

    const active = children.find((child) => child.hasAttribute("active")) || children[0] || null;
    if (!active) {
      this._activeTab = null;
      this._observedTab = null;
      const highlight = this.shadowRoot?.querySelector<HTMLElement>(".highlight");
      if (highlight) highlight.style.width = "0";
      return;
    }

    children.forEach((child) => child.toggleAttribute("active", child === active));
    if (this._observedTab && this._observedTab !== active) this._resizeObserver.unobserve(this._observedTab);
    this._activeTab = active;
    this._observedTab = active;
    this._resizeObserver.observe(active);

    requestAnimationFrame(() => {
      if (this.isConnected && this._activeTab === active) this._updateHighlight(active);
    });
  };

  private _syncRadiusAttribute() {
    const raw = this.getAttribute("radius")?.trim();

    if (!raw) {
      this.style.removeProperty("--tab-radius");
      return;
    }

    const tokenValue = raw.startsWith("radius-") ? raw.replace("radius-", "") : raw;
    const isRadiusToken = /^(000|100|150|200|300|400|500|600)$/.test(tokenValue);
    this.style.setProperty("--tab-radius", isRadiusToken ? `var(--radius-${tokenValue})` : raw);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this._handleResize);
    this._slot?.removeEventListener("slotchange", this._handleSlotChange);
    this._slot = null;

    // Clean up all ResizeObserver observations
    if (this._observedTab) {
      this._resizeObserver.unobserve(this._observedTab);
    }

    // Stop observing the component itself
    this._resizeObserver.unobserve(this);

    // Clean up any pending timeouts
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }

    // Disconnect the observer completely
    this._resizeObserver.disconnect();
  }

  _handleResize() {
    if (!this._activeTab) return;

    // Cancel any previous resize timeouts
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }

    // Ensure the active tab maintains its active state
    if (this._activeTab) {
      Array.from(this.children).forEach((child) => {
        if (child === this._activeTab) {
          child.setAttribute("active", "");
        } else {
          child.removeAttribute("active");
        }
      });
    }
    const highlight = this.shadowRoot!.querySelector(".highlight") as HTMLElement;
    if (!highlight) return;

    // Temporarily pause transitions during resize for better performance
    highlight.style.transition = "none";

    // Update immediately with current position for smoother experience
    this._updateHighlight(this._activeTab);

    // Force reflow
    void highlight.offsetWidth;

    this._resizeTimeout = window.setTimeout(() => {
      highlight.style.transition = "";
      this._updateHighlight(this._activeTab!);
    }, 100);
  }

  private _updateHighlight(el: HTMLElement): void {
    if (this.getAttribute("variant") === "dots") return;
    const highlight = this.shadowRoot!.querySelector(".highlight") as HTMLElement;
    const elRect = el.getBoundingClientRect();
    const barRect = this.getBoundingClientRect();
    const borderWidth = parseFloat(getComputedStyle(this).borderWidth) || 0;
    const leftPosition = elRect.left - barRect.left - borderWidth;
    highlight.style.transform = `translateX(${leftPosition}px)`;
    highlight.style.width = `${elRect.width}px`;
  }

  setActiveTab(el: HTMLElement) {
    const children = Array.from(this.children) as HTMLElement[];
    children.forEach((child) => child.removeAttribute("active"));
    el.setAttribute("active", "");
    this._activeTab = el;

    // Stop observing the previous tab
    if (this._observedTab && this._observedTab !== el) {
      this._resizeObserver.unobserve(this._observedTab);
    }

    // Observe the new active tab
    this._observedTab = el;
    this._resizeObserver.observe(el);

    // Update highlight with proper transitions
    if (this._hasInitialized) {
      this._updateHighlight(el);
    } else {
      // Handle first initialization
      const highlight = this.shadowRoot!.querySelector(".highlight") as HTMLElement;
      highlight.style.transition = "none";
      this._updateHighlight(el);

      void highlight.offsetWidth; // Force reflow
      highlight.style.transition = "";
      this._hasInitialized = true;
    }

    // Dispatch the tab-change event
    this.dispatchEvent(
      new CustomEvent("tab-change", {
        bubbles: true,
        composed: true,
        detail: { activeId: el.id },
      })
    );
  }
}

if (!customElements.get("mui-tab-bar")) {
  customElements.define("mui-tab-bar", MuiTabBar);
}
