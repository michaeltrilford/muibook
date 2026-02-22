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

## React helper: controlled `mui-input`

When using `mui-input` in React, prefer the custom event payload (`event.detail.value`) and split attribute updates to avoid focus loss.

### Why

- `mui-input` is a web component and dispatches `input`/`change` events with `detail.value`.
- Re-applying structural attributes (`label`, `type`, `placeholder`, `variant`) on every keystroke can trigger re-renders and blur the field.

### Recommended pattern

```tsx
import React, { useEffect, useRef } from 'react';
import '@muibook/components';

type MuiInputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  value?: string;
  onValueChange?: (value: string) => void;
};

export function MuiInputReactHelper({
  label,
  placeholder,
  type = 'text',
  variant = 'default',
  value,
  onValueChange,
}: MuiInputProps) {
  const elRef = useRef<HTMLElement>(null);

  // 1) Static attrs only (do not include `value` here)
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (label !== undefined) el.setAttribute('label', label);
    if (placeholder !== undefined) el.setAttribute('placeholder', placeholder);
    el.setAttribute('type', type);
    el.setAttribute('variant', variant);
  }, [label, placeholder, type, variant]);

  // 2) Value-only sync
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (value !== undefined && value !== '') el.setAttribute('value', value);
    else el.removeAttribute('value');
  }, [value]);

  // 3) Read value from custom event detail first
  useEffect(() => {
    const el = elRef.current;
    if (!el || !onValueChange) return;

    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ value?: string }>;
      if (custom.detail?.value !== undefined) {
        onValueChange(String(custom.detail.value));
      }
    };

    el.addEventListener('input', handler);
    return () => el.removeEventListener('input', handler);
  }, [onValueChange]);

  // @ts-expect-error custom element
  return <mui-input ref={elRef} />;
}
```

### Common pitfall

If typing causes blur on every key, check that:

- You are **not** re-applying structural attributes in the same effect as `value`.
- You are consuming `event.detail.value` from Muibook events.
