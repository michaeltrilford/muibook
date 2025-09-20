class DesignChangelog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.loadChangelog();
  }

  async loadChangelog() {
    const res = await fetch("/CHANGELOG.md");
    const markdown = await res.text();

    // Simple local Markdown parser
    const html = this.parseMarkdown(markdown);

    const styles = /*css*/ `
      :host {
        display: block;
        font-family: var(--font-body);
        line-height: var(--line-height-100);
      }

      mui-card {
        border: var(--border-thick);
      }

      mui-card-body {
        padding: var(--space-600);
        padding-top: var(--space-500);
      }

      /* Headings */
      mui-heading[size="4"] {
        margin-bottom: var(--space-400);
      }

      /* Lists */
      mui-list {
        margin: var(--space-000) 0 var(--space-500);
      }

      mui-list:last-child{
        margin-bottom: var(--space-000);
      }

      li.release-item {
        padding-left: 0.25em;
        margin: 0.25em 0;
        border-left: 4px solid transparent;
      }

      /* Links and bold */
      a {
        color: var(--primary);
        text-decoration: underline;
      }
      strong {
        font-weight: var(--font-weight-bold);
      }

      .header {
        margin-bottom: var(--space-600);
        border-bottom: var(--border-thin);
        padding-bottom: var(--space-500);
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
    let currentGroup = [];

    const flushGroup = () => {
      if (currentGroup.length) {
        // Wrap the group content in <mui-card><mui-card-body>...</mui-card-body></mui-card>
        result.push(`<mui-card><mui-card-body condensed>${currentGroup.join("\n")}</mui-card-body></mui-card>`);
        currentGroup = [];
      }
    };

    for (let line of lines) {
      const trimmed = line.trim();

      if (trimmed === "## Header [Start]") {
        inHeader = true;
        headerLines = [];
        continue; // skip marker line
      }

      if (trimmed === "## Header [End]") {
        inHeader = false;
        // Wrap header content in a div.header
        const headerContent = headerLines.join("\n");
        currentGroup.push(
          `<mui-h-stack alignX="space-between" alignY="center" class="header">${headerContent}</mui-h-stack>`
        );
        continue; // skip marker line
      }

      if (trimmed === "---") {
        flushGroup();
        continue;
      }

      if (inHeader) {
        headerLines.push(line); // collect header content
      } else {
        currentGroup.push(line); // normal content
      }
    }

    flushGroup(); // flush any remaining content

    let html = result.join("\n");

    // Final parse: headings, bold, links, lists
    html = html
      .replace(/^### (.*)$/gm, "<mui-heading level='2' size='4'>$1</mui-heading>")
      .replace(/^## (.*)$/gm, "<mui-heading level='3' size='3'>$1</mui-heading>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<mui-link href="$2">$1</mui-link>')
      .replace(/^(?:- .*(?:\n|$))+/gm, (match) => {
        const items = match
          .trim()
          .split("\n")
          .map((l) => l.replace(/^- /, "<mui-list-item>") + "</mui-list-item>")
          .join("");
        return `<mui-list as="ul">${items}</mui-list>`;
      });

    return html;
  }
}

if (!customElements.get("design-changelog")) {
  customElements.define("design-changelog", DesignChangelog);
}
