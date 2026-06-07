import "../mui-icons/close";
import "../mui-icons/left-chevron";
import "../mui-button";

const RESIZE_RAIL_MIN_DRAWER_WIDTH = 240;
const RESIZE_RAIL_MIN_PAGE_WIDTH = 320;
const RESIZE_RAIL_CLOSE_THRESHOLD = 96;

class MuiDrawer extends HTMLElement {
  private innerEl: HTMLElement | null = null;
  private overlayEl: HTMLElement | null = null;
  private footerEl: HTMLElement | null = null;
  private actionsSlot: HTMLSlotElement | null = null;
  private pushLayout: HTMLElement | null = null;
  private outer: HTMLElement | null = null;
  private persistentLayout: HTMLElement | null = null;
  private headerEl: HTMLElement | null = null;
  private headerSlot: HTMLSlotElement | null = null;
  private resizeRailEl: HTMLElement | null = null;
  private resizeState: {
    startX: number;
    startWidth: number;
    currentWidth: number;
    closeOnRelease: boolean;
    side: "left" | "right";
  } | null = null;

  static get observedAttributes() {
    return [
      "open",
      "width",
      "side",
      "variant",
      "z-index",
      "drawer-space",
      "close-size",
      "breakpoint",
      "resize-rail",
      "resize-min-drawer-width",
      "resize-min-page-width",
      "resize-close-threshold",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.cacheEls();
    this.attachEvents();
    this.updateFooterVisibility();
    this.updateHeaderVisibility();
    this.syncOpenState();
    document.addEventListener("keydown", this._handleEscape);

    // 👇 Watch for resize
    window.addEventListener("resize", this._handleResize);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this._handleEscape);
    window.removeEventListener("resize", this._handleResize);
    window.removeEventListener("pointermove", this._handleResizeMove);
    window.removeEventListener("pointerup", this._handleResizeEnd);
  }

  private getBreakpoint(): number {
    const val = this.getAttribute("breakpoint");
    return val ? Number(val) : 768; // default
  }

  private getPositiveNumberAttribute(name: string, fallback: number): number {
    const value = Number(this.getAttribute(name));
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }

  private getResizeRailMinDrawerWidth(): number {
    return this.getPositiveNumberAttribute("resize-min-drawer-width", RESIZE_RAIL_MIN_DRAWER_WIDTH);
  }

  private getResizeRailMinPageWidth(): number {
    return this.getPositiveNumberAttribute("resize-min-page-width", RESIZE_RAIL_MIN_PAGE_WIDTH);
  }

  private getResizeRailCloseThreshold(): number {
    return this.getPositiveNumberAttribute("resize-close-threshold", RESIZE_RAIL_CLOSE_THRESHOLD);
  }

  private getCloseSize(): string {
    const closeSize = this.getAttribute("close-size");
    return closeSize && ["x-small", "small", "medium", "large"].includes(closeSize) ? closeSize : "medium";
  }

  private _handleEscape = (e: KeyboardEvent) => {
    const variant = this.getAttribute("variant") || "overlay";
    if (e.key === "Escape" && (variant === "overlay" || variant === "push")) {
      this.close();
    }
  };

  private getDrawerTemplate(hasCloseButton = true) {
    const noPadding = this.hasAttribute("drawer-space") ? "no-padding" : "";
    const closeSize = this.getCloseSize();

    return /*html*/ `
    <div class="outer">
      <div class="inner" role="complementary">
        <div class="header">
          <slot name="title"></slot>
          ${
            hasCloseButton
              ? `
            <mui-button class="close" variant="tertiary" size="${closeSize}" aria-label="Close drawer">
              <mui-icon-close size="${closeSize}"></mui-icon-close>
            </mui-button>`
              : "<span class='spacer'></span>"
          }
        </div>
        <div class="content ${noPadding}"><slot></slot></div>
        <div class="actions" hidden><slot name="actions"></slot></div>
      </div>
    </div>
  `;
  }

