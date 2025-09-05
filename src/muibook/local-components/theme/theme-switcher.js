class ThemeSwitcher extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // Define brand capabilities
    this.brandCapabilities = {
      mui: { theme: true },
      jal: { theme: true },
      ana: { theme: true },
      modern: { theme: true },
    };

    // Define font links per brand
    this.brandFontLinks = {
      jal: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap",
        },
      ],
      modern: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&display=swap",
        },
      ],
    };
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
    this.applySettings();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {display: block;}
        .grid {gap: var(--space-000);}
        .vh {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }
        mui-select {
          --input-background: var(--app-navbar-surface-100);
        }
        
      </style>
      <mui-grid class="grid" col="1fr" space="var(--space-100)">
        <mui-select
          id="brand-switcher" 
          label="Brand"
          hide-label
          options='[
            {"value": "mui", "label": "Mui"},
            {"value": "jal", "label": "JAL"},
            {"value": "ana", "label": "ANA"},
            {"value": "modern", "label": "Modern"}
          ]'>
        </mui-select>
      </mui-grid>
    `;
  }

  setupListeners() {
    const brandSwitcher = this.shadowRoot.getElementById("brand-switcher");

    brandSwitcher.addEventListener("change", (e) => {
      const val = e.detail.value;
      localStorage.setItem("brand", val);
      document.documentElement.setAttribute("data-brand", val);
      // Update theme switchers based on brand capabilities
      this.updateSwitchers(val);
    });
  }

  applySettings() {
    const brand = localStorage.getItem("brand") || "default";
    document.documentElement.setAttribute("data-brand", brand);

    const brandSwitcher = this.shadowRoot.getElementById("brand-switcher");
    if (brandSwitcher) {
      brandSwitcher.setAttribute("value", brand);
    }

    this.updateSwitchers(brand);
  }

  updateSwitchers(brand) {
    const capabilities = this.brandCapabilities[brand] || {
      theme: true,
    };

    this.removeFontLinks();
    this.injectFontLinksForBrand(brand);

    // Dispatch event to inform dark-mode-toggle about theme capability
    this.dispatchEvent(
      new CustomEvent("brand-theme-capability", {
        detail: { themeEnabled: capabilities.theme },
        bubbles: true,
        composed: true,
      })
    );
  }

  injectFontLinksForBrand(brand) {
    const links = this.brandFontLinks[brand];
    if (!links) return;

    const alreadyInjected = links.some((link) => document.head.querySelector(`link[href="${link.href}"]`));
    if (alreadyInjected) return;

    links.forEach(({ rel, href, crossOrigin }) => {
      const linkEl = document.createElement("link");
      linkEl.rel = rel;
      linkEl.href = href;
      if (crossOrigin) linkEl.crossOrigin = crossOrigin;
      document.head.appendChild(linkEl);
    });
  }

  removeFontLinks() {
    Object.values(this.brandFontLinks)
      .flat()
      .forEach(({ href }) => {
        const link = document.head.querySelector(`link[href="${href}"]`);
        if (link) document.head.removeChild(link);
      });
  }
}

customElements.define("theme-switcher", ThemeSwitcher);
