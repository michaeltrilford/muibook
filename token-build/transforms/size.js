/**
 * Transform: px/rem to CGFloat
 * Converts pixel and rem values to numbers for iOS/native platforms
 */
export const sizeTransform = {
  name: "size/px-to-cgfloat",
  type: "value",
  matcher: (token) => {
    // Check if token path includes 'radius' or 'space'
    return token.path && (token.path.includes("radius") || token.path.includes("space"));
  },
  transform: (token) => {
    if (typeof token.value === "string" && token.value.includes("px")) {
      return parseFloat(token.value.replace("px", ""));
    }
    // Handle rem values if needed
    if (typeof token.value === "string" && token.value.includes("rem")) {
      return parseFloat(token.value.replace("rem", "")) * 16; // Convert rem to px
    }
    return parseFloat(token.value) || token.value;
  },
};
