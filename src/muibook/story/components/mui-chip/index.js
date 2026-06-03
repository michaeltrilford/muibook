import { getComponentDocs } from "../../../utils/story-data";

class storyChip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Chip");
    const attrsReference = JSON.stringify([
      {
        component: "mui-chip",
        parentAttrs: ["has-before", "has-after"],
        childAttrs: [],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }

      .multi-select::part(flex-wrap) { flex-wrap: wrap; }
      .multi-select::part(gap) { gap: var(--space-200); }
      .multi-select::part(width) { width: 180px; }

      .chip-overflow-example {
        display: flex;
        gap: var(--space-200);
        max-width: 42rem;
      }

      .chip-overflow-example mui-chip {
        flex: 1 1 0;
      }

    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-chip" title="Chip"></story-api-types>

        <story-card title="Default" usageLink="https://guides.muibook.com/chip">
          <div slot="body">
            <mui-chip>Branding</mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;Branding
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Icon Before" usageLink="https://guides.muibook.com/chip">
          <div slot="body">
            <mui-chip> 
              Downloads
              <mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle>
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle slot="before"&gt;&lt;/mui-icon-down-arrow-circle&gt;<br />
            &nbsp;&nbsp;Downloads
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Icon After" usageLink="https://guides.muibook.com/chip">
          <div slot="body">
            <mui-chip> 
              Downloads
              <mui-icon-down-arrow-circle slot="after"></mui-icon-down-arrow-circle>
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;Downloads<br />
            &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle slot="after"&gt;&lt;/mui-icon-down-arrow-circle&gt;<br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Active" usageLink="https://guides.muibook.com/chip">
          <div slot="body">
            <mui-chip active> 
              Videos
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip active&gt;
            <br />
            &nbsp;&nbsp;Videos
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Sizes" usageLink="https://guides.muibook.com/chip">
          <mui-h-stack slot="body" space="var(--space-200)" alignY="center" wrap="wrap">
            <mui-chip size="x-small">X-Small</mui-chip>
            <mui-chip size="small">Small</mui-chip>
            <mui-chip size="medium">Medium</mui-chip>
            <mui-chip size="large">Large</mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip size="x-small"&gt;X-Small&lt;/mui-chip&gt;<br />
            &lt;mui-chip size="small"&gt;Small&lt;/mui-chip&gt;<br />
            &lt;mui-chip size="medium"&gt;Medium&lt;/mui-chip&gt;<br />
            &lt;mui-chip size="large"&gt;Large&lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Badge: Before" usageLink="https://guides.muibook.com/chip">
          <div slot="body">
            <mui-chip> 
              Videos
              <mui-badge variant="positive" slot="before">Beta</mui-badge>
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-badge variant="positive" slot="before"&gt;Beta&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;Videos<br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Badge: After">
          <div slot="body">
            <mui-chip> 
              Offers
              <mui-badge variant="positive" slot="after">10</mui-badge>
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;Offers<br />
            &nbsp;&nbsp;&lt;mui-badge variant="positive" slot="after"&gt;10&lt;/mui-badge&gt;<br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Filters" description="Return results specific to one or multiple categories the user selects." usageLink="https://guides.muibook.com/chip">
          <mui-h-stack slot="body" space="var(--space-200)">
            <mui-chip id="chip-one" dismiss>Branding</mui-chip>
            <mui-chip id="chip-two" active dismiss>Web Design</mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            // Web Component Logic<br />
            ////////////////////////////////////////////////<br /><br />
            connectedCallback() {<br />
              &nbsp;&nbsp;const shadow = this.shadowRoot;<br />
              &nbsp;&nbsp;if (!shadow) return;<br /><br />

              &nbsp;&nbsp;shadow.addEventListener("dismiss", (e) => {<br />
                &nbsp;&nbsp;&nbsp;&nbsp;const id = e.detail.id;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;const chip = shadow.getElementById(id);<br />
                &nbsp;&nbsp;&nbsp;&nbsp;if (chip) {<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chip.remove();<br />
                &nbsp;&nbsp;&nbsp;&nbsp;}<br />
              &nbsp;&nbsp;});<br />
            }<br /><br />

            // Component Usage<br />
            ////////////////////////////////////////////////<br /><br />
            &lt;mui-chip id="chip-one" dismiss&gt;
            <br />
            &nbsp;&nbsp;Branding
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Filters: Icon Before" description="Return results specific to one or multiple categories the user selects." usageLink="https://guides.muibook.com/chip">
          <mui-h-stack slot="body" space="var(--space-200)">
            <mui-chip id="chip-three" dismiss>
              <mui-icon-left-sidebar slot="before"></mui-icon-left-sidebar>
              Branding
            </mui-chip>
            <mui-chip id="chip-four" active dismiss>
              <mui-icon-left-sidebar slot="before"></mui-icon-left-sidebar>
              Web Design
            </mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            // Web Component Logic<br />
            ////////////////////////////////////////////////<br /><br />
            connectedCallback() {<br />
              &nbsp;&nbsp;const shadow = this.shadowRoot;<br />
              &nbsp;&nbsp;if (!shadow) return;<br /><br />

              &nbsp;&nbsp;shadow.addEventListener("dismiss", (e) => {<br />
                &nbsp;&nbsp;&nbsp;&nbsp;const id = e.detail.id;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;const chip = shadow.getElementById(id);<br />
                &nbsp;&nbsp;&nbsp;&nbsp;if (chip) {<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chip.remove();<br />
                &nbsp;&nbsp;&nbsp;&nbsp;}<br />
              &nbsp;&nbsp;});<br />
            }<br /><br />

            // Component Usage<br />
            ////////////////////////////////////////////////<br /><br />
            &lt;mui-chip id="chip-one" dismiss&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-left-sidebar slot="before"&gt;&lt;/mui-icon-left-sidebar&gt;<br />
            &nbsp;&nbsp;Branding<br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Overflow" description="Long chip labels truncate when the chip is constrained by the surrounding layout." usageLink="https://guides.muibook.com/chip">
          <div slot="body" class="chip-overflow-example">
            <mui-chip dismiss>
              <mui-icon-left-sidebar slot="before"></mui-icon-left-sidebar>
              Branding
            </mui-chip>
            <mui-chip active dismiss>
              <mui-icon-left-sidebar slot="before"></mui-icon-left-sidebar>
              Web Design
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;div style=&quot;display: flex; gap: var(--space-200); max-width: 42rem;&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip dismiss style=&quot;flex: 1 1 0;&quot;&gt;Branding&lt;/mui-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip dismiss active style=&quot;flex: 1 1 0;&quot;&gt;Web Design&lt;/mui-chip&gt;<br />
            &lt;/div&gt;
          </story-code-block>
        </story-card>

        <story-card title="Sub Navigation" description="It is often used to view page results for a single category." usageLink="https://guides.muibook.com/chip">
          <mui-h-stack id="sub-navigation" slot="body" space="var(--space-200)">
            <mui-chip> 
              All
            </mui-chip>
            <mui-chip active> 
              Gaming
            </mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            // SUB NAVIGATION<br />
            ////////////////////////////////////////////////<br /><br />
            const subNav = shadow.getElementById("sub-navigation");<br />
            const subNavChips = subNav ? subNav.querySelectorAll("mui-chip") : [];<br /><br />

            subNavChips.forEach((subNavChip) => {<br />
              &nbsp;&nbsp;// Accessibility<br />
              &nbsp;&nbsp;subNavChip.setAttribute("role", "option");<br />
              &nbsp;&nbsp;subNavChip.setAttribute("aria-selected", subNavChip.hasAttribute("active") ? "true" : "false");<br /><br />

              &nbsp;&nbsp;// Single-select toggle<br />
              &nbsp;&nbsp;const toggleState = () => {<br />
                &nbsp;&nbsp;&nbsp;&nbsp;const isActive = subNavChip.hasAttribute("active");<br />
                &nbsp;&nbsp;&nbsp;&nbsp;if (!isActive) {<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Remove active from all chips<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subNavChips.forEach((c) => {<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.removeAttribute("active");<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.setAttribute("aria-selected", "false");<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Set active on clicked chip<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subNavChip.setAttribute("active", "");<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subNavChip.setAttribute("aria-selected", "true");<br />
                }<br />
                &nbsp;&nbsp;&nbsp;&nbsp;// If clicked chip is already active, do nothing (or optionally toggle off)<br />
              &nbsp;&nbsp;};<br /><br />

              &nbsp;&nbsp;subNavChip.addEventListener("click", (e) => {<br />
                &nbsp;&nbsp;&nbsp;&nbsp;e.stopPropagation();<br />
                &nbsp;&nbsp;&nbsp;&nbsp;toggleState();<br />
              &nbsp;&nbsp;});<br />
            });


            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Multi-Select Groups" usageLink="https://guides.muibook.com/chip">
          <mui-h-stack id="multi-chip-select" slot="body" class="multi-select">
            <mui-chip> 
              All
            </mui-chip>
            <mui-chip active> 
              Gaming
            </mui-chip>
            <mui-chip> 
              Podcasts
            </mui-chip>
            <mui-chip> 
              All
            </mui-chip>
            <mui-chip active> 
              Gaming
            </mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            // MULTI-SELECT LOGIC<br />
            ////////////////////////////////////////////////<br /><br />


            const multiChipSelect = shadow.getElementById("multi-chip-select");<br />
            const multiChipItems = multiChipSelect ? multiChipSelect.querySelectorAll("mui-chip") : [];<br /><br />

            multiChipItems.forEach((multiChipItem) => {<br />
              &nbsp;&nbsp;// Accessibility<br />
              &nbsp;&nbsp;multiChipItem.setAttribute("role", "option");<br />
              &nbsp;&nbsp;multiChipItem.setAttribute("aria-selected", multiChipItem.hasAttribute("active") ? "true" : "false");<br /><br />

              &nbsp;&nbsp;// Toggle<br />
              &nbsp;&nbsp;const toggleState = () => {<br />
                &nbsp;&nbsp;&nbsp;&nbsp;const isActive = multiChipItem.hasAttribute("active");<br />
                &nbsp;&nbsp;&nbsp;&nbsp;if (isActive) {<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;multiChipItem.removeAttribute("active");<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;multiChipItem.setAttribute("aria-selected", "false");<br />
                &nbsp;&nbsp;&nbsp;&nbsp;} else {<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;multiChipItem.setAttribute("active", "");<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;multiChipItem.setAttribute("aria-selected", "true");<br />
                &nbsp;&nbsp;&nbsp;&nbsp;}<br />
              &nbsp;&nbsp;};<br /><br />

              &nbsp;&nbsp;multiChipItem.addEventListener("click", (e) => {<br />
                &nbsp;&nbsp;&nbsp;&nbsp;e.stopPropagation(); // Prevent bubbling if needed<br />
                &nbsp;&nbsp;&nbsp;&nbsp;toggleState();<br />
              &nbsp;&nbsp;});<br />
            });<br /><br />

            // PART STYLES (LAYOUT)<br />
            ////////////////////////////////////////////////<br /><br />
            .multi-select::part(flex-wrap) { flex-wrap: wrap; }<br />
            .multi-select::part(gap) { gap: var(--space-200); }<br />
            .multi-select::part(width) { width: 180px; }<br /><br />

            // COMPONENT USAGE<br />
            ////////////////////////////////////////////////<br /><br />
            &lt;mui-h-stack id="multi-chip-select" class="multi-select"&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip&gt;All&lt;/mui-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip active&gt;Gaming&lt;/mui-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip&gt;Podcasts&lt;/mui-chip&gt;<br />
            &lt;/mui-h-stack&gt;
          </story-code-block>
        </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="${data.title}"
        description="${data.description}"
        attrs-reference='${attrsReference}'
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
      
        imports='["@muibook/components/mui-chip"]'>
        ${stories}
      </story-template>
    `;

    const shadow = this.shadowRoot;
    if (!shadow) return; // Guard against null

    // DISMISS BEHAVIOUR
    shadow.addEventListener("dismiss", (e) => {
      const id = e.detail.id;
      const chip = shadow.getElementById(id);
      if (chip) {
        chip.remove();
      }
    });

    // SUB NAVIGATION
    const subNav = shadow.getElementById("sub-navigation");
    const subNavChips = subNav ? subNav.querySelectorAll("mui-chip") : [];

    subNavChips.forEach((subNavChip) => {
      // Accessibility
      subNavChip.setAttribute("role", "option");
      subNavChip.setAttribute("aria-selected", subNavChip.hasAttribute("active") ? "true" : "false");

      // Single-select toggle
      const toggleState = () => {
        const isActive = subNavChip.hasAttribute("active");
        if (!isActive) {
          // Remove active from all chips
          subNavChips.forEach((c) => {
            c.removeAttribute("active");
            c.setAttribute("aria-selected", "false");
          });
          // Set active on clicked chip
          subNavChip.setAttribute("active", "");
          subNavChip.setAttribute("aria-selected", "true");
        }
        // If clicked chip is already active, do nothing (or optionally toggle off)
      };

      subNavChip.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleState();
      });
    });

    // MULTI-SELECT
    const multiChipSelect = shadow.getElementById("multi-chip-select");
    const multiChipItems = multiChipSelect ? multiChipSelect.querySelectorAll("mui-chip") : [];

    multiChipItems.forEach((multiChipItem) => {
      // Accessibility
      multiChipItem.setAttribute("role", "option");
      multiChipItem.setAttribute("aria-selected", multiChipItem.hasAttribute("active") ? "true" : "false");

      // Toggle
      const toggleState = () => {
        const isActive = multiChipItem.hasAttribute("active");
        if (isActive) {
          multiChipItem.removeAttribute("active");
          multiChipItem.setAttribute("aria-selected", "false");
        } else {
          multiChipItem.setAttribute("active", "");
          multiChipItem.setAttribute("aria-selected", "true");
        }
      };

      multiChipItem.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent bubbling if needed
        toggleState();
      });
    });
  }
}

customElements.define("story-chip", storyChip);
