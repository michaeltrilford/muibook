import { getComponentDocs } from "../../../utils/story-data";

class storyIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Icons");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Icons"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }

      mui-grid::part(internal) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 600px) {
        mui-grid::part(internal) {
          grid-template-columns: 1fr 1fr;
        }
      }

      .color-options::part(color) {
        color: var(--app-story-icon-grid-text);
        margin-top: var(--space-100);
      }

      .color-options.inverted::part(color) {
        color: var(--app-story-icon-grid-text-inverted);
        margin-top: var(--space-100);
      }

      .variant.primary::part(color) {
        color: var(--action-primary-text-color);
      }
      .variant.secondary::part(color) {
        color: var(--action-secondary-text-color);
      }
      .variant.tertiary::part(color) { center
        color: var(--action-tertiary-text-color);
      }
      .variant.attention::part(color) {
        color: var(--action-attention-text-color);
      }

    `;

    const stories = /*html*/ `
      <mui-v-stack space="var(--space-100)">
        <story-api-types tag="mui-icon-add" title="Icon"></story-api-types>
        <story-api-types tag="mui-icon-toggle" title="Icon Toggle"></story-api-types>
      </mui-v-stack>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">

        <mui-grid space="var(--space-400)" slot="body" col="repeat(auto-fit, minmax(28rem, 1fr))">

          <story-icon-grid center>
            <mui-icon-add slot="body" size="x-small"></mui-icon-add>
            <mui-code slot="footer" scrollable>mui-icon-add size="x-small"</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-add slot="body" size="small"></mui-icon-add>
            <mui-code slot="footer" scrollable>mui-icon-add size="small"</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-add slot="body" size="medium"></mui-icon-add>
            <mui-code slot="footer" scrollable>mui-icon-add size="medium"</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-add slot="body" size="large"></mui-icon-add>
            <mui-code slot="footer" scrollable>mui-icon-add size="large"</mui-code>
          </story-icon-grid>

        </mui-grid>

      </story-card>

      <story-card id="icon-toggle-default" title="${storyMeta["icon-toggle-default"].title}" description="${storyMeta["icon-toggle-default"].description}" usage="${storyMeta["icon-toggle-default"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-h-stack space="var(--space-100)" wrap>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="secondary">
              <mui-icon-toggle>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-icon-toggle>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="attention">
              <mui-icon-toggle>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
          <mui-h-stack space="var(--space-100)" wrap>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-sun slot="start"></mui-icon-sun>
                <mui-icon-moon slot="end"></mui-icon-moon>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-play-fill slot="start"></mui-icon-play-fill>
                <mui-icon-pause slot="end"></mui-icon-pause>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-menu slot="start"></mui-icon-menu>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-search slot="start"></mui-icon-search>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-speaker-two-wave slot="start"></mui-icon-speaker-two-wave>
                <mui-icon-speaker-mute slot="end"></mui-icon-speaker-mute>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-pin slot="start"></mui-icon-pin>
                <mui-icon-pin-slash slot="end"></mui-icon-pin-slash>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-grid slot="start"></mui-icon-grid>
                <mui-icon-list-and-film slot="end"></mui-icon-list-and-film>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-down-chevron slot="start"></mui-icon-down-chevron>
                <mui-icon-up-chevron slot="end"></mui-icon-up-chevron>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-fullscreen slot="start"></mui-icon-fullscreen>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-left-sidebar slot="start"></mui-icon-left-sidebar>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-ellipsis slot="start"></mui-icon-ellipsis>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-notification slot="start"></mui-icon-notification>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle>
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-down-arrow-circle slot="end"></mui-icon-down-arrow-circle>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          const btn = document.getElementById('btn');<br />
          const toggle = btn.querySelector('mui-icon-toggle');<br />
          <br />
          btn.addEventListener('click', () =&gt; {<br />
          &nbsp;&nbsp;toggle.toggle = !toggle.toggle;<br />
          &nbsp;&nbsp;toggle.setAttribute('aria-pressed', toggle.toggle);<br />
          });
          <br />
          <br />
          &lt;mui-button id="btn" variant="primary"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-toggle&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;<br />
          &nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

