import "../mui-button";
import "../mui-icons/left-chevron";
import "../mui-icons/right-chevron";

class MuiCalendar extends HTMLElement {
  static get observedAttributes() {
    return ["value", "view", "min-date", "max-date"];
  }

  private currentDate: Date;
  private selectedDate: Date | null = null;
  private viewMode: "single" | "double" = "single";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const today = new Date();
    this.currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
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
      const parsed = new Date(val);
      if (!isNaN(parsed.getTime())) {
        this.selectedDate = parsed;
        // If it's the first time setting value, align view to the selected month
        if (!this.hasAttribute("data-initialized")) {
          this.currentDate = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
          this.setAttribute("data-initialized", "true");
        }
      }
    }
    this.viewMode = this.getAttribute("view") === "double" ? "double" : "single";
  }

  private changeMonth(offset: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + offset);
    this.render();
  }

  private selectDate(date: Date) {
    this.selectedDate = date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formatted = `${year}-${month}-${day}`;
    
    this.setAttribute("value", formatted);
    this.dispatchEvent(new CustomEvent("change", { detail: { value: formatted }, bubbles: true, composed: true }));
  }

  private renderMonth(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday
    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month, 1));
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    let daysHtml = "";

    // Empty slots for days before the 1st
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysHtml += `<div class="day empty"></div>`;
    }

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const isSelectedMonth = this.selectedDate?.getFullYear() === year && this.selectedDate?.getMonth() === month;

    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = isCurrentMonth && today.getDate() === i;
      const isSelected = isSelectedMonth && this.selectedDate?.getDate() === i;
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

      const classList = ["day"];
      if (isSelected) classList.push("selected");
      if (isToday) classList.push("today");

      const variant = isSelected ? "primary" : "tertiary";
      daysHtml += `<mui-button variant="${variant}" size="small" class="${classList.join(" ")}" data-date="${dateStr}" aria-label="${monthName} ${i}, ${year}">${i}</mui-button>`;
    }

    return /*html*/`
      <div class="month">
        <div class="month-header">
          <div class="month-title">${monthName} ${year}</div>
        </div>
        <div class="grid">
          ${daysOfWeek.map((d) => `<div class="weekday">${d}</div>`).join("")}
          ${daysHtml}
        </div>
      </div>
    `;
  }

  render() {
    if (!this.shadowRoot) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const html = /*html*/ `
      <style>
        :host {
          display: inline-block;
          font-family: inherit;
          --calendar-width: 28rem;
          --calendar-day-size: 3.6rem;
        }
        .calendar-container {
          position: relative;
          display: flex;
          gap: var(--space-400);
          padding: var(--space-200);
        }
        .controls {
          position: absolute;
          top: var(--space-200);
          left: var(--space-200);
          right: var(--space-200);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }
        .controls mui-button {
          pointer-events: auto;
        }
        .month {
          width: var(--calendar-width);
        }
        .month-header {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3.6rem;
          margin-bottom: var(--space-200);
        }
        .month-title {
          font-weight: var(--font-weight-medium);
          font-size: var(--text-font-size-s);
          color: var(--text-color);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: var(--space-050);
          justify-items: center;
        }
        .weekday {
          font-size: var(--text-font-size-xs);
          color: var(--text-color-secondary);
          font-weight: var(--font-weight-medium);
          width: var(--calendar-day-size);
          height: var(--calendar-day-size);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .day {
          width: var(--calendar-day-size);
          height: var(--calendar-day-size);
          --action-size-small: var(--calendar-day-size);
          --action-padding-small: 0;
        }
        :host([slotted]) .day {
          --action-radius-small: var(--stroke-size-200);
        }
        .day.today {
          --action-tertiary-text-color: var(--action-primary-background);
        }
        .day.empty {
          cursor: default;
        }
      </style>
      <div class="calendar-container">
        <div class="controls">
          <mui-button variant="tertiary" size="small" id="prev-btn" aria-label="Previous Month">
            <mui-icon-left-chevron></mui-icon-left-chevron>
          </mui-button>
          <mui-button variant="tertiary" size="small" id="next-btn" aria-label="Next Month">
            <mui-icon-right-chevron></mui-icon-right-chevron>
          </mui-button>
        </div>
        ${this.renderMonth(year, month)}
        ${this.viewMode === "double" ? this.renderMonth(year, month + 1) : ""}
      </div>
    `;

    this.shadowRoot.innerHTML = html;

    this.shadowRoot.getElementById("prev-btn")?.addEventListener("click", () => this.changeMonth(-1));
    this.shadowRoot.getElementById("next-btn")?.addEventListener("click", () => this.changeMonth(1));

    this.shadowRoot.querySelectorAll(".day:not(.empty)").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const dateStr = target.getAttribute("data-date");
        if (dateStr) {
          // Because dates parsed via 'YYYY-MM-DD' without time can shift due to UTC/timezone, 
          // parse it locally:
          const [y, m, d] = dateStr.split("-").map(Number);
          this.selectDate(new Date(y, m - 1, d));
        }
      });
    });
  }
}

if (!customElements.get("mui-calendar")) {
  customElements.define("mui-calendar", MuiCalendar);
}
