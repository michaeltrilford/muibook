/**
 * Custom name transforms to prevent collisions
 * These preserve the full token path in the generated names
 */

export const nameKebabTransform = {
  name: "name/kebab-full-path",
  type: "name",
  transform: (token) => {
    return token.path.join("-").toLowerCase();
  },
};

export const nameCamelTransform = {
  name: "name/camel-full-path",
  type: "name",
  transform: (token) => {
    return token.path
      .map((part, index) => {
        // Remove hyphens and convert to camelCase
        part = part.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

        // Handle numeric prefixes
        if (/^\d/.test(part)) {
          part = "_" + part;
        }

        // First segment lowercase, rest uppercase
        if (index === 0) {
          return part.charAt(0).toLowerCase() + part.slice(1);
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join("");
  },
};

export const nameSnakeTransform = {
  name: "name/snake-full-path",
  type: "name",
  transform: (token) => {
    return token.path
      .join("_")
      .toLowerCase()
      .replace(/-/g, "_");
  },
};

export const namePascalTransform = {
  name: "name/pascal-full-path",
  type: "name",
  transform: (token) => {
    return token.path
      .map((part) => {
        // Remove hyphens and convert to PascalCase
        part = part.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

        // Handle numeric prefixes
        if (/^\d/.test(part)) {
          part = "_" + part;
        }

        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join("");
  },
};
