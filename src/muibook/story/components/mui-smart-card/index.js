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
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "number",
        required: true,
        type: "number",
        options: "",
        default: "(required)",
        description: "Only the last 4 digits are shown (no full card number for security)",
      },
      {
        name: "state",
        type: "string",
        options: "frozen",
        default: "",
        description: "",
      },
      {
        name: "logo",
        type: "string",
        options: "./path/to/image.png",
        default: "",
        description: "Add a logo to the card",
      },
      {
        name: "logo-height",
        type: "number",
        options: "0-126",
        default: "auto",
        description: "Define the height of the logo without a unit of measure",
      },
      {
        name: "variant",
        type: "string",
        options: "plain, animated",
        default: "",
        description: "",
      },
      {
        name: "partner",
        type: "string",
        options: "logo.svg",
        default: "",
        description: "Partner logo",
      },
      {
        name: "type",
        type: "string",
        options: "Debit, Credit, etc...",
        default: "",
        description: "Used to visually or semantically describe the card’s usage.",
      },
      {
        name: "bg-color",
        type: "CSS",
        options: "Valid CSS",
        default: "",
        description: "Add a color code to the background",
      },
      {
        name: "bg-image",
        type: "string",
        options: "./path/to/image.png",
        default: "",
        description: "Add a logo to the card",
      },
      {
        name: "inverted",
        type: "boolean",
        options: "",
        default: "",
        description: "Toggle the text colour for darker backgrounds",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            ${prop.required ? "required" : ""}
            name="${prop.name}"
            type="${prop.type}" 
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";

        return /*html*/ `
          <mui-accordion-block 
            size="medium" 
            heading=${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)} 
            ${isLastChild}>
            <story-type-slat
              slot="detail"
              ${prop.required ? "required" : ""}
              name="${prop.name}"
              type="${prop.type}" 
              options="${prop.options || ""}"
              default="${prop.default || ""}"
              description="${prop.description}">
            </story-type-slat>
          </mui-accordion-block>
        `;
      })
      .join("");

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template title="Smart Card" 
        description="A dynamic card component for wallets, dashboards, spend tools, or reward programs—designed to represent digital or physical cards in modern, digital-first experiences."
        figma="" 
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-smart-card/index.ts"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-smart-card";<br>
          </mui-code>
        </spec-card>


        <spec-card title="Props">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card title="Plain">
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
          <mui-code slot="footer">
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;number="1234"<br>
            &nbsp;&nbsp;type="Debit"<br>
            &nbsp;&nbsp;logo="./images/card/image-220.png"<br>
            &nbsp;&nbsp;partner="./images/networks/visa-black.svg"<br>
            &nbsp;&nbsp;variant="plain"<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </mui-code>
        </story-card>

        <story-card title="Plain / Inverted">
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
          <mui-code slot="footer">
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;inverted<br>
            &nbsp;&nbsp;number="1234"<br>
            &nbsp;&nbsp;type="Debit"<br>
            &nbsp;&nbsp;logo="./images/card/image-220.png"<br>
            &nbsp;&nbsp;partner="./images/card/visa-white.svg"<br>
            &nbsp;&nbsp;variant="plain"<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </mui-code>
        </story-card>

        <story-card title="Animated">
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
          <mui-code slot="footer">
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;number="1234"<br>
            &nbsp;&nbsp;type="Debit"<br>
            &nbsp;&nbsp;bg-image="./images/mesh/buttercup.png"<br>
            &nbsp;&nbsp;logo="./images/card/image-220.png"<br>
            &nbsp;&nbsp;partner="./images/networks/visa-black.svg"<br>
            &nbsp;&nbsp;variant="animated"<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Logo" 
          description="The logo area, positioned at the top-right of the card, has a maximum size of 220×126px and scales down responsively on smaller devices." 
          usage="
            Import the logo using the logo property; 
            Set the logo-height to an appropriate size no larger than 126px; 
            If your SVG is at intended height, then logo-height isn't required; 
            When using a 2x/3x PNGs and resize with logo-height
          ">
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
            <mui-code slot="footer">
              /* Max-Height: 126px */<br>
              <br>
              &lt;mui-smart-card<br>
              &nbsp;&nbsp;logo="./images/guru/guides.svg"<br>
              &nbsp;&nbsp;logo-height="80"<br>
              &nbsp;&nbsp;...<br>
              &gt;&lt;/mui-smart-card&gt;
            </mui-code>
        </story-card>

        <story-card title="Frozen">
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
          <mui-code slot="footer">
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;state="frozen"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
          </mui-code>
        </story-card>


        <story-card title="Background-Image" description="Add a unique background image or an alternative to logo placement">
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
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card title="Background-Color">
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
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card title="Payment Networks" description="Use the partner prop to slot in other payment networks">
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
          <mui-code slot="footer">
            &lt;mui-smart-card<br>
            &nbsp;&nbsp;partner="./images/networks/mastercard.svg"<br>
            &nbsp;&nbsp;...<br>
            &gt;<br>
            &lt;/mui-smart-card&gt;
            <br>
          </mui-code>

        </story-card>


        <story-card title="Reward Cards" description="Utilising the provided props to create bespoke digital cards.">
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
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-smart-card", storySmartCard);
