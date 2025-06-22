import "../../images/github-mark";

class storyCard extends HTMLElement {
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

      .story-body {
        padding: var(--space-400);
      }

      section {
        background: var(--surface-recessed-alpha);
        position: relative;
      }

      section:before,
      section:after,
      div:before,
      div:after {
        content: "";
        position: absolute;
        background: #12caff;
      }

      section:before,
      section:after { height: 1px; }
      div:before,
      div:after { width: 1px; }

      section:before {
        top: 0;
        left: -12px;
        right: 2px;
        width: calc(12px + 100% + 2px);
      }

      section:after {
        bottom: 0;
        left: -4px;
        right: 8px;
        width: calc(4px + 100% + 8px);
      }

      div:before {
        top: -4px;
        height: calc(4px + 100% + 4px);
        left: 0;
      }

      div:after {
        top: -4px;
        height: calc(4px + 100% + 6px);
        right: 0;
      }

      .github::part(display) {
        display: flex;
        gap: var(--space-200);
        padding: var(--space-200) var(--space-300);
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
            : `
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
        <mui-card-body>
          <section>
            <div class="story-body">
              <slot name="body"></slot>
            </div>
          </section>
        </mui-card-body>
        <mui-card-footer><slot name="footer"></slot></mui-card-footer>
      </mui-card>
    `;
  }
}

customElements.define("story-card", storyCard);
