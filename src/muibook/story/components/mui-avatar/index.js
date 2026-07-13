import { getComponentDocs } from "../../../utils/story-data";
import MikeAvatar from "../../../images/mui/avatar-mike.jpg";

class storyAvatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Avatar");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Avatar"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }

      .canvas {
        background: var(--surface);
        padding: var(--space-600);
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }

      .group-item { text-align: left; }

      .group {
        width: 100%;
        margin: 0 auto;
        padding: var(--space-100);
        box-sizing: border-box;
        background: var(--surface);
      }

    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-avatar" title="Avatar"></story-api-types>

      <story-card id="image" title="${storyMeta["image"].title}" description="${storyMeta["image"].description}" usage="${storyMeta["image"].usage}">
        <div class="canvas" slot="body">
          <mui-h-stack alignY="center">
            <mui-avatar size="xxx-small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
            <mui-avatar size="xx-small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
            <mui-avatar size="x-small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
            <mui-avatar size="small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
            <mui-avatar size="medium" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
            <mui-avatar size="large" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
          </mui-h-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar size=&quot;xxx-small&quot; image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;xx-small&quot; image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;x-small&quot; image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;small&quot; image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;medium&quot; image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;large&quot; image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;
        </story-code-block>
      </story-card>

      <story-card id="activity-status" title="${storyMeta["activity-status"].title}" description="${storyMeta["activity-status"].description}" usage="${storyMeta["activity-status"].usage}">
        <div class="canvas" slot="body">
          <mui-h-stack alignY="center">
            <mui-avatar size="large" image="${MikeAvatar}" label="Mike Trilford" status="online"></mui-avatar>
            <mui-avatar size="large" label="Alex Morgan" status="away"></mui-avatar>
            <mui-avatar size="large" label="Riley Chen" status="busy"></mui-avatar>
            <mui-avatar size="large" label="Sam Taylor" status="dnd" status-label="Do not disturb"></mui-avatar>
            <mui-avatar size="large" label="Jordan Lee" status="offline"></mui-avatar>
          </mui-h-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot; status=&quot;online&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar label=&quot;Alex Morgan&quot; status=&quot;away&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar label=&quot;Riley Chen&quot; status=&quot;busy&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar label=&quot;Sam Taylor&quot; status=&quot;dnd&quot; status-label=&quot;Do not disturb&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar label=&quot;Jordan Lee&quot; status=&quot;offline&quot;&gt;&lt;/mui-avatar&gt;
        </story-code-block>
      </story-card>

      <story-card id="avatar-group" title="${storyMeta["avatar-group"].title}" description="${storyMeta["avatar-group"].description}" usage="${storyMeta["avatar-group"].usage}">
        <div class="canvas" slot="body">
          <mui-v-stack alignX="start">
            <mui-avatar-group size="medium" label="Project collaborators">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford" status="online"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple" status="away"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue" status="busy"></mui-avatar>
              <mui-avatar label="Sam Taylor" background="green"></mui-avatar>
            </mui-avatar-group>

            <mui-avatar-group size="small" overlap="compact" label="Compact assigned team">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
              <mui-avatar label="Sam Taylor" background="green"></mui-avatar>
              <mui-avatar label="Jordan Lee" background="orange"></mui-avatar>
            </mui-avatar-group>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-group size=&quot;medium&quot; label=&quot;Project collaborators&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot; status=&quot;online&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Alex Morgan&quot; background=&quot;purple&quot; status=&quot;away&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Riley Chen&quot; background=&quot;blue&quot; status=&quot;busy&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Sam Taylor&quot; background=&quot;green&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;/mui-avatar-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="icon" title="${storyMeta["icon"].title}" description="${storyMeta["icon"].description}" usage="${storyMeta["icon"].usage}">

        <div class="canvas" slot="body">
          <mui-v-stack>
            <mui-h-stack alignY="center">
              <mui-avatar size="xxx-small" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="xx-small" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="x-small" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="small" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="medium" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="large" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
            </mui-h-stack>
          </mui-v-stack>
        </div>

        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar size=&quot;xxx-small&quot; label=&quot;Calendar&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-calendar&gt;&lt;/mui-icon-calendar&gt;<br />
          &lt;/mui-avatar&gt;<br /><br />
          &lt;mui-avatar size=&quot;xx-small&quot; label=&quot;Calendar&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-calendar&gt;&lt;/mui-icon-calendar&gt;<br />
          &lt;/mui-avatar&gt;<br /><br />
          &lt;mui-avatar size=&quot;x-small&quot; label=&quot;Calendar&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-calendar&gt;&lt;/mui-icon-calendar&gt;<br />
          &lt;/mui-avatar&gt;<br /><br />
          &lt;mui-avatar size=&quot;small&quot; label=&quot;Calendar&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-calendar&gt;&lt;/mui-icon-calendar&gt;<br />
          &lt;/mui-avatar&gt;
        </story-code-block>
      </story-card>

      <story-card id="size" title="${storyMeta["size"].title}" description="${storyMeta["size"].description}" usage="${storyMeta["size"].usage}">

        <div class="canvas" slot="body">
          <mui-v-stack>

            <mui-h-stack alignY="start">
              <mui-avatar size="xxx-small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="xx-small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="x-small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="medium" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="large" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
            </mui-h-stack>

            <mui-h-stack alignY="center">
              <mui-avatar size="xxx-small" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="xx-small" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="x-small" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="small" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="medium" label="Mike Trilford"></mui-avatar>
              <mui-avatar size="large" label="Mike Trilford"></mui-avatar>
            </mui-h-stack>

            <mui-h-stack alignY="end">
              <mui-avatar size="xxx-small" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="xx-small" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="x-small" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="small" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="medium" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="large" label="Mike Trilford">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
            </mui-h-stack>

          </mui-v-stack>
        </div>

        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar size=&quot;xxx-small&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;xx-small&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;x-small&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;small&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;medium&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar size=&quot;large&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;
        </story-code-block>
      </story-card>

      <story-card id="chip-avatars" title="${storyMeta["chip-avatars"].title}" description="${storyMeta["chip-avatars"].description}" usage="${storyMeta["chip-avatars"].usage}">
        <div slot="body" class="canvas">
          <mui-v-stack>
            <mui-h-stack wrap space="var(--space-100)">
              <mui-chip>
                <mui-avatar slot="before" size="xx-small" label="Espresso & Muffin Bar" background="neutral">
                  <mui-icon-left-sidebar></mui-icon-left-sidebar>
                </mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="before" label="Espresso & Muffin Bar" background="neutral"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="before" label="Mike Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="after" label="Espresso & Muffin Bar" background="neutral">
                  <mui-icon-left-sidebar></mui-icon-left-sidebar>
                </mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="after" label="Espresso & Muffin Bar" background="neutral"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="after" label="Mike Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Videos
              </mui-chip>
            </mui-h-stack>

            <mui-h-stack wrap space="var(--space-100)">
              <mui-chip dismiss>
                <mui-avatar slot="before" size="xx-small" label="Espresso & Muffin Bar" background="neutral">
                  <mui-icon-left-sidebar></mui-icon-left-sidebar>
                </mui-avatar>
                Videos
              </mui-chip>
              <mui-chip dismiss>
                <mui-avatar slot="before" label="Espresso & Muffin Bar" background="neutral"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip dismiss>
                <mui-avatar slot="before" label="Mike Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Videos
              </mui-chip>
            </mui-h-stack>
          </mui-v-stack>

            <mui-h-stack wrap space="var(--space-100)">
              <mui-chip dismiss size="x-small">
                <mui-avatar slot="before" label="Mike Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip dismiss size="small">
                <mui-avatar slot="before" label="Mike Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip dismiss size="medium">
                <mui-avatar slot="before" label="Mike Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip dismiss size="large">
                <mui-avatar slot="before" label="Mike Trilford" background="neutral" image="${MikeAvatar}"></mui-avatar>
                Videos
              </mui-chip>
            </mui-h-stack>
          </mui-v-stack>


        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chip&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar slot=&quot;before&quot; label=&quot;Mike Trilford&quot; image=&quot;avatar-mike.jpg&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;Videos<br />
          &lt;/mui-chip&gt;<br /><br />
          // Slotted avatars are automatically sized to xx-small (24px).
        </story-code-block>
      </story-card>

      <story-card id="background" title="${storyMeta["background"].title}" description="${storyMeta["background"].description}" usage="${storyMeta["background"].usage}">
        <mui-grid col="repeat(auto-fill, minmax(48px, 1fr))" space="var(--space-400) var(--space-400)" slot="body" class="canvas">
          <mui-avatar label="Mike Trilford" background="neutral"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="positive"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="warning"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="attention"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="purple"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="violet"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="pink"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="magenta"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="red"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="orange"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="amber"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="yellow"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="lime"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="green"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="teal"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="cyan"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="blue"></mui-avatar>
          <mui-avatar label="Mike Trilford" background="indigo"></mui-avatar>
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar label=&quot;Mike Trilford&quot; background=&quot;neutral&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar label=&quot;Mike Trilford&quot; background=&quot;positive&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar label=&quot;Mike Trilford&quot; background=&quot;warning&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar label=&quot;Mike Trilford&quot; background=&quot;attention&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar label=&quot;Mike Trilford&quot; background=&quot;purple&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;mui-avatar label=&quot;Mike Trilford&quot; background=&quot;blue&quot;&gt;&lt;/mui-avatar&gt;
        </story-code-block>
      </story-card>

      <story-card id="background-colors" title="${storyMeta["background-colors"].title}" description="${storyMeta["background-colors"].description}" usage="${storyMeta["background-colors"].usage}">
        <div slot="body" class="canvas">
          <mui-avatar label="Mike Trilford" background-color="var(--app-avatar-background, var(--surface))"></mui-avatar>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar<br />
          &nbsp;&nbsp;label=&quot;Mike Trilford&quot;<br />
          &nbsp;&nbsp;background-color=&quot;var(--surface)&quot;&gt;<br />
          &lt;/mui-avatar&gt;
        </story-code-block>
      </story-card>

      <story-card id="buttons" title="${storyMeta["buttons"].title}" description="${storyMeta["buttons"].description}" usage="${storyMeta["buttons"].usage}">
        <mui-v-stack slot="body" class="canvas">

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-button variant="primary" size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="secondary" size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="tertiary" size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button disabled variant="tertiary" size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="tertiary" size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-button>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-button variant="primary" size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="secondary" size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="tertiary" size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button disabled variant="tertiary" size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="tertiary" size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-button>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-button variant="primary" size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="secondary" size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="tertiary" size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button disabled variant="tertiary" size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="tertiary" size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-button>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-button variant="primary" size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="secondary" size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="tertiary" size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button disabled variant="tertiary" size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-button>
            <mui-button variant="tertiary" size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-button>
          </mui-v-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant=&quot;primary&quot; size=&quot;x-small&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar slot=&quot;before&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;Mike Trilford<br />
          &lt;/mui-button&gt;<br /><br />
          &lt;mui-button variant=&quot;secondary&quot; size=&quot;medium&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar slot=&quot;before&quot; image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;Mike Trilford<br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card id="avatar-only-dropdown" title="${storyMeta["avatar-only-dropdown"].title}" description="${storyMeta["avatar-only-dropdown"].description}" usage="${storyMeta["avatar-only-dropdown"].usage}">
        <div slot="body" class="canvas">
          <mui-h-stack alignY="center">
            <mui-dropdown position="left" size="medium">
              <mui-button slot="action" aria-label="Open compact Julie profile menu">
                <mui-avatar size="xx-small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary">Profile</mui-button>
                <mui-button variant="tertiary">Settings</mui-button>
                <mui-button variant="tertiary">Sign out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown position="left" size="medium">
              <mui-button slot="action" aria-label="Open Mike profile menu">
                <mui-avatar size="x-small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary">Profile</mui-button>
                <mui-button variant="tertiary">Settings</mui-button>
                <mui-button variant="tertiary">Sign out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown position="left" size="medium">
              <mui-button slot="action" aria-label="Open Mike profile menu">
                <mui-avatar size="small" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary">Profile</mui-button>
                <mui-button variant="tertiary">Billing</mui-button>
                <mui-button variant="tertiary">Sign out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown position="left" size="medium">
              <mui-button slot="action" aria-label="Open Mike profile menu">
                <mui-avatar size="medium" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary">Profile</mui-button>
                <mui-button variant="tertiary">Notifications</mui-button>
                <mui-button variant="tertiary">Sign out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown position="left" size="medium">
              <mui-button slot="action" aria-label="Open team calendar menu">
                <mui-avatar size="large" label="Team calendar">
                  <mui-icon-calendar size="large"></mui-icon-calendar>
                </mui-avatar>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary">Calendar</mui-button>
                <mui-button variant="tertiary">Availability</mui-button>
                <mui-button variant="tertiary">Close</mui-button>
              </mui-menu>
            </mui-dropdown>
          </mui-h-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; position=&quot;left&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;action&quot; aria-label=&quot;Open Mike profile menu&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size=&quot;medium&quot; image=&quot;${MikeAvatar}&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Profile&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Settings&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Sign out&lt;/mui-button&gt;<br />

          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="avatar-only-button" title="${storyMeta["avatar-only-button"].title}" description="${storyMeta["avatar-only-button"].description}" usage="${storyMeta["avatar-only-button"].usage}">
        <div slot="body" class="canvas">
          <mui-h-stack alignY="center">
            <mui-button data-dialog="avatar-profile-dialog" aria-label="Open Mike profile dialog">
              <mui-avatar size="medium" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
            </mui-button>
          </mui-h-stack>

          <mui-dialog
            data-dialog="avatar-profile-dialog"
            width="400px"
            aria-labelledby="avatar-profile-dialog-title"
            aria-describedby="avatar-profile-dialog-desc"
          >
            <mui-heading size="4" level="4" slot="title" id="avatar-profile-dialog-title">Mike Trilford</mui-heading>
            <mui-body id="avatar-profile-dialog-desc">
              This dialog shows how an avatar-only button can act as a compact trigger for profile and account actions.
            </mui-body>
            <mui-button slot="footer" variant="tertiary" data-close>Close</mui-button>
          </mui-dialog>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button data-dialog=&quot;avatar-profile-dialog&quot; aria-label=&quot;Open Mike profile dialog&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar size=&quot;medium&quot; image=&quot;${MikeAvatar}&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;/mui-button&gt;<br />
          <br />
          &lt;mui-dialog data-dialog=&quot;avatar-profile-dialog&quot; width=&quot;400px&quot; aria-labelledby=&quot;avatar-profile-dialog-title&quot; aria-describedby=&quot;avatar-profile-dialog-desc&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-heading slot=&quot;title&quot; id=&quot;avatar-profile-dialog-title&quot;&gt;Mike Trilford&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&lt;mui-body id=&quot;avatar-profile-dialog-desc&quot;&gt;...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;footer&quot; variant=&quot;tertiary&quot; data-close&gt;Close&lt;/mui-button&gt;<br />
          &lt;/mui-dialog&gt;
        </story-code-block>
      </story-card>

      <story-card id="links" title="${storyMeta["links"].title}" description="${storyMeta["links"].description}" usage="${storyMeta["links"].usage}">
        <mui-v-stack slot="body" class="canvas">

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford (Not recommended)
            </mui-link>
            <mui-link size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link disabled size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford (Not recommended)
            </mui-link>
            <mui-link size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford (Not recommended)
            </mui-link>
            <mui-link size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link disabled size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford (Not recommended)
            </mui-link>
            <mui-link size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford (Not recommended)
            </mui-link>
            <mui-link size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link disabled size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford (Not recommended)
            </mui-link>
            <mui-link size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford (Not recommended)
            </mui-link>
            <mui-link size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link disabled size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford (Not recommended)
            </mui-link>
            <mui-link size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link variant="primary" size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="secondary" size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="tertiary" size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link disabled variant="tertiary" size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="tertiary" size="x-small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link variant="primary" size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="secondary" size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="tertiary" size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link disabled variant="tertiary" size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="tertiary" size="small" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link variant="primary" size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="secondary" size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="tertiary" size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link disabled variant="tertiary" size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="tertiary" size="medium" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link variant="primary" size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="secondary" size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="tertiary" size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link disabled variant="tertiary" size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Mike Trilford"></mui-avatar>
              Mike Trilford
            </mui-link>
            <mui-link variant="tertiary" size="large" class="group-item" aria-label="History">
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link size=&quot;medium&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar slot=&quot;before&quot; image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;Mike Trilford<br />
          &lt;/mui-link&gt;<br /><br />
          &lt;mui-link variant=&quot;primary&quot; size=&quot;medium&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar slot=&quot;before&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;Mike Trilford<br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="slat-and-card-avatars" title="${storyMeta["slat-and-card-avatars"].title}" description="${storyMeta["slat-and-card-avatars"].description}" usage="${storyMeta["slat-and-card-avatars"].usage}">
        <div slot="body">
          <mui-v-stack slot="body">

            <mui-slat variant="action">
              <mui-avatar slot="accessory" size="medium" label="Espresso & Muffin Bar" background="neutral">
                <mui-icon-left-sidebar></mui-icon-left-sidebar>
              </mui-avatar>
              <mui-v-stack slot="start" space="0">
                <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
              </mui-v-stack>
              <mui-v-stack space="0" slot="end">
                <mui-body size="x-small">Pending</mui-body>
                <mui-body size="small" weight="bold">-$8.12</mui-body>
              </mui-v-stack>
            </mui-slat>

            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Transactions</mui-heading>
                <mui-body>Here’s a summary of recent transactions on your account.</mui-body>
              </mui-card-header>
              <mui-card-body>
                <mui-slat-group>
                  <mui-rule></mui-rule>
                  <mui-slat variant="header">
                    <mui-heading slot="start" size="6">Today</mui-heading>
                    <mui-h-stack slot="end" alignX="end">
                      <mui-body size="small">22 July 2025</mui-body>
                    </mui-h-stack>
                  </mui-slat>
                  <mui-slat variant="action">
                    <mui-avatar slot="accessory" size="medium" label="Espresso & Muffin Bar" background="neutral">
                      <mui-icon-left-sidebar></mui-icon-left-sidebar>
                    </mui-avatar>
                    <mui-v-stack  slot="start" space="0">
                      <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                      <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                </mui-slat-group>
              </mui-card-body>
            </mui-card>

            <mui-slat variant="action">
              <mui-avatar slot="accessory" size="medium" label="Espresso & Muffin Bar" background="neutral">
              </mui-avatar>
              <mui-v-stack slot="start" space="0">
                <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
              </mui-v-stack>
              <mui-v-stack space="0" slot="end">
                <mui-body size="x-small">Pending</mui-body>
                <mui-body size="small" weight="bold">-$8.12</mui-body>
              </mui-v-stack>
            </mui-slat>

            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Transactions</mui-heading>
                <mui-body>Here’s a summary of recent transactions on your account.</mui-body>
              </mui-card-header>
              <mui-card-body>
                <mui-slat-group>
                  <mui-rule></mui-rule>
                  <mui-slat variant="header">
                    <mui-heading slot="start" size="6">Today</mui-heading>
                    <mui-h-stack slot="end" alignX="end">
                      <mui-body size="small">22 July 2025</mui-body>
                    </mui-h-stack>
                  </mui-slat>
                  <mui-slat variant="action">
                    <mui-avatar slot="accessory" size="medium" label="Espresso & Muffin Bar" background="neutral">
                    </mui-avatar>
                    <mui-v-stack  slot="start" space="0">
                      <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                      <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                </mui-slat-group>
              </mui-card-body>
            </mui-card>

          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slat variant=&quot;action&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar slot=&quot;accessory&quot; size=&quot;medium&quot; label=&quot;Espresso &amp; Muffin Bar&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-left-sidebar&gt;&lt;/mui-icon-left-sidebar&gt;<br />
          &nbsp;&nbsp;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight=&quot;bold&quot;&gt;Espresso &amp; Muffin Bar&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;Food &amp; Drink&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &lt;/mui-slat&gt;
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

        imports='["@muibook/components/mui-avatar", "@muibook/components/mui-avatar-group"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;

    this.addDialogEventListeners();
  }

  addDialogEventListeners() {
    this.shadowRoot.querySelectorAll("mui-button[data-dialog]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-dialog");
        if (!target) return;
        const dialog = this.shadowRoot.querySelector(`mui-dialog[data-dialog="${target}"]`);
        dialog?.setAttribute("open", "");
      });
    });

    this.shadowRoot.querySelectorAll("mui-dialog[data-dialog]").forEach((dialog) => {
      dialog.querySelectorAll("mui-button[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => dialog.removeAttribute("open"));
      });
    });
  }
}

customElements.define("story-avatar", storyAvatar);
