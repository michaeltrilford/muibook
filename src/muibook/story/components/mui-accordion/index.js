import { getComponentDocs } from "../../../utils/story-data";

class storyAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Accordion");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Accordion"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
    const attrsReference = JSON.stringify([
      {
        component: "mui-accordion-block",
        parentAttrs: [],
        childAttrs: ["card-slot", "first-child", "last-child"],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }

      .nav-link {
        width: 100%;
        text-align: left;
      }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

      /* Accordion Core */
      [data-icon-animation="accordion-inline"] {
        transition: var(--speed-200) ease-in-out;
      }

      [data-icon-animation="accordion-inline"][open] {
        transform: rotate(90deg);
      }

      [data-icon-animation="accordion-block"] {
        transition: transform var(--speed-200) ease-in-out;

      }

      [data-icon-animation="accordion-block"][open] {
        transform: rotate(-180deg);
      }



    `;

    const stories = /*html*/ `
        <mui-v-stack space="var(--space-100)">
          <story-api-types tag="mui-accordion-block" title="Accordion Block"></story-api-types>
          <story-api-types tag="mui-accordion-inline" title="Accordion Inline"></story-api-types>
          <story-api-types tag="mui-accordion-group" title="Accordion Group"></story-api-types>
          <story-api-types tag="mui-accordion-core" title="Accordion Core"></story-api-types>
        </mui-v-stack>

        <story-card id="accordion-inline" title="${storyMeta["accordion-inline"].title}" description="${storyMeta["accordion-inline"].description}" usage="${storyMeta["accordion-inline"].usage}">
          <div slot="body">
            <mui-accordion-inline heading="Heading">
              <mui-list as="ul" slot="detail">
                <mui-list-item>Coffee</mui-list-item>
                <mui-list-item>Tea</mui-list-item>
                <mui-list-item>Milk</mui-list-item>
              </mui-list>
            </mui-accordion-inline>
          </div>
          <story-code-block slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code-block>
        </story-card>

        <story-card id="accordion-group-and-block" title="${storyMeta["accordion-group-and-block"].title}" description="${storyMeta["accordion-group-and-block"].description}" usage="${storyMeta["accordion-group-and-block"].usage}">
          <mui-accordion-group slot="body">
            <mui-accordion-block heading="Heading">
              <div slot="detail">
                  Content
              </div>
            </mui-accordion-block>
            <mui-accordion-block heading="Heading">
              <div slot="detail">
                  Content
              </div>
            </mui-accordion-block>
          </mui-accordion-group>
          <story-code-block slot="footer">
            &lt;mui-accordion-group&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-accordion-block&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-accordion-block&gt;
            <br />
            &lt;/mui-accordion-group&gt;
          </story-code-block>
        </story-card>

        <story-card id="accordion-group-and-block-exclusive" title="${storyMeta["accordion-group-and-block-exclusive"].title}" description="${storyMeta["accordion-group-and-block-exclusive"].description}" usage="${storyMeta["accordion-group-and-block-exclusive"].usage}">
          <mui-accordion-group exclusive slot="body">
            <mui-accordion-block heading="Heading">
              <div slot="detail">
                  Content
              </div>
            </mui-accordion-block>
            <mui-accordion-block heading="Heading">
              <div slot="detail">
                  Content
              </div>
            </mui-accordion-block>
          </mui-accordion-group>
          <story-code-block slot="footer">
            &lt;mui-accordion-group exclusive&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-accordion-block&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-accordion-block&gt;
            <br />
            &lt;/mui-accordion-group&gt;
          </story-code-block>
        </story-card>

        <story-card id="tab-behaviour-button" title="${storyMeta["tab-behaviour-button"].title}" description="${storyMeta["tab-behaviour-button"].description}" usage="${storyMeta["tab-behaviour-button"].usage}">
          <div slot="body">
            <mui-accordion-inline heading="Heading">
              <div slot="detail">
                <mui-button variant="primary">Focus on Open</mui-button>
              </div>
            </mui-accordion-inline>
          </div>
          <story-code-block slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code-block>
        </story-card>

        <story-card id="tab-behaviour-link" title="${storyMeta["tab-behaviour-link"].title}" description="${storyMeta["tab-behaviour-link"].description}" usage="${storyMeta["tab-behaviour-link"].usage}">
          <div slot="body">
            <mui-accordion-inline heading="Heading">
              <div slot="detail">
                <mui-link variant="primary">Focus on Open</mui-link>
              </div>
            </mui-accordion-inline>
          </div>
          <story-code-block slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code-block>
        </story-card>

        <story-card id="detail-space-none" title="${storyMeta["detail-space-none"].title}" description="${storyMeta["detail-space-none"].description}" usage="${storyMeta["detail-space-none"].usage}">
          <mui-accordion-block heading="Design Tokens" detail-space="none" slot="body" style="width: 26rem;">
            <mui-v-stack slot="detail" space="var(--space-000)" style="padding: var(--space-100)">
              <mui-link variant="tertiary" class="nav-link">Brand</mui-link>
              <mui-link variant="tertiary" class="nav-link">Semantic</mui-link>
              <mui-link variant="tertiary" class="nav-link">Component</mui-link>
            </mui-v-stack>
          </mui-accordion-block>
          <story-code-block slot="footer">
            const styles = &#96;<br>
            &nbsp;&nbsp;.nav-link {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;width: 100%;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;text-align: left;<br>
            &nbsp;&nbsp;}<br>
            &#96;<br><br>

            &lt;mui-accordion-block heading="Design Tokens" detail-space="none" style="width: 26rem;"&gt;<br>
            &nbsp;&nbsp;&lt;mui-v-stack slot="detail" space="var(--space-000)" style="padding: var(--space-100)"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link variant="tertiary" class="nav-link"&gt;Brand&lt;/mui-link&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link variant="tertiary" class="nav-link"&gt;Semantic&lt;/mui-link&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link variant="tertiary" class="nav-link"&gt;Component&lt;/mui-link&gt;<br>
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &lt;/mui-accordion-block&gt;
          </story-code-block>
        </story-card>

        <story-card id="card-w-accordion" title="${storyMeta["card-w-accordion"].title}" description="${storyMeta["card-w-accordion"].description}" usage="${storyMeta["card-w-accordion"].usage}">
          <div slot="body">
            <mui-card>
              <mui-card-body>
                <mui-accordion-group exclusive>
                  <mui-accordion-block heading="Heading">
                    <div slot="detail">
                        Content
                    </div>
                  </mui-accordion-block>
                  <mui-accordion-block heading="Heading">
                    <div slot="detail">
                        Content
                    </div>
                  </mui-accordion-block>
                </mui-accordion-group>
              </mui-card-body>
            </mui-card>
          </div>
          <story-code-block slot="footer">
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-group exclusive&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-group&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code-block>
        </story-card>

        <story-card id="card-header-w-accordion" title="${storyMeta["card-header-w-accordion"].title}" description="${storyMeta["card-header-w-accordion"].description}" usage="${storyMeta["card-header-w-accordion"].usage}">
          <div slot="body">
            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Title</mui-heading>
              </mui-card-header>
              <mui-rule></mui-rule>
              <mui-card-body>
                <mui-accordion-group exclusive>
                  <mui-accordion-block heading="Heading">
                    <div slot="detail">
                      Content
                    </div>
                  </mui-accordion-block>
                  <mui-accordion-block heading="Heading">
                    <div slot="detail">
                      Content
                    </div>
                  </mui-accordion-block>
                </mui-accordion-group>
              </mui-card-body>
            </mui-card>
          </div>
          <story-code-block slot="footer">
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;Title&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-group exclusive&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Heading"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-group&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code-block>
        </story-card>

        <story-card id="accordion-slat-detection" title="${storyMeta["accordion-slat-detection"].title}" description="${storyMeta["accordion-slat-detection"].description}" usage="${storyMeta["accordion-slat-detection"].usage}">
          <div slot="body">
            <mui-accordion-group exclusive>
              <mui-accordion-block heading="Default">
                <mui-v-stack slot="detail">
                  <mui-body>Use the mui-slat-group and when placed inside of a mui-card, the usage=“card” attribute is automatically applied for consistent styling.</mui-body>
                  <mui-slat-group>
                    <mui-slat variant="header">
                      <mui-heading slot="start" size="6">Today</mui-heading>
                      <mui-h-stack slot="end" alignX="end">
                        <mui-body size="small">22 July 2025</mui-body>
                      </mui-h-stack>
                    </mui-slat>
                    <mui-slat variant="action">
                      <mui-v-stack slot="start" space="0">
                        <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                        <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                      </mui-v-stack>
                      <mui-v-stack space="0" slot="end" alignX="end">
                        <mui-body size="x-small">10:32 AM</mui-body>
                      </mui-v-stack>
                    </mui-slat>
                    <mui-slat variant="action">
                      <mui-v-stack slot="start" space="0">
                        <mui-body size="small" weight="bold">Password changed</mui-body>
                        <mui-body size="x-small">Security settings updated</mui-body>
                      </mui-v-stack>
                      <mui-v-stack space="0" slot="end" alignX="end">
                        <mui-body size="x-small">08:47 AM</mui-body>
                      </mui-v-stack>
                    </mui-slat>
                    <mui-rule></mui-rule>
                    <!-- Yesterday -->
                    <mui-slat variant="header">
                      <mui-heading slot="start" size="6">Yesterday</mui-heading>
                      <mui-h-stack slot="end" alignX="end">
                        <mui-body size="small">21 July 2025</mui-body>
                      </mui-h-stack>
                    </mui-slat>
                    <mui-slat variant="action">
                      <mui-v-stack slot="start" space="0">
                        <mui-body size="small" weight="bold">2FA code sent</mui-body>
                        <mui-body size="x-small">Method: SMS</mui-body>
                      </mui-v-stack>
                      <mui-v-stack space="0" slot="end" alignX="end">
                        <mui-body size="x-small">04:19 PM</mui-body>
                      </mui-v-stack>
                    </mui-slat>
                  </mui-slat-group>
                </mui-v-stack>

              </mui-accordion-block>
              <mui-accordion-block heading="Opt-out">
                <mui-v-stack slot="detail" space="var(--space-200)" style="max-width: 400px; margin: var(--space-200) auto 0;">
                  <mui-body style="padding-left: var(--space-400); padding-right: var(--space-400)">Opt-out by simply not using the mui-slat-group helper, however extra effort is required to craft the layout.</mui-body>
                  <mui-v-stack space="var(--space-000)">
                    <mui-slat variant="header">
                      <mui-heading slot="start" size="6">Today</mui-heading>
                      <mui-h-stack slot="end" alignX="end">
                        <mui-body size="small">22 July 2025</mui-body>
                      </mui-h-stack>
                    </mui-slat>
                    <mui-v-stack space="var(--space-050)">
                      <mui-slat variant="action">
                        <mui-v-stack slot="start" space="0">
                          <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                          <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                        </mui-v-stack>
                        <mui-v-stack space="0" slot="end" alignX="end">
                          <mui-body size="x-small">10:32 AM</mui-body>
                        </mui-v-stack>
                      </mui-slat>
                      <mui-slat variant="action">
                        <mui-v-stack slot="start" space="0">
                          <mui-body size="small" weight="bold">Password changed</mui-body>
                          <mui-body size="x-small">Security settings updated</mui-body>
                        </mui-v-stack>
                        <mui-v-stack space="0" slot="end" alignX="end">
                          <mui-body size="x-small">08:47 AM</mui-body>
                        </mui-v-stack>
                      </mui-slat>
                    </mui-v-stack>
                    <mui-rule style="margin-top: var(--space-300)"></mui-rule>
                    <!-- Yesterday -->
                    <mui-slat variant="header">
                      <mui-heading slot="start" size="6">Yesterday</mui-heading>
                      <mui-h-stack slot="end" alignX="end">
                        <mui-body size="small">21 July 2025</mui-body>
                      </mui-h-stack>
                    </mui-slat>
                    <mui-v-stack space="var(--space-050)">
                      <mui-slat variant="action">
                        <mui-v-stack slot="start" space="0">
                          <mui-body size="small" weight="bold">2FA code sent</mui-body>
                          <mui-body size="x-small">Method: SMS</mui-body>
                        </mui-v-stack>
                        <mui-v-stack space="0" slot="end" alignX="end">
                          <mui-body size="x-small">04:19 PM</mui-body>
                        </mui-v-stack>
                      </mui-slat>
                    </mui-v-stack>
                  </mui-v-stack>
                </mui-v-stack>
              </mui-accordion-block>
            </mui-accordion-group>
          </div>
          <story-code-block slot="footer">
            &nbsp;&nbsp;&lt;mui-accordion-group exclusive&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Default"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Use the mui-slat-group and when placed inside of a mui-card, the usage=“card” attribute is automatically applied for consistent styling.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Signed in from new device&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;10:32 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Password changed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Security settings updated&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;08:47 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Opt-out"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="detail" space="var(--space-200)" style="max-width: 400px; margin: var(--space-200) auto 0;"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-group&gt;<br>
          </story-code-block>
        </story-card>

        <story-card id="card-slat-detection" title="${storyMeta["card-slat-detection"].title}" description="${storyMeta["card-slat-detection"].description}" usage="${storyMeta["card-slat-detection"].usage}">
          <div slot="body">
            <mui-card>
              <mui-card-body>
                <mui-accordion-group exclusive>
                  <mui-accordion-block heading="Default">
                    <mui-v-stack slot="detail">
                      <mui-body>Use the mui-slat-group and when placed inside of a mui-card, the usage=“card” attribute is automatically applied for consistent styling.</mui-body>
                      <mui-slat-group>
                        <mui-slat variant="header">
                          <mui-heading slot="start" size="6">Today</mui-heading>
                          <mui-h-stack slot="end" alignX="end">
                            <mui-body size="small">22 July 2025</mui-body>
                          </mui-h-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                            <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">10:32 AM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">Password changed</mui-body>
                            <mui-body size="x-small">Security settings updated</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">08:47 AM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                        <mui-rule></mui-rule>
                        <!-- Yesterday -->
                        <mui-slat variant="header">
                          <mui-heading slot="start" size="6">Yesterday</mui-heading>
                          <mui-h-stack slot="end" alignX="end">
                            <mui-body size="small">21 July 2025</mui-body>
                          </mui-h-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">2FA code sent</mui-body>
                            <mui-body size="x-small">Method: SMS</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">04:19 PM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                      </mui-slat-group>
                    </mui-v-stack>

                  </mui-accordion-block>
                  <mui-accordion-block heading="Opt-out">
                    <mui-v-stack slot="detail" space="var(--space-200)" style="max-width: 400px; margin: var(--space-200) auto 0;">
                      <mui-body style="padding-left: var(--space-400); padding-right: var(--space-400)">Opt-out by simply not using the mui-slat-group helper, however extra effort is required to craft the layout.</mui-body>
                      <mui-v-stack space="var(--space-000)">
                        <mui-slat variant="header">
                          <mui-heading slot="start" size="6">Today</mui-heading>
                          <mui-h-stack slot="end" alignX="end">
                            <mui-body size="small">22 July 2025</mui-body>
                          </mui-h-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                            <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">10:32 AM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">Password changed</mui-body>
                            <mui-body size="x-small">Security settings updated</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">08:47 AM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                        <mui-rule style="margin-top: var(--space-300)"></mui-rule>
                        <!-- Yesterday -->
                        <mui-slat variant="header">
                          <mui-heading slot="start" size="6">Yesterday</mui-heading>
                          <mui-h-stack slot="end" alignX="end">
                            <mui-body size="small">21 July 2025</mui-body>
                          </mui-h-stack>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="0">
                            <mui-body size="small" weight="bold">2FA code sent</mui-body>
                            <mui-body size="x-small">Method: SMS</mui-body>
                          </mui-v-stack>
                          <mui-v-stack space="0" slot="end" alignX="end">
                            <mui-body size="x-small">04:19 PM</mui-body>
                          </mui-v-stack>
                        </mui-slat>
                      </mui-v-stack>
                    </mui-v-stack>
                  </mui-accordion-block>
                </mui-accordion-group>
              </mui-card-body>
            </mui-card>
          </div>
          <story-code-block slot="footer">
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-group exclusive&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Default"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="detail"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Use the mui-slat-group and when placed inside of a mui-card, the usage=“card” attribute is automatically applied for consistent styling.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Signed in from new device&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;10:32 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Password changed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Security settings updated&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;08:47 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading="Opt-out"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="detail" space="var(--space-200)" style="max-width: 400px; margin: var(--space-200) auto 0;"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code-block>
        </story-card>

        <story-card id="accordion-core" title="${storyMeta["accordion-core"].title}" description="${storyMeta["accordion-core"].description}" usage="${storyMeta["accordion-core"].usage}">
          <mui-v-stack slot="body">

            <mui-accordion-core>
              <mui-h-stack space="var(--space-200)" alignY="center" slot="summary">
                <mui-icon-right-chevron></mui-icon-right-chevron>
                <mui-heading size="3">Accordion Inline</mui-heading>
              </mui-h-stack>
              <div slot="detail" style="padding-top: var(--space-400);">
                <mui-body>This is the detailed content inside the accordion.</mui-body>
              </div>
            </mui-accordion-core>

            <mui-card>
              <mui-accordion-core>
                <mui-card-header slot="summary">
                  <mui-h-stack space="var(--space-100)" alignX="space-between" alignY="center">
                    <mui-heading size="3">Accordion Block</mui-heading>
                    <mui-icon-down-chevron></mui-icon-down-chevron>
                  </mui-h-stack>
                </mui-card-header>
                <div slot="detail">
                  <mui-rule></mui-rule>
                  <mui-card-body>
                    <mui-body>This is the detailed content inside the accordion.</mui-body>
                  </mui-card-body>
                </div>
              </mui-accordion-core>
            </mui-card>

            <mui-card>
              <mui-accordion-core>
                <mui-card-header slot="summary">
                  <mui-h-stack space="var(--space-100)" alignX="space-between" alignY="center">
                    <mui-heading size="3">Accordion w/ Icon Toggle</mui-heading>
                    <mui-icon-toggle rotate>
                        <mui-icon-add slot="start"></mui-icon-add>
                        <mui-icon-subtract slot="end"></mui-icon-subtract>
                      </mui-icon-toggle>
                  </mui-h-stack>
                </mui-card-header>
                <div slot="detail">
                  <mui-rule></mui-rule>
                  <mui-card-body>
                    <mui-body>This is the detailed content inside the accordion.</mui-body>
                  </mui-card-body>
                </div>
              </mui-accordion-core>
            </mui-card>

          </mui-v-stack>

          <story-code-block slot="footer">

            // Custom: Accordion Inline<br>
            /* ================================================================ */<br><br>

            // Styles must be added where the component is used to pierce the shadow DOM.<br>
            // This only works with &lt;mui-icon-right-chevron&gt;<br>
            // Attributes are set by &lt;mui-accordion-core&gt;.<br><br>

            [data-icon-animation=&quot;accordion-inline&quot;] {<br>
            &nbsp;&nbsp;transition: var(--speed-200) ease-in-out;<br>
            }<br><br>

            [data-icon-animation=&quot;accordion-inline&quot;][open] {<br>
            &nbsp;&nbsp;transform: rotate(90deg);<br>
            }<br><br>

            &nbsp;&nbsp;&lt;mui-accordion-core&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-200)&quot; alignY=&quot;center&quot; slot=&quot;summary&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-right-chevron&gt;&lt;/mui-icon-right-chevron&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot;&gt;Accordion Inline&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot=&quot;detail&quot; style="padding-top: var(--space-400);"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;This is the detailed content inside the accordion.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&lt;/mui-accordion-core&gt;<br><br><br><br>


            // Custom: Accordion Block<br>
            /* ================================================================ */<br><br>

            // Styles must be added where the component is used to pierce the shadow DOM.<br>
            // This only works with &lt;mui-icon-down-chevron&gt;<br>
            // Attributes are set by &lt;mui-accordion-core&gt;.<br><br>

            [data-icon-animation=&quot;accordion-block&quot;] {<br>
            &nbsp;&nbsp;transition: transform var(--speed-200) ease-in-out;<br>
            }<br><br>

            [data-icon-animation=&quot;accordion-block&quot;][open] {<br>
            &nbsp;&nbsp;transform: rotate(-180deg);<br>
            }<br><br>

            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-accordion-core&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-header slot=&quot;summary&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignX=&quot;space-between&quot; alignY=&quot;center&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot;&gt;Accordion Block&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-down-chevron&gt;&lt;/mui-icon-down-chevron&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot=&quot;detail&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;This is the detailed content inside the accordion.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&lt;/mui-accordion-core&gt;<br>
            &lt;/mui-card&gt;<br><br><br><br>


            // Custom: Accordion (Icon-Toggle)<br>
            /* ================================================================ */<br><br>

            // Experiment with the &lt;mui-icon-toggle&gt; to utilise the toggle behaviour for the accordion.<br>
            // Attributes are set by &lt;mui-accordion-core&gt;.<br><br>


            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-accordion-core&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-header slot=&quot;summary&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignX=&quot;space-between&quot; alignY=&quot;center&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot;&gt;Accordion w/ Icon Toggle&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-toggle rotate&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot=&quot;start&quot;&gt;&lt;/mui-icon-add&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot=&quot;end&quot;&gt;&lt;/mui-icon-subtract&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot=&quot;detail&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;This is the detailed content inside the accordion.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&lt;/mui-accordion-core&gt;<br>
            &lt;/mui-card&gt;
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


        imports='["@muibook/components/mui-accordion"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>


        ${stories}


      </story-template>
    `;

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    this.shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = this.shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("story-accordion", storyAccordion);
