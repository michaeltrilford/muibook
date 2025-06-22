import "../../images/github-mark";

class specCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "description", "usage", "accessibility", "github"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { display: block; }

      mui-card {
        border: var(--border-thick);
      }

      mui-card-body {
        padding: 0;
      }

    `;

    const title = this.getAttribute("title") || "";
    const description = this.hasAttribute("description")
      ? /*html*/ `<mui-body style="max-width: 86ch; margin-top: var(--space-200);" size="small">${this.getAttribute(
          "description"
        )}</mui-body>`
      : "";

    const githubLink = this.getAttribute("github");
    const githubContent = githubLink
      ? /*html*/ `
        <mui-link 
          class="github" 
          href="${githubLink}" 
          target="_blank" 
          rel="noopener">
          Usage
          <github-mark slot="after"></github-mark>
        </mui-link>
      `
      : "";

    // Handle usage list
    const usageItems = this.getAttribute("usage");
    let usageArray = [];

    try {
      const sanitizedItems = usageItems ? usageItems.replace(/(['"])(?=\w)(.*?)(?=\w)\1/g, "$2") : "";
      usageArray = sanitizedItems ? JSON.parse(sanitizedItems) : [];
    } catch (e) {
      usageArray = usageItems ? usageItems.split(";") : [];
    }

    const usageContent = usageArray.length
      ? /*html*/ `
        <mui-heading size="6" level="3" style="margin-top: var(--space-300); margin-bottom: var(--space-050);">Usage details</mui-heading>
        <mui-list as="ul" style="max-width: 65ch;">
          ${usageArray
            .map(
              (usage) =>
                /*html*/ `<mui-list-item size="small" weight="medium" style="margin-bottom: var(--space-050)">${usage.trim()}</mui-list-item>`
            )
            .join("")}
        </mui-list>
      `
      : "";

    // Handle accessibility list
    const accessibilityItems = this.getAttribute("accessibility");

    let accessibilityArray = [];

    try {
      // Try parse JSON (after cleaning quotes)
      const sanitizedItems = accessibilityItems ? accessibilityItems.replace(/(['"])(?=\w)(.*?)(?=\w)\1/g, "$2") : "";
      accessibilityArray = sanitizedItems ? JSON.parse(sanitizedItems) : [];
    } catch (e) {
      // Fallback split by semicolon
      accessibilityArray = accessibilityItems ? accessibilityItems.split(";") : [];
    }

    const accessibilityContent = accessibilityArray.length
      ? /*html*/ `
    <mui-heading size="6" level="3" style="margin-top: var(--space-300); margin-bottom: var(--space-050);">Accessibility details</mui-heading>
    <mui-list as="ul" style="max-width: 65ch;">
      ${accessibilityArray
        .map(
          (accessibility) =>
            /*html*/ `<mui-list-item size="small" weight="medium" style="margin-bottom: var(--space-050)">${accessibility.trim()}</mui-list-item>`
        )
        .join("")}
    </mui-list>
  `
      : "";

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-card>
        ${
          this.hasAttribute("noheader")
            ? ""
            : /*html*/ `
          <mui-card-header>
            <mui-h-stack alignX="space-between" alignY="center">
              <mui-heading size="3" level="2">${title}</mui-heading>
              ${githubContent}
            </mui-h-stack>
            <mui-v-stack space="var(--space-100)">
              ${description}
              ${usageContent}
              ${accessibilityContent}
            </mui-v-stack>

          </mui-card-header>
        `
        }
        <mui-rule></mui-rule>
        <mui-card-body>
          <slot name="body"></slot>
        </mui-card-body>
        <mui-card-footer><slot name="footer"></slot></mui-card-footer>
      </mui-card>
    `;
  }
}

customElements.define("spec-card", specCard);
