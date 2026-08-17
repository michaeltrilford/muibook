import RedactdCanvasImage from "../../images/pages/redactd.png";
import DesignLoopImage from "../../images/redactd/design-loop.png";

const REDACTD_CANVAS_REPO = "https://github.com/michaeltrilford/RedactdCanvas";
const REDACTD_DESIGN_LOOP_REPO = "https://github.com/michaeltrilford/RedactdDesignLoop";
const MUIBOOK_KNOWLEDGE_REPO = "https://github.com/michaeltrilford/muibook-knowledge";
const MUIBOOK_CANVAS_SKILL =
  "https://github.com/michaeltrilford/muibook/blob/main/skills/redactd-canvas-muibook/SKILL.md";
const MUIBOOK_CANVAS_SKILL_RAW =
  "https://raw.githubusercontent.com/michaeltrilford/muibook/main/skills/redactd-canvas-muibook/SKILL.md";
const MUIBOOK_COMPONENT_SKILL =
  "https://github.com/michaeltrilford/muibook/blob/main/skills/muibook-components/SKILL.md";
const MUIBOOK_COMPONENT_SKILL_RAW =
  "https://raw.githubusercontent.com/michaeltrilford/muibook/main/skills/muibook-components/SKILL.md";
const MUIBOOK_CANVAS_SKILL_INSTALL =
  "https://github.com/michaeltrilford/muibook/tree/main/skills/redactd-canvas-muibook";
const MUIBOOK_COMPONENT_SKILL_INSTALL =
  "https://github.com/michaeltrilford/muibook/tree/main/skills/muibook-components";
const CREATE_WEB_COMPONENTS_SKILL =
  "https://github.com/michaeltrilford/muibook/blob/main/skills/create-web-components/SKILL.md";
const CREATE_WEB_COMPONENTS_SKILL_RAW =
  "https://raw.githubusercontent.com/michaeltrilford/muibook/main/skills/create-web-components/SKILL.md";
const CREATE_WEB_COMPONENTS_SKILL_INSTALL =
  "https://github.com/michaeltrilford/muibook/tree/main/skills/create-web-components";
const CREATE_UX_GUIDELINES_SKILL =
  "https://github.com/michaeltrilford/muibook/blob/main/skills/create-ux-guidelines/SKILL.md";
const CREATE_UX_GUIDELINES_SKILL_RAW =
  "https://raw.githubusercontent.com/michaeltrilford/muibook/main/skills/create-ux-guidelines/SKILL.md";
const CREATE_UX_GUIDELINES_SKILL_INSTALL =
  "https://github.com/michaeltrilford/muibook/tree/main/skills/create-ux-guidelines";
const STYLE_WEB_COMPONENTS_SKILL =
  "https://github.com/michaeltrilford/muibook/blob/main/skills/style-web-components/SKILL.md";
const STYLE_WEB_COMPONENTS_SKILL_RAW =
  "https://raw.githubusercontent.com/michaeltrilford/muibook/main/skills/style-web-components/SKILL.md";
const STYLE_WEB_COMPONENTS_SKILL_INSTALL =
  "https://github.com/michaeltrilford/muibook/tree/main/skills/style-web-components";
const MUIBOOK_JSON_RULES_SKILL =
  "https://github.com/michaeltrilford/muibook/blob/main/skills/muibook-json-rules/SKILL.md";
const MUIBOOK_JSON_RULES_SKILL_RAW =
  "https://raw.githubusercontent.com/michaeltrilford/muibook/main/skills/muibook-json-rules/SKILL.md";
const MUIBOOK_JSON_RULES_SKILL_INSTALL =
  "https://github.com/michaeltrilford/muibook/tree/main/skills/muibook-json-rules";
const WIREFRAME_TO_MUIBOOK_COMPONENTS_SKILL =
  "https://github.com/michaeltrilford/muibook/blob/main/skills/wireframe-to-muibook-components/SKILL.md";
const WIREFRAME_TO_MUIBOOK_COMPONENTS_SKILL_RAW =
  "https://raw.githubusercontent.com/michaeltrilford/muibook/main/skills/wireframe-to-muibook-components/SKILL.md";
