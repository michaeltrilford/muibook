import { getPartMap } from "../../utils/part-map";
import "../mui-icons/down-chevron";

class MuiSelect extends HTMLElement {
  partMap = "";

  static get observedAttributes() {
    return ["name", "value", "id", "label", "options", "disabled", "hide-label", "variant", "optional", "size"];
  }

  _changeHandler?: (e: Event) => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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

    if (["options", "label", "hide-label", "variant", "optional", "size"].includes(name)) {
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
    const id =
      this.getAttribute("id") ||
      `mui-select-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    const label = this.getAttribute("label") || "";
    const value = this.getAttribute("value") || "";
    const hideLabel = this.hasAttribute("hide-label");
    const optional = this.hasAttribute("optional");
    const disabled = this.hasAttribute("disabled");
    const optionsAttr = this.getAttribute("options") || "[]";
    const size = this.getAttribute("size") || "medium";
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

    const optionsHTML = options
      .map(
        (opt) =>
          `<option value="${opt.value}" ${opt.value === value ? "selected" : ""} ${opt.disabled ? "disabled" : ""}>${
            opt.label
          }</option>`
      )
      .join("");

    const html = /*html*/ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
        }
        label {
          font-size: var(--text-font-size);
          font-weight: var(--font-weight-medium);
          margin-bottom: var(--space-100);
          color: var(--text-color);
          display: block;
        }
        select {
          min-height: 4.4rem;
          line-height: var(--text-line-height);
          padding: var(--space-200) var(--space-300);
          font-size: var(--text-font-size);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-100);
          color: var(--form-default-text-color);
          background: var(--input-background);
          width: 100%;
          box-sizing: border-box;
          appearance: none;
        }
        select.size-x-small {
          min-height: var(--action-icon-only-size-x-small);
          padding: var(--action-padding-x-small);
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
        }
        select.size-small {
          min-height: var(--action-icon-only-size-small);
          padding: var(--action-padding-small);
          font-size: var(--text-font-size-s);
          line-height: var(--text-line-height-s);
        }
        select.size-medium {
          min-height: 4.4rem;
          padding: var(--space-200) var(--space-300);
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
        }
        select.size-large {
          min-height: var(--action-icon-only-size-large);
          padding: var(--space-300) var(--space-400);
          font-size: var(--text-font-size-l);
          line-height: var(--text-line-height-l);
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
        <select class="${[variantClass, `size-${normalizedSize}`].filter(Boolean).join(" ")}" part="${this.partMap || ""}" name="${name}" id="${id}" ${ariaLabelAttr} 
        ${disabled ? "disabled" : ""}>
          ${optionsHTML}
        </select>
        <mui-icon-down-chevron class="chevron" size="${chevronSize}"></mui-icon-down-chevron>
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
