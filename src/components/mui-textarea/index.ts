class MuiTextarea extends HTMLElement {
  static get observedAttributes() {
    return [
      "name",
      "value",
      "placeholder",
      "id",
      "label",
      "disabled",
      "hide-label",
      "variant",
      "rows",
      "optional",
      "max-length",
      "size",
    ];
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
    const textareaEl = this.shadowRoot?.querySelector("textarea") as HTMLTextAreaElement | null;
    if (!textareaEl) return;

    if (name === "value") {
      textareaEl.value = newValue ?? "";
      this.updateCharacterCount();
      return;
    }

    if (name === "disabled") {
      if (newValue === null || newValue === "false") {
        textareaEl.removeAttribute("disabled");
      } else {
        textareaEl.setAttribute("disabled", "");
      }
      return;
    }

    if (name === "rows") {
      if (newValue) {
        textareaEl.setAttribute("rows", newValue);
      }
      return;
    }

    if (["placeholder", "label", "hide-label", "variant", "optional", "max-length", "size"].includes(name)) {
      this.render();
      this.setupListener();
    }
  }

  cleanupListeners() {
    const textareaEl = this.shadowRoot?.querySelector("textarea");
    if (textareaEl && this._changeHandler) {
      textareaEl.removeEventListener("change", this._changeHandler);
      textareaEl.removeEventListener("input", this._changeHandler);
    }
  }

  setupListener() {
    if (!this.shadowRoot) return;

    const textareaEl = this.shadowRoot.querySelector("textarea") as HTMLTextAreaElement | null;
    if (!textareaEl) return;

    this.cleanupListeners();

    this._changeHandler = (e: Event) => {
      const target = e.target as HTMLTextAreaElement;

      this.setAttribute("value", target.value);

      const eventDetail = {
        detail: { value: target.value },
        bubbles: true,
        composed: true,
      };

      this.dispatchEvent(new CustomEvent("change", eventDetail));
      this.dispatchEvent(new CustomEvent("input", eventDetail));
      this.updateCharacterCount();
    };

    textareaEl.addEventListener("change", this._changeHandler);
    textareaEl.addEventListener("input", this._changeHandler);
    this.updateCharacterCount();
  }

  updateCharacterCount() {
    const textareaEl = this.shadowRoot?.querySelector("textarea") as HTMLTextAreaElement | null;
    const countEl = this.shadowRoot?.querySelector(".char-count") as HTMLElement | null;
    if (!textareaEl || !countEl || textareaEl.maxLength <= 0) return;
    countEl.textContent = `${textareaEl.value.length}/${textareaEl.maxLength}`;
  }

  render() {
    const name = this.getAttribute("name") || "";
    const value = this.getAttribute("value") || "";
    const placeholder = this.getAttribute("placeholder") || "";
    const id =
      this.getAttribute("id") ||
      `mui-textarea-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    const label = this.getAttribute("label") || "";
    const optional = this.hasAttribute("optional");
    const hideLabel = this.hasAttribute("hide-label");
    const disabled = this.hasAttribute("disabled");
    const rows = this.getAttribute("rows") || "4";
    const maxLengthRaw = this.getAttribute("max-length");
    const maxLength = maxLengthRaw && Number(maxLengthRaw) > 0 ? String(Number(maxLengthRaw)) : "";
    const size = this.getAttribute("size") || "medium";
    const allowedSizes = ["x-small", "small", "medium", "large"];
    const normalizedSize = allowedSizes.includes(size) ? size : "medium";
    const ariaLabel = hideLabel && label ? `aria-label="${label}"` : "";

    const variant = this.getAttribute("variant") || "";
    const variantClass = variant ? variant : "";

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

        textarea {
          width: 100%;
          min-height: 9.6rem;
          line-height: var(--text-line-height);
          padding: var(--space-200) var(--space-300);
          box-sizing: border-box;
          font-size: var(--text-font-size);
          border-radius: var(--radius-100);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          color: var(--form-default-text-color);
          background: var(--input-background);
          resize: vertical;
          font-family: var(--font-family);
        }
        textarea.size-x-small {
          min-height: 7.2rem;
          padding: var(--action-padding-x-small);
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
        }
        textarea.size-small {
          min-height: 8.4rem;
          padding: var(--action-padding-small);
          font-size: var(--text-font-size-s);
          line-height: var(--text-line-height-s);
        }
        textarea.size-medium {
          min-height: 9.6rem;
          padding: var(--space-200) var(--space-300);
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
        }
        textarea.size-large {
          min-height: 11.2rem;
          padding: var(--space-300) var(--space-400);
          font-size: var(--text-font-size-l);
          line-height: var(--text-line-height-l);
        }

        textarea:hover {
          border-color: var(--form-default-border-color-hover);
          color: var(--form-default-text-color-hover);
        }

        textarea:focus {
          outline: var(--outline-thick);
        }

        textarea:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background-color: var(--input-background-disabled);
        }

        textarea.success {
          color: var(--form-success-text-color);
          border-color: var(--form-success-border-color);
          box-shadow: 0 0 0 2px var(--form-success-border-color);
        }

        textarea.warning {
          color: var(--form-warning-text-color);
          border-color: var(--form-warning-border-color);
          box-shadow: 0 0 0 2px var(--form-warning-border-color);
        }

        textarea.error {
          color: var(--form-error-text-color);
          border-color: var(--form-error-border-color);
          box-shadow: 0 0 0 2px var(--form-error-border-color);
        }

        textarea.success:hover {
          color: var(--form-success-text-color-hover);
          border-color: var(--form-success-border-color-hover);
          box-shadow: 0 0 0 2px var(--form-success-border-color-hover);
        }

        textarea.warning:hover {
          color: var(--form-warning-text-color-hover);
          border-color: var(--form-warning-border-color-hover);
          box-shadow: 0 0 0 2px var(--form-warning-border-color-hover);
        }

        textarea.error:hover {
          color: var(--form-error-text-color-hover);
          border-color: var(--form-error-border-color-hover);
          box-shadow: 0 0 0 2px var(--form-error-border-color-hover);
        }

        textarea::placeholder {
          color: var(--form-default-placeholder-color);
          opacity: 1;
        }

        textarea:hover::placeholder {
          color: var(--form-default-placeholder-color-hover);
        }

        textarea:focus::placeholder {
          color: var(--form-default-placeholder-color-focus);
        }

        textarea:disabled::placeholder {
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
          transform: translateY(calc(var(--stroke-size-100) * -1));
        }
      </style>

      ${
        label
          ? `<label for="${id}" class="${hideLabel ? "vh" : ""}">${label}${
              optional
                ? ' <span class="optional"><span class="optional-dot" aria-hidden="true">•</span><span class="optional-text">Optional</span></span>'
                : ""
            }</label>`
          : ""
      }

      <textarea
        id="${id}"
        name="${name}"
        class="${[variantClass, `size-${normalizedSize}`].filter(Boolean).join(" ")}"
        rows="${rows}"
        placeholder="${placeholder}"
        ${maxLength ? `maxlength="${maxLength}"` : ""}
        ${disabled ? "disabled" : ""}
        ${ariaLabel}
      >${value}</textarea>
      ${maxLength ? '<div class="meta"><span class="char-count"></span></div>' : ""}
    `;

    this.shadowRoot!.innerHTML = html;

    if (!label) {
      console.warn("mui-textarea: Missing required 'label' attribute for accessibility.");
    }
  }
}

if (!customElements.get("mui-textarea")) {
  customElements.define("mui-textarea", MuiTextarea);
}
