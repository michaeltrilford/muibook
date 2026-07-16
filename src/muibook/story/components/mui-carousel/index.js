import { getComponentDocs } from "../../../utils/story-data";
import HeroGuides from "../../../images/guru/hero-guides-plugin-no-text.png";
import HeroOutcomes from "../../../images/guru/hero-outcomes.png";

class storyCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Carousel");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Carousel"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

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
      .map(({ id, label, active }) => {
        const activeAttr = active ? " active" : "";
        return `<mui-tab-item id="${id}"${activeAttr}>${label}</mui-tab-item>`;
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
      <mui-v-stack space="var(--space-100)">
        <story-api-types tag="mui-carousel-controller" title="Carousel Controller"></story-api-types>
        <story-api-types tag="mui-tab-bar" title="Tab Bar"></story-api-types>
        <story-api-types tag="mui-carousel-panel" title="Carousel Panel"></story-api-types>
      </mui-v-stack>

      <story-card github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-carousel/index.js" id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
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

      <story-card id="borderless" title="${storyMeta["borderless"].title}" description="${storyMeta["borderless"].description}" usage="${storyMeta["borderless"].usage}">
        <mui-carousel-controller slot="body" borderless>
          <mui-tab-bar slot="controls" controlsPosition="bottom-right">
            ${carouselTabItems}
          </mui-tab-bar>
          ${carouselItems}
        </mui-carousel-controller>
        <story-code-block slot="footer" scrollable>
          &lt;mui-carousel-controller borderless&gt;<br />
          &nbsp;&nbsp;...tabs and panels...<br />
          &lt;/mui-carousel-controller&gt;
        </story-code-block>
      </story-card>

      <story-card id="no-radius" title="${storyMeta["no-radius"].title}" description="${storyMeta["no-radius"].description}" usage="${storyMeta["no-radius"].usage}">
        <mui-carousel-controller slot="body" radius="none">
          <mui-tab-bar slot="controls" controlsPosition="bottom-right">
            ${carouselTabItems}
          </mui-tab-bar>
          ${carouselItems}
        </mui-carousel-controller>
        <story-code-block slot="footer" scrollable>
          &lt;mui-carousel-controller radius="none"&gt;<br />
          &nbsp;&nbsp;...tabs and panels...<br />
          &lt;/mui-carousel-controller&gt;
        </story-code-block>
      </story-card>

      <story-card github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-carousel/index.js" id="auto-rotate" title="${storyMeta["auto-rotate"].title}" description="${storyMeta["auto-rotate"].description}" usage="${storyMeta["auto-rotate"].usage}">
        <mui-carousel-controller slot="body" auto-rotate rotate-interval="10000">
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
          &lt;mui-carousel-controller auto-rotate rotate-interval="1000"&gt;<br />
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

      <story-card github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-carousel/index.js" id="dots-controls" title="${storyMeta["dots-controls"].title}" description="${storyMeta["dots-controls"].description}" usage="${storyMeta["dots-controls"].usage}">
        <mui-carousel-controller slot="body" auto-rotate rotate-interval="10000">
          <mui-tab-bar slot="controls" controlsPosition="bottom" variant="dots">
            ${carouselTabItems}
          </mui-tab-bar>
          ${carouselItems}
        </mui-carousel-controller>
        <story-code-block slot="footer" scrollable>
          &lt;mui-carousel-controller auto-rotate rotate-interval="10000"&gt;<br />
          &nbsp;&nbsp;&lt;mui-tab-bar slot="controls" variant="dots"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id="one"&gt;1&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id="two"&gt;2&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
          &nbsp;&nbsp;...carousel panels...<br />
          &lt;/mui-carousel-controller&gt;
        </story-code-block>
      </story-card>

      <story-card github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-carousel/index.js" id="custom-layout" title="${storyMeta["custom-layout"].title}" description="${storyMeta["custom-layout"].description}" usage="${storyMeta["custom-layout"].usage}">
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

      <story-card github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-carousel/index.js" id="map-data" title="${storyMeta["map-data"].title}" description="${storyMeta["map-data"].description}" usage="${storyMeta["map-data"].usage}">
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
            &nbsp;&nbsp;&nbsp;&nbsp;image: './images/guru/hero-guides-plugin.png',
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

        imports='["@muibook/components/mui-carousel"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-carousel", storyCarousel);
