const escapeHtml = (value = "") =>
  String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

class StoryAccessibilityPanel extends HTMLElement {
  static get observedAttributes() {
    return ["heading", "items", "open"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  getItems() {
    const raw = this.getAttribute("items") || "";
    if (!raw) return [];

    return raw
      .split("|||")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  render() {
    const heading = this.getAttribute("heading") || "Considerations";
    const items = this.getItems();

    if (!items.length) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; scroll-margin-top: var(--space-600); }



        mui-card-body {
          padding: 0;
        }

        mui-accordion-core {
          border-radius: var(--radius-card);
        }

        .icon {
          margin-right: var(--space-200);
        }

        .panel-icon {
          font-size: 4.2rem;
          line-height: 1;
          margin-right: var(--space-050);
          margin-top: var(--space-025);
        }

        .panel-label {
          text-transform: uppercase;
          margin-left: var(--space-025);
          opacity: 0.8;
        }

        .list-wrap {
          padding: var(--space-400) var(--space-500);
        }

        mui-list {
          margin: 0;
        }

        @media (min-width: 768px) {
          .icon {
            margin-right: var(--space-100);
          }

          .list-wrap {
            padding-inline: var(--space-600);
          }

          .list {
            text-wrap: balance; 
            max-width: 60ch; 
            margin-bottom: var(--space-300);
          }
          .list:last-child {
            margin-bottom: var(--space-050);
          }
        }
      </style>
      <mui-card>
        <mui-accordion-core style="border-radius: var(--card-radius)" ${this.hasAttribute("open") ? "open" : ""}>
          <mui-card-header slot="summary">
            <mui-h-stack space="var(--space-100)" alignX="space-between" alignY="center">
              <mui-h-stack alignY="center" space="var(--space-200)">
                <span class="panel-icon" role="img" aria-label="Accessibility">♿</span>
                <mui-v-stack space="var(--space-000);">
                  <mui-body class="panel-label" size="x-small" weight="bold">Accessibility</mui-body>
                  <mui-heading size="4" level="2">${escapeHtml(heading)}</mui-heading>
                </mui-v-stack>
              </mui-h-stack>
              <mui-icon-toggle rotate class="icon" size="small" aria-hidden="true">
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-h-stack>
          </mui-card-header>
          <div slot="detail">
            <mui-rule style="background: var(--border-color)"></mui-rule>
            <mui-card-body>
              <div class="list-wrap">
                <mui-list as="ul" role="list">
                  ${items
                    .map(
                      (item) =>
                        /*html*/ `<mui-list-item class="list" size="small" weight="regular" role="listitem" variant="default">${escapeHtml(
                          item,
                        )}</mui-list-item>`,
                    )
                    .join("")}
                </mui-list>
              </div>
            </mui-card-body>
          </div>
        </mui-accordion-core>
      </mui-card>
    `;
  }
}

customElements.define("story-accessibility-panel", StoryAccessibilityPanel);
