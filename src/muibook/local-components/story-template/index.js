import "../../../components/mui-heading";
import "../../images/github-mark";
import "../../images/figma-mark";
import "../../images/guides-mark";
import "../../images/storybook-mark";

class StoryTemplate extends HTMLElement {
  static get observedAttributes() {
    return ["title", "description", "accessibility", "website", "demo", "github", "figma", "guides", "npm"];
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
      }

      .wrapper::part(gap) {
        gap: var(--space-500);
      }

      .header-group::part(gap) {
        gap: var(--space-300);
      }

      .introduction::part(gap) {
        gap: var(--space-400);
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

        .introduction::part(gap),
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

        .introduction::part(gap),
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
    const description = descriptionText
      ? /*html*/ `<mui-body size="medium" style="max-width: 70ch; margin-bottom: var(--space-200); text-wrap: pretty;">${descriptionText}</mui-body>`
      : "";

    const accessibilityItems = this.getAttribute("accessibility");
    let accessibilityArray = accessibilityItems
      ? accessibilityItems
          .split("|||")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
      : [];

    // ADD THIS SECTION BACK:
    const accessibilitySection = accessibilityArray.length
      ? /*html*/ `
    <mui-message heading="Accessibility Notes" icon="mui-icon-accessibility">
      <mui-list as="ul">
        ${accessibilityArray
          .map((item) => `<mui-list-item size="x-small" weight="regular">${item}</mui-list-item>`)
          .join("")}
      </mui-list>
    </mui-message> 
  `
      : "";

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
      <mui-container center class="container">
        <mui-v-stack class="wrapper">
          <mui-v-stack class="introduction">
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
            ${accessibilitySection}
            <slot name="message"></slot>
          </mui-v-stack>
          <mui-v-stack class="stories">
            <slot></slot>
          </mui-v-stack>
        </mui-v-stack>
      </mui-container>
    `;
  }
}

customElements.define("story-template", StoryTemplate);
