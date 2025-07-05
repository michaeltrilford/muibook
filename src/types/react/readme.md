# mui-react-elements.d.ts

This file provides TypeScript typings for Muibook Web Components when used in React projects.

## Why this file exists

Muibook components are custom elements (web components) that can be used directly in React. However, React’s TypeScript support doesn’t natively recognize these custom tags. This typings file adds the necessary JSX declarations to enable full type support, autocomplete, and error checking for Muibook components in React.

### How to use

- Copy or reference this file in your React project to enable typing for Muibook components.
- Place it somewhere TypeScript can find it (e.g., inside your src/types folder or configure the typeRoots in your tsconfig.json).
- Import React as usual; this file extends the global JSX namespace to include Muibook elements.

### Important

- This file is intended as a baseline or starting point and may not include every prop or component variant.
- It is designed to help with developer experience but is not a runtime library — Muibook web components must still be imported and registered in your project separately.
