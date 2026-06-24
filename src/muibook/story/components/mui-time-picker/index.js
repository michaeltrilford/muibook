import { getComponentDocs } from "../../../utils/story-data";

class storyTimePicker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("TimePicker");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-time-picker" title="Time Picker"></story-api-types>

        <story-card 
          id="default"
          title="Default" 
          description="A composition time picker input with a scrolling wheels popover." 
        >
          <mui-v-stack slot="body">
            <mui-time-picker label="Time" type="time"></mui-time-picker>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-time-picker label="Time" type="time"&gt;&lt;/mui-time-picker&gt;
          </story-code-block>
        </story-card>

        <story-card 
          id="timeslot"
          title="Time Slot" 
          description="Use type='timeslot' to show discrete time chips." 
        >
          <mui-v-stack slot="body">
            <mui-time-picker label="Select Appointment" type="timeslot"></mui-time-picker>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-time-picker label="Select Appointment" type="timeslot"&gt;&lt;/mui-time-picker&gt;
          </story-code-block>
        </story-card>`;

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
      
        imports='["@muibook/components/mui-time-picker"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="default::Default|||timeslot::Time Slot"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-time-picker", storyTimePicker);
