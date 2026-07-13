class MuiSubmenu extends HTMLElement {
  private static portalStylesInjected = false;
  private trigger: HTMLElement | null = null;
  private menu: HTMLElement | null = null;
  private shell: HTMLElement | null = null;
  private bridge: HTMLElement | null = null;
  private portal: HTMLElement | null = null;
  private originalNextSibling: Node | null = null;
  private observer: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private positionFrameId: number | null = null;
  private isPortaling = false;

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
    this.shell = this.shadowRoot?.querySelector(".shell") || null;
    this.bridge = this.shadowRoot?.querySelector(".bridge") || null;
    this.addEventListener("pointerenter", this.handleOpen);
    this.addEventListener("pointerleave", this.handlePointerLeave);
    this.addEventListener("focusin", this.handleOpen);
    this.addEventListener("focusout", this.handleFocusOut);
    this.addEventListener("click", this.handleClick);
    window.addEventListener("resize", this.handleViewportChange);
    window.addEventListener("scroll", this.handleViewportChange, true);
    this.observer = new MutationObserver(this.syncChildren);
    this.observer.observe(this, { childList: true });
    this.syncChildren();
  }

  disconnectedCallback() {
    this.removeEventListener("pointerenter", this.handleOpen);
    this.removeEventListener("pointerleave", this.handlePointerLeave);
    this.removeEventListener("focusin", this.handleOpen);
    this.removeEventListener("focusout", this.handleFocusOut);
    this.removeEventListener("click", this.handleClick);
    window.removeEventListener("resize", this.handleViewportChange);
    window.removeEventListener("scroll", this.handleViewportChange, true);
    this.observer?.disconnect();
    this.observer = null;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.clearCloseTimer();
    this.clearPositionFrame();
    this.restoreMenu();
  }

  private syncChildren = () => {
    this.trigger = this.querySelector(":scope > mui-button");
    if (!this.isPortaling) this.menu = this.querySelector(":scope > mui-menu");
    this.trigger?.setAttribute("aria-haspopup", "menu");
    this.trigger?.setAttribute("aria-expanded", this.shell?.classList.contains("open") ? "true" : "false");

    this.resizeObserver?.disconnect();
    if (typeof ResizeObserver !== "undefined" && this.menu) {
      this.resizeObserver = new ResizeObserver(this.schedulePositionUpdate);
      this.resizeObserver.observe(this.menu);
    }
  };

  private handleOpen = () => {
    this.clearCloseTimer();
    this.setOpen(true);
  };

  private handlePointerLeave = () => {
    this.scheduleClose();
  };

  private handlePortalPointerEnter = () => {
    this.clearCloseTimer();
  };

  private handlePortalPointerLeave = () => {
    this.scheduleClose();
  };

  private scheduleClose() {
    if (this.hasActiveInteraction()) return;
    this.clearCloseTimer();
    this.closeTimer = setTimeout(() => {
      if (!this.hasActiveInteraction()) this.setOpen(false);
    }, 240);
  }

  private hasActiveInteraction() {
    const focused = document.activeElement;
    return (
      this.matches(":hover") ||
      this.matches(":focus-within") ||
      Boolean(this.portal?.matches(":hover")) ||
      Boolean(focused && this.portal?.contains(focused))
    );
  }

  private handleFocusOut = (event: FocusEvent) => {
    const next = event.relatedTarget;
    if (next instanceof Node && (this.contains(next) || Boolean(this.portal?.contains(next)))) return;
    this.clearCloseTimer();
    this.setOpen(false);
  };

  private handleClick = (event: MouseEvent) => {
    const action = this.findAction(event);
    if (!action) return;

    if (action === this.trigger) {
      if (event.detail > 0) action.blur();
      return;
    }

    if (event.detail > 0) action.blur();
    this.clearCloseTimer();
    this.setOpen(false);
  };

  private handlePortalClick = (event: MouseEvent) => {
    const action = this.findAction(event);
    if (!action) return;
    if (event.detail > 0) action.blur();
    this.clearCloseTimer();
    this.setOpen(false);
  };

  private findAction(event: Event) {
    return (
      event
        .composedPath()
        .find((node): node is HTMLElement => node instanceof HTMLElement && node.tagName.toLowerCase() === "mui-button") || null
    );
  }

  private setOpen(open: boolean) {
    if (open) {
      if (!this.menu) return;
      this.shell?.classList.add("open");
      this.trigger?.setAttribute("aria-expanded", "true");
      this.portalMenu();
      this.schedulePositionUpdate();
      return;
    }

    this.shell?.classList.remove("open");
    this.trigger?.setAttribute("aria-expanded", "false");
    this.clearPositionFrame();
    this.restoreMenu();
  }

  private portalMenu() {
    if (!this.menu || this.portal) return;

    this.ensurePortalStyles();
    this.syncPortalStyles();
    this.originalNextSibling = this.menu.nextSibling;
    this.portal = document.createElement("div");
    this.portal.className = "mui-submenu-portal";
    this.portal.addEventListener("pointerenter", this.handlePortalPointerEnter);
    this.portal.addEventListener("pointerleave", this.handlePortalPointerLeave);
    this.portal.addEventListener("focusout", this.handleFocusOut);
    this.portal.addEventListener("click", this.handlePortalClick);

    this.isPortaling = true;
    this.portal.appendChild(this.menu);
    document.body.appendChild(this.portal);
    this.syncPortalStyles();
  }

  private restoreMenu() {
    if (!this.menu || !this.portal) return;

    this.portal.removeEventListener("pointerenter", this.handlePortalPointerEnter);
    this.portal.removeEventListener("pointerleave", this.handlePortalPointerLeave);
    this.portal.removeEventListener("focusout", this.handleFocusOut);
    this.portal.removeEventListener("click", this.handlePortalClick);

    this.menu.style.removeProperty("position");
    this.menu.style.removeProperty("top");
    this.menu.style.removeProperty("right");
    this.menu.style.removeProperty("bottom");
    this.menu.style.removeProperty("left");
    this.menu.style.removeProperty("visibility");
    this.menu.style.removeProperty("opacity");
    this.menu.style.removeProperty("pointer-events");
    this.menu.style.removeProperty("max-inline-size");

    if (this.originalNextSibling?.parentNode === this) this.insertBefore(this.menu, this.originalNextSibling);
    else this.appendChild(this.menu);

    this.portal.remove();
    this.portal = null;
    this.originalNextSibling = null;
    this.isPortaling = false;
  }

  private ensurePortalStyles() {
    if (MuiSubmenu.portalStylesInjected) return;
    const style = document.createElement("style");
    style.textContent = `
      .mui-submenu-portal {
        position: fixed;
        z-index: 2;
        display: block;
        width: max-content;
        max-width: calc(100vw - 16px);
        box-sizing: border-box;
      }

      .mui-submenu-portal > mui-menu {
        position: static !important;
        max-width: 100%;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(style);
    MuiSubmenu.portalStylesInjected = true;
  }

  private syncPortalStyles() {
    if (!this.portal) return;
    const styles = getComputedStyle(this);
    for (const property of styles) {
      if (!property.startsWith("--")) continue;
      const value = styles.getPropertyValue(property);
      if (value) this.portal.style.setProperty(property, value);
    }
    this.portal.style.fontFamily = styles.fontFamily;
    this.portal.style.color = styles.color;
  }

  private handleViewportChange = () => {
    if (this.shell?.classList.contains("open")) this.schedulePositionUpdate();
  };

  private schedulePositionUpdate = () => {
    if (!this.portal) return;
    this.clearPositionFrame();
    this.positionFrameId = requestAnimationFrame(() => {
      this.positionFrameId = null;
      this.adjustPosition();
    });
  };

  private clearPositionFrame() {
    if (this.positionFrameId === null) return;
    cancelAnimationFrame(this.positionFrameId);
    this.positionFrameId = null;
  }

  private adjustPosition() {
    if (!this.menu || !this.portal || !this.shell?.classList.contains("open")) return;

    const viewportMargin = 8;
    const gap = this.resolveLength("--space-050", 4);
    const maximumWidth = window.innerWidth - viewportMargin * 2;
    this.portal.style.width = `${maximumWidth}px`;
    const menuRect = this.menu.getBoundingClientRect();
    const menuWidth = Math.min(menuRect.width, maximumWidth);
    this.portal.style.width = `${menuWidth}px`;

    const hostRect = this.getBoundingClientRect();
    const availableRight = window.innerWidth - viewportMargin - hostRect.right - gap;
    const availableLeft = hostRect.left - viewportMargin - gap;
    const prefersRight = getComputedStyle(this).direction !== "rtl";
    const preferredSpace = prefersRight ? availableRight : availableLeft;
    const alternateSpace = prefersRight ? availableLeft : availableRight;
    const usePreferredSide = menuWidth <= preferredSpace || preferredSpace >= alternateSpace;
    const placeRight = prefersRight ? usePreferredSide : !usePreferredSide;
    const preferredLeft = placeRight ? hostRect.right + gap : hostRect.left - menuWidth - gap;
    const maximumLeft = Math.max(viewportMargin, window.innerWidth - viewportMargin - menuWidth);
    const left = Math.max(viewportMargin, Math.min(preferredLeft, maximumLeft));
    this.portal.style.left = `${left}px`;
    this.bridge?.classList.toggle("left", !placeRight);

    const menuHeight = this.menu.getBoundingClientRect().height;
    const maximumTop = Math.max(viewportMargin, window.innerHeight - viewportMargin - menuHeight);
    const top = Math.max(viewportMargin, Math.min(hostRect.top, maximumTop));
    this.portal.style.top = `${top}px`;
  }

  private resolveLength(property: string, fallback: number) {
    const value = getComputedStyle(this).getPropertyValue(property).trim();
    if (!value) return fallback;

    const probe = document.createElement("span");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.width = value;
    this.shadowRoot?.appendChild(probe);
    const resolved = probe.getBoundingClientRect().width;
    probe.remove();
    return resolved || fallback;
  }

  private clearCloseTimer() {
    if (this.closeTimer === null) return;
    clearTimeout(this.closeTimer);
    this.closeTimer = null;
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          position: relative;
          z-index: 0;
        }

        :host(:hover),
        :host(:focus-within) {
          z-index: 2;
        }

        .bridge {
          position: absolute;
          z-index: 2;
          inset-block: 0;
          inset-inline-start: 100%;
          width: var(--space-050);
        }

        .bridge.left {
          inset-inline-start: auto;
          inset-inline-end: 100%;
        }

        .shell {
          display: contents;
        }

        ::slotted(mui-button) {
          width: 100%;
        }

        ::slotted(mui-menu) {
          position: absolute;
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
        }
      </style>
      <span class="shell"><span class="bridge" aria-hidden="true"></span><slot></slot></span>
    `;
  }
}

if (!customElements.get("mui-submenu")) {
  customElements.define("mui-submenu", MuiSubmenu);
}

export { MuiSubmenu };
