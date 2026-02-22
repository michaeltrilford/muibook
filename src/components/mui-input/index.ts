class MuiInput extends HTMLElement {
  static get observedAttributes() {
    return [
      "type",
      "name",
      "value",
      "placeholder",
      "id",
      "label",
      "disabled",
      "hide-label",
      "variant",
      "optional",
      "max-length",
      "size",
      "slot-layout",
    ];
  }

  _changeHandler?: (e: Event) => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this.render();
    this.setupListener();
  }

  disconnectedCallback() {
    // Clean up event listeners
    this.cleanupListeners();
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
    const inputEl = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    if (!inputEl) return;

    if (name === "value") {
      inputEl.value = newValue ?? "";
      this.updateCharacterCount();
      return;
    }

    if (name === "disabled") {
      if (newValue === null || newValue === "false") {
        inputEl.removeAttribute("disabled");
      } else {
        inputEl.setAttribute("disabled", "");
      }
      return;
    }

    if (
      ["type", "placeholder", "label", "hide-label", "variant", "optional", "max-length", "size", "slot-layout"].includes(
        name
      )
    ) {
      this.render();
      this.setupListener();
    }
  }

  cleanupListeners() {
    const inputEl = this.shadowRoot?.querySelector("input");
    if (inputEl && this._changeHandler) {
      inputEl.removeEventListener("change", this._changeHandler);
      inputEl.removeEventListener("input", this._changeHandler);
    }
  }

  setupListener() {
    if (!this.shadowRoot) return;

    const inputEl = this.shadowRoot.querySelector("input") as HTMLInputElement | null;
    if (!inputEl) return;

    // Clean up old listeners
    this.cleanupListeners();

    // Change/Input handler - dispatching both for React compatibility
    this._changeHandler = (e: Event) => {
      const target = e.target as HTMLInputElement;

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
      this.updateCharacterCount();
    };

    // Attach listeners
    inputEl.addEventListener("change", this._changeHandler);
    inputEl.addEventListener("input", this._changeHandler);
    this.updateCharacterCount();
  }

  updateCharacterCount() {
    const inputEl = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    const countEl = this.shadowRoot?.querySelector(".char-count") as HTMLElement | null;
    if (!inputEl || !countEl || inputEl.maxLength <= 0) return;
    countEl.textContent = `${inputEl.value.length}/${inputEl.maxLength}`;
  }

  updateSlottedButtons(): void {
    requestAnimationFrame(() => {
      const size = this.getAttribute("size") || "medium";
      const allowedSizes = ["x-small", "small", "medium", "large"];
      const normalizedSize = allowedSizes.includes(size) ? size : "medium";

      const beforeSlot = this.shadowRoot?.querySelector('slot[name="before"]') as HTMLSlotElement | null;
      const afterSlot = this.shadowRoot?.querySelector('slot[name="after"]') as HTMLSlotElement | null;
      const hintSlot = this.shadowRoot?.querySelector('slot[name="hint"]') as HTMLSlotElement | null;

      const updateButtonsInSlot = (slot: HTMLSlotElement | null) => {
        if (!slot) return;

        const assignedNodes = slot.assignedNodes({ flatten: true });
        assignedNodes.forEach((node: Node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tagName = el.tagName.toLowerCase();
            if (tagName === "mui-button" || tagName === "mui-link") {
              // Set usage attribute to 'input'
              el.setAttribute("usage", "input");
              // Keep add-on controls aligned with input size.
              el.setAttribute("size", normalizedSize);
              // Remove variant attribute completely
              el.removeAttribute("variant");
              // Remove weight attribute completely
              el.removeAttribute("weight");
            }
            if (tagName === "mui-chip") {
              // Keep chip aligned with input affordance sizing.
              el.setAttribute("usage", "input");
              el.setAttribute("size", normalizedSize);
            }
          }
        });
      };

      updateButtonsInSlot(beforeSlot);
      updateButtonsInSlot(afterSlot);

      if (hintSlot) {
        const hintIconSizeMap: Record<string, string> = {
          "x-small": "xx-small",
          small: "x-small",
          medium: "x-small",
          large: "small",
        };
        const hintBadgeSizeMap: Record<string, string> = {
          "x-small": "x-small",
          small: "x-small",
          medium: "small",
          large: "medium",
        };
        const iconSize = hintIconSizeMap[normalizedSize] || "x-small";
        const badgeSize = hintBadgeSizeMap[normalizedSize] || "small";
        hintSlot.assignedNodes({ flatten: true }).forEach((node: Node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as HTMLElement;
          const tagName = el.tagName.toLowerCase();
          if (tagName.startsWith("mui-icon-") && !el.hasAttribute("size")) {
            el.setAttribute("size", iconSize);
          }
          if (tagName === "mui-badge" && !el.hasAttribute("size")) {
            el.setAttribute("size", badgeSize);
          }
          el.setAttribute("aria-hidden", "true");
        });
      }
    });
  }

  render() {
    const allowedTypes = [
      "text",
      "password",
      "email",
      "number",
      "search",
      "tel",
      "url",
      "date",
      "time",
      "datetime-local",
      "month",
      "week",
    ];

    const rawType = this.getAttribute("type") || "text";
    const type = allowedTypes.includes(rawType) ? rawType : "text";
    const name = this.getAttribute("name") || "";
    const value = this.getAttribute("value") || "";
    const placeholder = this.getAttribute("placeholder") || "";
    const id =
      this.getAttribute("id") ||
      `mui-input-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    const label = this.getAttribute("label") || "";
    const optional = this.hasAttribute("optional");
    const hideLabel = this.hasAttribute("hide-label");
    const disabled = this.hasAttribute("disabled");
    const ariaLabel = hideLabel && label ? `aria-label="${label}"` : "";
    const maxLengthRaw = this.getAttribute("max-length");
    const maxLength = maxLengthRaw && Number(maxLengthRaw) > 0 ? String(Number(maxLengthRaw)) : "";
    const size = this.getAttribute("size") || "medium";
    const allowedSizes = ["x-small", "small", "medium", "large"];
    const normalizedSize = allowedSizes.includes(size) ? size : "medium";

    const variant = this.getAttribute("variant") || "";
    const variantClass = variant ? variant : "";
    const slotLayout = this.getAttribute("slot-layout") || "inline";
    const wrapperClass = slotLayout === "stack-mobile" ? "input-wrapper stack-mobile" : "input-wrapper";

    // ADD-ON
    const hasBefore = this.querySelector('[slot="before"]') !== null;
    const hasAfter = this.querySelector('[slot="after"]') !== null;
    const hasHint = this.querySelector('[slot="hint"]') !== null;
    const inputClasses = [variantClass, hasBefore ? "before" : "", hasAfter ? "after" : "", hasHint ? "hint" : ""]
      .filter(Boolean)
      .join(" ");

    const html = /*html*/ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
          container-type: inline-size;
        }
        :host([type="date"]),
        :host([type="time"]),
        :host([type="datetime-local"]),
        :host([type="month"]),
        :host([type="week"]),
        :host([type="number"]),
        :host([type="search"]) {
          color-scheme: light dark;
        }
        label {
          display: block;
          font-size: var(--text-font-size);
          font-weight: var(--font-weight-medium);
          margin-bottom: var(--space-100);
          color: var(--text-color);
        }
        .label-with-optional {
          display: flex;
          align-items: center;
          gap: var(--space-100);
        }
        .input-wrapper {
          display: flex;
          width: 100%;
          align-items: stretch;
          position: relative;
        }
        .input-wrapper.stack-mobile {
          display: flex;
        }
        .before-slot,
        .after-slot,
        .hint-slot {
          display: inline-flex;
          align-items: stretch;
          gap: var(--space-050);
          flex-wrap: var(--input-slot-wrap, nowrap);
          overflow-x: var(--input-slot-overflow-x, visible);
          overflow-y: var(--input-slot-overflow-y, visible);
          scrollbar-width: thin;
          flex: 0 1 auto;
        }
        .hint-slot {
          position: absolute;
          right: var(--space-300);
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          pointer-events: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--text-color-optional);
          gap: var(--space-100);
          overflow: visible;
          flex: 0 0 auto;
        }
        :host([size="x-small"]) .hint-slot {
          right: var(--space-200);
        }
        :host([size="small"]) .hint-slot {
          right: var(--space-300);
        }
        :host([size="large"]) .hint-slot {
          right: var(--space-400);
        }
        .before-slot {
          max-width: none;
        }
        .after-slot {
          max-width: none;
        }
        @container (min-width: 20rem) {
          .before-slot {
            max-width: var(--input-before-slot-max-width, 50%);
          }
          .after-slot {
            max-width: var(--input-after-slot-max-width, 50%);
          }
        }
        .input-wrapper.stack-mobile {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: var(--space-000);
        }
        .input-wrapper.stack-mobile .before-slot,
        .input-wrapper.stack-mobile .after-slot {
          display: flex;
          max-width: 100%;
          width: 100%;
          flex: 1 1 auto;
          overflow-x: visible;
          overflow-y: visible;
        }
        .input-wrapper.stack-mobile .hint-slot {
          right: var(--space-200);
          top: calc(var(--action-icon-only-size) / 2);
          transform: translateY(-50%);
        }
        .input-wrapper.stack-mobile slot[name="before"]::slotted(mui-addon),
        .input-wrapper.stack-mobile slot[name="after"]::slotted(mui-addon) {
          width: 100%;
        }
        .input-wrapper.stack-mobile .before-slot {
          grid-row: 1;
        }
        .input-wrapper.stack-mobile input {
          grid-row: 2;
        }
        .input-wrapper.stack-mobile .after-slot {
          grid-row: 3;
        }
        .input-wrapper.stack-mobile input.before:not(.after) {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: var(--radius-100);
          border-bottom-right-radius: var(--radius-100);
        }
        .input-wrapper.stack-mobile input.after:not(.before) {
          border-top-left-radius: var(--radius-100);
          border-top-right-radius: var(--radius-100);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        .input-wrapper.stack-mobile input.before.after {
          border-radius: 0;
        }
        .meta {
          display: flex;
          justify-content: flex-end;
          margin-top: var(--space-100);
          min-height: 1.8rem;
        }
        .char-count {
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
          color: var(--text-color);
          opacity: 0.7;
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
          display: inline-flex;
          align-items: center;
        }
        input {
          min-height: 4.4rem;
          width: auto;
          min-width: 0;
          flex: 1 1 auto;
          line-height: var(--text-line-height);
          padding: var(--space-200) var(--space-300);
          box-sizing: border-box;
          font-size: var(--text-font-size);
          border-radius: var(--radius-100);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          color: var(--form-default-text-color);
          background: var(--input-background);
        }
        input.size-x-small {
          min-height: var(--action-icon-only-size-x-small);
          padding: var(--action-padding-x-small);
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
        }
        input.size-x-small.hint:not(.after) {
          padding-right: calc(var(--space-500) + var(--space-200));
        }
        input.size-small {
          min-height: var(--action-icon-only-size-small);
          padding: var(--action-padding-small);
          font-size: var(--text-font-size-s);
          line-height: var(--text-line-height-s);
        }
        input.size-small.hint:not(.after) {
          padding-right: calc(var(--space-500) + var(--space-300));
        }
        input.size-medium {
          min-height: 4.4rem;
          padding: var(--space-200) var(--space-300);
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
        }
        input.size-medium.hint:not(.after) {
          padding-right: calc(var(--space-600) + var(--space-300));
        }
        input.size-large {
          min-height: var(--action-icon-only-size-large);
          padding: var(--space-300) var(--space-400);
          font-size: var(--text-font-size-l);
          line-height: var(--text-line-height-l);
        }
        input.size-large.hint:not(.after) {
          padding-right: calc(var(--space-700) + var(--space-300));
        }
        input:hover {
          border-color: var(--form-default-border-color-hover);
          color: var(--form-default-text-color-hover);
        }
        input:focus {
          outline: var(--outline-thick);
        }
        input:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background-color: var(--input-background-disabled);
        }

        input.success {
          color: var(--form-success-text-color);
          border-color: var(--form-success-border-color);
          box-shadow: 0 0 0 2px var(--form-success-border-color);
        }
        input.warning {
          color: var(--form-warning-text-color);
          border-color: var(--form-warning-border-color);
          box-shadow: 0 0 0 2px var(--form-warning-border-color);
        }
        input.error {
          color: var(--form-error-text-color);
          border-color: var(--form-error-border-color);
          box-shadow: 0 0 0 2px var(--form-error-border-color);
        }
        input.success:hover {
          color: var(--form-success-text-color-hover);
          border-color: var(--form-success-border-color-hover);
          box-shadow: 0 0 0 2px var(--form-success-border-color-hover);
        }
        input.warning:hover {
          color: var(--form-warning-text-color-hover);
          border-color: var(--form-warning-border-color-hover);
          box-shadow: 0 0 0 2px var(--form-warning-border-color-hover);
        }
        input.error:hover {
          color: var(--form-error-text-color-hover);
          border-color: var(--form-error-border-color-hover);
          box-shadow: 0 0 0 2px var(--form-error-border-color-hover);
        }


        /* Placeholder styles */
        input::placeholder {
          color: var(--form-default-placeholder-color);
          opacity: 1;
        }

        /* Optional: hover */
        input:hover::placeholder {
          color: var(--form-default-placeholder-color-hover);
        }

        /* Optional: focus */
        input:focus::placeholder {
          color: var(--form-default-placeholder-color-focus);
        }

        /* Optional: disabled */
        input:disabled::placeholder {
          color: var(--form-default-placeholder-color-disabled);
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

        /* ========================================================================== */
        /* STYLES FOR BEFORE & AFTER (ADDON & SELECT)                                 */
        /* ========================================================================== */

           input.before { border-top-left-radius: 0; border-bottom-left-radius: 0;}
           input.after { border-top-right-radius: 0; border-bottom-right-radius: 0;}

        /* ========================================================================== */
        /* LOGIC FOR FOCUS ORDER of BEFORE, AFTER & INPUT                             */
        /* The goal is to not exceed 1 order to avoid potential UI bugs               */
        /* when input and the before/after feature is used in compositions.           */
        /* ========================================================================== */

        /* ========================================================================== */
        /* 1. BEFORE: Slotted items are Z-INDEX AUTO by default                       */
        /* ========================================================================== */

        /* If slotted item is BEFORE & FOCUSED then sit ABOVE INPUT                   */

        /* ========================================================================== */
        /* 2. INPUT: Slotted items are Z-INDEX AUTO by default                        */
        /* ========================================================================== */

        /* If INPUT is FOCUSED then sit ABOVE BEFORE & AFTER ITEMS                    */

        /* ========================================================================== */
        /* 3. AFTER: Slotted items are Z-INDEX AUTO by default                        */
        /* ========================================================================== */

        /* If slotted item is AFTER & FOCUSED then sit ABOVE INPUT                    */

        /* ========================================================================== */
        /* 4. FINAL CONCLUSION ON APPROACH                                            */
        /* ========================================================================== */
        /* Currently only mui-select is slotted, this might be the only               */
        /* use-case, but for now we will use '*' to ensure any element that           */
        /* is focusable will be addressed.                                            */
        /* ========================================================================== */

        slot[name="before"]::slotted(*:focus),
        input:focus,
        slot[name="after"]::slotted(*:focus),
        slot[name="before"]::slotted(*:hover),
        input:hover,
        slot[name="after"]::slotted(*:hover) { z-index: 1; }

      /* Ensure feedback styles appear above SELECT and focusable Items */
        input.success,
        input.warning,
        input.error {
          z-index: 1;
        }


        /* Slotted items */
        slot[name="before"]::slotted(*),
        slot[name="after"]::slotted(*) { flex: none; }
        slot[name="hint"]::slotted(*) {
          flex: none;
          pointer-events: none;
        }

        /* ========================================================================== */
        

      </style>
      ${
        label
          ? `<label for="${id}" class="${[hideLabel ? "vh" : "", optional ? "label-with-optional" : ""]
              .filter(Boolean)
              .join(" ")}">${label}${
              optional
                ? ' <span class="optional"><span class="optional-dot" aria-hidden="true">•</span><span class="optional-text">Optional</span></span>'
                : ""
            }</label>`
          : ""
      }
    <div class="${wrapperClass}">
      <div class="before-slot">
        <slot name="before"></slot>
      </div>
      <input
        class="${[inputClasses, `size-${normalizedSize}`].filter(Boolean).join(" ")}"
        type="${type}"
        name="${name}"
        id="${id}"
        value="${value}"
        placeholder="${placeholder}"
        ${disabled ? 'disabled aria-disabled="true"' : ""}
        ${maxLength ? `maxlength="${maxLength}"` : ""}
        ${ariaLabel}
      />
      <div class="hint-slot">
        <slot name="hint"></slot>
      </div>
      <div class="after-slot">
        <slot name="after"></slot>
      </div>
    </div>
    ${maxLength ? '<div class="meta"><span class="char-count"></span></div>' : ""}
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;

      this.updateSlottedButtons();
    }
  }
}

if (!customElements.get("mui-input")) {
  customElements.define("mui-input", MuiInput);
}
