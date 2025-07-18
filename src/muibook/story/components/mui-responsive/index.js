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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Responsive"
        description="Dynamically render UI based on viewport size"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-responsive/index.ts"
        guides="https://guides.muibook.com/responsive"
      >

      <mui-v-stack space="var(--space-700)">
      
        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-responsive";<br>
          </mui-code>
        </spec-card>

        <spec-card title="Props">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card title="Single Breakpoint">
          <mui-responsive slot="body" breakpoint="600">
            <mui-heading slot="showBelow" size="5" level="3">Mobile / Below 600</mui-heading>
            <mui-heading slot="showAbove" size="3" level="3">Desktop / Above 600</mui-heading>
          </mui-responsive>
          <mui-code slot="footer" scrollable>
            &lt;mui-responsive breakpoint="600"&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showAbove"&gt;...&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showBelow"&gt;...&lt;/div&gt;
            <br />
            &lt;/mui-responsive&gt;
          </mui-code>
        </story-card>

        <story-card title="Dual Breakpoint">
          <mui-responsive slot="body" breakpoint-low="600" breakpoint-high="1024">
            <mui-heading slot="showBelow" size="5" level="3">Mobile / Below 600</mui-heading>
            <mui-heading slot="showMiddle" size="4" level="3">Tablet / Between 600-1200</mui-heading>
            <mui-heading slot="showAbove" size="3" level="3">Desktop / Above 1200</mui-heading>
          </mui-responsive>
          <mui-code slot="footer" scrollable>
            &lt;mui-responsive breakpoint-low="599" breakpoint-high="1024"&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showAbove"&gt;...&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showMiddle"&gt;...&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showBelow"&gt;...&lt;/div&gt;
            <br />
            &lt;/mui-responsive&gt;
          </mui-code>
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

          <mui-code slot="footer" scrollable>
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
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-responsive", storyResponsive);