  private _computedSide: "left" | "right" = "left";
  private render() {
    if (!this.shadowRoot) return;

    const width = this.getAttribute("width") || "320px";
    const variant = this.getAttribute("variant") || "overlay";
    const hasResizeRail = (variant === "push" || variant === "persistent") && this.hasAttribute("resize-rail");
    const closeSize = this.getCloseSize();

    // Determine side: attribute takes priority, otherwise fallback to slot logic
    const hasBefore = !!this.querySelector('[slot="before"]');
    this._computedSide = (this.getAttribute("side") as "left" | "right") || (hasBefore ? "right" : "left");

    // Only update the attribute if it changed
    if (this.getAttribute("side") !== this._computedSide) {
      this.setAttribute("side", this._computedSide);
    }

    const baseStyles = /*css*/ `
      .header {
        display: flex;
        flex: 0 0 auto;
        justify-content: space-between;
        align-items: center;
        padding: calc(var(--space-400) + env(safe-area-inset-top)) var(--space-400) var(--space-400) var(--space-500);
        border-bottom: var(--border-thin);
        box-sizing: border-box;
      }
      .inner {
        display: flex;
        flex-direction: column;
      }
      .content {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        height: auto;
        padding: var(--space-500);
        box-sizing: border-box;
      }
      .content.no-padding {
        padding: 0;
      }

      .content.no-heading {
        padding-top: calc(var(--space-500) + env(safe-area-inset-top));
      }

      .content.no-padding.no-heading {
        padding-top: env(safe-area-inset-top);
      }


      .actions {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: flex-end;
        padding: var(--space-400) var(--space-500) calc(var(--space-400) + env(safe-area-inset-bottom));
        border-top: var(--border-thin);
        background: var(--drawer-background);
        gap: var(--space-300);
        box-sizing: border-box;
        width: 100%;
      }
      .header[hidden],
      .actions[hidden] {
        display: none !important;
      }
    `;

    const overlayStyles = /*css*/ `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 101;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        background: var(--backdrop-overlay);
        opacity: 0;
        visibility: hidden;
        will-change: opacity, visibility;
      }

      .surface {
        background: var(--surface);
        width: 100%;
      }

      .inner {
        position: fixed;
        top: 0;
        height: 100dvh;
        z-index: 110;
        transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
        background: var(--drawer-background);
        border-left: var(--border-thin);
        width: ${width};
        transform: translateX(100%);
        opacity: 0;
        visibility: hidden;
        will-change: transform, opacity;
      }

      :host([side="left"]) .inner {
        left: 0;
        right: auto;
        border-left: none;
        border-right: var(--border-thin);
        transform: translateX(-100%);
      }

      :host([side="right"]) .inner {
        right: 0;
        left: auto;
        border-right: none;
        border-left: var(--border-thin);
        transform: translateX(100%);
      }

      :host([open][side="right"]) .inner,
      :host([open][side="left"]) .inner {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }

      :host([open]) .overlay {
        opacity: 1;
        visibility: visible;
      }
    `;

    const outerBorder =
      this._computedSide === "left" ? `border-right: var(--border-thin);` : `border-left: var(--border-thin);`;

    const pageStyles = /*css*/ `
      .inner {
        background: var(--drawer-background);
        width: ${width};
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
      }

      .outer {
        overflow: hidden;
        will-change: transform;
        transition: opacity var(--speed-100) ease;
      }

      :host([resizing]) .outer {
        transition: none;
      }

      :host([variant="push"]),
      :host([variant="persistent"]) {
        display: block;
        width: 100%;
        position: relative;
      }

      /* Push */
      :host([variant="push"]) .shell {
        display: grid;
        height: 100%;
        overflow: hidden;
        transition: grid-template-columns var(--speed-100) ease;
      }

      :host([resizing]) .shell {
        transition: none;
      }

      /* Persistent */
      :host([variant="persistent"]) .shell {
        display: grid;
        height: 100%;
        overflow: hidden;
      }

      :host([variant="persistent"]) .header .spacer {
        height: 4.4rem;
      }

      /* Hidden & Persistent */
      :host([open]) .outer,
      :host([variant="persistent"]) .outer  { ${outerBorder} }

      :host([variant="push"][resize-rail]) .outer,
      :host([variant="persistent"][resize-rail]) .outer {
        border: none;
      }

      .resize-rail {
        position: relative;
        z-index: 2;
        display: block;
        width: var(--drawer-resize-rail-size, var(--space-100));
        height: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: col-resize;
        appearance: none;
        touch-action: none;
      }

      .resize-rail::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: var(--stroke-size-100);
        background: var(--border-color);
        transform: translateX(-50%);
        transition:
          width var(--speed-100) ease,
          background var(--speed-100) ease;
      }

      .resize-rail:hover::before,
      .resize-rail:focus-visible::before {
        width: var(--stroke-size-300);
        background: var(--outline-color);
      }

      :host([resizing]) .resize-rail.threshold::before {
        width: var(--stroke-size-300);
        background: var(--drawer-resize-rail-threshold-indicator);
        animation: resize-rail-threshold-pulse calc(var(--speed-400) * 2) ease-in-out infinite;
      }

      .resize-rail-icon {
        position: absolute;
        top: 50%;
        right: var(--space-200);
        color: var(--drawer-resize-rail-threshold-indicator);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-50%);
        transition: opacity var(--speed-100) ease;
      }

      :host([side="right"]) .resize-rail-icon {
        right: auto;
        left: var(--space-200);
        transform: translateY(-50%) rotate(180deg);
      }

      :host([resizing]) .resize-rail.threshold .resize-rail-icon {
        opacity: 0.7;
      }

      @keyframes resize-rail-threshold-pulse {
        0%,
        100% {
          opacity: 0.5;
        }
        50% {
          opacity: 0.7;
        }
      }

      .resize-rail:focus-visible {
        outline: var(--stroke-size-400) var(--stroke-outset) var(--outline-color);
        outline-offset: calc(-1 * var(--stroke-size-400));
      }

      :host([variant="push"][resize-rail]:not([open])) .resize-rail {
        opacity: 0;
        pointer-events: none;
      }


      /* Direct slotted element */
      ::slotted([slot="page"]) {
        height: 100dvh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

    `;

    const breakpoint = this.getBreakpoint();

    const responsiveStyles = /*css*/ `
      @media (max-width: ${breakpoint}px) {
        .outer {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          width: 100%;
          max-height: 100dvh;
          transform: translateY(100%);
          transition: none;
        }        

        :host([open]) .outer {
          transform: translateY(0);
          transition: transform 0.3s ease;
          border: none;
        }

        /* Overlay */
        :host([variant="overlay"]) .inner {
          max-width: ${width};
          width: 90%;
          height: 100%;
        }

        /* Push */
        :host([variant="push"]) .inner {
          width: 100%;
          height: 100%;
        }

        /* Persistent */
        :host([variant="persistent"]) .inner {
          width: 100%;
          position: static;
          height: auto;
          border-radius: var(--radius-200);
        }

        :host([variant="persistent"]) .shell {
          height: auto;
        }

        :host([variant="persistent"]) .outer {
          width: 100%;
          position: static;
          height: auto;
          transform: none;
          order: 1;
          padding: calc(var(--space-700) / 2);
          box-sizing: border-box;
          max-height: initial;
          z-index: initial;
        }

        :host([variant="persistent"]) .header {
          padding-top: var(--space-400);
        }

        :host([variant="persistent"]) .content {
          flex: 0 1 auto;
          min-height: initial;
          height: auto;
        }

        :host([variant="persistent"]) .actions {
          border-bottom-right-radius: var(--radius-200);
          border-bottom-left-radius: var(--radius-200);
          width: 100%;
          padding: var(--space-400) var(--space-500) var(--space-400);
        }

        .resize-rail {
          display: none;
        }

      }

      @media (max-width: 360px) {
        :host([variant="persistent"]) .outer {
          padding: calc(var(--space-400) / 2);
        }
      }

    `;

    // Compute which side to render the drawer
    const side = this.getAttribute("side") || this._computedSide;
    const showCloseButton = variant === "overlay" || variant === "push";

    // Template selection
    let template = "";

    const noPadding = this.hasAttribute("drawer-space") ? "no-padding" : "";

    if (variant === "overlay") {
      template = /*html*/ `
      <style>${baseStyles}${overlayStyles}${responsiveStyles}</style>
      <div class="overlay"></div>
      <div class="inner" role="dialog" aria-modal="true">
        <div class="header" hidden>
          <slot name="title"></slot>
          <mui-button class="close" variant="tertiary" size="${closeSize}" aria-label="Close drawer">
            <mui-icon-close size="${closeSize}"></mui-icon-close>
          </mui-button>
        </div>
        <div class="content ${noPadding}">
          <slot></slot>
        </div>
        <div class="actions" hidden>
          <slot name="actions"></slot>
        </div>
      </div>
    `;
    } else if (variant === "push" || variant === "persistent") {
      const resizeRail = hasResizeRail
        ? '<button class="resize-rail" type="button" aria-label="Resize drawer"><mui-icon-left-chevron class="resize-rail-icon" size="x-small" color="var(--drawer-resize-rail-threshold-indicator)" aria-hidden="true"></mui-icon-left-chevron></button>'
        : "";

      template = /*html*/ `
        <style>${baseStyles}${pageStyles}${responsiveStyles}</style>
        <div class="shell">
          ${
            side === "left"
              ? this.getDrawerTemplate(showCloseButton) + resizeRail + '<slot name="page"></slot>'
              : '<slot name="page"></slot>' + resizeRail + this.getDrawerTemplate(showCloseButton)
          }
        </div>
      `;
    }

    this.shadowRoot.innerHTML = template;
  }

