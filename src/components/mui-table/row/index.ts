class MuiRow extends HTMLElement {
  private tableObserver?: MutationObserver;

  static get observedAttributes() {
    return ["columns", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "row");
    this.syncContextAttributes();
    this.syncActionColumnState();
    this.observeTableChanges();
    this.render();
  }

  disconnectedCallback() {
    this.tableObserver?.disconnect();
    this.tableObserver = undefined;
  }

  attributeChangedCallback() {
    this.render();
  }

  private syncContextAttributes() {
    const inCard = Boolean(this.closest("mui-card"));
    this.toggleAttribute("in-card", inCard);
  }

  private observeTableChanges() {
    const table = this.closest("mui-table");
    if (!table) return;

    this.tableObserver?.disconnect();
    this.tableObserver = new MutationObserver(() => {
      this.syncActionColumnState();
    });

    this.tableObserver.observe(table, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["action"],
      characterData: true,
    });
  }

  private clearActionPlaceholderStyles(cell: Element) {
    const htmlCell = cell as HTMLElement;
    htmlCell.style.removeProperty("width");
    htmlCell.style.removeProperty("height");
    htmlCell.style.removeProperty("display");
    htmlCell.style.removeProperty("align-items");
    htmlCell.style.removeProperty("justify-content");
  }

  private syncActionColumnState() {
    const table = this.closest("mui-table");
    if (!table) return;

    const hasActionColumn = Boolean(table.querySelector("mui-cell[action]"));
    this.toggleAttribute("has-action-column", hasActionColumn);

    const directCells = Array.from(this.children).filter(
      (child) => child.tagName.toLowerCase() === "mui-cell",
    ) as HTMLElement[];
    const lastCell = directCells[directCells.length - 1];

    if (!lastCell) return;

    const rowHasExplicitAction = directCells.some((cell) => cell.hasAttribute("action"));

    if (!hasActionColumn || rowHasExplicitAction) {
      this.clearActionPlaceholderStyles(lastCell);
      return;
    }

    const hasElementChildren = Array.from(lastCell.children).some((child) => child.nodeType === Node.ELEMENT_NODE);
    const text = (lastCell.textContent || "").trim();
    const isPlaceholder = !hasElementChildren && text.length === 0;

    if (!isPlaceholder) {
      this.clearActionPlaceholderStyles(lastCell);
      return;
    }

    // Reserve action-column space for empty last cells (e.g. heading rows)
    // when body rows carry action controls.
    lastCell.style.width = "var(--row-action-size)";
    lastCell.style.height = "var(--row-action-size)";
    lastCell.style.display = "inline-flex";
    lastCell.style.alignItems = "center";
    lastCell.style.justifyContent = "center";
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      :host {
        display: grid;
        grid-template-columns: ${this.getAttribute("columns")};
        grid-gap: var(--space-500);
        margin-bottom: var(--space-000);
        padding: var(--space-300) var(--space-000);
        border-top: var(--border-thin);
        align-items: center;
        min-height: var(--row-min-height, var(--row-action-size, var(--row-action-xs)));
      }
      :host(:not([size])) {
        --row-action-size: var(--row-action-m);
        --row-cell-font-size: var(--text-font-size-m);
        --row-cell-line-height: var(--text-line-height-m);
        --row-min-height: var(--row-action-m);
      }
      :host([size="xx-small"]) {
        --row-action-size: var(--row-action-xxs);
        --row-cell-font-size: var(--text-font-size-xs);
        --row-cell-line-height: var(--text-line-height-xs);
        --row-min-height: var(--row-action-xxs);
      }
      :host([size="x-small"]) {
        --row-action-size: var(--row-action-xs);
        --row-cell-font-size: var(--text-font-size-xs);
        --row-cell-line-height: var(--text-line-height-xs);
        --row-min-height: var(--row-action-xs);
      }
      :host([size="small"]) {
        --row-action-size: var(--row-action-s);
        --row-cell-font-size: var(--text-font-size-s);
        --row-cell-line-height: var(--text-line-height-s);
        --row-min-height: var(--row-action-s);
      }
      :host([size="medium"]) {
        --row-action-size: var(--row-action-m);
        --row-cell-font-size: var(--text-font-size-m);
        --row-cell-line-height: var(--text-line-height-m);
        --row-min-height: var(--row-action-m);
      }
      :host([size="large"]) {
        --row-action-size: var(--row-action-l);
        --row-cell-font-size: var(--text-font-size-l);
        --row-cell-line-height: var(--text-line-height-l);
        --row-min-height: var(--row-action-l);
      }
      :host([in-card]) {
        border-top-color: color-mix(in srgb, var(--border-color) 50%, transparent);
      }
    </style>
    <slot></slot>
    `;
  }
}

if (!customElements.get("mui-row")) {
  customElements.define("mui-row", MuiRow);
}
