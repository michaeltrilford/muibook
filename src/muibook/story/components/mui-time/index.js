import { getComponentDocs } from "../../../utils/story-data";

class storyTime extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Time");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Time"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-time" title="Time"></story-api-types>

        <story-card id="default-dial" title="${storyMeta["default-dial"].title}" description="${storyMeta["default-dial"].description}" usage="${storyMeta["default-dial"].usage}">
          <mui-v-stack slot="body">
            <mui-time value="10:30 AM"></mui-time>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-time value="10:30 AM"&gt;&lt;/mui-time&gt;
          </story-code-block>
        </story-card>

        <story-card id="time-slots" title="${storyMeta["time-slots"].title}" description="${storyMeta["time-slots"].description}" usage="${storyMeta["time-slots"].usage}">
          <mui-v-stack slot="body">
            <mui-time variant="slots" start="9" end="17" step="30"></mui-time>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-time variant="slots" start="9" end="17" step="30"&gt;&lt;/mui-time&gt;
          </story-code-block>
        </story-card>`;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data?.title || 'Time'}"
        description="${data?.description || 'A standalone time component.'}"
        github="${data?.github || ''}"
        figma="${data?.figma || ''}"
        guides="${data?.guides || ''}"
        storybook="${data?.storybook || ''}"
        accessibility="${data?.accessibility?.engineerList?.join("|||") || ''}"

        imports='["@muibook/components/mui-time"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-time", storyTime);