  private cacheEls() {
    this.innerEl = this.shadowRoot!.querySelector(".inner")!;
    this.overlayEl = this.shadowRoot!.querySelector(".overlay");
    this.footerEl = this.shadowRoot!.querySelector(".actions");
    this.actionsSlot = this.shadowRoot!.querySelector('slot[name="actions"]');
    this.outer = this.shadowRoot!.querySelector(".outer");
    this.pushLayout = this.shadowRoot!.querySelector(".shell");
    this.persistentLayout = this.shadowRoot!.querySelector(".shell");
    this.headerEl = this.shadowRoot!.querySelector(".header");
    this.headerSlot = this.shadowRoot!.querySelector('slot[name="title"]');
    this.resizeRailEl = this.shadowRoot!.querySelector(".resize-rail");
  }

  private attachEvents() {
    // Close button
    this.shadowRoot!.querySelector(".close")?.addEventListener("click", () => this.close());

    // Overlay (modal only)
    this.overlayEl?.addEventListener("click", () => this.close());

    // Footer slot detection
    this.actionsSlot?.addEventListener("slotchange", () => this.updateFooterVisibility());

    // Header slot detection
    this.headerSlot?.addEventListener("slotchange", () => this.updateHeaderVisibility());

    this.resizeRailEl?.addEventListener("pointerdown", this._handleResizeStart);
  }

