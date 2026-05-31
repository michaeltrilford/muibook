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
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const styles = /*css*/ `
      :host { display: block; width: 100%; }

      .storefront-heading { 
        --heading-text-color: var(--app-heading-color);
      }

      .container {
        padding-top: calc(var(--space-500) + env(safe-area-inset-top)); 
        padding-bottom: calc(var(--space-500) + env(safe-area-inset-bottom));
        width: calc(100% - (var(--space-500) * 2));
        max-width: var(--story-template-container-max-width, none);
        margin-inline: auto;
        box-sizing: border-box;
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

      @media (min-width: 768px) {
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

      @media (min-width: 960px) {

        .container {
          padding-top: calc(var(--space-600) + env(safe-area-inset-top)); 
          padding-bottom: calc(var(--space-600) + env(safe-area-inset-bottom));
          width: calc(100% - (var(--space-800) * 2));
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

      @media (min-width: 1550px) {
        .container {
          padding-top: calc(var(--space-800) + env(safe-area-inset-top)); 
          padding-bottom: calc(var(--space-800) + env(safe-area-inset-bottom));
        }
      }

    `;

    const title = this.getAttribute("title") || "";
    const descriptionText = this.getAttribute("description") || "";
    const containerMaxWidth = this.getAttribute("container-max-width");
    const containerStyle = containerMaxWidth
      ? `style="--story-template-container-max-width: ${containerMaxWidth};"`
      : "";
    const description = descriptionText
      ? /*html*/ `<mui-body size="medium" style="max-width: 70ch; text-wrap: pretty;">${descriptionText}</mui-body>`
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

            @media (min-width: 960px) {
              [data-generated-doc-tabs] .docs-tab-bar {
                margin: 0;
              }
            }
          </style>
          <mui-tab-bar class="docs-tab-bar" stroke="none" active-inset inset-size="300" size="medium" radius="400" style="justify-self: start;">
            <mui-tab-item id="accessibility" active>Accessibility</mui-tab-item>
            <mui-tab-item id="props">Prop Types</mui-tab-item>
          </mui-tab-bar>
          <mui-tab-panel item="accessibility">
            <mui-v-stack space="var(--space-400)" data-panel-stack="accessibility"></mui-v-stack>
          </mui-tab-panel>
          <mui-tab-panel item="props">
            <mui-v-stack space="var(--space-100)" data-panel-stack="props"></mui-v-stack>
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

    const demoLink = this.getAttribute("demo");
    const demoContent = demoLink
      ? /*html*/ `
        <mui-responsive breakpoint="1200">
          <mui-link slot="showAbove" target="_blank" href="${demoLink}" rel="noopener" variant="tertiary">Demo<mui-icon-globe slot="after"></mui-icon-globe></mui-link>
          <mui-link slot="showBelow" target="_blank" href="${demoLink}" rel="noopener" variant="tertiary"><mui-icon-globe></mui-icon-globe></mui-link>
        </mui-responsive>      
      `
      : "";

    const websiteLink = this.getAttribute("website");
    const websiteContent = websiteLink
      ? /*html*/ `
        <mui-responsive breakpoint="1200">
          <mui-link slot="showAbove" target="_blank" href="${websiteLink}" rel="noopener" variant="tertiary">Try Now<mui-icon-globe slot="after"></mui-icon-globe></mui-link>
          <mui-link slot="showBelow" target="_blank" href="${websiteLink}" rel="noopener" variant="tertiary"><mui-icon-globe></mui-icon-globe></mui-link>
        </mui-responsive>
      `
      : "";

    const storybookLink = this.getAttribute("storybook");
    const storybookContent = storybookLink
      ? /*html*/ `
        <mui-responsive breakpoint="1200">
          <mui-link slot="showAbove" target="_blank" href="${storybookLink}" rel="noopener" variant="tertiary">Storybook<storybook-mark slot="after"></storybook-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" href="${storybookLink}" rel="noopener" variant="tertiary"><storybook-mark></storybook-mark></mui-link>
        </mui-responsive>
      `
      : "";

    const npmLink = this.getAttribute("npm");
    const npmContent = npmLink
      ? /*html*/ `
        <mui-responsive breakpoint="1200">
          <mui-link slot="showAbove" target="_blank" href="${npmLink}" rel="noopener" variant="tertiary">Package<npm-mark slot="after"></npm-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" href="${npmLink}" rel="noopener" variant="tertiary"><npm-mark></npm-mark></mui-link>
        </mui-responsive>
      `
      : "";

    const githubLink = this.getAttribute("github");
    const githubContent = githubLink
      ? /*html*/ `
        <mui-responsive breakpoint="1200">
          <mui-link slot="showAbove" target="_blank" href="${githubLink}" rel="noopener" variant="tertiary">Github<github-mark slot="after"></github-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" href="${githubLink}" rel="noopener" variant="tertiary"><github-mark></github-mark></mui-link>
        </mui-responsive>
      `
      : "";

    const figmaLink = this.getAttribute("figma");
    const figmaContent = figmaLink
      ? /*html*/ `
        <mui-responsive breakpoint="1200">
         <mui-link slot="showAbove" target="_blank" href="${figmaLink}" rel="noopener" variant="tertiary">Figma<figma-mark slot="after"></figma-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" href="${figmaLink}" rel="noopener" variant="tertiary"><figma-mark></figma-mark></mui-link>
        </mui-responsive>
      `
      : "";

    const guidesLink = this.getAttribute("guides");
    const guidesContent = guidesLink
      ? /*html*/ `
        <mui-responsive breakpoint="1200">
          <mui-link slot="showAbove" target="_blank" href="${guidesLink}" rel="noopener" variant="tertiary">Guides<guides-mark slot="after"></guides-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" icon-only href="${guidesLink}" rel="noopener" variant="tertiary"><guides-mark></guides-mark></mui-link>
        </mui-responsive>
      `
      : "";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-container center class="container" ${containerStyle}>
        <mui-v-stack class="wrapper">
          <mui-v-stack class="introduction" space="var(--space-500)">
            <mui-v-stack class="header-group">
              <mui-responsive breakpoint="1200">
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
  }
}

customElements.define("story-template", StoryTemplate);
