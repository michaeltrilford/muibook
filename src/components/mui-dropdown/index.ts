class MuiDropdown extends HTMLElement {
  private button: HTMLElement | null = null;
  private menu: HTMLElement | null = null;
  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.menu?.classList.remove("show");
    }
  }
  private handleResize = () => {
    if (this.menu?.classList.contains("show")) {
      this.adjustPlacement();
    }
  };

  private handleScroll = () => {
    if (this.menu?.classList.contains("show")) {
      this.adjustPlacement();
    }
  };

  static get observedAttributes() {
    return ["zindex"];
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "zindex" && this.menu) {
      this.menu.style.zIndex = newValue ?? "1";
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

    // Get the slotted trigger button
    const actionSlot = this.shadowRoot?.querySelector('slot[name="action"]') as HTMLSlotElement | null;
    const assignedActionNodes = actionSlot?.assignedNodes({ flatten: true }) || [];
    this.button = assignedActionNodes.find(
      (n) => n instanceof HTMLElement && n.tagName.toLowerCase() === "mui-button"
    ) as HTMLElement | null;

    // Force variant="tertiary" on all default slot buttons (dropdown options)
    const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;
    const optionNodes = defaultSlot?.assignedNodes({ flatten: true }) || [];
    optionNodes.forEach((node) => {
      if (node instanceof HTMLElement && node.tagName.toLowerCase() === "mui-button") {
        node.setAttribute("variant", "tertiary");

        // Add click listener to close the menu when clicked
        node.addEventListener("click", () => {
          this.menu?.classList.remove("show");
        });
      }
    });

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

    if (isOpen) {
      this.closeWithAnimation();
      this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: false }, bubbles: true }));
    } else {
      this.menu.style.display = "block"; // restore so transitions can run
      requestAnimationFrame(() => {
        this.menu?.classList.add("show");
        this.adjustPlacement();
      });
      this.dispatchEvent(new CustomEvent("dropdown-toggle", { detail: { open: true }, bubbles: true }));
    }
  }

  closeMenu(event: Event) {
    if (!this.contains(event.target as Node)) {
      this.menu?.classList.remove("show");

      // Dispatch event so React can remove inert
      this.dispatchEvent(
        new CustomEvent("dropdown-toggle", {
          detail: { open: false },
          bubbles: true,
        })
      );
    }
  }

  adjustPlacement() {
    if (!this.menu) return;

    const menu = this.menu;
    const margin = 8; // viewport inset
    const offsetY = 8; // vertical gap from trigger

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

    // ---- Vertical placement ----
    let top = hostRect.height + offsetY; // default below
    if (vh - hostRect.bottom < menuH + offsetY && hostRect.top > vh - hostRect.bottom) {
      // place above if not enough space below
      top = -(menuH + offsetY);
    }

    // ---- Horizontal placement ----
    // default: align to host right
    let left = hostRect.width - menuW;

    // clamp horizontally to stay in viewport
    const minLeft = margin - hostRect.left; // left edge ≥ margin
    const maxLeft = vw - margin - (hostRect.left + menuW); // right edge ≤ viewport
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // cap width if too wide
    if (menuW > vw - margin * 2) {
      menu.style.maxWidth = `${vw - margin * 2}px`;
    }

    // ---- Apply relative offsets ----
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
          position: absolute;
          background: var(--surface);
          border: var(--border-thin);
          border-color: var(--white-opacity-20);
          min-width: 150px;
          box-shadow: 0 var(--space-100) var(--space-200) var(--black-opacity-20);
          z-index: 1;
          border-radius: var(--radius-100);

          /* hidden by default */
          display: none;
          opacity: 0;
          transform: translateY(-0.25rem);
          transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s linear 0.15s;
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