  private updateFooterVisibility() {
    if (!this.footerEl || !this.actionsSlot) return;
    const hasActions = this.actionsSlot.assignedElements().length > 0;
    this.footerEl.hidden = !hasActions;

    // 👇 Reflect state on host
    this.toggleAttribute("has-footer", hasActions);
  }

  private updateHeaderVisibility() {
    if (!this.headerEl || !this.headerSlot || !this.innerEl) return;
    const hasHeader = this.headerSlot.assignedElements().length > 0;
    this.headerEl.hidden = !hasHeader;

    // 👇 Reflect state on host
    this.toggleAttribute("has-header", hasHeader);

    // Add/remove no-heading class on <div class="content">
    const contentEl = this.innerEl.querySelector(".content");
    if (contentEl) {
      contentEl.classList.toggle("no-heading", !hasHeader);
    }
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    if (name === "open") this.syncOpenState();
    if (name === "width" && this.innerEl) {
      this.innerEl.style.width = value || "320px";
      const variant = this.getAttribute("variant") || "overlay";
      if (variant === "push" || variant === "persistent") {
        this.updateLayout(variant, variant === "persistent" ? true : this.hasAttribute("open"));
      }
    }
    if (name === "side" || name === "resize-rail") {
      this.render();
      this.cacheEls();
      this.attachEvents();
      this.syncOpenState();
    }
    if (name === "resize-min-drawer-width" || name === "resize-min-page-width") {
      const variant = this.getAttribute("variant") || "overlay";
      if ((variant === "push" || variant === "persistent") && this.hasAttribute("resize-rail")) {
        const minDrawerWidth = this.getResizeRailMinDrawerWidth();
        const currentWidth = this.getCurrentDrawerWidth();
        if (currentWidth < minDrawerWidth) {
          this.setAttribute("width", `${minDrawerWidth}px`);
        } else {
          this.updateLayout(variant, variant === "persistent" ? true : this.hasAttribute("open"));
        }
      }
    }
    if (name === "resize-close-threshold") {
      const variant = this.getAttribute("variant") || "overlay";
      if (variant === "push" && this.hasAttribute("resize-rail")) {
        this.updateLayout(variant, this.hasAttribute("open"));
      }
    }
    if (name === "variant") {
      this.render();
      this.cacheEls();
      this.attachEvents();
      this.syncOpenState();
    }
  }

