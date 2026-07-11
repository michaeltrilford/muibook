import { getComponentDocs } from "../../../utils/story-data";

class storyDatePicker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("DatePicker");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-date-picker" title="Date Picker"></story-api-types>

        <story-card
          id="default"
          title="Date picker"
          description="A standard date picker using the default type='date'."
        >
          <mui-h-stack slot="body" alignX="center">
            <mui-date-picker label="Select Date"></mui-date-picker>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-date-picker label="Select Date"&gt;&lt;/mui-date-picker&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="datetimeslot"
          title="Date & Timeslot"
          description="Combine the calendar and timeslot picker using type='datetimeslot'."
        >
          <mui-h-stack slot="body" alignX="center">
            <mui-date-picker type="datetimeslot" label="Date & Timeslot"></mui-date-picker>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-date-picker type="datetimeslot" label="Date & Timeslot"&gt;&lt;/mui-date-picker&gt;
          </story-code-block>
        </story-card>

        <story-card id="sizes" title="Sizes" description="Date Picker supports x-small, small, medium, and large input sizes.">
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
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="default::Default|||sizes::Sizes|||datetimeslot::Date & Timeslot"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-date-picker", storyDatePicker);
