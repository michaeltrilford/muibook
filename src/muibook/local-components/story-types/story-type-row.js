class storyTypeRow extends HTMLElement {
  static get observedAttributes() {
    return ["type", "name", "options", "required", "description", "default"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { 
        display: block;
      }

      .visually-hidden {
        position: absolute;
        inset: 0;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
        border: 0;
        }

    `;

    const name = this.getAttribute("name") || "—";
    const required = this.hasAttribute("required");
    const type = this.getAttribute("type") || "undefined";
    const description = this.getAttribute("description") || "";

    const rawOptions = this.getAttribute("options") || "-";
    const optionList =
      rawOptions !== "-"
        ? rawOptions
            .split(",")
            .map((opt) => /*html*/ `<story-code-snippet>${opt.trim()}</story-code-snippet>`)
            .join(" ")
        : "-";

    const rawDefault = this.getAttribute("default") || "-";
    const defaultVal = rawDefault !== "-" ? /*html*/ `<story-code-snippet>${rawDefault}</story-code-snippet>` : "-";

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <mui-row-group>
        <mui-row columns="minmax(13rem, 0.5fr) minmax(10rem, 1fr) minmax(10rem, 2fr) minmax(5rem, 0.5fr)  2fr">
          <mui-cell class="card-slot">
            <mui-body size="x-small">
              <mui-h-stack space="var(--space-050)">
              ${name} ${
      required
        ? /*html*/ '<span aria-hidden="true" style="color: var(--red-500)">*</span><span class="visually-hidden">(required)</span>'
        : ""
    }
            </mui-h-stack></mui-body>
          </mui-cell>
          <mui-cell class="card-slot"><mui-body size="x-small">${defaultVal}<mui-body></mui-cell>
          <mui-cell class="card-slot"><mui-body size="x-small">${optionList}</mui-body></mui-cell>
          <mui-cell class="card-slot"><mui-body size="x-small">${type}</mui-body></mui-cell>
          <mui-cell class="card-slot"><mui-body size="x-small">${description}</mui-body></mui-cell>
        </mui-row>
      </mui-row-group>
    `;
  }
}

customElements.define("story-type-row", storyTypeRow);
