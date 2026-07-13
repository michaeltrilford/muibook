import { getComponentDocs } from "../../../utils/story-data";
import MikeAvatar from "../../../images/mui/avatar-mike.jpg";

class storyChip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Chip");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Chip"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
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
      .multi-select::part(width) { width: 400px; }

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

        <story-card canvas-background="var(--app-story-canvas-100)" id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
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

        <story-card canvas-background="var(--app-story-canvas-100)" id="icon-before" title="${storyMeta["icon-before"].title}" description="${storyMeta["icon-before"].description}" usage="${storyMeta["icon-before"].usage}">
           <mui-v-stack slot="body" space="var(--space-200)">
            <mui-chip size="x-small">
              <mui-icon-movie-clapper slot="before"></mui-icon-movie-clapper>
              Films
            </mui-chip>
            <mui-chip size="small">
              <mui-icon-game-controller slot="before"></mui-icon-game-controller>
              Games
            </mui-chip>
            <mui-chip size="medium">
              <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
              Videos
            </mui-chip>
            <mui-chip size="large">
              <mui-icon-music-quarter-note slot="before"></mui-icon-music-quarter-note>
              Music
            </mui-chip>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle slot="before"&gt;&lt;/mui-icon-down-arrow-circle&gt;<br />
            &nbsp;&nbsp;Downloads
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--app-story-canvas-100)" id="icon-after" title="${storyMeta["icon-after"].title}" description="${storyMeta["icon-after"].description}" usage="${storyMeta["icon-after"].usage}">
          <mui-v-stack slot="body" space="var(--space-200)">
            <mui-chip size="x-small">
              Films
              <mui-icon-movie-clapper slot="after"></mui-icon-movie-clapper>
            </mui-chip>
            <mui-chip size="small">
              Games
              <mui-icon-game-controller slot="after"></mui-icon-game-controller>
            </mui-chip>
            <mui-chip size="medium">
              Videos
              <mui-icon-play-rectangle slot="after"></mui-icon-play-rectangle>
            </mui-chip>
            <mui-chip size="large">
              Music
              <mui-icon-music-quarter-note slot="after"></mui-icon-music-quarter-note>
            </mui-chip>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;Downloads<br />
            &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle slot="after"&gt;&lt;/mui-icon-down-arrow-circle&gt;<br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--app-story-canvas-100)" id="icon-before-and-after" title="${storyMeta["icon-before-and-after"].title}" description="${storyMeta["icon-before-and-after"].description}" usage="${storyMeta["icon-before-and-after"].usage}">
           <mui-v-stack slot="body" space="var(--space-200)">
            <mui-chip size="x-small">
              <mui-icon-movie-clapper slot="before"></mui-icon-movie-clapper>
              Films
              <mui-icon-movie-clapper slot="after"></mui-icon-movie-clapper>
            </mui-chip>
            <mui-chip size="small">
              <mui-icon-game-controller slot="before"></mui-icon-game-controller>
              Games
              <mui-icon-game-controller slot="after"></mui-icon-game-controller>
            </mui-chip>
            <mui-chip size="medium">
              <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
              Videos
              <mui-icon-play-rectangle slot="after"></mui-icon-play-rectangle>
            </mui-chip>
            <mui-chip size="large">
              <mui-icon-music-quarter-note slot="before"></mui-icon-music-quarter-note>
              Music
              <mui-icon-music-quarter-note slot="after"></mui-icon-music-quarter-note>
            </mui-chip>


            <mui-chip size="x-small">
              <mui-badge variant="positive" slot="before">Beta</mui-badge>
              Films
              <mui-icon-movie-clapper slot="after"></mui-icon-movie-clapper>
            </mui-chip>
            <mui-chip size="small">
              <mui-badge variant="positive" slot="before">Beta</mui-badge>
              Games
              <mui-icon-game-controller slot="after"></mui-icon-game-controller>
            </mui-chip>
            <mui-chip size="medium">
              <mui-badge variant="positive" slot="before">Beta</mui-badge>
              Videos
              <mui-icon-play-rectangle slot="after"></mui-icon-play-rectangle>
            </mui-chip>
            <mui-chip size="large">
              <mui-badge variant="positive" slot="before">Beta</mui-badge>
              Music
              <mui-icon-music-quarter-note slot="after"></mui-icon-music-quarter-note>
            </mui-chip>

          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle slot="before"&gt;&lt;/mui-icon-down-arrow-circle&gt;<br />
            &nbsp;&nbsp;Downloads
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--app-story-canvas-100)" id="active" title="${storyMeta["active"].title}" description="${storyMeta["active"].description}" usage="${storyMeta["active"].usage}">
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

        <story-card canvas-background="var(--app-story-canvas-100)" id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
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

        <story-card canvas-background="var(--app-story-canvas-100)" id="badge-before" title="${storyMeta["badge-before"].title}" description="${storyMeta["badge-before"].description}" usage="${storyMeta["badge-before"].usage}">
          <mui-h-stack slot="body" space="var(--space-200)" alignY="center" wrap="wrap">
            <mui-chip size="x-small">
              Videos
              <mui-badge variant="positive" slot="before">Beta</mui-badge>
            </mui-chip>
            <mui-chip size="small">
              Videos
              <mui-badge variant="positive" slot="before">Beta</mui-badge>
            </mui-chip>
            <mui-chip size="medium">
              Videos
              <mui-badge variant="positive" slot="before">Beta</mui-badge>
            </mui-chip>
            <mui-chip size="large">
              Videos
              <mui-badge variant="positive" slot="before">Beta</mui-badge>
            </mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip size="x-small"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-badge variant="positive" slot="before"&gt;Beta&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;Videos<br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--app-story-canvas-100)" id="badge-after" title="${storyMeta["badge-after"].title}" description="${storyMeta["badge-after"].description}" usage="${storyMeta["badge-after"].usage}">
          <mui-h-stack slot="body" space="var(--space-200)" alignY="center" wrap="wrap">
            <mui-chip size="x-small">
              Offers
              <mui-badge variant="positive" slot="after">10</mui-badge>
            </mui-chip>
            <mui-chip size="small">
              Offers
              <mui-badge variant="positive" slot="after">10</mui-badge>
            </mui-chip>
            <mui-chip size="medium">
              Offers
              <mui-badge variant="positive" slot="after">10</mui-badge>
            </mui-chip>
            <mui-chip size="large">
              Offers
              <mui-badge variant="positive" slot="after">10</mui-badge>
            </mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip size="x-small"&gt;
            <br />
            &nbsp;&nbsp;Offers<br />
            &nbsp;&nbsp;&lt;mui-badge variant="positive" slot="after"&gt;10&lt;/mui-badge&gt;<br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--app-story-canvas-100)" id="avatar-before" title="${storyMeta["avatar-before"].title}" description="${storyMeta["avatar-before"].description}" usage="${storyMeta["avatar-before"].usage}">
          <mui-v-stack slot="body" space="var(--space-200)">
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="x-small">
                <mui-avatar slot="before" label="Michael Trilford" background="neutral"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="x-small">
                <mui-avatar slot="before" label="Sarah Jenkins" background="neutral"></mui-avatar>
                Sarah Jenkins
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="small">
                <mui-avatar slot="before" label="Michael Trilford" background="neutral"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="small">
                <mui-avatar slot="before" label="Sarah Jenkins" background="neutral"></mui-avatar>
                Sarah Jenkins
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="medium">
                <mui-avatar slot="before" label="Michael Trilford" background="neutral"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="medium">
                <mui-avatar slot="before" label="Sarah Jenkins" background="neutral"></mui-avatar>
                Sarah Jenkins
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="large">
                <mui-avatar slot="before" label="Michael Trilford" background="neutral"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="large">
                <mui-avatar slot="before" label="Sarah Jenkins" background="neutral"></mui-avatar>
                Sarah Jenkins
              </mui-chip>
            </mui-h-stack>
          </mui-v-stack>

          <story-code-block slot="footer" scrollable>
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--app-story-canvas-100)" id="avatar-after" title="${storyMeta["avatar-after"].title}" description="${storyMeta["avatar-after"].description}" usage="${storyMeta["avatar-after"].usage}">
          <mui-v-stack slot="body" space="var(--space-200)">
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="x-small">
                <mui-avatar slot="after" label="Michael Trilford" background="neutral"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="x-small">
                <mui-avatar slot="after" label="Sarah Jenkins" background="neutral"></mui-avatar>
                Sarah Jenkins
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="small">
                <mui-avatar slot="after" label="Michael Trilford" background="neutral"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="small">
                <mui-avatar slot="after" label="Sarah Jenkins" background="neutral"></mui-avatar>
                Sarah Jenkins
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="medium">
                <mui-avatar slot="after" label="Michael Trilford" background="neutral"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="medium">
                <mui-avatar slot="after" label="Sarah Jenkins" background="neutral"></mui-avatar>
                Sarah Jenkins
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="large">
                <mui-avatar slot="after" label="Michael Trilford" background="neutral"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="large">
                <mui-avatar slot="after" label="Sarah Jenkins" background="neutral"></mui-avatar>
                Sarah Jenkins
              </mui-chip>
            </mui-h-stack>
          </mui-v-stack>

          <story-code-block slot="footer" scrollable>
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--app-story-canvas-100)" id="filters" title="${storyMeta["filters"].title}" description="${storyMeta["filters"].description}" usage="${storyMeta["filters"].usage}">
          <mui-v-stack slot="body" space="var(--space-200)">
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="x-small" dismiss>
                <mui-avatar slot="before" label="B" background="neutral"></mui-avatar>
                Branding
              </mui-chip>
              <mui-chip id="chip-two" size="x-small" dismiss>
                <mui-avatar slot="before" label="W" background="neutral"></mui-avatar>
                Web Design
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="small" dismiss>
                <mui-avatar slot="before" label="B" background="neutral"></mui-avatar>
                Branding
              </mui-chip>
              <mui-chip id="chip-two" size="small" dismiss>
                <mui-avatar slot="before" label="W" background="neutral"></mui-avatar>
                Web Design
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="medium" dismiss>
                <mui-avatar slot="before" label="B" background="neutral"></mui-avatar>
                Branding
              </mui-chip>
              <mui-chip id="chip-two" size="medium" dismiss>
                <mui-avatar slot="before" label="W" background="neutral"></mui-avatar>
                Web Design
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="large" dismiss>
                <mui-avatar slot="before" label="B" background="neutral"></mui-avatar>
                Branding
              </mui-chip>
              <mui-chip id="chip-two" size="large" dismiss>
                <mui-avatar slot="before" label="W" background="neutral"></mui-avatar>
                Web Design
              </mui-chip>
            </mui-h-stack>

            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="x-small" dismiss>
                <mui-avatar slot="before" label="Michael Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="x-small" dismiss>
                <mui-avatar slot="before" label="Michael Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Michael Trilford
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="small" dismiss>
                <mui-avatar slot="before" label="Michael Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="small" dismiss>
                <mui-avatar slot="before" label="Michael Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Michael Trilford
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="medium" dismiss>
                <mui-avatar slot="before" label="Michael Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="medium" dismiss>
                <mui-avatar slot="before" label="Michael Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Michael Trilford
              </mui-chip>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)">
              <mui-chip id="chip-one" size="large" dismiss>
                <mui-avatar slot="before" label="Michael Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Michael Trilford
              </mui-chip>
              <mui-chip id="chip-two" size="large" dismiss>
                <mui-avatar slot="before" label="Michael Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Michael Trilford
              </mui-chip>
            </mui-h-stack>
          </mui-v-stack>

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

        <story-card canvas-background="var(--app-story-canvas-100)" id="filters-icon-before" title="${storyMeta["filters-icon-before"].title}" description="${storyMeta["filters-icon-before"].description}" usage="${storyMeta["filters-icon-before"].usage}">
          <mui-h-stack slot="body" space="var(--space-200)">
            <mui-chip id="chip-three" dismiss>
              <mui-icon-music-quarter-note slot="before"></mui-icon-music-quarter-note>
              Music
            </mui-chip>
            <mui-chip id="chip-four" dismiss>
              <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
              Videos
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

        <story-card canvas-background="var(--app-story-canvas-100)" id="overflow" title="${storyMeta["overflow"].title}" description="${storyMeta["overflow"].description}" usage="${storyMeta["overflow"].usage}">
          <div slot="body" class="chip-overflow-example">
            <mui-chip dismiss>
              <mui-icon-music-quarter-note slot="before"></mui-icon-music-quarter-note>
              Music
            </mui-chip>
            <mui-chip dismiss>
              <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
              Videos
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;div style=&quot;display: flex; gap: var(--space-200); max-width: 42rem;&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip dismiss style=&quot;flex: 1 1 0;&quot;&gt;Branding&lt;/mui-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip dismiss style=&quot;flex: 1 1 0;&quot;&gt;Web Design&lt;/mui-chip&gt;<br />
            &lt;/div&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--app-story-canvas-100)" id="sub-navigation" title="${storyMeta["sub-navigation"].title}" description="${storyMeta["sub-navigation"].description}" usage="${storyMeta["sub-navigation"].usage}">
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

        <story-card canvas-background="var(--app-story-canvas-100)" id="multi-select-groups" title="${storyMeta["multi-select-groups"].title}" description="${storyMeta["multi-select-groups"].description}" usage="${storyMeta["multi-select-groups"].usage}">
          <mui-h-stack id="multi-chip-select" slot="body" class="multi-select">
            <mui-chip active>
              All
            </mui-chip>
            <mui-chip>
              <mui-icon-game-controller slot="before"></mui-icon-game-controller>
              Gaming
            </mui-chip>
            <mui-chip>
              <mui-icon-music-microphone slot="before"></mui-icon-music-microphone>
              Podcasts
            </mui-chip>
            <mui-chip>
              <mui-icon-music-quarter-note slot="before"></mui-icon-music-quarter-note>
              Music
            </mui-chip>
            <mui-chip>
              <mui-icon-movie-clapper slot="before"></mui-icon-movie-clapper>
              Movies
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
            .multi-select::part(width) { width: 400px; }<br /><br />

            // COMPONENT USAGE<br />
            ////////////////////////////////////////////////<br /><br />
            &lt;mui-h-stack id="multi-chip-select" class="multi-select"&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip active&gt;All&lt;/mui-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-game-controller slot="before"&gt;&lt;/mui-icon-game-controller&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Gaming<br />
            &nbsp;&nbsp;&lt;/mui-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-music-microphone slot="before"&gt;&lt;/mui-icon-music-microphone&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Podcasts<br />
            &nbsp;&nbsp;&lt;/mui-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-music-quarter-note slot="before"&gt;&lt;/mui-icon-music-quarter-note&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Music<br />
            &nbsp;&nbsp;&lt;/mui-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-chip&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-movie-clapper slot="before"&gt;&lt;/mui-icon-movie-clapper&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Movies<br />
            &nbsp;&nbsp;&lt;/mui-chip&gt;<br />
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
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
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
