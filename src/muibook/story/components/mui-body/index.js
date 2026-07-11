import { getComponentDocs } from "../../../utils/story-data";

class storyBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Body");
    const attrsReference = JSON.stringify([
      {
        component: "mui-body",
        parentAttrs: ["has-before", "has-after"],
        childAttrs: [],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
          <story-api-types tag="mui-body" title="Body"></story-api-types>

        <story-card title="Default">

          <div slot="body">
            <mui-body>Risus Mollis Dapibus</mui-body>
          </div>

          <story-code-block slot="footer" scrollable>
            &lt;mui-body&gt; ... &lt;/mui-body&gt;
          </story-code-block>

        </story-card>

        <story-card title="Sizes">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4">XX-Small</mui-heading>
                  <mui-body size="xx-small">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">X-Small</mui-heading>
                  <mui-body size="x-small">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Small</mui-heading>
                  <mui-body size="small">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Medium</mui-heading>
                  <mui-body size="medium">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Large</mui-heading>
                  <mui-body size="large">Risus Mollis Dapibus</mui-body>
                </div>
              </mui-v-stack>
            </div>

            <story-code-block slot="footer" scrollable>
              &lt;mui-body size="xx-small"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="x-small"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="small"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="medium"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="large"&gt; ... &lt;/mui-body&gt;
            </story-code-block>

          </story-card>

          <story-card title="Variants">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4">Secondary</mui-heading>
                  <mui-body variant="secondary">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Info</mui-heading>
                  <mui-body variant="info">Helpful context for this section.</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Positive</mui-heading>
                  <mui-body variant="positive">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Warning</mui-heading>
                  <mui-body variant="warning">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Attention</mui-heading>
                  <mui-body variant="attention">Risus Mollis Dapibus</mui-body>
                </div>
              </mui-v-stack>
            </div>

            <story-code-block slot="footer" scrollable>
              &lt;mui-body variant="secondary"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="info"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="positive"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="warning"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="attention"&gt; ... &lt;/mui-body&gt;
            </story-code-block>

          </story-card>

          <story-card title="Before and After Slots" description="Compose icons and inline helpers without part-selector styling.">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">XX-Small</mui-heading>
                  <mui-body size="xx-small" variant="info"><mui-icon-info slot="before"></mui-icon-info>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">X-Small</mui-heading>
                  <mui-body size="x-small" variant="positive"><mui-icon-check slot="before"></mui-icon-check>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">Small</mui-heading>
                  <mui-body size="small" variant="warning"><mui-icon-warning slot="before"></mui-icon-warning>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">Medium</mui-heading>
                  <mui-body size="medium" variant="attention"><mui-icon-attention slot="before"></mui-icon-attention>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">Large</mui-heading>
                  <mui-body size="large">
                    Risus Mollis Dapibus
                    <mui-hint slot="after" placement="top" style="display: inline-flex;">
                      <mui-icon-info slot="trigger"></mui-icon-info>
                      Additional details
                    </mui-hint>
                  </mui-body>
                </div>
              </mui-v-stack>
            </div>

            <story-code-block slot="footer" scrollable>
              &lt;mui-body size="xx-small" variant="info"&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-icon-info slot="before"&gt;&lt;/mui-icon-info&gt;
              <br />
              &nbsp;&nbsp;Risus Mollis Dapibus
              <br />
              &lt;/mui-body&gt;
              <br />
              <br />
              &lt;mui-body size="x-small" variant="positive"&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-check slot=&quot;before&quot;&gt;&lt;/mui-icon-check&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &lt;/mui-body&gt;
              <br />
              <br>
              &lt;mui-body size="small" variant="warning"&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-warning slot=&quot;before&quot;&gt;&lt;/mui-icon-warning&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &lt;/mui-body&gt;
              <br>
              <br />
              &lt;mui-body size="medium" variant="attention"&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-attention slot=&quot;before&quot;&gt;&lt;/mui-icon-attention&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &lt;/mui-body&gt;
              <br>
              <br />
              &lt;mui-body size="large"&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &nbsp;&nbsp;&lt;mui-hint slot=&quot;after&quot; placement=&quot;top&quot;&gt;
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-info slot=&quot;trigger&quot;&gt;&lt;/mui-icon-info&gt;
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;Additional details
              <br>
              &nbsp;&nbsp;&lt;/mui-hint&gt;
              <br>
              &lt;/mui-body&gt;
            </story-code-block>

          </story-card>

          <story-card title="Before and After Wrapping" description="Before/after slots stay aligned when body text wraps to multiple lines.">

            <div slot="body">
              <mui-v-stack space="var(--space-300)" alignx="start">
                <div style="max-width: 28rem;">
                  <mui-body size="x-small" variant="info">
                    <mui-icon-info slot="before"></mui-icon-info>
                    X-small wrapping text keeps icon alignment stable when the content moves to a second line in constrained widths.
                    <mui-hint slot="after" placement="top" style="display: inline-flex;">
                      <mui-badge slot="trigger" size="xx-small">XS</mui-badge>
                      X-small size tag
                    </mui-hint>
                  </mui-body>
                </div>
                <div style="max-width: 28rem;">
                  <mui-body size="small" variant="warning">
                    <mui-icon-warning slot="before"></mui-icon-warning>
                    This helper message wraps across multiple lines so the icon remains aligned at the start of the content.
                    <mui-hint slot="after" placement="top" style="display: inline-flex;">
                      <mui-icon-info slot="trigger" color="var(--text-color-secondary)"></mui-icon-info>
                      Warning details
                    </mui-hint>
                  </mui-body>
                </div>
                <div style="max-width: 28rem;">
                  <mui-body size="medium" variant="attention">
                    <mui-icon-attention slot="before"></mui-icon-attention>
                    This is a longer multi-line message with before and after content to validate start alignment for wrapped body text.
                    <mui-hint slot="after" placement="top" style="display: inline-flex;">
                      <mui-badge slot="trigger" size="small">NEW</mui-badge>
                      New status
                    </mui-hint>
                  </mui-body>
                </div>
                <div style="max-width: 28rem;">
                  <mui-body size="large" variant="positive">
                    <mui-icon-check slot="before"></mui-icon-check>
                    Large body wrapping also keeps the leading icon top-aligned while the line-height and text block expand.
                    <mui-hint slot="after" placement="top" style="display: inline-flex;">
                      <mui-icon-info slot="trigger" color="var(--text-color-secondary)"></mui-icon-info>
                      Success details
                    </mui-hint>
                  </mui-body>
                </div>
              </mui-v-stack>
            </div>

            <story-code-block slot="footer" scrollable>
              &lt;mui-body size=&quot;x-small&quot; variant=&quot;info&quot;&gt;...&lt;/mui-body&gt;
              <br>
              &lt;mui-body size=&quot;small&quot; variant=&quot;warning&quot;&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-warning slot=&quot;before&quot;&gt;&lt;/mui-icon-warning&gt;
              <br>
              &nbsp;&nbsp;{long wrapping text}
              <br>
              &nbsp;&nbsp;&lt;mui-hint slot=&quot;after&quot; placement=&quot;top&quot;&gt;
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-info slot=&quot;trigger&quot; color=&quot;var(--text-color-secondary)&quot;&gt;&lt;/mui-icon-info&gt;
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;Warning details
              <br>
              &nbsp;&nbsp;&lt;/mui-hint&gt;
              <br>
              &lt;/mui-body&gt;
              <br>
              &lt;mui-body size=&quot;medium&quot; variant=&quot;attention&quot;&gt;
              <br>
              &nbsp;&nbsp;{long wrapping text}
              <br>
              &nbsp;&nbsp;&lt;mui-hint slot=&quot;after&quot; placement=&quot;top&quot;&gt;
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge slot=&quot;trigger&quot; size=&quot;small&quot;&gt;NEW&lt;/mui-badge&gt;
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;New status
              <br>
              &nbsp;&nbsp;&lt;/mui-hint&gt;
              <br>
              &lt;/mui-body&gt;
              <br>
              &lt;mui-body size=&quot;large&quot; variant=&quot;positive&quot;&gt;
              <br>
              &nbsp;&nbsp;{long wrapping text}
              <br>
              &nbsp;&nbsp;&lt;mui-hint slot=&quot;after&quot; placement=&quot;top&quot;&gt;
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-info slot=&quot;trigger&quot; color=&quot;var(--text-color-secondary)&quot;&gt;&lt;/mui-icon-info&gt;
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;Success details
              <br>
              &nbsp;&nbsp;&lt;/mui-hint&gt;
              <br>
              &lt;/mui-body&gt;
            </story-code-block>

          </story-card>

          <story-card title="Overflow" description="Use truncate for one-line overflow and clamp for bounded multi-line copy.">

            <div slot="body">
              <mui-v-stack space="var(--space-400)" alignx="start">
                <div style="width: min(100%, 28rem); border: var(--border-thin); border-radius: var(--radius-200); padding: var(--space-300);">
                  <mui-v-stack space="var(--space-100)">
                    <mui-heading size="5" level="3">Truncate</mui-heading>
                    <mui-body truncate>
                      Subscription analytics and lifecycle reporting for enterprise workspaces with a long account name.
                    </mui-body>
                  </mui-v-stack>
                </div>

                <div style="width: min(100%, 28rem); border: var(--border-thin); border-radius: var(--radius-200); padding: var(--space-300);">
                  <mui-v-stack space="var(--space-100)">
                    <mui-heading size="5" level="3">Clamp</mui-heading>
                    <mui-body clamp="2">
                      Subscription analytics and lifecycle reporting for enterprise workspaces. This copy is intentionally longer so it can be reviewed as a two-line clamp inside a constrained layout.
                    </mui-body>
                  </mui-v-stack>
                </div>

                <div style="width: min(100%, 28rem); border: var(--border-thin); border-radius: var(--radius-200); padding: var(--space-300);">
                  <mui-v-stack space="var(--space-100)">
                    <mui-heading size="5" level="3">Clamp With Slots</mui-heading>
                    <mui-body clamp="2" variant="info">
                      <mui-icon-info slot="before"></mui-icon-info>
                      Slotted icons and badges remain visible while only the text content is clamped inside the body component.
                      <mui-badge slot="after">Info</mui-badge>
                    </mui-body>
                  </mui-v-stack>
                </div>
              </mui-v-stack>
            </div>

            <story-code-block slot="footer" scrollable>
              &lt;mui-body truncate&gt;
              <br>
              &nbsp;&nbsp;{long single-line content}
              <br>
              &lt;/mui-body&gt;
              <br>
              <br>
              &lt;mui-body clamp=&quot;2&quot;&gt;
              <br>
              &nbsp;&nbsp;{long multi-line content}
              <br>
              &lt;/mui-body&gt;
              <br>
              <br>
              &lt;mui-body clamp=&quot;2&quot; variant=&quot;info&quot;&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-info slot=&quot;before&quot;&gt;&lt;/mui-icon-info&gt;
              <br>
              &nbsp;&nbsp;{long multi-line content}
              <br>
              &nbsp;&nbsp;&lt;mui-badge slot=&quot;after&quot;&gt;Info&lt;/mui-badge&gt;
              <br>
              &lt;/mui-body&gt;
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

        imports='["@muibook/components/mui-body"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-body", storyBody);
