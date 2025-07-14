import "../../../components/mui-heading";
import "../../images/github-mark";
import "../../images/figma-mark";
import "../../images/guides-mark";

class StoryTemplate extends HTMLElement {
  static get observedAttributes() {
    return ["title", "description", "accessibility", "website", "demo", "github", "figma", "guides"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const styles = /*css*/ `
      :host { display: block; width: 100%; }
    `;

    const title = this.getAttribute("title") || "";
    const descriptionText = this.getAttribute("description") || "";
    const description = descriptionText
      ? /*html*/ `<mui-body large style="letter-spacing: 0.75px; max-width: 75ch;">${descriptionText}</mui-body>`
      : "";

    const accessibilityItems = this.getAttribute("accessibility");
    let accessibilityArray = [];

    const demoLink = this.getAttribute("demo");
    const demoContent = demoLink
      ? /*html*/ `<mui-link target="_blank" href="${demoLink}" rel="noopener" variant="secondary">Demo<mui-icon-globe slot="after"></mui-icon-globe></mui-link>`
      : "";

    const websiteLink = this.getAttribute("website");
    const websiteContent = websiteLink
      ? /*html*/ `<mui-link target="_blank" href="${websiteLink}" rel="noopener" variant="secondary">Try Now<mui-icon-globe slot="after"></mui-icon-globe></mui-link>`
      : "";

    const githubLink = this.getAttribute("github");
    const githubContent = githubLink
      ? /*html*/ `
        <mui-responsive breakpoint="1000">
          <mui-link slot="showAbove" target="_blank" href="${githubLink}" rel="noopener" variant="secondary">Github<github-mark slot="after"></github-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" href="${githubLink}" rel="noopener" variant="secondary"><github-mark></github-mark></mui-link>
        </mui-responsive>
      `
      : "";

    const figmaLink = this.getAttribute("figma");
    const figmaContent = figmaLink
      ? /*html*/ `
        <mui-responsive breakpoint="1000">
         <mui-link slot="showAbove" target="_blank" href="${figmaLink}" rel="noopener" variant="secondary">Figma<figma-mark slot="after"></figma-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" href="${figmaLink}" rel="noopener" variant="secondary"><figma-mark></figma-mark></mui-link>
        </mui-responsive>
      `
      : "";

    const guidesLink = this.getAttribute("guides");
    const guidesContent = guidesLink
      ? /*html*/ `
        <mui-responsive breakpoint="1000">
          <mui-link slot="showAbove" target="_blank" href="${guidesLink}" rel="noopener" variant="secondary">Guides<guides-mark slot="after"></guides-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" icon-only href="${guidesLink}" rel="noopener" variant="secondary"><guides-mark></guides-mark></mui-link>
        </mui-responsive>
      `
      : "";

    try {
      const sanitizedItems = accessibilityItems ? accessibilityItems.replace(/(['"])(?=\w)(.*?)(?=\w)\1/g, "$2") : "";
      accessibilityArray = sanitizedItems ? JSON.parse(sanitizedItems) : [];
    } catch (e) {
      accessibilityArray = accessibilityItems ? accessibilityItems.split(";") : [];
    }

    const accessibilitySection = accessibilityArray.length
      ? /*html*/ `
        <mui-message heading="Accessibility Notes" icon="mui-icon-accessibility">
            <mui-list as="ul">
              ${accessibilityArray
                .map((item) => `<mui-list-item size="small" weight="medium">${item.trim()}</mui-list-item>`)
                .join("")}
            </mui-list>
        </mui-message> 
      `
      : "";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-container center>
        <mui-v-stack space="var(--space-700)">
          <mui-v-stack space="var(--space-600)">
            <mui-v-stack space="var(--space-400)">
              <mui-responsive breakpoint="768">
                <mui-h-stack slot="showBelow" alignX="space-between" alignY="center">
                  <mui-heading size="2" level="1">${title}</mui-heading>
                  <mui-h-stack space="var(--space-100)">
                    ${demoContent}
                    ${websiteContent}
                    ${guidesContent}
                    ${figmaContent}
                    ${githubContent}
                  </mui-h-stack>
                </mui-h-stack>
                <mui-h-stack slot="showAbove" alignX="space-between" alignY="center">
                  <mui-heading size="1"level="1">${title}</mui-heading>
                  <mui-h-stack space="var(--space-100)">
                    ${demoContent}
                    ${websiteContent}
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
          <div>
            <slot></slot>
          </div>
        </mui-v-stack>
      </mui-container>
    `;
  }
}

customElements.define("story-template", StoryTemplate);
