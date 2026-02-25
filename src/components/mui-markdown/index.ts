import { marked } from "marked";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const preprocessMarkers = (markdown: string) => {
  const lines = markdown.split("\n");
  const openStack: Array<{ type: string; closeTag: string }> = [];
  const out: string[] = [];

  const openBlock = (type: string, openTag: string, closeTag: string) => {
    out.push(openTag);
    openStack.push({ type, closeTag });
  };

  const closeLast = (type?: string) => {
    if (openStack.length === 0) return;
    if (!type) {
      const last = openStack.pop();
      if (last) out.push(last.closeTag);
      return;
    }
    for (let i = openStack.length - 1; i >= 0; i -= 1) {
      if (openStack[i].type === type) {
        const [match] = openStack.splice(i, 1);
        if (match) out.push(match.closeTag);
        return;
      }
    }
  };

  for (const line of lines) {
    const tableColumns = line.match(/^--\s*table-columns-([a-z0-9-]+)\s*--$/i);
    if (tableColumns) {
      out.push(`<div data-md-table-columns="${tableColumns[1].replace(/-/g, " ")}"></div>`);
      continue;
    }

    const vStackStart = line.match(/^--\s*vstack-space-(\d{3})-start\s*--$/i);
    if (vStackStart) {
      openBlock(
        "vstack",
        `<mui-v-stack space="var(--space-${vStackStart[1]})">`,
        "</mui-v-stack>",
      );
      continue;
    }

    if (line.match(/^--\s*vstack-end\s*--$/i)) {
      closeLast("vstack");
      continue;
    }

    const vStackToggle = line.match(/^--\s*vstack-space-(\d{3})\s*--$/i);
    if (vStackToggle) {
      const top = openStack[openStack.length - 1];
      if (top?.type === "vstack") closeLast("vstack");
      else {
        openBlock(
          "vstack",
          `<mui-v-stack space="var(--space-${vStackToggle[1]})">`,
          "</mui-v-stack>",
        );
      }
      continue;
    }

    const hStackStart = line.match(/^--\s*hstack-space-(\d{3})-start\s*--$/i);
    if (hStackStart) {
      openBlock(
        "hstack",
        `<mui-h-stack space="var(--space-${hStackStart[1]})">`,
        "</mui-h-stack>",
      );
      continue;
    }

    if (line.match(/^--\s*hstack-end\s*--$/i)) {
      closeLast("hstack");
      continue;
    }

    const hStackToggle = line.match(/^--\s*hstack-space-(\d{3})\s*--$/i);
    if (hStackToggle) {
      const top = openStack[openStack.length - 1];
      if (top?.type === "hstack") closeLast("hstack");
      else {
        openBlock(
          "hstack",
          `<mui-h-stack space="var(--space-${hStackToggle[1]})">`,
          "</mui-h-stack>",
        );
      }
      continue;
    }

    const responsiveStart = line.match(/^--\s*stack-space-(\d{3})-bp-(\d{3}|medium)-start\s*--$/i);
    if (responsiveStart) {
      const spaceToken = responsiveStart[1];
      const bpRaw = responsiveStart[2].toLowerCase();
      const bpValue = bpRaw === "medium" ? "768" : bpRaw;
      openBlock(
        "stack",
        `<div class="md-stack-responsive md-stack-responsive-${bpValue}" style="display:flex;gap:var(--space-${spaceToken});align-items:stretch;">`,
        "</div>",
      );
      continue;
    }

    if (line.match(/^--\s*stack-end\s*--$/i)) {
      closeLast("stack");
      continue;
    }

    const responsiveToggle = line.match(/^--\s*stack-space-(\d{3})-bp-(\d{3}|medium)\s*--$/i);
    if (responsiveToggle) {
      const top = openStack[openStack.length - 1];
      if (top?.type === "stack") closeLast("stack");
      else {
        const spaceToken = responsiveToggle[1];
        const bpRaw = responsiveToggle[2].toLowerCase();
        const bpValue = bpRaw === "medium" ? "768" : bpRaw;
        openBlock(
          "stack",
          `<div class="md-stack-responsive md-stack-responsive-${bpValue}" style="display:flex;gap:var(--space-${spaceToken});align-items:stretch;">`,
          "</div>",
        );
      }
      continue;
    }

    const boxStart = line.match(/^--\s*box-start\s*--$/i);
    if (boxStart) {
      openBlock("box", "<div>", "</div>");
      continue;
    }

    if (line.match(/^--\s*box-end\s*--$/i)) {
      closeLast("box");
      continue;
    }

    const boxToggle = line.match(/^--\s*box\s*--$/i);
    if (boxToggle) {
      const top = openStack[openStack.length - 1];
      if (top?.type === "box") closeLast("box");
      else openBlock("box", "<div>", "</div>");
      continue;
    }

    const ruleMatch = line.match(/^--\s*rule\s*--$/i);
    if (ruleMatch) {
      out.push("<mui-rule></mui-rule>");
      continue;
    }

    const spaceMatch = line.match(/^--\s*space-(\d{3})\s*--$/i);
    if (spaceMatch) {
      out.push(`<div style="height:var(--space-${spaceMatch[1]});"></div>`);
      continue;
    }

    if (line.match(/^--\s*grid-end\s*--$/i)) {
      closeLast("grid");
      continue;
    }

    const gridStart = line.match(/^--\s*grid-col-([^-]+(?:-[^-]+)*)-start\s*--$/i);
    if (gridStart) {
      const columns = gridStart[1].split("-").join(" ");
      openBlock(
        "grid",
        `<div style="display:grid;grid-template-columns:${columns};gap:var(--space-300);align-items:start;">`,
        "</div>",
      );
      continue;
    }

    const gridToggle = line.match(/^--\s*grid-col-([^-]+(?:-[^-]+)*)\s*--$/);
    if (gridToggle) {
      const top = openStack[openStack.length - 1];
      if (top?.type === "grid") closeLast("grid");
      else {
        const columns = gridToggle[1].split("-").join(" ");
        openBlock(
          "grid",
          `<div style="display:grid;grid-template-columns:${columns};gap:var(--space-300);align-items:start;">`,
          "</div>",
        );
      }
      continue;
    }

    out.push(line);
  }

  while (openStack.length > 0) {
    const last = openStack.pop();
    if (last) out.push(last.closeTag);
  }

  return out.join("\n");
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const buildRenderer = (options: { bodySize: string; codeSize: string }) => {
  const { bodySize, codeSize } = options;
  const renderer = new marked.Renderer();
  const headingCounts = new Map<string, number>();

  renderer.heading = (text, level) => {
    const sizes: Record<number, { size: string; level: string }> = {
      1: { size: "2", level: "2" },
      2: { size: "2", level: "2" },
      3: { size: "4", level: "4" },
      4: { size: "5", level: "5" },
      5: { size: "5", level: "5" },
      6: { size: "5", level: "5" },
    };
    const map = sizes[level] ?? sizes[4];
    const base = slugify(text);
    const nextCount = (headingCounts.get(base) ?? 0) + 1;
    headingCounts.set(base, nextCount);
    const id = nextCount > 1 ? `${base}-${nextCount}` : base;
    return `<mui-heading id="${id}" size="${map.size}" level="${map.level}">${text}</mui-heading>`;
  };

  renderer.paragraph = (text) =>
    `<mui-body size="${bodySize}" weight="regular" variant="default">${text}</mui-body>`;

  renderer.link = (href, title, text) => {
    const safeHref = href ? escapeHtml(href) : "";
    const titleAttr = title ? ` title=\"${escapeHtml(title)}\"` : "";
    return `<mui-link href=\"${safeHref}\"${titleAttr}>${text}</mui-link>`;
  };

  renderer.list = (body, ordered) =>
    `<mui-list size="${bodySize}" as="${ordered ? "ol" : "ul"}">${body}</mui-list>`;

  renderer.listitem = (text) =>
    `<mui-list-item size="${bodySize}">${text}</mui-list-item>`;

  renderer.hr = () => `<mui-rule></mui-rule>`;

  renderer.blockquote = (quote) => `<mui-quote>${quote}</mui-quote>`;

  renderer.codespan = (text) =>
    `<span class="md-inline-code">${escapeHtml(text)}</span>`;

  renderer.code = (code) =>
    `<div class="md-code-block" data-code-block>
      <div class="md-code-actions">
        <mui-button class="md-code-expand" size="x-small" variant="tertiary" data-toggle-code>Expand</mui-button>
        <mui-button class="md-code-copy" size="x-small" variant="tertiary" data-copy-code>Copy</mui-button>
      </div>
      <div class="md-code-wrap" data-code-wrap>
        <mui-code size="${codeSize}" scrollable>${escapeHtml(code)}</mui-code>
      </div>
    </div>`;

  renderer.image = (href, title, text) => {
    const src = href ? escapeHtml(href) : "";
    const alt = text ? escapeHtml(text) : "";
    const titleAttr = title ? ` title=\"${escapeHtml(title)}\"` : "";
    const dataTitle = title ? ` data-title=\"${escapeHtml(title)}\"` : "";
    return `<mui-image src=\"${src}\" alt=\"${alt}\"${titleAttr} data-md-image data-src=\"${src}\" data-alt=\"${alt}\"${dataTitle}></mui-image>`;
  };

  renderer.table = (header, body) =>
    `<mui-card class="md-table-card">
      <mui-card-body condensed>
        <div class="md-table-scroll">
          <mui-table class="md-table">
            <mui-row-group heading>${header}</mui-row-group>
            <mui-row-group>${body}</mui-row-group>
          </mui-table>
        </div>
      </mui-card-body>
    </mui-card>`;

  renderer.tablerow = (content) => {
    const count = (content.match(/<mui-cell\b/g) || []).length;
    const columns = count ? Array(count).fill("1fr").join(" ") : "1fr";
    return `<mui-row columns=\"${columns}\">${content}</mui-row>`;
  };

  renderer.tablecell = (content) => `<mui-cell>${content}</mui-cell>`;

  return renderer;
};

class MuiMarkdown extends HTMLElement {
  static get observedAttributes() {
    return ["markdown", "body-size", "code-size", "render-mode", "lightbox"];
  }

  private observer?: MutationObserver;
  private lightboxEl: HTMLDivElement | null = null;

  connectedCallback() {
    this.render();

    if (!this.hasAttribute("markdown")) {
      this.observer = new MutationObserver(() => this.render());
      this.observer.observe(this, { childList: true, subtree: true, characterData: true });
    }
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
    this.closeLightbox();
  }

  attributeChangedCallback() {
    this.render();
  }

  private getBodySize() {
    return this.getAttribute("body-size") || "small";
  }

  private getCodeSize() {
    return this.getAttribute("code-size") || "x-small";
  }

  private getMarkdown() {
    const attr = this.getAttribute("markdown");
    if (attr !== null) return attr;
    return this.textContent ?? "";
  }

  private getRenderRoot() {
    const mode = this.getAttribute("render-mode");
    if (mode === "light") return this;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    return this.shadowRoot;
  }

  private isLightboxEnabled() {
    return this.hasAttribute("lightbox");
  }

  private applyTableColumns(renderRoot: ParentNode) {
    const markers = Array.from(renderRoot.querySelectorAll<HTMLElement>("[data-md-table-columns]"));
    markers.forEach((marker) => {
      const columns = marker.getAttribute("data-md-table-columns") || "";
      let next: Element | null = marker.nextElementSibling;
      while (next && next.tagName.toLowerCase() !== "mui-card") {
        next = next.nextElementSibling;
      }

      if (next) {
        const rows = next.querySelectorAll("mui-row");
        rows.forEach((row) => row.setAttribute("columns", columns));
      }

      marker.remove();
    });
  }

  private openLightbox(src: string, alt: string, caption?: string) {
    this.closeLightbox();

    const overlay = document.createElement("div");
    overlay.className = "md-lightbox-overlay";
    overlay.innerHTML = `
      <div class="md-lightbox-content" role="dialog" aria-modal="true">
        <img src="${src}" alt="${alt || "Markdown image"}" />
        ${caption ? `<mui-body size="small" variant="optional">${caption}</mui-body>` : ""}
      </div>
    `;

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) this.closeLightbox();
    });

    document.body.appendChild(overlay);
    this.lightboxEl = overlay;
    this.dispatchEvent(
      new CustomEvent("mui-markdown-lightbox-change", {
        detail: { open: true },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private closeLightbox() {
    if (!this.lightboxEl) return;
    this.lightboxEl.remove();
    this.lightboxEl = null;
    this.dispatchEvent(
      new CustomEvent("mui-markdown-lightbox-change", {
        detail: { open: false },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private bindHandlers(renderRoot: ParentNode) {
    const copyButtons = renderRoot.querySelectorAll<HTMLElement>("[data-copy-code]");
    copyButtons.forEach((button) => {
      button.onclick = () => {
        const block = button.closest("[data-code-block]");
        const code = block?.querySelector("mui-code");
        const text = code?.textContent ?? "";
        if (!text) return;
        navigator.clipboard?.writeText(text).catch(() => {
          // no-op
        });
      };
    });

    const expandButtons = renderRoot.querySelectorAll<HTMLElement>("[data-toggle-code]");
    expandButtons.forEach((button) => {
      button.onclick = () => {
        const block = button.closest("[data-code-block]");
        if (!block) return;
        const expanded = block.toggleAttribute("data-expanded");
        button.textContent = expanded ? "Collapse" : "Expand";
      };
    });

    const images = renderRoot.querySelectorAll<HTMLElement>("[data-md-image]");
    images.forEach((image) => {
      image.onclick = () => {
        const src = image.getAttribute("data-src") || "";
        const alt = image.getAttribute("data-alt") || "";
        const title = image.getAttribute("data-title") || undefined;

        this.dispatchEvent(
          new CustomEvent("mui-markdown-image-click", {
            detail: { src, alt, title },
            bubbles: true,
            composed: true,
          }),
        );

        if (this.isLightboxEnabled() && src) {
          this.openLightbox(src, alt, title);
        }
      };
    });
  }

  private render() {
    const renderRoot = this.getRenderRoot();
    if (!renderRoot) return;

    const raw = this.getMarkdown();
    const prepared = preprocessMarkers(raw);

    const renderer = buildRenderer({
      bodySize: this.getBodySize(),
      codeSize: this.getCodeSize(),
    });
    const html = marked.parse(prepared, { renderer, gfm: true });

    const markup = /*html*/ `
      <style>
        :host { display: block; }
        .md-inline-code {
          display: inline-block;
          padding: var(--space-025) var(--space-050) var(--space-050);
          border-radius: var(--radius-100);
          background: var(--surface-recessed-200);
          font-size: var(--text-font-size-xs);
          line-height: 1;
        }
        .md-code-block {
          position: relative;
        }
        .md-code-actions {
          position: absolute;
          top: var(--space-200);
          right: var(--space-200);
          z-index: 1;
          display: flex;
          gap: var(--space-100);
        }
        .md-code-wrap {
          max-height: 24rem;
          overflow: auto;
          transition: max-height 180ms ease;
        }
        .md-code-block[data-expanded] .md-code-wrap {
          max-height: none;
        }
        .md-table-card {
          overflow-x: auto;
        }
        .md-table-scroll {
          overflow-x: auto;
        }
        .md-table {
          min-width: 888px;
        }
        .md-stack-responsive {
          flex-direction: column;
        }
        .md-stack-responsive > * {
          flex: 1;
        }
        @media (min-width: 768px) {
          .md-stack-responsive-768 {
            flex-direction: row;
          }
        }
        @media (min-width: 550px) {
          .md-stack-responsive-550 {
            flex-direction: row;
          }
        }
        .md-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(var(--space-300));
        }
        .md-lightbox-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-200);
          align-items: center;
          max-width: min(90vw, 120rem);
        }
        .md-lightbox-content img {
          max-width: min(90vw, 120rem);
          max-height: 75vh;
          object-fit: contain;
        }
      </style>
      <div class="md-root">${html}</div>
    `;

    if (renderRoot === this) {
      this.innerHTML = markup;
    } else {
      renderRoot.innerHTML = markup;
    }

    const queryRoot = renderRoot === this ? this : (renderRoot as ShadowRoot);
    this.applyTableColumns(queryRoot);
    this.bindHandlers(queryRoot);
  }
}

if (!customElements.get("mui-markdown")) {
  customElements.define("mui-markdown", MuiMarkdown);
}
