import StyleDictionary from "style-dictionary";
import { readFileSync } from "fs";
import { sizeTransform } from "./transforms/size.js";
import { colorTransform } from "./transforms/color.js";
import { iosSwiftFormat } from "./formats/ios-swift.js";
import { cssCustomFormat } from "./formats/css-custom.js";
import { androidColorsFormat } from "./formats/android-colors.js";
import { androidDimensFormat } from "./formats/android-dimens.js";
import { nameKebabTransform, nameCamelTransform, nameSnakeTransform, namePascalTransform } from "./transforms/name.js";

// Register transforms
StyleDictionary.registerTransform(sizeTransform);
StyleDictionary.registerTransform(colorTransform);

// Register name transforms
StyleDictionary.registerTransform(nameKebabTransform);
StyleDictionary.registerTransform(nameCamelTransform);
StyleDictionary.registerTransform(nameSnakeTransform);
StyleDictionary.registerTransform(namePascalTransform);

// Register custom transform groups with name transforms
StyleDictionary.registerTransformGroup({
  name: "ios/custom",
  transforms: ["name/camel-full-path", "color/oklch-to-hex", "size/px-to-cgfloat"],
});

StyleDictionary.registerTransformGroup({
  name: "android/custom",
  transforms: ["name/snake-full-path", "color/oklch-to-hex", "size/px-to-cgfloat"],
});

// Register formats
StyleDictionary.registerFormat(iosSwiftFormat);
StyleDictionary.registerFormat(cssCustomFormat);
StyleDictionary.registerFormat(androidColorsFormat);
StyleDictionary.registerFormat(androidDimensFormat);

// List of brands to build
const brands = ["mui", "jal", "ana", "modern", "sensei"];

console.log("🚀 Building all brand tokens...\n");

let successCount = 0;
let failCount = 0;

brands.forEach((brand) => {
  const configPath = `./token-build/${brand}.json`;

  try {
    console.log(`📦 Building ${brand}...`);

    // Read and parse the config file
    const configFile = readFileSync(configPath, "utf8");
    const config = JSON.parse(configFile);

    // Enable verbose logging to see collision details
    config.log = {
      verbosity: "verbose",
      warnings: "warn", // Show warnings
      errors: "error",
    };

    // Create Style Dictionary instance with the config object
    const sd = new StyleDictionary(config);

    // Build all platforms
    sd.buildAllPlatforms();

    console.log(`✅ ${brand} complete\n`);
    successCount++;
  } catch (error) {
    console.error(`❌ Error building ${brand}:`, error.message);
    console.error(error.stack);
    failCount++;
  }
});

console.log("━".repeat(50));
console.log(`📊 Build Summary: ${successCount} succeeded, ${failCount} failed`);

if (failCount > 0) {
  console.log("⚠️  Some builds failed");
  process.exit(1);
} else {
  console.log("🎉 All brands built successfully!");
}
