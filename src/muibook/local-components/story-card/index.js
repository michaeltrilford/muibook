import "../../images/github-mark";

class storyCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "description", "usage", "usageLink", "accessibility", "github"];
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
        background: var(--app-story-card);
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

      .details {
        text-transform: uppercase;
        --heading-font-size-600: var(--font-size-50);
        margin-top: var(--space-400); 
        margin-bottom: var(--space-050);
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
        <mui-responsive breakpoint="1200">
          <mui-link slot="showAbove" target="_blank" href="${githubLink}" rel="noopener" variant="tertiary">Github<github-mark slot="after"></github-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" href="${githubLink}" rel="noopener" variant="tertiary"><github-mark></github-mark></mui-link>
        </mui-responsive>
      `
      : "";

    // Handle usage list - Updated to use ||| delimiter
    const usageItems = this.getAttribute("usage");
    const usageLink = this.getAttribute("usageLink");
    let usageArray = usageItems
      ? usageItems
          .split("|||")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
      : [];

    const usageContent = usageArray.length
      ? /*html*/ `
        <mui-heading class="details" size="6" level="3">Usage details</mui-heading>
        <mui-list as="ul" style="max-width: 65ch;">
          ${usageArray
            .map(
              (usage) => /*html*/ `
            <mui-list-item size="x-small" weight="medium" style="margin-bottom: var(--space-050)">
              ${usage}
            </mui-list-item>`
            )
            .join("")}
        </mui-list>
      `
      : "";

    const usageLinkContent = usageLink
      ? /*html*/ `
        <mui-responsive breakpoint="1200">
          <mui-link slot="showAbove" target="_blank" href="${usageLink}" rel="noopener" variant="tertiary">Guides<guides-mark slot="after"></guides-mark></mui-link>
          <mui-link slot="showBelow" target="_blank" icon-only href="${usageLink}" rel="noopener" variant="tertiary"><guides-mark></guides-mark></mui-link>
        </mui-responsive>
        `
      : "";

    // Handle accessibility list - Updated to use ||| delimiter
    const accessibilityItems = this.getAttribute("accessibility");
    let accessibilityArray = accessibilityItems
      ? accessibilityItems
          .split("|||")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
      : [];

    const accessibilityContent = accessibilityArray.length
      ? /*html*/ `
    <mui-heading class="details" size="6" level="3">Accessibility details</mui-heading>
    <mui-list as="ul" style="max-width: 65ch;">
      ${accessibilityArray
        .map(
          (accessibility) =>
            /*html*/ `<mui-list-item size="x-small" weight="medium" style="margin-bottom: var(--space-050)">${accessibility}</mui-list-item>`
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
              <mui-h-stack space="0">
              ${githubContent}${usageLinkContent}
              </mui-h-stack>
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
        <mui-card-footer style="padding: 0;"><slot name="footer"></slot></mui-card-footer>
      </mui-card>
    `;
  }
}

customElements.define("story-card", storyCard);
