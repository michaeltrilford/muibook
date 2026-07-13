import { getComponentDocs } from "../../../utils/story-data";

class storyDatePicker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("DatePicker");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Date Picker"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-date-picker" title="Date Picker"></story-api-types>

        <story-card id="date-picker" title="${storyMeta["date-picker"].title}" description="${storyMeta["date-picker"].description}" usage="${storyMeta["date-picker"].usage}">
          <mui-h-stack slot="body" alignX="center">
            <mui-date-picker label="Select Date"></mui-date-picker>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-date-picker label="Select Date"&gt;&lt;/mui-date-picker&gt;
          </story-code-block>
        </story-card>

        <story-card id="date-and-timeslot" title="${storyMeta["date-and-timeslot"].title}" description="${storyMeta["date-and-timeslot"].description}" usage="${storyMeta["date-and-timeslot"].usage}">
          <mui-h-stack slot="body" alignX="center">
            <mui-date-picker type="datetimeslot" label="Date & Timeslot"></mui-date-picker>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-date-picker type="datetimeslot" label="Date & Timeslot"&gt;&lt;/mui-date-picker&gt;
          </story-code-block>
        </story-card>

        <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
          <mui-v-stack slot="body">
            <mui-date-picker size="x-small" label="X-small date" value="2026-07-09"></mui-date-picker>
            <mui-date-picker size="small" label="Small date" value="2026-07-09"></mui-date-picker>
            <mui-date-picker size="medium" label="Medium date" value="2026-07-09"></mui-date-picker>
            <mui-date-picker size="large" label="Large date" value="2026-07-09"></mui-date-picker>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-date-picker size=&quot;x-small&quot; label=&quot;X-small date&quot;&gt;&lt;/mui-date-picker&gt;<br />
            &lt;mui-date-picker size=&quot;small&quot; label=&quot;Small date&quot;&gt;&lt;/mui-date-picker&gt;<br />
            &lt;mui-date-picker size=&quot;medium&quot; label=&quot;Medium date&quot;&gt;&lt;/mui-date-picker&gt;<br />
            &lt;mui-date-picker size=&quot;large&quot; label=&quot;Large date&quot;&gt;&lt;/mui-date-picker&gt;
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

        imports='["@muibook/components/mui-date-picker"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-date-picker", storyDatePicker);
