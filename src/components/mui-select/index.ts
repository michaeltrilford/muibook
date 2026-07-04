import { getPartMap } from "../../utils/part-map";
import "../mui-icons/down-chevron";

class MuiSelect extends HTMLElement {
  partMap = "";

  static get observedAttributes() {
    return [
      "name",
      "value",
      "id",
      "label",
      "options",
      "disabled",
      "hide-label",
      "variant",
      "optional",
      "size",
      "appearance",
      "selected-content",
      "col",
      "space",
      "max-height",
      "padding-block",
      "padding-inline",
    ];
  }

  _changeHandler?: (e: Event) => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get value(): string {
    const select = this.shadowRoot?.querySelector("select") as HTMLSelectElement | null;
    return select?.value ?? this.getAttribute("value") ?? "";
  }

  set value(next: string) {
    this.setAttribute("value", next ?? "");
  }

  focus(options?: FocusOptions) {
    const select = this.shadowRoot?.querySelector("select");
    if (select) {
      select.focus(options);
    } else {
      super.focus(options);
    }
  }

  async connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    await this.waitForPartMap();
    this.partMap = getPartMap("text", "visual");
    this.render();
    this.setupListener();
  }

  disconnectedCallback() {
    // Clean up event listeners
    this.cleanupListeners();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (!this.shadowRoot || oldValue === newValue) return;

    const selectEl = this.shadowRoot.querySelector("select") as HTMLSelectElement | null;

    if (name === "value" && selectEl) {
      selectEl.value = newValue || "";
      return;
    }

    if (name === "disabled" && selectEl) {
      if (newValue === null || newValue === "false") {
        selectEl.removeAttribute("disabled");
      } else {
        selectEl.setAttribute("disabled", "");
      }
      return;
    }

    if (
      [
        "options",
        "label",
        "hide-label",
        "variant",
        "optional",
        "size",
        "appearance",
        "selected-content",
        "col",
        "space",
        "max-height",
        "padding-block",
        "padding-inline",
      ].includes(name)
    ) {
      this.render();
      this.setupListener();
    }
  }

  cleanupListeners() {
    const selectEl = this.shadowRoot?.querySelector("select");
    if (selectEl && this._changeHandler) {
      selectEl.removeEventListener("change", this._changeHandler);
      selectEl.removeEventListener("input", this._changeHandler);
    }
  }

  setupListener() {
    if (!this.shadowRoot) return;

    const selectEl = this.shadowRoot.querySelector("select") as HTMLSelectElement | null;
    if (!selectEl) return;

    // Clean up old listeners
    this.cleanupListeners();

    // Change/Input handler - dispatching both for React compatibility
    this._changeHandler = (e: Event) => {
      const target = e.target as HTMLSelectElement;

      // Update host attribute
      this.setAttribute("value", target.value);

      // Dispatch both events for better framework compatibility
      const eventDetail = {
        detail: { value: target.value },
        bubbles: true,
        composed: true,
      };

      this.dispatchEvent(new CustomEvent("change", eventDetail));
      this.dispatchEvent(new CustomEvent("input", eventDetail));
    };

    // Attach listeners
    selectEl.addEventListener("change", this._changeHandler);
    selectEl.addEventListener("input", this._changeHandler);
  }

  render() {
    if (!this.shadowRoot) return;

    const name = this.getAttribute("name") || "";
    const id = this.getAttribute("id") || `mui-select-${Math.random().toString(36).substr(2, 9)}`;
    const label = this.getAttribute("label") || "";
    const value = this.getAttribute("value") || "";
    const hideLabel = this.hasAttribute("hide-label");
    const optional = this.hasAttribute("optional");
    const disabled = this.hasAttribute("disabled");
    const optionsAttr = this.getAttribute("options") || "[]";
    const size = this.getAttribute("size") || "medium";
    const appearance = this.getAttribute("appearance") === "custom" ? "custom" : "native";
    const selectedContentMode = this.getAttribute("selected-content") === "label" ? "label" : "rich";
    const pickerCol = this.getAttribute("col") || "1fr";
    const pickerSpace = this.getAttribute("space") || "var(--space-100)";
    const pickerMaxHeight = this.getAttribute("max-height") || "";
    const paddingBlock = this.getAttribute("padding-block") || "";
    const paddingInline = this.getAttribute("padding-inline") || "";
    const allowedSizes = ["x-small", "small", "medium", "large"];
    const normalizedSize = allowedSizes.includes(size) ? size : "medium";
    const chevronSizeMap: Record<string, string> = {
      "x-small": "xx-small",
      small: "x-small",
      medium: "x-small",
      large: "small",
    };
    const chevronSize = chevronSizeMap[normalizedSize] || "x-small";

    const variant = this.getAttribute("variant") || "";
    const variantClass = variant ? variant : "";

    // Here, we directly use the ariaLabel logic as in the 'input' component
    const ariaLabelAttr = hideLabel && label ? `aria-label="${label}"` : "";

    type SelectOption = { value: string; label: string; disabled?: boolean };

    let options: SelectOption[] = [];
    try {
      options = JSON.parse(optionsAttr);
    } catch (e) {
      console.error("Invalid JSON in options attribute", e);
    }

    const lightOptions = Array.from(this.querySelectorAll(":scope > option"));
    const optionSource = appearance === "custom" && lightOptions.length > 0 ? lightOptions : null;
    const optionsHTML = optionSource
      ? optionSource
          .map((option) => {
            const optionValue = option.getAttribute("value") || "";
            const selected = optionValue === value || option.hasAttribute("selected");
            const disabledOption = option.hasAttribute("disabled");
            return `<option value="${optionValue}" ${selected ? "selected" : ""} ${
              disabledOption ? "disabled" : ""
            }>${option.innerHTML}</option>`;
          })
          .join("")
      : options
          .map(
            (opt) =>
              `<option value="${opt.value}" ${opt.value === value ? "selected" : ""} ${
                opt.disabled ? "disabled" : ""
              }>${opt.label}</option>`,
          )
          .join("");
    const selectedContent =
      appearance === "custom" && selectedContentMode === "rich"
        ? "<button><selectedcontent></selectedcontent></button>"
        : "";
    const chevronHTML =
      appearance === "custom"
        ? ""
        : `<mui-icon-down-chevron class="chevron" size="${chevronSize}"></mui-icon-down-chevron>`;
    const customStyle = `
      --select-picker-col: ${pickerCol};
      --select-picker-space: ${pickerSpace};
      ${pickerMaxHeight ? `--select-picker-max-height: ${pickerMaxHeight};` : ""}
      ${paddingBlock ? `--select-padding-block: ${paddingBlock}; --select-option-padding-block: ${paddingBlock};` : ""}
      ${paddingInline ? `--select-padding-inline: ${paddingInline}; --select-option-padding-inline: ${paddingInline};` : ""}
    `;

    const html = /*html*/ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
        }
        label {
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
          font-weight: var(--font-weight-medium);
          margin-bottom: var(--space-100);
          color: var(--text-color);
          display: block;
        }
        :host([size="x-small"]) label {
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
        }
        :host([size="small"]) label {
          font-size: var(--text-font-size-s);
          line-height: var(--text-line-height-s);
        }
        :host([size="medium"]) label {
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
        }
        :host([size="large"]) label {
          font-size: var(--text-font-size-l);
          line-height: var(--text-line-height-l);
        }
        select {
          min-height: 4.4rem;
          line-height: var(--text-line-height);
          --select-padding-block-start-default: var(--space-200);
          --select-padding-block-end-default: var(--space-200);
          --select-padding-inline-start-default: var(--space-300);
          --select-padding-inline-end-default: var(--space-300);
          padding-block: var(
            --select-padding-block,
            var(--select-padding-block-start-default) var(--select-padding-block-end-default)
          );
          padding-inline: var(
            --select-padding-inline,
            var(--select-padding-inline-start-default) var(--select-padding-inline-end-default)
          );
          font-size: var(--text-font-size);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--form-radius-medium);
          color: var(--form-default-text-color);
          background: var(--input-background);
          width: 100%;
          box-sizing: border-box;
          appearance: none;
        }
        select.appearance-custom,
        select.appearance-custom::picker(select) {
          appearance: base-select;
          font: inherit;
          color: var(--form-default-text-color);
        }
        select.appearance-custom {
          cursor: pointer;
        }
        select.appearance-custom button {
          appearance: none;
          border: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-100);
          padding: 0;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          background: transparent;
          color: inherit;
          font: inherit;
          text-align: left;
        }
        select.appearance-custom selectedcontent {
          min-width: 0;
          flex: 1 1 auto;
        }
        select.appearance-custom::picker-icon {
          content: "";
          display: inline-block;
          width: var(--select-picker-icon-size, var(--space-400));
          height: var(--select-picker-icon-size, var(--space-400));
          flex: 0 0 auto;
          align-self: center;
          background: currentColor;
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cpath d='M18 25c-.79 0-1.428-.269-2.091-.917L6.7 15.072C6.23 14.595 6 14.069 6 13.42 6 12.101 7.122 11 8.487 11c.688 0 1.326.281 1.849.795l7.69 7.617 7.65-7.617c.524-.526 1.161-.795 1.837-.795C28.878 11 30 12.1 30 13.421c0 .648-.217 1.186-.701 1.638l-9.195 9.024c-.663.636-1.288.917-2.104.917'/%3E%3C/svg%3E");
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cpath d='M18 25c-.79 0-1.428-.269-2.091-.917L6.7 15.072C6.23 14.595 6 14.069 6 13.42 6 12.101 7.122 11 8.487 11c.688 0 1.326.281 1.849.795l7.69 7.617 7.65-7.617c.524-.526 1.161-.795 1.837-.795C28.878 11 30 12.1 30 13.421c0 .648-.217 1.186-.701 1.638l-9.195 9.024c-.663.636-1.288.917-2.104.917'/%3E%3C/svg%3E");
          -webkit-mask-position: center;
          mask-position: center;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          transition: transform var(--speed-200) ease;
        }
        select.appearance-custom:open::picker-icon {
          transform: rotate(180deg);
        }
        select.appearance-custom::picker(select) {
          display: none;
          grid-template-columns: var(--select-picker-col, 1fr);
          gap: var(--select-picker-space, var(--space-100));
          max-height: var(--select-picker-max-height, none);
          overflow: auto;
          margin-block-start: var(--space-100);
          padding: var(--space-100);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-200);
          background: var(--input-background);
          box-shadow: var(--shadow-300);
          box-sizing: border-box;
          box-shadow: var(--shadow-thick);
        }
        select.appearance-custom:open::picker(select) {
          display: grid;
        }
        select.appearance-custom option {
          display: block;
          min-width: 0;
          padding-block: var(
            --select-option-padding-block,
            var(--select-padding-block-start-default) var(--select-padding-block-end-default)
          );
          padding-inline: var(
            --select-option-padding-inline,
            var(--select-padding-inline-start-default) var(--select-padding-inline-end-default)
          );
          border-radius: var(--radius-100);
          background: transparent;
          color: var(--form-default-text-color);
        }
        select.appearance-custom option:hover,
        select.appearance-custom option:focus-visible {
          background: var(--action-tertiary-background-hover);
        }
        select.appearance-custom option:checked {
          background: var(--action-tertiary-background-focus);
        }
        select.appearance-custom option::checkmark {
          display: none;
        }
        select.size-x-small {
          min-height: var(--action-size-x-small);
          --select-padding-block-start-default: var(--space-050);
          --select-padding-block-end-default: var(--space-050);
          --select-padding-inline-start-default: var(--space-100);
          --select-padding-inline-end-default: var(--space-100);
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
          border-radius: var(--form-radius-x-small);
        }
        select.size-small {
          min-height: var(--action-size-small);
          --select-padding-block-start-default: var(--space-100);
          --select-padding-block-end-default: var(--space-100);
          --select-padding-inline-start-default: var(--space-200);
          --select-padding-inline-end-default: var(--space-200);
          font-size: var(--text-font-size-s);
          line-height: var(--text-line-height-s);
          border-radius: var(--form-radius-small);
        }
        select.size-medium {
          min-height: var(--action-size-medium);
          --select-padding-block-start-default: var(--space-200);
          --select-padding-block-end-default: var(--space-200);
          --select-padding-inline-start-default: var(--space-300);
          --select-padding-inline-end-default: var(--space-300);
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
          border-radius: var(--form-radius-medium);
        }
        select.size-large {
          min-height: var(--action-size-large);
          --select-padding-block-start-default: var(--space-300);
          --select-padding-block-end-default: var(--space-300);
          --select-padding-inline-start-default: var(--space-400);
          --select-padding-inline-end-default: var(--space-400);
          font-size: var(--text-font-size-l);
          line-height: var(--text-line-height-l);
          border-radius: var(--form-radius-large);
        }
        select.appearance-custom.size-x-small {
          --select-picker-icon-size: 1.3rem;
        }
        select.appearance-custom.size-small {
          --select-picker-icon-size: var(--space-400);
          --select-padding-inline-end-default: var(--space-200);
        }
        select.appearance-custom.size-medium {
          --select-picker-icon-size: var(--space-400);
        }
        select.appearance-custom.size-large {
          --select-picker-icon-size: 2.1rem;
        }
        select:hover {
          border-color: var(--form-default-border-color-hover);
          color: var(--form-default-text-color-hover);
        }
        select:focus {
          outline: var(--outline-thick);
        }
        select:disabled {
          opacity: 0.4;
          background-color: var(--input-background-disabled);
          cursor: not-allowed;
        }
        select.success {
          color: var(--form-success-text-color);
          border-color: var(--form-success-border-color);
          box-shadow: 0 0 0 2px var(--form-success-border-color);
        }
        select.warning {
          color: var(--form-warning-text-color);
          border-color: var(--form-warning-border-color);
          box-shadow: 0 0 0 2px var(--form-warning-border-color);
        }
        select.error {
          color: var(--form-error-text-color);
          border-color: var(--form-error-border-color);
          box-shadow: 0 0 0 2px var(--form-error-border-color);
        }
        select.success:hover {
          color: var(--form-success-text-color-hover);
          border-color: var(--form-success-border-color-hover);
          box-shadow: 0 0 0 2px var(--form-success-border-color-hover);
        }
        select.warning:hover {
          color: var(--form-warning-text-color-hover);
          border-color: var(--form-warning-border-color-hover);
          box-shadow: 0 0 0 2px var(--form-warning-border-color-hover);
        }
        select.error:hover {
          color: var(--form-error-text-color-hover);
          border-color: var(--form-error-border-color-hover);
          box-shadow: 0 0 0 2px var(--form-error-border-color-hover);
        }
        .vh {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }
        .optional {
          color: var(--text-color-optional);
          display: inline-flex;
          align-items: center;
          gap: var(--space-050);
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
          text-transform: uppercase;
          font-weight: var(--font-weight-medium);
        }
        :host([size="x-small"]) .optional {
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
        }
        :host([size="small"]) .optional {
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
        }
        :host([size="medium"]) .optional {
          font-size: var(--text-font-size-s);
          line-height: var(--text-line-height-s);
        }
        :host([size="large"]) .optional {
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
        }
        .optional-dot {
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }
        .optional-text {
          transform: translateY(calc(var(--stroke-size-100) * -1));
        }
        .chevron {
          position: absolute; 
          right: var(--space-300);
          top: 50%;
          transform: translateY(-50%);
          padding: var(--space-200);
          padding-left: var(--space-000);
          padding-right: var(--space-000);
          background: var(--input-background);
          box-shadow: -4px 0 4px 0 var(--input-background);
          pointer-events: none;
        }
        :host([size="x-small"]) .chevron,
        :host([size="small"]) .chevron {
          right: var(--space-200);
          padding: var(--space-000);
          box-shadow: none;
        }
        :host([size="large"]) .chevron {
          right: var(--space-400);
          padding: var(--space-300);
          padding-left: var(--space-000);
          padding-right: var(--space-000);
        }

        select:disabled + .chevron {
          background: transparent;
          box-shadow: none;
          opacity: 0.4;
        }

        /* ========================================================================== */
        /* STYLE ADJUSTMENTS WHEN SELECT IS SLOTTED WITHIN INPUT                      */
        /* Related styles unique to this usage is found in the mui-input/index.js     */
        /* ========================================================================== */

        /* ========================================================================== */
        /* BEFORE: When a SELECT has slot="before" applied to host for INPUT usage    */
        /* ========================================================================== */

            :host([slot="before"]) select {
              border-right: none;
              border-top-right-radius: var(--radius-000);
              border-bottom-right-radius: var(--radius-000);
            }

        /* ========================================================================== */
        /* AFTER: When a SELECT has slot="after" applied to host for INPUT usage      */
        /* ========================================================================== */

            :host([slot="after"]) select {
              border-left: none;
              border-top-left-radius: var(--radius-000);
              border-bottom-left-radius: var(--radius-000);
            }

            /* Ensure feedback styles appear above INPUT */
            select.success,
            select.warning,
            select.error {
              z-index: 1;
            }

        /* ========================================================================== */

      </style>
      ${
        label
          ? /*html*/ `<label for="${id}" class="${hideLabel ? "vh" : ""}">${label}${
              optional
                ? ' <span class="optional"><span class="optional-dot" aria-hidden="true">•</span><span class="optional-text">Optional</span></span>'
                : ""
            }</label>`
          : ""
      }
      <div style="position: relative;">
        <select class="${[variantClass, `size-${normalizedSize}`, `appearance-${appearance}`].filter(Boolean).join(" ")}" part="${this.partMap || ""}" name="${name}" id="${id}" ${ariaLabelAttr} style="${customStyle}"
        ${disabled ? "disabled" : ""}>
          ${selectedContent}
          ${optionsHTML}
        </select>
        ${chevronHTML}
      </div>
    `;

    this.shadowRoot.innerHTML = html;
  }
  waitForPartMap(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof getPartMap === "function") return resolve();
      const check = () => {
        if (typeof getPartMap === "function") {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }
}

if (!customElements.get("mui-select")) {
  customElements.define("mui-select", MuiSelect);
}
