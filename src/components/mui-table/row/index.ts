class MuiRow extends HTMLElement {
  private tableObserver?: MutationObserver;

  static get observedAttributes() {
    return ["columns", "size", "aligny", "space"];
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
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["action"],
    });
  }

  private getTableRows(table: HTMLElement) {
    return Array.from(table.querySelectorAll("mui-row")).filter(
      (row): row is HTMLElement => row.closest("mui-table") === table,
    );
  }

  private getOwnCells() {
    return Array.from(this.querySelectorAll("mui-cell")).filter(
      (cell): cell is HTMLElement => cell.closest("mui-row") === this,
    );
  }

  private hasActionCellInBody(table: HTMLElement) {
    const rows = this.getTableRows(table);
    return rows.some((row) => {
      const isHeadingRow = Boolean(row.closest("mui-row-group[heading]"));
      if (isHeadingRow) return false;
      return Array.from(row.querySelectorAll("mui-cell")).some(
        (cell) => cell.closest("mui-row") === row && cell.hasAttribute("action"),
      );
    });
  }

  private clearActionPlaceholderStyles(cell: HTMLElement) {
    cell.removeAttribute("data-action-placeholder");
    cell.style.removeProperty("width");
    cell.style.removeProperty("height");
    cell.style.removeProperty("display");
    cell.style.removeProperty("align-items");
    cell.style.removeProperty("justify-content");
  }

  private syncActionColumnState() {
    const isHeadingRow = Boolean(this.closest("mui-row-group[heading]"));
    const cells = this.getOwnCells();
    const lastCell = cells[cells.length - 1];
    if (!lastCell) return;

    if (!isHeadingRow) {
      this.clearActionPlaceholderStyles(lastCell);
      return;
    }

    const table = this.closest("mui-table");
    const hasActionInBody = Boolean(table instanceof HTMLElement && this.hasActionCellInBody(table));
    const isPlaceholderCell = lastCell.children.length === 0 && lastCell.textContent?.trim() === "";

    if (!hasActionInBody || !isPlaceholderCell) {
      this.clearActionPlaceholderStyles(lastCell);
      return;
    }

    lastCell.setAttribute("data-action-placeholder", "");
    lastCell.style.width = "var(--row-action-size)";
    lastCell.style.height = "var(--row-action-size)";
    lastCell.style.display = "inline-flex";
    lastCell.style.alignItems = "center";
    lastCell.style.justifyContent = "center";
  }

  private render() {
    if (!this.shadowRoot) return;
    const alignY = this.getAttribute("align-y") || this.getAttribute("aligny") || "center";
    const space = this.getAttribute("space") || "var(--space-500)";
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      :host {
        display: grid;
        grid-template-columns: ${this.getAttribute("columns")};
        grid-gap: ${space};
        margin-bottom: var(--space-000);
        padding: var(--space-300) var(--space-400);
        border-top: var(--border-thin);
        align-items: ${alignY};
        min-height: var(--row-min-height, var(--row-action-size, var(--row-action-xs)));
      }
      @media (min-width: 768px) {
        :host {
          padding: var(--space-300) var(--space-600);
        }
      }
      :host([in-card]),
      :host([card-slot]) {
        border-top-color: color-mix(in srgb, var(--border-color) 50%, transparent);
        padding-inline: var(--card-layout-inline-space, var(--space-500));
      }
      @media (min-width: 768px) {
        :host([in-card]),
        :host([card-slot]) {
          padding-inline: var(--card-layout-inline-space, var(--space-600));
        }
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
