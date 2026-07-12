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

  get value(): string {
    return this.getAttribute("value") || "";
  }

  set value(next: string) {
    this.setAttribute("value", next ?? "");
  }

  focus(options?: FocusOptions) {
    const input = this.shadowRoot?.querySelector("mui-input") as HTMLElement | null;
    if (input && typeof input.focus === "function") {
      input.focus(options);
    } else {
      super.focus(options);
    }
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
    return [
      "value",
      "type",
      "label",
      "hide-label",
      "optional",
      "size",
      "variant",
      "menu-slot",
      "padding-block",
      "padding-inline",
      "surface",
    ];
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
          if (input) input.setAttribute("value", this.formatDisplayValue(this.getAttribute("value") || ""));
          if (cal) {
            if (this.selectedDate) cal.setAttribute("value", this.selectedDate);
            else cal.removeAttribute("value");
          }
          if (time) {
            if (this.selectedTime) time.setAttribute("value", this.selectedTime);
            else time.removeAttribute("value");
          }
        }
      } else {
        this.render();
        this.setupListeners();
      }
    }
  }

  private syncAttributes() {
    const val = this.getAttribute("value") || "";
    this.selectedDate = "";
    this.selectedTime = "";

    if (!val) {
      return;
    }

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

  private isDateTimeType(type: string): boolean {
    return type === "datetime" || type === "datetimeslot";
  }

  private formatDisplayValue(val: string): string {
    if (!val) return "";
    const parts = val.split(" ");
    if (parts.length > 0 && parts[0].includes("-")) {
      const dateParts = parts[0].split("-");
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[0], 10);
        const monthIndex = parseInt(dateParts[1], 10) - 1;
        const day = parseInt(dateParts[2], 10);

        if (!isNaN(year) && !isNaN(monthIndex) && !isNaN(day)) {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

          if (parts.length > 1) {
            const timeStr = parts.slice(1).join(" ");
            return `${timeStr}, ${formattedDate}`;
          }
          return formattedDate;
        }
      }
    }
    return val;
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
      } else if (this.isDateTimeType(type)) {
        if (this.selectedDate && this.selectedTime) {
          newVal = `${this.selectedDate} ${this.selectedTime}`.trim();
        } else {
          newVal = this.selectedDate || this.selectedTime;
        }
      }
      this.setAttribute("value", newVal);
      if (input) input.setAttribute("value", this.formatDisplayValue(newVal));
      this.dispatchEvent(new CustomEvent("change", { detail: { value: newVal }, bubbles: true, composed: true }));
    };

    if (cal) {
      cal.addEventListener("change", (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail && detail.value) {
          this.selectedDate = detail.value;
          updateValue();

          const type = this.getAttribute("type") || "date";
          if (type === "date") {
            requestAnimationFrame(() => {
              const dropdown = this.shadowRoot?.querySelector("mui-dropdown") as any;
              if (dropdown && typeof dropdown.close === "function") dropdown.close();
            });
          }
        }
      });
    }

    if (time) {
      time.addEventListener("change", (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail && detail.value) {
          this.selectedTime = detail.value;
          updateValue();

          const type = this.getAttribute("type") || "date";
          if (this.isDateTimeType(type)) {
            requestAnimationFrame(() => {
              const dropdown = this.shadowRoot?.querySelector("mui-dropdown") as any;
              if (dropdown && typeof dropdown.close === "function") dropdown.close();
            });
          }
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
    const displayValue = this.formatDisplayValue(value);
    const type = this.getAttribute("type") || "date";
    const label = this.getAttribute("label") || "";
    const hideLabel = this.hasAttribute("hide-label") ? "hide-label" : "";
    const optional = this.hasAttribute("optional") ? "optional" : "";
    const size = this.getAttribute("size") || "medium";
    const variant = this.getAttribute("variant") || "";
    const paddingBlock = this.getAttribute("padding-block") || "";
    const paddingInline = this.getAttribute("padding-inline") || "";

    const showDate = true; // Always true for date picker
    const showTime = this.isDateTimeType(type);
    const timeVariant = "slots";

    const html = /*html*/ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
        }
        mui-dropdown {
          width: 100%;
          --menu-min-width: auto;
          display: flex;
        }
        .time-pane {
          width: 130px;
        }
      </style>
      <mui-dropdown persistent size="${size}">
        <mui-input 
          slot="action" 
          value="${displayValue}"
          label="${label}"
          size="${size}"
          variant="${variant}"
          ${paddingBlock ? `padding-block="${paddingBlock}"` : ""}
          ${paddingInline ? `padding-inline="${paddingInline}"` : ""}
          ${this.hasAttribute("surface") ? `surface="${this.getAttribute("surface")}"` : ""}
          ${this.hasAttribute("menu-slot") ? "menu-slot" : ""}
          ${hideLabel}
          ${optional}
          readonly>
          ${showDate ? '<mui-button slot="after"><mui-icon-calendar></mui-icon-calendar></mui-button>' : ""}
        </mui-input>
        <mui-menu>
          <mui-date-picker-popover>
          ${showDate ? `<div class="calendar-pane"><mui-calendar value="${this.selectedDate}" slotted></mui-calendar></div>` : ""}
          ${showDate && showTime ? `<mui-rule direction="vertical" length="auto"></mui-rule>` : ""}
          ${showTime ? `<div class="time-pane" style="position: relative;"><div style="position: absolute; inset: 0;"><mui-time variant="${timeVariant}" value="${this.selectedTime}" style="--time-picker-height: 100%; height: 100%; --time-picker-radius: var(--stroke-size-200);" slotted></mui-time></div></div>` : ""}
          </mui-date-picker-popover>
        </mui-menu>
      </mui-dropdown>
    `;

    this.shadowRoot.innerHTML = html;
  }
}

if (!customElements.get("mui-date-picker")) {
  customElements.define("mui-date-picker", MuiDatePicker);
}
