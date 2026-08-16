import { createStoryMeta, getComponentDocs } from "../../../utils/story-data";

class StoryColorInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ColorInput");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Color Input"></story-metadata-empty>`;
      return;
    }

    const storyMeta = createStoryMeta(storyItems);
    const sizeExamples = ["x-small", "small", "medium", "large"]
      .map(
        (size) => /*html*/ `
          <mui-color-input
            size="${size}"
            label="${size.replace("-", " ")} accent"
            description="Supporting guidance at ${size.replace("-", " ")} density."
            value="#6750a4">
          </mui-color-input>
        `,
      )
      .join("");

    const stories = /*html*/ `
      <story-api-types tag="mui-color-input" title="Color Input"></story-api-types>

      <story-card id="default" title="${storyMeta.default.title}" description="${storyMeta.default.description}" usage="${storyMeta.default.usage}">
        <mui-color-input slot="body" label="Accent colour" value="#6750a4"></mui-color-input>
        <story-code-block slot="footer" scrollable>
          &lt;mui-color-input label=&quot;Accent colour&quot; value=&quot;#6750a4&quot;&gt;&lt;/mui-color-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="palette-settings" title="${storyMeta["palette-settings"].title}" description="${storyMeta["palette-settings"].description}" usage="${storyMeta["palette-settings"].usage}">
        <mui-v-stack slot="body" class="palette-settings" space="var(--space-600)">
          <mui-v-stack space="var(--space-300)">
            <mui-heading level="none" size="4">Large</mui-heading>
            <mui-color-input size="large" id="palette-primary-large" label="Primary colour" value="#6750a4">
              <mui-avatar slot="after" id="palette-primary-large-preview" background-color="#6750a4">T</mui-avatar>
            </mui-color-input>
            <mui-color-input size="large" id="palette-badge-large" label="Badge accent" value="#9c27b0">
              <mui-badge size="large" slot="after" id="palette-badge-large-preview" color="#9c27b0">New</mui-badge>
            </mui-color-input>
            <mui-color-input size="large" id="palette-solid-large" label="Solid preview" value="#d62f69">
              <span slot="after" id="palette-solid-large-preview" class="solid-preview solid-preview-large"></span>
            </mui-color-input>
            <mui-color-input size="large" id="palette-secondary-large" label="Secondary colour" value="#625b71">
              <mui-heading slot="after" id="palette-secondary-large-preview" class="type-preview" level="none" size="2">Aa</mui-heading>
            </mui-color-input>
            <mui-color-input size="large" id="palette-outline-large" label="Outline colour" value="#79747e">
              <span slot="after" id="palette-outline-large-preview" class="outline-preview outline-preview-large"></span>
            </mui-color-input>
          </mui-v-stack>

          <mui-v-stack space="var(--space-300)">
            <mui-heading level="none" size="4">Medium</mui-heading>
            <mui-color-input size="medium" id="palette-primary-medium" label="Primary colour" value="#6750a4">
              <mui-avatar slot="after" id="palette-primary-medium-preview" background-color="#6750a4">T</mui-avatar>
            </mui-color-input>
            <mui-color-input size="medium" id="palette-badge-medium" label="Badge accent" value="#9c27b0">
              <mui-badge size="medium" slot="after" id="palette-badge-medium-preview" color="#9c27b0">New</mui-badge>
            </mui-color-input>
            <mui-color-input size="medium" id="palette-solid-medium" label="Solid preview" value="#d62f69">
              <span slot="after" id="palette-solid-medium-preview" class="solid-preview solid-preview-medium"></span>
            </mui-color-input>
            <mui-color-input size="medium" id="palette-secondary-medium" label="Secondary colour" value="#625b71">
              <mui-heading slot="after" id="palette-secondary-medium-preview" class="type-preview" level="none" size="3">Aa</mui-heading>
            </mui-color-input>
            <mui-color-input size="medium" id="palette-outline-medium" label="Outline colour" value="#79747e">
              <span slot="after" id="palette-outline-medium-preview" class="outline-preview outline-preview-medium"></span>
            </mui-color-input>
          </mui-v-stack>

          <mui-v-stack space="var(--space-300)">
            <mui-heading level="none" size="4">Small</mui-heading>
            <mui-color-input size="small" id="palette-primary-small" label="Primary colour" value="#6750a4">
              <mui-avatar slot="after" id="palette-primary-small-preview" background-color="#6750a4">T</mui-avatar>
            </mui-color-input>
            <mui-color-input size="small" id="palette-badge-small" label="Badge accent" value="#9c27b0">
              <mui-badge size="small" slot="after" id="palette-badge-small-preview" color="#9c27b0">New</mui-badge>
            </mui-color-input>
            <mui-color-input size="small" id="palette-solid-small" label="Solid preview" value="#d62f69">
              <span slot="after" id="palette-solid-small-preview" class="solid-preview solid-preview-small"></span>
            </mui-color-input>
            <mui-color-input size="small" id="palette-secondary-small" label="Secondary colour" value="#625b71">
              <mui-heading slot="after" id="palette-secondary-small-preview" class="type-preview" level="none" size="3">Aa</mui-heading>
            </mui-color-input>
            <mui-color-input size="small" id="palette-outline-small" label="Outline colour" value="#79747e">
              <span slot="after" id="palette-outline-small-preview" class="outline-preview outline-preview-small"></span>
            </mui-color-input>
          </mui-v-stack>

          <mui-v-stack space="var(--space-300)">
            <mui-heading level="none" size="4">X-Small</mui-heading>
            <mui-color-input size="x-small" id="palette-primary-x-small" label="Primary colour" value="#6750a4">
              <mui-avatar slot="after" id="palette-primary-x-small-preview" background-color="#6750a4">T</mui-avatar>
            </mui-color-input>
            <mui-color-input size="x-small" id="palette-badge-x-small" label="Badge accent" value="#9c27b0">
              <mui-badge size="x-small" slot="after" id="palette-badge-x-small-preview" color="#9c27b0">New</mui-badge>
            </mui-color-input>
            <mui-color-input size="x-small" id="palette-solid-x-small" label="Solid preview" value="#d62f69">
              <span slot="after" id="palette-solid-x-small-preview" class="solid-preview solid-preview-x-small"></span>
            </mui-color-input>
            <mui-color-input size="x-small" id="palette-secondary-x-small" label="Secondary colour" value="#625b71">
              <mui-heading slot="after" id="palette-secondary-x-small-preview" class="type-preview" level="none" size="3">Aa</mui-heading>
            </mui-color-input>
            <mui-color-input size="x-small" id="palette-outline-x-small" label="Outline colour" value="#79747e">
              <span slot="after" id="palette-outline-x-small-preview" class="outline-preview outline-preview-x-small"></span>
            </mui-color-input>
          </mui-v-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;style&gt;<br />
          &nbsp;&nbsp;.type-preview {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;--heading-text-color: #625b71;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;min-width: 4.4rem;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;text-align: center;<br />
          &nbsp;&nbsp;}<br />
          &nbsp;&nbsp;.solid-preview {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;display: block;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;width: 4.4rem;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;height: 4.4rem;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;box-sizing: border-box;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;border-radius: var(--form-radius-medium);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;background: #d62f69;<br />
          &nbsp;&nbsp;}<br />
          &nbsp;&nbsp;.outline-preview {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;display: block;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;width: 4.4rem;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;height: 4.4rem;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;box-sizing: border-box;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;border-radius: var(--form-radius-medium);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;border: var(--border-thick);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;border-color: #79747e;<br />
          &nbsp;&nbsp;}<br />
          &lt;/style&gt;<br /><br />
          &lt;mui-v-stack space=&quot;var(--space-500)&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-color-input id=&quot;primary-input&quot; label=&quot;Primary colour&quot; description=&quot;Primary actions and key accents.&quot; value=&quot;#6750a4&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar slot=&quot;after&quot; id=&quot;primary-preview&quot; background-color=&quot;#6750a4&quot;&gt;T&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;/mui-color-input&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-color-input id=&quot;badge-input&quot; label=&quot;Badge accent&quot; description=&quot;Highlight tags, counts, and pill indicators.&quot; value=&quot;#9c27b0&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge slot=&quot;after&quot; id=&quot;badge-preview&quot; color=&quot;#9c27b0&quot;&gt;New&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;/mui-color-input&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-color-input id=&quot;solid-input&quot; label=&quot;Solid preview&quot; description=&quot;Direct background swatch preview.&quot; value=&quot;#d62f69&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;span slot=&quot;after&quot; id=&quot;solid-preview&quot; class=&quot;solid-preview&quot;&gt;&lt;/span&gt;<br />
          &nbsp;&nbsp;&lt;/mui-color-input&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-color-input id=&quot;secondary-input&quot; label=&quot;Secondary colour&quot; description=&quot;Supporting text and secondary accents.&quot; value=&quot;#625b71&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot=&quot;after&quot; id=&quot;secondary-preview&quot; class=&quot;type-preview&quot; level=&quot;none&quot; size=&quot;3&quot;&gt;Aa&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&lt;/mui-color-input&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-color-input id=&quot;outline-input&quot; label=&quot;Outline colour&quot; description=&quot;Borders and form field outlines.&quot; value=&quot;#79747e&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;span slot=&quot;after&quot; id=&quot;outline-preview&quot; class=&quot;outline-preview&quot;&gt;&lt;/span&gt;<br />
          &nbsp;&nbsp;&lt;/mui-color-input&gt;<br />
          &lt;/mui-v-stack&gt;<br /><br />
          &lt;script&gt;<br />
          &nbsp;&nbsp;// Injecting background-color via the component's provided API<br />
          &nbsp;&nbsp;const primary = document.querySelector(&quot;#primary-input&quot;);<br />
          &nbsp;&nbsp;const primaryPreview = document.querySelector(&quot;#primary-preview&quot;);<br />
          &nbsp;&nbsp;primary.addEventListener(&quot;input&quot;, (e) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;primaryPreview.setAttribute(&quot;background-color&quot;, e.detail.value);<br />
          &nbsp;&nbsp;});<br /><br />
          &nbsp;&nbsp;// Injecting color via the component's provided API<br />
          &nbsp;&nbsp;const badge = document.querySelector(&quot;#badge-input&quot;);<br />
          &nbsp;&nbsp;const badgePreview = document.querySelector(&quot;#badge-preview&quot;);<br />
          &nbsp;&nbsp;badge.addEventListener(&quot;input&quot;, (e) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;badgePreview.setAttribute(&quot;color&quot;, e.detail.value);<br />
          &nbsp;&nbsp;});<br /><br />
          &nbsp;&nbsp;// Injecting background style on companion span<br />
          &nbsp;&nbsp;const solid = document.querySelector(&quot;#solid-input&quot;);<br />
          &nbsp;&nbsp;const solidPreview = document.querySelector(&quot;#solid-preview&quot;);<br />
          &nbsp;&nbsp;solid.addEventListener(&quot;input&quot;, (e) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;solidPreview.style.background = e.detail.value;<br />
          &nbsp;&nbsp;});<br /><br />
          &nbsp;&nbsp;// Injecting color via the available design token<br />
          &nbsp;&nbsp;const secondary = document.querySelector(&quot;#secondary-input&quot;);<br />
          &nbsp;&nbsp;const secondaryPreview = document.querySelector(&quot;#secondary-preview&quot;);<br />
          &nbsp;&nbsp;secondary.addEventListener(&quot;input&quot;, (e) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;secondaryPreview.style.setProperty(&quot;--heading-text-color&quot;, e.detail.value);<br />
          &nbsp;&nbsp;});<br /><br />
          &nbsp;&nbsp;// Injecting style onto the custom span element<br />
          &nbsp;&nbsp;const outline = document.querySelector(&quot;#outline-input&quot;);<br />
          &nbsp;&nbsp;const outlinePreview = document.querySelector(&quot;#outline-preview&quot;);<br />
          &nbsp;&nbsp;outline.addEventListener(&quot;input&quot;, (e) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;outlinePreview.style.borderColor = e.detail.value;<br />
          &nbsp;&nbsp;});<br />
          &lt;/script&gt;
        </story-code-block>
      </story-card>

      <story-card id="supporting-description" title="${storyMeta["supporting-description"].title}" description="${storyMeta["supporting-description"].description}" usage="${storyMeta["supporting-description"].usage}">
        <mui-v-stack slot="body" space="var(--space-500)">
          <mui-color-input label="Chart accent" description="Used for the primary data series." value="#006bd6"></mui-color-input>
          <mui-color-input label="Status accent" value="#007a4d">
            <mui-body slot="description" variant="secondary" size="small">Review the <mui-link href="#palette-settings">palette settings</mui-link> before changing shared status colours.</mui-body>
          </mui-color-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-color-input label=&quot;Chart accent&quot; description=&quot;Used for the primary data series.&quot; value=&quot;#006bd6&quot;&gt;&lt;/mui-color-input&gt;<br /><br />
          &lt;mui-color-input label=&quot;Status accent&quot; value=&quot;#007a4d&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot=&quot;description&quot; variant=&quot;secondary&quot; size=&quot;small&quot;&gt;Review the &lt;mui-link href=&quot;/palette&quot;&gt;palette settings&lt;/mui-link&gt; before changing shared status colours.&lt;/mui-body&gt;<br />
          &lt;/mui-color-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta.sizes.title}" description="${storyMeta.sizes.description}" usage="${storyMeta.sizes.usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          ${sizeExamples}
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-color-input size=&quot;x-small&quot; label=&quot;X-small accent&quot; value=&quot;#6750a4&quot;&gt;&lt;/mui-color-input&gt;<br />
          &lt;mui-color-input size=&quot;small&quot; label=&quot;Small accent&quot; value=&quot;#6750a4&quot;&gt;&lt;/mui-color-input&gt;<br />
          &lt;mui-color-input size=&quot;medium&quot; label=&quot;Medium accent&quot; value=&quot;#6750a4&quot;&gt;&lt;/mui-color-input&gt;<br />
          &lt;mui-color-input size=&quot;large&quot; label=&quot;Large accent&quot; value=&quot;#6750a4&quot;&gt;&lt;/mui-color-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="hide-value" title="${storyMeta["hide-value"].title}" description="${storyMeta["hide-value"].description}" usage="${storyMeta["hide-value"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-color-input size="large" hide-value label="Large solid swatch" description="Large density colour input with hidden text value." value="#6750a4"></mui-color-input>
          <mui-color-input size="medium" hide-value label="Medium solid swatch" description="Medium density colour input with hidden text value." value="#9c27b0"></mui-color-input>
          <mui-color-input size="small" hide-value label="Small solid swatch" description="Small density colour input with hidden text value." value="#006bd6"></mui-color-input>
          <mui-color-input size="x-small" hide-value label="X-small solid swatch" description="X-small density colour input with hidden text value." value="#625b71"></mui-color-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-color-input hide-value size=&quot;large&quot; label=&quot;Large solid swatch&quot; value=&quot;#6750a4&quot;&gt;&lt;/mui-color-input&gt;<br />
          &lt;mui-color-input hide-value size=&quot;medium&quot; label=&quot;Medium solid swatch&quot; value=&quot;#9c27b0&quot;&gt;&lt;/mui-color-input&gt;<br />
          &lt;mui-color-input hide-value size=&quot;small&quot; label=&quot;Small solid swatch&quot; value=&quot;#006bd6&quot;&gt;&lt;/mui-color-input&gt;<br />
          &lt;mui-color-input hide-value size=&quot;x-small&quot; label=&quot;X-small solid swatch&quot; value=&quot;#625b71&quot;&gt;&lt;/mui-color-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="hide-label" title="${storyMeta["hide-label"].title}" description="${storyMeta["hide-label"].description}" usage="${storyMeta["hide-label"].usage}">
        <mui-color-input slot="body" label="Canvas background colour" hide-label value="#f6f2ff"></mui-color-input>
        <story-code-block slot="footer" scrollable>
          &lt;mui-color-input label=&quot;Canvas background colour&quot; hide-label value=&quot;#f6f2ff&quot;&gt;&lt;/mui-color-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="disabled" title="${storyMeta.disabled.title}" description="${storyMeta.disabled.description}" usage="${storyMeta.disabled.usage}">
        <mui-color-input slot="body" label="Inherited brand colour" description="Managed by the parent brand and unavailable here." disabled value="#4f378b"></mui-color-input>
        <story-code-block slot="footer" scrollable>
          &lt;mui-color-input label=&quot;Inherited brand colour&quot; description=&quot;Managed by the parent brand and unavailable here.&quot; disabled value=&quot;#4f378b&quot;&gt;&lt;/mui-color-input&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; }
        .palette-settings { width: 100%; max-width: 48rem; }
        .type-preview {
          --heading-text-color: #625b71;
          min-width: 4.4rem;
          text-align: center;
        }
        .solid-preview {
          display: block;
          box-sizing: border-box;
          background: #d62f69;
        }
        .solid-preview-large {
          width: var(--action-size-large);
          height: var(--action-size-large);
          border-radius: var(--form-radius-large);
        }
        .solid-preview-medium {
          width: var(--action-size-medium);
          height: var(--action-size-medium);
          border-radius: var(--form-radius-medium);
        }
        .solid-preview-small {
          width: var(--action-size-small);
          height: var(--action-size-small);
          border-radius: var(--form-radius-small);
        }
        .solid-preview-x-small {
          width: var(--action-size-x-small);
          height: var(--action-size-x-small);
          border-radius: var(--form-radius-x-small);
        }
        .outline-preview {
          display: block;
          box-sizing: border-box;
          border-radius: var(--form-radius-medium);
          border: var(--border-thick);
          border-color: #79747e;
        }
        .outline-preview-large {
          width: var(--action-size-large);
          height: var(--action-size-large);
        }
        .outline-preview-medium {
          width: var(--action-size-medium);
          height: var(--action-size-medium);
        }
        .outline-preview-small {
          width: var(--action-size-small);
          height: var(--action-size-small);
        }
        .outline-preview-x-small {
          width: var(--action-size-x-small);
          height: var(--action-size-x-small);
        }
      </style>
      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${(data.github || []).join("|||")}"
        figma="${(data.figma || []).join("|||")}"
        guides="${(data.guides || []).join("|||")}"
        storybook="${(data.storybook || []).join("|||")}"
        accessibility="${(data.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-color-input"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;

    this.bindPreviews();
  }

  bindPreviews() {
    const sizes = ["large", "medium", "small", "x-small"];
    const bindings = sizes.flatMap((size) => [
      [
        `palette-primary-${size}`,
        `palette-primary-${size}-preview`,
        (preview, value) => preview.setAttribute("background-color", value),
      ],
      [
        `palette-badge-${size}`,
        `palette-badge-${size}-preview`,
        (preview, value) => preview.setAttribute("color", value),
      ],
      [
        `palette-solid-${size}`,
        `palette-solid-${size}-preview`,
        (preview, value) => {
          preview.style.background = value;
        },
      ],
      [
        `palette-secondary-${size}`,
        `palette-secondary-${size}-preview`,
        (preview, value) => preview.style.setProperty("--heading-text-color", value),
      ],
      [
        `palette-outline-${size}`,
        `palette-outline-${size}-preview`,
        (preview, value) => {
          preview.style.borderColor = value;
        },
      ],
    ]);

    bindings.forEach(([inputId, previewId, apply]) => {
      const input = this.shadowRoot.getElementById(inputId);
      const preview = this.shadowRoot.getElementById(previewId);
      input?.addEventListener("input", (event) => apply(preview, event.detail.value));
    });
  }
}

customElements.define("story-color-input", StoryColorInput);
