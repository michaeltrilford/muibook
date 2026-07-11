import { getComponentDocs } from "../../../utils/story-data";

class StorySkeleton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Skeleton");

    const stories = /*html*/ `
      <story-api-types tag="mui-skeleton" title="Skeleton"></story-api-types>

      <story-card
        id="multiline"
        title="Multi-line"
        description="Multi-line copy placeholders with shimmer animation."
        usage="Prefer token, rem, and percentage sizing over fixed pixel values.|||Compose placeholder structures with mui-v-stack, mui-h-stack, and mui-grid.|||Mirror real layout hierarchy so loading and loaded states feel consistent.">
        <mui-skeleton slot="body" lines="4" line-widths="100%,92%,96%,70%" animation="shimmer"></mui-skeleton>
        <story-code-block slot="footer" scrollable>
          &lt;mui-skeleton lines="4" line-widths="100%,92%,96%,70%" animation="shimmer"&gt;&lt;/mui-skeleton&gt;
        </story-code-block>
      </story-card>

      <story-card id="line" title="Line" description="Single-line text placeholder.">
        <mui-skeleton slot="body" size="medium" width="70%"></mui-skeleton>
        <story-code-block slot="footer" scrollable>
          &lt;mui-skeleton size="medium" width="70%"&gt;&lt;/mui-skeleton&gt;
        </story-code-block>
      </story-card>

      <story-card id="duration" title="Shimmer Duration" description="Use duration to slow down or speed up shimmer.">
        <mui-v-stack slot="body" space="var(--space-300)">
          <mui-skeleton lines="3" line-widths="100%,90%,72%" animation="shimmer" duration="2400ms"></mui-skeleton>
          <mui-skeleton lines="3" line-widths="100%,90%,72%" animation="shimmer" duration="900ms"></mui-skeleton>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-skeleton animation="shimmer" duration="2400ms" lines="3" line-widths="100%,90%,72%"&gt;&lt;/mui-skeleton&gt;<br />
          &lt;mui-skeleton animation="shimmer" duration="900ms" lines="3" line-widths="100%,90%,72%"&gt;&lt;/mui-skeleton&gt;
        </story-code-block>
      </story-card>

      <story-card id="shapes" title="Shapes" description="Rect and circle placeholders for cards, media, and avatars.">
        <mui-v-stack slot="body" space="var(--space-300)">
          <mui-skeleton shape="rect" height="var(--space-800)" radius="var(--radius-300)"></mui-skeleton>
          <mui-h-stack space="var(--space-200)" aligny="center">
            <mui-skeleton shape="circle" size="large" width="var(--space-500)"></mui-skeleton>
            <mui-skeleton lines="2" line-widths="48%,32%"></mui-skeleton>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-skeleton shape="rect" height="var(--space-800)" radius="var(--radius-300)"&gt;&lt;/mui-skeleton&gt;<br />
          &lt;mui-skeleton shape="circle" size="large" width="var(--space-500)"&gt;&lt;/mui-skeleton&gt;
        </story-code-block>
      </story-card>

      <story-card id="slots" title="Before and After Slots" description="Compose leading/trailing placeholders around content lines for wireframe tooling.">
        <mui-skeleton slot="body" lines="3" line-widths="100%,88%,68%" gap="var(--space-300)">
          <mui-skeleton slot="before" shape="circle" size="large" width="var(--space-500)"></mui-skeleton>
          <mui-skeleton slot="after" shape="rect" size="small" width="var(--space-700)" height="var(--space-400)"></mui-skeleton>
        </mui-skeleton>
        <story-code-block slot="footer" scrollable>
          &lt;mui-skeleton lines="3" line-widths="100%,88%,68%" gap="var(--space-300)"&gt;<br />
          &nbsp;&nbsp;&lt;mui-skeleton slot="before" shape="circle" size="large" width="var(--space-500)"&gt;&lt;/mui-skeleton&gt;<br />
          &nbsp;&nbsp;&lt;mui-skeleton slot="after" shape="rect" size="small" width="var(--space-700)" height="var(--space-400)"&gt;&lt;/mui-skeleton&gt;<br />
          &lt;/mui-skeleton&gt;
        </story-code-block>
      </story-card>

      <story-card id="toggle" title="Loading Toggle" description="Use loading='false' to reveal real content in-place.">
        <mui-skeleton slot="body" loading="false" lines="3">
          <mui-body size="small">Real content renders when loading is false.</mui-body>
        </mui-skeleton>
        <story-code-block slot="footer" scrollable>
          &lt;mui-skeleton loading="false" lines="3"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body size="small"&gt;Real content renders when loading is false.&lt;/mui-body&gt;<br />
          &lt;/mui-skeleton&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; }
      </style>
      <story-template
        title="${data?.title || "Skeleton"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"

        imports='["@muibook/components/mui-skeleton"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="multiline::Multi-line|||line::Line|||duration::Shimmer Duration|||shapes::Shapes|||slots::Before and After Slots|||toggle::Loading Toggle">
        </story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-skeleton", StorySkeleton);
