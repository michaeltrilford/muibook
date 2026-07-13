import { getComponentDocs } from "../../../utils/story-data";

class storyCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Calendar");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Calendar"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-calendar" title="Calendar"></story-api-types>

        <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
          <mui-h-stack slot="body" alignX="center">
            <mui-calendar></mui-calendar>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-calendar&gt;&lt;/mui-calendar&gt;
          </story-code-block>
        </story-card>

        <story-card id="double-view" title="${storyMeta["double-view"].title}" description="${storyMeta["double-view"].description}" usage="${storyMeta["double-view"].usage}">
          <mui-h-stack slot="body" alignX="center">
            <mui-calendar view="double"></mui-calendar>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-calendar view="double"&gt;&lt;/mui-calendar&gt;
          </story-code-block>
        </story-card>

        <story-card id="default-value" title="${storyMeta["default-value"].title}" description="${storyMeta["default-value"].description}" usage="${storyMeta["default-value"].usage}">
          <mui-h-stack slot="body" alignX="center">
            <mui-calendar value="2026-06-24"></mui-calendar>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-calendar value="2026-06-24"&gt;&lt;/mui-calendar&gt;
          </story-code-block>
        </story-card>

      `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"

        imports='["@muibook/components/mui-calendar"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-calendar", storyCalendar);
