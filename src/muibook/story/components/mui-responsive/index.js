class storyResponsive extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
      .local-ring {
        height: 6rem;
        display: flex;
        justify-content: center;
        width: 100%;
      }
      .local-ring_text {
        fill: #1b2830;
        font-size: 1.2rem;
        -webkit-transform: translateY(0.34em);
        transform: translateY(0.34em);
        font-weight: bold;
      }
    `;

    const propItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "{mui-elements}, {elements}",
        default: "(required)",
        description: "Slot in content into the items to be toggled based on breakpoints.",
      },
      {
        name: "breakpoint",
        type: "number",
        options: "768, 1024, 1200, etc...",
        default: "",
        description:
          "Only use with 'showBelow' & 'showAbove' named slots. A number that represents a single breakpoint that switches between two 'showAbove' | 'showBelow' views. You are able to nest, so you can be creative.",
      },
      {
        name: "breakpoint-low",
        type: "number",
        options: "599, etc...",
        default: "",
        description:
          "Only use with 'showBelow', 'showMiddle' & 'showAbove' named slots. A number that represents the breakpoint that switches to the 'showMiddle' view from the 'showBelow' view.",
      },
      {
        name: "breakpoint-high",
        type: "number",
        options: "1024, etc...",
        default: "",
        description:
          "Only use with 'showBelow', 'showMiddle' & 'showAbove' named slots. A number that represents the breakpoint that switches from the 'showMiddle' view to the 'showAbove' view.",
      },
      {
        name: "slot=&#8220;showAbove&#8221;",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Slot in an icon to appear before the text inside a button.",
      },
      {
        name: "slot=&#8220;showMiddle&#8221;",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Slot in an icon to appear before the text inside a button.",
      },
      {
        name: "slot=&#8220;showBelow&#8221;",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Slot in an icon to appear after the text inside a button.",
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

    const LocalRing = /*html*/ `
      <div class="local-ring">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 42 42" 
          style="text-anchor: middle; width: 100%;"
        >
          <circle class="local-ring__hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
          <circle class="local-ring__ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="4"></circle>
          <circle class="local-ring__segment VE4Mc" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#000000" stroke-width="4" stroke-dasharray="50,50" stroke-dashoffset="25"></circle>
          <g><text x="50%" y="50%" class="local-ring_text">2/4</text></g>
        </svg>
      </div>
    `;

    const ProgressTableColumns = `1fr 1fr 1fr 126px`;

    const ProgressDesktopView = /*html*/ `
      <mui-table> 
        <mui-row-group heading> 
          <mui-row columns="${ProgressTableColumns}"> 
            <mui-cell>File</mui-cell> 
            <mui-cell>Due date</mui-cell> 
            <mui-cell>Status</mui-cell> 
            <mui-cell>Automation</mui-cell> 
          </mui-row> 
        </mui-row-group> 
        <mui-row-group> 
          <mui-row columns="${ProgressTableColumns}"> 
            <mui-cell align-y="center"><mui-body size="small">Alison Max</mui-body></mui-cell> 
            <mui-cell align-y="center"><mui-v-stack space="var(--space-050)"><mui-body size="small">27/07/2020</mui-body><mui-badge>Quarterly</mui-badge></mui-v-stack></mui-cell> 
            <mui-cell align-y="center"><mui-badge>Unlodged</mui-badge></mui-cell> 
            <mui-cell align-y="center">${LocalRing}</mui-cell> 
          </mui-row> 
        </mui-row-group> 
      </mui-table>
    `;

    const ProgressMobileView = /*html*/ `
        <mui-v-stack space="var(--space-400)">
          ${LocalRing}
          <mui-heading 
            size="6" 
            style="width: 100%; text-align: center;"
          >
            Transactions automated
          </mui-heading>
          
          <mui-rule></mui-rule>

          <mui-grid col="1fr 1fr 1fr">
          <mui-v-stack space="var(--space-100)">
            <mui-body size="small"><strong>Client</strong></mui-body>
            <mui-body size="small">Alison Max</mui-body>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100)">
            <mui-body size="small" style="text-align: center;"><strong>Due date</strong></mui-body>
            <mui-body size="small" style="text-align: center;">27/07/2020</mui-body>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100)">
            <mui-body size="small" style="text-align: right;"><strong>Status</strong></mui-body>
            <mui-body size="small" style="text-align: right;">Unlodged</mui-body>
          </mui-v-stack>
        </mui-grid>

        </mui-v-stack>
    `;

    const Columns = `1fr 1fr 1fr`;

    const TableData = [
      {
        name: "Figma",
        billed: "Monthly",
        cost: "$20.00",
      },
      {
        name: "Sketch",
        billed: "Monthly",
        cost: "$12.00",
      },
    ];

    const TableRow = TableData.map(
      (prop) => /*html*/ `
        <mui-row columns="${Columns}">
          <mui-cell>${prop.name}</mui-cell>
          <mui-cell><mui-badge>${prop.billed}</mui-badge></mui-cell>
          <mui-cell>${prop.cost}</mui-cell>
        </mui-row>
      `
    ).join("");

    const SlatRow = TableData.map((prop, index, array) => {
      const slatGroup = /*html*/ `
    <mui-slat-group>
      <mui-slat>
        <mui-v-stack slot="start" space="0">
          <mui-body size="small" weight="bold">Name</mui-body>
        </mui-v-stack>
        <mui-v-stack space="0" slot="end" alignX="end">
          <mui-body size="x-small">${prop.name}</mui-body>
        </mui-v-stack>
      </mui-slat>
      <mui-slat>
        <mui-v-stack slot="start" space="0">
          <mui-body size="small" weight="bold">Billed</mui-body>
        </mui-v-stack>
        <mui-v-stack space="0" slot="end" alignX="end">
          <mui-badge usage="slat-end" size="x-small">${prop.billed}</mui-badge>
        </mui-v-stack>
      </mui-slat>
      <mui-slat>
        <mui-v-stack slot="start" space="0">
          <mui-body size="small" weight="bold">Cost</mui-body>
        </mui-v-stack>
        <mui-v-stack space="0" slot="end" alignX="end">
          <mui-body size="x-small">${prop.cost}</mui-body>
        </mui-v-stack>
      </mui-slat>
    </mui-slat-group>
  `;

      const rule = index < array.length - 1 ? `<mui-rule></mui-rule>` : ``;

      return slatGroup + rule;
    }).join("");

    const stories = /*html*/ `

          <mui-message variant="info" heading="Working with Web Components and Shadow DOM">
            <mui-v-stack space="var(--space-200)">
              <mui-body size="small">
                mui-responsive only works when used in the regular app layer (the light DOM). If it’s placed inside a custom element’s shadow DOM, slot content won’t be projected correctly. This behaviour is a browser limitation, not a bug.
                </mui-body>
            </mui-v-stack>
          </mui-message>
      
        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-responsive";<br>
          </mui-code>
        </spec-card>

        <props-card title="Responsive">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>

        <story-card title="Single Breakpoint">
          <mui-responsive slot="body" breakpoint="600">
            <mui-heading slot="showBelow" size="5" level="3">Mobile / Below 600</mui-heading>
            <mui-heading slot="showAbove" size="3" level="3">Desktop / Above 600</mui-heading>
          </mui-responsive>
          <story-code-block slot="footer" scrollable>
            &lt;mui-responsive breakpoint="600"&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showAbove"&gt;...&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showBelow"&gt;...&lt;/div&gt;
            <br />
            &lt;/mui-responsive&gt;
          </story-code-block>
        </story-card>

        <story-card title="Dual Breakpoint">
          <mui-responsive slot="body" breakpoint-low="600" breakpoint-high="1024">
            <mui-heading slot="showBelow" size="5" level="3">Mobile / Below 600</mui-heading>
            <mui-heading slot="showMiddle" size="4" level="3">Tablet / Between 600-1200</mui-heading>
            <mui-heading slot="showAbove" size="3" level="3">Desktop / Above 1200</mui-heading>
          </mui-responsive>
          <story-code-block slot="footer" scrollable>
            &lt;mui-responsive breakpoint-low="599" breakpoint-high="1024"&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showAbove"&gt;...&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showMiddle"&gt;...&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showBelow"&gt;...&lt;/div&gt;
            <br />
            &lt;/mui-responsive&gt;
          </story-code-block>
        </story-card>

        <story-card title="Slat to Table" description="Showcasing how to loop data on to the mui-table and mui-slat within the mui-responsive component.">
          <mui-responsive slot="body" breakpoint="1080">
            <mui-table slot="showAbove">
              <mui-row-group heading>
                <mui-row columns="${Columns}">
                  <mui-cell>Name</mui-cell>
                  <mui-cell>Billed</mui-cell>
                  <mui-cell>Cost</mui-cell>
                </mui-row>
              </mui-row-group>
              <mui-row-group>
                ${TableRow}
              </mui-row-group>
            </mui-table>
            <mui-v-stack space="var(--space-400)" slot="showBelow">
              ${SlatRow}
            </mui-v-stack>
          </mui-responsive>

          <story-code-block slot="footer" scrollable>
            // COMPOSITION LOGIC<br><br>
            const&nbsp;Columns&nbsp;=&nbsp;&#96;1fr&nbsp;1fr&nbsp;1fr&#96;;<br>
            <br>
            const&nbsp;TableData&nbsp;=&nbsp;[<br>
            &nbsp;&nbsp;{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;"Figma",<br>
            &nbsp;&nbsp;&nbsp;&nbsp;billed:&nbsp;"Monthly",<br>
            &nbsp;&nbsp;&nbsp;&nbsp;cost:&nbsp;"&#36;20.00",<br>
            &nbsp;&nbsp;},<br>
            &nbsp;&nbsp;{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;"Sketch",<br>
            &nbsp;&nbsp;&nbsp;&nbsp;billed:&nbsp;"Monthly",<br>
            &nbsp;&nbsp;&nbsp;&nbsp;cost:&nbsp;"&#36;12.00",<br>
            &nbsp;&nbsp;},<br>
            ];<br>
            <br>
            const&nbsp;TableRow&nbsp;=&nbsp;TableData.map(<br>
            &nbsp;&nbsp;(prop)&nbsp;=&gt;&nbsp;/*html*/&nbsp;&#96;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row&nbsp;columns="&#36;{Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;&#36;{prop.name}&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;&lt;mui-badge&gt;&#36;{prop.billed}&lt;/mui-badge&gt;&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;&#36;{prop.cost}&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&#96;<br>
            ).join("");<br>
            <br>
            const&nbsp;SlatRow&nbsp;=&nbsp;TableData.map((prop,&nbsp;index,&nbsp;array)&nbsp;=&gt;&nbsp;{<br>
            &nbsp;&nbsp;const&nbsp;slatGroup&nbsp;=&nbsp;/*html*/&nbsp;&#96;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&nbsp;slot="start"&nbsp;space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&nbsp;size="small"&nbsp;weight="bold"&gt;Name&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&nbsp;space="0"&nbsp;slot="end"&nbsp;alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&nbsp;size="x-small"&gt;&#36;{prop.name}&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&nbsp;slot="start"&nbsp;space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&nbsp;size="small"&nbsp;weight="bold"&gt;Billed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&nbsp;space="0"&nbsp;slot="end"&nbsp;alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge&nbsp;usage="slat-end"&nbsp;size="x-small"&gt;&#36;{prop.billed}&lt;/mui-badge&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&nbsp;slot="start"&nbsp;space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&nbsp;size="small"&nbsp;weight="bold"&gt;Cost&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&nbsp;space="0"&nbsp;slot="end"&nbsp;alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&nbsp;size="x-small"&gt;&#36;{prop.cost}&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&#96;;<br>
            <br>
            &nbsp;&nbsp;const&nbsp;rule&nbsp;=&nbsp;index&nbsp;&lt;&nbsp;array.length&nbsp;-&nbsp;1&nbsp;?&nbsp;&#96;&lt;mui-rule&gt;&lt;/mui-rule&gt;&#96;&nbsp;:&nbsp;&#96;&#96;;<br>
            <br>
            &nbsp;&nbsp;return&nbsp;slatGroup&nbsp;+&nbsp;rule;<br>
            }).join("");<br>
            <br><br>
            // RESPONSIVE COMPOSITION<br><br>
            &lt;mui-responsive&nbsp;breakpoint="1080"&gt;<br>
            &nbsp;&nbsp;&lt;mui-table&nbsp;slot="showAbove"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&nbsp;heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row&nbsp;columns="&#36;{Columns}"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Name&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Billed&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-cell&gt;Cost&lt;/mui-cell&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-row-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{TableRow}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-row-group&gt;<br>
            &nbsp;&nbsp;&lt;/mui-table&gt;<br>
            &nbsp;&nbsp;&lt;mui-v-stack&nbsp;space="var(--space-400)"&nbsp;slot="showBelow"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&#36;{SlatRow}<br>
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &lt;/mui-responsive&gt;<br>
          </story-code-block>


        </story-card>

        <story-card title="Table: Desktop to Mobile">

          <mui-responsive slot="body" breakpoint="1080">
            <mui-h-stack slot="showAbove" space="16px" alignY="center">
              ${ProgressDesktopView}
            </mui-h-stack>
            <div slot="showBelow">
              ${ProgressMobileView}
            </div>
          </mui-responsive>

          <story-code-block slot="footer" scrollable>
            &lt;mui-responsive breakpoint="600"&gt;
            <br />
            <br />
            &nbsp;&nbsp;// Desktop Composition
            <br>
            &nbsp;&nbsp;/////////////////////////////////////
            <br>
            <br>
            &nbsp;&nbsp;&lt;div slot="showAbove"&gt;
            <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#x24;{ProgressDesktopView}
            <br />
            &nbsp;&nbsp;&lt;/div&gt;
            <br />
            <br />
            &nbsp;&nbsp;// Mobile Composition
            <br>
            &nbsp;&nbsp;/////////////////////////////////////
            <br>
            <br>
            &nbsp;&nbsp;&lt;div slot="showBelow"&gt;
            <br />
             &nbsp;&nbsp;&nbsp;&nbsp; &#x24;{ProgressMobileView}
            <br />
            &nbsp;&nbsp;&lt;/div&gt;
            <br />
            <br />
            &lt;/mui-responsive&gt;
          </story-code-block>
        </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Responsive"
        description="Dynamically render UI based on viewport size"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-responsive/index.ts"
        guides="https://guides.muibook.com/responsive"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-responsive", storyResponsive);
