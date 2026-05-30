import { getComponentDocs } from "../../../utils/story-data";
import "../../../../components/mui-status";

class storyStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Status");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-status" title="Status"></story-api-types>

      <story-card
        title="Default"
        description="A compact visual indicator for records, workflows, or system conditions."
        usage="Use Status when the text describes the state of an object.|||Status is non-interactive by default, but can be interactive when composed as a trigger or compact state action.|||Use Badge for counts or tiny non-interactive metadata.|||Use Message for persistent page-level notices."
      >
        <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
          <mui-status>Active</mui-status>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-status&gt;Active&lt;/mui-status&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Variants"
        description="Use variant for semantic status intent."
        usage="Omit variant for the default neutral status.|||Use info for informational state.|||Use positive, warning, or attention when the state has semantic feedback meaning."
      >
        <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
          <mui-status variant="info">Queued</mui-status>
          <mui-status variant="positive">Synced</mui-status>
          <mui-status variant="warning">Review</mui-status>
          <mui-status variant="attention">Blocked</mui-status>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-status variant=&quot;info&quot;&gt;Queued&lt;/mui-status&gt;<br />
          &lt;mui-status variant=&quot;positive&quot;&gt;Synced&lt;/mui-status&gt;<br />
          &lt;mui-status variant=&quot;warning&quot;&gt;Review&lt;/mui-status&gt;<br />
          &lt;mui-status variant=&quot;attention&quot;&gt;Blocked&lt;/mui-status&gt;
        </story-code-block>
      </story-card>

      <story-card title="Sizes">
        <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
          <mui-status size="small">Draft</mui-status>
          <mui-status size="medium">Draft</mui-status>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-status size=&quot;small&quot;&gt;Draft&lt;/mui-status&gt;<br />
          &lt;mui-status size=&quot;medium&quot;&gt;Draft&lt;/mui-status&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Standalone Colors"
        description="Use color for categorical labels that are not semantic feedback states."
        usage="Colors map to the shared categorical colour range.|||Use variant for semantic intent such as positive, warning, or attention.|||Use color for categories, teams, tags, or grouped workflow labels."
      >
        <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
            <mui-status color="grey">Grey</mui-status>
            <mui-status color="purple">Purple</mui-status>
            <mui-status color="violet">Violet</mui-status>
            <mui-status color="pink">Pink</mui-status>
            <mui-status color="magenta">Magenta</mui-status>
          </mui-h-stack>
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
            <mui-status color="red">Red</mui-status>
            <mui-status color="orange">Orange</mui-status>
            <mui-status color="amber">Amber</mui-status>
            <mui-status color="yellow">Yellow</mui-status>
            <mui-status color="lime">Lime</mui-status>
          </mui-h-stack>
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
            <mui-status color="green">Green</mui-status>
            <mui-status color="teal">Teal</mui-status>
            <mui-status color="cyan">Cyan</mui-status>
            <mui-status color="blue">Blue</mui-status>
            <mui-status color="indigo">Indigo</mui-status>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-status color=&quot;grey&quot;&gt;Grey&lt;/mui-status&gt;<br />
          &lt;mui-status color=&quot;purple&quot;&gt;Purple&lt;/mui-status&gt;<br />
          &lt;mui-status color=&quot;blue&quot;&gt;Blue&lt;/mui-status&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Before and After Slots"
        description="Use slots when the status benefits from an icon or compact accessory."
        usage="Icons are sized down inside Status so they remain proportional.|||Check slot alignment across status sizes before using a status in dense layouts."
      >
        <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
            <mui-status size="small" variant="positive">
              <mui-icon-check slot="before"></mui-icon-check>
              Connected
            </mui-status>
            <mui-status size="small" variant="warning">
              Review
              <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
            </mui-status>
            <mui-status size="small" variant="warning">
              <mui-icon-check slot="before"></mui-icon-check>
              Review
              <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
            </mui-status>
          </mui-h-stack>
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
            <mui-status size="medium" variant="positive">
              <mui-icon-check slot="before"></mui-icon-check>
              Connected
            </mui-status>
            <mui-status size="medium" variant="warning">
              Review
              <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
            </mui-status>
            <mui-status size="medium" variant="warning">
              <mui-icon-check slot="before"></mui-icon-check>
              Review
              <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
            </mui-status>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-status size=&quot;small&quot; variant=&quot;positive&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-check slot=&quot;before&quot;&gt;&lt;/mui-icon-check&gt;<br />
          &nbsp;&nbsp;Connected<br />
          &lt;/mui-status&gt;<br />
          &lt;mui-status size=&quot;small&quot; variant=&quot;warning&quot;&gt;<br />
          &nbsp;&nbsp;Review<br />
          &nbsp;&nbsp;&lt;mui-icon-right-chevron slot=&quot;after&quot;&gt;&lt;/mui-icon-right-chevron&gt;<br />
          &lt;/mui-status&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Action"
        description="Use action only when the status itself is interactive."
        usage="Status is non-interactive by default.|||Add action when it opens a menu, changes a filter, or performs a compact state action.|||Action applies button semantics, keyboard activation, focus styling, and pointer cursor."
      >
        <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
          <mui-status action variant="info">
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
            Filtered
          </mui-status>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-status action variant=&quot;info&quot;&gt;<br />
          &nbsp;&nbsp;Filtered<br />
          &nbsp;&nbsp;&lt;mui-icon-right-chevron slot=&quot;after&quot;&gt;&lt;/mui-icon-right-chevron&gt;<br />
          &lt;/mui-status&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Dropdown Composition"
        description="Status can be composed inside other controls when the state is also the selected value."
      >
        <mui-dropdown slot="body">
          <mui-status slot="action" action variant="positive">
            <mui-icon-check slot="before"></mui-icon-check>
            Active
            <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
          </mui-status>
          <mui-button size="x-small" variant="primary">Active</mui-button>
          <mui-button size="x-small" variant="tertiary">Review</mui-button>
          <mui-button size="x-small" variant="tertiary">Blocked</mui-button>
        </mui-dropdown>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-status slot=&quot;action&quot; action variant=&quot;positive&quot; size=&quot;small&quot;&gt;Active&lt;/mui-status&gt;<br />
          &lt;/mui-dropdown&gt;
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
        imports='["@muibook/components/mui-status"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-status", storyStatus);
