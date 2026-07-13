import { getComponentDocs } from "../../../utils/story-data";

class storyChipInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ChipInput");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Chip Input"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-chip-input" title="Chip Input"></story-api-types>

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <div slot="body">
          <mui-chip-input
            label="Tags"
            placeholder="Type and select"
            options='["Video","Image","Audio","Docs","Tutorial"]'
            value='["Image","Docs"]'
          ></mui-chip-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input
          <br />
          &nbsp;&nbsp;label="Tags"
          <br />
          &nbsp;&nbsp;placeholder="Type and select"
          <br />
          &nbsp;&nbsp;options='["Video","Image","Audio","Docs","Tutorial"]'
          <br />
          &nbsp;&nbsp;value='["Image","Docs"]'
          <br />
          &gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="allow-custom" title="${storyMeta["allow-custom"].title}" description="${storyMeta["allow-custom"].description}" usage="${storyMeta["allow-custom"].usage}">
        <div slot="body">
          <mui-chip-input
            label="Topics"
            placeholder="Type then press enter"
            options='["Design","Accessibility","Performance"]'
            allow-custom
          ></mui-chip-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input
          <br />
          &nbsp;&nbsp;label="Topics"
          <br />
          &nbsp;&nbsp;placeholder="Type then press enter"
          <br />
          &nbsp;&nbsp;options='["Design","Accessibility","Performance"]'
          <br />
          &nbsp;&nbsp;allow-custom
          <br />
          &gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="breakpoint-layout" title="${storyMeta["breakpoint-layout"].title}" description="${storyMeta["breakpoint-layout"].description}" usage="${storyMeta["breakpoint-layout"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-chip-input
            label="Before @ 900"
            breakpoint="900"
            options='["Video","Image","Audio","Docs","Tutorial"]'
            value='["Image","Docs","Audio"]'
          ></mui-chip-input>
          <mui-chip-input
            label="After @ 900"
            placement="after"
            breakpoint="900"
            options='["Video","Image","Audio","Docs","Tutorial"]'
            value='["Image","Docs","Audio"]'
          ></mui-chip-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input label="Before @ 900" breakpoint="900" ...&gt;&lt;/mui-chip-input&gt;<br />
          &lt;mui-chip-input label="After @ 900" placement="after" breakpoint="900" ...&gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="object-data" title="${storyMeta["object-data"].title}" description="${storyMeta["object-data"].description}" usage="${storyMeta["object-data"].usage}">
        <div slot="body">
          <mui-chip-input
            label="Assets"
            options='[
              {"value":"vid_1","label":"Video","type":"media"},
              {"value":"img_1","label":"Image","type":"media"},
              {"value":"doc_1","label":"Docs","type":"resource"}
            ]'
            value='[
              {"value":"img_1","label":"Image","type":"media"},
              {"value":"doc_1","label":"Docs","type":"resource"}
            ]'
          ></mui-chip-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input label="Assets" options='[{...}]' value='[{...}]'&gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-chip-input size="x-small" label="X-Small" options='["Alpha","Beta","Gamma"]' value='["Alpha"]'></mui-chip-input>
          <mui-chip-input size="small" label="Small" options='["Alpha","Beta","Gamma"]' value='["Beta"]'></mui-chip-input>
          <mui-chip-input size="medium" label="Medium" options='["Alpha","Beta","Gamma"]' value='["Gamma"]'></mui-chip-input>
          <mui-chip-input size="large" label="Large" options='["Alpha","Beta","Gamma"]' value='["Beta"]'></mui-chip-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input size="x-small" label="X-Small" options='["Alpha","Beta","Gamma"]' value='["Alpha"]'&gt;&lt;/mui-chip-input&gt;<br />
          &lt;mui-chip-input size="small" label="Small" options='["Alpha","Beta","Gamma"]' value='["Beta"]'&gt;&lt;/mui-chip-input&gt;<br />
          &lt;mui-chip-input size="medium" label="Medium" options='["Alpha","Beta","Gamma"]' value='["Gamma"]'&gt;&lt;/mui-chip-input&gt;<br />
          &lt;mui-chip-input size="large" label="Large" options='["Alpha","Beta","Gamma"]'&gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="disabled" title="${storyMeta["disabled"].title}" description="${storyMeta["disabled"].description}" usage="${storyMeta["disabled"].usage}">
        <div slot="body">
          <mui-chip-input
            label="Disabled"
            options='["One","Two","Three"]'
            value='["One","Two"]'
            disabled
          ></mui-chip-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip-input label="Disabled" options='["One","Two","Three"]' value='["One","Two"]' disabled&gt;&lt;/mui-chip-input&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data?.title || "Chip Input"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"

        imports='["@muibook/components/mui-chip-input"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-chip-input", storyChipInput);
