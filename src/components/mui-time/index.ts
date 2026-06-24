class MuiTime extends HTMLElement {
  static get observedAttributes() {
    return ["value", "format", "step", "start", "end", "variant"];
  }

  private hour: number = 12;
  private minute: number = 0;
  private ampm: "AM" | "PM" = "PM";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const now = new Date();
    this.hour = now.getHours();
    this.minute = now.getMinutes();
  }

  connectedCallback() {
    this.syncAttributes();
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this.syncAttributes();
      this.render();
    }
  }

  private syncAttributes() {
    const val = this.getAttribute("value");
    if (val) {
      // Expecting "HH:MM" (24h) or "HH:MM AM/PM"
      const parts = val.trim().split(" ");
      const timeParts = parts[0].split(":");
      if (timeParts.length === 2) {
        this.hour = parseInt(timeParts[0], 10) || 0;
        this.minute = parseInt(timeParts[1], 10) || 0;
      }
      if (parts[1] && (parts[1].toUpperCase() === "AM" || parts[1].toUpperCase() === "PM")) {
        this.ampm = parts[1].toUpperCase() as "AM" | "PM";
        // convert 12h to 24h internal if needed, but since we re-render, we just keep raw
      } else {
        // If 24h format, auto-calculate AM/PM for internal state
        this.ampm = this.hour >= 12 ? "PM" : "AM";
      }
    }
  }

  private updateTime() {
    const format = this.getAttribute("format") || "12h";
    let formatted = "";

    if (format === "12h") {
      let h12 = this.hour % 12;
      if (h12 === 0) h12 = 12;
      formatted = `${String(h12).padStart(2, "0")}:${String(this.minute).padStart(2, "0")} ${this.ampm}`;
    } else {
      let h24 = this.hour;
      // if we are explicitly dragging the AM/PM column, we might need to adjust this.hour
      formatted = `${String(h24).padStart(2, "0")}:${String(this.minute).padStart(2, "0")}`;
    }

    this.setAttribute("value", formatted);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: formatted }, bubbles: true, composed: true }));
  }

  render() {
    if (!this.shadowRoot) return;

    const variant = this.getAttribute("variant") || "dial";
    if (variant === "slots") {
      this.renderSlots();
    } else {
      this.renderDial();
    }
  }

  renderSlots() {
    const start = parseInt(this.getAttribute("start") || "9", 10);
    const end = parseInt(this.getAttribute("end") || "17", 10);
    const step = parseInt(this.getAttribute("step") || "60", 10);
    const format = this.getAttribute("format") || "12h";
    const is12h = format === "12h";

    // Generate time slots
    const slots = [];
    for (let h = start; h <= end; h++) {
      for (let m = 0; m < 60; m += step) {
        if (h === end && m > 0) break; // Don't exceed end hour

        let label = "";
        let val24 = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

        if (is12h) {
          const ampm = h >= 12 ? "PM" : "AM";
          const h12 = h % 12 === 0 ? 12 : h % 12;
          label = `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
        } else {
          label = val24;
        }

        slots.push({ label, val: is12h ? label : val24, h, m });
      }
    }

    const currentValue = this.getAttribute("value") || "";

    const html = /*html*/ `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: var(--time-picker-height);
          font-family: inherit;
          --time-picker-height: 24rem;
        }
        .slots-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: transparent;
        }
        .slots-scroll {
          flex: 1 1 auto;
          overflow-y: auto;
          overflow-x: hidden;
          margin: var(--stroke-size-200);
          display: flex;
          flex-direction: column;
          gap: var(--space-100);
          scrollbar-width: none; /* Firefox */
        }
        .slots-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
        .slot-btn {
          width: 100%;
          font-variant-numeric: tabular-nums;
        }
        :host([slotted]) .slot-btn {
          --action-radius-small: var(--stroke-size-200);
        }
      </style>
      <div class="slots-container">
        <div class="slots-scroll">
          ${slots
            .map(
              (slot) => `
            <mui-button variant="${currentValue === slot.val ? "primary" : "tertiary"}" size="small" class="slot-btn" data-value="${slot.val}" data-h="${slot.h}" data-m="${slot.m}">
              ${slot.label}
            </mui-button>
          `,
            )
            .join("")}
        </div>
      </div>
    `;

    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = html;

    const btns = this.shadowRoot.querySelectorAll(".slot-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-value")!;
        const h = parseInt(btn.getAttribute("data-h")!, 10);
        const m = parseInt(btn.getAttribute("data-m")!, 10);

        this.hour = h;
        this.minute = m;
        if (is12h) {
          this.ampm = h >= 12 ? "PM" : "AM";
        }

        this.setAttribute("value", val);
        this.dispatchEvent(new CustomEvent("change", { detail: { value: val }, bubbles: true, composed: true }));
        this.renderSlots(); // re-render to update selected state
      });
    });

    // Initial scroll to selected
    requestAnimationFrame(() => {
      const selected = this.shadowRoot?.querySelector(".slot-btn.selected");
      if (selected) {
        selected.scrollIntoView({ behavior: "auto", block: "center" });
      }
    });
  }

  renderDial() {
    const format = this.getAttribute("format") || "12h";
    const step = parseInt(this.getAttribute("step") || "1", 10);

    const is12h = format === "12h";

    // Build hours
    const hours = is12h
      ? Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i))
      : Array.from({ length: 24 }, (_, i) => i);

    // Build minutes
    const minutes = Array.from({ length: Math.floor(60 / step) }, (_, i) => i * step);

    const html = /*html*/ `
      <style>
        :host {
          display: inline-block;
          font-family: inherit;
          --time-picker-height: 24rem;
          --time-item-height: 4rem;
        }
        .time-picker-container {
          display: flex;
          height: var(--time-picker-height);
          background: var(--input-background);
          border-radius: var(--time-picker-radius, var(--radius-200));
          position: relative;
          overflow: hidden;
          padding: 0 var(--space-200);
          gap: var(--space-100);
        }
        .time-picker-container::before {
          content: "";
          position: absolute;
          top: 50%;
          left: var(--space-200);
          right: var(--space-200);
          height: var(--time-item-height);
          transform: translateY(-50%);
          background: var(--action-tertiary-background-hover);
          border-radius: var(--radius-100);
          pointer-events: none;
          z-index: 1;
        }
        /* Top and Bottom faded masks */
        .time-picker-container::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            to bottom, 
            var(--input-background) 0%, 
            transparent 30%, 
            transparent 70%, 
            var(--input-background) 100%
          );
          pointer-events: none;
          z-index: 2;
        }
        .column {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none; /* Firefox */
        }
        .column::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
        /* Add padding to allow first and last items to reach the center */
        .column::before,
        .column::after {
          content: "";
          display: block;
          flex: 0 0 calc(50% - (var(--time-item-height) / 2));
        }
        .item {
          flex: 0 0 var(--time-item-height);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-font-size-l);
          color: var(--text-color);
          scroll-snap-align: center;
          cursor: pointer;
          user-select: none;
          z-index: 3;
          position: relative;
          font-variant-numeric: tabular-nums;
        }
      </style>
      <div class="time-picker-container">
        <!-- Hours -->
        <div class="column" id="col-hours">
          ${hours.map((h) => `<div class="item" data-value="${h}">${String(h).padStart(2, "0")}</div>`).join("")}
        </div>
        <!-- Minutes -->
        <div class="column" id="col-minutes">
          ${minutes.map((m) => `<div class="item" data-value="${m}">${String(m).padStart(2, "0")}</div>`).join("")}
        </div>
        <!-- AM/PM -->
        ${
          is12h
            ? `
          <div class="column" id="col-ampm">
            <div class="item" data-value="AM">AM</div>
            <div class="item" data-value="PM">PM</div>
          </div>
        `
            : ""
        }
      </div>
    `;

    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = html;

    const colHours = this.shadowRoot.getElementById("col-hours")!;
    const colMinutes = this.shadowRoot.getElementById("col-minutes")!;
    const colAmpm = this.shadowRoot.getElementById("col-ampm");

    // Helper to scroll to a specific value immediately without smooth scrolling for initial render
    const scrollToValue = (col: HTMLElement, val: string | number) => {
      const item = col.querySelector(`[data-value="${val}"]`) as HTMLElement;
      if (item) {
        // Calculate offset to center the item
        const itemCenter = item.offsetTop + item.offsetHeight / 2;
        const colCenter = col.offsetHeight / 2;
        col.scrollTop = itemCenter - colCenter;
      }
    };

    // Scroll handlers to update internal state when snapped
    let scrollTimeout: any;
    const handleScroll = (col: HTMLElement, type: "hour" | "minute" | "ampm") => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const center = col.scrollTop + col.offsetHeight / 2;
        const items = Array.from(col.querySelectorAll(".item")) as HTMLElement[];
        let closest = items[0];
        let minDist = Infinity;

        items.forEach((item) => {
          const itemCenter = item.offsetTop + item.offsetHeight / 2;
          const dist = Math.abs(center - itemCenter);
          if (dist < minDist) {
            minDist = dist;
            closest = item;
          }
        });

        if (closest) {
          const val = closest.getAttribute("data-value")!;
          if (type === "hour") {
            const h = parseInt(val, 10);
            if (this.getAttribute("format") === "12h") {
              // Internal 24h logic for hours
              this.hour =
                h === 12 && this.ampm === "AM"
                  ? 0
                  : h === 12 && this.ampm === "PM"
                    ? 12
                    : this.ampm === "PM"
                      ? h + 12
                      : h;
            } else {
              this.hour = h;
            }
          } else if (type === "minute") {
            this.minute = parseInt(val, 10);
          } else if (type === "ampm") {
            this.ampm = val as "AM" | "PM";
            // Adjust internal hour to 24h
            const h12 = this.hour % 12 || 12;
            this.hour = val === "AM" ? (h12 === 12 ? 0 : h12) : h12 === 12 ? 12 : h12 + 12;
          }
          this.updateTime();
        }
      }, 150);
    };

    colHours.addEventListener("scroll", () => handleScroll(colHours, "hour"));
    colMinutes.addEventListener("scroll", () => handleScroll(colMinutes, "minute"));
    if (colAmpm) colAmpm.addEventListener("scroll", () => handleScroll(colAmpm, "ampm"));

    // Click handler to tap a value and scroll to it
    const addClickToScroll = (col: HTMLElement) => {
      col.addEventListener("click", (e) => {
        const item = (e.target as HTMLElement).closest(".item") as HTMLElement;
        if (item) {
          item.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    };

    addClickToScroll(colHours);
    addClickToScroll(colMinutes);
    if (colAmpm) addClickToScroll(colAmpm);

    // Initial positioning (need to wait for paint)
    requestAnimationFrame(() => {
      const h12 = this.hour % 12 || 12;
      scrollToValue(colHours, is12h ? h12 : this.hour);
      scrollToValue(colMinutes, this.minute);
      if (colAmpm) scrollToValue(colAmpm, this.ampm);
    });
  }
}

if (!customElements.get("mui-time")) {
  customElements.define("mui-time", MuiTime);
}
