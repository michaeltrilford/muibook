import "../mui-button";

class MuiFileUpload extends HTMLElement {
  acceptedFileTypes: string;
  currentFileName: string;
  selectedFileName: string | null;

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

    this.render();
    this.cacheElements();
    this.attachEvents();
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
          padding-left: 16px;
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
            width: 115px;
          }
        }
        @media (min-width: 440px) {
          .label {
            width: 175px;
          }
        }
        @media (min-width: 600px) {
          .label {
            width: 220px;
          }
        }

        mui-button {
          margin-right: 0.1rem;
        }

        mui-button::part(height) {
          height: calc(4.2rem - 0.2rem);
          padding: var(--space-400);
          padding-top: var(--space-000);
          padding-bottom: var(--space-000);

        }

        mui-button::part(border-radius) {
          border-radius: calc(var(--radius-100) - 2px);
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

  attachEvents() {
    this.wrapper.addEventListener("click", () => {
      this.input.click();
    });

    this.input.addEventListener("change", this.handleFileChange.bind(this));
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
