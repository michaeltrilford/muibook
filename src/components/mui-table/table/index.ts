class MuiTable extends HTMLElement {
  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private animationFrame?: number;
  private hoverRow: HTMLElement | null = null;

  static get observedAttributes() {
    return ["highlight", "highlight-row", "highlight-row-index"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "table");
    this.render();
    this.addEventListener("pointerover", this.handlePointerOver);
    this.addEventListener("pointerleave", this.handlePointerLeave);
    this.addEventListener("click", this.handleRowClick);
    this.syncHighlightTracking();
    this.scheduleHighlightUpdate();
  }

  disconnectedCallback() {
    this.removeEventListener("pointerover", this.handlePointerOver);
    this.removeEventListener("pointerleave", this.handlePointerLeave);
    this.removeEventListener("click", this.handleRowClick);
    this.disconnectLayoutObservers();
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  attributeChangedCallback() {
    this.syncHighlightTracking();
    this.scheduleHighlightUpdate();
  }

  private hasHighlightTarget() {
    return this.hasAttribute("highlight-row") || this.hasAttribute("highlight-row-index");
  }

  private get highlightModes() {
    return (this.getAttribute("highlight") || "")
      .split(/\s+/)
      .map((mode) => mode.trim().toLowerCase())
      .filter(Boolean);
  }

  private hasHighlightMode(mode: string) {
    return this.highlightModes.includes(mode);
  }

  private isHoverHighlightEnabled() {
    return this.hasHighlightMode("hover") && !this.hasHighlightMode("select");
  }

  private hasHighlightBehavior() {
    return this.hasHighlightTarget() || this.highlightModes.length > 0;
  }

  private getBodyRows() {
    return Array.from(this.querySelectorAll("mui-row-group:not([heading]) > mui-row")) as HTMLElement[];
  }

  private getEventRow(event: Event) {
    return event.composedPath().find((node) =>
      node instanceof HTMLElement && node.tagName.toLowerCase() === "mui-row"
    ) as HTMLElement | undefined;
  }

  private isBodyRow(row: HTMLElement) {
    return this.getBodyRows().includes(row);
  }

  private getHighlightRow() {
    if (this.hoverRow && this.isHoverHighlightEnabled()) {
      return this.hoverRow;
    }

    const rowId = this.getAttribute("highlight-row");
    if (rowId) {
      return this.querySelector(`mui-row[row-id="${CSS.escape(rowId)}"]`) as HTMLElement | null;
    }

    const indexValue = this.getAttribute("highlight-row-index");
    if (indexValue === null) return null;

    const index = Number.parseInt(indexValue, 10);
    if (!Number.isFinite(index) || index < 0) return null;

    const rows = this.getBodyRows();
    return rows[index] || null;
  }

  private handlePointerOver = (event: PointerEvent) => {
    if (!this.isHoverHighlightEnabled()) return;

    const row = this.getEventRow(event);
    if (!row || !this.isBodyRow(row)) return;

    if (this.hoverRow !== row) {
      this.hoverRow = row;
      this.scheduleHighlightUpdate();
    }
  };

  private handlePointerLeave = () => {
    if (!this.hoverRow) return;

    this.hoverRow = null;
    this.scheduleHighlightUpdate();
  };

  private handleRowClick = (event: MouseEvent) => {
    if (!this.hasHighlightMode("select")) return;

    const row = this.getEventRow(event);
    if (!row || !this.isBodyRow(row)) return;

    const rowId = row.getAttribute("row-id");
    const rowIndex = this.getBodyRows().indexOf(row);

    if (rowId) {
      this.setAttribute("highlight-row", rowId);
      this.removeAttribute("highlight-row-index");
    } else if (rowIndex >= 0) {
      this.setAttribute("highlight-row-index", String(rowIndex));
      this.removeAttribute("highlight-row");
    }

    this.dispatchEvent(
      new CustomEvent("row-highlight-change", {
        detail: { row, rowId, rowIndex, source: "select" },
        bubbles: true,
      })
    );
  };

  private observeLayout() {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.scheduleHighlightUpdate());
      this.resizeObserver.observe(this);
    }

    this.mutationObserver = new MutationObserver(() => this.scheduleHighlightUpdate());
    this.mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["row-id", "hidden", "style", "columns", "size"],
    });
  }

  private disconnectLayoutObservers() {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    this.resizeObserver = undefined;
    this.mutationObserver = undefined;
  }

  private syncHighlightTracking() {
    if (this.hasHighlightBehavior()) {
      this.observeLayout();
    } else {
      this.disconnectLayoutObservers();
    }
  }

  private scheduleHighlightUpdate() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(() => {
      this.animationFrame = undefined;
      this.updateHighlight();
    });
  }

  private updateHighlight() {
    const highlight = this.shadowRoot?.querySelector(".row-highlight") as HTMLElement | null;
    if (!highlight) return;

    const row = this.getHighlightRow();
    if (!row) {
      highlight.removeAttribute("data-visible");
      highlight.removeAttribute("data-last-row");
      return;
    }

    const rows = this.getBodyRows();
    const tableRect = this.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    const top = rowRect.top - tableRect.top;

    highlight.style.transform = `translate3d(0, ${top}px, 0)`;
    highlight.style.height = `${rowRect.height}px`;
    highlight.toggleAttribute("data-last-row", rows.at(-1) === row);
    highlight.setAttribute("data-visible", "");
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          text-indent: initial;
          width: 100%;
          margin: var(--space-000);
          position: relative;
        }
        :host([card-slot]) {
          --table-row-highlight-background: var(--surface-elevated-200);
        }
        :host([card-slot]) .row-highlight[data-last-row] {
          border-bottom-left-radius: var(--card-radius);
          border-bottom-right-radius: var(--card-radius);
        }
        .row-highlight {
          position: absolute;
          inset-block-start: 0;
          inset-inline: 0;
          height: 0;
          border-radius: var(--table-row-highlight-radius, var(--radius-000));
          background: var(--table-row-highlight-background, var(--surface-elevated-300));
          box-shadow: var(--table-row-highlight-shadow, none);
          opacity: 0;
          pointer-events: none;
          transform: translate3d(0, 0, 0);
          transition:
            transform var(--table-row-highlight-speed, var(--speed-200)) var(--table-row-highlight-easing, ease),
            height var(--table-row-highlight-speed, var(--speed-200)) var(--table-row-highlight-easing, ease),
            opacity var(--speed-100) ease;
          z-index: 0;
        }
        .row-highlight[data-visible] {
          opacity: 1;
        }
        slot {
          position: relative;
          z-index: 1;
        }
        ::slotted(mui-row-group) {
          position: relative;
          z-index: 1;
        }
      </style>
      <div class="row-highlight" aria-hidden="true"></div>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-table")) {
  customElements.define("mui-table", MuiTable);
}
