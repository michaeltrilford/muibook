import "../mui-body";

class MuiRadio extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "disabled", "id", "name", "value", "aria-label", "size"];
  }

  private _changeHandler?: (e: Event) => void;

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
    this.cleanupListeners();
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;

    if (name === "checked") {
      if (input) input.checked = newValue !== null;
      return;
    }

    if (name === "disabled") {
      if (input) input.disabled = newValue !== null;
      return;
    }

    if (["id", "name", "value", "aria-label", "size"].includes(name)) {
      this.render();
      this.setupListener();
    }
  }

  private cleanupListeners() {
    const input = this.shadowRoot?.querySelector("input");
    if (input && this._changeHandler) {
      input.removeEventListener("change", this._changeHandler);
    }
  }

  private setupListener() {
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    if (!input) return;

    this.cleanupListeners();

    this._changeHandler = (e: Event) => {
      const target = e.target as HTMLInputElement;

      if (target.checked) {
        this.setAttribute("checked", "");
      } else {
        this.removeAttribute("checked");
      }

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            checked: target.checked,
            value: target.value,
            name: target.name,
          },
          bubbles: true,
          composed: true,
        })
      );
    };

    input.addEventListener("change", this._changeHandler);
  }

  render() {
    const id =
      this.getAttribute("id") ||
      `mui-radio-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    const name = this.getAttribute("name") || "";
    const value = this.getAttribute("value") || "";
    const checked = this.hasAttribute("checked");
    const disabled = this.hasAttribute("disabled");
    const ariaLabel = this.getAttribute("aria-label") || "";
    const size = this.getAttribute("size") || "medium";
    const allowedSizes = ["x-small", "small", "medium", "large"];
    const normalizedSize = allowedSizes.includes(size) ? size : "medium";
    const hasContent = this.innerHTML.trim().length > 0;

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
        }

        label {
          display: flex;
          align-items: center;
          gap: var(--space-200);
          cursor: pointer;
        }
        :host([disabled]) label {
          cursor: not-allowed;
        }
        :host([disabled]) mui-body {
          cursor: not-allowed;
        }

        input[type="radio"] {
          all: unset;
          width: var(--radio-size);
          height: var(--radio-size);
          border: var(--border-thin);
          border-color: var(--radio-border-color);
          border-radius: var(--radius-500);
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
          background: var(--radio-background);
          position: relative;
          box-sizing: border-box;
        }
        :host([size="x-small"]) input[type="radio"] {
          width: calc(var(--radio-size) - var(--space-100));
          height: calc(var(--radio-size) - var(--space-100));
        }
        :host([size="small"]) input[type="radio"] {
          width: calc(var(--radio-size) - var(--space-050));
          height: calc(var(--radio-size) - var(--space-050));
        }
        :host([size="large"]) input[type="radio"] {
          width: calc(var(--radio-size) + var(--space-100));
          height: calc(var(--radio-size) + var(--space-100));
        }

        input[type="radio"]:hover {
          border-color: var(--radio-border-color-hover);
        }

        input[type="radio"]:focus {
          outline: var(--outline-medium);
        }

        input[type="radio"]::after {
          content: "";
          position: absolute;
          inset: 50%;
          width: 55%;
          height: 55%;
          transform: translate(-50%, -50%);
          border-radius: var(--radius-500);
          background: var(--radio-dot-color-checked);
          opacity: 0;
        }

        input[type="radio"]:checked {
          border-color: var(--radio-border-color-checked);
          background: var(--radio-background);
        }

        input[type="radio"]:checked::after {
          opacity: 1;
        }

        input:disabled {
          background: var(--radio-background-disabled);
          border-color: var(--radio-border-color-disabled);
          cursor: not-allowed;
        }

        input[type="radio"]:disabled::after {
          background: var(--radio-dot-color-checked-disabled);
        }
      </style>

      <label>
        <input
          type="radio"
          id="${id}"
          name="${name}"
          value="${value}"
          ${checked ? "checked" : ""}
          ${disabled ? "disabled" : ""}
          ${ariaLabel ? `aria-label="${ariaLabel}"` : ""}
        />
        ${
          hasContent
            ? `<mui-body size="${
                normalizedSize === "x-small" || normalizedSize === "small" ? "x-small" : "small"
              }"><slot></slot></mui-body>`
            : ""
        }
      </label>
    `;
  }
}

if (!customElements.get("mui-radio")) {
  customElements.define("mui-radio", MuiRadio);
}