const WIREFRAME_TO_MUIBOOK_COMPONENTS_SKILL_INSTALL =
  "https://github.com/michaeltrilford/muibook/tree/main/skills/wireframe-to-muibook-components";

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
        title="Agent Tools & Plugins"
        description="Ground AI agents in the Muibook design system with the Knowledge MCP, connect interactive editor plugins for canvas creation and design review, or install standalone skills for focused offline guidance."
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
                        <mui-badge variant="neutral">Codex Plugin</mui-badge>
                        <mui-heading level="3" size="4">Redactd Canvas</mui-heading>
                        <mui-body size="medium">
                          Prompt complete Muibook layouts from Codex and paste them directly into an active Redactd canvas. The full plugin also includes an API fallback for headless creation.
                        </mui-body>
                      </mui-v-stack>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${REDACTD_CANVAS_REPO}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
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
                        <mui-badge variant="neutral">Codex Plugin</mui-badge>
                        <mui-heading level="3" size="4">Redactd Design Loop</mui-heading>
                        <mui-body size="medium">
                          Review a Redactd interface through structured critique, persona feedback, task outcomes, and iteration passes. Viewing the Design Loop documentation requires a Redactd account and sign-in.
                        </mui-body>
                      </mui-v-stack>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${REDACTD_DESIGN_LOOP_REPO}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
                        <mui-link href="https://redactd.xyz/docs#design-loop" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">Docs</mui-link>
                      </mui-h-stack>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
              </div>
            </mui-grid>
          </mui-v-stack>

          <mui-v-stack id="skills-knowledge" space="var(--space-400)">
            <mui-heading level="2" size="3">Recommended MCP's</mui-heading>
            <mui-grid class="tool-grid" space="var(--space-600)">
              <div class="tool-card">
                <mui-card class="skill-card">
                  <mui-card-body>
                    <mui-v-stack space="var(--space-600)">
                      <mui-v-stack space="var(--space-200)">
                        <mui-badge variant="positive">MCP</mui-badge>
                        <mui-heading level="3" size="4">Muibook Knowledge</mui-heading>
                        <mui-body size="medium">
                          Give Codex and other compatible agents on-demand access to Muibook component APIs, design rules, dynamic attributes, keywords, and composition examples.
                        </mui-body>
                      </mui-v-stack>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${MUIBOOK_KNOWLEDGE_REPO}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
                        <mui-link href="/knowledge-overview" variant="secondary" size="small">Learn more</mui-link>
                      </mui-h-stack>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
              </div>
            </mui-grid>
          </mui-v-stack>

          <mui-v-stack id="skills-knowledge" space="var(--space-400)">
            <mui-heading level="2" size="3">Recommended Skills</mui-heading>
            <mui-grid class="tool-grid" space="var(--space-600)">
              <div class="tool-card">
                <mui-card class="skill-card">
                  <mui-card-body>
                    <mui-v-stack space="var(--space-600)">
                      <mui-v-stack space="var(--space-200)">
                        <mui-badge variant="attention">Skill</mui-badge>
                        <mui-heading level="3" size="4">Muibook Components</mui-heading>
                        <mui-body size="medium">
                          Give Codex the lightweight, single-file component knowledge used alongside Redactd Canvas for Muibook. The full Redactd Canvas plugin and Muibook Knowledge MCP remain optional paths for richer automation and guidance.
                        </mui-body>
                      </mui-v-stack>
                      <mui-code size="x-small" scrollable>Install this skill:
${MUIBOOK_COMPONENT_SKILL_INSTALL}</mui-code>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${MUIBOOK_COMPONENT_SKILL}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
                        <mui-link href="${MUIBOOK_COMPONENT_SKILL_RAW}" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">SKILL.md</mui-link>
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
                        <mui-badge variant="attention">Skill</mui-badge>
                        <mui-heading level="3" size="4">Redactd Canvas for Muibook</mui-heading>
                        <mui-body size="medium">
                          Pair this skill with Muibook Components for a lightweight Codex workflow that generates and pastes layouts through an open Redactd canvas—without installing the Redactd Canvas plugin, API backend, or Muibook Knowledge MCP.
                        </mui-body>
                      </mui-v-stack>
                      <mui-code size="x-small" scrollable>Install this skill:
