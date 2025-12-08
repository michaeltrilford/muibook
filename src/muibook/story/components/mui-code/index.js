import { getComponentDocs } from "../../../utils/story-data";

class storyCode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Code");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Content for the code element.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "x-small",
        description: "Set the size of the code text.",
      },
      {
        name: "scrollable",
        type: "boolean",
        options: "scrollable",
        default: "",
        description: "Ensure the content is horizontally scrollable.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            ${prop.required ? "required" : ""}
            name="${prop.name}"
            type="${prop.type}" 
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";

        return /*html*/ `
          <mui-accordion-block 
            size="medium" 
            heading=${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)} 
            ${isLastChild}>
            <story-type-slat
              slot="detail"
              ${prop.required ? "required" : ""}
              name="${prop.name}"
              type="${prop.type}" 
              options="${prop.options || ""}"
              default="${prop.default || ""}"
              description="${prop.description}">
            </story-type-slat>
          </mui-accordion-block>
        `;
      })
      .join("");

    const stories = /*html*/ `
        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-code";<br>
          </mui-code>
        </spec-card>


          <props-card title="Code">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${rows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>

        <story-card title="Large">
          <div slot="body">
            <mui-code size="large">
              A tooltip drifted so far from its anchor it was officially lost at sea.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="large"&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

       <story-card title="Medium">
          <div slot="body">
            <mui-code size="medium">
              The modal refused to close, holding focus hostage forever.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="medium"&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

        <story-card title="Small">
          <div slot="body">
            <mui-code size="small">
              The fox tried to tab into a hidden element, but focus was trapped in a loop.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="small"&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

        <story-card title="X-Small">
          <div slot="body">
            <mui-code size="x-small">
              A rogue component ignored the theme and styled itself in pure chaos.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="x-small"&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

        <story-card title="Scrollable" 
          description="When using the scrollable option, you’re likely displaying large code examples. Please ensure your content is properly formatted with line breaks and spacing. This component provides minimal formatting support, so you’ll need to handle this yourself or consider using a more advanced third-party code viewer." 
          usage="
             Line wrapping is disabled when scrollable is set;
              Use the nbsp element to insert non-breaking spaces;
              Use br element to manually add line breaks;
              Structure and format your code manually to ensure readability
          "
          >
          <div slot="body">
            <mui-code size="large" scrollable>
              A tooltip drifted so far from its anchor it was officially lost at sea.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="large" scrollable&gt;...&lt;/mui-code&gt;
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
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-code", storyCode);
