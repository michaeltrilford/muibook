import "../mui-menu";

class MuiDropdown extends HTMLElement {
  static openDropdown: MuiDropdown | null = null;
  private static portalStyleRoots = new WeakSet<Document | ShadowRoot>();
  private button: HTMLElement | null = null;
  private menu: HTMLElement | null = null;
  private portalMenu: HTMLElement | null = null;
  private portalInner: HTMLElement | null = null;
  private portalDialog: HTMLDialogElement | null = null;
  private portalDrawer: HTMLElement | null = null;
  private drawerLayerObserver: MutationObserver | null = null;
  private portaledItems: HTMLElement[] = [];
  private originalNextSibling = new Map<HTMLElement, Node | null>();
  private positionFrameId: number | null = null;
  private positionTimeoutIds: number[] = [];
  private closeTimeoutId: number | null = null;
  private menuResizeObserver: ResizeObserver | null = null;
  private resizePositionFrameId: number | null = null;
  private hasAuthoredSize = this.hasAttribute("size");

  private get activeMenu() {
    return this.portalMenu || this.menu;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      const menu = this.activeMenu;
      if (!menu || !menu.classList.contains("show")) return;
      event.preventDefault();

      // Close menu visually
      menu.classList.remove("show");

      // Restore inert
      menu.setAttribute("inert", "true");
      this.restorePortalItems();

      // Clear open dropdown if needed
      if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
      this.button?.setAttribute("aria-expanded", "false");
      this.button?.focus();

      // Fire event
      this.dispatchEvent(
        new CustomEvent("dropdown-toggle", {
          detail: { open: false },
          bubbles: true,
        })
      );
    }
  }

  close() {
    const menu = this.activeMenu;
    if (!menu || !menu.classList.contains("show")) return;

    // Close menu visually
    menu.classList.remove("show");

    // Restore inert
    menu.setAttribute("inert", "true");
    this.restorePortalItems();

    // Clear open dropdown if needed
    if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
    this.button?.setAttribute("aria-expanded", "false");
    this.button?.focus();

    // Fire event
    this.dispatchEvent(
      new CustomEvent("dropdown-toggle", {
        detail: { open: false },
        bubbles: true,
      })
    );
  }

  private handleResize = () => {
    if (this.activeMenu?.classList.contains("show")) {
      this.closeMenu();
    }
  };

  private handleScroll = () => {
    if (this.activeMenu?.classList.contains("show")) {
      this.adjustPosition();
    }
  };

  private scheduleResizePositionUpdate() {
    if (this.resizePositionFrameId !== null) return;

    this.resizePositionFrameId = requestAnimationFrame(() => {
      this.resizePositionFrameId = null;
      if (this.activeMenu?.classList.contains("show")) this.adjustPosition();
    });
  }

  private clearPositionSchedules() {
    if (this.positionFrameId !== null) {
      cancelAnimationFrame(this.positionFrameId);
      this.positionFrameId = null;
    }

    this.positionTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    this.positionTimeoutIds = [];

    if (this.resizePositionFrameId !== null) {
      cancelAnimationFrame(this.resizePositionFrameId);
      this.resizePositionFrameId = null;
    }
  }

  private schedulePositionUpdate() {
    this.clearPositionSchedules();

    let frameCount = 0;
    const reposition = () => {
      if (!this.activeMenu?.classList.contains("show")) {
        this.positionFrameId = null;
        return;
      }

      this.adjustPosition(frameCount === 0);
      frameCount += 1;

      if (frameCount < 4) {
        this.positionFrameId = requestAnimationFrame(reposition);
      } else {
        this.positionFrameId = null;
      }
    };

    this.positionFrameId = requestAnimationFrame(reposition);
    [80, 180, 320].forEach((delay) => {
      const timeoutId = window.setTimeout(() => {
        this.positionTimeoutIds = this.positionTimeoutIds.filter((id) => id !== timeoutId);
        if (this.activeMenu?.classList.contains("show")) this.adjustPosition();
      }, delay);
      this.positionTimeoutIds.push(timeoutId);
    });
  }

  private handleFocusOut = (event: FocusEvent) => {
    if (this.persistent) return; // skip closing if attribute is present

    const relatedTarget = event.relatedTarget as Node | null;
    if (!this.contains(relatedTarget) && !this.portalMenu?.contains(relatedTarget)) {
      this.closeWithAnimation();
      this.activeMenu?.setAttribute("inert", "true");
      if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
      this.button?.setAttribute("aria-expanded", "false");
      this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
    }
  };

  private handleActionKeyDown = (event: KeyboardEvent) => {
    // Intercept Tab to move focus into the menu when open
    if (event.key === "Tab" && !event.shiftKey && this.activeMenu?.classList.contains("show")) {
      event.preventDefault();
      this.focusFirstItem();
      return;
    }

    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    this.toggleMenu(event);
  };

  private focusFirstItem() {
    const root = this.portalInner || this.menu;
    if (!root) return;

    const getFirstFocusable = (node: HTMLElement | DocumentFragment): HTMLElement | null => {
      const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

      if (node instanceof HTMLElement && node.matches(focusableSelector)) {
        return node;
      }

      const children = node.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;

        if (child.shadowRoot) {
          const found = getFirstFocusable(child.shadowRoot);
          if (found) return found;
        }

        if (child.tagName === 'SLOT') {
          const assigned = (child as HTMLSlotElement).assignedElements({ flatten: true });
          for (const assignedEl of assigned) {
             if (assignedEl instanceof HTMLElement) {
               const found = getFirstFocusable(assignedEl);
               if (found) return found;
             }
          }
        }

        if (child.matches(focusableSelector)) {
          return child;
        }

        const foundInChild = getFirstFocusable(child);
        if (foundInChild) return foundInChild;
      }
      return null;
    };

    const first = getFirstFocusable(root);
    if (first) {
      first.focus();
    }
  }

  static get observedAttributes() {
    return ["zindex", "position", "vertical-position", "persistent", "size", "offset", "usage"];
  }

  get persistent() {
    return this.hasAttribute("persistent");
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "zindex" && this.menu) {
      this.menu.style.zIndex = newValue ?? "1";
      if (this.portalMenu) this.syncPortalLayer();
    }

    if ((name === "position" || name === "vertical-position" || name === "offset") && this.menu) {
      this.adjustPosition();
    }

    if (name === "size" || name === "usage") this.syncSize();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this.render();

    // Get the dropdown menu container
    this.menu = this.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement | null;

    // Apply initial z-index from attribute or default
    const zIndex = this.getAttribute("zindex") || "1";
    if (this.menu) this.menu.style.zIndex = zIndex;

    // INERT
    if (this.menu) {
      this.menu.setAttribute("inert", "true"); // inert by default
    }

    this.menu?.addEventListener("focusout", this.handleFocusOut);

    // Force variant="tertiary" on all default slot actions (dropdown options)
    const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;

    if (defaultSlot) {
      const updateButtons = () => {
        const optionNodes = defaultSlot.assignedElements({ flatten: true }) as HTMLElement[];
        const optionItems = optionNodes.flatMap((el) => {
          if (el.tagName.toLowerCase() === "mui-menu") {
            return Array.from(el.querySelectorAll(":scope > mui-button, :scope > mui-link")) as HTMLElement[];
          }
          const tagName = el.tagName.toLowerCase();
          return tagName === "mui-button" || tagName === "mui-link" ? [el] : [];
        });
        optionItems.forEach((item) => {
          // click listener once
          if (!(item as any)._dropdownListenerAdded) {
            item.addEventListener("click", () => {
              if (!this.persistent) {
                this.activeMenu?.classList.remove("show");
                this.activeMenu?.setAttribute("inert", "true");
                this.restorePortalItems();
                if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
                this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
                this.button?.focus();
              }
            });
            (item as any)._dropdownListenerAdded = true;
          }
        });
        this.syncSize();
      };

      defaultSlot.addEventListener("slotchange", updateButtons);

      // run initially in case nodes already exist
      updateButtons();
    }

    // Bind event listeners for the trigger button
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    // Get the slotted trigger action. Button is still supported, but other
    // components such as Status can also act as the visible trigger.
    const actionSlot = this.shadowRoot?.querySelector('slot[name="action"]') as HTMLSlotElement | null;
    const syncActionTrigger = () => {
      this.button?.removeEventListener("click", this.toggleMenu);
      this.button?.removeEventListener("keydown", this.handleActionKeyDown);

      const assignedActionNodes = actionSlot?.assignedElements({ flatten: true }) || [];
      this.button = assignedActionNodes.find((node) => node instanceof HTMLElement) as HTMLElement | null;
      if (!this.button) return;

      const tagName = this.button.tagName.toLowerCase();
      const isNativeTrigger = tagName === "mui-button" || tagName === "button" || tagName === "a" || tagName === "mui-input";
      if (!isNativeTrigger) {
        if (!this.button.hasAttribute("tabindex")) this.button.setAttribute("tabindex", "0");
        this.button.setAttribute("role", "button");
      }
      this.button.setAttribute("aria-haspopup", "menu");
      this.button.setAttribute("aria-expanded", this.menu?.classList.contains("show") ? "true" : "false");
      this.button.addEventListener("click", this.toggleMenu);
      this.button.addEventListener("keydown", this.handleActionKeyDown);
      this.syncSize();
    };
    actionSlot?.addEventListener("slotchange", syncActionTrigger);
    syncActionTrigger();
    this.syncSize();

    document.addEventListener("click", this.closeMenu);
    document.addEventListener("keydown", this.handleKeyDown); // ESC listener

    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll, true); // capture scroll on parents
  }

  private syncSize() {
    const requestedSize = this.getAttribute("size");
    const size = requestedSize && ["x-small", "small", "medium", "large"].includes(requestedSize) ? requestedSize : "medium";
    if (requestedSize !== size) {
      this.setAttribute("size", size);
      return;
    }
    this.button?.setAttribute("size", size);
    if (this.getAttribute("usage") === "header-bar") this.button?.setAttribute("usage", "header-bar");
    Array.from(this.children).forEach((child) => {
      if (child.tagName.toLowerCase() === "mui-menu") child.setAttribute("size", size);
    });
  }

  applyHeaderBarContext(size: string) {
    this.setAttribute("usage", "header-bar");
    if (!this.hasAuthoredSize && ["x-small", "small", "medium", "large"].includes(size)) {
      this.setAttribute("size", size);
    }
    this.syncSize();
  }

  disconnectedCallback() {
    this.button?.removeEventListener("click", this.toggleMenu);
    this.button?.removeEventListener("keydown", this.handleActionKeyDown);
    this.clearPositionSchedules();
    this.menuResizeObserver?.disconnect();
    this.menuResizeObserver = null;
    document.removeEventListener("click", this.closeMenu);
    document.removeEventListener("keydown", this.handleKeyDown);

    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll, true);

    this.menu?.removeEventListener("focusout", this.handleFocusOut);
    this.restorePortalItems();
  }

  closeWithAnimation() {
    const menu = this.activeMenu;
    if (!menu?.classList.contains("show")) return;

    menu.classList.remove("show");
    this.button?.setAttribute("aria-expanded", "false");

    // wait for transition to finish before hiding
    const duration = 150; // must match CSS transition time
    if (this.closeTimeoutId !== null) window.clearTimeout(this.closeTimeoutId);
    this.closeTimeoutId = window.setTimeout(() => {
      this.closeTimeoutId = null;
      const currentMenu = this.activeMenu;
      if (!currentMenu) return;
      if (!currentMenu.classList.contains("show")) {
        currentMenu.style.display = "none"; // hide fully AFTER animation
        this.restorePortalItems();
      }
    }, duration);
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    if (!this.menu) return;

    const isOpen = this.activeMenu?.classList.contains("show");

    // Close any other open dropdown first
    if (!isOpen && MuiDropdown.openDropdown && MuiDropdown.openDropdown !== this) {
      MuiDropdown.openDropdown.closeWithAnimation();
    }

    if (isOpen) {
      this.closeWithAnimation();
      this.activeMenu?.setAttribute("inert", "true"); // restore inert when closing
      if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
      this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
    } else {
      this.portalItems();
      const menu = this.activeMenu;
      if (!menu) return;
      menu.style.display = "block"; // restore for transitions; stay visually hidden until positioned
      if (this.portalDialog && this.portalMenu?.hasAttribute("popover")) {
        try {
          this.portalMenu.showPopover();
        } catch {
          // The dialog may have closed between resolving and opening the portal.
        }
      }
      this.adjustPosition(true);
      requestAnimationFrame(() => {
        menu.classList.add("show");
        menu.removeAttribute("inert"); // enable interaction
        this.schedulePositionUpdate();
      });
      this.button?.setAttribute("aria-expanded", "true");
      MuiDropdown.openDropdown = this;
      this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: true }, bubbles: true }));
    }
  }

  closeMenu(event?: Event) {
    if (event) {
      const path = event.composedPath(); // array of nodes the event passes through

      // If click was inside menu or button, ignore
      if (this.menu && path.includes(this.menu)) return;
      if (this.portalMenu && path.includes(this.portalMenu)) return;
      if (path.some((node) => node instanceof HTMLElement && node.classList.contains("mui-dropdown-portal"))) return;
      if (this.button && path.includes(this.button)) return;
    }

    if (!this.activeMenu?.classList.contains("show")) return;

    // Otherwise, close
    this.closeWithAnimation();
    this.activeMenu?.setAttribute("inert", "true");
    if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
    this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
  }

  private portalItems() {
    const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;
    const items = (defaultSlot?.assignedElements({ flatten: true }) || []) as HTMLElement[];
    const menus = items.filter((item) => item.tagName.toLowerCase() === "mui-menu");
    if (!menus.length) return;

    const portalDialog = this.resolveModalDialog();
    const portalDrawer = portalDialog ? null : this.resolveDrawer();
    const portalRoot = portalDialog || document.body;
    const styleRoot = portalRoot.getRootNode() as Document | ShadowRoot;
    this.ensurePortalStyles(styleRoot);
    if (!this.portalMenu) {
      this.portalMenu = document.createElement("div");
      this.portalMenu.className = "mui-dropdown-portal";
      this.portalMenu.setAttribute("inert", "true");
      this.portalDrawer = portalDrawer;
      this.syncPortalLayer();
      if (portalDialog && "showPopover" in this.portalMenu) {
        this.portalMenu.setAttribute("popover", "manual");
      }

      const createGuard = () => {
        const guard = document.createElement("div");
        guard.tabIndex = 0;
        guard.style.position = "absolute";
        guard.style.opacity = "0";
        guard.style.pointerEvents = "none";
        guard.addEventListener("focus", () => {
          if (!this.persistent) {
            this.activeMenu?.classList.remove("show");
            this.activeMenu?.setAttribute("inert", "true");
            this.restorePortalItems();
            if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
            this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
          }
          this.button?.focus();
        });
        return guard;
      };

      this.portalMenu.appendChild(createGuard());

      this.portalInner = document.createElement("div");
      this.portalInner.className = "inner";
      this.portalMenu.appendChild(this.portalInner);

      this.portalMenu.appendChild(createGuard());

      this.portalMenu.addEventListener("focusout", this.handleFocusOut);
      this.portalDialog = portalDialog;
      this.portalDialog?.addEventListener("close", this.handlePortalDialogClose);
      if (this.portalDrawer && !this.hasAttribute("zindex")) {
        this.drawerLayerObserver = new MutationObserver(() => this.syncPortalLayer());
        this.drawerLayerObserver.observe(this.portalDrawer, { attributes: true, attributeFilter: ["z-index"] });
      }
      portalRoot.appendChild(this.portalMenu);
    }
    this.syncPortalStyles();

    this.portaledItems = menus;
    menus.forEach((item) => {
      if (!this.originalNextSibling.has(item)) {
        this.originalNextSibling.set(item, item.nextSibling);
      }
      this.portalInner?.appendChild(item);
    });

    if (typeof ResizeObserver !== "undefined") {
      this.menuResizeObserver?.disconnect();
      this.menuResizeObserver = new ResizeObserver(() => {
        this.scheduleResizePositionUpdate();
      });
      menus.forEach((menu) => this.menuResizeObserver?.observe(menu));
    }
  }

  private restorePortalItems() {
    if (!this.portalMenu) return;

    if (this.closeTimeoutId !== null) {
      window.clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
    }
    this.clearPositionSchedules();
    this.menuResizeObserver?.disconnect();
    this.menuResizeObserver = null;

    this.portaledItems.forEach((item) => {
      item.style.removeProperty("--dropdown-measured-menu-width");
      const nextSibling = this.originalNextSibling.get(item);
      if (nextSibling && nextSibling.parentNode === this) {
        this.insertBefore(item, nextSibling);
      } else {
        this.appendChild(item);
      }
    });
    this.portaledItems = [];
    this.originalNextSibling.clear();
    if (this.portalMenu.hasAttribute("popover")) {
      try {
        if (this.portalMenu.matches(":popover-open")) this.portalMenu.hidePopover();
      } catch {
        // Older browsers may not support the popover selector or methods.
      }
    }
    this.portalMenu.removeEventListener("focusout", this.handleFocusOut);
    this.portalDialog?.removeEventListener("close", this.handlePortalDialogClose);
    this.drawerLayerObserver?.disconnect();
    this.drawerLayerObserver = null;
    this.portalMenu.remove();
    this.portalMenu = null;
    this.portalInner = null;
    this.portalDialog = null;
    this.portalDrawer = null;
  }

  private handlePortalDialogClose = () => {
    if (this.activeMenu?.classList.contains("show")) {
      this.close();
      return;
    }

    const wasOpening = this.button?.getAttribute("aria-expanded") === "true";
    this.restorePortalItems();
    if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
    this.button?.setAttribute("aria-expanded", "false");
    if (wasOpening) {
      this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
    }
  };

  private isModalDialog(dialog: HTMLDialogElement) {
    if (!dialog.open) return false;
    try {
      return dialog.matches(":modal");
    } catch {
      return dialog.open;
    }
  }

  private resolveModalDialog() {
    let node: Node | null = this;

    while (node) {
      if (node instanceof HTMLDialogElement && this.isModalDialog(node)) return node;

      if (node instanceof HTMLElement && node.tagName.toLowerCase() === "mui-dialog") {
        const internalDialog = node.shadowRoot?.querySelector("dialog") as HTMLDialogElement | null;
        if (internalDialog && this.isModalDialog(internalDialog)) return internalDialog;
      }

      if (node instanceof HTMLElement && node.assignedSlot) {
        node = node.assignedSlot;
      } else if (node.parentNode instanceof ShadowRoot) {
        node = node.parentNode.host;
      } else {
        node = node.parentNode;
      }
    }

    return null;
  }

  private resolveDrawer() {
    let node: Node | null = this;

    while (node) {
      if (node instanceof HTMLElement && node.tagName.toLowerCase() === "mui-drawer") return node;

      if (node instanceof HTMLElement && node.assignedSlot) {
        node = node.assignedSlot;
      } else if (node.parentNode instanceof ShadowRoot) {
        node = node.parentNode.host;
      } else {
        node = node.parentNode;
      }
    }

    return null;
  }

  private resolveDrawerPortalLayer(drawer: HTMLElement) {
    const layerCandidates = [
      drawer,
      ...Array.from(drawer.shadowRoot?.querySelectorAll<HTMLElement>(".inner, .outer, .workspace-panel") || []),
    ];
    const layers = layerCandidates
      .map((candidate) => Number.parseFloat(getComputedStyle(candidate).zIndex))
      .filter(Number.isFinite);

    if (layers.length) return Math.max(...layers) + 1;

    const authoredLayer = Number.parseFloat(drawer.getAttribute("z-index") || "");
    return Number.isFinite(authoredLayer) ? authoredLayer + 2 : 12;
  }

  private syncPortalLayer() {
    if (!this.portalMenu) return;

    const authoredLayer = this.getAttribute("zindex");
    if (authoredLayer) {
      this.portalMenu.style.zIndex = authoredLayer;
      return;
    }

    this.portalMenu.style.zIndex = this.portalDrawer
      ? this.resolveDrawerPortalLayer(this.portalDrawer).toString()
      : "1";
  }

  private ensurePortalStyles(root: Document | ShadowRoot) {
    if (MuiDropdown.portalStyleRoots.has(root)) return;

    const style = document.createElement("style");
    style.textContent = `
      .mui-dropdown-portal {
        display: none;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-0.25rem);
        transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s linear 0.15s;
        position: fixed;
        z-index: 1;
        box-sizing: border-box;
        width: max-content;
        max-width: calc(100vw - 16px);
      }
      .mui-dropdown-portal[popover] {
        inset: auto;
        margin: 0;
        padding: 0;
        border: 0;
        overflow: visible;
        color: inherit;
        background: transparent;
      }
      .mui-dropdown-portal.show {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
      .mui-dropdown-portal .inner {
        display: inline-block;
        width: max-content;
        max-width: 100%;
      }
      .mui-dropdown-portal .inner > mui-menu {
        max-width: 100%;
      }
      .mui-dropdown-portal .inner > mui-menu:not([width]) {
        --menu-width-current: var(--dropdown-measured-menu-width, max-content);
      }
      .mui-dropdown-portal mui-button,
      .mui-dropdown-portal mui-link {
        width: 100%;
        text-align: left;
      }
      .mui-dropdown-portal mui-button:focus,
      .mui-dropdown-portal mui-link:focus {
        z-index: 1;
      }
    `;
    if (root instanceof Document) root.head.appendChild(style);
    else root.appendChild(style);
    MuiDropdown.portalStyleRoots.add(root);
  }

  private syncPortalStyles() {
    if (!this.portalMenu) return;

    const styles = window.getComputedStyle(this);
    [
      "--menu-background",
      "--menu-border-color",
      "--menu-min-width",
      "--menu-width",
      "--menu-radius",
      "--menu-shadow-color",
      "--action-tertiary-background",
      "--action-tertiary-background-hover",
      "--action-tertiary-background-focus",
      "--action-tertiary-border",
      "--action-tertiary-border-hover",
      "--action-tertiary-border-focus",
      "--action-tertiary-text-color",
      "--action-tertiary-text-color-hover",
      "--action-tertiary-text-color-focus",
    ].forEach((property) => {
      const value = styles.getPropertyValue(property);
      if (value) this.portalMenu?.style.setProperty(property, value);
    });
  }

  private resolveCssLength(value: string, fallback: number) {
    const probe = document.createElement("div");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.width = value;
    const accepted = Boolean(probe.style.width);
    this.shadowRoot?.appendChild(probe);
    const resolved = probe.getBoundingClientRect().width;
    probe.remove();
    return accepted ? resolved : fallback;
  }

  private measurePortalWidth(maxMenuWidth: number) {
    if (!this.portalMenu || !this.portalInner) return;

    // Percentage Menu widths need a definite available width while measuring.
    // A Menu without an authored width temporarily resolves to max-content so
    // its longest action, including icons, gaps, padding, and inset, determines
    // the surface width before it is clamped to the available viewport.
    // The final width is written only once, before ResizeObserver position-only
    // updates, so the observer cannot alternate its own target's width.
    this.portalMenu.style.width = "";
    this.portalInner.style.width = `${maxMenuWidth}px`;

    const menuSurface = this.portalInner.querySelector(":scope > mui-menu") as HTMLElement | null;
    menuSurface?.style.removeProperty("--dropdown-measured-menu-width");

    let surfaceWidth = 0;
    if (menuSurface?.hasAttribute("width")) {
      surfaceWidth = menuSurface.getBoundingClientRect().width;
    } else if (menuSurface) {
      const intrinsicItems = Array.from(menuSurface.children)
        .filter((item): item is HTMLElement => item instanceof HTMLElement && item.tagName.toLowerCase() !== "mui-rule");
      const itemWidths = intrinsicItems.map((item) => ({
        item,
        width: item.style.width,
        maxWidth: item.style.maxWidth,
        releaseWidth: !item.hasAttribute("width"),
      }));

      let widestItem = 0;
      try {
        itemWidths.forEach(({ item, releaseWidth }) => {
          if (!releaseWidth) return;
          item.style.width = "max-content";
          item.style.maxWidth = "none";
        });
        widestItem = itemWidths.reduce(
          (widest, { item }) => Math.max(widest, item.getBoundingClientRect().width),
          0,
        );
      } finally {
        itemWidths.forEach(({ item, width, maxWidth, releaseWidth }) => {
          if (!releaseWidth) return;
          if (width) item.style.width = width;
          else item.style.removeProperty("width");
          if (maxWidth) item.style.maxWidth = maxWidth;
          else item.style.removeProperty("max-width");
        });
      }

      const menuStyles = getComputedStyle(menuSurface);
      const content = menuSurface.shadowRoot?.querySelector(".content") as HTMLElement | null;
      const contentStyles = content ? getComputedStyle(content) : null;
      const horizontalChrome = (Number.parseFloat(menuStyles.borderInlineStartWidth) || 0)
        + (Number.parseFloat(menuStyles.borderInlineEndWidth) || 0)
        + (Number.parseFloat(contentStyles?.paddingInlineStart || "") || 0)
        + (Number.parseFloat(contentStyles?.paddingInlineEnd || "") || 0);
      const minimumWidth = Number.parseFloat(menuStyles.minWidth) || 0;
      surfaceWidth = Math.max(widestItem + horizontalChrome, minimumWidth);
    }

    if (surfaceWidth <= 0) return;

    const resolvedWidth = Math.min(surfaceWidth, maxMenuWidth);
    const resolvedValue = `${resolvedWidth}px`;
    if (menuSurface && !menuSurface.hasAttribute("width")) {
      menuSurface.style.setProperty("--dropdown-measured-menu-width", resolvedValue);
    }
    if (this.portalMenu.style.width !== resolvedValue) this.portalMenu.style.width = resolvedValue;
    if (this.portalInner.style.width !== resolvedValue) this.portalInner.style.width = resolvedValue;
  }

  adjustPosition(measureWidth = false) {
    const menu = this.activeMenu;
    if (!menu) return;

    const margin = 8; // viewport inset
    const offsetRaw = this.getAttribute("offset")?.trim()
      || getComputedStyle(this).getPropertyValue("--dropdown-offset").trim()
      || "0.8rem";
    const offsetY = this.resolveCssLength(offsetRaw, 8);

    // Reset so we measure cleanly
    menu.style.top = "";
    menu.style.bottom = "";
    menu.style.left = "";
    menu.style.right = "";
    menu.style.maxWidth = "";

    const hostRect = this.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxMenuWidth = vw - margin * 2;

    if (measureWidth) this.measurePortalWidth(maxMenuWidth);

    const menuW = menu.offsetWidth;
    const menuH = menu.offsetHeight;

    // ---- Vertical position ----
    const verticalPosition = (this.getAttribute("vertical-position") || "auto").toLowerCase();
    const spaceBelow = vh - hostRect.bottom;
    const spaceAbove = hostRect.top;
    const minRequired = menuH + offsetY;
    const canFitBelow = spaceBelow >= minRequired;
    const canFitAbove = spaceAbove >= minRequired;

    let top = this.portalMenu ? hostRect.bottom + offsetY : hostRect.height + offsetY; // default below
    if (verticalPosition === "up") {
      top = canFitAbove || !canFitBelow
        ? this.portalMenu ? hostRect.top - menuH - offsetY : -(menuH + offsetY)
        : this.portalMenu ? hostRect.bottom + offsetY : hostRect.height + offsetY;
    } else if (verticalPosition === "down") {
      top = canFitBelow || !canFitAbove
        ? this.portalMenu ? hostRect.bottom + offsetY : hostRect.height + offsetY
        : this.portalMenu ? hostRect.top - menuH - offsetY : -(menuH + offsetY);
    } else if (!canFitBelow && spaceAbove > spaceBelow) {
      top = this.portalMenu ? hostRect.top - menuH - offsetY : -(menuH + offsetY); // auto: flip above when below is tighter and above has more room
    }

    // ---- Horizontal position ----
    let left = 0;
    const position = this.getAttribute("position") || "left";

    switch (position) {
      case "left":
        left = this.portalMenu ? hostRect.left : 0; // menu’s left edge aligns with host’s left edge
        break;
      case "center":
        left = this.portalMenu ? hostRect.left + (hostRect.width - menuW) / 2 : (hostRect.width - menuW) / 2; // center horizontally relative to host
        break;
      case "right":
      default:
        left = this.portalMenu ? hostRect.right - menuW : hostRect.width - menuW; // menu’s right edge aligns with host’s right edge
        break;
    }

    // ---- Clamp horizontally to viewport ----
    const minLeft = this.portalMenu ? margin : margin - hostRect.left;
    const maxLeft = this.portalMenu ? vw - margin - menuW : vw - margin - (hostRect.left + menuW);
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // ---- Cap width if too wide ----
    if (menuW > maxMenuWidth) {
      menu.style.maxWidth = `${maxMenuWidth}px`;
    }

    // ---- Apply offsets ----
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
  }

  render() {
    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          position: relative;
          display: inline-block;
        }
        .dropdown-menu {
          /* hidden state */
          display: none;
          visibility: hidden;
          opacity: 0;
          transform: translateY(-0.25rem);
          transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s linear 0.15s;
          /* End */
          position: absolute;
          z-index: 1;
          box-sizing: border-box;
        }

        .dropdown-menu.show {
          /* visible state */
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }

        .dropdown-menu ::slotted(mui-button),
        .dropdown-menu ::slotted(mui-link) {
          width: 100%;
          text-align: left;
        }

        .dropdown-menu ::slotted(mui-button:focus),
        .dropdown-menu ::slotted(mui-link:focus) {
          z-index: 1;
        }

        .inner { display: block; }

      </style>

      <!-- Trigger button slot -->
      <slot name="action"></slot>

      <!-- Dropdown options slot -->
      <div class="dropdown-menu">
        <div class="inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("mui-dropdown")) {
  customElements.define("mui-dropdown", MuiDropdown);
}
