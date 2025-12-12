class PropsCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "description", "open"];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "open" && this.shadowRoot) {
      const accordion = this.shadowRoot.querySelector("mui-accordion-core");
      if (accordion) {
        if (newValue !== null) {
          accordion.setAttribute("open", "");
        } else {
          accordion.removeAttribute("open");
        }
      }
    }
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { display: block; scroll-margin-top: var(--space-600); }

      mui-card {
        border: var(--border-thick);
      }

      mui-card-body {
        padding: 0;
      }

      mui-accordion-core {
        border-radius: var(--radius-card);
      }

      .details {
        text-transform: uppercase;
        --heading-font-size-600: var(--font-size-50);
        margin-top: var(--space-400); 
        margin-bottom: var(--space-050);
      }

      .icon {
        margin-right: var(--space-200);
      }

      @media (min-width: 768px) {
        .icon {
          margin-right: var(--space-100);
        }
      }

    `;

    const title = this.getAttribute("title") || "";
    const description = this.hasAttribute("description")
      ? /*html*/ `<mui-body style="max-width: 60ch; margin-top: var(--space-200); margin-bottom: var(--space-100);" size="small">${this.getAttribute(
          "description"
        )}</mui-body>`
      : "";

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-card>
        <mui-accordion-core style="border-radius: var(--card-radius)">
          <mui-card-header slot="summary">
            <mui-h-stack space="var(--space-100)" alignX="space-between" alignY="center">
              ${
                title
                  ? `
                    <mui-h-stack alignY="center" space="var(--space-200)">
                      <span style="font-size: 42px; margin-right: 6px; margin-top: 3px; line-height: 1">🎛️</span> 
                      <mui-v-stack space="var(--space-000);">
                        <mui-body size="x-small" weight="bold" style="text-transform: uppercase; margin-left: var(--space-025); opacity: 0.8;">Props Types</mui-body>
                        <mui-heading size="4" level="2">${title}</mui-heading>
                      </mui-v-stack>
                    </mui-h-stack>
                    `
                  : `<mui-heading size="3" level="2">Prop Types</mui-heading>`
              }
              <mui-icon-toggle rotate class="icon" size="small">
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-h-stack>
            ${description}
          </mui-card-header>
          <div slot="detail">
            <mui-rule></mui-rule>
            <mui-card-body>
              <slot name="body"></slot>
            </mui-card-body>
          </div>
        </mui-accordion-core>
      </mui-card>
    `;

    const accordion = shadowRoot.querySelector("mui-accordion-core");
    if (this.hasAttribute("open") && accordion) {
      accordion.setAttribute("open", "");
    }
  }
}

customElements.define("props-card", PropsCard);
