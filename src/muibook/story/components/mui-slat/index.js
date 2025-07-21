class storySlat extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot=&#8220;start&#8221;",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Primary content slot for a slat layout.",
      },
      {
        name: "slot=&#8220;end&#8221;",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Secondary content slot for a slat layout.",
      },
      {
        name: "col",
        type: "string",
        options: "1fr, 1fr auto, etc...",
        default: "",
        description: "Adjust the column rules.",
      },
      {
        name: "space",
        type: "string",
        options: "var(--space-xxx)",
        default: "",
        description: "Adjust the gap between columns.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => `
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
        title="Slat"
        description="Slat is a composable component designed to display table data on mobile devices. It provides flexible start and end slots, enabling consumers to tailor how data is presented in a mobile-friendly, stacked format. Slat is ideal for adapting complex table layouts into a clearer, more accessible experience on smaller screens."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-slat/index.ts"
        accessibility="
          mui-slat uses role='table'
        "
        guides="https://guides.muibook.com/slat"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-slat";<br>
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

        <story-card 
          title="Slat: Default" 
          description="Slats offer flexibility to surface key content and support custom layouts, or stacking."
          usage="Bring your own padding or margin."
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body">
            <mui-heading slot="start" size="5">Heading</mui-heading>
            <mui-h-stack slot="end" space="var(--space-400)" alignX="flex-end">
              <mui-body width="20px">Body</mui-body>
            </mui-h-stack>
          </mui-slat>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-slat&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-heading slot="start" size="5"&gt;...&lt;/mui-heading&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

        <story-card 
          title="Slat: Header" 
          description="Slat header offers flexibility to surface a heading and supporting content."
          usage="Use with Row and Action variants where required."
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body" variant="header">
            <mui-heading slot="start" size="6" level="4">Heading</mui-heading>
            <mui-h-stack slot="end" alignX="end">
              <mui-body size="6" level="4">End slot</mui-body>
            </mui-h-stack>
          </mui-slat>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-slat variant="header"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Heading&lt;/mui-heading&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small&gt;End slot&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

        <story-card 
          title="Slat: Row" 
          description="Slats offer flexibility to surface key content and support custom layouts, or stacking."
          usage="Use with Header and Action variants where required."
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body" variant="row">
            <mui-v-stack slot="start" space="0">
              <mui-body size="medium" weight="bold">Espresso Bar</mui-body>
              <mui-body size="small">Food & Drink</mui-body>
            </mui-v-stack>
            <mui-v-stack space="0" slot="end" alignX="end">
              <mui-body size="small">Pending</mui-body>
              <mui-body size="small">-$8.12</mui-body>
            </mui-v-stack>
          </mui-slat>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-slat&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="start"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="end" alignX="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

        <story-card 
          title="Slat: Action" 
          description="Slats offer flexibility to surface key content and support custom layouts, or stacking"
          usage="Use with Row and Header variants where required."
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body" variant="action">
            <mui-v-stack space="0" slot="start">
              <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
              <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
            </mui-v-stack>
            <mui-icon-right-chevron slot="end" size="x-small"></mui-icon-right-chevron>
          </mui-slat>
          
          <mui-code slot="footer" scrollable>
            // ⚠️ Important
            <br />
            » &lt;mui-button&gt; is used internally, ensure it is imported.
            <br />
            <br />
            <br />

            &lt;mui-slat&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="start"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-icon-right-chevron slot="end"&gt;&lt;/mui-icon-right-chevron&gt;
            <br />
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-slat", storySlat);
