class SkillsPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .content-container {
        container-type: inline-size;
        display: grid;
        gap: var(--space-600);
      }

      .config::part(display) {
        grid-template-columns: 1fr;
      }

      .download-actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-200);
      }

      .path-list {
        display: grid;
        gap: var(--space-200);
      }

      .path-list mui-code {
        max-width: 100%;
      }

      @container (min-width: 960px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 70ch) 420px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @container (min-width: 1120px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 560px;
          gap: 9.6rem;
        }
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Web Component Skill"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/skills/muibook-web-components.md"
      >
        <div class="content-container">
          <mui-grid class="config" space="var(--space-600)">
            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium">
                  The Muibook Web Components skill is a compact instruction file for agents and developers building native, token-led custom elements.
                </mui-body>
                <mui-body size="medium">
                  It explains the component architecture behind Muibook: shadow-contained styles, explicit APIs, part maps, slot-aware composition, dynamic attrs, and thin framework wrappers.
                </mui-body>
                <mui-body size="medium">
                  Use it as a public starting point for creating Web Components in this style, or adapt the same architecture to another design system.
                </mui-body>
              </mui-v-stack>

              <div class="download-actions">
                <mui-link
                  href="/skills/muibook-web-components.md"
                  download
                  variant="primary"
                  size="medium"
                >
                  Download Skill
                </mui-link>
                <mui-link
                  href="/skills/muibook-web-components.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="medium"
                >
                  View Markdown
                </mui-link>
              </div>

              <story-quicklinks
                heading="Skill Sections"
                links="component-anatomy::Component Anatomy|||public-api-discipline::Public API|||styling-model::Styling Model|||part-maps::Part Maps|||slots-composition::Slots|||dynamic-attrs::Dynamic Attrs|||framework-wrappers::Framework Wrappers|||review-checklist::Review Checklist"
              ></story-quicklinks>

              <mui-v-stack id="component-anatomy" space="var(--space-300)">
                <mui-heading level="3" size="5">Component Anatomy</mui-heading>
                <mui-body size="medium">
                  Build custom elements around native browser behavior: observed attributes, an open shadow root, deterministic render/update flow, and focused DOM sync in attribute callbacks.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack id="public-api-discipline" space="var(--space-300)">
                <mui-heading level="3" size="5">Public API Discipline</mui-heading>
                <mui-body size="medium">
                  Keep API metadata in component <mui-code size="small" inline>api.ts</mui-code> files, UX guidance in <mui-code size="small" inline>doc.ts</mui-code>, and generated component metadata in the Custom Elements Manifest.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack id="styling-model" space="var(--space-300)">
                <mui-heading level="3" size="5">Styling Model</mui-heading>
                <mui-body size="medium">
                  Prefer contained shadow styles, semantic and component CSS variables, intentional parts, and CSS-first layout before adding runtime state.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack id="part-maps" space="var(--space-300)">
                <mui-heading level="3" size="5">Part Maps</mui-heading>
                <mui-body size="medium">
                  Use <mui-code size="small" inline>getPartMap(...)</mui-code> to expose trusted override surfaces for text, spacing, layout, and visual styling without exposing the whole internal DOM.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack id="slots-composition" space="var(--space-300)">
                <mui-heading level="3" size="5">Slots And Composition</mui-heading>
                <mui-body size="medium">
                  Use named slots, slot-aware state, context attrs or classes, and automatic slotted content sizing so components compose predictably.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack id="dynamic-attrs" space="var(--space-300)">
                <mui-heading level="3" size="5">Dynamic Attrs</mui-heading>
                <mui-body size="medium">
                  Document runtime and destination-only structural attrs separately from public props, and strip internal attrs from exported HTML unless a destination needs them.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack id="framework-wrappers" space="var(--space-300)">
                <mui-heading level="3" size="5">Framework Wrappers</mui-heading>
                <mui-body size="medium">
                  Keep wrappers thin: pass attrs, events, refs, slots, and children through without recreating the component behavior in the framework layer.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack id="review-checklist" space="var(--space-300)">
                <mui-heading level="3" size="5">Review Checklist</mui-heading>
                <mui-body size="medium">
                  Review accessibility, exported HTML cleanliness, token usage, part exposure, slot behavior, dynamic attrs, and generated docs metadata before shipping.
                </mui-body>
              </mui-v-stack>
            </mui-v-stack>

            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Related Resources</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/knowledge">Knowledge</mui-link>
                  </mui-list-item>
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/manifest">Design Manifest</mui-link>
                  </mui-list-item>
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/dynamic-attrs.json" target="_blank" rel="noopener noreferrer">Dynamic Attrs</mui-link>
                  </mui-list-item>
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="https://github.com/michaeltrilford/muibook" target="_blank" rel="noopener noreferrer">GitHub</mui-link>
                  </mui-list-item>
                </mui-list>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">File Path</mui-heading>
                <div class="path-list">
                  <mui-code size="small" inline>/public/skills/muibook-web-components.md</mui-code>
                  <mui-code size="small" inline>/skills/muibook-web-components.md</mui-code>
                </div>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Skill Preview</mui-heading>
                <mui-code scrollable>
                  ---<br />
                  name: muibook-web-components<br />
                  description: Build and review native Web Components using the Muibook architecture...<br />
                  ---<br /><br />
                  # Muibook Web Components<br /><br />
                  ## Component Anatomy<br />
                  ## Public API Discipline<br />
                  ## Styling Model<br />
                  ## Part Maps<br />
                  ## Slots And Composition<br />
                  ## Dynamic Attrs<br />
                  ## Framework Wrappers<br />
                  ## Review Checklist
                </mui-code>
              </mui-v-stack>
            </mui-v-stack>
          </mui-grid>
        </div>
      </story-template>
    `;
  }
}

customElements.define("skills-page", SkillsPage);
