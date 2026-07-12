import { VSCODE_ICONS_BASE_URL, fileIconMap, type FileIconName } from "./icons";

type FileIconSize = "x-small" | "small" | "medium" | "large";

const iconAliases: Record<string, FileIconName> = {
  javascript: "js",
  md: "markdown",
  react: "reactjs",
  ts: "typescript",
};

const sizeMap: Record<FileIconSize, string> = {
  "x-small": "var(--space-400)",
  small: "calc(var(--space-500) - var(--stroke-size-300))",
  medium: "var(--space-500)",
  large: "calc(var(--space-500) + var(--stroke-size-400))",
};

class MuiFileIcon extends HTMLElement {
  static get observedAttributes() {
    return ["icon", "type", "size", "label", "decorative"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
  }

  private normalizeIconName(value: string | null): FileIconName | null {
    const normalized = (value || "")
      .trim()
      .toLowerCase()
      .replace(/^file_type_/, "")
      .replace(/\.svg$/, "");

    if (!normalized) return null;
    if (normalized in iconAliases) return iconAliases[normalized];
    if (normalized in fileIconMap) return normalized as FileIconName;

    return null;
  }

  private getIconName() {
    return this.normalizeIconName(this.getAttribute("icon")) || this.normalizeIconName(this.getAttribute("type"));
  }

  private getSize() {
    const size = this.getAttribute("size") as FileIconSize | null;
    return size && size in sizeMap ? size : "x-small";
  }

  private escapeAttribute(value: string) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  private render() {
    if (!this.shadowRoot) return;

    const iconName = this.getIconName();
    const filename = iconName ? fileIconMap[iconName] : "default_file.svg";
    const src = `${VSCODE_ICONS_BASE_URL}/${filename}`;
    const label = this.getAttribute("label") || (iconName ? `${iconName} file icon` : "File icon");
    const isDecorative = this.hasAttribute("decorative");
    const size = this.getSize();

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: ${sizeMap[size]};
          height: ${sizeMap[size]};
          flex: none;
          line-height: 0;
          vertical-align: middle;
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          border: 0;
          filter: var(--file-icon-filter);
        }
      </style>

      <img
        part="image"
        src="${this.escapeAttribute(src)}"
        alt="${isDecorative ? "" : this.escapeAttribute(label)}"
        ${isDecorative ? 'aria-hidden="true"' : ""}
        loading="lazy"
        decoding="async"
      />
    `;
  }
}

if (!customElements.get("mui-file-icon")) {
  customElements.define("mui-file-icon", MuiFileIcon);
}

export { VSCODE_ICONS_BASE_URL, VSCODE_ICONS_VERSION, fileIconMap, fileIconNames } from "./icons";
export type { FileIconName } from "./icons";
