import { getComponentDocs } from "../../../utils/story-data";
import VisaWhite from "../../../images/networks/visa-white.svg";
import VisaBlack from "../../../images/networks/visa-black.svg";
import Mastercard from "../../../images/networks/mastercard.svg";
import Guides from "../../../images/guru/guides.svg";
import Mui from "../../../images/mui/mui.svg";
import Butter from "../../../images/mesh/buttercup.png";

import JalCrystal from "../../../images/jal/crystal.png";
import JalDiamond from "../../../images/jal/diamond.png";
import JalPremier from "../../../images/jal/premier.png";
import JalSapphire from "../../../images/jal/sapphire.png";

import Emerald from "../../../images/alliance/emerald.svg";
import Ruby from "../../../images/alliance/ruby.svg";
import Sapphire from "../../../images/alliance/sapphire.svg";

import LogoPlaceholder from "../../../images/card/image-220.png";
import BackgroundPlaceholder from "../../../images/card/image-395.png";

class storySmartCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("SmartCard");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Smart Card"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-smart-card" title="Smart Card"></story-api-types>

        <story-card canvas-background="var(--surface-recessed-100)" id="plain" title="${storyMeta["plain"].title}" description="${storyMeta["plain"].description}" usage="${storyMeta["plain"].usage}">
          <mui-v-stack alignX="center" slot="body" style="padding-top: var(--space-400); padding-bottom: var(--space-400);">
          <mui-smart-card
            type="Debit"
            number="1234"
            partner="${VisaBlack}"
            logo="${LogoPlaceholder}"
            variant="plain"
          >
          </mui-smart-card>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;number="1234"<br>
            &nbsp;&nbsp;type="Debit"<br>
            &nbsp;&nbsp;logo="./images/card/image-220.png"<br>
            &nbsp;&nbsp;partner="./images/networks/visa-black.svg"<br>
            &nbsp;&nbsp;variant="plain"<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </story-code-block>
        </story-card>

        <story-card id="plain-inverted" title="${storyMeta["plain-inverted"].title}" description="${storyMeta["plain-inverted"].description}" usage="${storyMeta["plain-inverted"].usage}">
          <mui-v-stack alignX="center" slot="body" style="padding-top: var(--space-400); padding-bottom: var(--space-400);">
          <mui-smart-card
            inverted
            type="Debit"
            number="1234"
            partner="${VisaWhite}"
            logo="${LogoPlaceholder}"
            variant="plain"
          >
          </mui-smart-card>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;inverted<br>
            &nbsp;&nbsp;number="1234"<br>
            &nbsp;&nbsp;type="Debit"<br>
            &nbsp;&nbsp;logo="./images/card/image-220.png"<br>
            &nbsp;&nbsp;partner="./images/card/visa-white.svg"<br>
            &nbsp;&nbsp;variant="plain"<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </story-code-block>
        </story-card>

        <story-card id="animated" title="${storyMeta["animated"].title}" description="${storyMeta["animated"].description}" usage="${storyMeta["animated"].usage}">
          <mui-v-stack alignX="center" slot="body" style="padding-top: var(--space-400); padding-bottom: var(--space-400);">
          <mui-smart-card
            variant="animated"
            number="1234"
            type="Debit"
            bg-image="${Butter}"
            logo="${LogoPlaceholder}"
            partner="${VisaBlack}"
          >
          </mui-smart-card>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;number="1234"<br>
            &nbsp;&nbsp;type="Debit"<br>
            &nbsp;&nbsp;bg-image="./images/mesh/buttercup.png"<br>
            &nbsp;&nbsp;logo="./images/card/image-220.png"<br>
            &nbsp;&nbsp;partner="./images/networks/visa-black.svg"<br>
            &nbsp;&nbsp;variant="animated"<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </story-code-block>
        </story-card>

        <story-card id="logo" canvas-background="var(--surface-recessed-100)" title="${storyMeta["logo"].title}" description="${storyMeta["logo"].description}" usage="${storyMeta["logo"].usage}">
          <mui-v-stack alignX="center" slot="body" style="padding-top: var(--space-400); padding-bottom: var(--space-400);">
            <mui-smart-card
              variant="plain"
              partner="${VisaBlack}"
              type="Debit"
              number="1234"
              logo="${Guides}"
              logo-height="80"
            >
            </mui-smart-card>
            <mui-smart-card
              variant="animated"
              partner="${VisaBlack}"
              type="Debit"
              number="1234"
              logo="${Guides}"
              logo-height="80"
              bg-image="${Butter}"
            >
            </mui-smart-card>
          </mui-v-stack>
            <story-code-block slot="footer" scrollable>
              /* Max-Height: 126px */<br>
              <br>
              &lt;mui-smart-card<br>
              &nbsp;&nbsp;logo="./images/guru/guides.svg"<br>
              &nbsp;&nbsp;logo-height="80"<br>
              &nbsp;&nbsp;...<br>
              &gt;&lt;/mui-smart-card&gt;
            </story-code-block>
        </story-card>

        <story-card id="frozen" canvas-background="var(--surface-recessed-100)" title="${storyMeta["frozen"].title}" description="${storyMeta["frozen"].description}" usage="${storyMeta["frozen"].usage}">
          <mui-v-stack alignX="center" slot="body" style="padding-top: var(--space-400); padding-bottom: var(--space-400);">
            <mui-smart-card
              partner="${VisaBlack}"
              number="1234"
              type="Debit"
              logo="${Mui}"
              logo-height="100"
              state="frozen"
            >
            </mui-smart-card>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;state="frozen"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </story-code-block>
        </story-card>


        <story-card id="background-image" title="${storyMeta["background-image"].title}" description="${storyMeta["background-image"].description}" usage="${storyMeta["background-image"].usage}">
          <mui-v-stack alignX="center" slot="body" style="padding-top: var(--space-400); padding-bottom: var(--space-400);">
            <mui-smart-card
              variant="plain"
              partner="${VisaBlack}"
              type="Debit"
              number="1234"
              bg-image="${BackgroundPlaceholder}"
            >
            </mui-smart-card>
            <mui-smart-card
              variant="animated"
              partner="${VisaBlack}"
              type="Debit"
              number="1234"
              bg-image="${BackgroundPlaceholder}"
            >
            </mui-smart-card>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            /* Plain */<br>
            /* ======================== */<br>
            <br>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;variant="plain"<br>
            &nbsp;&nbsp;bg-image="./images/card/image-395.png"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
            <br>
            <br>
            <br>
            /* Animated */<br>
            /* ======================== */<br>
            <br>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;variant="animated"<br>
            &nbsp;&nbsp;bg-image="./images/card/image-395.png"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </story-code-block>
        </story-card>

        <story-card id="background-color" canvas-background="var(--surface-recessed-100)" title="${storyMeta["background-color"].title}" description="${storyMeta["background-color"].description}" usage="${storyMeta["background-color"].usage}">
          <mui-v-stack alignX="center" slot="body" style="padding-top: var(--space-400); padding-bottom: var(--space-400);">
            <mui-smart-card
              variant="plain"
              partner="${VisaBlack}"
              type="Debit"
              number="1234"
              logo="${Guides}"
              logo-height="80"
              bg-color="#a4fc67"
            >
            </mui-smart-card>
            <mui-smart-card
              variant="animated"
              partner="${VisaBlack}"
              type="Debit"
              number="1234"
              logo="${Guides}"
              logo-height="80"
              bg-color="#a4fc67"
            >
            </mui-smart-card>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            /* Plain */<br>
            /* ======================== */<br>
            <br>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;variant="plain"<br>
            &nbsp;&nbsp;bg-color="#a4fc67"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
            <br>
            <br>
            <br>
            /* Animated */<br>
            /* ======================== */<br>
            <br>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;variant="animated"<br>
            &nbsp;&nbsp;bg-color="#a4fc67"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </story-code-block>
        </story-card>

        <story-card id="payment-networks" canvas-background="var(--surface-recessed-100)" title="${storyMeta["payment-networks"].title}" description="${storyMeta["payment-networks"].description}" usage="${storyMeta["payment-networks"].usage}">
          <mui-v-stack alignX="center" slot="body" style="padding-top: var(--space-400); padding-bottom: var(--space-400);">
            <mui-smart-card
              variant="plain"
              type="Debit"
              number="1234"
              logo="${Guides}"
              logo-height="80"
              bg-color="#a4fc67"
              partner="${Mastercard}"
            >
            </mui-smart-card>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;partner="./images/networks/mastercard.svg"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
            <br>
          </story-code-block>

        </story-card>


        <story-card id="reward-cards" title="${storyMeta["reward-cards"].title}" description="${storyMeta["reward-cards"].description}" usage="${storyMeta["reward-cards"].usage}">
          <mui-v-stack alignX="center" slot="body" style="padding-top: var(--space-400); padding-bottom: var(--space-400);">
          <mui-smart-card
            inverted
            variant="animated"
            partner="${Emerald}"
            type="Diamond"
            number="1234"
            bg-image="${JalDiamond}"
          >
          </mui-smart-card>
          <mui-smart-card
            variant="animated"
            partner="${Emerald}"
            type="Premier"
            number="1234"
            bg-image="${JalPremier}"
          >
          </mui-smart-card>
          <mui-smart-card
            variant="animated"
            partner="${Sapphire}"
            type="Sapphire"
            number="1234"
            bg-image="${JalSapphire}"
          >
          </mui-smart-card>
          <mui-smart-card
            variant="animated"
            partner="${Ruby}"
            type="Crystal"
            number="1234"
            bg-image="${JalCrystal}"
          >
          </mui-smart-card>
          <mui-smart-card
            inverted
            variant="plain"
            partner="${Emerald}"
            type="Diamond"
            number="1234"
            bg-image="${JalDiamond}"
          >
          </mui-smart-card>
          <mui-smart-card
            variant="plain"
            partner="${Emerald}"
            type="Premier"
            number="1234"
            bg-image="${JalPremier}"
          >
          </mui-smart-card>
          <mui-smart-card
            variant="plain"
            partner="${Sapphire}"
            type="Sapphire"
            number="1234"
            bg-image="${JalSapphire}"
          >
          </mui-smart-card>
          <mui-smart-card
            variant="plain"
            partner="${Ruby}"
            type="Crystal"
            number="1234"
            bg-image="${JalCrystal}"
          >
          </mui-smart-card>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            /* Diamond */<br>
            /* ======================== */<br>
            <br>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;inverted<br>
            &nbsp;&nbsp;type="Diamond"<br>
            &nbsp;&nbsp;partner="${Emerald}"<br>
            &nbsp;&nbsp;bg-image="./images/jal/diamond.png"<br>
            &nbsp;&nbsp;...<br>
            &gt;
            <br>
            &lt;/mui-smart-card&gt;
            <br>
            <br>
            <br>
            /* Premier */<br>
            /* ======================== */<br>
            <br>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;type="Premier"<br>
            &nbsp;&nbsp;partner="${Emerald}"<br>
            &nbsp;&nbsp;bg-image="./images/jal/premier.png"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
            <br>
            <br>
            <br>
            /* Sapphire */<br>
            /* ======================== */<br>
            <br>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;type="Sapphire"<br>
            &nbsp;&nbsp;partner="${Sapphire}"<br>
            &nbsp;&nbsp;bg-image="./images/jal/sapphire.png"<br>
            &nbsp;&nbsp;...<br>
            &gt;
            <br>
            &lt;/mui-smart-card&gt;
            <br>
            <br>
            <br>
            /* Crystal */<br>
            /* ======================== */<br>
            <br>
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;type="Crystal"<br>
            &nbsp;&nbsp;partner="${Ruby}"<br>
            &nbsp;&nbsp;bg-image="./images/jal/crystal.png"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
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

        imports='["@muibook/components/mui-smart-card"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-smart-card", storySmartCard);
