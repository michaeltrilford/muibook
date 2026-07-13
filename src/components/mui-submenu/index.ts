class MuiSubmenu extends HTMLElement {
  private trigger: HTMLElement | null = null;
  private menu: HTMLElement | null = null;
  private shell: HTMLElement | null = null;
  private bridge: HTMLElement | null = null;
  private observer: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private positionFrameId: number | null = null;

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
  }

  private syncChildren = () => {
    this.trigger = this.querySelector(":scope > mui-button");
    this.menu = this.querySelector(":scope > mui-menu");
    this.trigger?.setAttribute("aria-haspopup", "menu");
    this.trigger?.setAttribute("aria-expanded", "false");

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
    if (this.matches(":focus-within")) return;
    this.clearCloseTimer();
    this.closeTimer = setTimeout(() => {
      if (!this.matches(":hover") && !this.matches(":focus-within")) this.setOpen(false);
    }, 240);
  };

  private handleFocusOut = (event: FocusEvent) => {
    if (event.relatedTarget instanceof Node && this.contains(event.relatedTarget)) return;
    this.clearCloseTimer();
    this.setOpen(false);
  };

  private handleClick = (event: MouseEvent) => {
    const action = event
      .composedPath()
      .find((node): node is HTMLElement => node instanceof HTMLElement && node.tagName.toLowerCase() === "mui-button");
    if (!action) return;

    if (action === this.trigger) {
      if (event.detail > 0) action.blur();
      return;
    }

    if (!this.contains(action)) return;
    if (event.detail > 0) action.blur();
    this.clearCloseTimer();
    this.setOpen(false);
  };

  private setOpen(open: boolean) {
    this.shell?.classList.toggle("open", open);
    this.trigger?.setAttribute("aria-expanded", String(open));
    if (open) this.schedulePositionUpdate();
    else this.clearPositionFrame();
  }

  private handleViewportChange = () => {
    if (this.shell?.classList.contains("open")) this.schedulePositionUpdate();
  };

  private schedulePositionUpdate = () => {
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
    if (!this.menu || !this.shell?.classList.contains("open")) return;

    const viewportMargin = 8;
    const gap = this.resolveLength("--space-050", 4);
    const hostRect = this.getBoundingClientRect();
    const menuRect = this.menu.getBoundingClientRect();
    const availableRight = window.innerWidth - viewportMargin - hostRect.right - gap;
    const availableLeft = hostRect.left - viewportMargin - gap;
    const prefersRight = getComputedStyle(this).direction !== "rtl";
    const preferredSpace = prefersRight ? availableRight : availableLeft;
    const alternateSpace = prefersRight ? availableLeft : availableRight;
    const usePreferredSide = menuRect.width <= preferredSpace || preferredSpace >= alternateSpace;
    const placeRight = prefersRight ? usePreferredSide : !usePreferredSide;

    const preferredViewportLeft = placeRight ? hostRect.right + gap : hostRect.left - menuRect.width - gap;
    const maximumViewportLeft = Math.max(viewportMargin, window.innerWidth - viewportMargin - menuRect.width);
    const viewportLeft = Math.max(viewportMargin, Math.min(preferredViewportLeft, maximumViewportLeft));
    this.menu.style.left = `${viewportLeft - hostRect.left}px`;
    this.menu.style.right = "auto";
    this.bridge?.classList.toggle("left", !placeRight);

    const minimumTop = viewportMargin - hostRect.top;
    const maximumTop = window.innerHeight - viewportMargin - hostRect.top - menuRect.height;
    this.menu.style.top = `${Math.max(minimumTop, Math.min(0, maximumTop))}px`;
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
          z-index: 3;
          top: 0;
          left: calc(100% + var(--space-050));
          max-inline-size: calc(100vw - var(--space-400));
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
          transition: opacity 120ms ease, visibility 120ms ease;
        }

        .shell.open ::slotted(mui-menu) {
          visibility: visible;
          opacity: 1;
          pointer-events: auto;
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
