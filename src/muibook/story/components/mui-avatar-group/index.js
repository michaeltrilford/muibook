import { getComponentDocs } from "../../../utils/story-data";
import MikeAvatar from "../../../images/mui/avatar-mike.jpg";

class StoryAvatarGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("AvatarGroup");

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

      <story-card
        id="default"
        title="Default"
        description="Stack avatars when a compact surface needs to show multiple people."
        usage="Avatar Group owns the overlap, ring, and default size.|||Each slotted Avatar still owns its image, initials, background, and status.|||Use label to describe the group when surrounding text does not already name it."
      >
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

      <story-card
        id="overlap"
        title="Overlap"
        description="Tune overlap density for recognition or compact layout."
        usage="Use loose when recognition matters.|||Use tight as the default balance.|||Use compact for dense tables, cards, and headers."
      >
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

      <story-card
        id="sizes"
        title="Sizes"
        description="Set size on the group to size slotted avatars that do not declare their own size."
        usage="Use group size when all avatars should share the same footprint.|||Set size directly on an individual Avatar only when it should intentionally differ from the group."
      >
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

      <story-card
        id="hover-fan"
        title="Hover Fan"
        description="Use fan when a stacked group should expand temporarily for easier recognition."
        usage="The group fans on pointer hover and keyboard focus within the group.|||Use this for dense collaborator groups where recognition matters on inspection.|||Keep the default static overlap when layout stability matters more than inspection."
      >
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

      <story-card
        id="status"
        title="With Status"
        description="Avatar Group composes with Avatar status indicators without owning presence state itself."
        usage="Use status on each Avatar when availability belongs to that individual.|||Keep the group label focused on what the collection represents."
      >
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

      <story-card
        id="context-ring"
        title="Context Ring"
        description="Avatar Group adjusts its separating ring in supported surface contexts."
        usage="Card Body marks nested Avatar Groups so their ring matches the card surface.|||Slat slots pass their default and hover surfaces to the group.|||Use the custom property only for one-off custom surfaces outside known component contexts."
      >
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
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="default::Default|||overlap::Overlap|||sizes::Sizes|||hover-fan::Hover Fan|||status::With Status|||context-ring::Context Ring">
        </story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-avatar-group", StoryAvatarGroup);
