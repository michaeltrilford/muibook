class ChangelogPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const res = await fetch("/CHANGELOG.md");
    const changelog = await res.text();

    this.shadowRoot.innerHTML = /*html*/ `
      <style>:host { display:block; }</style>
      <story-template 
        title="Changelog"
        description="Keep track of updates, fixes, and new features for your components."
        github="https://github.com/michaeltrilford/muibook/blob/main/public/CHANGELOG.md"
      >
        <design-changelog>${changelog}</design-changelog>
      </story-template>
    `;
  }
}

customElements.define("changelog-page", ChangelogPage);
