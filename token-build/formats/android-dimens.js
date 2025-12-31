/**
 * Android Dimensions Format
 * Generates dimens.xml with proper Android dimension resources
 */
export const androidDimensFormat = {
  name: "android/dimens-custom",
  format: function({ dictionary }) {
    // Helper to format dimension value
    const formatDimenValue = (token, value) => {
      const path = token.path.join(".");

      if (value === "0" || value === 0) return "0dp";

      if (typeof value === "number") {
        if (path.includes("line-height")) return null;
        if (path.includes("font.weight")) return null;
        if (path.includes("speed")) return null;
        if (path.includes("font.size")) return `${value}sp`;
        return `${value}dp`;
      }

      if (typeof value === "string") {
        if (value.match(/^[\d.]+(?:px|dp|sp|rem|em|pt|s|ms|%)$/)) {
          if (value.endsWith("s") || value.endsWith("ms")) return null;
          if (value.endsWith("rem")) {
            const num = parseFloat(value);
            return path.includes("font.size") ? `${num * 16}sp` : `${num * 16}dp`;
          }
          if (value.endsWith("px")) {
            const num = parseFloat(value);
            return path.includes("font.size") ? `${num}sp` : `${num}dp`;
          }
          return value;
        }

        const num = parseFloat(value);
        if (!isNaN(num)) {
          if (num === 0) return "0dp";
          return path.includes("font.size") ? `${num}sp` : `${num}dp`;
        }
      }

      return `${value}dp`;
    };

    // Filter dimension tokens
    const dimensionTokens = dictionary.allTokens.filter((token) => {
      const value = token.value;

      if (token.path.includes("line-height")) return false;
      if (typeof value === "string" && (value.startsWith("#") || value === "black" || value === "white")) return false;
      if (value === "solid" || value === "outset") return false;
      if (token.path[0] === "font" && token.path[1] === "family") return false;
      if (typeof value === "number") return true;
      if (typeof value === "string") return /^[\d.]+(%|px|dp|sp|rem|em|pt)?$/.test(value.trim()) || value === "0";
      return false;
    });

    // Generate dimension resources
    const dimensions = dimensionTokens
      .map((token) => {
        const value = formatDimenValue(token, token.value);
        if (value === null) return null;
        const name =
          token.name ||
          token.path
            .join("_")
            .toLowerCase()
            .replace(/-/g, "_");
        return `    <dimen name="${name}">${value}</dimen>`;
      })
      .filter((line) => line !== null)
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Don't edit directly • Generated on ${new Date().toUTCString()} • muibook.com  
-->
<resources>
${dimensions}
</resources>
`;
  },
};
