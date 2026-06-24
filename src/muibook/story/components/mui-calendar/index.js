import { getComponentDocs } from "../../../utils/story-data";

class storyCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Calendar");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-calendar" title="Calendar"></story-api-types>

        <story-card 
          id="default"
          title="Default" 
          description="A standard monthly calendar for single date selection." 
        >
          <mui-h-stack slot="body" alignX="center">
            <mui-calendar></mui-calendar>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-calendar&gt;&lt;/mui-calendar&gt;
          </story-code-block>
        </story-card>

        <story-card 
          id="double-view"
          title="Double View" 
          description="Shows two consecutive months side-by-side, ideal for range selection." 
        >
          <mui-h-stack slot="body" alignX="center">
            <mui-calendar view="double"></mui-calendar>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-calendar view="double"&gt;&lt;/mui-calendar&gt;
          </story-code-block>
        </story-card>

        <story-card 
          id="default-value"
          title="Default Value" 
          description="Set the initial selected date using an ISO date string." 
        >
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
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="default::Default|||double-view::Double View|||default-value::Default Value"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-calendar", storyCalendar);
