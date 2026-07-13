import { getComponentDocs } from "../../../utils/story-data";

class storyCode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Code");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Code"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
          <story-api-types tag="mui-code" title="Code"></story-api-types>

        <story-card id="large" title="${storyMeta["large"].title}" description="${storyMeta["large"].description}" usage="${storyMeta["large"].usage}">
          <div slot="body">
            <mui-code size="large">
              A tooltip drifted so far from its anchor it was officially lost at sea.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="large"&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

       <story-card id="medium" title="${storyMeta["medium"].title}" description="${storyMeta["medium"].description}" usage="${storyMeta["medium"].usage}">
          <div slot="body">
            <mui-code size="medium">
              The modal refused to close, holding focus hostage forever.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="medium"&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

        <story-card id="small" title="${storyMeta["small"].title}" description="${storyMeta["small"].description}" usage="${storyMeta["small"].usage}">
          <div slot="body">
            <mui-code size="small">
              The fox tried to tab into a hidden element, but focus was trapped in a loop.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="small"&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

        <story-card id="x-small" title="${storyMeta["x-small"].title}" description="${storyMeta["x-small"].description}" usage="${storyMeta["x-small"].usage}">
          <div slot="body">
            <mui-code size="x-small">
              A rogue component ignored the theme and styled itself in pure chaos.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="x-small"&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

        <story-card id="scrollable" title="${storyMeta["scrollable"].title}" description="${storyMeta["scrollable"].description}" usage="${storyMeta["scrollable"].usage}">
          <div slot="body">
            <mui-code size="large" scrollable>
              A tooltip drifted so far from its anchor it was officially lost at sea.
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="large" scrollable&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

        <story-card id="wrap" title="${storyMeta["wrap"].title}" description="${storyMeta["wrap"].description}" usage="${storyMeta["wrap"].usage}">
          <div slot="body">
            <mui-code size="small" wrap>
              {"source":"crm","query":"CSAT by feature","range":"Q4","include":["pain_points","sentiment","churn_drivers","top_requests"]}
            </mui-code>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code size="small" wrap&gt;...&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

        <story-card id="inline" title="${storyMeta["inline"].title}" description="${storyMeta["inline"].description}" usage="${storyMeta["inline"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-body size="medium">
              A curated <mui-code size="small" inline>agentCompositions</mui-code> subset for lightweight local LLM prompts.
            </mui-body>
            <mui-list as="ul">
              <mui-list-item size="small">Use <mui-code size="small" inline>inline</mui-code> when code appears inside list prose.</mui-list-item>
            </mui-list>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-body size="medium"&gt;<br />
            &nbsp;&nbsp;A curated &lt;mui-code size="small" inline&gt;agentCompositions&lt;/mui-code&gt; subset for lightweight local LLM prompts.<br />
            &lt;/mui-body&gt;<br /><br />
            &lt;mui-list as="ul"&gt;<br />
            &nbsp;&nbsp;&lt;mui-list-item size="small"&gt;Use &lt;mui-code size="small" inline&gt;inline&lt;/mui-code&gt; inside list prose.&lt;/mui-list-item&gt;<br />
            &lt;/mui-list&gt;
          </story-code-block>
        </story-card>

        <story-card id="formatted-payload-types" title="${storyMeta["formatted-payload-types"].title}" description="${storyMeta["formatted-payload-types"].description}" usage="${storyMeta["formatted-payload-types"].usage}">
          <mui-v-stack slot="body" space="var(--space-400)">
            <mui-body size="x-small" weight="bold">JSON</mui-body>
            <mui-code id="formattedJsonExample" size="small" wrap></mui-code>
            <mui-body size="x-small" weight="bold">CSS</mui-body>
            <mui-code id="formattedCssExample" size="small" wrap></mui-code>
            <mui-body size="x-small" weight="bold">JavaScript</mui-body>
            <mui-code id="formattedJsExample" size="small" wrap></mui-code>
            <mui-body size="x-small" weight="bold">TypeScript</mui-body>
            <mui-code id="formattedTsExample" size="small" wrap></mui-code>
            <mui-body size="x-small" weight="bold">Markdown</mui-body>
            <mui-code id="formattedMdExample" size="small" wrap></mui-code>
            <mui-body size="x-small" weight="bold">SQL</mui-body>
            <mui-code id="formattedSqlExample" size="small" wrap></mui-code>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            code.textContent = formatSource(payload, type);<br /><br />
            &lt;mui-code size="small" wrap&gt;&lt;/mui-code&gt;
          </story-code-block>
        </story-card>

        <story-card id="surface-contexts" title="${storyMeta["surface-contexts"].title}" description="${storyMeta["surface-contexts"].description}" usage="${storyMeta["surface-contexts"].usage}">
          <mui-v-stack slot="body" space="var(--space-600)">
            <mui-v-stack space="var(--space-200)">
              <mui-body size="x-small" weight="bold">Default</mui-body>
              <mui-code size="x-small" wrap>--code-background: var(--surface-elevated-100);</mui-code>
            </mui-v-stack>

            <mui-v-stack space="var(--space-200)">
              <mui-body size="x-small" weight="bold">Card Body</mui-body>
              <mui-card>
                <mui-card-body>
                  <mui-code size="x-small" wrap>Card body dynamically applies card-slot to nested code.</mui-code>
                </mui-card-body>
              </mui-card>
            </mui-v-stack>

            <mui-v-stack space="var(--space-200)">
              <mui-body size="x-small" weight="bold">Card Footer</mui-body>
              <mui-card>
                <mui-card-body>
                  <mui-body size="medium">Footer code should sit one elevation above the card surface.</mui-body>
                </mui-card-body>
                <mui-card-footer>
                  <mui-code size="x-small" wrap>Card footer dynamically applies card-slot to direct code.</mui-code>
                </mui-card-footer>
              </mui-card>
            </mui-v-stack>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-code&gt;...&lt;/mui-code&gt;<br /><br />
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-code&gt;...&lt;/mui-code&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;
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

        imports='["@muibook/components/mui-code"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;

    const formattedExamples = {
      formattedJsonExample: JSON.stringify(
        {
          source: "crm",
          query: "CSAT by feature",
          range: "Q4",
          include: ["pain_points", "sentiment", "churn_drivers"],
        },
        null,
        2,
      ),
      formattedCssExample: `.card {
  display: grid;
  gap: var(--space-200);
  padding: var(--space-300);
}`,
      formattedJsExample: `const result = items
  .filter((item) => item.active)
  .map((item) => item.id);`,
      formattedTsExample: `type PromptPayload = {
  source: string;
  query: string;
  include: string[];
};`,
      formattedMdExample: `## Q4 Notes

- Churn up in SMB
- CSAT strongest in onboarding
- Follow-up: improve docs`,
      formattedSqlExample: `SELECT feature_area, AVG(csat)
FROM survey_responses
WHERE quarter = "Q4"
GROUP BY feature_area;`,
    };

    Object.entries(formattedExamples).forEach(([id, text]) => {
      const code = this.shadowRoot.querySelector(`#${id}`);
      if (code) code.textContent = text;
    });
  }
}

customElements.define("story-code", storyCode);