<story-card id="icon-toggle-morph" title="${storyMeta["icon-toggle-morph"].title}" description="${storyMeta["icon-toggle-morph"].description}" usage="${storyMeta["icon-toggle-morph"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-h-stack space="var(--space-100)" wrap>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="secondary">
              <mui-icon-toggle morph>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-icon-toggle morph>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="attention">
              <mui-icon-toggle morph>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
          <mui-h-stack space="var(--space-100)" wrap>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-sun slot="start"></mui-icon-sun>
                <mui-icon-moon slot="end"></mui-icon-moon>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-play-fill slot="start"></mui-icon-play-fill>
                <mui-icon-pause slot="end"></mui-icon-pause>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-menu slot="start"></mui-icon-menu>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-search slot="start"></mui-icon-search>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-speaker-two-wave slot="start"></mui-icon-speaker-two-wave>
                <mui-icon-speaker-mute slot="end"></mui-icon-speaker-mute>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-pin slot="start"></mui-icon-pin>
                <mui-icon-pin-slash slot="end"></mui-icon-pin-slash>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-grid slot="start"></mui-icon-grid>
                <mui-icon-list-and-film slot="end"></mui-icon-list-and-film>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-down-chevron slot="start"></mui-icon-down-chevron>
                <mui-icon-up-chevron slot="end"></mui-icon-up-chevron>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-fullscreen slot="start"></mui-icon-fullscreen>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-left-sidebar slot="start"></mui-icon-left-sidebar>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-ellipsis slot="start"></mui-icon-ellipsis>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-notification slot="start"></mui-icon-notification>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle morph>
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-down-arrow-circle slot="end"></mui-icon-down-arrow-circle>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          const btn = document.getElementById('btn');<br />
          const toggle = btn.querySelector('mui-icon-toggle');<br />
          <br />
          btn.addEventListener('click', () =&gt; {<br />
          &nbsp;&nbsp;toggle.toggle = !toggle.toggle;<br />
          &nbsp;&nbsp;toggle.setAttribute('aria-pressed', toggle.toggle);<br />
          });
          <br />
          <br />
          &lt;mui-button id="btn" variant="primary"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-toggle&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;<br />
          &nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card id="icon-toggle-rotate" title="${storyMeta["icon-toggle-rotate"].title}" description="${storyMeta["icon-toggle-rotate"].description}" usage="${storyMeta["icon-toggle-rotate"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-h-stack space="var(--space-100)">
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="secondary">
              <mui-icon-toggle rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-icon-toggle rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="attention">
              <mui-icon-toggle rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
          <mui-h-stack space="var(--space-100)" wrap>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-sun slot="start"></mui-icon-sun>
                <mui-icon-moon slot="end"></mui-icon-moon>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-play-fill slot="start"></mui-icon-play-fill>
                <mui-icon-pause slot="end"></mui-icon-pause>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-menu slot="start"></mui-icon-menu>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-search slot="start"></mui-icon-search>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-speaker-two-wave slot="start"></mui-icon-speaker-two-wave>
                <mui-icon-speaker-mute slot="end"></mui-icon-speaker-mute>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-pin slot="start"></mui-icon-pin>
                <mui-icon-pin-slash slot="end"></mui-icon-pin-slash>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-grid slot="start"></mui-icon-grid>
                <mui-icon-list-and-film slot="end"></mui-icon-list-and-film>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-down-chevron slot="start"></mui-icon-down-chevron>
                <mui-icon-up-chevron slot="end"></mui-icon-up-chevron>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-fullscreen slot="start"></mui-icon-fullscreen>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-left-sidebar slot="start"></mui-icon-left-sidebar>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-ellipsis slot="start"></mui-icon-ellipsis>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-notification slot="start"></mui-icon-notification>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-toggle rotate>
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-down-arrow-circle slot="end"></mui-icon-down-arrow-circle>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          const btn = document.getElementById('btn');<br />
          const toggle = btn.querySelector('mui-icon-toggle');<br />
          <br />
          btn.addEventListener('click', () =&gt; {<br />
          &nbsp;&nbsp;toggle.toggle = !toggle.toggle;<br />
          &nbsp;&nbsp;toggle.setAttribute('aria-pressed', toggle.toggle);<br />
          });
          <br />
          <br />
          &lt;mui-button id="btn" variant="primary"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-toggle rotate&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;<br />
          &nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card id="icon-type" title="${storyMeta["icon-type"].title}" description="${storyMeta["icon-type"].description}" usage="${storyMeta["icon-type"].usage}">

        <mui-grid space="var(--space-400)" slot="body" col="repeat(auto-fit, minmax(28rem, 1fr))">

          <story-icon-grid center>
            <mui-icon-accessibility slot="body"></mui-icon-accessibility>
            <mui-code slot="footer" scrollable>mui-icon-accessibility</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-add slot="body"></mui-icon-add>
            <mui-code slot="footer" scrollable>mui-icon-add</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-close slot="body"></mui-icon-close>
            <mui-code slot="footer" scrollable>mui-icon-close</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-calendar slot="body"></mui-icon-calendar>
            <mui-code slot="footer" scrollable>mui-icon-calendar</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-up-arrow slot="body"></mui-icon-up-arrow>
            <mui-code slot="footer" scrollable>mui-icon-up-arrow</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-up-chevron slot="body"></mui-icon-up-chevron>
            <mui-code slot="footer" scrollable>mui-icon-up-chevron</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-down-chevron slot="body"></mui-icon-down-chevron>
            <mui-code slot="footer" scrollable>mui-icon-down-chevron</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-left-sidebar slot="body"></mui-icon-left-sidebar>
            <mui-code slot="footer" scrollable>mui-icon-left-sidebar</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-left-chevron slot="body"></mui-icon-left-chevron>
            <mui-code slot="footer" scrollable>mui-icon-left-chevron</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-right-chevron slot="body"></mui-icon-right-chevron>
            <mui-code slot="footer" scrollable>mui-icon-right-chevron</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-ellipsis slot="body"></mui-icon-ellipsis>
            <mui-code slot="footer" scrollable>mui-icon-ellipsis</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-grid slot="body"></mui-icon-grid>
            <mui-code slot="footer" scrollable>mui-icon-grid</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-left-arrow slot="body"></mui-icon-left-arrow>
            <mui-code slot="footer" scrollable>mui-icon-left-arrow</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-menu slot="body"></mui-icon-menu>
            <mui-code slot="footer" scrollable>mui-icon-menu</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-message slot="body"></mui-icon-message>
            <mui-code slot="footer" scrollable>mui-icon-message</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-moon slot="body"></mui-icon-moon>
            <mui-code slot="footer" scrollable>mui-icon-moon</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-sun slot="body"></mui-icon-sun>
            <mui-code slot="footer" scrollable>mui-icon-sun</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-subtract slot="body"></mui-icon-subtract>
            <mui-code slot="footer" scrollable>mui-icon-subtract</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-check slot="body"></mui-icon-check>
            <mui-code slot="footer" scrollable>mui-icon-check</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-info slot="body"></mui-icon-info>
            <mui-code slot="footer" scrollable>mui-icon-info</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-notification slot="body"></mui-icon-notification>
            <mui-code slot="footer" scrollable>mui-icon-notification</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-warning slot="body"></mui-icon-warning>
            <mui-code slot="footer" scrollable>mui-icon-warning</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-attention slot="body"></mui-icon-attention>
            <mui-code slot="footer" scrollable>mui-icon-attention</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-exclamationmark slot="body"></mui-icon-exclamationmark>
            <mui-code slot="footer" scrollable>mui-icon-exclamationmark</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-globe slot="body"></mui-icon-globe>
            <mui-code slot="footer" scrollable>mui-icon-globe</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-stop slot="body"></mui-icon-stop>
            <mui-code slot="footer" scrollable>mui-icon-stop</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-spinner slot="body"></mui-icon-spinner>
            <mui-code slot="footer" scrollable>mui-icon-spinner</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-down-arrow-circle slot="body"></mui-icon-down-arrow-circle>
            <mui-code slot="footer" scrollable>mui-icon-down-arrow-circle</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-menu slot="body"></mui-icon-menu>
            <mui-code slot="footer" scrollable>mui-icon-menu</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-gear slot="body"></mui-icon-gear>
            <mui-code slot="footer" scrollable>mui-icon-gear</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-translate slot="body"></mui-icon-translate>
            <mui-code slot="footer" scrollable>mui-icon-translate</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-translate flip slot="body"></mui-icon-translate>
            <mui-code slot="footer" scrollable>mui-icon-translate flip</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-home slot="body"></mui-icon-home>
            <mui-code slot="footer" scrollable>mui-icon-home</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-play-stack slot="body"></mui-icon-play-stack>
            <mui-code slot="footer" scrollable>mui-icon-play-stack</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-game-controller slot="body"></mui-icon-game-controller>
            <mui-code slot="footer" scrollable>mui-icon-game-controller</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-movie-clapper slot="body"></mui-icon-movie-clapper>
            <mui-code slot="footer" scrollable>mui-icon-movie-clapper</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-music-microphone slot="body"></mui-icon-music-microphone>
            <mui-code slot="footer" scrollable>mui-icon-music-microphone</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-music-quarter-note slot="body"></mui-icon-music-quarter-note>
            <mui-code slot="footer" scrollable>mui-icon-music-quarter-note</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-play-rectangle slot="body"></mui-icon-play-rectangle>
            <mui-code slot="footer" scrollable>mui-icon-play-rectangle</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-list-and-film slot="body"></mui-icon-list-and-film>
            <mui-code slot="footer" scrollable>mui-icon-list-and-film</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-search slot="body"></mui-icon-search>
            <mui-code slot="footer" scrollable>mui-icon-search</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-checkmark slot="body"></mui-icon-checkmark>
            <mui-code slot="footer" scrollable>mui-icon-checkmark</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-ai slot="body"></mui-icon-ai>
            <mui-code slot="footer" scrollable>mui-icon-ai</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-rectangle slot="body"></mui-icon-rectangle>
            <mui-code slot="footer" scrollable>mui-icon-rectangle</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-rectangle-media-text slot="body"></mui-icon-rectangle-media-text>
            <mui-code slot="footer" scrollable>mui-icon-rectangle-media-text</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-rectangle-dashed slot="body"></mui-icon-rectangle-dashed>
            <mui-code slot="footer" scrollable>mui-icon-rectangle-dashed</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-rectangle-left-drawer slot="body"></mui-icon-rectangle-left-drawer>
            <mui-code slot="footer" scrollable>mui-icon-rectangle-left-drawer</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-rectangle-right-drawer slot="body"></mui-icon-rectangle-right-drawer>
            <mui-code slot="footer" scrollable>mui-icon-rectangle-right-drawer</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-panel slot="body"></mui-icon-panel>
            <mui-code slot="footer" scrollable>mui-icon-panel</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-fullscreen slot="body"></mui-icon-fullscreen>
            <mui-code slot="footer" scrollable>mui-icon-fullscreen</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-pause slot="body"></mui-icon-pause>
            <mui-code slot="footer" scrollable>mui-icon-pause</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-picture-in-picture slot="body"></mui-icon-picture-in-picture>
            <mui-code slot="footer" scrollable>mui-icon-picture-in-picture</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-play-fill slot="body"></mui-icon-play-fill>
            <mui-code slot="footer" scrollable>mui-icon-play-fill</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-reload slot="body"></mui-icon-reload>
            <mui-code slot="footer" scrollable>mui-icon-reload</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-speaker-mute slot="body"></mui-icon-speaker-mute>
            <mui-code slot="footer" scrollable>mui-icon-speaker-mute</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-speaker-one-wave slot="body"></mui-icon-speaker-one-wave>
            <mui-code slot="footer" scrollable>mui-icon-speaker-one-wave</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-speaker-two-wave slot="body"></mui-icon-speaker-two-wave>
            <mui-code slot="footer" scrollable>mui-icon-speaker-two-wave</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-stop-fill slot="body"></mui-icon-stop-fill>
            <mui-code slot="footer" scrollable>mui-icon-stop-fill</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-vertical-ellipsis slot="body"></mui-icon-vertical-ellipsis>
            <mui-code slot="footer" scrollable>mui-icon-vertical-ellipsis</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-pin slot="body"></mui-icon-pin>
            <mui-code slot="footer" scrollable>mui-icon-pin</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-pin-slash slot="body"></mui-icon-pin-slash>
            <mui-code slot="footer" scrollable>mui-icon-pin-slash</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-text-below-folder slot="body"></mui-icon-text-below-folder>
            <mui-code slot="footer" scrollable>mui-icon-text-below-folder</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-timer slot="body"></mui-icon-timer>
            <mui-code slot="footer" scrollable>mui-icon-timer</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-copy slot="body"></mui-icon-copy>
            <mui-code slot="footer" scrollable>mui-icon-copy</mui-code>
          </story-icon-grid>
        </mui-grid>

      </story-card>

      <story-card id="color-options" title="${storyMeta["color-options"].title}" description="${storyMeta["color-options"].description}" usage="${storyMeta["color-options"].usage}">

        <mui-grid space="var(--space-400)" slot="body" col="repeat(auto-fit, minmax(28rem, 1fr))">

          <story-icon-grid center>
            <mui-icon-menu slot="body"></mui-icon-menu>
            <mui-body size="x-small" weight="bold" class="color-options" slot="body">Default Color</mui-body>
            <mui-code slot="footer" scrollable>mui-icon-menu</mui-code>
          </story-icon-grid>

          <story-icon-grid center theme="inverted">
            <mui-icon-menu slot="body" color="inverted"></mui-icon-menu>
            <mui-body size="x-small" weight="bold" class="color-options inverted" slot="body">Inverted Color</mui-body>
            <mui-code slot="footer" scrollable> color="inverted"</mui-code>
          </story-icon-grid>

          <story-icon-grid center>
            <mui-icon-menu slot="body" color="var(--blue-500)"></mui-icon-menu>
            <mui-body size="x-small" weight="bold" class="color-options" slot="body">Custom Color</mui-body>
            <mui-code slot="footer" scrollable>color="var(--blue-500)"</mui-code>
          </story-icon-grid>

        </mui-grid>

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

        imports='["@muibook/components/mui-icons"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>

    `;

    const buttons = this.shadowRoot.querySelectorAll("mui-button");

    buttons.forEach((btn) => {
      const toggle = btn.querySelector("mui-icon-toggle");
      if (!toggle) return;

      btn.addEventListener("click", () => {
        toggle.toggle = !toggle.toggle;
        toggle.setAttribute("aria-pressed", toggle.toggle);
      });
    });
  }
}

customElements.define("story-icon", storyIcon);
