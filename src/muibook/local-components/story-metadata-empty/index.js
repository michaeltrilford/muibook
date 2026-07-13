class StoryMetadataEmpty extends HTMLElement {
  static get observedAttributes() {
    return ["component", "source", "command"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) this.render();
  }

  render() {
    const component = this.getAttribute("component") || "Component";
    const source = this.getAttribute("source") || "custom-elements.json";
    const command = this.hasAttribute("command") ? this.getAttribute("command") : "npm run cem";
    const getCard = ({ slot, headingSize, textSize, codeSize }) => /*html*/ `
      <mui-container slot="${slot}" width="560px" center>
        <mui-card>
          <mui-card-body>
            <mui-v-stack space="var(--space-400)" alignx="start">
              <mui-heading level="2" size="${headingSize}">Story metadata unavailable</mui-heading>
              <mui-list>
                <mui-list-item size="${textSize}">
                  ${component} story metadata is missing from
                  <mui-code inline size="${codeSize}">${source}</mui-code>
                </mui-list-item>
                <mui-list-item size="${textSize}">
                  ${command ? `Run <mui-code inline size="${codeSize}">${command}</mui-code> and reload this page.` : "Update the metadata source and reload this page."}
                </mui-list-item>
              </mui-list>
            </mui-v-stack>
          </mui-card-body>
        </mui-card>
      </mui-container>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <mui-v-stack height="100dvh" alignx="center" aligny="center">
        <mui-responsive variant="container" observe="parent" breakpoint="600" style="width: 100%;">
          ${getCard({ slot: "showAbove", headingSize: "3", textSize: "medium", codeSize: "small" })}
          ${getCard({ slot: "showBelow", headingSize: "6", textSize: "x-small", codeSize: "xx-small" })}
        </mui-responsive>
      </mui-v-stack>
    `;
  }
}

customElements.define("story-metadata-empty", StoryMetadataEmpty);
