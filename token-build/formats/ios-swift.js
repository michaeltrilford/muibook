/**
 * iOS Swift Format
 * Generates a Swift class with design tokens as static properties
 */
export const iosSwiftFormat = {
  name: "ios-swift/class-custom",
  format: function({ dictionary, file, options }) {
    const className = options.className || "StyleDictionary";

    // Helper to convert hex to Swift UIColor
    const hexToSwiftColor = (hex) => {
      hex = hex.replace("#", "");
      let r,
        g,
        b,
        a = 1;

      if (hex.length === 8) {
        // RGBA
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        a = parseInt(hex.substring(6, 8), 16);
      } else if (hex.length === 6) {
        // RGB
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else {
        return `UIColor.gray`;
      }

      const rNorm = (r / 255).toFixed(3);
      const gNorm = (g / 255).toFixed(3);
      const bNorm = (b / 255).toFixed(3);
      const aNorm = hex.length === 8 ? (a / 255).toFixed(3) : "1.0";

      return `UIColor(red: ${rNorm}, green: ${gNorm}, blue: ${bNorm}, alpha: ${aNorm})`;
    };

    // Helper to format value based on type
    const formatValue = (token) => {
      const value = token.value;
      const path = token.path.join(".");

      // Skip font family - not usable in iOS
      if (path.includes("font.family")) {
        return null;
      }

      // Skip CSS-specific values
      if (value === "solid" || value === "outset") {
        return null;
      }

      // Check if it's a color (hex string)
      if (typeof value === "string" && value.startsWith("#")) {
        return hexToSwiftColor(value);
      }

      // Convert string "0" to CGFloat
      if (value === "0" || value === 0) {
        return "CGFloat(0)";
      }

      // Check if it's a number
      if (typeof value === "number") {
        // Font weights should use UIFont.Weight
        if (path.includes("font.weight")) {
          // Map to standard UIFont.Weight values
          if (value === 400) return "UIFont.Weight.regular";
          if (value === 500) return "UIFont.Weight.medium";
          if (value === 600) return "UIFont.Weight.semibold";
          if (value === 700) return "UIFont.Weight.bold";
          // Fallback to raw value
          return `UIFont.Weight(rawValue: ${value})`;
        }

        if (path.includes("font.size")) {
          return `CGFloat(${value})`;
        }

        // Speed/duration values should be TimeInterval
        if (path.includes("speed")) {
          return `TimeInterval(${value})`;
        }

        // Line height multiplier (UIKit uses this via paragraphStyle.lineHeightMultiple)
        if (path.includes("line-height")) {
          return `CGFloat(${Number(value.toFixed(3))})`;
        }

        // Other numeric values (spacing, radius, stroke) should be CGFloat
        return `CGFloat(${value})`;
      }

      // Check if it's a string
      if (typeof value === "string") {
        // Check for special keywords
        if (value === "black") return "UIColor.black";
        if (value === "white") return "UIColor.white";

        // Try to parse as number if it looks like one
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && value.trim() === numValue.toString()) {
          return `CGFloat(${numValue})`;
        }

        // Escape quotes in strings for Swift
        const escapedValue = value.replace(/"/g, '\\"');
        return `"${escapedValue}"`;
      }

      return `"${value}"`;
    };

    // Generate properties using token.name (set by name transform)
    const properties = dictionary.allTokens
      .map((token) => {
        const value = formatValue(token);

        // Skip tokens that return null (filtered out)
        if (value === null) {
          return null;
        }

        // Use the name set by the transform, or fall back to manual generation
        const name =
          token.name ||
          token.path
            .map((part, index) => {
              part = part.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
              if (/^\d/.test(part)) part = "_" + part;
              if (index === 0) {
                return part.charAt(0).toLowerCase() + part.slice(1);
              }
              return part.charAt(0).toUpperCase() + part.slice(1);
            })
            .join("");

        return `    public static let ${name} = ${value}`;
      })
      .filter((line) => line !== null)
      .join("\n");

    return `//
// ${file.destination}
//

// Don't edit directly • Generated on ${new Date().toUTCString()} • muibook.com

import UIKit

public class ${className} {
${properties}
}
`;
  },
};
