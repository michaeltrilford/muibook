import "../mui-body";

class MuiCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "disabled", "id", "indeterminate"];
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
    this.cleanupListeners();
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
    if (name === "checked") {
      const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
      if (!input) return;
      input.checked = newValue !== null;
    }

    if (name === "disabled") {
      const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
      if (!input) return;
      input.disabled = newValue !== null;
    }

    if (name === "indeterminate") {
      const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
      if (!input) return;

      const isIndeterminate = newValue !== null;
      input.indeterminate = isIndeterminate;

      if (isIndeterminate) {
        input.checked = true;
        this.setAttribute("checked", "");
      }
    }

    if ("id".includes(name)) {
      this.render();
      this.setupListener();
    }
  }

  cleanupListeners() {
    const input = this.shadowRoot?.querySelector("input");
    if (input && this._changeHandler) {
      input.removeEventListener("change", this._changeHandler);
    }
  }

  setupListener(): void {
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    if (!input) return;

    // Clean up old listeners
    this.cleanupListeners();

    // Set indeterminate state
    input.indeterminate = this.hasAttribute("indeterminate");

    // Single change handler for React compatibility
    this._changeHandler = (e: Event) => {
      const target = e.target as HTMLInputElement;

      // Update host attribute
      if (target.checked) {
        this.setAttribute("checked", "");
      } else {
        this.removeAttribute("checked");
      }

      // Clear indeterminate on interaction
      this.removeAttribute("indeterminate");

      // Dispatch event
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { checked: target.checked },
          bubbles: true,
          composed: true,
        })
      );
    };

    // Attach listener
    input.addEventListener("change", this._changeHandler);
  }

  render() {
    const id =
      this.getAttribute("id") ||
      `mui-checkbox-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    const checked = this.hasAttribute("checked");
    const disabled = this.hasAttribute("disabled");

    const CheckIcon = `
      <mui-icon-checkmark class="icon" size="x-small" color="inverted"></mui-icon-checkmark>
    `;

    const indeterminate = this.hasAttribute("indeterminate");

    const IndeterminateIcon = `
      <mui-icon-subtract class="icon" size="x-small" color="inverted"></mui-icon-subtract>
    `;

    const icon = indeterminate ? IndeterminateIcon : CheckIcon;

    // Check if slotted content exists
    const hasContent = this.innerHTML.trim().length > 0;

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
        }

        label {
          display: flex;
          align-items: start;
          gap: var(--space-200);
          cursor: pointer;
        }

        input[type="checkbox"] {
          all: unset;
          width: var(--checkbox-size);
          height: var(--checkbox-size);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--checkbox-radius);
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
          background: var(--checkbox-background);
          background-repeat: no-repeat;
          background-position: center;
        }

        input[type="checkbox"]:hover {
          border-color: var(--form-default-border-color-hover);
        }

        input[type="checkbox"]:checked {
          background-color: var(--checkbox-background-checked);
        }

        input[type="checkbox"]:indeterminate {
          background-color: var(--checkbox-background-checked);
        }

        input[type="checkbox"]:focus {
          outline: var(--outline-thick);
        }

        input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .checkbox-wrapper {
          position: relative;
          display: flex;
        }

        .checkbox-wrapper .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          display: none;
          fill: var(--checkbox-icon-color-checked);
        }

        .checkbox-wrapper input:checked + .icon {
          display: block;
        }

        .checkbox-wrapper input:indeterminate + .icon {
          display: block;
        }

      </style>

      <label>
        <span class="checkbox-wrapper">
          <input 
            type="checkbox" 
            id="${id}" 
            ${indeterminate ? "indeterminate" : ""}
            ${indeterminate || checked ? "checked" : ""}
            ${disabled ? "disabled" : ""} 
          />
          ${icon}
        </span>
        ${hasContent ? `<mui-body size="small"><slot></slot></mui-body>` : ""}
      </label>
    `;
  }

  get checked(): boolean {
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    return input?.checked ?? false;
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }
}

if (!customElements.get("mui-checkbox")) {
  customElements.define("mui-checkbox", MuiCheckbox);
}
