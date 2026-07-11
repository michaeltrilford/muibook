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
        </story-card>

        <story-card id="sizes" title="Sizes" description="Time Picker supports x-small, small, medium, and large input sizes.">
          <mui-v-stack slot="body">
            <mui-time-picker size="x-small" label="X-small time" type="time" value="09:30"></mui-time-picker>
            <mui-time-picker size="small" label="Small time" type="time" value="09:30"></mui-time-picker>
            <mui-time-picker size="medium" label="Medium time" type="time" value="09:30"></mui-time-picker>
            <mui-time-picker size="large" label="Large time" type="time" value="09:30"></mui-time-picker>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-time-picker size=&quot;x-small&quot; label=&quot;X-small time&quot; type=&quot;time&quot;&gt;&lt;/mui-time-picker&gt;<br />
            &lt;mui-time-picker size=&quot;small&quot; label=&quot;Small time&quot; type=&quot;time&quot;&gt;&lt;/mui-time-picker&gt;<br />
            &lt;mui-time-picker size=&quot;medium&quot; label=&quot;Medium time&quot; type=&quot;time&quot;&gt;&lt;/mui-time-picker&gt;<br />
            &lt;mui-time-picker size=&quot;large&quot; label=&quot;Large time&quot; type=&quot;time&quot;&gt;&lt;/mui-time-picker&gt;
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
          links="default::Default|||sizes::Sizes|||timeslot::Time Slot"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-time-picker", storyTimePicker);
