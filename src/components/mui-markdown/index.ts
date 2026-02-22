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
  let gridOpen = false;
  let boxOpen = false;
  const out: string[] = [];

  for (const line of lines) {
    const boxMatch = line.match(/^--\s*box\s*--$/i);
    if (boxMatch) {
      if (!boxOpen) {
        out.push("<div>");
        boxOpen = true;
      } else {
        out.push("</div>");
        boxOpen = false;
      }
      continue;
    }

    const ruleMatch = line.match(/^--\s*rule\s*--$/i);
    if (ruleMatch) {
      out.push("<mui-rule></mui-rule>");
      continue;
    }

    const spaceMatch = line.match(/^--\s*space-(\d{3})\s*--$/i);
    if (spaceMatch) {
      const token = spaceMatch[1];
      out.push(`<div style="height:var(--space-${token});"></div>`);
      continue;
    }

    const gridMatch = line.match(/^--\s*grid-col-([^-]+(?:-[^-]+)*)\s*--$/);
    if (gridMatch) {
      if (!gridOpen) {
        const columns = gridMatch[1].split("-").join(" ");
        out.push(
          `<div style="display:grid;grid-template-columns:${columns};gap:var(--space-300);align-items:start;">`,
        );
        gridOpen = true;
      } else {
        out.push("</div>");
        gridOpen = false;
      }
      continue;
    }

    out.push(line);
  }

  if (gridOpen) out.push("</div>");
  if (boxOpen) out.push("</div>");

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
    `<div class="md-code-block">
      <mui-button class="md-code-copy" size="x-small" variant="tertiary" data-copy-code>Copy</mui-button>
      <mui-code size="${codeSize}" scrollable>${escapeHtml(code)}</mui-code>
    </div>`;

  renderer.image = (href, title, text) => {
    const src = href ? escapeHtml(href) : "";
    const alt = text ? escapeHtml(text) : "";
    const titleAttr = title ? ` title=\"${escapeHtml(title)}\"` : "";
    return `<mui-image src=\"${src}\" alt=\"${alt}\"${titleAttr}></mui-image>`;
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
    return ["markdown", "body-size", "code-size"];
  }

  private observer?: MutationObserver;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    if (!this.hasAttribute("markdown")) {
      this.observer = new MutationObserver(() => this.render());
      this.observer.observe(this, { childList: true, subtree: true, characterData: true });
    }
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
  }

  attributeChangedCallback() {
    this.render();
  }

  private getBodySize() {
    const size = this.getAttribute("body-size");
    return size ? size : "small";
  }

  private getCodeSize() {
    const size = this.getAttribute("code-size");
    return size ? size : "x-small";
  }

  private getMarkdown() {
    const attr = this.getAttribute("markdown");
    if (attr !== null) return attr;
    return this.textContent ?? "";
  }

  private render() {
    if (!this.shadowRoot) return;

    const raw = this.getMarkdown();
    const prepared = preprocessMarkers(raw);

    const renderer = buildRenderer({
      bodySize: this.getBodySize(),
      codeSize: this.getCodeSize(),
    });
    const html = marked.parse(prepared, { renderer, gfm: true });

    this.shadowRoot.innerHTML = /*html*/ `
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
        .md-code-copy {
          position: absolute;
          top: var(--space-200);
          right: var(--space-200);
          z-index: 1;
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
      </style>
      <div class="md-root">${html}</div>
    `;

    const copyButtons = this.shadowRoot.querySelectorAll<HTMLElement>("[data-copy-code]");
    copyButtons.forEach((button) => {
      button.onclick = () => {
        const block = button.closest(".md-code-block");
        const code = block?.querySelector("mui-code");
        const text = code?.textContent ?? "";
        if (!text) return;
        navigator.clipboard?.writeText(text).catch(() => {
          // no-op
        });
      };
    });
  }
}

if (!customElements.get("mui-markdown")) {
  customElements.define("mui-markdown", MuiMarkdown);
}
