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
    const title = this.getAttribute("title") || "Import";
    const importItems = this.getImportItems();
    if (!importItems.length) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; scroll-margin-top: var(--space-600); }
        mui-card { border: var(--border-thick); }
        mui-card-header { padding: var(--space-400); }
        mui-card-footer { overflow: hidden; background: var(--surface-elevated-100); padding-inline-end: var(--space-200); border-radius: 0 0 calc(var(--card-radius) - var(--stroke-size-200)) calc(var(--card-radius) - var(--stroke-size-200)); }
        @media (min-width: 500px) {
          mui-card-footer {
            padding-inline-end: var(--space-400);
          }
        }
        mui-code {
          --code-background: var(--surface-elevated-100);
        }
      </style>
      <mui-card>
        <mui-card-header>
          <mui-h-stack space="var(--space-300)">
            <mui-icon-down-arrow-circle size="medium"></mui-icon-down-arrow-circle>
            <mui-v-stack space="var(--space-000)">
              <mui-heading size="5" level="2">${title}</mui-heading>
            </mui-v-stack>
          </mui-h-stack>
        </mui-card-header>
        <mui-rule direction="horizontal" role="presentation" in-card></mui-rule>
        <mui-card-footer>
          <mui-grid col="1fr auto" aligny="center">
            <mui-code class="import-card" size="x-small">
              ${importItems.map((path) => `import "${path}";<br>`).join("\n")}
            </mui-code>
            <mui-button data-copy-imports size="x-small" variant="tertiary"><mui-icon-rectangle slot="before"></mui-icon-rectangle>Copy</mui-button>
          <mui-grid>
        </mui-card-footer>
      </mui-card>
    `;
  }
}

customElements.define("import-card", ImportCard);
