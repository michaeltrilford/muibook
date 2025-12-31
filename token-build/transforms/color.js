/**
 * Transform: OKLCH to Hex
 * Converts OKLCH color values to hex for iOS/Android platforms
 * CSS output preserves OKLCH for modern browser support
 */
export const colorTransform = {
  name: "color/oklch-to-hex",
  type: "value",
  matcher: (token) => {
    // Only match actual OKLCH color strings
    if (typeof token.value !== "string") return false;
    if (!token.value.startsWith("oklch(")) return false;

    // Additional check: should be in a color-related path
    const isColorToken =
      token.path &&
      (token.path.includes("color") ||
        token.path.includes("black") ||
        token.path.includes("white") ||
        token.path.includes("grey") ||
        token.path.includes("gray") ||
        token.path.includes("red") ||
        token.path.includes("orange") ||
        token.path.includes("yellow") ||
        token.path.includes("green") ||
        token.path.includes("blue") ||
        token.path.includes("purple") ||
        token.path.includes("pink"));

    return isColorToken;
  },
  transform: (token) => {
    // Safety check - ensure value is a string
    if (typeof token.value !== "string") {
      return token.value;
    }

    // Parse OKLCH: oklch(L% C H / A) or oklch(L% C H)
    const match = token.value.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/);

    if (!match) {
      return token.value; // Return original value if parsing fails
    }

    const [, l, c, h, a] = match;
    const lightness = parseFloat(l) / 100;
    const chroma = parseFloat(c);
    const hue = parseFloat(h);
    const alpha = a ? parseFloat(a) : 1;

    // Convert OKLCH to sRGB
    // For production, consider using a library like culori for better accuracy
    function oklchToRgb(l, c, h) {
      // Convert to OKLab first
      const hRad = (h * Math.PI) / 180;
      const a_lab = c * Math.cos(hRad);
      const b_lab = c * Math.sin(hRad);

      // OKLab to linear RGB
      const l_ = l + 0.3963377774 * a_lab + 0.2158037573 * b_lab;
      const m_ = l - 0.1055613458 * a_lab - 0.0638541728 * b_lab;
      const s_ = l - 0.0894841775 * a_lab - 1.291485548 * b_lab;

      const l3 = l_ * l_ * l_;
      const m3 = m_ * m_ * m_;
      const s3 = s_ * s_ * s_;

      let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
      let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
      let b = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

      // Gamma correction (linear RGB to sRGB)
      const gamma = (x) => {
        if (x >= 0.0031308) return 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
        return 12.92 * x;
      };

      r = Math.max(0, Math.min(1, gamma(r)));
      g = Math.max(0, Math.min(1, gamma(g)));
      b = Math.max(0, Math.min(1, gamma(b)));

      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    const [r, g, b] = oklchToRgb(lightness, chroma, hue);

    // Return hex with or without alpha
    if (alpha < 1) {
      const alphaHex = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0");
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
        .toString(16)
        .padStart(2, "0")}${alphaHex}`;
    }

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  },
};
