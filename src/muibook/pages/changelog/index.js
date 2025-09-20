import changelog from "../../../../CHANGELOG.md?raw";

class ChangelogPage extends HTMLElement {
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
        title="Changelog"
        description="Keep track of updates, fixes, and new features for your components."
        github="https://github.com/michaeltrilford/muibook/blob/main/CHANGELOG.md"
      >
        <design-changelog>${changelog}</design-changelog>
      </story-template>
    `;
  }
}

customElements.define("changelog-page", ChangelogPage);
