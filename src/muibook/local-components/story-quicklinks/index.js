class StoryQuicklinks extends HTMLElement {
  static get observedAttributes() {
    return ["heading", "links", "limit"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.expanded = false;
    this._clickHandler = null;
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  disconnectedCallback() {
    if (this._clickHandler) {
      this.shadowRoot?.removeEventListener("click", this._clickHandler);
    }
  }

  attributeChangedCallback() {
    this.render();
    this.setupEvents();
  }

  parseLinks(rawLinks) {
    if (!rawLinks) return [];

    return rawLinks
      .split("|||")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [target, ...labelParts] = item.split("::");
        return {
          target: (target || "").trim(),
          label: labelParts.join("::").trim(),
        };
      })
      .filter((item) => item.target && item.label);
  }

  setupEvents() {
    if (!this.shadowRoot) return;

    if (this._clickHandler) {
      this.shadowRoot.removeEventListener("click", this._clickHandler);
    }

    this._clickHandler = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const toggleButton = target.closest("[data-toggle-quicklinks]");
      if (toggleButton) {
        event.preventDefault();
        this.expanded = !this.expanded;
        this.toggleAttribute("links-expanded", this.expanded);
        toggleButton.textContent = this.expanded ? "Less..." : "More...";
        return;
      }

      const quicklink = target.closest("[data-scroll-link]");
      if (!quicklink) return;

      event.preventDefault();

      const targetId = quicklink.getAttribute("data-scroll-link");
      if (!targetId) return;

      const parentRoot = this.getRootNode();
      if (parentRoot && typeof parentRoot.getElementById === "function") {
        const targetEl = parentRoot.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }

      this.dispatchEvent(
        new CustomEvent("story-quicklink-select", {
          detail: { targetId },
          bubbles: true,
          composed: true,
        }),
      );
    };

    this.shadowRoot.addEventListener("click", this._clickHandler);
  }

  render() {
    const heading = this.getAttribute("heading") || "Quicklinks";
    const limit = Number(this.getAttribute("limit") || "10");
    const links = this.parseLinks(this.getAttribute("links"));
    const collapsed = links.slice(0, limit);
    const extra = links.slice(limit);
    const hasExtra = extra.length > 0;

    const linkMarkup = (item, extraClass = "") => /*html*/ `
      <mui-link class="${extraClass}" size="small" data-scroll-link="${item.target}">${item.label}</mui-link>
    `;

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }

        .token-item-menu::part(flex-wrap) {
          flex-wrap: wrap;
          column-gap: var(--space-300);
          row-gap: var(--space-100);
        }

        .quicklink-extra {
          display: none;
        }

        :host([links-expanded]) .quicklink-extra {
          display: inline-flex;
        }

        .quicklinks-toggle {
          text-transform: capitalize;
          margin-left: var(--space-100);
        }
        .quicklinks-toggle::part(text-decoration) {
          text-decoration: none;
        }
        .quicklinks-toggle:hover::part(text-decoration),
        .quicklinks-toggle:focus-visible::part(text-decoration) {
          text-decoration: underline;
        }

        .theme-brand::part(color) {
          opacity: 0.75
        }
      </style>

      <mui-message heading="${heading}">
        <mui-h-stack class="token-item-menu" alignY="start">
          ${collapsed.map((item) => linkMarkup(item)).join("")}
          ${extra.map((item) => linkMarkup(item, "quicklink-extra")).join("")}
          ${
            hasExtra
              ? '<mui-link size="small" weight="bold" class="quicklinks-toggle theme-brand" data-toggle-quicklinks>More...</mui-link>'
              : ""
          }
        </mui-h-stack>
      </mui-message>
    `;

    this.toggleAttribute("links-expanded", this.expanded);
  }
}

customElements.define("story-quicklinks", StoryQuicklinks);
