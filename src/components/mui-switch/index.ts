class MuiSwitch extends HTMLElement {
  private _checked: boolean = false;
  private _checkbox: HTMLInputElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._checked = false;
  }

  connectedCallback() {
    this.render();
    this._checkbox = this.shadowRoot!.querySelector('input[type="checkbox"]');
    this._checked = this.hasAttribute("checked");
    if (this._checkbox) {
      this._checkbox.checked = this._checked;
    }
    this._updateIcons();
    this._updateDisabledState();

    this._checkbox?.addEventListener("change", () => {
      if (this._checkbox) {
        this.checked = this._checkbox.checked;
        this.dispatchEvent(
          new CustomEvent("change", {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true,
          })
        );
      }
    });
  }

  static get observedAttributes() {
    return ["label", "disabled", "checked"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (name === "checked") {
      // oldValue is null if attribute was not present before
      // newValue is null if attribute was removed
      if (oldValue !== newValue) {
        this._checked = newValue !== null;
        if (this._checkbox) {
          this._checkbox.checked = this._checked;
          this._updateIcons();
        }
      }
    }

    if (name === "disabled") {
      if (oldValue !== newValue) {
        const isDisabled = newValue !== null;
        if (this._checkbox) {
          this._checkbox.disabled = isDisabled;
          this._checkbox.setAttribute("aria-disabled", isDisabled.toString());
        }
        this._updateDisabledState();
      }
    }
  }

  get checked() {
    return this._checked;
  }

  set checked(value) {
    const isChecked = Boolean(value);
    if (this._checked === isChecked) return;
    this._checked = isChecked;
    if (isChecked) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
    if (this._checkbox) {
      this._checkbox.checked = this._checked;
      this._checkbox.setAttribute("aria-checked", this._checked.toString());
      this._updateIcons();
    }
  }

  _updateDisabledState() {
    const isDisabled = this.hasAttribute("disabled");
    if (isDisabled) {
      this.shadowRoot!.host.classList.add("disabled");
      this._checkbox?.setAttribute("aria-disabled", "true");
      this._checkbox?.setAttribute("tabindex", "-1");
    } else {
      this.shadowRoot!.host.classList.remove("disabled");
      this._checkbox?.removeAttribute("aria-disabled");
      this._checkbox?.removeAttribute("tabindex");
    }
  }

  _updateIcons() {
    const onIcon = this.shadowRoot!.querySelector(
      'slot[name="on-icon"]'
    ) as HTMLSlotElement | null;
    const offIcon = this.shadowRoot!.querySelector(
      'slot[name="off-icon"]'
    ) as HTMLSlotElement | null;
    if (onIcon) {
      onIcon.assignedElements().forEach((el) => {
        (el as HTMLElement).style.display = this._checked ? "inline" : "none";
      });
    }

    if (offIcon) {
      offIcon.assignedElements().forEach((el) => {
        (el as HTMLElement).style.display = this._checked ? "none" : "inline";
      });
    }
  }

  render() {
    const label = this.getAttribute("label");
    if (!label) {
      console.warn(
        "mui-switch Accessibility warning: Provide a 'label' to ensure the switch is described for assistive technologies."
      );
    }

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host { display: inline-block; }

        .switch {
          position: relative;
          display: inline-block;
          width: var(--switch-width);
          height: var(--switch-height);
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .switch input:focus-visible + .track {
          outline: var(--outline-thick);
        }

        .track {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--switch-track-background);
          transition: background-color var(--speed-200);
          border-radius: var(--switch-height);
        }

        .thumb {
          position: absolute;
          top: var(--switch-offset);
          left: var(--switch-offset);
          width: var(--switch-thumb-size);
          height: var(--switch-thumb-size);
          background-color: var(--switch-thumb-bg);
          transition: transform var(--speed-200);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        input:checked + .track {
          background-color: var(--switch-track-background-checked);
        }

        input:checked + .track .thumb {
          transform: translateX(calc(var(--switch-width) - var(--switch-thumb-size) - (var(--switch-offset) * 2)));
        }

        ::slotted([slot="on-icon"]),
        ::slotted([slot="off-icon"]) {
          width: 16px;
          height: 16px;
          fill: var(--switch-icon);
        }

        :host(.disabled) {
          cursor: not-allowed;
        }

        :host(.disabled) .switch {
          opacity: 0.4;
          pointer-events: none;
        }

      </style>
      <label class="switch">
        <input 
          type="checkbox"
          role="switch"
          aria-checked="${this._checked}"
          ${label ? `aria-label="${label}"` : ""}
        >
        <span class="track">
          <span class="thumb">
            <slot name="on-icon"></slot>
            <slot name="off-icon"></slot>
          </span>
        </span>
      </label>
    `;
  }
}

customElements.define("mui-switch", MuiSwitch);
