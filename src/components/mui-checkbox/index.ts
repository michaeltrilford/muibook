import "../mui-body";

class MuiCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "disabled", "id", "indeterminate"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupListener();
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

  setupListener(): void {
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    if (!input) return;

    input.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { checked: target.checked },
          bubbles: true,
          composed: true,
        })
      );

      // Sync attribute
      if (target.checked) {
        this.setAttribute("checked", "");
      } else {
        this.removeAttribute("checked");
      }
    });

    input.indeterminate = this.hasAttribute("indeterminate");

    input.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { checked: target.checked },
          bubbles: true,
          composed: true,
        })
      );

      this.removeAttribute("indeterminate"); // clear indeterminate on interaction

      if (target.checked) {
        this.setAttribute("checked", "");
      } else {
        this.removeAttribute("checked");
      }
    });
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
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M12.783 3.59a1 1 0 0 1 1.414 1.414L6.791 12.41a1 1 0 0 1-1.414 0L1.803 8.837l-.069-.076A1 1 0 0 1 3.14 7.353l.077.07 2.866 2.866z"
        ></path>
      </svg>
    `;

    const indeterminate = this.hasAttribute("indeterminate");

    const IndeterminateIcon = `
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="m12.5 7 .102.005a1 1 0 0 1 0 1.99L12.5 9h-9a1 1 0 0 1 0-2z"
        ></path>
      </svg>
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
          width: 19px;
          height: 19px;
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
          width: 16px;
          height: 16px;
          pointer-events: none;
          display: none;
          color: var(--checkbox-icon-color-checked);
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
