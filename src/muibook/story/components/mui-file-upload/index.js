class storyFileUpload extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="File Upload"
        description="A simple file input that displays the selected file name and emits a file-upload event."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-file-upload/index.ts"
        guides="https://guides.muibook.com/file-upload"
      >

        <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small" scrollable>
              import "@muibook/components/mui-file-upload";<br>
            </mui-code>
          </spec-card>

          <spec-card title="Props">
            <mui-responsive breakpoint="768" slot="body">
              <story-type-table slot="showAbove">
                ${rows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

          <story-card 
            title="Default"
            description="A simple file input that displays the selected file name and emits a file-upload event."
            usageLink="https://guides.muibook.com/file-upload"
          >
            <mui-file-upload slot="body"
              acceptedFileTypes=".pdf,.jpg"
              currentFileName="No file selected"
            ></mui-file-upload>
            <mui-code slot="footer" scrollable>
              &lt;mui-file-upload<br />
              &nbsp;&nbsp;acceptedFileTypes=".pdf,.jpg"<br />
              &nbsp;&nbsp;currentFileName="No file selected"<br />
              &gt;&lt;/mui-file-upload&gt;
            </mui-code>
          </story-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-file-upload", storyFileUpload);
