import "../../../components/mui-heading";
import "../../images/github-mark";
import "../../images/figma-mark";
import "../../images/guides-mark";
import "../../images/storybook-mark";

class StoryTemplate extends HTMLElement {
  static get observedAttributes() {
    return [
      "title",
      "description",
      "accessibility",
      "attrs-reference",
      "imports",
      "website",
      "demo",
      "github",
      "figma",
      "guides",
      "npm",
      "container-max-width",
      "menu-closed",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "menu-closed") {
      const wrapper = this.shadowRoot?.querySelector(".wrapper");
      if (wrapper) {
        if (newValue !== null) {
          wrapper.classList.add("closed");
        } else {
          wrapper.classList.remove("closed");
        }
      }
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.docTabsMediaQuery = window.matchMedia("(max-width: 500px)");
    this.handleDocTabsViewportChange = this.syncGeneratedDocTabsLayout.bind(this);
    this.handleAppShellMutation = this.handleAppShellMutation.bind(this);
  }

  handleAppShellMutation() {
    if (this.appShell) {
      const isClosed = !this.appShell.hasAttribute("open");
      if (isClosed) {
        this.setAttribute("menu-closed", "");
      } else {
        this.removeAttribute("menu-closed");
      }
    }
  }

  connectedCallback() {
    this.docTabsMediaQuery.addEventListener("change", this.handleDocTabsViewportChange);
    this.appShell = document.querySelector("#app-shell");
    if (this.appShell) {
      this.appShellObserver = new MutationObserver(this.handleAppShellMutation);
      this.appShellObserver.observe(this.appShell, { attributes: true, attributeFilter: ["open"] });
      this.handleAppShellMutation(); // Initialize state
    }
    const styles = /*css*/ `
      :host { 
        display: block; 
        width: 100%; 
        container-type: inline-size;
      }

      .storefront-heading { 
        --heading-text-color: var(--app-heading-color);
      }

      .container {
        padding-top: calc(var(--space-500) + env(safe-area-inset-top)); 
        padding-bottom: calc(var(--space-500) + env(safe-area-inset-bottom));
        width: 100%;
        max-width: var(--story-template-container-max-width, none);
        margin-inline: auto;
        box-sizing: border-box;
        container-type: inline-size;
      }

      .wrapper {
        padding-inline: var(--space-500);
      }

      .wrapper::part(gap) {
        gap: var(--space-500);
      }

      .header-group::part(gap) {
        gap: var(--space-300);
      }

      .stories::part(gap) {
        gap: var(--space-500);
      }

      @container (min-width: 768px) {
        .wrapper::part(gap) {
          gap: var(--space-500);
        }

        .header-group::part(gap) {
          gap: var(--space-300);
        }

        .stories::part(gap) {
          gap: var(--space-500);
        }

      }

      @container (min-width: 700px) {
        .wrapper {
          padding-inline: var(--space-600);
        }
      }


      @container (min-width: 960px) {

        .container {
          padding-top: calc(var(--space-600) + env(safe-area-inset-top)); 
          padding-bottom: calc(var(--space-600) + env(safe-area-inset-bottom));
        }

        .wrapper {
          padding-inline: var(--space-800);
        }

        .wrapper.closed {
          padding-left: 10rem;
        }

        .wrapper::part(gap) {
          gap: var(--space-600);
        }

        .header-group::part(gap) {
          gap: var(--space-300);
        }

        .stories::part(gap) {
          gap: var(--space-600);
        }
      }

      @container (min-width: 1200px) {


        .wrapper.closed {
          padding-left: 12rem;
        }


      }

      @container (min-width: 1550px) {
        .container {
          padding-top: calc(var(--space-600) + env(safe-area-inset-top)); 
          padding-bottom: calc(var(--space-800) + env(safe-area-inset-bottom));
        }
      }

    `;

    const title = this.getAttribute("title") || "";
    this.removeAttribute("title");
    const descriptionText = this.getAttribute("description") || "";
    const containerMaxWidth = this.getAttribute("container-max-width");
    const containerStyle = containerMaxWidth
      ? `style="--story-template-container-max-width: ${containerMaxWidth};"`
      : "";
    const isMenuClosed = this.hasAttribute("menu-closed");
    const closedClass = isMenuClosed ? "closed" : "";
    const escapedDescriptionText = descriptionText
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    const description = descriptionText
      ? /*html*/ `<mui-body size="medium" style="max-width: 70ch; text-wrap: pretty;">${escapedDescriptionText}</mui-body>`
      : "";

    const accessibilityItems = this.getAttribute("accessibility");
    let accessibilityArray = accessibilityItems
      ? accessibilityItems
          .split("|||")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
      : [];

    const accessibilityItemsHtml = accessibilityArray
      .map((item) => item.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"))
      .join("|||");
    const accessibilitySection = accessibilityArray.length
      ? /*html*/ `
        <story-accessibility-panel items="${accessibilityItemsHtml}"></story-accessibility-panel>
      `
      : "";
    const generatedAccessibilityPanel = this.querySelector("[data-generated-accessibility-panel]");
    if (generatedAccessibilityPanel) generatedAccessibilityPanel.remove();
    const generatedDocTabs = this.querySelector("[data-generated-doc-tabs]");
    if (generatedDocTabs) generatedDocTabs.remove();

    const accessibilityItemsValue = accessibilityArray.join("|||");
    const apiTypes = Array.from(this.querySelectorAll("story-api-types"));
    const apiGroups = Array.from(new Set(apiTypes.map((apiType) => apiType.parentElement).filter(Boolean)));
    const hasApiTypes = apiTypes.length > 0;

    if (accessibilityItemsValue && hasApiTypes) {
      const apiStack = document.createElement("mui-v-stack");
      apiStack.setAttribute("space", "var(--space-100)");
      apiTypes.forEach((apiType) => apiStack.append(apiType));

      const panel = document.createElement("story-accessibility-panel");
      panel.setAttribute("items", accessibilityItemsValue);
      panel.setAttribute("data-generated-accessibility-panel", "");

      const docTabs = document.createElement("mui-tab-controller");
      docTabs.setAttribute("data-generated-doc-tabs", "");
      docTabs.setAttribute("slot", "documentation");
      docTabs.innerHTML = /*html*/ `
        <mui-v-stack space="var(--space-500)">
          <style>
            [data-generated-doc-tabs] .docs-tab-bar {
              margin: 0 auto;
            }

            @container (min-width: 960px) {
              [data-generated-doc-tabs] .docs-tab-bar {
                margin: 0;
              }
            }
          </style>
          <mui-tab-bar class="docs-tab-bar" stroke="none" active-inset inset-size="300" size="medium" radius="400" style="justify-self: start;">
            <mui-tab-item id="props" active>Prop Types</mui-tab-item>
            <mui-tab-item id="accessibility">Accessibility</mui-tab-item>
          </mui-tab-bar>
          <mui-tab-panel item="props">
            <mui-v-stack space="var(--space-100)" data-panel-stack="props"></mui-v-stack>
          </mui-tab-panel>
          <mui-tab-panel item="accessibility">
            <mui-v-stack space="var(--space-400)" data-panel-stack="accessibility"></mui-v-stack>
          </mui-tab-panel>
        </mui-v-stack>
      `;
      docTabs.querySelector('[data-panel-stack="accessibility"]').append(panel);
      docTabs.querySelector('[data-panel-stack="props"]').append(apiStack);
      apiGroups.forEach((apiGroup) => {
        if (apiGroup !== this && apiGroup.childElementCount === 0 && apiGroup.textContent.trim() === "") {
          apiGroup.remove();
        }
      });
      this.append(docTabs);
    }

    const attrsReferenceItems = this.getAttribute("attrs-reference") || "";
    if (attrsReferenceItems) {
      this.querySelectorAll("story-api-types").forEach((apiTypes) => {
        apiTypes.setAttribute("attrs-reference", attrsReferenceItems);
      });
    }

    const importItemsRaw = this.getAttribute("imports") || "";
    let importItems = [];
    if (importItemsRaw) {
      try {
        const parsed = JSON.parse(importItemsRaw);
        importItems = Array.isArray(parsed) ? parsed : [String(parsed)];
      } catch {
        importItems = importItemsRaw
          .split("|||")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }
    const importSection = importItems.length
      ? /*html*/ `
        <import-card imports='${JSON.stringify(importItems).replaceAll("'", "&apos;")}'></import-card>
      `
      : "";
    const hasMessageContent = Boolean(this.querySelector('[slot="message"]'));
    const supplementalSection = importSection
      ? /*html*/ `
            <mui-v-stack space="var(--space-400)">
              ${importSection}
            </mui-v-stack>
          `
      : "";
    const quicklinksSection = hasMessageContent ? /*html*/ `<slot name="message"></slot>` : "";
    const resourceBreakpoints = `variant="container" observe=".container" breakpoint-low="600" breakpoint-high="1200"`;
    const renderResourceLink = ({ href, label, icon }) => /*html*/ `
      <mui-responsive ${resourceBreakpoints}>
        <mui-link slot="showAbove" target="_blank" href="${href}" rel="noopener" variant="tertiary">
          ${label}<${icon} slot="after"></${icon}>
        </mui-link>
        <mui-link slot="showMiddle" target="_blank" href="${href}" rel="noopener" variant="tertiary" icon-only aria-label="${label}">
          <${icon}></${icon}>
        </mui-link>
        <mui-link slot="showBelow" target="_blank" href="${href}" rel="noopener" variant="tertiary" size="small" icon-only aria-label="${label}">
          <${icon}></${icon}>
        </mui-link>
      </mui-responsive>
    `;

    const demoLink = this.getAttribute("demo");
    const demoContent = demoLink ? renderResourceLink({ href: demoLink, label: "Demo", icon: "mui-icon-globe" }) : "";

    const websiteLink = this.getAttribute("website");
    const websiteContent = websiteLink
      ? renderResourceLink({ href: websiteLink, label: "Try Now", icon: "mui-icon-globe" })
      : "";

    const storybookLink = this.getAttribute("storybook");
    const storybookContent = storybookLink
      ? renderResourceLink({ href: storybookLink, label: "Storybook", icon: "storybook-mark" })
      : "";

    const npmLink = this.getAttribute("npm");
    const npmContent = npmLink ? renderResourceLink({ href: npmLink, label: "Package", icon: "npm-mark" }) : "";

    const githubLink = this.getAttribute("github");
    const githubContent = githubLink
      ? renderResourceLink({ href: githubLink, label: "Github", icon: "github-mark" })
      : "";

    const figmaLink = this.getAttribute("figma");
    const figmaContent = figmaLink ? renderResourceLink({ href: figmaLink, label: "Figma", icon: "figma-mark" }) : "";

    const guidesLink = this.getAttribute("guides");
    const guidesContent = guidesLink
      ? renderResourceLink({ href: guidesLink, label: "Guides", icon: "guides-mark" })
      : "";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-container center class="container" ${containerStyle}>
        <mui-v-stack class="wrapper ${closedClass}">
          <mui-v-stack class="introduction" space="var(--space-500)">
            <mui-v-stack class="header-group">
              <mui-responsive ${resourceBreakpoints}>
                <mui-h-stack slot="showBelow" alignX="space-between" alignY="center">
                  <mui-heading size="2" level="1" class="storefront-heading">${title}</mui-heading>
                  <mui-h-stack space="var(--space-000)">
                    ${demoContent}
                    ${websiteContent}
                    ${npmContent}
                    ${storybookContent}
                    ${guidesContent}
                    ${figmaContent}
                    ${githubContent}
                  </mui-h-stack>
                </mui-h-stack>
                <mui-h-stack slot="showMiddle" alignX="space-between" alignY="center">
                  <mui-heading size="2" level="1" class="storefront-heading">${title}</mui-heading>
                  <mui-h-stack space="var(--space-000)">
                    ${demoContent}
                    ${websiteContent}
                    ${npmContent}
                    ${storybookContent}
                    ${guidesContent}
                    ${figmaContent}
                    ${githubContent}
                  </mui-h-stack>
                </mui-h-stack>
                <mui-h-stack slot="showAbove" alignX="space-between" alignY="center">
                  <mui-heading size="1"level="1" class="storefront-heading">${title}</mui-heading>
                  <mui-h-stack space="var(--space-000)">
                    ${demoContent}
                    ${websiteContent}
                    ${npmContent}
                    ${storybookContent}
                    ${guidesContent}
                    ${figmaContent}
                    ${githubContent}
                  </mui-h-stack>
                </mui-h-stack>
              </mui-responsive>
              ${description}
            </mui-v-stack>
            ${quicklinksSection}
            ${supplementalSection}
            <slot name="documentation"></slot>
          </mui-v-stack>
          <mui-v-stack class="stories">
            ${hasApiTypes ? "" : accessibilitySection}
            <slot></slot>
          </mui-v-stack>
        </mui-v-stack>
      </mui-container>
    `;

    this.syncGeneratedDocTabsLayout();
  }

  disconnectedCallback() {
    this.docTabsMediaQuery.removeEventListener("change", this.handleDocTabsViewportChange);
    if (this.appShellObserver) {
      this.appShellObserver.disconnect();
    }
  }

  syncGeneratedDocTabsLayout() {
    const docTabsBar = this.querySelector("[data-generated-doc-tabs] .docs-tab-bar");
    if (!docTabsBar) return;

    if (this.docTabsMediaQuery.matches) {
      docTabsBar.setAttribute("full-width", "");
    } else {
      docTabsBar.removeAttribute("full-width");
    }
  }
}

customElements.define("story-template", StoryTemplate);
