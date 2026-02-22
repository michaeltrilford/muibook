class MuiDropdown extends HTMLElement {
  static openDropdown: MuiDropdown | null = null;
  private button: HTMLElement | null = null;
  private menu: HTMLElement | null = null;
  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (!this.menu) return;

      // Close menu visually
      this.menu.classList.remove("show");

      // Restore inert
      this.menu.setAttribute("inert", "true");

      // Clear open dropdown if needed
      if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;

      // Fire event
      this.dispatchEvent(
        new CustomEvent("dropdown-toggle", {
          detail: { open: false },
          bubbles: true,
        })
      );
    }
  }
  private handleResize = () => {
    if (this.menu?.classList.contains("show")) {
      this.adjustPosition();
    }
  };

  private handleScroll = () => {
    if (this.menu?.classList.contains("show")) {
      this.adjustPosition();
    }
  };

  private handleFocusOut = (event: FocusEvent) => {
    if (this.persistent) return; // skip closing if attribute is present

    if (!this.contains(event.relatedTarget as Node)) {
      this.closeWithAnimation();
      this.menu?.setAttribute("inert", "true");
      if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
      this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
    }
  };

  static get observedAttributes() {
    return ["zindex", "position", "vertical-position", "persistent"];
  }

  get persistent() {
    return this.hasAttribute("persistent");
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "zindex" && this.menu) {
      this.menu.style.zIndex = newValue ?? "1";
    }

    if ((name === "position" || name === "vertical-position") && this.menu) {
      this.adjustPosition();
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
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

    // Get the slotted trigger button
    const actionSlot = this.shadowRoot?.querySelector('slot[name="action"]') as HTMLSlotElement | null;
    const assignedActionNodes = actionSlot?.assignedNodes({ flatten: true }) || [];
    this.button = assignedActionNodes.find(
      (n) => n instanceof HTMLElement && n.tagName.toLowerCase() === "mui-button"
    ) as HTMLElement | null;

    // Force variant="tertiary" on all default slot buttons (dropdown options)
    const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;

    if (defaultSlot) {
      const updateButtons = () => {
        const optionNodes = defaultSlot.assignedElements({ flatten: true }) as HTMLElement[];

        optionNodes.forEach((btn) => {
          btn.removeAttribute("dropdown-slot");
          btn.removeAttribute("dropdown-slot-first");
          btn.removeAttribute("dropdown-slot-last");
        });

        optionNodes.forEach((btn, i) => {
          btn.setAttribute("variant", "tertiary");
          btn.setAttribute("dropdown-slot", "");

          if (i === 0) btn.setAttribute("dropdown-slot-first", "");
          if (i === optionNodes.length - 1) btn.setAttribute("dropdown-slot-last", "");

          // click listener once
          if (!(btn as any)._dropdownListenerAdded) {
            btn.addEventListener("click", () => {
              if (!this.persistent) {
                this.menu?.classList.remove("show");
                this.menu?.setAttribute("inert", "true");
                if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
                this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
              }
            });
            (btn as any)._dropdownListenerAdded = true;
          }
        });
      };

      defaultSlot.addEventListener("slotchange", updateButtons);

      // run initially in case nodes already exist
      updateButtons();
    }

    // Bind event listeners for the trigger button
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.button?.addEventListener("click", this.toggleMenu);
    document.addEventListener("click", this.closeMenu);
    document.addEventListener("keydown", this.handleKeyDown); // ESC listener

    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll, true); // capture scroll on parents
  }

  disconnectedCallback() {
    this.button?.removeEventListener("click", this.toggleMenu);
    document.removeEventListener("click", this.closeMenu);
    document.removeEventListener("keydown", this.handleKeyDown);

    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll, true);

    this.menu?.removeEventListener("focusout", this.handleFocusOut);
  }

  closeWithAnimation() {
    if (!this.menu) return;

    this.menu.classList.remove("show");

    // wait for transition to finish before hiding
    const duration = 150; // must match CSS transition time
    setTimeout(() => {
      if (!this.menu) return;
      if (!this.menu.classList.contains("show")) {
        this.menu.style.display = "none"; // hide fully AFTER animation
      }
    }, duration);
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    if (!this.menu) return;

    const isOpen = this.menu.classList.contains("show");

    // Close any other open dropdown first
    if (!isOpen && MuiDropdown.openDropdown && MuiDropdown.openDropdown !== this) {
      MuiDropdown.openDropdown.closeWithAnimation();
    }

    if (isOpen) {
      this.closeWithAnimation();
      this.menu?.setAttribute("inert", "true"); // restore inert when closing
      if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
      this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
    } else {
      this.menu.style.display = "block"; // restore for transitions
      requestAnimationFrame(() => {
        this.menu?.classList.add("show");
        this.menu?.removeAttribute("inert"); // enable interaction
        this.adjustPosition();
      });
      MuiDropdown.openDropdown = this;
      this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: true }, bubbles: true }));
    }
  }

  closeMenu(event: Event) {
    const path = event.composedPath(); // array of nodes the event passes through

    // If click was inside menu or button, ignore
    if (this.menu && path.includes(this.menu)) return;
    if (this.button && path.includes(this.button)) return;

    // Otherwise, close
    this.closeWithAnimation();
    this.menu?.setAttribute("inert", "true");
    if (MuiDropdown.openDropdown === this) MuiDropdown.openDropdown = null;
    this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
  }

  adjustPosition() {
    if (!this.menu) return;

    const menu = this.menu;
    const margin = 8; // viewport inset
    const offsetRaw = getComputedStyle(this).getPropertyValue("--dropdown-offset").trim() || "0.8rem";
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 10;
    const offsetY = offsetRaw.endsWith("rem")
      ? parseFloat(offsetRaw) * fontSize
      : parseFloat(offsetRaw) || 8; // vertical gap from trigger

    // Reset so we measure cleanly
    menu.style.top = "";
    menu.style.bottom = "";
    menu.style.left = "";
    menu.style.right = "";
    menu.style.maxWidth = "";

    const hostRect = this.getBoundingClientRect();
    const menuW = menu.offsetWidth;
    const menuH = menu.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // ---- Vertical position ----
    const verticalPosition = (this.getAttribute("vertical-position") || "auto").toLowerCase();
    const spaceBelow = vh - hostRect.bottom;
    const spaceAbove = hostRect.top;
    const minRequired = menuH + offsetY;
    const canFitBelow = spaceBelow >= minRequired;
    const canFitAbove = spaceAbove >= minRequired;

    let top = hostRect.height + offsetY; // default below
    if (verticalPosition === "up") {
      top = canFitAbove || !canFitBelow ? -(menuH + offsetY) : hostRect.height + offsetY;
    } else if (verticalPosition === "down") {
      top = canFitBelow || !canFitAbove ? hostRect.height + offsetY : -(menuH + offsetY);
    } else if (!canFitBelow && spaceAbove > spaceBelow) {
      top = -(menuH + offsetY); // auto: flip above when below is tighter and above has more room
    }

    // ---- Horizontal position ----
    let left = 0;
    const position = this.getAttribute("position") || "left";

    switch (position) {
      case "left":
        left = 0; // menu’s left edge aligns with host’s left edge
        break;
      case "center":
        left = (hostRect.width - menuW) / 2; // center horizontally relative to host
        break;
      case "right":
      default:
        left = hostRect.width - menuW; // menu’s right edge aligns with host’s right edge
        break;
    }

    // ---- Clamp horizontally to viewport ----
    const minLeft = margin - hostRect.left;
    const maxLeft = vw - margin - (hostRect.left + menuW);
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // ---- Cap width if too wide ----
    if (menuW > vw - margin * 2) {
      menu.style.maxWidth = `${vw - margin * 2}px`;
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
          opacity: 0;
          transform: translateY(-0.25rem);
          transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s linear 0.15s;
          /* End */
          min-width: var(--dropdown-min-width, 15rem);
          position: absolute;
          z-index: 1;
          box-sizing: border-box;
          border: var(--border-thin);
          /* Unique Styles */
          background: var(--dropdown-background);
          border-color: var(--dropdown-border-color);
          box-shadow: 0 var(--space-100) var(--space-200) var(--dropdown-shadow-color);
          border-radius: var(--dropdown-radius);
          padding: 1px;
        }

        .dropdown-menu.show {
          /* visible state */
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }

        .dropdown-menu ::slotted(mui-button) {
          width: 100%;
          text-align: left;
        }

        .dropdown-menu ::slotted(mui-button:focus) {
          z-index: 1;
        }

        .inner {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

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
