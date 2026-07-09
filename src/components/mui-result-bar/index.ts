import "../mui-work-log";
import "../mui-card";
import "../mui-slat/slat";
import "../mui-stack/hstack";
import "../mui-stack/vstack";

class MuiResultBar extends HTMLElement {
  private observer: MutationObserver | null = null;

  static get observedAttributes() {
    return ["label", "open", "rule", "variant", "col"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.updateSlottedContent();
    this.observer = new MutationObserver(() => {
      this.render();
      this.updateSlottedContent();
    });
    this.observer.observe(this, { childList: true, subtree: true });
  }

  updateSlottedContent() {
    requestAnimationFrame(() => {
      const els = Array.from(this.querySelectorAll("mui-file-diff, mui-slat"));
      els.forEach((el, idx) => {
        el.setAttribute("result-slot", "");
        if (idx === els.length - 1) {
          el.setAttribute("result-slot-last", "");
        } else {
          el.removeAttribute("result-slot-last");
        }
      });
    });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const variant = this.getAttribute("variant") || "default";

    if (variant === "accordion") {
      const label = this.getAttribute("label") || "";
      const open = this.hasAttribute("open") ? "open" : "";
      const rule = this.hasAttribute("rule") ? "rule" : "";
      const col = this.getAttribute("col") || "1fr auto";
      const hasIcon = Boolean(this.querySelector('[slot="icon"]'));
      const hasAccessory = Boolean(this.querySelector('[slot="accessory"]'));

      this.shadowRoot.innerHTML = /*html*/ `
        <style>
          :host {
            display: block;
          }
          .trigger {
            width: 100%;
          }
          .label {
            color: var(--text-color-secondary);
          }
          .actions-wrapper {
            /* Prevent clicks on actions from bubbling up and toggling the accordion */
          }
          .detail-inner {
            border-top: var(--border-thin);
          }
          mui-accordion-core {
            /* Give it the rule border if needed */
          }
          mui-slat {
            width: 100%;
          }
        </style>
        <mui-card ${rule}>
          <mui-card-body condensed>
            <mui-accordion-core ${open}>
              <mui-slat slot="summary" variant="row" col="${col}">
                ${hasAccessory ? `<slot name="accessory" slot="accessory"></slot>` : ""}
                
                <mui-h-stack slot="start" class="trigger" alignY="center" space="var(--space-100)">
                  ${hasIcon ? `<slot name="icon" slot="icon"></slot>` : ""}
                  <mui-body class="label" size="small" weight="bold">${label}</mui-body>
                  <slot name="after-label"></slot>
                  <mui-icon-toggle rotate size="xx-small" ${open ? "toggle" : ""}>
                    <mui-icon-right-chevron slot="start"></mui-icon-right-chevron>
                    <mui-icon-down-chevron slot="end"></mui-icon-down-chevron>
                  </mui-icon-toggle>
                </mui-h-stack>

                <mui-h-stack slot="end" class="actions-wrapper" space="var(--space-100)" alignY="center">
                  <slot name="actions"></slot>
                </mui-h-stack>
              </mui-slat>
              
              <div slot="detail" class="detail-inner">
                <slot name="content"></slot>
              </div>
            </mui-accordion-core>
          </mui-card-body>
        </mui-card>
      `;

      const actionsWrapper = this.shadowRoot.querySelector(".actions-wrapper") as HTMLElement;
      actionsWrapper?.addEventListener("click", (e) => e.stopPropagation());
      actionsWrapper?.addEventListener("keydown", (e) => e.stopPropagation());
      
      const accordion = this.shadowRoot.querySelector("mui-accordion-core") as HTMLElement;
      const toggleIcon = this.shadowRoot.querySelector("mui-icon-toggle") as HTMLElement;
      
      // Keep the local icon-toggle in sync if mui-accordion-core is toggled
      const observer = new MutationObserver(() => {
        if (accordion.hasAttribute("open")) {
          toggleIcon.setAttribute("toggle", "");
        } else {
          toggleIcon.removeAttribute("toggle");
        }
      });
      observer.observe(accordion, { attributes: true, attributeFilter: ["open"] });
      
    } else {
      const col = this.getAttribute("col") || "1fr auto";
      const hasAccessory = Boolean(this.querySelector('[slot="accessory"]'));

      this.shadowRoot.innerHTML = /*html*/ `
        <style>
          :host {
            display: block;
          }
        </style>
        <mui-card>
          <mui-card-body condensed>
            <mui-slat variant="row" col="${col}">
              ${hasAccessory ? `<slot name="accessory" slot="accessory"></slot>` : ""}
              <mui-v-stack slot="start" space="0">
                <slot name="start"></slot>
              </mui-v-stack>
              <mui-h-stack slot="end" space="var(--space-100)" alignY="center">
                <slot name="actions"></slot>
              </mui-h-stack>
            </mui-slat>
          </mui-card-body>
        </mui-card>
      `;
    }
  }
}

if (!customElements.get("mui-result-bar")) {
  customElements.define("mui-result-bar", MuiResultBar);
}
