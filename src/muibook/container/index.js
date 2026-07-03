import { getCurrentRoutePath, normalizeLegacyHashRoute } from "../utils/routes.js";

export class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handleHashRouteChange = this.handleHashRouteChange.bind(this);

    this.setAttribute("role", "main"); // Helps with screen reader navigation

    const style = document.createElement("style");
    style.textContent = /*css*/ `

      :host {
        display: grid;
        background: var(--app-container-surface);
      }

      :host(.focused) {
        outline-offset: calc(var(--stroke-size-400) * -1);
      }
    `;

    this.shadowRoot.appendChild(style);
  }

  handleRouteChange() {
    this.loadComponent();
  }

  handleHashRouteChange() {
    if (!window.location.hash.startsWith("#/")) return;
    normalizeLegacyHashRoute();
    this.loadComponent();
  }

  async loadComponent() {
    normalizeLegacyHashRoute();
    const path = getCurrentRoutePath();
    const routes = {
      "/home": "home-page",

      "/design-guidelines": "design-guidelines",
      "/changelog": "changelog-page",
      "/license": "license-page",
      "/redactd": "muiplay-app",
      "/muiplay": "muiplay-app",
      "/base-theme": "base-theme",
      "/multi-brand-theme": "multi-brand-theme",
      "/overrides": "overrides-page",
      "/create-mui-app": "create-mui-app",
      "/knowledge-overview": "knowledge-page",
      "/knowledge-compositions": "knowledge-compositions-page",
      "/knowledge-rules": "knowledge-rules-page",
      "/knowledge-keywords": "knowledge-keywords-page",
      "/knowledge-mcp": "knowledge-mcp-page",
      "/manifest": "manifest-page",
      "/skills": "skills-page",
      "/typed-elements": "typed-elements",
      "/wrapped-components": "wrapped-components",
      "/react-input-helper": "react-input-helper",
      "/muikit": "muikit-page",
      "/keywords": "agent-keywords-page",
      "/prompts": "agent-prompts-page",
      "/showcase": "showcase-page",
      "/npm": "npm-page",
      "/storybook": "storybook-page",

      "/brand-design-tokens": "tokens-brand",
      "/semantic-design-tokens": "tokens-semantic",
      "/components-design-tokens": "tokens-components",
      "/text-part-selectors": "parts-text",
      "/spacing-part-selectors": "parts-spacing",
      "/layout-part-selectors": "parts-layout",
      "/visual-part-selectors": "parts-visual",

      "/stepper": "story-stepper",
      "/smart-card": "story-smart-card",
      "/field": "story-field",
      "/hint": "story-hint",
      "/form-group": "story-form-group",
      "/form-section": "story-form-section",
      "/form-section-footer": "story-form-section-footer",
      "/form-message": "story-form-message",
      "/prompt": "story-prompt",
      "/agent-prompt": "story-prompt",
      "/prompt-toggle": "story-prompt-toggle",
      "/prompt-message": "story-prompt-message",
      "/agent-bubble": "story-prompt-message",
      "/prompt-preview": "story-prompt-preview",
      "/media-player": "story-media-player",
      "/model-viewer": "story-model-viewer",
      "/video-thumbnail": "story-video-thumbnail",
      "/range-input": "story-range-input",
      "/tab-bar": "story-tab-bar",
      "/carousel": "story-carousel",
      "/addon": "story-addon",
      "/input": "story-input",
      "/search-input": "story-search-input",
      "/chip-input": "story-chip-input",
      "/textarea": "story-textarea",
      "/checkbox": "story-checkbox",
      "/radio": "story-radio",
      "/select": "story-select",
      "/calendar": "story-calendar",
      "/time": "story-time",
      "/time-picker": "story-time-picker",
      "/date-picker": "story-date-picker",
      "/switch": "story-switch",
      "/file-upload": "story-file-upload",
      "/alert": "story-alert",
      "/message": "story-message",
      "/badge": "story-badge",
      "/status": "story-status",
      "/button": "story-button",
      "/dropdown": "story-dropdown",
      "/responsive": "story-responsive",
      "/loader": "story-loader",
      "/spinner": "story-spinner",
      "/skeleton": "story-skeleton",
      "/stack": "story-stack",
      "/grid": "story-grid",
      "/card": "story-cards",
      "/chip": "story-chip",
      "/chip-rail": "story-chip-rail",
      "/dialog": "story-dialog",
      "/drawer": "story-drawer",
      "/persistent-left": "story-persistent-left",
      "/persistent-right": "story-persistent-right",
      "/push-left": "story-push-left",
      "/push-right": "story-push-right",
      "/progress": "story-progress",
      "/progress-ring": "story-progress-ring",
      "/container": "story-container",
      "/heading": "story-heading",
      "/body": "story-body",
      "/image": "story-image",
      "/avatar": "story-avatar",
      "/avatar-chip": "story-avatar-chip",
      "/link": "story-link",
      "/list": "story-list",
      "/quote": "story-quote",
      "/rule": "story-rule",
      "/icons": "story-icon",
      "/illustrations": "story-illustration",
      "/code": "story-code",
      "/slide-frame": "story-slide-frame",
      "/accordion": "story-accordion",
      "/table": "story-table",
      "/slat": "story-slat",

      "/wallet": "comp-wallet",
      "/onboarding": "comp-onboarding",
      "/muitube": "comp-mui-tube",
      "/song-page": "comp-song-page",
      "/dashboard": "comp-dashboard",
    };

    // ✨ NEW CHECK ✨
    if (!path.startsWith("/")) {
      // It's just a hash fragment (e.g., "main-content") — don't reload a page!
      return;
    }

    const tagName = routes[path] || routes["/home"];

    const importMap = {
      "home-page": () => import("../pages/home-page/index.js"),
      "muiplay-app": () => import("../pages/muiplay/index.js"),
      "create-mui-app": () => import("../pages/create-mui-app/index.js"),
      "knowledge-page": () => import("../pages/knowledge/index.js"),
      "knowledge-compositions-page": () => import("../pages/knowledge/compositions.js"),
      "knowledge-rules-page": () => import("../pages/knowledge/rules.js"),
      "knowledge-keywords-page": () => import("../pages/knowledge/keywords.js"),
      "knowledge-mcp-page": () => import("../pages/knowledge/mcp.js"),
      "manifest-page": () => import("../pages/manifest/index.js"),
      "skills-page": () => import("../pages/skills/index.js"),
      "base-theme": () => import("../pages/base-theme/index.js"),
      "multi-brand-theme": () => import("../pages/multi-brand-theme/index.js"),
      "overrides-page": () => import("../pages/overrides/index.js"),
      "design-guidelines": () => import("../pages/design-guidelines/index.js"),
      "typed-elements": () => import("../pages/typed-elements/index.js"),
      "wrapped-components": () => import("../pages/wrapped-components/index.js"),
      "react-input-helper": () => import("../pages/react-input-helper/index.js"),
      "muikit-page": () => import("../pages/muikit/index.js"),
      "agent-keywords-page": () => import("../pages/agent-keywords/index.js"),
      "agent-prompts-page": () => import("../pages/agent-prompts/index.js"),
      "showcase-page": () => import("../pages/showcase/index.js"),
      "npm-page": () => import("../pages/packages/index.js"),
      "storybook-page": () => import("../pages/storybook/index.js"),
      "changelog-page": () => import("../pages/changelog/index.js"),
      "license-page": () => import("../pages/license/index.js"),

      "tokens-brand": () => import("../story/tokens/brand.js"),
      "tokens-semantic": () => import("../story/tokens/semantic.js"),
      "tokens-components": () => import("../story/tokens/components.js"),

      "parts-text": () => import("../story/parts/text.js"),
      "parts-spacing": () => import("../story/parts/spacing.js"),
      "parts-layout": () => import("../story/parts/layout.js"),
      "parts-visual": () => import("../story/parts/visual.js"),

      "comp-wallet": () => import("../story/compositions/wallet"),
      "comp-onboarding": () => import("../story/compositions/onboarding/index.js"),
      "comp-mui-tube": () => import("../story/compositions/muitube/index.js"),
      "comp-song-page": () => import("../story/compositions/song-page/index.js"),
      "comp-dashboard": () => import("../story/compositions/dashboard/index.js"),

      "story-stepper": () => import("../story/components/mui-stepper"),
      "story-button": () => import("../story/components/mui-button"),
      "story-dropdown": () => import("../story/components/mui-dropdown"),
      "story-loader": () => import("../story/components/mui-loader"),
      "story-spinner": () => import("../story/components/mui-spinner"),
      "story-skeleton": () => import("../story/components/mui-skeleton"),
      "story-link": () => import("../story/components/mui-link"),
      "story-icon": () => import("../story/components/mui-icons"),
      "story-illustration": () => import("../story/components/mui-illustrations"),
      "story-image": () => import("../story/components/mui-image"),
      "story-avatar": () => import("../story/components/mui-avatar"),
      "story-avatar-chip": () => import("../story/components/mui-avatar-chip"),
      "story-heading": () => import("../story/components/mui-heading"),
      "story-body": () => import("../story/components/mui-body"),
      "story-cards": () => import("../story/components/mui-card"),
      "story-chip": () => import("../story/components/mui-chip"),
      "story-chip-rail": () => import("../story/components/mui-chip-rail"),
      "story-dialog": () => import("../story/components/mui-dialog"),
      "story-drawer": () => import("../story/components/mui-drawer"),
      "story-persistent-left": () => import("../story/components/mui-drawer/persistent/left.js"),
      "story-persistent-right": () => import("../story/components/mui-drawer/persistent/right.js"),
      "story-push-left": () => import("../story/components/mui-drawer/push/left.js"),
      "story-push-right": () => import("../story/components/mui-drawer/push/right.js"),
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
      "story-calendar": () => import("../story/components/mui-calendar"),
      "story-time": () => import("../story/components/mui-time"),
      "story-time-picker": () => import("../story/components/mui-time-picker"),
      "story-date-picker": () => import("../story/components/mui-date-picker"),
      "story-progress": () => import("../story/components/mui-progress"),
      "story-progress-ring": () => import("../story/components/mui-progress-ring"),
      "story-code": () => import("../story/components/mui-code"),
      "story-slide-frame": () => import("../story/components/mui-slide-frame"),
      "story-quote": () => import("../story/components/mui-quote"),
      "story-smart-card": () => import("../story/components/mui-smart-card"),
      "story-table": () => import("../story/components/mui-table"),
      "story-field": () => import("../story/components/mui-field"),
      "story-hint": () => import("../story/components/mui-hint"),
      "story-form-group": () => import("../story/components/mui-form-group"),
      "story-form-section": () => import("../story/components/mui-form-section"),
      "story-form-section-footer": () => import("../story/components/mui-form-section-footer"),
      "story-form-message": () => import("../story/components/mui-form-message"),
      "story-prompt": () => import("../story/components/mui-prompt"),
      "story-prompt-toggle": () => import("../story/components/mui-prompt-toggle"),
      "story-prompt-message": () => import("../story/components/mui-prompt-message"),
      "story-prompt-preview": () => import("../story/components/mui-prompt-preview"),
      "story-media-player": () => import("../story/components/mui-media-player"),
      "story-model-viewer": () => import("../story/components/mui-model-viewer"),
      "story-video-thumbnail": () => import("../story/components/mui-video-thumbnail"),
      "story-range-input": () => import("../story/components/mui-range-input"),
      "story-alert": () => import("../story/components/mui-alert"),
      "story-message": () => import("../story/components/mui-message"),
      "story-status": () => import("../story/components/mui-status"),
      "story-file-upload": () => import("../story/components/mui-file-upload"),
      "story-carousel": () => import("../story/components/mui-carousel"),
      "story-tab-bar": () => import("../story/components/mui-tabs"),
      "story-list": () => import("../story/components/mui-list"),
      "story-input": () => import("../story/components/mui-input"),
      "story-search-input": () => import("../story/components/mui-search-input"),
      "story-chip-input": () => import("../story/components/mui-chip-input"),
      "story-textarea": () => import("../story/components/mui-textarea"),
      "story-checkbox": () => import("../story/components/mui-checkbox"),
      "story-radio": () => import("../story/components/mui-radio"),
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

      // ✨ Pass down brand and theme from <html>
      const html = document.documentElement;
      page.setAttribute("data-brand", html.getAttribute("data-brand") || "mui");
      page.setAttribute("data-theme", html.getAttribute("data-theme") || "light");

      // Append to shadow DOM
      this.shadowRoot.appendChild(page);

      // ✨ Observe <html> attributes and propagate to page
      const observer = new MutationObserver(() => {
        page.setAttribute("data-brand", html.getAttribute("data-brand") || "mui");
        page.setAttribute("data-theme", html.getAttribute("data-theme") || "light");
      });
      observer.observe(html, { attributes: true, attributeFilter: ["data-brand", "data-theme"] });
    }

    // Scroll to top when page route changes
    window.scrollTo(0, 0);

    // Add "home" class if current path is home
    if (path === "/home") {
      this.classList.add("home");
    } else {
      this.classList.remove("home");
    }
  }

  connectedCallback() {
    window.addEventListener("popstate", this.handleRouteChange);
    window.addEventListener("hashchange", this.handleHashRouteChange);
    this.addEventListener("blur", () => {
      this.classList.remove("focused");
    });
    this.loadComponent();
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleRouteChange);
    window.removeEventListener("hashchange", this.handleHashRouteChange);
  }
}

customElements.define("app-container", AppContainer);
