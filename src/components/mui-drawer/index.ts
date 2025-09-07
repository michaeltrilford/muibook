import "../mui-icons/close";
import "../mui-button";

class MuiDrawer extends HTMLElement {
  private outerEl: HTMLElement | null = null;
  private overlayEl: HTMLElement | null = null;
  private footerEl: HTMLElement | null = null;
  private actionsSlot: HTMLSlotElement | null = null;
  private pushLayout: HTMLElement | null = null;
  private drawerWrapper: HTMLElement | null = null;
  private persistentLayout: HTMLElement | null = null;

  static get observedAttributes() {
    return ["open", "width", "side", "variant", "z-index"];
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
    this.syncOpenState();
    document.addEventListener("keydown", this._handleEscape);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this._handleEscape);
  }

  private _handleEscape = (e: KeyboardEvent) => {
    const variant = this.getAttribute("variant") || "overlay";
    if (e.key === "Escape" && (variant === "overlay" || variant === "push")) {
      this.close();
    }
  };

  private getDrawerTemplate(hasCloseButton = true) {
    return /*html*/ `
    <div class="drawer-wrapper">
      <div class="outer" role="complementary">
        <header>
          <slot name="title"></slot>
          ${
            hasCloseButton
              ? `
            <mui-button class="close" variant="tertiary" aria-label="Close panel">
              <mui-icon-close></mui-icon-close>
            </mui-button>`
              : ""
          }
        </header>
        <main><slot></slot></main>
        <footer hidden><slot name="actions"></slot></footer>
      </div>
    </div>
  `;
  }

  private _computedSide: "left" | "right" = "left";
  private render() {
    if (!this.shadowRoot) return;

    const width = this.getAttribute("width") || "400px";
    const variant = this.getAttribute("variant") || "overlay";

    // Determine side: attribute takes priority, otherwise fallback to slot logic
    const hasBefore = !!this.querySelector('[slot="before"]');
    this._computedSide = (this.getAttribute("side") as "left" | "right") || (hasBefore ? "right" : "left");

    // Only update the attribute if it changed
    if (this.getAttribute("side") !== this._computedSide) {
      this.setAttribute("side", this._computedSide);
    }

    const baseStyles = /*css*/ `
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: calc(var(--space-400) + env(safe-area-inset-top)) var(--space-400) var(--space-400) var(--space-500);
        border-bottom: var(--border-thin);
        box-sizing: border-box;
        min-height: 7.7rem;
      }

      main {
        flex: 1;
        overflow-y: auto;
        height: 100%;
        padding: var(--space-500);
        box-sizing: border-box;

        /* Force a new compositing layer */
        will-change: transform, opacity;
      }

      footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: var(--space-400) var(--space-500) calc(var(--space-400) + env(safe-area-inset-bottom));
        border-top: var(--border-thin);
        background: var(--surface-elevated-100);
        gap: var(--space-300);
        box-sizing: border-box;
      }

      footer[hidden] {
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
        background: var(--dialog-backdrop);
        opacity: 0;
        visibility: hidden;
        will-change: opacity, visibility;
      }

      .surface {
        background: var(--surface);
        width: 100%;
      }

      .outer {
        position: fixed;
        top: 0;
        height: 100dvh;
        z-index: 110;
        transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
        background: var(--surface-elevated-100);
        border-left: var(--border-thin);
        width: ${width};
        transform: translateX(100%);
        opacity: 0;
        visibility: hidden;
        display: flex;
        flex-direction: column;
        will-change: transform, opacity;
      }

      :host([side="left"]) .outer {
        left: 0;
        right: auto;
        border-left: none;
        border-right: var(--border-thin);
        transform: translateX(-100%);
      }

      :host([side="right"]) .outer {
        right: 0;
        left: auto;
        transform: translateX(100%);
      }

      :host([open][side="right"]) .outer,
      :host([open][side="left"]) .outer {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }

      :host([open]) .overlay {
        opacity: 1;
        visibility: visible;
      }
    `;

    const drawerWrapperBorder =
      this._computedSide === "left" ? `border-right: var(--border-thin);` : `border-left: var(--border-thin);`;

    const inlineStyles = /*css*/ `
      .outer {
        display: flex;
        flex-direction: column;
        background: var(--surface-elevated-100);
        width: ${width};
        height: auto;
      }

      .push-layout {
        display: grid;
        height: 100%;
        overflow: hidden; /* optional, prevents content overflow during transitions */
        transition: grid-template-columns var(--speed-100) ease; /* smooth push animation */
      }

      .persistent-layout {
        display: grid;
        height: 100%;
        overflow: hidden; /* optional, prevents content overflow during transitions */
      }

      .drawer-wrapper {
        overflow: hidden;
        will-change: transform;
      }

      :host([open]) .drawer-wrapper,
      .persistent-layout .drawer-wrapper {
        ${drawerWrapperBorder}
      }
    `;

    // Compute which side to render the drawer
    const side = this.getAttribute("side") || this._computedSide;

    // Template selection
    let template = "";

    if (variant === "overlay") {
      template = /*html*/ `
      <style>${baseStyles}${overlayStyles}</style>
      <div class="overlay"></div>
      <div class="outer" role="dialog" aria-modal="true">
        <header>
          <slot name="title"></slot>
          <mui-button class="close" variant="tertiary" aria-label="Close drawer">
            <mui-icon-close></mui-icon-close>
          </mui-button>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer hidden>
          <slot name="actions"></slot>
        </footer>
      </div>
    `;
    } else if (variant === "push" || variant === "persistent") {
      template = /*html*/ `
    <style>${baseStyles}${inlineStyles}</style>
    <div class="${variant}-layout">
      ${
        side === "left"
          ? this.getDrawerTemplate() + '<slot name="page"></slot>'
          : '<slot name="page"></slot>' + this.getDrawerTemplate()
      }
    </div>
  `;
    }

    this.shadowRoot.innerHTML = template;
  }

  private cacheEls() {
    this.outerEl = this.shadowRoot!.querySelector(".outer")!;
    this.overlayEl = this.shadowRoot!.querySelector(".overlay");
    this.footerEl = this.shadowRoot!.querySelector("footer");
    this.actionsSlot = this.shadowRoot!.querySelector('slot[name="actions"]');
    this.drawerWrapper = this.shadowRoot!.querySelector(".drawer-wrapper");
    this.pushLayout = this.shadowRoot!.querySelector(".push-layout");
    this.persistentLayout = this.shadowRoot!.querySelector(".persistent-layout");
  }

  private attachEvents() {
    // Close button
    this.shadowRoot!.querySelector(".close")?.addEventListener("click", () => this.close());

    // Overlay (modal only)
    this.overlayEl?.addEventListener("click", () => this.close());

    // Footer slot detection
    this.actionsSlot?.addEventListener("slotchange", () => this.updateFooterVisibility());
  }

  private updateFooterVisibility() {
    if (!this.footerEl || !this.actionsSlot) return;
    const hasActions = this.actionsSlot.assignedElements().length > 0;
    this.footerEl.hidden = !hasActions;
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    if (name === "open") this.syncOpenState();
    if (name === "width" && this.outerEl) {
      this.outerEl.style.width = value || "400px";
    }
    if (name === "side") {
      this.render();
      this.cacheEls();
      this.attachEvents();
      this.syncOpenState();
    }
    if (name === "variant") {
      this.render();
      this.cacheEls();
      this.attachEvents();
      this.syncOpenState();
    }
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
      this.outerEl!.style.zIndex = drawerZ.toString();
      this.inert = !isOpen; // make drawer non-interactive when closed
    }

    // For push & persistent layouts, just update grid
    if (variant === "push" || variant === "persistent") {
      this.updateLayout(variant, isOpen);

      if (variant === "push" && this.drawerWrapper) {
        this.drawerWrapper.style.zIndex = drawerZ.toString();
        this.drawerWrapper.inert = !isOpen;
      }
    }
  }

  private updateLayout(variant: string, isOpen: boolean) {
    const drawerWidth = this.getAttribute("width") || "300px";
    const side = this.getAttribute("side") || this._computedSide;

    const layout = variant === "push" ? this.pushLayout : variant === "persistent" ? this.persistentLayout : null;
    if (!layout) return;

    if (variant === "push") {
      layout.style.gridTemplateColumns =
        side === "left" ? (isOpen ? `${drawerWidth} auto` : `0 auto`) : isOpen ? `auto ${drawerWidth}` : `auto 0`;
    } else if (variant === "persistent") {
      layout.style.gridTemplateColumns = side === "left" ? `${drawerWidth} auto` : `auto ${drawerWidth}`;
    }
  }

  open() {
    this.setAttribute("open", "");
  }

  close() {
    this.removeAttribute("open");
  }
}

if (!customElements.get("mui-drawer")) {
  customElements.define("mui-drawer", MuiDrawer);
}
