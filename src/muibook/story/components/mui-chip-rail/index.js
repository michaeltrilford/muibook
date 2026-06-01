import { getComponentDocs } from "../../../utils/story-data";

class storyChipRail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ChipRail");

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

    const propItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "mui-chip",
        default: "",
        description: "Chip items rendered in the horizontal rail.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Controls rail action sizing and pushes the same size to slotted chips.",
      },
      {
        name: "bleed",
        type: "string",
        options: "none, 000-800, CSS length",
        default: "none",
        description: "Sets the inline bleed size shorthand. Token values map to space tokens; raw CSS values are supported.",
      },
      {
        name: "bleed-inline-size",
        type: "string",
        options: "none, 000-800, CSS length",
        default: "none",
        description: "Controls inline bleed padding and edge mask reach.",
      },
      {
        name: "bleed-block-size",
        type: "string",
        options: "none, 000-800, CSS length",
        default: "none",
        description: "Controls block bleed padding around the rail.",
      },
      {
        name: "aria-label",
        type: "string",
        options: "{text}",
        default: "Chip rail",
        description: "Labels the scrollable rail for assistive technology.",
      },
    ];

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

      <story-card
        title="Default"
        description="A horizontal rail for filters, quicklinks, and compact category navigation."
        usage="Use Chip Rail when chip items should stay on one line and scroll horizontally.|||The rail automatically shows previous and next actions only when overflow exists."
        canvas-background="var(--surface-elevated-100)"
      >
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

      <story-card
        title="Sizes"
        description="The rail size is pushed to the slotted chips and internal arrow actions."
        canvas-background="var(--surface-elevated-100)"
      >
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

      <story-card
        title="Bleed"
        description="Use bleed sizing when the rail needs internal edge space for overflow controls."
        usage="Use bleed-inline-size for horizontal edge space.|||Use bleed-block-size when the rail needs vertical breathing room too."
        canvas-background="var(--surface-elevated-200)"
      >
        <div slot="body" class="bleed-canvas">
          <mui-chip-rail size="small" bleed-inline-size="300" bleed-block-size="300" aria-label="Bleed filters" style="--chip-rail-background: var(--surface-elevated-200);">
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
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-chip-rail", storyChipRail);
