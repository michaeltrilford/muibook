import "../mui-dropdown";
import "../mui-input";
import "../mui-calendar";
import "../mui-time";
import "../mui-rule";
import "../mui-icons/calendar";

class MuiDatePickerPopover extends HTMLElement {
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
        ::slotted(.calendar-pane) {
          flex: 0 0 auto;
        }
        ::slotted(mui-rule) {
          opacity: 0.5;
          margin-inline: var(--stroke-size-100);
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

if (!customElements.get("mui-date-picker-popover")) {
  customElements.define("mui-date-picker-popover", MuiDatePickerPopover);
}

class MuiDatePicker extends HTMLElement {
  static get observedAttributes() {
    return ["value", "type", "label", "hide-label", "optional", "size", "variant"];
  }

  private selectedDate: string = "";
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
          const cal = this.shadowRoot?.querySelector("mui-calendar");
          const time = this.shadowRoot?.querySelector("mui-time");
          if (input) input.setAttribute("value", this.getAttribute("value") || "");
          if (cal && this.selectedDate) cal.setAttribute("value", this.selectedDate);
          if (time && this.selectedTime) time.setAttribute("value", this.selectedTime);
        }
      } else {
        this.render();
        this.setupListeners();
      }
    }
  }

  private syncAttributes() {
    const val = this.getAttribute("value") || "";
    if (val) {
      const parts = val.split(" ");
      if (parts.length > 0) {
        if (parts[0].includes("-")) {
          this.selectedDate = parts[0];
          this.selectedTime = parts.slice(1).join(" ");
        } else {
          this.selectedTime = val;
        }
      }
    }
  }

  private setupListeners() {
    if (!this.shadowRoot) return;

    const cal = this.shadowRoot.querySelector("mui-calendar");
    const time = this.shadowRoot.querySelector("mui-time");
    const input = this.shadowRoot.querySelector("mui-input");

    const updateValue = () => {
      const type = this.getAttribute("type") || "date";
      let newVal = "";
      if (type === "date") {
        newVal = this.selectedDate;
      } else if (type === "datetimeslot") {
        newVal = `${this.selectedDate} ${this.selectedTime}`.trim();
      }
      this.setAttribute("value", newVal);
      if (input) input.setAttribute("value", newVal);
      this.dispatchEvent(new CustomEvent("change", { detail: { value: newVal }, bubbles: true, composed: true }));
    };

    if (cal) {
      cal.addEventListener("change", (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail && detail.value) {
          this.selectedDate = detail.value;
          updateValue();
          this.render();
          this.setupListeners();
        }
      });
    }

    if (time) {
      time.addEventListener("change", (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail && detail.value) {
          this.selectedTime = detail.value;
          updateValue();
        }
      });
    }

    const popoverContent = this.shadowRoot.querySelector("mui-date-picker-popover");
    if (popoverContent) {
      popoverContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const value = this.getAttribute("value") || "";
    const type = this.getAttribute("type") || "date";
    const label = this.getAttribute("label") || "";
    const hideLabel = this.hasAttribute("hide-label") ? "hide-label" : "";
    const optional = this.hasAttribute("optional") ? "optional" : "";
    const size = this.getAttribute("size") || "medium";
    const variant = this.getAttribute("variant") || "";

    const showDate = true; // Always true for date picker
    const showTime = type === "datetimeslot";
    const timeVariant = "slots";

    const html = /*html*/ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
        }
        mui-dropdown {
          width: 100%;
          --dropdown-min-width: auto;
        }
        .time-pane {
          width: 130px;
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
          ${showDate ? '<mui-button slot="after"><mui-icon-calendar></mui-icon-calendar></mui-button>' : ""}
        </mui-input>

        <mui-date-picker-popover>
          ${showDate ? `<div class="calendar-pane"><mui-calendar value="${this.selectedDate}" slotted></mui-calendar></div>` : ""}
          ${showDate && showTime ? `<mui-rule direction="vertical" length="auto"></mui-rule>` : ""}
          ${showTime ? `<div class="time-pane" style="position: relative;"><div style="position: absolute; inset: 0;"><mui-time variant="${timeVariant}" value="${this.selectedTime}" style="--time-picker-height: 100%; height: 100%; --time-picker-radius: var(--stroke-size-200);" slotted></mui-time></div></div>` : ""}
        </mui-date-picker-popover>
      </mui-dropdown>
    `;

    this.shadowRoot.innerHTML = html;
  }
}

if (!customElements.get("mui-date-picker")) {
  customElements.define("mui-date-picker", MuiDatePicker);
}
