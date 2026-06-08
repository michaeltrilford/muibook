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
  private workspaceResizeRailEls: HTMLElement[] = [];
  private resizeState: {
    startX: number;
    startWidth: number;
    currentWidth: number;
    closeOnRelease: boolean;
    side: "left" | "right";
  } | null = null;
  private workspaceResizeState: {
    side: "left" | "right";
    startX: number;
    startLeftWidth: number;
    startRightWidth: number;
    closeOnRelease: boolean;
  } | null = null;

  static get observedAttributes() {
    return [
      "open",
      "width",
      "height",
      "side",
      "variant",
      "left-open",
      "right-open",
      "left-width",
      "right-width",
      "z-index",
      "drawer-space",
      "close-size",
      "breakpoint",
      "mobile-presentation",
      "resize-rail",
      "resize-min-drawer-width",
      "resize-min-left-width",
      "resize-min-right-width",
      "resize-min-page-width",
      "resize-close-threshold",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.syncHeight();
    this.render();
    this.cacheEls();
    this.attachEvents();
    this.updateFooterVisibility();
    this.updateHeaderVisibility();
    this.syncOpenState();
    this.syncWorkspaceState();
    document.addEventListener("keydown", this._handleEscape);

    // 👇 Watch for resize
    window.addEventListener("resize", this._handleResize);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this._handleEscape);
    window.removeEventListener("resize", this._handleResize);
    window.removeEventListener("pointermove", this._handleResizeMove);
    window.removeEventListener("pointerup", this._handleResizeEnd);
    window.removeEventListener("pointermove", this._handleWorkspaceResizeMove);
    window.removeEventListener("pointerup", this._handleWorkspaceResizeEnd);
  }

  private getBreakpoint(): number {
    const val = this.getAttribute("breakpoint");
    return val ? Number(val) : 768; // default
  }

  private getPositiveNumberAttribute(name: string, fallback: number): number {
    const value = Number(this.getAttribute(name));
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }

  private getResizeRailMinDrawerWidth(side?: "left" | "right"): number {
    if (side === "left" && this.hasAttribute("resize-min-left-width")) {
      return this.getPositiveNumberAttribute("resize-min-left-width", RESIZE_RAIL_MIN_DRAWER_WIDTH);
    }
    if (side === "right" && this.hasAttribute("resize-min-right-width")) {
      return this.getPositiveNumberAttribute("resize-min-right-width", RESIZE_RAIL_MIN_DRAWER_WIDTH);
    }
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

  private getCloseActionSizeToken(): string {
    return `var(--action-size-${this.getCloseSize()})`;
  }

  private getMobilePresentation(): "overlay" | "stack" {
    return this.getAttribute("mobile-presentation") === "stack" ? "stack" : "overlay";
  }

  private isMobileViewport(): boolean {
    return window.innerWidth <= this.getBreakpoint();
  }

  private usesMobileOverlay(variant = this.getAttribute("variant") || "overlay"): boolean {
    return (
      this.isMobileViewport() &&
      (variant === "push" ||
        variant === "workspace" ||
        (variant === "persistent" && this.getMobilePresentation() !== "stack"))
    );
  }

  private getLayoutOpenState(variant = this.getAttribute("variant") || "overlay"): boolean {
    return variant === "persistent" && !this.usesMobileOverlay(variant) ? true : this.hasAttribute("open");
  }

  private syncHeight() {
    this.style.setProperty("--drawer-height", this.getAttribute("height") || "100dvh");
  }

  private getWorkspaceColumns(): string {
    const leftWidth = this.getAttribute("left-width") || "28rem";
    const rightWidth = this.getAttribute("right-width") || "32rem";
    const leftColumn = this.hasAttribute("left-open") ? leftWidth : "0";
    const rightColumn = this.hasAttribute("right-open") ? rightWidth : "0";
    if (!this.hasAttribute("resize-rail")) {
      return `${leftColumn} minmax(0, 1fr) ${rightColumn}`;
    }

    const rail = "var(--drawer-resize-rail-size, var(--space-100))";
    const leftRail = this.hasAttribute("left-open") ? rail : "0";
    const rightRail = this.hasAttribute("right-open") ? rail : "0";
    return `${leftColumn} ${leftRail} minmax(0, 1fr) ${rightRail} ${rightColumn}`;
  }

  private syncWorkspaceState() {
    if ((this.getAttribute("variant") || "overlay") !== "workspace" || !this.shadowRoot) return;
    const shell = this.shadowRoot.querySelector<HTMLElement>(".workspace-shell");
    if (!shell) return;

    const isMobile = this.isMobileViewport();
    if (isMobile) {
      shell.style.removeProperty("grid-template-columns");
    } else {
      shell.style.gridTemplateColumns = this.getWorkspaceColumns();
    }
    const mobileSide = this.getAttribute("side") === "right" ? "right" : "left";
    const mobileOpen = this.hasAttribute("open");
    const leftVisible = isMobile ? mobileOpen && mobileSide === "left" : this.hasAttribute("left-open");
    const rightVisible = isMobile ? mobileOpen && mobileSide === "right" : this.hasAttribute("right-open");
    const leftPanel = this.getWorkspacePanel("left");
    const rightPanel = this.getWorkspacePanel("right");
    leftPanel?.toggleAttribute("inert", !leftVisible);
    rightPanel?.toggleAttribute("inert", !rightVisible);
    if (leftPanel) leftPanel.hidden = !isMobile && !leftVisible;
    if (rightPanel) rightPanel.hidden = !isMobile && !rightVisible;
    const leftRail = this.shadowRoot.querySelector<HTMLElement>('[data-workspace-resize="left"]');
    const rightRail = this.shadowRoot.querySelector<HTMLElement>('[data-workspace-resize="right"]');
    if (leftRail) leftRail.hidden = isMobile || !this.hasAttribute("left-open");
    if (rightRail) rightRail.hidden = isMobile || !this.hasAttribute("right-open");
    if (!leftVisible) leftPanel?.style.removeProperty("opacity");
    if (!rightVisible) rightPanel?.style.removeProperty("opacity");
    this.shadowRoot.querySelector<HTMLElement>(".workspace-page")?.scrollTo({ left: 0 });
  }

  private _handleEscape = (e: KeyboardEvent) => {
    const variant = this.getAttribute("variant") || "overlay";
    if (e.key === "Escape" && (variant === "overlay" || variant === "push" || this.usesMobileOverlay(variant))) {
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
    const hasWorkspaceResizeRail = variant === "workspace" && this.hasAttribute("resize-rail");
    const closeSize = this.getCloseSize();

    // Determine side: attribute takes priority, otherwise fallback to slot logic
    const hasBefore = !!this.querySelector('[slot="before"]');
    this._computedSide = (this.getAttribute("side") as "left" | "right") || (hasBefore ? "right" : "left");

    // Only update the attribute if it changed
    if (variant !== "workspace" && this.getAttribute("side") !== this._computedSide) {
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
        box-sizing: border-box;
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
      .header .spacer {
        display: inline-flex;
        flex: 0 0 auto;
        width: ${this.getCloseActionSizeToken()};
        height: ${this.getCloseActionSizeToken()};
      }
    `;

    const resizeRailStyles = /*css*/ `
      .resize-rail,
      .workspace-resize-rail {
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

      .resize-rail[hidden],
      .workspace-resize-rail[hidden] {
        display: none !important;
      }

      .resize-rail::before,
      .workspace-resize-rail::before {
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
      .resize-rail:focus-visible::before,
      .workspace-resize-rail:hover::before,
      .workspace-resize-rail:focus-visible::before,
      .workspace-resize-rail.is-resizing::before {
        width: var(--stroke-size-300);
        background: var(--outline-color);
      }

      :host([resizing]) .resize-rail.threshold::before,
      .workspace-resize-rail.threshold::before {
        width: var(--stroke-size-300);
        background: var(--drawer-resize-rail-threshold-indicator);
        animation: resize-rail-threshold-pulse calc(var(--speed-400) * 2) ease-in-out infinite;
      }

      .resize-rail-icon,
      .workspace-resize-rail-icon {
        position: absolute;
        top: 50%;
        right: var(--space-200);
        color: var(--drawer-resize-rail-threshold-indicator);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-50%);
        transition: opacity var(--speed-100) ease;
      }

      :host([side="right"]) .resize-rail-icon,
      .workspace-resize-rail-right .workspace-resize-rail-icon {
        right: auto;
        left: var(--space-200);
        transform: translateY(-50%) rotate(180deg);
      }

      :host([resizing]) .resize-rail.threshold .resize-rail-icon,
      .workspace-resize-rail.threshold .workspace-resize-rail-icon {
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

      .resize-rail:focus-visible,
      .workspace-resize-rail:focus-visible {
        outline: var(--stroke-size-400) var(--stroke-outset) var(--outline-color);
        outline-offset: calc(-1 * var(--stroke-size-400));
      }
    `;

    const workspaceStyles = /*css*/ `
      :host([variant="workspace"]) {
        display: block;
        width: 100%;
        height: var(--drawer-height, 100dvh);
      }

      .workspace-shell {
        display: grid;
        grid-template-columns: ${this.getWorkspaceColumns()};
        width: 100%;
        height: var(--drawer-height, 100dvh);
        min-width: 0;
        overflow: hidden;
        transition: grid-template-columns var(--speed-100) ease;
      }

      .workspace-panel {
        min-width: 0;
        overflow: hidden;
        background: var(--drawer-background);
        transition:
          opacity var(--speed-100) ease,
          transform 0.3s ease;
      }

      .workspace-panel[hidden] {
        display: none !important;
      }

      :host([resizing]) .workspace-panel,
      .workspace-shell.no-transition .workspace-panel {
        transition: none;
      }

      .workspace-panel-left .inner,
      .workspace-panel-right .inner {
        position: static;
        width: 100%;
        height: var(--drawer-height, 100dvh);
        background: var(--drawer-background);
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        box-sizing: border-box;
      }

      .workspace-panel-left .inner {
        border-right: var(--border-thin);
      }

      .workspace-panel-right .inner {
        border-left: var(--border-thin);
      }

      .workspace-page {
        grid-column: 2;
        min-width: 0;
        width: 100%;
        height: var(--drawer-height, 100dvh);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      :host([resize-rail]) .workspace-page {
        grid-column: 3;
      }

      ::slotted([slot="page"]) {
        min-width: 0;
        height: var(--drawer-height, 100dvh);
      }

      :host([resizing]) .workspace-shell,
      .workspace-shell.no-transition {
        transition: none;
      }

      @media (max-width: ${this.getBreakpoint()}px) {
        .overlay {
          position: fixed;
          display: block;
          inset: 0;
          height: 100dvh;
          z-index: 10;
          background: var(--backdrop-overlay);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        :host([open]) .overlay {
          opacity: 1;
          visibility: visible;
        }

        .workspace-shell {
          grid-template-columns: minmax(0, 1fr);
          height: var(--drawer-height, 100dvh);
        }

        .workspace-page,
        :host([resize-rail]) .workspace-page {
          grid-column: 1;
          height: var(--drawer-height, 100dvh);
        }

        .workspace-panel {
          position: fixed;
          top: 0;
          bottom: auto;
          z-index: 11;
          width: 90%;
          max-width: 32rem;
          height: 100dvh;
          max-height: 100dvh;
          overflow: visible;
          visibility: hidden;
          pointer-events: none;
        }

        .workspace-panel .inner {
          height: 100dvh;
        }

        .workspace-panel-left {
          left: 0;
          right: auto;
          transform: translateX(-100%);
        }

        .workspace-panel-right {
          right: 0;
          left: auto;
          transform: translateX(100%);
        }

        :host([open][side="left"]) .workspace-panel-left,
        :host([open][side="right"]) .workspace-panel-right {
          transform: translateX(0);
          visibility: visible;
          pointer-events: auto;
        }

        .workspace-resize-rail {
          display: none;
        }
      }
    `;

    const overlayStyles = /*css*/ `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100dvh;
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
        height: var(--drawer-height, 100dvh);
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
        height: var(--drawer-height, 100dvh);
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
        height: var(--drawer-height, 100dvh);
        position: relative;
      }

      /* Push */
      :host([variant="push"]) .shell {
        display: grid;
        height: var(--drawer-height, 100dvh);
        overflow: hidden;
        transition: grid-template-columns var(--speed-100) ease;
      }

      :host([resizing]) .shell {
        transition: none;
      }

      /* Persistent */
      :host([variant="persistent"]) .shell {
        display: grid;
        height: var(--drawer-height, 100dvh);
        overflow: hidden;
      }

      /* Hidden & Persistent */
      :host([open]) .outer,
      :host([variant="persistent"]) .outer  { ${outerBorder} }

      :host([variant="push"][resize-rail]) .outer,
      :host([variant="persistent"][resize-rail]) .outer {
        border: none;
      }

      :host([variant="push"][resize-rail]:not([open])) .resize-rail {
        opacity: 0;
        pointer-events: none;
      }

      .overlay {
        display: none;
      }

      /* Direct slotted element */
      ::slotted([slot="page"]) {
        height: var(--drawer-height, 100dvh);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

    `;

    const breakpoint = this.getBreakpoint();

    const responsiveStyles = /*css*/ `
      @media (max-width: ${breakpoint}px) {
        .outer {
          position: fixed;
          top: 0;
          bottom: 0;
          max-height: var(--drawer-height, 100dvh);
          transition: none;
        }

        :host([variant="overlay"]) .outer {
          left: 0;
          right: 0;
          width: 100%;
          transform: translateY(100%);
        }

        :host([variant="push"]) .outer,
        :host([variant="persistent"]:not([mobile-presentation="stack"])) .outer {
          bottom: auto;
          width: 90%;
          max-width: ${width};
          height: 100dvh;
          max-height: 100dvh;
          overflow: visible;
          transform: translateX(-100%);
          z-index: 11;
        }

        :host([variant="push"]) .overlay,
        :host([variant="persistent"]:not([mobile-presentation="stack"])) .overlay {
          position: fixed;
          display: block;
          inset: 0;
          height: 100dvh;
          z-index: 10;
          background: var(--backdrop-overlay);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        :host([variant="push"][side="left"]) .outer,
        :host([variant="persistent"]:not([mobile-presentation="stack"])[side="left"]) .outer {
          left: 0;
          right: auto;
        }

        :host([variant="push"][side="right"]) .outer,
        :host([variant="persistent"]:not([mobile-presentation="stack"])[side="right"]) .outer {
          left: auto;
          right: 0;
          transform: translateX(100%);
        }

        :host([open][variant="overlay"]) .outer,
        :host([open][variant="push"]) .outer,
        :host([open][variant="persistent"]:not([mobile-presentation="stack"])) .outer {
          transform: translateY(0);
          transition: transform 0.3s ease;
          border: none;
        }

        :host([open][variant="push"]) .outer,
        :host([open][variant="persistent"]:not([mobile-presentation="stack"])) .outer {
          transform: translateX(0);
        }

        :host([open][variant="push"][side="left"]) .inner,
        :host([open][variant="persistent"]:not([mobile-presentation="stack"])[side="left"]) .inner {
          border-right: var(--border-thin);
        }

        :host([open][variant="push"][side="right"]) .inner,
        :host([open][variant="persistent"]:not([mobile-presentation="stack"])[side="right"]) .inner {
          border-left: var(--border-thin);
        }

        :host([open][variant="push"]) .overlay,
        :host([open][variant="persistent"]:not([mobile-presentation="stack"])) .overlay {
          opacity: 1;
          visibility: visible;
        }

        /* Overlay */
        :host([variant="overlay"]) .inner {
          max-width: ${width};
          width: 90%;
          height: var(--drawer-height, 100dvh);
        }

        /* Push */
        :host([variant="push"]) .inner,
        :host([variant="persistent"]:not([mobile-presentation="stack"])) .inner {
          position: static;
          width: 100%;
          height: 100dvh;
        }

        :host([variant="push"]),
        :host([variant="push"]) .shell,
        :host([variant="push"]) ::slotted([slot="page"]),
        :host([variant="persistent"]:not([mobile-presentation="stack"])),
        :host([variant="persistent"]:not([mobile-presentation="stack"])) .shell,
        :host([variant="persistent"]:not([mobile-presentation="stack"])) ::slotted([slot="page"]) {
          height: var(--drawer-height, 100dvh);
        }

        :host([variant="persistent"]:not([mobile-presentation="stack"])) .close {
          display: inline-flex;
        }

        /* Persistent */
        :host([variant="persistent"][mobile-presentation="stack"]) .inner {
          width: 100%;
          position: static;
          height: auto;
          border-radius: var(--radius-200);
        }

        :host([variant="persistent"][mobile-presentation="stack"]) .shell {
          height: auto;
        }

        :host([variant="persistent"][mobile-presentation="stack"]) .outer {
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

        :host([variant="persistent"][mobile-presentation="stack"]) .header {
          padding-top: var(--space-400);
        }

        :host([variant="persistent"][mobile-presentation="stack"]) .content {
          flex: 0 1 auto;
          min-height: initial;
          height: auto;
        }

        :host([variant="persistent"][mobile-presentation="stack"]) .actions {
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
        :host([variant="persistent"][mobile-presentation="stack"]) .outer {
          padding: calc(var(--space-400) / 2);
        }
      }

    `;

    // Compute which side to render the drawer
    const side = this.getAttribute("side") || this._computedSide;
    const showCloseButton = variant === "overlay" || variant === "push" || this.usesMobileOverlay(variant);

    // Template selection
    let template = "";

    const noPadding = this.hasAttribute("drawer-space") ? "no-padding" : "";

    if (variant === "workspace") {
      template = /*html*/ `
        <style>${baseStyles}${resizeRailStyles}${workspaceStyles}</style>
        <div class="overlay"></div>
        <div class="workspace-shell">
          <div class="outer workspace-panel workspace-panel-left">
            <div class="inner" role="complementary">
              <div class="content no-padding"><slot name="left"></slot></div>
            </div>
          </div>
          ${
            hasWorkspaceResizeRail
              ? '<button class="workspace-resize-rail workspace-resize-rail-left" type="button" aria-label="Resize left drawer" data-workspace-resize="left"><mui-icon-left-chevron class="workspace-resize-rail-icon" size="x-small" color="var(--drawer-resize-rail-threshold-indicator)" aria-hidden="true"></mui-icon-left-chevron></button>'
              : ""
          }
          <div class="workspace-page">
            <slot name="page"></slot>
          </div>
          ${
            hasWorkspaceResizeRail
              ? '<button class="workspace-resize-rail workspace-resize-rail-right" type="button" aria-label="Resize right drawer" data-workspace-resize="right"><mui-icon-left-chevron class="workspace-resize-rail-icon" size="x-small" color="var(--drawer-resize-rail-threshold-indicator)" aria-hidden="true"></mui-icon-left-chevron></button>'
              : ""
          }
          <div class="outer workspace-panel workspace-panel-right">
            <div class="inner" role="complementary">
              <div class="content no-padding"><slot name="right"></slot></div>
            </div>
          </div>
        </div>
      `;
    } else if (variant === "overlay") {
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
        <style>${baseStyles}${resizeRailStyles}${pageStyles}${responsiveStyles}</style>
        <div class="overlay"></div>
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
    this.workspaceResizeRailEls = Array.from(this.shadowRoot!.querySelectorAll("[data-workspace-resize]"));
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
    this.workspaceResizeRailEls.forEach((rail) => {
      rail.addEventListener("pointerdown", this._handleWorkspaceResizeStart);
    });
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
    if (name === "open") {
      this.syncOpenState();
      this.syncWorkspaceState();
    }
    if (name === "left-open" || name === "right-open" || name === "left-width" || name === "right-width") {
      this.syncWorkspaceState();
    }
    if (name === "height") {
      this.syncHeight();
      const variant = this.getAttribute("variant") || "overlay";
      if (variant === "workspace") {
        this.syncWorkspaceState();
      }
      if (variant === "push" || variant === "persistent") {
        this.updateLayout(variant, this.getLayoutOpenState(variant));
      }
    }
    if (name === "width" && this.innerEl) {
      this.innerEl.style.width = value || "320px";
      const variant = this.getAttribute("variant") || "overlay";
      if (variant === "push" || variant === "persistent") {
        this.updateLayout(variant, this.getLayoutOpenState(variant));
      }
    }
    if (name === "mobile-presentation") {
      const variant = this.getAttribute("variant") || "overlay";
      if (variant === "push" || variant === "persistent") {
        this.updateLayout(variant, this.getLayoutOpenState(variant));
      }
      this.syncOpenState();
    }
    if (name === "side" && (this.getAttribute("variant") || "overlay") === "workspace") {
      this.syncOpenState();
      this.syncWorkspaceState();
      return;
    }
    if (name === "side" || name === "resize-rail") {
      this.render();
      this.cacheEls();
      this.attachEvents();
      this.syncOpenState();
      this.syncWorkspaceState();
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
      if (variant === "workspace" && this.hasAttribute("resize-rail")) {
        const minDrawerWidth = this.getResizeRailMinDrawerWidth();
        (["left", "right"] as const).forEach((side) => {
          if (this.hasAttribute(`${side}-open`) && this.getWorkspacePanelWidth(side) < minDrawerWidth) {
            this.setAttribute(`${side}-width`, `${minDrawerWidth}px`);
          }
        });
        this.syncWorkspaceState();
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
    const clampedWidth = Math.max(minDrawerWidth, Math.min(nextWidth, this.getResizeRailMaxDrawerWidth()));

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

  private _handleWorkspaceResizeStart = (event: PointerEvent) => {
    const rail = event.currentTarget as HTMLElement | null;
    const side = rail?.dataset.workspaceResize as "left" | "right" | undefined;
    if ((this.getAttribute("variant") || "overlay") !== "workspace" || !side || !this.hasAttribute("resize-rail")) {
      return;
    }
    if (!this.hasAttribute(`${side}-open`)) return;

    event.preventDefault();
    this.workspaceResizeState = {
      side,
      startX: event.clientX,
      startLeftWidth: this.getWorkspacePanelWidth("left"),
      startRightWidth: this.getWorkspacePanelWidth("right"),
      closeOnRelease: false,
    };
    this.setAttribute("resizing", "");
    rail?.classList.add("is-resizing");
    this.syncWorkspaceResizeCloseOpacity(
      side,
      side === "left" ? this.workspaceResizeState.startLeftWidth : this.workspaceResizeState.startRightWidth,
    );

    window.addEventListener("pointermove", this._handleWorkspaceResizeMove);
    window.addEventListener("pointerup", this._handleWorkspaceResizeEnd);
  };

  private _handleWorkspaceResizeMove = (event: PointerEvent) => {
    if (!this.workspaceResizeState) return;

    const delta = event.clientX - this.workspaceResizeState.startX;
    const side = this.workspaceResizeState.side;
    const baseWidth =
      side === "left" ? this.workspaceResizeState.startLeftWidth : this.workspaceResizeState.startRightWidth;
    const nextWidth = side === "left" ? baseWidth + delta : baseWidth - delta;
    const closeThreshold = Math.min(this.getResizeRailCloseThreshold(), this.getResizeRailMinDrawerWidth(side) - 1);
    const clampedWidth = Math.max(
      this.getResizeRailMinDrawerWidth(side),
      Math.min(nextWidth, this.getWorkspaceMaxPanelWidth(side)),
    );

    this.workspaceResizeState.closeOnRelease = nextWidth <= closeThreshold;
    this.getWorkspaceResizeRail(side)?.classList.toggle("threshold", this.workspaceResizeState.closeOnRelease);
    this.syncWorkspaceResizeCloseOpacity(side, nextWidth);
    this.setAttribute(`${side}-width`, `${Math.round(clampedWidth)}px`);
  };

  private _handleWorkspaceResizeEnd = () => {
    const state = this.workspaceResizeState;
    if (state?.closeOnRelease) {
      this.removeAttribute(`${state.side}-open`);
    }
    this.workspaceResizeRailEls.forEach((rail) => rail.classList.remove("is-resizing", "threshold"));
    this.workspaceResizeState = null;
    this.removeAttribute("resizing");
    window.removeEventListener("pointermove", this._handleWorkspaceResizeMove);
    window.removeEventListener("pointerup", this._handleWorkspaceResizeEnd);
    if (state && !state.closeOnRelease) {
      this.syncWorkspaceResizeCloseOpacity(state.side, this.getWorkspacePanelWidth(state.side));
    }
  };

  private syncResizeCloseOpacity(width: number) {
    if (!this.outer) return;
    const variant = this.getAttribute("variant") || "overlay";
    const isMobile = window.innerWidth <= this.getBreakpoint();
    if (variant !== "push" || !this.hasAttribute("resize-rail") || isMobile) {
      this.outer.style.removeProperty("opacity");
      this.resizeRailEl?.classList.remove("threshold");
      return;
    }

    this.outer.style.opacity = this.getResizeCloseOpacity(width).toString();
  }

  private getResizeCloseOpacity(width: number): number {
    const minDrawerWidth = this.getResizeRailMinDrawerWidth();
    const closeThreshold = Math.min(this.getResizeRailCloseThreshold(), minDrawerWidth - 1);
    const fadeRange = minDrawerWidth - closeThreshold;
    const progress = Math.max(0, Math.min((width - closeThreshold) / fadeRange, 1));
    return 0.2 + progress * 0.8;
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

  private getWorkspacePanelWidth(side: "left" | "right"): number {
    const panel = this.getWorkspacePanel(side);
    const widthAttr = this.getAttribute(`${side}-width`) || (side === "left" ? "28rem" : "32rem");
    const parsedWidth = Number.parseFloat(widthAttr);
    if (widthAttr.endsWith("px") && Number.isFinite(parsedWidth)) return parsedWidth;
    if (widthAttr.endsWith("rem") && Number.isFinite(parsedWidth)) {
      return parsedWidth * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    return panel?.getBoundingClientRect().width || parsedWidth || RESIZE_RAIL_MIN_DRAWER_WIDTH;
  }

  private getWorkspacePanel(side: "left" | "right"): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>(`.workspace-panel-${side}`) || null;
  }

  private getWorkspaceResizeRail(side: "left" | "right"): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>(`[data-workspace-resize="${side}"]`) || null;
  }

  private syncWorkspaceResizeCloseOpacity(side: "left" | "right", width: number) {
    const panel = this.getWorkspacePanel(side);
    if (!panel) return;
    const variant = this.getAttribute("variant") || "overlay";
    const isMobile = window.innerWidth <= this.getBreakpoint();
    if (variant !== "workspace" || !this.hasAttribute("resize-rail") || isMobile) {
      panel.style.removeProperty("opacity");
      this.getWorkspaceResizeRail(side)?.classList.remove("threshold");
      return;
    }

    panel.style.opacity = this.getResizeCloseOpacity(width).toString();
  }

  private getWorkspaceMaxPanelWidth(side: "left" | "right"): number {
    const shell = this.shadowRoot?.querySelector<HTMLElement>(".workspace-shell");
    const layoutWidth = shell?.getBoundingClientRect().width || window.innerWidth;
    const minDrawerWidth = this.getResizeRailMinDrawerWidth();
    const minPageWidth = Math.min(this.getResizeRailMinPageWidth(), layoutWidth * 0.5);
    const oppositeSide = side === "left" ? "right" : "left";
    const oppositeWidth = this.hasAttribute(`${oppositeSide}-open`) ? this.getWorkspacePanelWidth(oppositeSide) : 0;
    const railWidth = this.workspaceResizeRailEls.reduce((total, rail) => {
      return total + (rail.hidden ? 0 : rail.getBoundingClientRect().width);
    }, 0);

    return Math.max(minDrawerWidth, layoutWidth - oppositeWidth - minPageWidth - railWidth);
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
      if (this.overlayEl) this.overlayEl.style.zIndex = overlayZ.toString();
      this.outer.style.zIndex = zIndexAttr ? drawerZ.toString() : "";
      this.style.zIndex = zIndexAttr ? zIndexAttr : "";
      this.outer.inert = !isOpen; // only push should disable when closed
    }

    if (variant === "persistent" && this.outer) {
      const usesMobileOverlay = this.usesMobileOverlay(variant);
      this.updateLayout(variant, this.getLayoutOpenState(variant));
      if (this.overlayEl) this.overlayEl.style.zIndex = overlayZ.toString();
      this.outer.style.zIndex = usesMobileOverlay && zIndexAttr ? drawerZ.toString() : "";
      this.style.zIndex = zIndexAttr ? zIndexAttr : "";
      this.outer.inert = usesMobileOverlay ? !isOpen : false;
    }

    if (variant === "workspace") {
      if (this.overlayEl) {
        const showOverlay = this.usesMobileOverlay(variant) && isOpen;
        this.overlayEl.style.visibility = showOverlay ? "visible" : "hidden";
        this.overlayEl.style.opacity = showOverlay ? "1" : "0";
        this.overlayEl.style.zIndex = overlayZ.toString();
      }
      this.style.zIndex = zIndexAttr ? zIndexAttr : "";
      this.syncWorkspaceState();
    }
  }

  private _handleResize = () => {
    const variant = this.getAttribute("variant") || "overlay";
    if (variant === "push" || variant === "persistent") {
      this.updateLayout(variant, this.getLayoutOpenState(variant));
      this.syncOpenState();
    }
    if (variant === "workspace") {
      const shell = this.shadowRoot?.querySelector<HTMLElement>(".workspace-shell");
      shell?.classList.add("no-transition");
      this.syncWorkspaceState();
      requestAnimationFrame(() => shell?.classList.remove("no-transition"));
    }
  };

  private updateLayout(variant: string, isOpen: boolean) {
    const drawerWidth = this.getAttribute("width") || "320px";
    const side = this.getAttribute("side") || this._computedSide;
    const layout = variant === "push" ? this.pushLayout : variant === "persistent" ? this.persistentLayout : null;
    if (!layout) return;

    const isMobile = window.innerWidth <= this.getBreakpoint();

    if (isMobile) {
      this.outer?.style.removeProperty("opacity");
      this.resizeRailEl?.classList.remove("threshold");
      if (variant === "push") {
        // Let CSS handle the narrow-screen overlay presentation.
        layout.style.removeProperty("grid-template-columns");
      } else if (variant === "persistent") {
        if (this.getMobilePresentation() === "stack") {
          layout.style.display = "grid";
        }
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
