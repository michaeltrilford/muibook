class storyIcon extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-grid::part(internal) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 600px) {
        mui-grid::part(internal) {
          grid-template-columns: 1fr 1fr;
        }
      }

      .color-options::part(color) {
        color: var(--app-story-icon-grid-text);
        margin-top: var(--space-100);
      }

      .color-options.inverted::part(color) {
        color: var(--app-story-icon-grid-text-inverted);
        margin-top: var(--space-100);
      }

      .variant.primary::part(color) {
        color: var(--action-primary-text-color);
      }
      .variant.secondary::part(color) {
        color: var(--action-secondary-text-color);
      }
      .variant.tertiary::part(color) { center
        color: var(--action-tertiary-text-color);
      }
      .variant.attention::part(color) {
        color: var(--action-attention-text-color);
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Icons"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-311&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/michaeltrilford.github.io/tree/master/mui-icons"
      >

        <mui-v-stack space="var(--space-700)">

          <story-card title="Default" description="Icons are set to size 'small' by default." >

            <mui-grid space="var(--space-400)" slot="body">

              <story-icon-grid center>              
                <mui-icon-accessibility slot="body"></mui-icon-accessibility>
                <mui-code slot="footer">mui-icon-accessibility</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-add slot="body"></mui-icon-add>
                <mui-code slot="footer">mui-icon-add</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-close slot="body"></mui-icon-close>
                <mui-code slot="footer">mui-icon-close</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-up-chevron slot="body"></mui-icon-up-chevron>
                <mui-code slot="footer">mui-icon-up-chevron</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-down-chevron slot="body"></mui-icon-down-chevron>
                <mui-code slot="footer">mui-icon-down-chevron</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-left-chevron slot="body"></mui-icon-left-chevron>
                <mui-code slot="footer">mui-icon-left-chevron</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-right-chevron slot="body"></mui-icon-right-chevron>
                <mui-code slot="footer">mui-icon-right-chevron</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-grid slot="body"></mui-icon-grid>
                <mui-code slot="footer">mui-icon-grid</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-left-arrow slot="body"></mui-icon-left-arrow>
                <mui-code slot="footer">mui-icon-left-arrow-arrow</mui-code>
              </story-icon-grid>      

              <story-icon-grid center>              
                <mui-icon-menu slot="body"></mui-icon-menu>
                <mui-code slot="footer">mui-icon-menu</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-message slot="body"></mui-icon-message>
                <mui-code slot="footer">mui-icon-message</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-moon slot="body"></mui-icon-moon>
                <mui-code slot="footer">mui-icon-moon</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-sun slot="body"></mui-icon-sun>
                <mui-code slot="footer">mui-icon-sun</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-subtract slot="body"></mui-icon-subtract>
                <mui-code slot="footer">mui-icon-subtract</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-check slot="body"></mui-icon-check>
                <mui-code slot="footer">mui-icon-check</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-info slot="body"></mui-icon-info>
                <mui-code slot="footer">mui-icon-info</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-warning slot="body"></mui-icon-warning>
                <mui-code slot="footer">mui-icon-warning</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-attention slot="body"></mui-icon-attention>
                <mui-code slot="footer">mui-icon-attention</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-globe slot="body"></mui-icon-globe>
                <mui-code slot="footer">mui-icon-globe</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-stop slot="body"></mui-icon-stop>
                <mui-code slot="footer">mui-icon-stop</mui-code>
              </story-icon-grid>



            </mui-grid> 

          </story-card>

          <story-card title="Color Options" description="The icons have default color of var(--black). The color can be inverted or a custom color applied." >

            <mui-grid col="1fr 1fr" space="var(--space-400)" slot="body">

              <story-icon-grid center>              
                <mui-icon-menu slot="body"></mui-icon-menu>
                <mui-body size="x-small" weight="bold" class="color-options" slot="body">Default Color</mui-body>
                <mui-code slot="footer">mui-icon-menu</mui-code>
              </story-icon-grid>

              <story-icon-grid center theme="inverted">              
                <mui-icon-menu slot="body" color="inverted"></mui-icon-menu>
                <mui-body size="x-small" weight="bold" class="color-options inverted" slot="body">Inverted Color</mui-body>
                <mui-code slot="footer"> color="inverted"</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-menu slot="body" color="var(--blue-500)"></mui-icon-menu>
                <mui-body size="x-small" weight="bold" class="color-options" slot="body">Custom Color</mui-body>
                <mui-code slot="footer">color="var(--blue-500)"</mui-code>
              </story-icon-grid>

            </mui-grid> 

          </story-card>

          <story-card title="Icon Toggle: Default" description="Transition between two icons with a scale effect." >
            <mui-grid col="1fr" space="var(--space-400)" slot="body">
              <story-icon-grid>            
                <mui-icon-toggle slot="body">
                  <mui-icon-add slot="start"></mui-icon-add>
                  <mui-icon-subtract slot="end"></mui-icon-subtract>
                </mui-icon-toggle>
                <mui-body size="x-small" weight="bold" class="title" slot="body">Add / Subtract</mui-body>
                <mui-code slot="footer">
                  &lt;mui-icon-toggle&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;
                  <br />
                  &lt;/mui-icon-toggle&gt;
                </mui-code>
              </story-icon-grid>

              <story-icon-grid>            
                <mui-icon-toggle variant="secondary" slot="body">
                  <mui-icon-add slot="start"></mui-icon-add>
                  <mui-icon-subtract slot="end"></mui-icon-subtract>
                </mui-icon-toggle>
                <mui-body size="x-small" weight="bold" class="title" slot="body">Add / Subtract</mui-body>
                <mui-code slot="footer">
                  &lt;mui-icon-toggle variant="secondary"&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;
                  <br />
                  &lt;/mui-icon-toggle&gt;
                </mui-code>
              </story-icon-grid>

              <story-icon-grid>            
                <mui-icon-toggle variant="tertiary" slot="body">
                  <mui-icon-add slot="start"></mui-icon-add>
                  <mui-icon-subtract slot="end"></mui-icon-subtract>
                </mui-icon-toggle>
                <mui-body size="x-small" weight="bold" class="title" slot="body">Add / Subtract</mui-body>
                <mui-code slot="footer">
                  &lt;mui-icon-toggle variant="tertiary"&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;
                  <br />
                  &lt;/mui-icon-toggle&gt;
                </mui-code>
              </story-icon-grid>

              <story-icon-grid>            
                <mui-icon-toggle variant="attention" slot="body">
                  <mui-icon-add slot="start"></mui-icon-add>
                  <mui-icon-subtract slot="end"></mui-icon-subtract>
                </mui-icon-toggle>
                <mui-body size="x-small" weight="bold" class="title" slot="body">Add / Subtract</mui-body>
                <mui-code slot="footer">
                  &lt;mui-icon-toggle variant="attention"&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;
                  <br />
                  &lt;/mui-icon-toggle&gt;
                </mui-code>
              </story-icon-grid>

            </mui-grid> 
          </story-card>

          <story-card title="Icon Toggle: Rotate" description="Transition between two icons with a rotation effect." >
            <mui-grid col="1fr" space="var(--space-400)" slot="body">
              <story-icon-grid>            
                <mui-icon-toggle rotate slot="body">
                  <mui-icon-add slot="start"></mui-icon-add>
                  <mui-icon-subtract slot="end"></mui-icon-subtract>
                </mui-icon-toggle>
                <mui-body size="x-small" weight="bold" class="title" slot="body">Add / Subtract</mui-body>
                <mui-code slot="footer">
                  &lt;mui-icon-toggle rotate&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;
                  <br />
                  &lt;/mui-icon-toggle&gt;
                </mui-code>
              </story-icon-grid>

              <story-icon-grid>            
                <mui-icon-toggle rotate variant="secondary" slot="body">
                  <mui-icon-add slot="start"></mui-icon-add>
                  <mui-icon-subtract slot="end"></mui-icon-subtract>
                </mui-icon-toggle>
                <mui-body size="x-small" weight="bold" class="title" slot="body">Add / Subtract</mui-body>
                <mui-code slot="footer">
                  &lt;mui-icon-toggle rotate variant="secondary"&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;
                  <br />
                  &lt;/mui-icon-toggle&gt;
                </mui-code>
              </story-icon-grid>

              <story-icon-grid>            
                <mui-icon-toggle rotate variant="tertiary" slot="body">
                  <mui-icon-add slot="start"></mui-icon-add>
                  <mui-icon-subtract slot="end"></mui-icon-subtract>
                </mui-icon-toggle>
                <mui-body size="x-small" weight="bold" class="title" slot="body">Add / Subtract</mui-body>
                <mui-code slot="footer">
                  &lt;mui-icon-toggle rotate variant="tertiary"&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;
                  <br />
                  &lt;/mui-icon-toggle&gt;
                </mui-code>
              </story-icon-grid>

              <story-icon-grid>            
                <mui-icon-toggle rotate variant="attention" slot="body">
                  <mui-icon-add slot="start"></mui-icon-add>
                  <mui-icon-subtract slot="end"></mui-icon-subtract>
                </mui-icon-toggle>
                <mui-body size="x-small" weight="bold" class="title" slot="body">Add / Subtract</mui-body>
                <mui-code slot="footer">
                  &lt;mui-icon-toggle rotate variant="attention"&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;
                  <br />
                  &nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;
                  <br />
                  &lt;/mui-icon-toggle&gt;
                </mui-code>
              </story-icon-grid>
            </mui-grid> 
          </story-card>

        </mui-v-stack>

      </story-template>

    `;
  }
}

customElements.define("story-icon", storyIcon);
