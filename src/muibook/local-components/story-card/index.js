import "../../images/github-mark";

class storyCard extends HTMLElement {
  static get observedAttributes() {
    return [
      "title",
      "description",
      "usage",
      "usageLink",
      "accessibility",
      "github",
      "canvas-background",
      "canvas-guide-color",
      "no-canvas-guide",
      "body-condensed",
      "composition",
    ];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { display: block; }

      mui-card {
        border: var(--border-thick);
      }

      :host([composition]) mui-card {
        overflow: hidden;
      }

      .story-body {
        padding: var(--space-400);
      }

      :host([body-condensed]) .story-body,
      :host([composition]) .story-body {
        padding: 0;
      }

      section {
        background-color: var(--story-card-canvas-background, var(--app-story-card));
        position: relative;
      }

      section:before,
      section:after,
      div:before,
      div:after {
        content: "";
        position: absolute;
        background: var(--story-card-canvas-guide-color, var(--app-story-card-canvas-guide-color, #12caff));
      }

      :host([no-canvas-guide]) section:before,
      :host([no-canvas-guide]) section:after,
      :host([no-canvas-guide]) div:before,
      :host([no-canvas-guide]) div:after,
      :host([composition]) section:before,
      :host([composition]) section:after,
      :host([composition]) div:before,
      :host([composition]) div:after {
        display: none;
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

      .actions {
        margin-right: calc(-1 * var(--space-050))
      }

      .story-footer[hidden] {
        display: none;
      }

      @media (min-width: 768px) {
      .actions {
        margin-right: calc(-1 * var(--space-200))
      }
      }

    `;

    const title = this.getAttribute("title") || "";
    const description = this.hasAttribute("description")
      ? /*html*/ `<mui-body style="max-width: 86ch; margin-top: var(--space-200); text-wrap: pretty;" size="small">${this.getAttribute(
          "description",
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
            <mui-list-item size="x-small" weight="medium" style="margin-bottom: var(--space-050); text-wrap: balance;">
              ${usage}
            </mui-list-item>`,
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
            /*html*/ `<mui-list-item size="x-small" weight="medium" style="margin-bottom: var(--space-050)">${accessibility}</mui-list-item>`,
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
              <mui-h-stack space="0" class="actions">
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
        <mui-card-body ${this.hasAttribute("body-condensed") || this.hasAttribute("composition") ? "condensed" : ""}>
          <section>
            <div class="story-body">
              <slot name="body"></slot>
            </div>
          </section>
        </mui-card-body>
        <mui-card-footer class="story-footer" style="padding: 0;"><slot name="footer"></slot></mui-card-footer>
      </mui-card>
    `;

    this.syncCanvasStyles();
    this.syncLayoutAttrs();
    this.bindFooterSlot();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "canvas-background" || name === "canvas-guide-color") this.syncCanvasStyles();
    if (name === "body-condensed" || name === "composition") this.syncLayoutAttrs();
  }

  syncCanvasStyles() {
    const canvasBackground = this.getAttribute("canvas-background");
    if (canvasBackground) {
      this.style.setProperty("--story-card-canvas-background", canvasBackground);
    } else {
      this.style.removeProperty("--story-card-canvas-background");
    }

    const canvasGuideColor = this.getAttribute("canvas-guide-color");
    if (canvasGuideColor) {
      this.style.setProperty("--story-card-canvas-guide-color", canvasGuideColor);
    } else {
      this.style.removeProperty("--story-card-canvas-guide-color");
    }
  }

  syncLayoutAttrs() {
    const cardBody = this.shadowRoot?.querySelector("mui-card-body");
    if (!cardBody) return;
    cardBody.toggleAttribute("condensed", this.hasAttribute("body-condensed") || this.hasAttribute("composition"));
  }

  bindFooterSlot() {
    const footer = this.shadowRoot?.querySelector(".story-footer");
    const footerSlot = this.shadowRoot?.querySelector('slot[name="footer"]');
    if (!footer || !footerSlot) return;

    const syncFooterVisibility = () => {
      const hasFooterContent = footerSlot
        .assignedNodes({ flatten: true })
        .some((node) => node.nodeType === Node.ELEMENT_NODE || node.textContent?.trim());
      footer.toggleAttribute("hidden", !hasFooterContent);
    };

    footerSlot.addEventListener("slotchange", syncFooterVisibility);
    syncFooterVisibility();
  }
}

customElements.define("story-card", storyCard);
