import { getComponentDocs } from "../../../utils/story-data";

class storyQuote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Quote");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Quote"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-quote" title="Quote"></story-api-types>

      <story-card id="quote" title="${storyMeta["quote"].title}" description="${storyMeta["quote"].description}" usage="${storyMeta["quote"].usage}">

      <div slot="body">

        <mui-body>Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis
        euismod. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu
        leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</mui-body>

        <mui-quote>Risus Mollis Dapibus</mui-quote>

        <mui-body>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non
        mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor
        id nibh ultricies vehicula ut id elit.</mui-body>

      </div>

      <story-code-block slot="footer" scrollable>
        &lt;mui-quote&gt;...&lt;/mui-quote&gt;
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

        imports='["@muibook/components/mui-quote"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-quote", storyQuote);
