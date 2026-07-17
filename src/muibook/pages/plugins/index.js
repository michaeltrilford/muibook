import RedactdCanvasImage from "../../images/pages/redactd.png";
import DesignLoopImage from "../../images/redactd/design-loop.png";

const REDACTD_CANVAS_REPO = "https://github.com/michaeltrilford/RedactdCanvas";
const REDACTD_DESIGN_LOOP_REPO = "https://github.com/michaeltrilford/RedactdDesignLoop";
const MUIBOOK_KNOWLEDGE_REPO = "https://github.com/michaeltrilford/muibook-knowledge";
const MUIBOOK_CANVAS_SKILL =
  "https://github.com/michaeltrilford/RedactdCanvas/blob/main/plugins/skills/redactd-canvas-muibook/SKILL.md";
const MUIBOOK_CANVAS_SKILL_RAW =
  "https://raw.githubusercontent.com/michaeltrilford/RedactdCanvas/main/plugins/skills/redactd-canvas-muibook/SKILL.md";
const MUIBOOK_COMPONENT_SKILL =
  "https://github.com/michaeltrilford/muibook/blob/main/skills/muibook-components/SKILL.md";
const MUIBOOK_COMPONENT_SKILL_RAW =
  "https://raw.githubusercontent.com/michaeltrilford/muibook/main/skills/muibook-components/SKILL.md";
const MUIBOOK_CANVAS_SKILL_INSTALL =
  "https://github.com/michaeltrilford/RedactdCanvas/tree/main/plugins/skills/redactd-canvas-muibook";
const MUIBOOK_COMPONENT_SKILL_INSTALL =
  "https://github.com/michaeltrilford/muibook/tree/main/skills/muibook-components";

class PluginsPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host {
        display: block;
      }

      .content-container {
        container-name: plugins-page;
        container-type: inline-size;
        display: grid;
        gap: var(--space-800);
      }

      .tool-grid::part(display) {
        grid-template-columns: 1fr;
      }

      .tool-card,
      .tool-card mui-card {
        height: 100%;
      }

      .tool-card mui-card-body {
        display: block;
        height: 100%;
        box-sizing: border-box;
      }

      .tool-image {
        border: var(--app-projects-image-border, var(--border-thin));
        border-radius: var(--radius-300);
        overflow: hidden;
      }

      .tool-image img {
        aspect-ratio: 16 / 9;
        object-fit: cover;
      }

      .skill-card {
        --card-background: var(--surface-elevated-100);
      }

      @container plugins-page (min-width: 760px) {
        .tool-grid::part(display) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Plugins & MCP"
        description="Use the Muibook knowledge MCP to ground an agent in the design system, then add focused plugins or skills for canvas creation and structured design review. These are the tools Muibook currently recommends."
        x-large
      >
        <div class="content-container resource-page">
          <mui-v-stack space="var(--space-400)">
            <mui-heading level="2" size="3">Recommended plugins</mui-heading>
            <mui-grid class="tool-grid" space="var(--space-600)">
              <div class="tool-card">
                <mui-card>
                  <mui-card-body>
                    <mui-v-stack space="var(--space-600)">
                      <mui-image class="tool-image">
                        <img slot="image" src="${RedactdCanvasImage}" alt="Redactd Canvas interface for composing Muibook layouts" />
                      </mui-image>
                      <mui-v-stack space="var(--space-200)">
                        <mui-badge variant="neutral">Plugin</mui-badge>
                        <mui-heading level="3" size="4">Redactd Canvas</mui-heading>
                        <mui-body size="medium">
                          Prompt complete Muibook layouts from Codex and paste them directly into an active Redactd canvas. The full plugin also includes an API fallback for headless creation.
                        </mui-body>
                      </mui-v-stack>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${REDACTD_CANVAS_REPO}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">View plugin on GitHub</mui-link>
                        <mui-link href="https://redactd.xyz" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">Open Redactd</mui-link>
                      </mui-h-stack>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
              </div>

              <div class="tool-card">
                <mui-card>
                  <mui-card-body>
                    <mui-v-stack space="var(--space-600)">
                      <mui-image class="tool-image">
                        <img slot="image" src="${DesignLoopImage}" alt="Redactd Design Loop showing interface critique and iteration results" />
                      </mui-image>
                      <mui-v-stack space="var(--space-200)">
                        <mui-badge variant="neutral">Plugin</mui-badge>
                        <mui-heading level="3" size="4">Redactd Design Loop</mui-heading>
                        <mui-body size="medium">
                          Review a Redactd interface through structured critique, persona feedback, task outcomes, and iteration passes. Viewing the Design Loop documentation requires a Redactd account and sign-in.
                        </mui-body>
                      </mui-v-stack>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${REDACTD_DESIGN_LOOP_REPO}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">View plugin on GitHub</mui-link>
                        <mui-link href="https://redactd.xyz/docs#design-loop" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">View docs</mui-link>
                      </mui-h-stack>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
              </div>
            </mui-grid>
          </mui-v-stack>

          <mui-v-stack space="var(--space-400)">
            <mui-heading level="2" size="3">Skills &amp; Knowledge Base</mui-heading>
            <mui-grid class="tool-grid" space="var(--space-600)">
              <div class="tool-card">
                <mui-card class="skill-card">
                  <mui-card-body>
                    <mui-v-stack space="var(--space-600)">
                      <mui-v-stack space="var(--space-200)">
                        <mui-badge variant="attention">Standalone skill</mui-badge>
                        <mui-heading level="3" size="4">Redactd Canvas for Muibook</mui-heading>
                        <mui-body size="medium">
                          Pair this skill with Muibook Components for a lightweight Codex workflow that generates and pastes layouts through an open Redactd canvas—without installing the Redactd Canvas plugin, API backend, or Muibook Knowledge MCP.
                        </mui-body>
                      </mui-v-stack>
                      <mui-code size="x-small" wrap>Install this skill:
${MUIBOOK_CANVAS_SKILL_INSTALL}</mui-code>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${MUIBOOK_CANVAS_SKILL}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">View skill on GitHub</mui-link>
                        <mui-link href="${MUIBOOK_CANVAS_SKILL_RAW}" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">Open SKILL.md</mui-link>
                      </mui-h-stack>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
              </div>

              <div class="tool-card">
                <mui-card class="skill-card">
                  <mui-card-body>
                    <mui-v-stack space="var(--space-600)">
                      <mui-v-stack space="var(--space-200)">
                        <mui-badge variant="attention">Standalone skill</mui-badge>
                        <mui-heading level="3" size="4">Muibook Components</mui-heading>
                        <mui-body size="medium">
                          Give Codex the lightweight, single-file component knowledge used alongside Redactd Canvas for Muibook. The full Redactd Canvas plugin and Muibook Knowledge MCP remain optional paths for richer automation and guidance.
                        </mui-body>
                      </mui-v-stack>
                      <mui-code size="x-small" wrap>Install this skill:
${MUIBOOK_COMPONENT_SKILL_INSTALL}</mui-code>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${MUIBOOK_COMPONENT_SKILL}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">View skill on GitHub</mui-link>
                        <mui-link href="${MUIBOOK_COMPONENT_SKILL_RAW}" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">Open SKILL.md</mui-link>
                      </mui-h-stack>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
              </div>

              <div class="tool-card">
                <mui-card>
                  <mui-card-body>
                    <mui-v-stack space="var(--space-600)">
                      <mui-v-stack space="var(--space-200)">
                        <mui-badge variant="positive">MCP</mui-badge>
                        <mui-heading level="3" size="4">Muibook Knowledge MCP</mui-heading>
                        <mui-body size="medium">
                          Give Codex and other compatible agents on-demand access to Muibook component APIs, design rules, dynamic attributes, keywords, and composition examples.
                        </mui-body>
                      </mui-v-stack>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${MUIBOOK_KNOWLEDGE_REPO}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">View MCP on GitHub</mui-link>
                        <mui-link href="/knowledge-overview" variant="secondary" size="small">Read guide</mui-link>
                      </mui-h-stack>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
              </div>
            </mui-grid>

          </mui-v-stack>
        </div>
      </story-template>
    `;
  }
}

customElements.define("plugins-page", PluginsPage);
