class AttrCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "items", "open"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._onClick = this._onClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.shadowRoot?.addEventListener("click", this._onClick);
  }

  disconnectedCallback() {
    this.shadowRoot?.removeEventListener("click", this._onClick);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "open" && this.shadowRoot) {
      const accordion = this.shadowRoot.querySelector("mui-accordion-core");
      if (accordion instanceof HTMLElement) {
        if (newValue !== null) {
          accordion.setAttribute("open", "");
        } else {
          accordion.removeAttribute("open");
        }
      }
    }
    this.render();
  }

  getParsedItems() {
    const raw = this.getAttribute("items");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async _onClick(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const copyButton = target.closest("[data-copy-attrs]");
    if (!copyButton) return;

    event.stopPropagation();

    const raw = this.getAttribute("items") || "[]";
    try {
      const normalized = JSON.stringify(JSON.parse(raw), null, 2);
      await navigator.clipboard.writeText(normalized);
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1200);
    } catch {
      copyButton.textContent = "Failed";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1200);
    }
  }

  render() {
    if (!this.shadowRoot) return;
    const items = this.getParsedItems();
    const title = this.getAttribute("title") || "Dynamic Attributes";

    if (!items.length) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    const rows = items
      .map((item) => {
        const parentAttrs = Array.isArray(item.parentAttrs) ? item.parentAttrs.filter(Boolean) : [];
        const childAttrs = Array.isArray(item.childAttrs) ? item.childAttrs.filter(Boolean) : [];
        const dynamicAttrs = [...parentAttrs, ...childAttrs].filter((attr, index, arr) => arr.indexOf(attr) === index);
        if (!dynamicAttrs.length) return "";
        const snippets = dynamicAttrs
          .map((attr) => {
            const safeAttr = String(attr).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
            return `<story-code-snippet>${safeAttr}</story-code-snippet>`;
          })
          .join("");
        return /*html*/ `
          <mui-v-stack class="attrs-meta">
            <mui-body size="small" weight="bold">${item.component || "Component"}</mui-body>
            <div class="attrs-snippets">${snippets}</div>
          </mui-v-stack>
        `;
      })
      .join("");

    if (!rows) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; scroll-margin-top: var(--space-600); }

        mui-card { border: var(--border-thick); }
        mui-card-header {
          padding: var(--space-400);
        }
        mui-card-body { padding: var(--space-400) var(--space-400) var(--space-500) calc(var(--space-700) + var(--space-100) ); }
        mui-accordion-core { border-radius: var(--radius-card); }

        .summary::part(display) {
          justify-content: space-between;
          align-items: center;
        }

        .icon {
          margin-right: var(--space-100);
        }
        .attrs-list::part(gap) { gap: var(--space-200); }
        .attrs-meta::part(gap) { gap: var(--space-050); }
        .attrs-snippets {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--space-100);
        }
      </style>
      <mui-card>
        <mui-accordion-core>
          <mui-card-header slot="summary">
            <mui-h-stack class="summary" space="var(--space-000)">
              <mui-h-stack space="var(--space-300)">
                <mui-icon-rectangle-media-text size="medium"></mui-icon-rectangle-media-text>
                <mui-v-stack space="var(--space-000)">
                  <mui-heading size="5" level="2">${title}</mui-heading>
                </mui-v-stack>
              </mui-h-stack>
              <mui-h-stack class="summary-right" space="var(--space-100)">
                <mui-icon-toggle rotate class="icon" size="small">
                  <mui-icon-add slot="start"></mui-icon-add>
                  <mui-icon-subtract slot="end"></mui-icon-subtract>
                </mui-icon-toggle>
              </mui-h-stack>
            </mui-h-stack>
          </mui-card-header>
          <div slot="detail">
            <mui-rule></mui-rule>
            <mui-card-body>
              <mui-grid space="var(--space-600)" col="1fr auto">
                <mui-v-stack class="attrs-list">
                  ${rows}
                </mui-v-stack>
                <mui-button data-copy-attrs size="x-small" variant="tertiary">Copy</mui-button>
              </mui-grid>
              <mui-v-stack style="margin-top: var(--space-500); text-wrap: balance;" space="var(--space-200)">
                <mui-body size="x-small">In Shadow DOM, :has() can’t cross boundaries, so attributes are the practical way to react to structure. If a slot or type exists, set a host attribute to keep behaviour consistent across preview, builder, and export.</mui-body>
                <mui-h-stack space="var(--space-025)"><mui-body size="x-small">See it in action • </mui-body><mui-link size="x-small" target="_blank" href="https://redactd.xyz">redactd.xyz</mui-link></mui-h-stack>
              </mui-v-stack>
            </mui-card-body>
          </div>
        </mui-accordion-core>
      </mui-card>
    `;

    if (this.hasAttribute("open")) {
      const accordion = this.shadowRoot.querySelector("mui-accordion-core");
      if (accordion instanceof HTMLElement) accordion.setAttribute("open", "");
    }
  }
}

customElements.define("attr-card", AttrCard);