${MUIBOOK_CANVAS_SKILL_INSTALL}</mui-code>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${MUIBOOK_CANVAS_SKILL}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
                        <mui-link href="${MUIBOOK_CANVAS_SKILL_RAW}" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">SKILL.md</mui-link>
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
                        <mui-badge variant="attention">Skill</mui-badge>
                        <mui-heading level="3" size="4">Create Web Components</mui-heading>
                        <mui-body size="medium">
                          Build framework-agnostic native Web Components with explicit APIs, shadow DOM, slots, events, tokens, parts, metadata, and portable knowledge exports.
                        </mui-body>
                      </mui-v-stack>
                      <mui-code size="x-small" scrollable>Install this skill:
${CREATE_WEB_COMPONENTS_SKILL_INSTALL}</mui-code>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${CREATE_WEB_COMPONENTS_SKILL}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
                        <mui-link href="${CREATE_WEB_COMPONENTS_SKILL_RAW}" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">SKILL.md</mui-link>
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
                        <mui-badge variant="attention">Skill</mui-badge>
                        <mui-heading level="3" size="4">Create UX Guidelines</mui-heading>
                        <mui-body size="medium">
                          Write practical component guidance covering usage, accessibility, anatomy, variants, rules, behaviour, writing, compositions, and published assets.
                        </mui-body>
                      </mui-v-stack>
                      <mui-code size="x-small" scrollable>Install this skill:
${CREATE_UX_GUIDELINES_SKILL_INSTALL}</mui-code>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${CREATE_UX_GUIDELINES_SKILL}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
                        <mui-link href="${CREATE_UX_GUIDELINES_SKILL_RAW}" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">SKILL.md</mui-link>
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
                        <mui-badge variant="attention">Skill</mui-badge>
                        <mui-heading level="3" size="4">Style Web Components</mui-heading>
                        <mui-body size="medium">
                          Apply themes and focused visual overrides through token layers, CSS variables, parts, classes, and brand and theme attributes.
                        </mui-body>
                      </mui-v-stack>
                      <mui-code size="x-small" scrollable>Install this skill:
${STYLE_WEB_COMPONENTS_SKILL_INSTALL}</mui-code>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${STYLE_WEB_COMPONENTS_SKILL}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
                        <mui-link href="${STYLE_WEB_COMPONENTS_SKILL_RAW}" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">SKILL.md</mui-link>
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
                        <mui-badge variant="attention">Skill</mui-badge>
                        <mui-heading level="3" size="4">Muibook JSON Rules</mui-heading>
                        <mui-body size="medium">
                          Rules, component AST mappings, chart data shapes, and MuiScan normalization guidelines for generating valid Muibook JSON trees.
                        </mui-body>
                      </mui-v-stack>
                      <mui-code size="x-small" scrollable>Install this skill:
${MUIBOOK_JSON_RULES_SKILL_INSTALL}</mui-code>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${MUIBOOK_JSON_RULES_SKILL}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
                        <mui-link href="${MUIBOOK_JSON_RULES_SKILL_RAW}" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">SKILL.md</mui-link>
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
                        <mui-badge variant="attention">Skill</mui-badge>
                        <mui-heading level="3" size="4">Wireframe To Muibook Components</mui-heading>
                        <mui-body size="medium">
                          Interpret sketches, wireframe drawings, design screenshots, and visual mockups into semantic Muibook Web Components, responsive layout primitives, and valid token-driven styling.
                        </mui-body>
                      </mui-v-stack>
                      <mui-code size="x-small" scrollable>Install this skill:
${WIREFRAME_TO_MUIBOOK_COMPONENTS_SKILL_INSTALL}</mui-code>
                      <mui-h-stack wrap="wrap" space="var(--space-200)">
                        <mui-link href="${WIREFRAME_TO_MUIBOOK_COMPONENTS_SKILL}" target="_blank" rel="noopener noreferrer" variant="primary" size="small">GitHub</mui-link>
                        <mui-link href="${WIREFRAME_TO_MUIBOOK_COMPONENTS_SKILL_RAW}" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">SKILL.md</mui-link>
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

  connectedCallback() {
    if (window.location.hash !== "#skills-knowledge") return;
    requestAnimationFrame(() => {
      this.shadowRoot?.querySelector("#skills-knowledge")?.scrollIntoView({ block: "start" });
    });
  }
}

customElements.define("plugins-page", PluginsPage);
