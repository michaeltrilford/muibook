import "../mui-icons/close";
import "../mui-button";

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

  static get observedAttributes() {
    return ["open", "width", "side", "variant", "z-index", "drawer-space"];
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
  }

  private _handleEscape = (e: KeyboardEvent) => {
    const variant = this.getAttribute("variant") || "overlay";
    if (e.key === "Escape" && (variant === "overlay" || variant === "push")) {
      this.close();
    }
  };

  private getDrawerTemplate(hasCloseButton = true) {
    const noPadding = this.hasAttribute("drawer-space") ? "no-padding" : "";

    return /*html*/ `
    <div class="outer">
      <div class="inner" role="complementary">
        <header>
          <slot name="title"></slot>
          ${
            hasCloseButton
              ? `
            <mui-button class="close" variant="tertiary" aria-label="Close drawer">
              <mui-icon-close></mui-icon-close>
            </mui-button>`
              : "<span class='spacer'></span>"
          }
        </header>
        <main class="${noPadding}"><slot></slot></main>
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
      }
      main {
        overflow-y: auto;
        height: 100%;
        padding: var(--space-500);
        box-sizing: border-box;
        will-change: transform, opacity;
      }
      main.no-padding {
        padding: 0;
      }
      
      main.no-heading {
        padding-top: calc(var(--space-500) + env(safe-area-inset-top));
      }

      main.no-padding.no-heading {
        padding-top: env(safe-area-inset-top);
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
        position: fixed;
        bottom: 0;
        width: 100%;
      }
      header[hidden],
      footer[hidden] {
        display: none !important;
      }
    `;

    const overlayStyles = /*css*/ `
      :host([has-header]) main {
        height: calc(100dvh - (7.7rem  + env(safe-area-inset-top) ));
      }

      :host([has-footer]) main {
        height: calc(100dvh - (7.7rem  + env(safe-area-inset-bottom) ));
      }

      :host([has-header][has-footer]) main {
        height: calc(100dvh - ((7.7rem * 2)  + (env(safe-area-inset-top) + env(safe-area-inset-bottom)) ));
      }

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

      .inner {
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
        background: var(--surface-elevated-100);
        width: ${width};
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
      }

      main { height: 100%; }

      :host([has-header]) main,
      :host([has-footer]) main {
        height: calc(100% - 7.7rem);
      }

      :host([has-header][has-footer]) main {
        height: calc(100% - (7.7rem * 2));
      }

      .outer {
        overflow: hidden;
        will-change: transform;
      }


      /* Push */
      :host([variant="push"]) .shell {
        display: grid;
        height: 100%;
        overflow: hidden;
        transition: grid-template-columns var(--speed-100) ease;
      }

      /* Persistent */
      :host([variant="persistent"]) .shell {
        display: grid;
        height: 100%;
        overflow: hidden;
      }

      :host([variant="persistent"]) header .spacer {
        height: 4.4rem;
      }

      /* Hidden & Persistent */
      :host([open]) .outer,
      :host([variant="persistent"]) .outer  { ${outerBorder} }
    `;

    const responsiveStyles = /*css*/ `
      @media (max-width: 768px) {
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

        footer {
          position: fixed;
          bottom: 0;
          width: 100%;
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

        :host([variant="persistent"]) header {
          padding-top: var(--space-400);
        }

        :host([variant="persistent"]) main { height: auto; }

        :host([variant="persistent"]) footer {
          border-bottom-right-radius: var(--radius-200);
          border-bottom-left-radius: var(--radius-200);
          position: static;
          width: 100%;
          padding: var(--space-400) var(--space-500) var(--space-400);
        }

      }

      @media (max-width: 500px) {
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
        <header hidden>
          <slot name="title"></slot>
          <mui-button class="close" variant="tertiary" aria-label="Close drawer">
            <mui-icon-close></mui-icon-close>
          </mui-button>
        </header>
        <main class="${noPadding}">
          <slot></slot>
        </main>
        <footer hidden>
          <slot name="actions"></slot>
        </footer>
      </div>
    `;
    } else if (variant === "push" || variant === "persistent") {
      template = /*html*/ `
        <style>${baseStyles}${pageStyles}${responsiveStyles}</style>
        <div class="shell">
          ${
            side === "left"
              ? this.getDrawerTemplate(showCloseButton) + '<slot name="page"></slot>'
              : '<slot name="page"></slot>' + this.getDrawerTemplate(showCloseButton)
          }
        </div>
      `;
    }

    this.shadowRoot.innerHTML = template;
  }

  private cacheEls() {
    this.innerEl = this.shadowRoot!.querySelector(".inner")!;
    this.overlayEl = this.shadowRoot!.querySelector(".overlay");
    this.footerEl = this.shadowRoot!.querySelector("footer");
    this.actionsSlot = this.shadowRoot!.querySelector('slot[name="actions"]');
    this.outer = this.shadowRoot!.querySelector(".outer");
    this.pushLayout = this.shadowRoot!.querySelector(".shell");
    this.persistentLayout = this.shadowRoot!.querySelector(".shell");
    this.headerEl = this.shadowRoot!.querySelector("header");
    this.headerSlot = this.shadowRoot!.querySelector('slot[name="title"]');
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

    // Add/remove no-heading class on <main>
    const mainEl = this.innerEl.querySelector("main");
    if (mainEl) {
      mainEl.classList.toggle("no-heading", !hasHeader);
    }
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    if (name === "open") this.syncOpenState();
    if (name === "width" && this.innerEl) {
      this.innerEl.style.width = value || "400px";
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
      this.innerEl!.style.zIndex = drawerZ.toString();
      this.inert = !isOpen; // make drawer non-interactive when closed
    }

    // push & persistent layouts
    if (variant === "push" && this.outer) {
      this.updateLayout(variant, isOpen);
      this.outer.style.zIndex = drawerZ.toString();
      this.outer.inert = !isOpen; // only push should disable when closed
    }

    if (variant === "persistent" && this.outer) {
      this.updateLayout(variant, isOpen);
      this.outer.inert = false; // persistent should always be interactive
    }
  }

  private _handleResize = () => {
    const variant = this.getAttribute("variant") || "overlay";
    if (variant === "push" || variant === "persistent") {
      const isOpen = this.hasAttribute("open");
      this.updateLayout(variant, isOpen);
    }
  };

  private updateLayout(variant: string, isOpen: boolean) {
    const drawerWidth = this.getAttribute("width") || "300px";
    const side = this.getAttribute("side") || this._computedSide;
    const layout = variant === "push" ? this.pushLayout : variant === "persistent" ? this.persistentLayout : null;
    if (!layout) return;

    const isMobile = window.innerWidth <= 768;

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
