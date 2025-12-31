/**
 * Android Colors Format
 * Generates colors.xml with proper Android color resources
 */
export const androidColorsFormat = {
  name: "android/colors-custom",
  format: function({ dictionary }) {
    // Filter only color tokens
    const colorTokens = dictionary.allTokens.filter((token) => {
      const value = token.value;

      // Check if it's a color token by value
      const isColor = typeof value === "string" && (value.startsWith("#") || value === "black" || value === "white");

      return isColor;
    });

    // Helper to format color value
    const formatColorValue = (value) => {
      if (value === "black") return "#FF000000";
      if (value === "white") return "#FFFFFFFF";

      // Ensure hex has alpha channel
      if (value.startsWith("#")) {
        // Remove # temporarily
        let hex = value.substring(1).toUpperCase();

        if (hex.length === 6) {
          // RGB -> ARGB (add FF for full opacity)
          return `#FF${hex}`;
        } else if (hex.length === 8) {
          // RGBA -> ARGB (move alpha to front)
          const rgb = hex.substring(0, 6);
          const alpha = hex.substring(6, 8);
          return `#${alpha}${rgb}`;
        }
      }
      return value;
    };

    // Generate color resources using token.name (set by name transform)
    const colors = colorTokens
      .map((token) => {
        // Use the name set by the transform, or fall back to path
        const name =
          token.name ||
          token.path
            .join("_")
            .toLowerCase()
            .replace(/-/g, "_");
        const value = formatColorValue(token.value);
        return `    <color name="${name}">${value}</color>`;
      })
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Don't edit directly • Generated on ${new Date().toUTCString()} • muibook.com
-->
<resources>
${colors}
</resources>
`;
  },
};
