import { getComponentDocs } from "../../../utils/story-data";

class storyFileUpload extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FileUpload");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "acceptedFileTypes",
        type: "string",
        options: "any",
        default: "",
        description: "Comma-separated list of accepted file types (.jpg, .pdf)",
      },
      {
        name: "currentFileName",
        type: "string",
        options: "any",
        default: "",
        description: "Initial text to display when no file has been selected.",
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
          import "@muibook/components/mui-file-upload";<br>
        </mui-code>
      </spec-card>

      <props-card title="File Upload">
        <mui-responsive breakpoint="768" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card 
        title="Default"
        description="A simple file input that displays the selected file name and emits a file-upload event."
        usageLink="https://guides.muibook.com/file-upload"
      >
        <mui-file-upload slot="body"
          acceptedFileTypes=".pdf,.jpg"
          currentFileName="No file selected"
        ></mui-file-upload>
        <story-code-block slot="footer" scrollable>
          &lt;mui-file-upload<br />
          &nbsp;&nbsp;acceptedFileTypes=".pdf,.jpg"<br />
          &nbsp;&nbsp;currentFileName="No file selected"<br />
          &gt;&lt;/mui-file-upload&gt;
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

customElements.define("story-file-upload", storyFileUpload);