  private _handleResizeStart = (event: PointerEvent) => {
    const variant = this.getAttribute("variant") || "overlay";
    if (!this.hasAttribute("resize-rail") || (variant !== "push" && variant !== "persistent")) return;

    event.preventDefault();
    this.resizeState = {
      startX: event.clientX,
      startWidth: this.getCurrentDrawerWidth(),
      currentWidth: this.getCurrentDrawerWidth(),
      closeOnRelease: false,
      side: (this.getAttribute("side") as "left" | "right") || this._computedSide,
    };
    this.syncResizeCloseOpacity(this.resizeState.startWidth);
    this.setAttribute("resizing", "");

    window.addEventListener("pointermove", this._handleResizeMove);
    window.addEventListener("pointerup", this._handleResizeEnd);
  };

  private _handleResizeMove = (event: PointerEvent) => {
    if (!this.resizeState) return;

    const delta = event.clientX - this.resizeState.startX;
    const variant = this.getAttribute("variant") || "overlay";
    const minDrawerWidth = this.getResizeRailMinDrawerWidth();
    const nextWidth =
      this.resizeState.side === "left" ? this.resizeState.startWidth + delta : this.resizeState.startWidth - delta;
    const closeThreshold = Math.min(this.getResizeRailCloseThreshold(), minDrawerWidth - 1);
    const clampedWidth = Math.max(
      minDrawerWidth,
      Math.min(nextWidth, this.getResizeRailMaxDrawerWidth()),
    );

    this.resizeState.currentWidth = clampedWidth;
    this.resizeState.closeOnRelease = variant === "push" && nextWidth <= closeThreshold;
    this.resizeRailEl?.classList.toggle("threshold", this.resizeState.closeOnRelease);
    this.syncResizeCloseOpacity(nextWidth);
    this.setAttribute("width", `${Math.round(clampedWidth)}px`);
  };

  private _handleResizeEnd = () => {
    const shouldClose = this.resizeState?.closeOnRelease && (this.getAttribute("variant") || "overlay") === "push";
    this.resizeState = null;
    this.removeAttribute("resizing");
    this.resizeRailEl?.classList.remove("threshold");
    window.removeEventListener("pointermove", this._handleResizeMove);
    window.removeEventListener("pointerup", this._handleResizeEnd);
    if (shouldClose) {
      this.close();
    } else {
      this.syncResizeCloseOpacity(this.getCurrentDrawerWidth());
    }
  };

  private syncResizeCloseOpacity(width: number) {
    if (!this.outer) return;
    const variant = this.getAttribute("variant") || "overlay";
    if (variant !== "push" || !this.hasAttribute("resize-rail")) {
      this.outer.style.removeProperty("opacity");
      this.resizeRailEl?.classList.remove("threshold");
      return;
    }

    const minDrawerWidth = this.getResizeRailMinDrawerWidth();
    const closeThreshold = Math.min(this.getResizeRailCloseThreshold(), minDrawerWidth - 1);
    const fadeRange = minDrawerWidth - closeThreshold;
    const progress = Math.max(0, Math.min((width - closeThreshold) / fadeRange, 1));
    const opacity = 0.2 + progress * 0.8;
    this.outer.style.opacity = opacity.toString();
  }

  private getCurrentDrawerWidth(): number {
    const width = this.getAttribute("width") || "320px";
    const parsed = Number.parseFloat(width);
    if (width.endsWith("px") && Number.isFinite(parsed)) return parsed;
    return this.innerEl?.getBoundingClientRect().width || 320;
  }

  private getResizeRailMaxDrawerWidth(): number {
    const layoutWidth = this.pushLayout?.getBoundingClientRect().width || window.innerWidth;
    const minDrawerWidth = this.getResizeRailMinDrawerWidth();
    const minPageWidth = Math.min(this.getResizeRailMinPageWidth(), layoutWidth * 0.5);
    const railWidth = this.resizeRailEl?.getBoundingClientRect().width || 0;
    return Math.max(minDrawerWidth, layoutWidth - minPageWidth - railWidth);
  }

