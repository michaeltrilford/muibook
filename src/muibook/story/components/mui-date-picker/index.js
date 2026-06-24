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
          links="default::Default|||datetimeslot::Date & Timeslot"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-date-picker", storyDatePicker);
