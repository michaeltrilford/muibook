import "../../../components/mui-heading";
import "../../images/github-mark";
import "../../images/figma-mark";
import "../../images/guides-mark";

class StoryTemplate extends HTMLElement {
  static get observedAttributes() {
    return ["title", "description", "accessibility", "demo", "github", "figma", "guides"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const styles = /*css*/ `
      :host { display: block; width: 100%; }

      .resources::part(display) {
        display: flex;
        gap: var(--space-200);
        padding: var(--space-200) var(--space-300);
      }
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
      ? /*html*/ `<mui-link class="resources" href="${demoLink}" target="_blank" rel="noopener" variant="secondary">Demo<mui-icon-globe></mui-icon-globe></mui-link>`
      : "";

    const githubLink = this.getAttribute("github");
    const githubContent = githubLink
      ? /*html*/ `<mui-link class="resources" href="${githubLink}" target="_blank" rel="noopener" variant="secondary">Github<github-mark></github-mark></mui-link>`
      : "";

    const figmaLink = this.getAttribute("figma");
    const figmaContent = figmaLink
      ? /*html*/ `<mui-link class="resources" href="${figmaLink}" target="_blank" rel="noopener" variant="secondary">Figma<figma-mark></figma-mark></mui-link>`
      : "";

    const guidesLink = this.hasAttribute("guides");
    const guidesContent = guidesLink
      ? /*html*/ `<mui-link class="resources" href="/#/design-guidelines" variant="secondary">Guides<guides-mark></guides-mark></mui-link>`
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
                <mui-v-stack slot="showBelow" space="var(--space-300)">
                  <mui-heading size="1" weight="800">${title}</mui-heading>
                  <mui-h-stack space="var(--space-100)">
                    ${demoContent}
                    ${guidesContent}
                    ${figmaContent}
                    ${githubContent}
                  </mui-h-stack>
                </mui-v-stack>
                <mui-h-stack slot="showAbove" alignX="space-between" alignY="center">
                  <mui-heading size="1" weight="800">${title}</mui-heading>
                  <mui-h-stack space="var(--space-100)">
                    ${demoContent}
                    ${guidesContent}
                    ${figmaContent}
                    ${githubContent}
                  </mui-h-stack>
                </mui-h-stack>
              </mui-responsive>
              ${description}
            </mui-v-stack>
            ${accessibilitySection}
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
