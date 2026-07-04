class ImportCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "imports", "import-path"];
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

  attributeChangedCallback() {
    this.render();
  }

  getImportItems() {
    const singleImportPath = this.getAttribute("import-path");
    const importsRaw = this.getAttribute("imports") || "";
    let importItems = [];
    if (singleImportPath) {
      importItems = [singleImportPath];
    } else if (importsRaw) {
      try {
        const parsed = JSON.parse(importsRaw);
        importItems = Array.isArray(parsed) ? parsed : [String(parsed)];
      } catch {
        importItems = importsRaw
          .split("|||")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }
    return importItems;
  }

  async _onClick(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const copyButton = target.closest("[data-copy-imports], [data-copy-attrs]");
    if (!copyButton) return;

    event.stopPropagation();

    const importItems = this.getImportItems();
    const content = importItems.map((path) => `import "${path}";`).join("\n");
    try {
      await navigator.clipboard.writeText(content);
      this.setCopyButtonLabel(copyButton, "Copied");
      setTimeout(() => {
        this.setCopyButtonLabel(copyButton, "Copy");
      }, 1200);
    } catch {
      this.setCopyButtonLabel(copyButton, "Failed");
      setTimeout(() => {
        this.setCopyButtonLabel(copyButton, "Copy");
      }, 1200);
    }
  }

  setCopyButtonLabel(copyButton, label) {
    const labelEl = copyButton.querySelector("[data-copy-label]");
    if (labelEl) {
      labelEl.textContent = label;
      return;
    }
    copyButton.append(document.createTextNode(label));
  }

  render() {
    if (!this.shadowRoot) return;
    const title = this.getAttribute("title") || this.displayTitle || "Import";
    this.displayTitle = title;
    if (this.hasAttribute("title")) this.removeAttribute("title");
    const importItems = this.getImportItems();
    if (!importItems.length) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; scroll-margin-top: var(--space-600); }
        mui-card-footer { overflow: hidden; background: var(--surface-elevated-100); padding-inline-end: var(--space-200); border-radius: calc(var(--card-radius) - var(--stroke-size-200)); }
        @media (min-width: 500px) {
          mui-card-footer {
            padding-inline-end: var(--space-400);
          }
        }
        mui-code {
          --code-background: var(--surface-elevated-100);
        }
      </style>
      <mui-card role="region" aria-label="${this.escapeAttribute(title)} imports">
        <mui-card-footer>
          <mui-grid col="1fr auto" aligny="center">
            <mui-code class="import-card" size="x-small" aria-label="${this.escapeAttribute(title)} statements">
              ${importItems.map((path) => `import "${path}";<br>`).join("\n")}
            </mui-code>
            <mui-button data-copy-imports size="x-small" variant="tertiary" aria-label="Copy ${this.escapeAttribute(title.toLowerCase())} statements">
              <span data-copy-label>Copy</span>
            </mui-button>
          </mui-grid>
        </mui-card-footer>
      </mui-card>
    `;
  }

  escapeAttribute(value) {
    return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
}

customElements.define("import-card", ImportCard);
