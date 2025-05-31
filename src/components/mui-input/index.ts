class muiInput extends HTMLElement {
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
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupListener();
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    const inputEl = this.shadowRoot?.querySelector(
      "input"
    ) as HTMLInputElement | null;
    if (!inputEl) return;

    if (name === "value") {
      inputEl.value = newValue ?? "";
    }

    if (name === "disabled") {
      if (newValue === null || newValue === "false") {
        inputEl.removeAttribute("disabled");
      } else {
        inputEl.setAttribute("disabled", "");
      }
    }

    if (
      name === "type" ||
      name === "placeholder" ||
      name === "label" ||
      name === "hide-label"
    ) {
      this.render();
      this.setupListener();
    }
  }

  setupListener(): void {
    const oldInputEl = this.shadowRoot?.querySelector(
      "input"
    ) as HTMLInputElement | null;
    if (!oldInputEl) return;

    const newInputEl = oldInputEl.cloneNode(true) as HTMLInputElement;
    oldInputEl.parentNode?.replaceChild(newInputEl, oldInputEl);

    newInputEl.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: { value: target.value },
          bubbles: true,
          composed: true,
        })
      );
    });

    newInputEl.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: target.value },
          bubbles: true,
          composed: true,
        })
      );
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
    const hideLabel = this.hasAttribute("hide-label");
    const disabled = this.hasAttribute("disabled");
    const ariaLabel = hideLabel && label ? `aria-label="${label}"` : "";

    const variant = this.getAttribute("variant") || "";
    const variantClass = variant ? variant : "";

    // ADD-ON
    const hasBefore = this.querySelector('[slot="before"]') !== null;
    const hasAfter = this.querySelector('[slot="after"]') !== null;
    const inputClasses = [
      variantClass,
      hasBefore ? "before" : "",
      hasAfter ? "after" : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (hideLabel && !label) {
      console.warn(
        "mui-input Accessibility warning: When using 'hide-label', please provide a 'label' attribute so an 'aria-label' can be generated for screen reader support."
      );
    }

    if (!label && !ariaLabel) {
      console.warn(
        "mui-input Accessibility warning: A 'label' or 'aria-label' attribute is required for screen reader accessibility."
      );
    }

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
          color: var(--text-color);
          background: var(--input-background);
        }
        input:hover {
          border-color: var(--form-default-border-color-hover);
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
           slot[name="after"]::slotted(*:focus) { z-index: 1; }

          /* Ensure feedback styles appear above SELECT and focusable Items */
           input.success,
           input.warning,
           input.error {
             z-index: 1;
           }

        /* ========================================================================== */
        

      </style>
      ${
        label
          ? `<label for="${id}" class="${
              hideLabel ? "vh" : ""
            }">${label}</label>`
          : ""
      }
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
    }
  }
}

customElements.define("mui-input", muiInput);
