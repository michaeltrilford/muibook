import { getComponentDocs } from "../../../utils/story-data";

class storyChipRail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ChipRail");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Chip Rail"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }

      .rail-canvas {
        width: 100%;
        min-width: 0;
        max-width: 100%;
      }

      .bleed-canvas {
        width: 100%;
        min-width: 0;
        max-width: 100%;
      }
    `;

    const attrsReference = JSON.stringify([
      {
        component: "mui-chip-rail",
        parentAttrs: [],
        childAttrs: [],
      },
    ]);

    const chipItems = /*html*/ `
      <mui-chip active variant="clickable">All</mui-chip>
      <mui-chip variant="clickable">Gaming</mui-chip>
      <mui-chip variant="clickable">Podcasts</mui-chip>
      <mui-chip variant="clickable">Thrillers</mui-chip>
      <mui-chip variant="clickable">Marco Pierre White</mui-chip>
      <mui-chip variant="clickable">Italian cuisine</mui-chip>
      <mui-chip variant="clickable">Roasting</mui-chip>
      <mui-chip variant="clickable">Music</mui-chip>
      <mui-chip variant="clickable">Satire</mui-chip>
      <mui-chip variant="clickable">Hamburgers</mui-chip>
      <mui-chip variant="clickable">Japan</mui-chip>
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-chip-rail" title="Chip Rail"></story-api-types>

      <story-card canvas-background="var(--surface)" id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <div slot="body" class="rail-canvas">
          <mui-chip-rail aria-label="Video filters">
            ${chipItems}
          </mui-chip-rail>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-rail aria-label="Video filters"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip active variant="clickable"&gt;All&lt;/mui-chip&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip variant="clickable"&gt;Gaming&lt;/mui-chip&gt;<br />
          &nbsp;&nbsp;...<br />
          &lt;/mui-chip-rail&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-background="var(--surface)" id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <mui-v-stack slot="body" width="100%" alignx="stretch" space="var(--space-400)" class="rail-canvas">
          <mui-chip-rail size="x-small" aria-label="X-small filters">
            ${chipItems}
          </mui-chip-rail>
          <mui-chip-rail size="small" aria-label="Small filters">
            ${chipItems}
          </mui-chip-rail>
          <mui-chip-rail size="medium" aria-label="Medium filters">
            ${chipItems}
          </mui-chip-rail>
          <mui-chip-rail size="large" aria-label="Large filters">
            ${chipItems}
          </mui-chip-rail>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-rail size="small"&gt;...&lt;/mui-chip-rail&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-background="var(--surface)" id="card-surface" title="${storyMeta["card-surface"].title}" description="${storyMeta["card-surface"].description}" usage="${storyMeta["card-surface"].usage}">
        <mui-card slot="body">
          <mui-card-body>
            <mui-chip-rail aria-label="Card filters">
              ${chipItems}
            </mui-chip-rail>
          </mui-card-body>
        </mui-card>
        <story-code-block slot="footer" scrollable>
          &lt;mui-card&gt;<br />
          &nbsp;&nbsp;&lt;mui-card-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-chip-rail aria-label="Card filters"&gt;...&lt;/mui-chip-rail&gt;<br />
          &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
          &lt;/mui-card&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-background="var(--surface-recessed-100)" id="bleed" title="${storyMeta["bleed"].title}" description="${storyMeta["bleed"].description}" usage="${storyMeta["bleed"].usage}">
        <div slot="body" class="bleed-canvas">
          <mui-chip-rail size="small" bleed-inline-size="300" bleed-block-size="300" aria-label="Bleed filters" style="--chip-rail-background: var(--surface-recessed-100);">
            ${chipItems}
          </mui-chip-rail>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-rail size="small" bleed-inline-size="300" bleed-block-size="300"&gt;...&lt;/mui-chip-rail&gt;<br />
          &lt;mui-chip-rail bleed-inline-size="2.4rem"&gt;...&lt;/mui-chip-rail&gt;
        </story-code-block>
      </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data?.title || "Chip Rail"}"
        description="${data?.description || "A horizontal chip rail with scroll overflow controls."}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        attrs-reference='${attrsReference}'
        imports='["@muibook/components/mui-chip-rail", "@muibook/components/mui-chip"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-chip-rail", storyChipRail);
