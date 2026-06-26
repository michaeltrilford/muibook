import "../mui-dropdown";
import "../mui-input";
import "../mui-time";
import "../mui-icons/timer";

class MuiTimePickerPopover extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
          box-sizing: border-box;
        }
        ::slotted(.time-pane) {
          flex: 1 1 auto;
          min-width: 160px;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
      </style>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-time-picker-popover")) {
  customElements.define("mui-time-picker-popover", MuiTimePickerPopover);
}

class MuiTimePicker extends HTMLElement {
  static get observedAttributes() {
    return ["value", "type", "label", "hide-label", "optional", "size", "variant"];
  }

  private selectedTime: string = "";
  private initialized: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.syncAttributes();
    this.render();
    this.setupListeners();
    this.initialized = true;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      if (name === "value") {
        this.syncAttributes();
        if (this.initialized) {
          const input = this.shadowRoot?.querySelector("mui-input");
          const time = this.shadowRoot?.querySelector("mui-time");
          if (input) input.setAttribute("value", this.getAttribute("value") || "");
          if (time && this.selectedTime) time.setAttribute("value", this.selectedTime);
        }
      } else {
        this.render();
        this.setupListeners();
      }
    }
  }

  private syncAttributes() {
    this.selectedTime = this.getAttribute("value") || "";
  }

  private setupListeners() {
    if (!this.shadowRoot) return;

    const time = this.shadowRoot.querySelector("mui-time");
    const input = this.shadowRoot.querySelector("mui-input");

    const updateValue = () => {
      this.setAttribute("value", this.selectedTime);
      if (input) input.setAttribute("value", this.selectedTime);
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this.selectedTime }, bubbles: true, composed: true }));
    };

    if (time) {
      time.addEventListener("change", (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail && detail.value) {
          this.selectedTime = detail.value;
          updateValue();
          
          const type = this.getAttribute("type") || "time";
          if (type === "timeslot") {
            requestAnimationFrame(() => {
              const dropdown = this.shadowRoot?.querySelector("mui-dropdown") as any;
              if (dropdown && typeof dropdown.close === 'function') dropdown.close();
            });
          }
        }
      });
    }

    const popoverContent = this.shadowRoot.querySelector("mui-time-picker-popover");
    if (popoverContent) {
      popoverContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const value = this.getAttribute("value") || "";
    const type = this.getAttribute("type") || "time"; // "time" or "timeslot"
    const label = this.getAttribute("label") || "";
    const hideLabel = this.hasAttribute("hide-label") ? "hide-label" : "";
    const optional = this.hasAttribute("optional") ? "optional" : "";
    const size = this.getAttribute("size") || "medium";
    const variant = this.getAttribute("variant") || "";

    const timeVariant = type === "timeslot" ? "slots" : "wheels";

    const html = /*html*/ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
        }
        .time-pane {
          padding: var(--space-200);
          height: 310px;
        }
        mui-dropdown {
          width: 100%;
          --dropdown-min-width: auto;
        }
      </style>
      <mui-dropdown persistent>
        <mui-input 
          slot="action" 
          value="${value}"
          label="${label}"
          size="${size}"
          variant="${variant}"
          ${hideLabel}
          ${optional}
          readonly>
          <mui-button slot="after"><mui-icon-timer></mui-icon-timer></mui-button>
        </mui-input>

        <mui-time-picker-popover>
          <div class="time-pane">
            <mui-time variant="${timeVariant}" value="${this.selectedTime}" slotted style="--time-picker-radius: var(--stroke-size-200);"></mui-time>
          </div>
        </mui-time-picker-popover>
      </mui-dropdown>
    `;

    this.shadowRoot.innerHTML = html;
  }
}

if (!customElements.get("mui-time-picker")) {
  customElements.define("mui-time-picker", MuiTimePicker);
}
