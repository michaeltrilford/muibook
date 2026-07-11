import { getComponentDocs } from "../../../utils/story-data";

class StoryRangeInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("RangeInput");

    const stories = /*html*/ `
      <story-api-types tag="mui-range-input" title="Range Input"></story-api-types>

      <story-card id="default" title="Default" description="Numeric range input with a custom track and thumb.">
        <mui-range-input slot="body" min="0" max="100" value="40" step="1" label="Volume"></mui-range-input>
        <story-code-block slot="footer" scrollable>
          &lt;mui-range-input min="0" max="100" value="40" step="1" label="Volume"&gt;&lt;/mui-range-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="bubble" title="Bubble + Time Format" description="Shows formatted bubble for scrubber usage.">
        <mui-range-input slot="body" min="0" max="320" value="74" step="1" bubble bubble-format="time" label="Seek"></mui-range-input>
        <story-code-block slot="footer" scrollable>
          &lt;mui-range-input min="0" max="320" value="74" bubble bubble-format="time" label="Seek"&gt;&lt;/mui-range-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="Sizes" description="Range Input scales its thumb and track from x-small through large; medium preserves the original size.">
        <mui-v-stack slot="body">
          <mui-range-input size="x-small" min="0" max="100" value="40" label="X-small volume"></mui-range-input>
          <mui-range-input size="small" min="0" max="100" value="40" label="Small volume"></mui-range-input>
          <mui-range-input size="medium" min="0" max="100" value="40" label="Medium volume"></mui-range-input>
          <mui-range-input size="large" min="0" max="100" value="40" label="Large volume"></mui-range-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-range-input size=&quot;x-small&quot; min=&quot;0&quot; max=&quot;100&quot; value=&quot;40&quot; label=&quot;X-small volume&quot;&gt;&lt;/mui-range-input&gt;<br />
          &lt;mui-range-input size=&quot;small&quot; min=&quot;0&quot; max=&quot;100&quot; value=&quot;40&quot; label=&quot;Small volume&quot;&gt;&lt;/mui-range-input&gt;<br />
          &lt;mui-range-input size=&quot;medium&quot; min=&quot;0&quot; max=&quot;100&quot; value=&quot;40&quot; label=&quot;Medium volume&quot;&gt;&lt;/mui-range-input&gt;<br />
          &lt;mui-range-input size=&quot;large&quot; min=&quot;0&quot; max=&quot;100&quot; value=&quot;40&quot; label=&quot;Large volume&quot;&gt;&lt;/mui-range-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="disabled" title="Disabled" description="Disabled state for read-only displays.">
        <mui-range-input slot="body" min="0" max="100" value="25" disabled label="Disabled range"></mui-range-input>
        <story-code-block slot="footer" scrollable>
          &lt;mui-range-input min="0" max="100" value="25" disabled label="Disabled range"&gt;&lt;/mui-range-input&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; }
      </style>
      <story-template
        title="${data?.title || "Range Input"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"

        imports='["@muibook/components/mui-range-input"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||sizes::Sizes|||bubble::Bubble + Time Format|||disabled::Disabled"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-range-input", StoryRangeInput);
