class MuiInput extends HTMLElement {
  static get observedAttributes() {
    return ["type", "name", "value", "placeholder", "id", "label", "disabled", "hide-label", "variant"];
  }

  _changeHandler?: (e: Event) => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
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

    if (["type", "placeholder", "label", "hide-label", "variant"].includes(name)) {
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
    };

    // Attach listeners
    inputEl.addEventListener("change", this._changeHandler);
    inputEl.addEventListener("input", this._changeHandler);
  }

  updateSlottedButtons(): void {
    requestAnimationFrame(() => {
      const beforeSlot = this.shadowRoot?.querySelector('slot[name="before"]') as HTMLSlotElement | null;
      const afterSlot = this.shadowRoot?.querySelector('slot[name="after"]') as HTMLSlotElement | null;

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
              // Enforce size to 'medium'
              el.setAttribute("size", "medium");
              // Remove variant attribute completely
              el.removeAttribute("variant");
              // Remove weight attribute completely
              el.removeAttribute("weight");
            }
          }
        });
      };

      updateButtonsInSlot(beforeSlot);
      updateButtonsInSlot(afterSlot);
    });
  }

  render() {
    const allowedTypes = ["text", "password", "email", "number", "search", "tel", "url", "date", "time"];

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
    const hideLabel = this.hasAttribute("hide-label");
    const disabled = this.hasAttribute("disabled");
    const ariaLabel = hideLabel && label ? `aria-label="${label}"` : "";

    const variant = this.getAttribute("variant") || "";
    const variantClass = variant ? variant : "";

    // ADD-ON
    const hasBefore = this.querySelector('[slot="before"]') !== null;
    const hasAfter = this.querySelector('[slot="after"]') !== null;
    const inputClasses = [variantClass, hasBefore ? "before" : "", hasAfter ? "after" : ""].filter(Boolean).join(" ");

    const html = /*html*/ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
        }
        label {
          display: block;
          font-size: var(--text-font-size);
          font-weight: var(--font-weight-medium);
          margin-bottom: var(--space-100);
          color: var(--text-color);
        }
        .input-wrapper {
          display: flex;
          width: 100%;
        }
        input {
          min-height: 4.4rem;
          width: 100%;
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

        /* ========================================================================== */
        

      </style>
      ${label ? `<label for="${id}" class="${hideLabel ? "vh" : ""}">${label}</label>` : ""}
    <div class="input-wrapper">
      <slot name="before"></slot>
      <input
        class="${inputClasses}"
        type="${type}"
        name="${name}"
        id="${id}"
        value="${value}"
        placeholder="${placeholder}"
        ${disabled ? 'disabled aria-disabled="true"' : ""}
        ${ariaLabel}
      />
      <slot name="after"></slot>
    </div>
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
