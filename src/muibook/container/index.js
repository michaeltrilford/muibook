export class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.setAttribute("tabindex", "0"); // Make the app-container focusable
    this.setAttribute("role", "main"); // Helps with screen reader navigation

    const style = document.createElement("style");
    style.textContent = /*css*/ `
      :host {
        display: grid;
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-top);
      }

      :host(.focused) {
        outline-offset: calc(var(--stroke-size-500) * -1);
      }

      @media (min-width: 960px) {
        :host {
          padding: var(--space-500);         
          padding-left: var(--space-500);
          padding-right: var(--space-500);
          padding-bottom: var(--space-500);
        } 
      }

    `;

    this.shadowRoot.appendChild(style);
  }

  async loadComponent() {
    const path = window.location.hash.slice(1) || "/home";
    const routes = {
      "/home": "home-page",

      "/design-guidelines": "design-guidelines",
      "/theme-setup": "theme-setup",
      "/create-mui-app": "create-mui-app",
      "/react-wrappers": "react-wrappers",

      "/base-design-tokens": "tokens-base",
      "/semantic-design-tokens": "tokens-semantic",
      "/contextual-design-tokens": "tokens-contextual",
      "/surface-design-tokens": "tokens-surface",
      "/components-design-tokens": "tokens-components",
      "/text-part-selectors": "parts-text",
      "/spacing-part-selectors": "parts-spacing",
      "/layout-part-selectors": "parts-layout",
      "/visual-part-selectors": "parts-visual",

      "/smart-card": "story-smart-card",
      "/field": "story-field",
      "/tab-bar": "story-tab-bar",
      "/carousel": "story-carousel",
      "/addon": "story-addon",
      "/input": "story-input",
      "/select": "story-select",
      "/switch": "story-switch",
      "/file-upload": "story-file-upload",
      "/alert": "story-alert",
      "/message": "story-message",
      "/badge": "story-badge",
      "/button": "story-button",
      "/responsive": "story-responsive",
      "/stack": "story-stack",
      "/grid": "story-grid",
      "/card": "story-cards",
      "/container": "story-container",
      "/heading": "story-heading",
      "/body": "story-body",
      "/image": "story-image",
      "/link": "story-link",
      "/list": "story-list",
      "/quote": "story-quote",
      "/rule": "story-rule",
      "/icons": "story-icon",
      "/code": "story-code",
      "/accordion": "story-accordion",
      "/table": "story-table",
      "/slat": "story-slat",

      "/agent": "comp-agent-ui",
      "/wallet": "comp-wallet",
      "/gyro": "comp-gyro",
    };

    // ✨ NEW CHECK ✨
    if (!path.startsWith("/")) {
      // It's just a hash fragment (e.g., "main-content") — don't reload a page!
      return;
    }

    const tagName = routes[path] || routes["/home"];

    const importMap = {
      "home-page": () => import("../pages/home-page/index.js"),
      "create-mui-app": () => import("../pages/create-mui-app/index.js"),
      "theme-setup": () => import("../pages/theme-setup/index.js"),
      "design-guidelines": () => import("../pages/design-guidelines/index.js"),
      "react-wrappers": () => import("../pages/react-wrappers/index.js"),

      "tokens-base": () => import("../story/tokens/base.js"),
      "tokens-semantic": () => import("../story/tokens/semantic.js"),
      "tokens-contextual": () => import("../story/tokens/contextual.js"),
      "tokens-surface": () => import("../story/tokens/surface.js"),
      "tokens-components": () => import("../story/tokens/components.js"),

      "parts-text": () => import("../story/parts/text.js"),
      "parts-spacing": () => import("../story/parts/spacing.js"),
      "parts-layout": () => import("../story/parts/layout.js"),
      "parts-visual": () => import("../story/parts/visual.js"),

      "comp-agent-ui": () => import("../story/compositions/agent-ui"),
      "comp-wallet": () => import("../story/compositions/wallet"),

      "story-button": () => import("../story/components/mui-button"),
      "story-link": () => import("../story/components/mui-link"),
      "story-icon": () => import("../story/components/mui-icons"),
      "story-image": () => import("../story/components/mui-image"),
      "story-heading": () => import("../story/components/mui-heading"),
      "story-body": () => import("../story/components/mui-body"),
      "story-cards": () => import("../story/components/mui-card"),
      "story-responsive": () => import("../story/components/mui-responsive"),
      "story-stack": () => import("../story/components/mui-stack"),
      "story-accordion": () => import("../story/components/mui-accordion"),
      "story-container": () => import("../story/components/mui-container"),
      "story-addon": () => import("../story/components/mui-addon"),
      "story-badge": () => import("../story/components/mui-badge"),
      "story-grid": () => import("../story/components/mui-grid"),
      "story-switch": () => import("../story/components/mui-switch"),
      "story-slat": () => import("../story/components/mui-slat"),
      "story-rule": () => import("../story/components/mui-rule"),
      "story-select": () => import("../story/components/mui-select"),
      "story-code": () => import("../story/components/mui-code"),
      "story-quote": () => import("../story/components/mui-quote"),
      "story-smart-card": () => import("../story/components/mui-smart-card"),
      "story-table": () => import("../story/components/mui-table"),
      "story-field": () => import("../story/components/mui-field"),
      "story-alert": () => import("../story/components/mui-alert"),
      "story-message": () => import("../story/components/mui-message"),
      "story-file-upload": () => import("../story/components/mui-file-upload"),
      "story-carousel": () => import("../story/components/mui-carousel"),
      "story-tab-bar": () => import("../story/components/mui-tabs"),
      "story-list": () => import("../story/components/mui-list"),
      "story-input": () => import("../story/components/mui-input"),
    };

    await (importMap[tagName]?.() ?? Promise.resolve());

    // Clear previous content
    this.shadowRoot.querySelectorAll("*").forEach((el) => {
      if (el.tagName.toLowerCase() !== "style") {
        el.remove();
      }
    });

    // Check if the component has been server-loaded
    const existingPage = this.shadowRoot.querySelector(tagName);

    if (existingPage && existingPage.classList.contains("server-loaded")) {
      // If already loaded, don't reload, just update
      console.log("Server-loaded page, no need to reload.");
    } else {
      // Create and insert the new component
      const page = document.createElement(tagName);

      // Add class to trigger server-loaded condition
      page.classList.add("server-loaded");

      this.shadowRoot.appendChild(page);
    }

    // Scroll to top when page route changes
    window.scrollTo(0, 0);
  }

  connectedCallback() {
    window.addEventListener("hashchange", () => this.loadComponent());
    this.addEventListener("blur", () => {
      this.setAttribute("tabindex", "-1"); // Reset after user tabs away
    });
    this.loadComponent();
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.loadComponent);
  }
}

customElements.define("app-container", AppContainer);
