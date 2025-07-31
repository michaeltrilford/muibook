import Image from "../../images/pages/muiplay.png";

class AgentKeywordsPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .config::part(display) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 1230px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @media (min-width: 1390px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 500px;
          gap: 9.6rem;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Agent Keywords"
        description="Structured terms for parsing intent or triggering logic."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/agent/keywords/index.ts" 
      >


      <mui-v-stack space="var(--space-700)">

        <page-card>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">Agent Keywords are structured terms designed to parse user intent and trigger specific AI agent logic efficiently. They provide a reliable vocabulary for matching commands and guiding automated workflows.</mui-body>
                <mui-body size="large">By defining these keywords clearly, you enable consistent and reusable AI interactions across different implementations and platforms.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Why Agent Keywords Matter</mui-heading>
                <mui-body size="medium">
                  Define and organize domain-specific keywords to improve intent recognition and enable scalable AI-driven logic in your applications.
                </mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Agent Keywords" />
            </mui-image>  
          </mui-grid>


          <mui-rule slot="footer"></mui-rule>

          <mui-code slot="footer" scrollable>
          // 🛠️ Keywords<br><br>
          export const muiKeywords: Record&lt;string, string[]&gt; = &#123;<br>
          &nbsp;&nbsp;alert: [&quot;alert&quot;, &quot;success&quot;, &quot;info&quot;, &quot;warning&quot;, &quot;error&quot;, &quot;message&quot;, &quot;banner&quot;, &quot;notification&quot;],<br>
          &nbsp;&nbsp;message: [&quot;message&quot;, &quot;notice&quot;, &quot;notification&quot;, &quot;alert&quot;, &quot;info&quot;, &quot;positive&quot;, &quot;neutral&quot;, &quot;warning&quot;, &quot;attention&quot;],<br>
          &nbsp;&nbsp;badge: [&quot;badge&quot;, &quot;label&quot;, &quot;tag&quot;, &quot;notification&quot;],<br>
          &nbsp;&nbsp;button: [&quot;button&quot;, &quot;click&quot;, &quot;action&quot;, &quot;submit&quot;, &quot;cta&quot;, &quot;primary&quot;, &quot;secondary&quot;, &quot;tertiary&quot;, &quot;attention&quot;],<br>
          &nbsp;&nbsp;&quot;button-group&quot;: [&quot;button group&quot;, &quot;buttons&quot;, &quot;actions&quot;, &quot;group&quot;, &quot;right&quot;, &quot;align&quot;],<br>
          &nbsp;&nbsp;icon: [&quot;icon&quot;, &quot;glyph&quot;, &quot;symbol&quot;, &quot;add&quot;, &quot;plus&quot;],<br>
          &nbsp;&nbsp;link: [&quot;link&quot;, &quot;anchor&quot;, &quot;hyperlink&quot;, &quot;navigation&quot;, &quot;primary&quot;, &quot;secondary&quot;, &quot;tertiary&quot;, &quot;attention&quot;],<br>
          &nbsp;&nbsp;tab: [&quot;tab&quot;, &quot;tab bar&quot;, &quot;tab controller&quot;, &quot;tab panel&quot;, &quot;navigation&quot;, &quot;tabs&quot;],<br>
          &nbsp;&nbsp;carousel: [&quot;carousel&quot;, &quot;slider&quot;, &quot;carousel controller&quot;, &quot;carousel panel&quot;, &quot;carousel item&quot;, &quot;carousel tabs&quot;],<br>
          &nbsp;&nbsp;card: [&quot;card&quot;, &quot;panel&quot;, &quot;box&quot;, &quot;tile&quot;],<br>
          &nbsp;&nbsp;stack: [&quot;stack&quot;, &quot;v-stack&quot;, &quot;h-stack&quot;, &quot;vertical&quot;, &quot;horizontal&quot;, &quot;spacing&quot;],<br>
          &nbsp;&nbsp;grid: [&quot;grid&quot;, &quot;columns&quot;, &quot;rows&quot;, &quot;layout&quot;, &quot;container&quot;],<br>
          &nbsp;&nbsp;container: [&quot;container&quot;, &quot;wrapper&quot;, &quot;layout&quot;, &quot;section&quot;],<br>
          &nbsp;&nbsp;responsive: [&quot;responsive&quot;, &quot;breakpoint&quot;, &quot;mobile&quot;, &quot;desktop&quot;, &quot;showAbove&quot;, &quot;showBelow&quot;],<br>
          &nbsp;&nbsp;rule: [&quot;rule&quot;, &quot;divider&quot;, &quot;separator&quot;, &quot;line&quot;, &quot;hr&quot;],<br>
          &nbsp;&nbsp;heading: [&quot;heading&quot;, &quot;title&quot;, &quot;h1&quot;, &quot;h2&quot;, &quot;h3&quot;, &quot;level&quot;],<br>
          &nbsp;&nbsp;body: [&quot;body&quot;, &quot;text&quot;, &quot;paragraph&quot;, &quot;copy&quot;],<br>
          &nbsp;&nbsp;list: [&quot;list&quot;, &quot;items&quot;, &quot;ul&quot;, &quot;li&quot;]<br>
          &#125;;<br>
          &nbsp;&nbsp;&#46;&#46;&#46; View the <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/src/agent/keywords/index.ts" target="_blank" rel="noopener noreferrer">Github for full example</mui-link> &#46;&#46;&#46; <br>
          <br>
          </mui-code>

        </page-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("agent-keywords-page", AgentKeywordsPage);
