import "../mui-input";
import "../mui-chip";
import "../mui-stack/hstack";

type ChipInputOption = {
  value: string;
  label: string;
  [key: string]: unknown;
};

type ChangeAction = "add" | "remove" | "set";

class MuiChipInput extends HTMLElement {
  static get observedAttributes() {
    return [
      "id",
      "label",
      "hide-label",
      "placeholder",
      "options",
      "value",
      "allow-custom",
      "disabled",
      "size",
      "name",
      "placement",
      "mobile-stack",
      "breakpoint",
    ];
  }

  private selectedItems: ChipInputOption[] = [];
  private highlightedIndex = -1;
  private inputValue = "";
  private mql: MediaQueryList | null = null;
  private mqlHandler: ((e: MediaQueryListEvent) => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get value(): ChipInputOption[] {
    return this.selectedItems.map((item) => ({ ...item }));
  }

  set value(next: ChipInputOption[]) {
    this.selectedItems = (Array.isArray(next) ? next : [])
      .filter((item) => item && typeof item.value === "string")
      .map((item) => ({ ...item, label: String(item.label ?? item.value), value: String(item.value) }));
    this.syncValueAttribute();
    this.rerenderAndPreserveFocus(0, 0);
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    if (!this.hasAttribute("id")) {
      this.setAttribute(
        "id",
        `mui-chip-input-${Math.random()
          .toString(36)
          .slice(2, 9)}`
      );
    }

    this.syncSelectedFromAttribute();
    this.setupBreakpointListener();
    this.render();
    this.setupListeners();
  }

  disconnectedCallback() {
    this.cleanupBreakpointListener();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === "value") {
      this.syncSelectedFromAttribute();
    }

    if (name === "breakpoint" || name === "mobile-stack") {
      this.setupBreakpointListener();
    }

    this.render();
    this.setupListeners();
  }

  private cleanupBreakpointListener() {
    if (this.mql && this.mqlHandler) {
      this.mql.removeEventListener("change", this.mqlHandler);
    }
    this.mql = null;
    this.mqlHandler = null;
  }

  private setupBreakpointListener() {
    this.cleanupBreakpointListener();
    const breakpointRaw = this.getAttribute("breakpoint");
    if (!breakpointRaw || this.hasAttribute("mobile-stack")) return;
    const breakpoint = Number.parseInt(breakpointRaw, 10);
    if (Number.isNaN(breakpoint) || breakpoint <= 0) return;

    this.mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    this.mqlHandler = () => {
      this.render();
      this.setupListeners();
    };
    this.mql.addEventListener("change", this.mqlHandler);
  }

  private normalizeOption(item: unknown): ChipInputOption | null {
    if (typeof item === "string") {
      const trimmed = item.trim();
      if (!trimmed) return null;
      return { value: trimmed, label: trimmed };
    }

    if (item && typeof item === "object") {
      const record = item as Record<string, unknown>;
      const rawValue = record.value;
      const value = rawValue == null ? "" : String(rawValue).trim();
      if (!value) return null;

      return {
        ...record,
        value,
        label: String(record.label ?? value).trim() || value,
      };
    }

    return null;
  }

