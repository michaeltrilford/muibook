import "../mui-card";
import "../mui-slat/slat";
import "../mui-stack/hstack";
import "../mui-stack/vstack";

class MuiPromptResult extends HTMLElement {
  private observer: MutationObserver | null = null;

  static get observedAttributes() {
    return ["col"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.observer = new MutationObserver(() => this.render());
    this.observer.observe(this, { childList: true, subtree: false });
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

if (!customElements.get("mui-prompt-result")) {
  customElements.define("mui-prompt-result", MuiPromptResult);
}
