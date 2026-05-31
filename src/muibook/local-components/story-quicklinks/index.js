class StoryQuicklinks extends HTMLElement {
  static get observedAttributes() {
    return ["heading", "links", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
    const size = this.getAttribute("size") || "medium";
    const links = this.parseLinks(this.getAttribute("links"));

    const linkMarkup = (item) => /*html*/ `
      <mui-chip variant="clickable" data-scroll-link="${item.target}">${item.label}</mui-chip>
    `;

    if (!this.shadowRoot) return;

    if (!links.length) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          min-width: 0;
          max-width: 100%;
        }

        mui-chip-rail {
          --chip-rail-background: var(--app-container-surface, var(--surface));
        }
      </style>

      <mui-chip-rail size="${size}" aria-label="${heading}">
        ${links.map((item) => linkMarkup(item)).join("")}
      </mui-chip-rail>
    `;
  }
}

customElements.define("story-quicklinks", StoryQuicklinks);
