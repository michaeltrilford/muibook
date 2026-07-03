class ManifestPage extends HTMLElement {
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

      @container (min-width: 960px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 65ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @container (min-width: 1120px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 570px;
          gap: 9.6rem;
        }
      }

      @container (min-width: 1730px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 690px;
        }
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Design Manifest"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/custom-elements.json"
        x-large
      >
        <div class="content-container resource-page">
          <mui-grid class="config" space="var(--space-600)">
          <mui-v-stack space="var(--space-600)">
            <mui-v-stack space="var(--space-400)">
              <mui-body size="medium">
                The Custom Elements Manifest is the machine-readable description of Muibook’s Web Components. It exposes component names, attributes, properties, slots, events, CSS parts, and documentation metadata in a format that tools can inspect.
              </mui-body>
              <mui-body size="medium">
                This is the layer that helps builders, story tooling, Redactd-style editors, and AI workflows understand the component API without scraping examples by hand.
              </mui-body>
              <mui-body size="medium">
                If an LLM, Codex workflow, CMS, Storybook integration, or custom storefront needs to work with your design system, the manifest gives it the language of the system: what components exist, how they are configured, and which composition patterns are valid. When @muibook/components is installed, this file is already available for tools to inspect and learn from.
              </mui-body>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Why It Matters</mui-heading>
              <mui-list as="ul">
                <mui-list-item size="medium">Make LLM and Codex workflows aware that @muibook/components includes this manifest, so they can inspect the real component vocabulary instead of inventing markup.</mui-list-item>
                <mui-list-item size="medium">Use it to discover component APIs, supported attributes, slots, parts, and typed metadata.</mui-list-item>
                <mui-list-item size="medium">Pair it with examples and prompt contracts when generating or validating component trees.</mui-list-item>
                <mui-list-item size="medium">Use it as structured component data for Storybook, CMS-driven pages, custom storefronts, or internal builders.</mui-list-item>
                <mui-list-item size="medium">Use dynamic-attrs.json alongside the manifest when a builder or React tool needs to pass structural attributes to the correct destination component.</mui-list-item>
              </mui-list>
            </mui-v-stack>

          </mui-v-stack>

          <mui-v-stack space="var(--space-400)">
            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Package Exports</mui-heading>
              <mui-code scrollable>
                import manifest from &quot;@muibook/components/custom-elements.json&quot;;<br />
                import dynamicAttrs from &quot;@muibook/components/dynamic-attrs.json&quot;;
              </mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-300)">
              <mui-heading level="3" size="5">Build Output</mui-heading>
              <mui-body size="medium">
                Muibook generates the manifest during package builds and publishes it with the ESM output.
              </mui-body>
              <mui-code scrollable>
                npm run cem<br />
                npm run copy-cem<br /><br />
                /dist/esm/custom-elements.json<br />
                /dist/esm/dynamic-attrs.json
              </mui-code>
            </mui-v-stack>

            <mui-heading level="3" size="5">Manifest Structure</mui-heading>
            <mui-code scrollable>
              {<br />
              &nbsp;&nbsp;&quot;schemaVersion&quot;: &quot;1.0.0&quot;,<br />
              &nbsp;&nbsp;&quot;modules&quot;: [<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;declarations&quot;: [<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;tagName&quot;: &quot;mui-button&quot;,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;attributes&quot;: [...],<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;slots&quot;: [...],<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;cssParts&quot;: [...]<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
              &nbsp;&nbsp;&nbsp;&nbsp;}<br />
              &nbsp;&nbsp;]<br />
              }
            </mui-code>
          </mui-v-stack>
        </mui-grid>
        </div>
      </story-template>
    `;
  }
}

customElements.define("manifest-page", ManifestPage);