  private syncOpenState() {
    const isOpen = this.hasAttribute("open");
    const variant = this.getAttribute("variant") || "overlay";
    const zIndexAttr = this.getAttribute("z-index");
    const overlayZ = zIndexAttr ? Number(zIndexAttr) : 10;
    const drawerZ = zIndexAttr ? Number(zIndexAttr) + 1 : 11; // overlay below drawer

    // overlay logic (modal)
    if (variant === "overlay" && this.overlayEl) {
      this.overlayEl.style.visibility = isOpen ? "visible" : "hidden";
      this.overlayEl.style.opacity = isOpen ? "1" : "0";
      this.overlayEl.style.zIndex = overlayZ.toString();
      this.innerEl!.style.zIndex = drawerZ.toString();
      this.inert = !isOpen; // make drawer non-interactive when closed
    }

    // push & persistent layouts
    if (variant === "push" && this.outer) {
      this.updateLayout(variant, isOpen);
      if (!this.resizeState) this.syncResizeCloseOpacity(isOpen ? this.getCurrentDrawerWidth() : 0);
      this.outer.style.zIndex = "";
      this.style.zIndex = zIndexAttr ? zIndexAttr : "";
      this.outer.inert = !isOpen; // only push should disable when closed
    }

    if (variant === "persistent" && this.outer) {
      this.updateLayout(variant, true);
      this.outer.style.zIndex = "";
      this.style.zIndex = zIndexAttr ? zIndexAttr : "";
      this.outer.inert = false; // persistent should always be interactive
    }
  }

  private _handleResize = () => {
    const variant = this.getAttribute("variant") || "overlay";
    if (variant === "push" || variant === "persistent") {
      const isOpen = variant === "persistent" ? true : this.hasAttribute("open");
      this.updateLayout(variant, isOpen);
    }
  };

  private updateLayout(variant: string, isOpen: boolean) {
    const drawerWidth = this.getAttribute("width") || "320px";
    const side = this.getAttribute("side") || this._computedSide;
    const layout = variant === "push" ? this.pushLayout : variant === "persistent" ? this.persistentLayout : null;
    if (!layout) return;

    const isMobile = window.innerWidth <= this.getBreakpoint();

    if (isMobile) {
      if (variant === "push") {
        // Let CSS handle slide-up
        layout.style.removeProperty("grid-template-columns");
      } else if (variant === "persistent") {
        // Stack drawer and page vertically
        layout.style.display = "grid";
        layout.style.removeProperty("grid-template-columns");
      }
      return;
    }

    // Desktop: restore grid
    layout.style.display = "grid";

    if (variant === "push") {
      if (this.hasAttribute("resize-rail")) {
        layout.style.gridTemplateColumns =
          side === "left"
            ? isOpen
              ? `${drawerWidth} var(--drawer-resize-rail-size, var(--space-100)) minmax(0, 1fr)`
              : `0 0 minmax(0, 1fr)`
            : isOpen
              ? `minmax(0, 1fr) var(--drawer-resize-rail-size, var(--space-100)) ${drawerWidth}`
              : `minmax(0, 1fr) 0 0`;
      } else {
        layout.style.gridTemplateColumns =
          side === "left" ? (isOpen ? `${drawerWidth} auto` : `0 auto`) : isOpen ? `auto ${drawerWidth}` : `auto 0`;
      }
    } else if (variant === "persistent") {
      if (this.hasAttribute("resize-rail")) {
        layout.style.gridTemplateColumns =
          side === "left"
            ? `${drawerWidth} var(--drawer-resize-rail-size, var(--space-100)) minmax(0, 1fr)`
            : `minmax(0, 1fr) var(--drawer-resize-rail-size, var(--space-100)) ${drawerWidth}`;
      } else {
        layout.style.gridTemplateColumns = side === "left" ? `${drawerWidth} auto` : `auto ${drawerWidth}`;
      }
    }
  }

  open() {
    this.setAttribute("open", "");
    this.dispatchEvent(new CustomEvent("mui-drawer-open", { bubbles: true, composed: true }));
  }

  close() {
    this.removeAttribute("open");
    this.dispatchEvent(new CustomEvent("mui-drawer-close", { bubbles: true, composed: true }));
  }
}

if (!customElements.get("mui-drawer")) {
  customElements.define("mui-drawer", MuiDrawer);
}