  private parseOptions(): ChipInputOption[] {
    const raw = this.getAttribute("options") || "[]";
    let parsed: unknown = [];

    try {
      parsed = JSON.parse(raw);
    } catch (_e) {
      parsed = raw
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);
    }

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => this.normalizeOption(item))
      .filter((item): item is ChipInputOption => Boolean(item));
  }

  private parseValueAttribute(): ChipInputOption[] {
    const raw = this.getAttribute("value") || "[]";
    let parsed: unknown = [];

    try {
      parsed = JSON.parse(raw);
    } catch (_e) {
      parsed = raw
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);
    }

    if (!Array.isArray(parsed)) return [];

    const byValue = new Map(this.parseOptions().map((option) => [option.value.toLowerCase(), option]));

    const normalized = parsed
      .map((item) => {
        const option = this.normalizeOption(item);
        if (!option) return null;
        return byValue.get(option.value.toLowerCase()) || option;
      })
      .filter((item): item is ChipInputOption => Boolean(item));

    const seen = new Set<string>();
    return normalized.filter((item) => {
      const key = item.value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private syncSelectedFromAttribute() {
    this.selectedItems = this.parseValueAttribute();
  }

  private syncValueAttribute() {
    const serialized = JSON.stringify(this.selectedItems);
    if (this.getAttribute("value") !== serialized) {
      this.setAttribute("value", serialized);
    }
  }

  private get normalizedSize() {
    const size = this.getAttribute("size") || "medium";
    return ["x-small", "small", "medium", "large"].includes(size) ? size : "medium";
  }

  private get allowCustom() {
    return this.hasAttribute("allow-custom");
  }

  private get disabled() {
    return this.hasAttribute("disabled");
  }

  private get placement() {
    return this.getAttribute("placement") === "after" ? "after" : "before";
  }

  private get useStackLayout() {
    if (this.hasAttribute("mobile-stack")) return true;
    const breakpointRaw = this.getAttribute("breakpoint");
    if (!breakpointRaw) return false;
    const breakpoint = Number.parseInt(breakpointRaw, 10);
    if (Number.isNaN(breakpoint) || breakpoint <= 0) return false;
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
  }

  private get selectedValues() {
    return this.selectedItems.map((item) => item.value);
  }

  private get filteredOptions() {
    const selected = new Set(this.selectedValues.map((value) => value.toLowerCase()));
    const query = this.inputValue.toLowerCase().trim();

    return this.parseOptions().filter((option) => {
      if (selected.has(option.value.toLowerCase())) return false;
      if (!query) return true;
      return option.label.toLowerCase().includes(query);
    });
  }

  private get showCreateOption() {
    const query = this.inputValue.trim();
    if (!this.allowCustom || !query) return false;

    const all = this.parseOptions();
    const existsInOptions = all.some((item) => item.value.toLowerCase() === query.toLowerCase());
    const existsInSelected = this.selectedValues.some((item) => item.toLowerCase() === query.toLowerCase());
    return !existsInOptions && !existsInSelected;
  }

  private emitQueryChange() {
    this.dispatchEvent(
      new CustomEvent("chip-input-query-change", {
        detail: { query: this.inputValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitChange(action: ChangeAction, added?: ChipInputOption, removed?: ChipInputOption) {
    this.syncValueAttribute();

    const detail = {
      action,
      values: this.selectedValues,
      items: this.selectedItems.map((item) => ({ ...item })),
      added: added ? { ...added } : null,
      removed: removed ? { ...removed } : null,
    };

    this.dispatchEvent(new CustomEvent("chip-input-change", { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent("change", { detail, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent("input", { detail, bubbles: true, composed: true }));
  }

  private setInputValue(value: string) {
    this.inputValue = value;
    const input = this.shadowRoot?.querySelector("mui-input") as HTMLElement | null;
    if (input) input.setAttribute("value", value);
  }

  private getInnerInput(): HTMLInputElement | null {
    const inputHost = this.shadowRoot?.querySelector("mui-input") as HTMLElement | null;
    return (inputHost?.shadowRoot?.querySelector("input") as HTMLInputElement | null) ?? null;
  }

  private restoreInputFocus(selectionStart?: number | null, selectionEnd?: number | null) {
    requestAnimationFrame(() => {
      const inner = this.getInnerInput();
      if (!inner || this.disabled) return;
      inner.focus({ preventScroll: true });

      if (selectionStart == null || selectionEnd == null) return;
      try {
        inner.setSelectionRange(selectionStart, selectionEnd);
      } catch (_e) {
        // ignore unsupported setSelectionRange.
      }
    });
  }

  private rerenderAndPreserveFocus(selectionStart?: number | null, selectionEnd?: number | null) {
    this.render();
    this.setupListeners();
    this.restoreInputFocus(selectionStart, selectionEnd);
  }

  private addValue(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (this.selectedValues.some((item) => item.toLowerCase() === trimmed.toLowerCase())) return;

    const sourceOption = this.parseOptions().find((option) => option.value.toLowerCase() === trimmed.toLowerCase());
    const nextItem = sourceOption || { value: trimmed, label: trimmed, custom: true };

    this.selectedItems = [...this.selectedItems, nextItem];
    this.highlightedIndex = -1;
    this.setInputValue("");
    this.emitChange("add", nextItem);
    this.rerenderAndPreserveFocus(0, 0);
  }

  private removeValue(value: string) {
    const index = this.selectedItems.findIndex((item) => item.value === value);
    if (index < 0) return;
    const removed = this.selectedItems[index];
    this.selectedItems = this.selectedItems.filter((item) => item.value !== value);
    this.emitChange("remove", undefined, removed);
    const caret = this.inputValue.length;
    this.rerenderAndPreserveFocus(caret, caret);
  }

  private handleKeyboard(event: KeyboardEvent) {
    const items = this.filteredOptions;
    const listLength = items.length + (this.showCreateOption ? 1 : 0);

    if (event.key === "ArrowDown" && listLength > 0) {
      event.preventDefault();
      this.highlightedIndex = (this.highlightedIndex + 1 + listLength) % listLength;
      const caret = this.inputValue.length;
      this.rerenderAndPreserveFocus(caret, caret);
      return;
    }

    if (event.key === "ArrowUp" && listLength > 0) {
      event.preventDefault();
      this.highlightedIndex = (this.highlightedIndex - 1 + listLength) % listLength;
      const caret = this.inputValue.length;
      this.rerenderAndPreserveFocus(caret, caret);
      return;
    }

    if (event.key === "Escape") {
      this.highlightedIndex = -1;
      const caret = this.inputValue.length;
      this.rerenderAndPreserveFocus(caret, caret);
      return;
    }

    if (event.key === "Backspace" && !this.inputValue && this.selectedItems.length > 0) {
      this.removeValue(this.selectedItems[this.selectedItems.length - 1].value);
      return;
    }

    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      if (this.highlightedIndex >= 0 && this.highlightedIndex < items.length) {
        this.addValue(items[this.highlightedIndex].value);
        return;
      }

      if (this.showCreateOption) {
        this.addValue(this.inputValue);
      }
    }
  }

  private setupListeners() {
    if (!this.shadowRoot) return;

    const input = this.shadowRoot.querySelector("mui-input") as HTMLElement | null;
    if (!input) return;

    input.oninput = (event: Event) => {
      const previousInner = this.getInnerInput();
      const selectionStart = previousInner?.selectionStart ?? null;
      const selectionEnd = previousInner?.selectionEnd ?? null;
      const detailValue = (event as CustomEvent<{ value?: string }>).detail?.value;
      const hostValue = input.getAttribute("value") || "";
      this.inputValue = detailValue ?? hostValue;
      this.highlightedIndex = -1;
      this.emitQueryChange();
      this.rerenderAndPreserveFocus(selectionStart, selectionEnd);
    };

    input.onkeydown = (event: KeyboardEvent) => {
      this.handleKeyboard(event);
    };

    this.shadowRoot.querySelectorAll("[data-option-value]").forEach((el) => {
      el.addEventListener("mousedown", (event) => {
        event.preventDefault();
        const value = (el as HTMLElement).getAttribute("data-option-value");
        if (value) this.addValue(value);
      });
    });

    this.shadowRoot.querySelectorAll("[data-remove-value]").forEach((el) => {
      el.addEventListener("dismiss", (event) => {
        event.stopPropagation();
        const value = (el as HTMLElement).getAttribute("data-remove-value");
        if (value && !this.disabled) this.removeValue(value);
      });
    });
  }

  render() {
    const id = this.getAttribute("id") || "";
    const label = this.getAttribute("label") || "";
    const placeholder = this.getAttribute("placeholder") || "Type to add";
    const hideLabel = this.hasAttribute("hide-label");
    const isMobileStack = this.useStackLayout;
    const name = this.getAttribute("name") || "";

    const options = this.filteredOptions;
    const listId = `${id}-listbox`;
    const showList = !this.disabled && (options.length > 0 || this.showCreateOption) && this.inputValue.trim().length > 0;

    const optionsMarkup = options
      .map((option, index) => {
        const isActive = index === this.highlightedIndex;
        return /*html*/ `
          <button
            type="button"
            class="option ${isActive ? "active" : ""}"
            role="option"
            aria-selected="${isActive ? "true" : "false"}"
            data-option-value="${option.value}"
          >${option.label}</button>
        `;
      })
      .join("");

    const createIndex = options.length;
    const createMarkup = this.showCreateOption
      ? /*html*/ `
          <button
            type="button"
            class="option ${this.highlightedIndex === createIndex ? "active" : ""}"
            role="option"
            aria-selected="${this.highlightedIndex === createIndex ? "true" : "false"}"
            data-option-value="${this.inputValue.trim()}"
          >Add "${this.inputValue.trim()}"</button>
        `
      : "";

    const chipSlot = this.placement;
    const shellClass = this.placement === "after" ? "chip-slot-shell after-shell" : "chip-slot-shell before-shell";
    const chipsMarkup = this.selectedItems.length
      ? /*html*/ `
          <mui-h-stack
            slot="${chipSlot}"
            class="${shellClass} ${isMobileStack ? "mobile-stack" : ""}"
            space="var(--stroke-size-200)"
            aligny="center"
          >
            ${this.selectedItems
              .map(
                (item) => /*html*/ `
                  <mui-chip
                    usage="input"
                    size="${this.normalizedSize}"
                    dismiss
                    ${this.disabled ? "disabled" : ""}
                    data-remove-value="${item.value}"
                    aria-label="Remove ${item.label}"
                  >${item.label}</mui-chip>
                `
              )
              .join("")}
          </mui-h-stack>
        `
      : "";

    const hiddenInputs = name
      ? this.selectedValues.map((value) => `<input type="hidden" name="${name}" value="${value}" />`).join("")
      : "";

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
          --chip-input-before-max-width: min(70%, 52rem);
        }
        .stack {
          display: grid;
          gap: var(--space-100);
        }
        .listbox {
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-100);
          background: var(--surface-elevated-100);
          overflow: hidden;
        }
        mui-h-stack.chip-slot-shell {
          background: var(--chip-input-background, #333333);
          padding: var(--chip-input-shell-padding, 2px);
          border: var(--chip-input-shell-border, 1px solid var(--form-default-border-color));
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          border-radius: var(--radius-100);
        }
        mui-h-stack.chip-slot-shell.mobile-stack {
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
        }
        mui-h-stack.chip-slot-shell.before-shell {
          border-right: none;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        mui-h-stack.chip-slot-shell.after-shell {
          border-left: none;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        mui-h-stack.chip-slot-shell.mobile-stack.before-shell {
          border-right: var(--chip-input-shell-border, 1px solid var(--form-default-border-color));
          border-bottom: none;
          border-top-left-radius: var(--radius-100);
          border-top-right-radius: var(--radius-100);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        mui-h-stack.chip-slot-shell.mobile-stack.after-shell {
          border-left: var(--chip-input-shell-border, 1px solid var(--form-default-border-color));
          border-top: none;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: var(--radius-100);
          border-bottom-right-radius: var(--radius-100);
        }
        .option {
          width: 100%;
          text-align: left;
          border: none;
          background: transparent;
          padding: var(--space-200) var(--space-300);
          cursor: pointer;
          color: var(--text-color);
        }
        .option.active,
        .option:hover {
          background: var(--surface-elevated-200);
        }
      </style>

      <div class="stack">
        <mui-input
          style="
            --input-before-slot-max-width: var(--chip-input-before-max-width);
            --input-after-slot-max-width: var(--chip-input-after-max-width, var(--chip-input-before-max-width));
            --input-slot-wrap: wrap;
            --input-slot-overflow-x: ${isMobileStack ? "hidden" : "visible"};
          "
          id="${id}"
          label="${label}"
          ${hideLabel ? "hide-label" : ""}
          size="${this.normalizedSize}"
          placeholder="${placeholder}"
          value="${this.inputValue}"
          ${isMobileStack ? 'slot-layout="stack-mobile"' : ""}
          ${this.disabled ? "disabled" : ""}
          aria-controls="${listId}"
          aria-autocomplete="list"
        >
          ${chipsMarkup}
        </mui-input>

        ${
          showList
            ? `<div id="${listId}" class="listbox" role="listbox">${optionsMarkup}${createMarkup}</div>`
            : ""
        }
      </div>

      ${hiddenInputs}
    `;
  }
}

if (!customElements.get("mui-chip-input")) {
  customElements.define("mui-chip-input", MuiChipInput);
}
