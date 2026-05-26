/* myApp */
class appNavbarGroup extends HTMLElement {
  static get observedAttributes() {
    return ["groupname"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.searchQuery = "";
    this.storageKey = "";
    this.handleRouteChange = this.handleRouteChange.bind(this);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        this.keyboardUsed = true;
      }
    });

    window.addEventListener("mousedown", () => {
      this.keyboardUsed = false;
    });
  }

  connectedCallback() {
    this.storageKey = `muibook-nav-group:${this.id || this.getAttribute("groupname") || "group"}`;
    this.render();
    this.bindEvents();
    this.restoreState();

    this.addEventListener("focusin", () => {
      if (this.keyboardUsed) {
        this.classList.add("focused");
      }
    });

    this.addEventListener("focusout", () => {
      this.classList.remove("focused");
    });
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.handleRouteChange);
    this._observer?.disconnect();
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) return;
    this.render();
    this.bindEvents();
    this.restoreState();
  }

  get groupName() {
    return this.getAttribute("groupname") || "";
  }

  get accordionEl() {
    return this.shadowRoot?.querySelector("mui-accordion-core") || null;
  }

  get summaryEl() {
    return this.shadowRoot?.querySelector(".group-summary") || null;
  }

  get detailEl() {
    return this.shadowRoot?.querySelector(".group-detail") || null;
  }

  get sections() {
    return Array.from(this.querySelectorAll(":scope > app-navbar-section"));
  }

  get directLinks() {
    return Array.from(this.querySelectorAll(":scope > app-navbar-link"));
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        :host(:last-of-type) {
          padding-bottom: 6rem;
        }

        :host(.focused) {
          position: relative;
          z-index: 3;
        }

        @media (min-width: 960px) {
          :host {
            background: var(--app-navbar-surface-opacity);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }

        .group-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          cursor: pointer;
          box-sizing: border-box;
          padding: var(--space-300) var(--space-500);
          border: 0;
          border-top: var(--app-navbar-border);
          background: transparent;
        }

        :host(:first-of-type) .group-summary {
          border-top: none;
        }

        .group-summary:hover {
          background: var(--app-navbar-surface-100);
        }

        .group-summary:focus-visible {
          outline: var(--outline-thick);
        }

        .group-title::part(color) {
          color: var(--app-nav-accent);
        }

        .group-detail {
          padding-block: var(--space-000);
          box-shadow: inset 0 1px 0 0 var(--app-navbar-border-color);
        }

        .group-detail.has-direct-links {
          padding-top: var(--space-300);
          padding-bottom: var(--space-300);
        }

        .group-detail.has-sections {
          padding-top: var(--stroke-size-100);
        }

        .group-chevron {
          transition: transform var(--speed-200) ease-in-out;
          color: var(--app-nav-accent);
        }

        :host([open]) .group-chevron {
          transform: rotate(-180deg);
        }
      </style>

      <mui-accordion-core>
        <div class="group-summary" slot="summary" aria-label="${this.groupName}">
          <mui-heading class="group-title" size="6" level="3">${this.groupName}</mui-heading>
          <mui-icon-down-chevron class="group-chevron" size="x-small"></mui-icon-down-chevron>
        </div>
        <div class="group-detail ${this.sections.length ? "has-sections" : "has-direct-links"}" slot="detail" inert>
          <slot></slot>
        </div>
      </mui-accordion-core>
    `;
  }

  bindEvents() {
    window.removeEventListener("hashchange", this.handleRouteChange);
    window.addEventListener("hashchange", this.handleRouteChange);

    this._observer?.disconnect();
    if (this.accordionEl) {
      this._observer = new MutationObserver(() => {
        const isOpen = this.accordionEl.hasAttribute("open");
        this.toggleAttribute("open", isOpen);
        this.detailEl?.toggleAttribute("inert", !isOpen);
        if (!this.searchQuery) {
          localStorage.setItem(this.storageKey, isOpen ? "open" : "closed");
        }
      });
      this._observer.observe(this.accordionEl, { attributes: true, attributeFilter: ["open"] });
      this.toggleAttribute("open", this.accordionEl.hasAttribute("open"));
    }
  }

  handleRouteChange() {
    if (this.searchQuery) return;
    if (this.hasActiveRoute()) {
      this.setOpen(true, false);
    }
    this.sections.forEach((section) => section.restoreState?.());
  }

  hasActiveRoute() {
    const currentHash = window.location.hash || "#/home";
    const directMatch = this.directLinks.some((link) => link.getAttribute("link") === currentHash);
    const sectionMatch = this.sections.some((section) => section.hasActiveRoute?.());
    return directMatch || sectionMatch;
  }

  setOpen(isOpen, persist = true) {
    if (!this.accordionEl) return;
    if (isOpen) {
      this.accordionEl.setAttribute("open", "");
    } else {
      this.accordionEl.removeAttribute("open");
    }
    this.detailEl?.toggleAttribute("inert", !isOpen);
    this.toggleAttribute("open", isOpen);
    if (persist && !this.searchQuery) {
      localStorage.setItem(this.storageKey, isOpen ? "open" : "closed");
    }
  }

  restoreState() {
    if (this.searchQuery) return;
    const saved = localStorage.getItem(this.storageKey);
    const shouldOpen = this.hasActiveRoute() || saved === "open";
    this.sections.forEach((section) => section.restoreState?.());
    this.directLinks.forEach((link) => {
      link.hidden = false;
    });
    this.hidden = false;
    this.setOpen(shouldOpen, false);
  }

  applyFilter(query = "") {
    this.searchQuery = query.trim().toLowerCase();
    const groupMatches = this.groupName.toLowerCase().includes(this.searchQuery);

    if (!this.searchQuery) {
      this.sections.forEach((section) => section.applyFilter(""));
      this.restoreState();
      return true;
    }

    let anyMatch = false;

    this.sections.forEach((section) => {
      const sectionMatched = section.applyFilter(this.searchQuery, groupMatches);
      if (sectionMatched) anyMatch = true;
    });

    this.directLinks.forEach((link) => {
      const title = (link.getAttribute("title") || "").toLowerCase();
      const badge = (link.getAttribute("badge") || "").toLowerCase();
      const matches = groupMatches || title.includes(this.searchQuery) || badge.includes(this.searchQuery);
      link.hidden = !matches;
      if (matches) anyMatch = true;
    });

    const shouldShow = groupMatches || anyMatch;
    this.hidden = !shouldShow;
    this.setOpen(shouldShow, false);
    return shouldShow;
  }
}

customElements.define("app-navbar-group", appNavbarGroup);
