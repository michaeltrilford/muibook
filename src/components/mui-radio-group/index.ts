class MuiRadioGroup extends HTMLElement {
  static get observedAttributes() {
    return ["name", "value", "disabled", "size", "label", "hide-label", "optional"];
  }

  private _groupName = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "radiogroup");
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this._groupName = this.getAttribute("name") || this.generateGroupName();
    this.render();
    this.syncRadios();
    this.shadowRoot?.querySelector("slot")?.addEventListener("slotchange", () => this.syncRadios());
    this.addEventListener("change", this.onRadioChange as EventListener);
  }

  disconnectedCallback() {
    this.removeEventListener("change", this.onRadioChange as EventListener);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "name" && newValue) {
      this._groupName = newValue;
    }
    this.syncRadios();
  }

  private generateGroupName() {
    return `mui-radio-group-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  private getRadios() {
    return Array.from(this.querySelectorAll("mui-radio")) as HTMLElement[];
  }

  private onRadioChange = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() !== "mui-radio") return;
    if (!target.hasAttribute("checked")) return;

    const selectedValue = target.getAttribute("value") || "";
    this.setAttribute("value", selectedValue);

    this.getRadios().forEach((radio) => {
      if (radio !== target) radio.removeAttribute("checked");
    });

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: selectedValue, name: this._groupName },
        bubbles: true,
        composed: true,
      })
    );
  };

  private syncRadios() {
    const disabled = this.hasAttribute("disabled");
    const value = this.getAttribute("value") || "";
    const size = this.getAttribute("size") || "medium";
    const radios = this.getRadios();

    radios.forEach((radio) => {
      radio.setAttribute("name", this._groupName);
      radio.setAttribute("size", size);

      if (disabled) {
        radio.setAttribute("disabled", "");
        radio.setAttribute("data-group-disabled", "");
      } else if (radio.hasAttribute("data-group-disabled")) {
        radio.removeAttribute("disabled");
        radio.removeAttribute("data-group-disabled");
      }

      const radioValue = radio.getAttribute("value") || "";
      if (value && radioValue === value) {
        radio.setAttribute("checked", "");
      } else if (value) {
        radio.removeAttribute("checked");
      }
    });
  }

  private render() {
    if (!this.shadowRoot) return;
    const label = this.getAttribute("label") || "";
    const hideLabel = this.hasAttribute("hide-label");
    const optional = this.hasAttribute("optional");
    const labelId = `mui-radio-group-label-${this._groupName}`;
    const optionalMarkup = optional
      ? `<span class="optional"><span class="optional-dot">&bull;</span><span class="optional-text">Optional</span></span>`
      : "";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: grid;
          gap: var(--space-200);
        }
        label {
          font-size: var(--text-font-size);
          font-weight: var(--font-weight-medium);
          margin-bottom: var(--space-100);
          color: var(--text-color);
          display: block;
        }
        .label-with-optional {
          display: flex;
          align-items: center;
          gap: var(--space-100);
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
      </style>
      ${
        label
          ? `<label id="${labelId}" class="${hideLabel ? "vh" : ""}">
               <span class="label-with-optional">${label}${optionalMarkup}</span>
             </label>`
          : ""
      }
      <slot></slot>
    `;

    if (label) {
      this.setAttribute("aria-labelledby", labelId);
    } else {
      this.removeAttribute("aria-labelledby");
    }
  }
}

if (!customElements.get("mui-radio-group")) {
  customElements.define("mui-radio-group", MuiRadioGroup);
}
