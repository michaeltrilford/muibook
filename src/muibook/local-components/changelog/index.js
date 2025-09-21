import "../../images/npm-mark";

class DesignChangelog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.loadChangelog();
  }

  async loadChangelog() {
    const res = await fetch("/CHANGELOG.md");
    const markdown = await res.text();
    const html = this.parseMarkdown(markdown);

    const styles = /*css*/ `
      :host {
        display: block;
        font-family: var(--font-body);
        line-height: var(--line-height-100);
      }
      .header {
        margin-bottom: var(--space-400);
      }

      .section {
        padding: var(--space-500) var(--space-500) var(--space-500) var(--space-500);
        background: var(--surface-elevated-200);
        border-radius: var(--radius-100);
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-100);
        align-items: start;
      }

      .section:not(:last-child) {
        margin-bottom: var(--space-025);
      }

      mui-list { margin-top: var(--space-025); }
      mui-card { border: var(--border-thick); }
      mui-card-body { padding-top: var(--space-400);}

      @media (min-width: 768px) {
        .section {
          grid-template-columns: 12rem 1fr;
          gap: var(--space-800);
        }
      }

    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <mui-v-stack space="var(--space-600)">${html}</mui-v-stack>
    `;
  }

  parseMarkdown(md) {
    const lines = md.split("\n");
    const result = [];
    let inHeader = false;
    let headerLines = [];
    let cardContent = [];
    let currentSection = null;
    let sectionContent = [];

    const flushSection = () => {
      if (currentSection) {
        cardContent.push(`
        <div class="section">
          <mui-heading level="3" size="5">${currentSection}</mui-heading>
          ${sectionContent.join("\n")}
        </div>
      `);
        currentSection = null;
        sectionContent = [];
      }
    };

    const flushCard = () => {
      if (cardContent.length) {
        result.push(`<mui-card><mui-card-body>${cardContent.join("\n")}</mui-card-body></mui-card>`);
        cardContent = [];
      }
    };

    for (let line of lines) {
      const trimmed = line.trim();

      if (trimmed === "## Header [Start]") {
        inHeader = true;
        headerLines = [];
        continue;
      }

      if (trimmed === "## Header [End]") {
        inHeader = false;
        const headerContent = headerLines.join("\n");
        cardContent.push(
          `<mui-h-stack alignX="space-between" alignY="center" class="header">${headerContent}</mui-h-stack>`
        );
        continue;
      }

      if (trimmed === "---") {
        flushSection();
        flushCard();
        continue;
      }

      if (inHeader) {
        headerLines.push(line);
        continue;
      }

      // Section heading (### Added / Changed / Fixed)
      const sectionMatch = trimmed.match(/^### (.*)$/);
      if (sectionMatch) {
        flushSection(); // finish previous
        currentSection = sectionMatch[1]; // e.g. "Added"
        continue;
      }

      if (currentSection) {
        sectionContent.push(line);
      } else {
        cardContent.push(line);
      }
    }

    flushSection();
    flushCard();

    let html = result.join("\n");

    // Replace ### headings inside sections (already added with <mui-heading>)
    html = html.replace(/^## (.*)$/gm, "<mui-heading level='2' size='3'>$1</mui-heading>");

    // Replace links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      `
    <mui-responsive breakpoint="400">
      <mui-link slot="showAbove" variant="tertiary" href="$2"><npm-mark slot="after"></npm-mark>$1</mui-link>
      <mui-link slot="showBelow" variant="tertiary" href="$2"><npm-mark slot="after"></npm-mark></mui-link>
    </mui-responsive>
  `
    );

    // Replace list items
    html = html.replace(/^(?:- .*(?:\n|$))+/gm, (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((l) => l.replace(/^- /, "<mui-list-item size='small'>") + "</mui-list-item>")
        .join("");
      return `<mui-list as="ul">${items}</mui-list>`;
    });

    return html;
  }
}

if (!customElements.get("design-changelog")) {
  customElements.define("design-changelog", DesignChangelog);
}
