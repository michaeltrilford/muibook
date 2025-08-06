import HeroGuides from "../../../images/guru/hero-guides.png";
import HeroOutcomes from "../../../images/guru/hero-outcomes.png";

class storyCarousel extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      /* Customised Carousel */ 
      .grid {
        display: grid;
        grid-template-columns: 1fr;
      }

      .hero {
        display: flex;
        background: var(--surface-recessed-100);
        padding: var(--space-400);
        padding-bottom: var(--space-000);
      }
      .content {
        padding: var(--space-500);
        padding-bottom: var(--space-400);
        margin-bottom: var(--carousel-tab-offset);
      }

      @media (min-width: 600px) {
        .content {
          padding: var(--space-600);
        }
      }

      @media (min-width: 1100px) {
        .grid  {
          align-content: end;
          grid-template-columns: 300px 1fr;
          gap: var(--space-600);
          padding: var(--space-400);
          padding-bottom: var(--space-000);
        }
        .hero {
          background: var(--black-opacity-0);
          padding: var(--space-000);
        }
        .content {
          padding: var(--space-000);
          max-width: 45ch;
        }
      }
      @media (min-width: 1300px) {
        .grid  {
          justify-self: center;
          grid-template-columns: 400px 1fr;
          gap: var(--space-800);
          padding: var(--space-600);
          padding-bottom: var(--space-000);
        }
        .hero {
          background: var(--black-opacity-0);
        }
        .content {
          padding: var(--space-000);
        }
      }
      @media (min-width: 1800px) {
        .grid  {
          grid-template-columns: 500px 1fr;
          padding: var(--space-800);
          padding-bottom: var(--space-000);
        }
      }

    `;

    // Controller
    const propItemsController = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-tab-bar, mui-carousel-panel",
        default: "(required)",
        description:
          "Assigns the element to a named slot in the Carousel Controller. Required for light DOM content like tabs and panels.",
      },
    ];

    const rowsController = propItemsController
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

    const accordionsController = propItemsController
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsController.length - 1 ? "last-child" : "";

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

    // TAB BAR
    const propItemsTabBar = [
      {
        name: "slot=&#8220;controls&#8221;",
        required: true,
        type: "slot (named)",
        options: "controls",
        default: "(required)",
        description:
          "Used when placing mui-tab-bar inside carousel-controller. Required to inject this element into the controls slot.",
      },
      {
        name: "controlsPosition",
        type: "string",
        options: "top, right, bottom, left, top-right, top-left, bottom-right, bottom-left",
        default: "bottom",
        description: "Define the position of the controls for the Carousel",
      },
    ];

    const rowsTabBar = propItemsTabBar
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

    const accordionsTabBar = propItemsTabBar
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsTabBar.length - 1 ? "last-child" : "";

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

    // Panel

    const propItemsPanel = [
      {
        name: "slot=&#8220;item&#8221;",
        required: true,
        type: "slot (named)",
        options: "item",
        default: "(required)",
        description: "Places the individual panel in the correct slot within the Carousel",
      },
      {
        name: "item",
        type: "string",
        options: "any",
        default: "",
        description:
          "Maps to the corresponding id of a tab-item in the tab bar. Controls which panel is shown based on the selected tab.",
      },
    ];

    const rowsPanel = propItemsPanel
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

    const accordionsPanel = propItemsPanel
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsPanel.length - 1 ? "last-child" : "";

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

    const carouselData = [
      {
        id: "one",
        label: "1",
        active: true,
        heading: "Guides",
        description:
          "A Figma plugin that delivers UX guidelines and customisable content, seamlessly integrating design system guides into Figma workflows.",
        image: `${HeroGuides}`,
      },
      {
        id: "two",
        label: "2",
        heading: "Outcomes",
        description:
          "Track objectives and key results in an outcome-based roadmap. Organise tasks into Upcoming, Doing, and Finished columns to drive meaningful progress.",
        image: `${HeroOutcomes}`,
      },
    ];

    const carouselTabItems = carouselData
      .map(({ id, label, icon, active }) => {
        const activeAttr = active ? " active" : "";
        return `<mui-tab-item id="${id}" icon="${icon}"${activeAttr}>${label}</mui-tab-item>`;
      })
      .join("");

    const carouselItems = carouselData
      .map(({ id, heading, description, image }) => {
        return /*html*/ `
        <mui-carousel-panel slot="item" item="${id}">
          <div class="grid">
            <div class="hero">
              <img style="width: 100%; height: auto;" width="400" height="376" src="${image}" alt="${heading}" />
            </div>
            <mui-v-stack class="content">
              <mui-heading size="2" level="3">${heading}</mui-heading>
              <mui-body>${description}</mui-body>
            </mui-v-stack>
          </div>
        </mui-carousel-panel>
        `;
      })
      .join("");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-carousel";<br><br>
          // Required:<br>
          import "@muibook/components/mui-tabs";<br>
        </mui-code>
      </spec-card>

      <mui-v-stack space="var(--space-400)">
        <props-card title="Carousel Controller" description="The carousel-controller handles layout and transitions. Slotted children like tab-bar and carousel-panel must include the correct slot attributes to integrate properly.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsController}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsController}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>

        <props-card title="Tab Bar" description="When used inside carousel-controller, mui-tab-bar can accept additional props to control placement and integration within the carousel layout.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsTabBar}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsTabBar}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>

        <props-card title="Carousel Panel " description="Used to display the content for each carousel item. This component is typically slotted into a mui-carousel-controller and responds to tab selection based on the item mapping.">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsPanel}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsPanel}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>
      </mui-v-stack>

      <story-card 
        title="Default"
        description="A flexible, composable carousel that gives you full control over the content and internal layout."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-carousel/index.js"
        usage="
          Carousel controls are set to bottom-center by default.;
          Internal padding is required.;
          The var(--carousel-tab-offset) is available to help with control spacing - though, not required.;
          You will need knowledge of CSS to add your specific custom content.
        "
        usageLink="https://guides.muibook.com/carousel"
      >
        <mui-carousel-controller slot="body">
          <mui-tab-bar slot="controls">
            <mui-tab-item active id="one">1</mui-tab-item>
            <mui-tab-item id="two">2</mui-tab-item>
          </mui-tab-bar>
          <mui-carousel-panel slot="item" item="one" >
            <mui-grid col="1fr" style="padding-bottom: var(--carousel-tab-offset);">
              <mui-v-stack style="padding: var(--space-500) var(--space-600);">
                <mui-heading level="3" size="2">Item 1</mui-heading>
                <mui-body>The default carousel is a flexible canvas. Your content defines the layout and spacing.</mui-body>
                <mui-code>
                &lt;mui-grid col="1fr" style="padding-bottom: var(--carousel-tab-offset);"&gt;
                <br />
                &nbsp;&nbsp;&lt;mui-v-stack style="padding: var(--space-600);"&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;...
                <br />
                &nbsp;&nbsp;&lt;/mui-v-stack
                <br />
                &lt;/mui-grid&gt;
                </mui-code>
              </mui-v-stack>
            </mui-grid>  
          </mui-carousel-panel>
          <mui-carousel-panel slot="item" item="two" >
            <mui-grid col="1fr" style="padding-bottom: var(--carousel-tab-offset);">
              <mui-v-stack style="padding: var(--space-500) var(--space-600);">
                <mui-heading level="3" size="2">Item 2</mui-heading>
                <mui-body>The default carousel is a flexible canvas. Your content defines the layout and spacing.</mui-body>
                <mui-code>
                &lt;mui-grid col="1fr" style="padding-bottom: var(--carousel-tab-offset);"&gt;
                <br />
                &nbsp;&nbsp;&lt;mui-v-stack style="padding: var(--space-600);"&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;...
                <br />
                &nbsp;&nbsp;&lt;/mui-v-stack
                <br />
                &lt;/mui-grid&gt;
                </mui-code>
              </mui-v-stack>
            </mui-grid>  
          </mui-carousel-panel>
        </mui-carousel-controller>

        <story-code-block slot="footer" scrollable>
          &lt;mui-carousel-controller&gt;<br />
          &nbsp;&nbsp;&lt;mui-tab-bar slot="controls"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id="one"&gt;1&lt;/mui-tab-item&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;... Add other tabs ...
          <br />
          &nbsp;&nbsp;&lt;/mui-tab-bar&gt;
          <br />
          <br />
          &nbsp;&nbsp;&lt;mui-carousel-panel slot="item" item="one"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-grid col="1fr" style="padding-bottom: var(--carousel-tab-offset);"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack style="padding: var(--space-500) var(--space-600);"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading level="3" size="2"&gt;Item 1&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Content...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-grid&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-carousel-panel&gt;
          <br />
          <br />
          &nbsp;&nbsp;... Add other panels ...
          <br />
          <br />
          &lt;/mui-carousel-controller&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Custom Layout" 
        description="Demonstrates how to add custom compositions and layouts within the carousel panels."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-carousel/index.js"  
      >
        <mui-carousel-controller slot="body">
          <mui-tab-bar slot="controls" controlsPosition="bottom-right">
            ${carouselTabItems}
          </mui-tab-bar>
          ${carouselItems}
        </mui-carousel-controller>
        <story-code-block slot="footer" scrollable>
          /* === Author Styles ================= */
          <br />
          <br />
          .grid {<br />
          &nbsp;&nbsp;display: grid;<br />
          &nbsp;&nbsp;grid-template-columns: 1fr;<br />
          }<br /><br />
          .hero {<br />
          &nbsp;&nbsp;display: flex;<br />
          &nbsp;&nbsp;background: var(--black-opacity-40);<br />
          &nbsp;&nbsp;padding: var(--space-400);<br />
          &nbsp;&nbsp;padding-bottom: var(--space-000);<br />
          }<br /><br />
          .content {<br />
          &nbsp;&nbsp;padding: var(--space-600);<br />
          &nbsp;&nbsp;padding-bottom: var(--space-400);<br />
          &nbsp;&nbsp;margin-bottom: var(--carousel-tab-offset);<br />
          }<br /><br />
          @media (min-width: 1100px) {<br />
          &nbsp;&nbsp;.grid { ... }<br />
          &nbsp;&nbsp;.hero { ... }<br />
          &nbsp;&nbsp;.content { ... }<br />
          }
          <br />
          <br />
          <br />
          
          /* === Component Usage =============== */
          <br />
          <br />
          &lt;mui-carousel-controller&gt;<br />
          &nbsp;&nbsp;&lt;mui-tab-bar slot="controls" controlsPosition="bottom-right"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id="one"&gt;1&lt;/mui-tab-item&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;...
          <br />
          &nbsp;&nbsp;&lt;/mui-tab-bar&gt;
          <br />
          <br />
          &nbsp;&nbsp;&lt;mui-carousel-panel slot="item" item="one"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="grid"&gt;
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="hero"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style="width: 100%; height: auto;"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width="400"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height="376"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;src="./images/guides.png"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack class="content"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading level="3" size="2"&gt;Guides&lt;/mui-heading&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A Figma plugin that delivers UX...
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
          &nbsp;&nbsp;&lt;/mui-carousel-panel&gt;<br />
          <br />
          &nbsp;&nbsp;...
          <br />
          <br />
          &lt;/mui-carousel-controller&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Map Data" 
        description="Map dynamic data to generate carousel tabs and panels."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-carousel/index.js"  
      >
        <mui-carousel-controller slot="body">
          <mui-tab-bar slot="controls" controlsPosition="bottom-right">
            ${carouselTabItems}
          </mui-tab-bar>
          ${carouselItems}
        </mui-carousel-controller>
        <story-code-block slot="footer" scrollable>
          /* === Carousel Data =================== */
          <br />
          <br />
          const carouselData = [
          <br />
          &nbsp;&nbsp;{
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;id: 'one',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;label: '1',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;active: true
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;heading: 'Guides',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;description: 'A Figma plugin that...',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;image: './images/guru/hero-guides.png',
            <br />
          &nbsp;&nbsp;},
          <br />
          &nbsp;&nbsp;{
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;id: 'two',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;label: '2',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;heading: 'Outcomes',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;description: 'Track objectives and key...',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;image: './images/guru/hero-outcomes.png',
            <br />
          &nbsp;&nbsp;},
          <br />
          ];
          <br />
          <br />
          /* === Carousel Tabs Items ============== */
          <br />
          <br />
          const carouselTabItems = carouselData
          <br />
          &nbsp;&nbsp;.map(({ label, icon, active }) => {
            <br />
          &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
          <br />
          &nbsp;&nbsp;return &#96;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item 
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id="&#36;{id}" 
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon="&#36;{icon}" 
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{activeAttr}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{label}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-item&gt;
          <br />
          &nbsp;&nbsp;&#96;;
          <br />
          })
          <br />
          .join('');
          <br />
          <br />
          /* === Carousel Panels =============== */
          <br />
          <br />
          const carouselItems = carouselData
          <br />
          &nbsp;&nbsp;.map(({ heading, description, image }) => {
          <br />
          &nbsp;&nbsp;return &#96;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-carousel-panel 
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot="item" 
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;item="&#36;{id}" 
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-carousel-panel&gt;
          <br />
          &nbsp;&nbsp;&#96;;
          <br />
          })
          <br />
          .join('');
          <br />
          <br />
          /* === Component Usage =============== */
          <br />
          <br />
          &lt;mui-carousel-controller&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-tab-bar slot="controls" controlsPosition="bottom-right"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#36;{carouselTabItems}
          <br />
          &nbsp;&nbsp;&lt;/mui-tab-bar&gt;
          <br />
          &nbsp;&nbsp;&#36;{carouselItems}
          <br />
          &lt;/mui-carousel-controller&gt;
        </story-code-block>
      </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Carousel"
        description="A carousel component with tab-based navigation, enabling users to switch between views or content sections with ease."
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-carousel"
        guides="https://guides.muibook.com/carousel"
        figma=""
        accessibility="
          Left/Right arrows, Home and End keys let keyboard users navigate between carousel items.; 
          aria-selected and tabindex attributes are updated on each tab-item when it becomes active or inactive.; 
          Each active tab-item can receive focus and shows a focus-visible outline.; 
          tab-bar uses role=tablist to group related tab-items and each tab-item uses role=tab within the tab-bar.
        "

      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-carousel", storyCarousel);
