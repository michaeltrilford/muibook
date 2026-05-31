import { isCurrentRoute } from "../utils/routes.js";

class appNavbarSection extends HTMLElement {
  static get observedAttributes() {
    return ["heading"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.searchQuery = "";
    this.storageKey = "";
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  connectedCallback() {
    this.storageKey = `muibook-nav-section:${this.closest("app-navbar-group")?.id || "group"}:${this.getAttribute("heading") || ""}`;
    this.render();
    this.bindEvents();
    this.restoreState();
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleRouteChange);
    window.removeEventListener("hashchange", this.handleRouteChange);
    this._observer?.disconnect();
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) return;
    this.render();
    this.bindEvents();
    this.restoreState();
  }

  get heading() {
    return this.getAttribute("heading") || "";
  }

  get links() {
    return Array.from(this.querySelectorAll(":scope > app-navbar-link"));
  }

  get accordionEl() {
    return this.shadowRoot?.querySelector("mui-accordion-core") || null;
  }

  get summaryEl() {
    return this.shadowRoot?.querySelector(".section-summary") || null;
  }

  get detailEl() {
    return this.shadowRoot?.querySelector(".section-detail") || null;
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

        mui-accordion-core {
          display: block;
        }

        .section-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          cursor: pointer;
          box-sizing: border-box;
          padding: var(--space-300) calc(var(--space-500) + var(--stroke-size-100)) var(--space-300) var(--space-500);
          border: 0;
          background: transparent;
        }

        .section-summary:focus-visible {
          outline: var(--outline-thick);
        }

        .section-summary:hover {
          background: var(--app-navbar-surface-100);
        }

        .section-title::part(color) {
          color: var(--app-nav-accent);
        }

        .section-detail {
          padding-bottom: var(--space-100);
        }

        .section-chevron {
          transition: transform var(--speed-200) ease-in-out;
        }

        :host([open]) .section-chevron {
          transform: rotate(90deg);
        }
      </style>

      <mui-accordion-core>
        <div class="section-summary" slot="summary" aria-label="${this.heading}">
          <mui-body class="section-title" size="small" weight="bold">${this.heading}</mui-body>
          <mui-icon-right-chevron class="section-chevron" size="xx-small" color="var(--app-navbar-section-chevron)"></mui-icon-right-chevron>
        </div>
        <div class="section-detail" slot="detail" inert>
          <slot></slot>
        </div>
      </mui-accordion-core>
    `;
  }

  bindEvents() {
    window.removeEventListener("popstate", this.handleRouteChange);
    window.removeEventListener("hashchange", this.handleRouteChange);
    window.addEventListener("popstate", this.handleRouteChange);
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
  }

  hasActiveRoute() {
    return this.links.some((link) => isCurrentRoute(link.getAttribute("link")));
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
    const defaultOpen = this.hasAttribute("default-open");
    const shouldOpen = this.hasActiveRoute() || defaultOpen || saved === "open";
    this.links.forEach((link) => {
      link.hidden = false;
    });
    this.hidden = false;
    this.setOpen(shouldOpen, false);
  }

  applyFilter(query = "", showAll = false) {
    this.searchQuery = query.trim().toLowerCase();
    const headingMatches = this.heading.toLowerCase().includes(this.searchQuery);

    if (showAll) {
      this.links.forEach((link) => {
        link.hidden = false;
      });
      this.hidden = false;
      this.setOpen(true, false);
      return true;
    }

    if (!this.searchQuery) {
      this.restoreState();
      return true;
    }

    let anyMatch = false;

    this.links.forEach((link) => {
      const title = (link.getAttribute("title") || "").toLowerCase();
      const badge = (link.getAttribute("badge") || "").toLowerCase();
      const matches = headingMatches || title.includes(this.searchQuery) || badge.includes(this.searchQuery);
      link.hidden = !matches;
      if (matches) anyMatch = true;
    });

    const shouldShow = headingMatches || anyMatch;
    this.hidden = !shouldShow;
    this.setOpen(shouldShow, false);
    return shouldShow;
  }
}

customElements.define("app-navbar-section", appNavbarSection);
