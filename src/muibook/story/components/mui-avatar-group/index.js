import { getComponentDocs } from "../../../utils/story-data";
import MikeAvatar from "../../../images/mui/avatar-mike.jpg";

class StoryAvatarGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("AvatarGroup");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Avatar Group"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host {
        display: block;
      }

      .custom-ring {
        --avatar-group-ring-color: var(--surface-recessed-100);
        --avatar-group-ring-width: var(--stroke-size-300);
      }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-avatar-group" title="Avatar Group"></story-api-types>

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <div class="canvas" slot="body">
          <mui-avatar-group size="medium" label="Project collaborators">
            <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
            <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
            <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
            <mui-avatar label="Sam Taylor" background="green"></mui-avatar>
          </mui-avatar-group>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-group size=&quot;medium&quot; label=&quot;Project collaborators&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Alex Morgan&quot; background=&quot;purple&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Riley Chen&quot; background=&quot;blue&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Sam Taylor&quot; background=&quot;green&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;/mui-avatar-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="overlap" title="${storyMeta["overlap"].title}" description="${storyMeta["overlap"].description}" usage="${storyMeta["overlap"].usage}">
        <div class="canvas" slot="body">
          <mui-v-stack alignX="start">
            <mui-avatar-group size="medium" overlap="loose" label="Loose collaborator group">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
              <mui-avatar label="Sam Taylor" background="green"></mui-avatar>
            </mui-avatar-group>
            <mui-avatar-group size="medium" overlap="tight" label="Tight collaborator group">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
              <mui-avatar label="Sam Taylor" background="green"></mui-avatar>
            </mui-avatar-group>
            <mui-avatar-group size="medium" overlap="compact" label="Compact collaborator group">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
              <mui-avatar label="Sam Taylor" background="green"></mui-avatar>
            </mui-avatar-group>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-group overlap=&quot;loose&quot;&gt;...&lt;/mui-avatar-group&gt;<br />
          &lt;mui-avatar-group overlap=&quot;tight&quot;&gt;...&lt;/mui-avatar-group&gt;<br />
          &lt;mui-avatar-group overlap=&quot;compact&quot;&gt;...&lt;/mui-avatar-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <div class="canvas" slot="body">
          <mui-v-stack alignX="start">
            <mui-avatar-group size="xx-small" label="Extra small team">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
            </mui-avatar-group>
            <mui-avatar-group size="x-small" label="Small team">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
            </mui-avatar-group>
            <mui-avatar-group size="small" label="Medium team">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
            </mui-avatar-group>
            <mui-avatar-group size="large" label="Large team">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
            </mui-avatar-group>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-group size=&quot;xx-small&quot;&gt;...&lt;/mui-avatar-group&gt;<br />
          &lt;mui-avatar-group size=&quot;x-small&quot;&gt;...&lt;/mui-avatar-group&gt;<br />
          &lt;mui-avatar-group size=&quot;small&quot;&gt;...&lt;/mui-avatar-group&gt;<br />
          &lt;mui-avatar-group size=&quot;large&quot;&gt;...&lt;/mui-avatar-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="hover-fan" title="${storyMeta["hover-fan"].title}" description="${storyMeta["hover-fan"].description}" usage="${storyMeta["hover-fan"].usage}">
        <div class="canvas" slot="body">
          <mui-avatar-group size="medium" overlap="compact" fan label="Project collaborators with hover fan">
            <mui-avatar image="${MikeAvatar}" label="Mike Trilford" status="online"></mui-avatar>
            <mui-avatar label="Alex Morgan" background="purple" status="away"></mui-avatar>
            <mui-avatar label="Riley Chen" background="blue" status="busy"></mui-avatar>
            <mui-avatar label="Sam Taylor" background="green"></mui-avatar>
            <mui-avatar label="Jordan Lee" background="orange"></mui-avatar>
          </mui-avatar-group>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-group size=&quot;medium&quot; overlap=&quot;compact&quot; fan label=&quot;Project collaborators&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar image=&quot;avatar-mike.jpg&quot; label=&quot;Mike Trilford&quot; status=&quot;online&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Alex Morgan&quot; background=&quot;purple&quot; status=&quot;away&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Riley Chen&quot; background=&quot;blue&quot; status=&quot;busy&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Sam Taylor&quot; background=&quot;green&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Jordan Lee&quot; background=&quot;orange&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;/mui-avatar-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="with-status" title="${storyMeta["with-status"].title}" description="${storyMeta["with-status"].description}" usage="${storyMeta["with-status"].usage}">
        <div class="canvas" slot="body">
          <mui-avatar-group size="medium" label="Active project collaborators">
            <mui-avatar image="${MikeAvatar}" label="Mike Trilford" status="online"></mui-avatar>
            <mui-avatar label="Alex Morgan" background="purple" status="away"></mui-avatar>
            <mui-avatar label="Riley Chen" background="blue" status="busy"></mui-avatar>
            <mui-avatar label="Sam Taylor" background="green" status="offline"></mui-avatar>
          </mui-avatar-group>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-group label=&quot;Active project collaborators&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Mike Trilford&quot; status=&quot;online&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Alex Morgan&quot; status=&quot;away&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Riley Chen&quot; status=&quot;busy&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar label=&quot;Sam Taylor&quot; status=&quot;offline&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;/mui-avatar-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="context-ring" title="${storyMeta["context-ring"].title}" description="${storyMeta["context-ring"].description}" usage="${storyMeta["context-ring"].usage}">
        <mui-v-stack slot="body" class="canvas">
          <mui-card>
            <mui-card-body>
              <mui-avatar-group size="medium" label="Card collaborators">
                <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
                <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
                <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
                <mui-avatar label="Sam Taylor" background="green"></mui-avatar>
              </mui-avatar-group>
            </mui-card-body>
          </mui-card>

          <mui-card>
            <mui-card-body>
              <mui-slat variant="action">
                <mui-avatar-group slot="accessory" size="small" label="Assigned reviewers">
                  <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
                  <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
                  <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
                </mui-avatar-group>
                <mui-v-stack slot="start" space="0">
                  <mui-body size="medium" weight="bold">Assigned reviewers</mui-body>
                  <mui-body size="small">Ring follows the slat surface and hover state</mui-body>
                </mui-v-stack>
              </mui-slat>
            </mui-card-body>
          </mui-card>

          <mui-slat variant="action">
            <mui-avatar-group slot="accessory" size="small" label="Assigned reviewers">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
            </mui-avatar-group>
            <mui-v-stack slot="start" space="0">
              <mui-body size="medium" weight="bold">Assigned reviewers</mui-body>
              <mui-body size="small">Ring follows the slat surface and hover state</mui-body>
            </mui-v-stack>
          </mui-slat>

          <mui-v-stack style="background: var(--surface-recessed-100); padding: var(--space-400); border-radius: var(--radius-400);">
            <mui-avatar-group class="custom-ring" size="medium" label="Collaborators on custom elevated surface">
              <mui-avatar image="${MikeAvatar}" label="Mike Trilford"></mui-avatar>
              <mui-avatar label="Alex Morgan" background="purple"></mui-avatar>
              <mui-avatar label="Riley Chen" background="blue"></mui-avatar>
              <mui-avatar label="Sam Taylor" background="green"></mui-avatar>
            </mui-avatar-group>
          </mui-v-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-card&gt;<br />
          &nbsp;&nbsp;&lt;mui-card-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar-group&gt;...&lt;/mui-avatar-group&gt;<br />
          &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
          &lt;/mui-card&gt;<br />
          <br />
          &lt;mui-slat variant=&quot;action&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar-group slot=&quot;accessory&quot;&gt;...&lt;/mui-avatar-group&gt;<br />
          &lt;/mui-slat&gt;<br />
          <br />
          &lt;mui-v-stack style=&quot;background: var(--surface-recessed-100); padding: var(--space-400); border-radius: var(--radius-400);&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar-group class=&quot;custom-ring&quot;&gt;...&lt;/mui-avatar-group&gt;<br />
          &lt;/mui-v-stack&gt;<br />
          <br />
          .custom-ring {<br />
          &nbsp;&nbsp;--avatar-group-ring-color: var(--surface-recessed-100);<br />
          &nbsp;&nbsp;--avatar-group-ring-width: var(--stroke-size-300);<br />
          }
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
        imports='["@muibook/components/mui-avatar-group"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-avatar-group", StoryAvatarGroup);
