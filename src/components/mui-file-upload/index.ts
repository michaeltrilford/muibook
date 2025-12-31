import "../mui-button";

class MuiFileUpload extends HTMLElement {
  acceptedFileTypes: string;
  currentFileName: string;
  selectedFileName: string | null;

  private _wrapperClickHandler?: () => void;
  private _inputChangeHandler?: (e: Event) => void;

  shadowRoot!: ShadowRoot;
  wrapper!: HTMLDivElement;
  label!: HTMLSpanElement;
  button!: HTMLElement; // Adjust if using a custom MUI button type
  input!: HTMLInputElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.acceptedFileTypes = this.getAttribute("acceptedFileTypes") || "";
    this.currentFileName = this.getAttribute("currentFileName") || "";

    this.selectedFileName = null;
  }

  connectedCallback() {
    this.render();
    this.cacheElements();
    this.attachEvents();
  }

  disconnectedCallback() {
    this.cleanupListeners();
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        .wrapper {
          transition: background-color var(--speed-300) ease;
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
          padding-left: var(--space-400);
          display: flex;
          width: 100%;
          line-height: var(--text-line-height-s);
          box-sizing: border-box;
          font-size: var(--text-font-size-s);
          border-radius: var(--radius-100);
          border: var(--border-thin);
          border-style: dashed;
          border-color: var(--form-default-border-color);
          color: var(--text-color);
          background: var(--input-background);
          min-height: 4.4rem;
        }
        .wrapper:hover {
          border-color: var(--form-default-border-color-hover);
        }
        .label {
          width: 90px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (min-width: 340px) {
          .label {
            width: 11.5rem;
          }
        }
        @media (min-width: 440px) {
          .label {
            width: 17.5rem;
          }
        }
        @media (min-width: 600px) {
          .label {
            width: 22rem;
          }
        }

        mui-button {
          margin-right: 0.1rem;
        }

        mui-button::part(height) {
          height: calc(var(--space-600) + var(--space-050));
          padding: var(--space-400);
          padding-top: var(--space-000);
          padding-bottom: var(--space-000);

        }

        mui-button::part(border-radius) {
          border-radius: calc(var(--radius-100) - var(--space-025));
        }

        input[type="file"] {
          display: none;
        }
      </style>
      <div class="wrapper">
        <span class="label">${this.currentFileName}</span>
        <mui-button variant="tertiary">Browse</mui-button>
        <input type="file" accept="${this.acceptedFileTypes}" />
      </div>
    `;
  }

  cacheElements() {
    if (!this.shadowRoot) return;
    this.wrapper = this.shadowRoot.querySelector(".wrapper") as HTMLDivElement;
    this.label = this.shadowRoot.querySelector(".label") as HTMLSpanElement;
    this.button = this.shadowRoot.querySelector(".button") as HTMLElement;
    this.input = this.shadowRoot.querySelector('input[type="file"]') as HTMLInputElement;
  }

  cleanupListeners() {
    if (this.wrapper && this._wrapperClickHandler) {
      this.wrapper.removeEventListener("click", this._wrapperClickHandler);
    }
    if (this.input && this._inputChangeHandler) {
      this.input.removeEventListener("change", this._inputChangeHandler);
    }
  }

  attachEvents() {
    this._wrapperClickHandler = () => {
      this.input.click();
    };

    this._inputChangeHandler = this.handleFileChange.bind(this);

    this.wrapper.addEventListener("click", this._wrapperClickHandler);
    this.input.addEventListener("change", this._inputChangeHandler);
  }

  handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      this.selectedFileName = file.name;
      this.label.textContent = file.name;
      this.dispatchEvent(
        new CustomEvent("file-upload", {
          detail: { file },
          bubbles: true,
          composed: true,
        })
      );
    }
  }
}

if (!customElements.get("mui-file-upload")) {
  customElements.define("mui-file-upload", MuiFileUpload);
}
