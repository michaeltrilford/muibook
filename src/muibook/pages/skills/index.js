class SkillsPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .content-container {
        container-type: inline-size;
        display: grid;
        gap: var(--space-800);
        margin-block-end: var(--space-800);
      }

      .skill-sections {
        display: grid;
        gap: calc(var(--space-800) * 2);
      }

      .intro {
        max-width: 70ch;
      }

      .skill-section::part(display) {
        grid-template-columns: 1fr;
      }



      .path-list {
        display: grid;
        gap: var(--space-200);
      }

      .path-list mui-code {
        max-width: 100%;
      }

      .resource-page mui-code {
        border-radius: var(--radius-300);
      }

      .sticky-panel {
        align-self: start;
        height: max-content;
      }

      @container (min-width: 960px) {
        .skill-section::part(display) {
          grid-template-columns: minmax(0, 70ch) 420px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }

        .sticky-panel {
          position: sticky;
          top: var(--space-600);
        }
      }

      @container (min-width: 1120px) {
        .skill-section::part(display) {
          grid-template-columns: minmax(0, 85ch) 560px;
          gap: 9.6rem;
        }
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Skills"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/web-component-skill.md"
        x-large
      >
        <div class="content-container resource-page">
          <div class="skill-sections">

          <mui-grid id="web-components" class="skill-section" space="var(--space-600)">
            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-400)" style="--stack-height: auto; --stack-width: auto;">
                <mui-h-stack wrap="wrap" space="var(--space-300)" aligny="center" alignx="space-between" style="--stack-height: auto; --stack-width: auto;">
                  <mui-heading level="2" size="3">Create Web Components</mui-heading>
                  <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;">
                    <mui-link href="/create-web-components-skill.md" download="" variant="tertiary" size="small" weight="regular">Download</mui-link>
                    <mui-link href="/create-web-components-skill.md" target="_blank" rel="noopener noreferrer" variant="tertiary" size="small" weight="regular">View</mui-link>
                  </mui-h-stack>
                </mui-h-stack>
                <mui-rule direction="horizontal" role="presentation"></mui-rule><mui-body size="large" weight="regular" variant="default">Help make your own web components portable components cross frameworks etc.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">What This Approach Optimizes For</mui-heading>
                <mui-body size="medium">Use this architecture when a design system needs to travel across plain HTML, framework wrappers, generated component trees, design canvases, exported markup, and AI-assisted tooling.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Approach</mui-heading>
                <mui-body size="medium">The skill explains a distinct Web Component architecture: layered tokens, property-oriented parts, parent-derived child context, and runtime attrs that tooling can understand without turning them into public props.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Component Anatomy</mui-heading>
                <mui-body size="medium">Build custom elements around native browser behavior: observed attributes, an open shadow root, deterministic render/update flow, and focused DOM sync in attribute callbacks.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Public API Discipline</mui-heading>
                <mui-body size="medium">Keep API metadata in component <mui-code size="small" inline>api.ts</mui-code> files, UX guidance in <mui-code size="small" inline>doc.ts</mui-code>, and generated component metadata in the Custom Elements Manifest.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Knowledge Bundle</mui-heading>
                <mui-body size="medium">Keep generated API metadata, dynamic attrs, design guidance, agent rules, keyword mappings, composition examples, and downloadable skill files as separate knowledge surfaces.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Token Architecture</mui-heading>
                <mui-body size="medium">Use CSS custom properties as the runtime contract while keeping foundation, semantic/theme, component, and local derived variables in distinct layers.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Styling Model</mui-heading>
                <mui-body size="medium">Prefer contained shadow styles, semantic and component CSS variables, intentional parts, and CSS-first layout before adding runtime state.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Part Maps</mui-heading>
                <mui-body size="medium">Use <mui-code size="small" inline>getPartMap(...)</mui-code> to expose property-oriented override surfaces for text, spacing, layout, and visual styling without exposing the whole internal DOM.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Slots And Structure</mui-heading>
                <mui-body size="medium">Use named slots, slot-aware state, context attrs or classes, and automatic slotted content sizing so components structure predictably.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Parent And Child Overrides</mui-heading>
                <mui-body size="medium">Let parents derive structural context from slotted children, then apply destination attrs or classes so each child can own its context-specific styling.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Dynamic Attrs</mui-heading>
                <mui-body size="medium">Document runtime and destination-only structural attrs separately from public props so wrappers, canvases, builders, and exporters know what to pass through or strip.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Framework Wrappers</mui-heading>
                <mui-body size="medium">Keep wrappers thin by passing attrs, events, refs, slots, and children through without recreating the component behavior in the framework layer.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Review Checklist</mui-heading>
                <mui-body size="medium">Review accessibility, exported HTML cleanliness, token usage, part exposure, slot behavior, dynamic attrs, and generated docs metadata before shipping.</mui-body>
              </mui-v-stack>
            </mui-v-stack>

            <mui-v-stack class="sticky-panel" space="var(--space-600)">

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Related Resources</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/knowledge-overview">Knowledge</mui-link>
                  </mui-list-item>
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/manifest">Design Manifest</mui-link>
                  </mui-list-item>
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/dynamic-attrs.json" target="_blank" rel="noopener noreferrer">Dynamic Attrs</mui-link>
                  </mui-list-item>
                </mui-list>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">File Path</mui-heading>
                <div class="path-list">
                  <mui-code size="small" inline>/public/create-web-components-skill.md</mui-code>
                  <mui-code size="small" inline>/create-web-components-skill.md</mui-code>
                </div>
              </mui-v-stack>

              <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center">
                <mui-link href="/create-web-components-skill.md" download variant="primary" size="small">Download</mui-link>
                <mui-link href="/create-web-components-skill.md" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">View</mui-link>
              </mui-h-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Skill Preview</mui-heading>
                <mui-code size="x-small" scrollable>
                  ---<br />
                  name: create-web-components-skill<br />
                  description: Help make your own framework-agnostic, portable web components using native APIs, shadow DOM, and slots...<br />
                  ---<br /><br />
                  # Create Web Components Skill<br /><br />
                  ## Component Structure<br />
                  ## What This Approach Optimizes For<br />
                  ## Component Anatomy<br />
                  ## Public API Discipline<br />
                  ## Knowledge Bundle<br />
                  ## Token Architecture<br />
                  ## Styling Model<br />
                  ## Part Maps<br />
                  ## Slots And Structure<br />
                  ## Parent And Child Overrides<br />
                  ## Dynamic Attrs<br />
                  ## Framework Wrappers<br />
                  ## Review Checklist
                </mui-code>
              </mui-v-stack>
            </mui-v-stack>
          </mui-grid>

          <mui-grid id="guidelines" class="skill-section" space="var(--space-600)">
            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-400)" style="--stack-height: auto; --stack-width: auto;">
                <mui-h-stack wrap="wrap" space="var(--space-300)" aligny="center" alignx="space-between" style="--stack-height: auto; --stack-width: auto;">
                  <mui-heading level="2" size="3">Create UX Guidelines</mui-heading>
                  <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;">
                    <mui-link href="/create-ux-guidelines-skill.md" download="" variant="tertiary" size="small" weight="regular">Download</mui-link>
                    <mui-link href="/create-ux-guidelines-skill.md" target="_blank" rel="noopener noreferrer" variant="tertiary" size="small" weight="regular">View</mui-link>
                  </mui-h-stack>
                </mui-h-stack>
                <mui-rule direction="horizontal" role="presentation"></mui-rule><mui-body size="large" weight="regular" variant="default">Help make your own UX Guidelines for your design system common structure.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Guidelines Structure</mui-heading>
                <mui-body size="medium">Ensure all guidelines conform to a strict, predictable schema instead of unstructured text.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Header And Links</mui-heading>
                <mui-body size="medium">Provide clear, concise explanations and URLs pointing to relevant external design or code resources.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Usage</mui-heading>
                <mui-body size="medium">Outline when and how to use the component, reserving this section for functional rules.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Accessibility</mui-heading>
                <mui-body size="medium">Split accessibility guidance into distinct designer and engineer audiences.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Anatomy</mui-heading>
                <mui-body size="medium">Name the stable visible structure of a component and connect them to slots, public attrs, or CSS parts.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Variants</mui-heading>
                <mui-body size="medium">Use lightweight images to showcase the different states and variant configurations.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Rules</mui-heading>
                <mui-body size="medium">Provide clear Do and Don't rules to visually compare correct versus incorrect usage.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Behaviour</mui-heading>
                <mui-body size="medium">Detail interactive states like Hover, Focus, and Disabled, and how the component responds to user input.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Writing</mui-heading>
                <mui-body size="medium">Provide copywriting guidelines specific to the component.</mui-body>
              </mui-v-stack>


              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Compositions</mui-heading>
                <mui-body size="medium">Use lightweight images to show realistic component combinations and use cases.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Related Resources</mui-heading>
                <mui-body size="medium">List related component links to help users find alternatives.</mui-body>
              </mui-v-stack>
            </mui-v-stack>

            <mui-v-stack class="sticky-panel" space="var(--space-600)">

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Related Resources</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/design-guidelines">UX Guidelines</mui-link>
                  </mui-list-item>
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/knowledge-overview">Knowledge</mui-link>
                  </mui-list-item>
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/knowledge-compositions">Compositions</mui-link>
                  </mui-list-item>
                  <mui-list-item size="medium">
                    <mui-link size="medium" href="/manifest">Design Manifest</mui-link>
                  </mui-list-item>
                </mui-list>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">File Path</mui-heading>
                <div class="path-list">
                  <mui-code size="small" inline>/public/create-ux-guidelines-skill.md</mui-code>
                  <mui-code size="small" inline>/create-ux-guidelines-skill.md</mui-code>
                </div>
              </mui-v-stack>

              <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center">
                <mui-link href="/create-ux-guidelines-skill.md" download variant="primary" size="small">Download</mui-link>
                <mui-link href="/create-ux-guidelines-skill.md" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">View</mui-link>
              </mui-h-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Skill Preview</mui-heading>
                <mui-code size="x-small" scrollable>
                  ---<br />
                  name: create-ux-guidelines-skill<br />
                  description: Help make your own UX Guidelines for your design system, providing a common structure for developers and designers.<br />
                  ---<br /><br />
                  # Create UX Guidelines Skill<br /><br />
                  ## Guidelines Structure<br />
                  ## Guidelines Structure<br />
                  ## Header And Links<br />
                  ## Usage<br />
                  ## Accessibility<br />
                  ## Anatomy<br />
                  ## Variants<br />
                  ## Rules<br />
                  ## Behaviour<br />
                  ## Writing<br />
                  ## Compositions<br />
                  ## Related Resources
                </mui-code>
              </mui-v-stack>
            </mui-v-stack>
          </mui-grid>

          <mui-grid id="compose-components" class="skill-section" space="var(--space-600)">
            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-400)" style="--stack-height: auto; --stack-width: auto;">
                <mui-h-stack wrap="wrap" space="var(--space-300)" aligny="center" alignx="space-between" style="--stack-height: auto; --stack-width: auto;">
                  <mui-heading level="2" size="3">Compose Web Components</mui-heading>
                  <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;">
                    <mui-link href="/compose-web-components-skill.md" download="" variant="tertiary" size="small" weight="regular">Download</mui-link>
                    <mui-link href="/compose-web-components-skill.md" target="_blank" rel="noopener noreferrer" variant="tertiary" size="small" weight="regular">View</mui-link>
                  </mui-h-stack>
                </mui-h-stack>
                <mui-rule direction="horizontal" role="presentation"></mui-rule><mui-body size="large" weight="regular" variant="default">Use Muibook components to build complete interfaces.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Building Layouts</mui-heading>
                <mui-body size="medium">Build 1D and 2D layouts using primitives like mui-stack and mui-grid with spacing attributes.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Component Combinations</mui-heading>
                <mui-body size="medium">Deep dives into structurally complex combinations like Cards, Forms, and Media Players.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Slotting & Automated Context</mui-heading>
                <mui-body size="medium">Understand standard slots (start, end, action, meta) and how parents react to them.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Prop Knowledge</mui-heading>
                <mui-body size="medium">Drive component state entirely through HTML attributes and enums.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Do's and Don'ts</mui-heading>
                <mui-body size="medium">Concrete anti-patterns with code examples comparing the right and wrong way to build.</mui-body>
              </mui-v-stack>
            </mui-v-stack>

            <mui-v-stack class="sticky-panel" space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Related Resources</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium"><mui-link size="medium" href="/knowledge-overview">Knowledge</mui-link></mui-list-item>
                  <mui-list-item size="medium"><mui-link size="medium" href="/knowledge-compositions">Compositions</mui-link></mui-list-item>
                </mui-list>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">File Path</mui-heading>
                <div class="path-list">
                  <mui-code size="small" inline>/public/compose-web-components-skill.md</mui-code>
                  <mui-code size="small" inline>/compose-web-components-skill.md</mui-code>
                </div>
              </mui-v-stack>

              <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center">
                <mui-link href="/compose-web-components-skill.md" download variant="primary" size="small">Download</mui-link>
                <mui-link href="/compose-web-components-skill.md" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">View</mui-link>
              </mui-h-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-code size="x-small" scrollable>
                  ---<br />
                  name: compose-web-components-skill<br />
                  description: Use Muibook components to build complete interfaces with declarative HTML and native slots.<br />
                  ---<br /><br />
                  # Compose Web Components Skill<br /><br />
                  ## Building Layouts<br />
                  ## Building Layouts<br />
                  ## Component Combinations (Deep Dive)<br />
                  ## Slotting & Automated Context<br />
                  ## Prop Knowledge<br />
                  ## Do's and Don'ts
                </mui-code>
              </mui-v-stack>
            </mui-v-stack>
          </mui-grid>

          <mui-grid id="style-components" class="skill-section" space="var(--space-600)">
            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-400)" style="--stack-height: auto; --stack-width: auto;">
                <mui-h-stack wrap="wrap" space="var(--space-300)" aligny="center" alignx="space-between" style="--stack-height: auto; --stack-width: auto;">
                  <mui-heading level="2" size="3">Style Web Components</mui-heading>
                  <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;">
                    <mui-link href="/style-web-components-skill.md" download="" variant="tertiary" size="small" weight="regular">Download</mui-link>
                    <mui-link href="/style-web-components-skill.md" target="_blank" rel="noopener noreferrer" variant="tertiary" size="small" weight="regular">View</mui-link>
                  </mui-h-stack>
                </mui-h-stack>
                <mui-rule direction="horizontal" role="presentation"></mui-rule><mui-body size="large" weight="regular" variant="default">Add your own theme to Muibook components.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Token Architecture</mui-heading>
                <mui-body size="medium">Learn the three-tier system: Brand Primitives, Semantic Tokens, and Component Tokens generated via Style Dictionary.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Base Theme Structure</mui-heading>
                <mui-body size="medium">Understand how the four-step CSS foundation maps primitives to Light and Dark mode semantic tokens.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Multi-Brand Theming</mui-heading>
                <mui-body size="medium">Support multiple brands by extending the base theme and overriding specific primitive values using data-brand attributes.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Overrides</mui-heading>
                <mui-body size="medium">Apply isolated component overrides without breaking the global theme or adding escape hatches.</mui-body>
              </mui-v-stack>
            </mui-v-stack>

            <mui-v-stack class="sticky-panel" space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Related Resources</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium"><mui-link size="medium" href="/knowledge-overview">Knowledge</mui-link></mui-list-item>
                  <mui-list-item size="medium"><mui-link size="medium" href="/manifest">Design Manifest</mui-link></mui-list-item>
                </mui-list>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">File Path</mui-heading>
                <div class="path-list">
                  <mui-code size="small" inline>/public/style-web-components-skill.md</mui-code>
                  <mui-code size="small" inline>/style-web-components-skill.md</mui-code>
                </div>
              </mui-v-stack>

              <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center">
                <mui-link href="/style-web-components-skill.md" download variant="primary" size="small">Download</mui-link>
                <mui-link href="/style-web-components-skill.md" target="_blank" rel="noopener noreferrer" variant="secondary" size="small">View</mui-link>
              </mui-h-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Skill Preview</mui-heading>
                <mui-code size="x-small" scrollable>
                  ---<br />
                  name: style-web-components-skill<br />
                  description: Add your own theme to Muibook components using CSS variables and HTML attributes.<br />
                  ---<br /><br />
                  # Style Web Components Skill<br /><br />
                  ## Token Architecture<br />
                  ## Token Architecture<br />
                  ## Base Theme Structure<br />
                  ## Multi-Brand Theming<br />
                  ## Overrides
                </mui-code>
              </mui-v-stack>
            </mui-v-stack>
          </mui-grid>

</div>

        </div>
      </story-template>
    `;
  }
}

customElements.define("skills-page", SkillsPage);
