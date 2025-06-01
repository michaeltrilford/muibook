class pageCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "description", "orderedList", "unorderedList"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { display: block; }

      mui-card {
        border: var(--border-thick);
      }

    `;

    const title = this.getAttribute("title") || "";
    const description = this.hasAttribute("description")
      ? /*html*/ `<mui-body style="max-width: 86ch;">${this.getAttribute("description")}</mui-body>`
      : "";

    // Handle orderedList
    const orderedListAttr = this.getAttribute("orderedList");
    let orderedListItems = [];

    if (orderedListAttr) {
      try {
        orderedListItems = JSON.parse(orderedListAttr);
      } catch {
        orderedListItems = orderedListAttr.split(",").map((orderedList) => orderedList.trim());
      }
    }

    const orderedListContent = orderedListItems.length
      ? /*html*/ `
        <mui-list as="ol" style="max-width: 65ch; margin-top: var(--space-300);">
          ${orderedListItems
            .map(
              (orderedList) =>
                /*html*/ `<mui-list-item size="small" weight="medium" style="margin-bottom: var(--space-050)">${orderedList}</mui-list-item>`
            )
            .join("")}
        </mui-list>
      `
      : "";

    // Handle accessibility list
    const unorderedListAttr = this.getAttribute("unorderedList");
    let unorderedListItems = [];

    if (unorderedListAttr) {
      try {
        unorderedListItems = JSON.parse(unorderedListAttr);
      } catch {
        unorderedListItems = unorderedListAttr.split(",").map((unorderedList) => unorderedList.trim());
      }
    }

    const unorderedListContent = unorderedListItems.length
      ? /*html*/ `
        <mui-list as="ol" style="max-width: 65ch; margin-top: var(--space-300);">
          ${unorderedListItems
            .map(
              (unorderedList) =>
                `<mui-list-item size="small" weight="medium" style="margin-bottom: var(--space-050)">${unorderedList}</mui-list-item>`
            )
            .join("")}
        </mui-list>
      `
      : "";

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-card>
        ${
          this.hasAttribute("noheader")
            ? ""
            : `
          <mui-card-header>
            <mui-heading size="3" level="2">${title}</mui-heading>
            <mui-v-stack space="var(--space-100)">
              ${description}
              ${orderedListContent}
              ${unorderedListContent}
            </mui-v-stack>

          </mui-card-header>
        `
        }
        <mui-card-body>
          <slot name="body"></slot>
        </mui-card-body>
        <mui-card-footer><slot name="footer"></slot></mui-card-footer>
      </mui-card>
    `;
  }
}

customElements.define("page-card", pageCard);
