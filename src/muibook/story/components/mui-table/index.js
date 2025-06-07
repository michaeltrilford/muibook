class storyTable extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const Columns = `1fr 1fr 1fr auto`;

    const propItems = [
      {
        name: "text",
        required: true,
        type: "string",
        options: "{text}",
        default: "",
        description: "Provides the text for the cell element",
      },
      {
        name: "heading",
        type: "boolean",
        options: "",
        default: "",
        description: "Define the heading styles for the table",
      },
      {
        name: "class",
        type: "CSS class",
        options: "card-slot",
        default: "",
        description:
          "By default, when Table is slotted into the mui-card, padding is automatically added. However, if the mui-accordion is nested within a shadow dom, you have to apply the class for correct padding",
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
              style="position: relative; z-index: 1;" 
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
        title="Table"
        description="An HTML table consists of one table element and one or more tr, th, and td elements."
        github="https://github.com/michaeltrilford/muibook/tree/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-table"
      >

        <mui-v-stack space="var(--space-700)">

        <spec-card title="Props: Cell">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

          <story-card title="Table">
            <mui-table slot="body">
              <mui-row-group heading>
                <mui-row columns="1fr 1fr 1fr auto">
                  <mui-cell heading>Office</mui-cell>
                  <mui-cell heading>Revenue</mui-cell>
                  <mui-cell heading>Cost</mui-cell>
                  <mui-cell heading action>
                  </mui-cell>
                </mui-row>
              </mui-row-group>
              <mui-row-group>
                <mui-row columns="1fr 1fr 1fr auto">
                  <mui-cell data-label="Office:">Whalen</mui-cell>
                  <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                  <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                  <mui-cell data-label="" action>
                    <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                  </mui-cell>
                </mui-row>
                <mui-row columns="1fr 1fr 1fr auto">
                  <mui-cell data-label="Office:">Whalen</mui-cell>
                  <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                  <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                  <mui-cell data-label="" action>
                    <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                  </mui-cell>
                </mui-row>
              </mui-row-group>
            </mui-table>
            <mui-code slot="footer">
              &lt;mui-table&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-row-group heading&gt;
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="1fr 1fr 1fr 1fr"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;...&lt;/mui-cell&gt;
                  <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
              &nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-row-group&gt;
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="1fr 1fr 1fr 1fr"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
              &nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              &lt;/mui-table&gt;
            </mui-code>
          </story-card>

          <story-card title="Responsive table">


            <mui-responsive breakpoint="1024" slot="body">
              <mui-table slot="showAbove">
                <mui-row-group heading>
                  <mui-row columns="1fr 1fr 1fr auto">
                    <mui-cell heading>Office</mui-cell>
                    <mui-cell heading>Revenue</mui-cell>
                    <mui-cell heading>Cost</mui-cell>
                    <mui-cell heading action>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
                <mui-row-group>
                  <mui-row columns="1fr 1fr 1fr auto">
                    <mui-cell data-label="Office:">Whalen</mui-cell>
                    <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                    <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                    <mui-cell data-label="" action>
                      <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                    </mui-cell>
                  </mui-row>
                  <mui-row columns="1fr 1fr 1fr auto">
                    <mui-cell data-label="Office:">Whalen</mui-cell>
                    <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                    <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                    <mui-cell data-label="" action>
                      <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                    </mui-cell>
                  </mui-row>
                </mui-row-group>
              </mui-table>

              <mui-slat slot="showBelow">
                <mui-heading slot="start" size="6">Whalen</mui-heading>      
                <mui-h-stack space="var(--space-800)" alignX="flex-end" alignY="center" slot="end">
                  <mui-v-stack space="var(--space-000)">
                    <mui-h-stack space="var(--space-400)" alignX="flex-end">
                      <mui-body weight="bold" size="small">Revenue:</mui-body>
                      <mui-body size="small">$4,400.00</mui-body>
                    </mui-h-stack>
                    <mui-h-stack space="var(--space-400)" alignX="flex-end">
                      <mui-body weight="bold" size="small">Cost:</mui-body>
                      <mui-body size="small">$1,100.00</mui-body>
                    </mui-h-stack>
                  </mui-v-stack>
                  <mui-button variant="tertiary" > <mui-icon-menu size="x-small"></mui-icon-menu></mui-button>
                </mui-h-stack>
              </mui-slat>
              <mui-rule slot="showBelow" direction="horizontal" length="100%" style="margin: var(--space-300) 0;"></mui-rule>
              <mui-slat slot="showBelow">      
                <mui-heading slot="start" size="6">Whalen</mui-heading>      
                <mui-h-stack space="var(--space-800)" alignX="flex-end" alignY="center" slot="end">
                  <mui-v-stack space="var(--space-000)">
                    <mui-h-stack space="var(--space-400)" alignX="flex-end">
                      <mui-body weight="bold" size="small">Revenue:</mui-body>
                      <mui-body size="small">$4,400.00</mui-body>
                    </mui-h-stack>
                    <mui-h-stack space="var(--space-400)" alignX="flex-end">
                      <mui-body weight="bold" size="small">Cost:</mui-body>
                      <mui-body size="small">$1,100.00</mui-body>
                    </mui-h-stack>
                  </mui-v-stack>
                  <mui-button variant="tertiary" > <mui-icon-menu size="x-small"></mui-icon-menu></mui-button>
                </mui-h-stack>
              </mui-slat>
            </mui-responsive>


            <mui-code slot="footer">
            <br />
            &lt;mui-responsive breakpoint="1024"&gt;
            <br />
              &nbsp;&nbsp;&lt;mui-table slot="showAbove"&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group heading&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="1fr 1fr 1fr 1fr"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="1fr 1fr 1fr 1fr"&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;...&lt;/mui-cell&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;
              <br />
              &nbsp;&nbsp;&lt;/mui-table&gt;
              <br />
              <br />
              &nbsp;&nbsp;&lt;mui-slat slot="showBelow"&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="5"&gt;Heading&lt;/mui-heading&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="end" width="20px"&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" space="var(--space-400)" alignX="flex-end"&gt;
                  <br />  
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body width="20px"&gt;Body&lt;/mui-body&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body width="20px"&gt;Body&lt;/mui-body&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
                <br />
                &nbsp;&nbsp;&lt;/mui-slat&gt;
                <br />




              <br />
              &lt;/mui-responsive&gt;
            </mui-code>


          </story-card>

        <story-card title="Card w/ Table">
          <div slot="body">
            <mui-card>
              <mui-card-body>
                <mui-table>
                  <mui-row-group heading>
                    <mui-row columns="${Columns}">
                      <mui-cell heading>Office</mui-cell>
                      <mui-cell heading>Revenue</mui-cell>
                      <mui-cell heading>Cost</mui-cell>
                      <mui-cell heading action>
                      </mui-cell>
                    </mui-row>
                  </mui-row-group>
                  <mui-row-group>
                    <mui-row columns="${Columns}">
                      <mui-cell data-label="Office:">Whalen</mui-cell>
                      <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                      <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                      <mui-cell data-label="" action>
                        <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                    <mui-row columns="${Columns}">
                      <mui-cell data-label="Office:">Whalen</mui-cell>
                      <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                      <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                      <mui-cell data-label="" action>
                        <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                  </mui-row-group>
                </mui-table>
              </mui-card-body>
            </mui-card>
          </div>
          <mui-code slot="footer">
            const Columns = &#96;1fr 1fr 1fr auto&#96;;<br>
            <br>
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-table&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Office&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Revenue&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Cost&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading action&gt;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Office:"&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Revenue:"&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Cost:"&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="" action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add size="small"&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Office:"&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Revenue:"&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Cost:"&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="" action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add size="small"&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-table&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-footer&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-code&gt;&lt;/mui-code&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-footer&gt;<br>
            &lt;/mui-card&gt;
          </mui-code>
        </story-card>

        <story-card title="Card Header w/ Table" description="You can add in a mui-rule to help add a division between the header and body of the card">
          <div slot="body">
            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Title</mui-heading>
              </mui-card-header>
              <mui-rule></mui-rule>
              <mui-card-body>
                <mui-table>
                  <mui-row-group heading>
                    <mui-row columns="${Columns}">
                      <mui-cell heading>Office</mui-cell>
                      <mui-cell heading>Revenue</mui-cell>
                      <mui-cell heading>Cost</mui-cell>
                      <mui-cell heading action>
                      </mui-cell>
                    </mui-row>
                  </mui-row-group>
                  <mui-row-group>
                    <mui-row columns="${Columns}">
                      <mui-cell data-label="Office:">Whalen</mui-cell>
                      <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                      <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                      <mui-cell data-label="" action>
                        <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                    <mui-row columns="${Columns}">
                      <mui-cell data-label="Office:">Whalen</mui-cell>
                      <mui-cell data-label="Revenue:">$4,400.00</mui-cell>
                      <mui-cell data-label="Cost:">$1,100.00</mui-cell>
                      <mui-cell data-label="" action>
                        <mui-button variant="tertiary" > <mui-icon-add size="small"></mui-icon-add></mui-button>
                      </mui-cell>
                    </mui-row>
                  </mui-row-group>
                </mui-table>
              </mui-card-body>
            </mui-card>
          </div>
          <mui-code slot="footer">
            const Columns = &#96;1fr 1fr 1fr auto&#96;;<br>
            <br>
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;Title&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-table&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Office&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Revenue&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading&gt;Cost&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell heading action&gt;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Office:"&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Revenue:"&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Cost:"&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="" action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add size="small"&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row columns="\${Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Office:"&gt;Whalen&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Revenue:"&gt;$4,400.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="Cost:"&gt;$1,100.00&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell data-label="" action&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" &gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add size="small"&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-table&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </mui-code>
        </story-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-table", storyTable);
