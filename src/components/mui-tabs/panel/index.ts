class MuiTabPanel extends HTMLElement {
  static get observedAttributes(): string[] {
    return ["item"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Template
    shadow.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }
        .inner {
          padding: var(--tab-panel-padding, 0);
        }
      </style>
      <div class="inner">
        <slot></slot>
      </div>
    `;
  }

  get item(): string | null {
    return this.getAttribute("item");
  }

  set item(value: string | null) {
    if (value !== null) {
      this.setAttribute("item", value);
    } else {
      this.removeAttribute("item");
    }
  }

  attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void {
    // You can expand this if you want to react to item changes
  }
}

if (!customElements.get("mui-tab-panel")) {
  customElements.define("mui-tab-panel", MuiTabPanel);
}
