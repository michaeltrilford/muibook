import { getComponentDocs } from "../../../utils/story-data";

class storyBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Badge");

    const styles = /*css*/ `
      :host {
        display: block;
      }

      :host([data-theme="light"]) .custom-color-story {
        --custom-badge-orange: linear-gradient(180deg, var(--orange-200), var(--orange-300));
        --custom-badge-blue: linear-gradient(180deg, var(--blue-200), var(--blue-300));
      }

      :host([data-theme="dark"]) .custom-color-story {
        --custom-badge-orange: linear-gradient(180deg, var(--orange-300), var(--orange-400));
        --custom-badge-blue: linear-gradient(180deg, var(--blue-300), var(--blue-400));
      }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-badge" title="Badge"></story-api-types>

        <story-card
          title="Default"
          description="A compact, non-interactive supporting label for presentational metadata."
          usage="Use Badge when the label adds context to the surrounding UI.|||Good for labels like New, Beta, Default, Shared, Paid, Busy, or Offline.|||Use Status when the label is the main state value for a record or workflow, especially when that value needs to be interactive."

        >
          <div slot="body">
            <mui-badge>Offline</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Sizes"
          description="Use size to match the badge to the surrounding component scale."
          usage="Use smaller badges in dense controls, chips, nav, and compact metadata rows.|||Use medium or large when the badge sits in roomier cards, messages, or hero content."

        >
          <div slot="body">
            <mui-v-stack space="var(--space-200)" alignx="start">
              <mui-badge size="xx-small">2</mui-badge>
              <mui-badge size="x-small">2</mui-badge>
              <mui-badge size="small">2</mui-badge>
              <mui-badge size="medium">2</mui-badge>
              <mui-badge size="large">2</mui-badge>
            </mui-v-stack>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge size="xx-small"&gt;2&lt;/mui-badge&gt;<br />
            &lt;mui-badge size="x-small"&gt;2&lt;/mui-badge&gt;<br />
            &lt;mui-badge size="small"&gt;2&lt;/mui-badge&gt;<br />
            &lt;mui-badge size="medium"&gt;2&lt;/mui-badge&gt;<br />
            &lt;mui-badge size="large"&gt;2&lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Variants"
          description="Use variants to give lightweight metadata the right visual emphasis."
          usage="Use neutral for default supporting labels such as Offline or Shared.|||Use positive, warning, or attention when the metadata needs lightweight semantic emphasis.|||Use color when you only want to change the badge background.|||Use overlay for labels on media or image surfaces.|||Use Status when the value is the primary state of a record, workflow, or system."

        >
          <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
            <mui-badge variant="neutral">Offline</mui-badge>
            <mui-badge variant="positive">Online</mui-badge>
            <mui-badge variant="warning">Busy</mui-badge>
            <mui-badge variant="attention">Do not disturb</mui-badge>
            <mui-badge variant="overlay">IMG</mui-badge>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant=&quot;neutral&quot;&gt;Offline&lt;/mui-badge&gt;<br />
            &lt;mui-badge variant=&quot;positive&quot;&gt;Online&lt;/mui-badge&gt;<br />
            &lt;mui-badge variant=&quot;warning&quot;&gt;Busy&lt;/mui-badge&gt;<br />
            &lt;mui-badge variant=&quot;attention&quot;&gt;Do not disturb&lt;/mui-badge&gt;<br />
            &lt;mui-badge variant=&quot;overlay&quot;&gt;IMG&lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Standalone Colors"
          description="Use color to override the badge background with a shared named colour."
          usage="Use shared names for consistent palette selection.|||Named colors resolve through theme-aware badge background tokens.|||Do not use positive, warning, or attention only to get a different background colour.|||The color attribute affects background only; text colour still follows the badge variant."

        >
          <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
            <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
              <mui-badge color="grey">Grey</mui-badge>
              <mui-badge color="purple">Purple</mui-badge>
              <mui-badge color="violet">Violet</mui-badge>
              <mui-badge color="pink">Pink</mui-badge>
              <mui-badge color="magenta">Magenta</mui-badge>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
              <mui-badge color="red">Red</mui-badge>
              <mui-badge color="orange">Orange</mui-badge>
              <mui-badge color="amber">Amber</mui-badge>
              <mui-badge color="yellow">Yellow</mui-badge>
              <mui-badge color="lime">Lime</mui-badge>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
              <mui-badge color="green">Green</mui-badge>
              <mui-badge color="teal">Teal</mui-badge>
              <mui-badge color="cyan">Cyan</mui-badge>
              <mui-badge color="blue">Blue</mui-badge>
              <mui-badge color="indigo">Indigo</mui-badge>
            </mui-h-stack>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge color=&quot;grey&quot;&gt;Grey&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;purple&quot;&gt;Purple&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;violet&quot;&gt;Violet&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;pink&quot;&gt;Pink&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;magenta&quot;&gt;Magenta&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;red&quot;&gt;Red&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;orange&quot;&gt;Orange&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;amber&quot;&gt;Amber&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;yellow&quot;&gt;Yellow&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;lime&quot;&gt;Lime&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;green&quot;&gt;Green&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;teal&quot;&gt;Teal&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;cyan&quot;&gt;Cyan&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;blue&quot;&gt;Blue&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;indigo&quot;&gt;Indigo&lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card
          class="custom-color-story"
          title="Custom Color"
          description="Use a CSS background value when a badge needs a one-off custom colour."
          usage="Prefer shared standalone colors for system consistency.|||Use custom values sparingly for brand, partner, or campaign-specific labels.|||The custom color still affects background only; text colour follows the badge variant."

        >
          <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
            <mui-badge color="var(--custom-badge-orange)">Orange Gradient</mui-badge>
            <mui-badge color="var(--custom-badge-blue)">Blue Gradient</mui-badge>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            [data-theme=&quot;light&quot;] .custom-color-story {<br />
            &nbsp;&nbsp;--custom-badge-orange: linear-gradient(180deg, var(--orange-200), var(--orange-300));<br />
            &nbsp;&nbsp;--custom-badge-blue: linear-gradient(180deg, var(--blue-200), var(--blue-300));<br />
            }<br />
            <br />
            [data-theme=&quot;dark&quot;] .custom-color-story {<br />
            &nbsp;&nbsp;--custom-badge-orange: linear-gradient(180deg, var(--orange-300), var(--orange-400));<br />
            &nbsp;&nbsp;--custom-badge-blue: linear-gradient(180deg, var(--blue-300), var(--blue-400));<br />
            }<br />
            <br />
            &lt;story-card canvas-background=&quot;var(--surface-elevated-100)&quot;&gt;<br />
            &lt;mui-badge color=&quot;var(--custom-badge-orange)&quot;&gt;Orange Gradient&lt;/mui-badge&gt;<br />
            &lt;mui-badge color=&quot;var(--custom-badge-blue)&quot;&gt;Blue Gradient&lt;/mui-badge&gt;<br />
            &lt;/story-card&gt;
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

        imports='["@muibook/components/mui-badge"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-badge", storyBadge);
