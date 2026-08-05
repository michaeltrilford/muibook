export class MuiHeaderBar extends HTMLElement {
  static get observedAttributes(): string[] {
    return ["size", "left-width", "right-width", "bottom-border", "surface", "resize-rail", "resize-min-column-width", "resize-min-main-width"];
  }

  get size(): string {
    return this.getAttribute("size") || "medium";
  }
  set size(val: string) {
    this.setAttribute("size", val);
  }

  get leftWidth(): string {
    return this.getAttribute("left-width") || "280px";
  }
  set leftWidth(val: string) {
    this.setAttribute("left-width", val);
  }

  get rightWidth(): string {
    return this.getAttribute("right-width") || "auto";
  }
  set rightWidth(val: string) {
    this.setAttribute("right-width", val);
  }

  get bottomBorder(): boolean {
    return this.getAttribute("bottom-border") !== "false";
  }
  set bottomBorder(val: boolean) {
    if (val) {
      this.removeAttribute("bottom-border");
    } else {
      this.setAttribute("bottom-border", "false");
    }
  }

  get surface(): string {
    return this.getAttribute("surface") || "default";
  }
  set surface(val: string) {
    this.setAttribute("surface", val);
  }

  get resizeRail(): boolean {
    return this.hasAttribute("resize-rail");
  }
  set resizeRail(val: boolean) {
    this.toggleAttribute("resize-rail", val);
  }

  private leftSlotEl: HTMLSlotElement | null = null;
  private rightSlotEl: HTMLSlotElement | null = null;
  private contextObserver: MutationObserver | null = null;
  private resizeState: { side: "left" | "right"; startX: number; startWidth: number } | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    if (!this.shadowRoot) return;
    this.render();
    this.setupSlots();
    this.syncAllState();
    this.contextObserver = new MutationObserver(() => this.syncDescendantContexts());
    this.contextObserver.observe(this, { childList: true, subtree: true });
    Promise.all([customElements.whenDefined("mui-dropdown"), customElements.whenDefined("mui-button")]).then(() => {
      if (this.isConnected) this.syncDescendantContexts();
    });
  }

  disconnectedCallback(): void {
    window.removeEventListener("pointermove", this.handleResizeMove);
    window.removeEventListener("pointerup", this.handleResizeEnd);
    this.contextObserver?.disconnect();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return;
    this.syncAllState();
  }

  private render(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
          container-type: inline-size;
          --header-bar-current-height: var(--header-min-height-medium);
        }

        :host([size="x-small"]) { --header-bar-current-height: var(--header-min-height-x-small); }
        :host([size="small"]) { --header-bar-current-height: var(--header-min-height-small); }
        :host([size="medium"]) { --header-bar-current-height: var(--header-min-height-medium); }
        :host([size="large"]) { --header-bar-current-height: var(--header-min-height-large); }

        .header-bar {
          display: grid;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          min-height: var(--header-min-height-medium);
          background: var(--header-bar-background, var(--surface-elevated-100));
        }

        /* Bottom border default: true unless explicitly false */
        :host(:not([bottom-border="false"])) .header-bar {
          border-bottom: var(--border-thin);
        }

        :host([bottom-border="false"]) .header-bar {
          border-bottom: none;
        }

        /* Surface variants: default (var(--surface-elevated-100)) or transparent */
        :host([surface="transparent"]) .header-bar {
          background: transparent;
        }

        /* Size scale */
        :host([size="x-small"]) .header-bar {
          min-height: var(--header-min-height-x-small);
        }

        :host([size="small"]) .header-bar {
          min-height: var(--header-min-height-small);
        }

        :host([size="medium"]) .header-bar {
          min-height: var(--header-min-height-medium);
        }

        :host([size="large"]) .header-bar {
          min-height: var(--header-min-height-large);
        }

        .column {
          display: flex;
          align-items: center;
          height: 100%;
          box-sizing: border-box;
        }

        .column-left {
          border-right: var(--border-thin);
        }

        :host([has-left]) .column-left {
          display: flex;
          animation: header-bar-column-enter var(--speed-300) ease both;
        }

        :host(:not([has-left])) .column-left {
          display: none;
        }

        .column-main {
        }

        .column-right {
          border-left: var(--border-thin);
        }

        :host([resize-rail]) .column-left {
          border-right: none;
        }

        :host([resize-rail]) .column-right {
          border-left: none;
        }

        :host([has-right]) .column-right {
          display: flex;
          animation: header-bar-column-enter var(--speed-300) ease both;
        }

        :host(:not([has-right])) .column-right {
          display: none;
        }

        .resize-rail {
          position: relative;
          z-index: 1;
          display: none;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          background: var(--drawer-resize-rail-background, transparent);
          cursor: col-resize;
          appearance: none;
          touch-action: none;
        }

        .resize-rail::before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: var(--stroke-size-200);
          background: var(--drawer-resize-rail-inner-background);
          content: "";
          transform: translateX(-50%);
          transition: width var(--speed-100) ease, background var(--speed-100) ease;
        }

        .resize-rail:hover::before,
        .resize-rail:focus-visible::before,
        .resize-rail.is-resizing::before {
          width: var(--stroke-size-300);
          background: var(--outline-color);
        }

        :host([resize-rail][has-left]) .resize-rail-left,
        :host([resize-rail][has-right]) .resize-rail-right {
          display: block;
          animation: header-bar-column-enter var(--speed-300) ease both;
        }

        @keyframes header-bar-column-enter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>
      <header class="header-bar">
        <div class="column column-left">
          <slot name="left"></slot>
        </div>
        <button class="resize-rail resize-rail-left" part="resize-rail" type="button" aria-label="Resize left header column" data-resize-side="left"></button>
        <div class="column column-main">
          <slot></slot>
        </div>
        <button class="resize-rail resize-rail-right" part="resize-rail" type="button" aria-label="Resize right header column" data-resize-side="right"></button>
        <div class="column column-right">
          <slot name="right"></slot>
        </div>
      </header>
    `;
  }

  private setupSlots(): void {
    if (!this.shadowRoot) return;

    this.leftSlotEl = this.shadowRoot.querySelector('slot[name="left"]');
    this.rightSlotEl = this.shadowRoot.querySelector('slot[name="right"]');
    this.shadowRoot.querySelectorAll<HTMLElement>("[data-resize-side]").forEach((rail) => {
      rail.addEventListener("pointerdown", this.handleResizeStart);
      rail.addEventListener("keydown", this.handleResizeKeydown);
    });

    const updateSlotState = () => {
      const hasLeft = (this.leftSlotEl?.assignedNodes().length ?? 0) > 0;
      const hasRight = (this.rightSlotEl?.assignedNodes().length ?? 0) > 0;

      if (hasLeft) {
        this.setAttribute("has-left", "");
      } else {
        this.removeAttribute("has-left");
      }

      if (hasRight) {
        this.setAttribute("has-right", "");
      } else {
        this.removeAttribute("has-right");
      }

      this.syncGridColumns();
    };

    this.leftSlotEl?.addEventListener("slotchange", updateSlotState);
    this.rightSlotEl?.addEventListener("slotchange", updateSlotState);

    updateSlotState();
  }

  private syncAllState(): void {
    this.syncGridColumns();
    this.syncDescendantContexts();
  }

  private syncDescendantContexts(): void {
    const size = this.size;
    this.querySelectorAll<HTMLElement>("mui-dropdown").forEach((dropdown) => {
      dropdown.setAttribute("usage", "header-bar");
      (dropdown as HTMLElement & { applyHeaderBarContext?: (size: string) => void }).applyHeaderBarContext?.(size);
    });
    this.querySelectorAll<HTMLElement>("mui-button").forEach((button) => {
      if (button.closest("mui-dropdown")) return;
      button.setAttribute("usage", "header-bar");
      (button as HTMLElement & { applyHeaderBarContext?: (size: string) => void }).applyHeaderBarContext?.(size);
    });
  }

  private getMinimumColumnWidth(): number {
    const value = Number(this.getAttribute("resize-min-column-width"));
    return Number.isFinite(value) && value > 0 ? value : 240;
  }

  private getMinimumMainWidth(): number {
    const value = Number(this.getAttribute("resize-min-main-width"));
    return Number.isFinite(value) && value > 0 ? value : 320;
  }

  private getColumnWidth(side: "left" | "right"): number {
    const column = this.shadowRoot?.querySelector<HTMLElement>(`.column-${side}`);
    return column?.getBoundingClientRect().width || 0;
  }

  private getMaximumColumnWidth(side: "left" | "right"): number {
    const otherSide = side === "left" ? "right" : "left";
    const otherWidth = this.hasAttribute(`has-${otherSide}`) ? this.getColumnWidth(otherSide) : 0;
    const railWidth = Array.from(this.shadowRoot?.querySelectorAll<HTMLElement>(".resize-rail") || []).reduce(
      (total, rail) => total + rail.getBoundingClientRect().width,
      0,
    );
    return Math.max(
      this.getMinimumColumnWidth(),
      this.getBoundingClientRect().width - otherWidth - railWidth - this.getMinimumMainWidth(),
    );
  }

  private setResizedColumnWidth(side: "left" | "right", width: number): void {
    const nextWidth = Math.round(Math.max(this.getMinimumColumnWidth(), Math.min(width, this.getMaximumColumnWidth(side))));
    this.setAttribute(`${side}-width`, `${nextWidth}px`);
    this.dispatchEvent(new CustomEvent("mui-header-bar-resize", {
      bubbles: true,
      composed: true,
      detail: { side, width: `${nextWidth}px`, value: nextWidth },
    }));
  }

  private handleResizeStart = (event: PointerEvent): void => {
    if (!this.hasAttribute("resize-rail")) return;
    const rail = event.currentTarget as HTMLElement | null;
    const side = rail?.dataset.resizeSide as "left" | "right" | undefined;
    if (!side) return;
    event.preventDefault();
    this.resizeState = { side, startX: event.clientX, startWidth: this.getColumnWidth(side) };
    rail?.classList.add("is-resizing");
    this.dispatchEvent(new CustomEvent("mui-header-bar-resize-start", {
      bubbles: true,
      composed: true,
      detail: { side, width: `${Math.round(this.resizeState.startWidth)}px`, value: Math.round(this.resizeState.startWidth) },
    }));
    window.addEventListener("pointermove", this.handleResizeMove);
    window.addEventListener("pointerup", this.handleResizeEnd);
  };

  private handleResizeMove = (event: PointerEvent): void => {
    if (!this.resizeState) return;
    const delta = event.clientX - this.resizeState.startX;
    const width = this.resizeState.startWidth + (this.resizeState.side === "left" ? delta : -delta);
    this.setResizedColumnWidth(this.resizeState.side, width);
  };

  private handleResizeEnd = (): void => {
    const state = this.resizeState;
    this.shadowRoot?.querySelectorAll(".resize-rail.is-resizing").forEach((rail) => rail.classList.remove("is-resizing"));
    this.resizeState = null;
    window.removeEventListener("pointermove", this.handleResizeMove);
    window.removeEventListener("pointerup", this.handleResizeEnd);
    if (state) {
      const value = Math.round(this.getColumnWidth(state.side));
      this.dispatchEvent(new CustomEvent("mui-header-bar-resize-end", {
        bubbles: true,
        composed: true,
        detail: { side: state.side, width: `${value}px`, value },
      }));
    }
  };

  private handleResizeKeydown = (event: KeyboardEvent): void => {
    if (!this.hasAttribute("resize-rail") || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    const rail = event.currentTarget as HTMLElement | null;
    const side = rail?.dataset.resizeSide as "left" | "right" | undefined;
    if (!side) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const step = event.shiftKey ? 40 : 8;
    const currentWidth = this.getColumnWidth(side);
    const width = currentWidth + (side === "left" ? direction : -direction) * step;
    this.dispatchEvent(new CustomEvent("mui-header-bar-resize-start", {
      bubbles: true,
      composed: true,
      detail: { side, width: `${Math.round(currentWidth)}px`, value: Math.round(currentWidth) },
    }));
    this.setResizedColumnWidth(side, width);
    const value = Math.round(this.getColumnWidth(side));
    this.dispatchEvent(new CustomEvent("mui-header-bar-resize-end", {
      bubbles: true,
      composed: true,
      detail: { side, width: `${value}px`, value },
    }));
  };

  private syncGridColumns(): void {
    const hasLeft = this.hasAttribute("has-left");
    const hasRight = this.hasAttribute("has-right");
    const leftWidth = this.getAttribute("left-width")?.trim() || "280px";
    const rightWidth = this.getAttribute("right-width")?.trim() || "auto";
    const resizeRail = this.hasAttribute("resize-rail");
    const railWidth = "var(--drawer-resize-rail-size, var(--stroke-size-500))";

    let colTracks = "minmax(0, 1fr)";
    if (hasLeft && hasRight) {
      colTracks = resizeRail
        ? `${leftWidth} ${railWidth} minmax(0, 1fr) ${railWidth} ${rightWidth}`
        : `${leftWidth} minmax(0, 1fr) ${rightWidth}`;
    } else if (hasLeft) {
      colTracks = resizeRail ? `${leftWidth} ${railWidth} minmax(0, 1fr)` : `${leftWidth} minmax(0, 1fr)`;
    } else if (hasRight) {
      colTracks = resizeRail ? `minmax(0, 1fr) ${railWidth} ${rightWidth}` : `minmax(0, 1fr) ${rightWidth}`;
    }

    const header = this.shadowRoot?.querySelector(".header-bar") as HTMLElement;
    if (header) {
      header.style.gridTemplateColumns = colTracks;
    }
  }
}

if (!customElements.get("mui-header-bar")) {
  customElements.define("mui-header-bar", MuiHeaderBar);
}
