# Muibook Design Tokens

Design tokens for Muibook: web, JS/TS, iOS, Android.

## Install

```bash
npm install @your-org/muibook-tokens
```

```bash
public/css/mui-brand.css       # Web CSS vars (npm)
src/tokens/css/mui-brand.css   # Web CSS vars (source)
src/tokens/js/mui-brand.ts     # JS/TS objects
src/tokens/ios/mui-brand.swift # iOS
src/tokens/android/colors.xml  # Android colors
src/tokens/android/dimens.xml  # Android dimensions
```

# Usage

## Web

```html
<link rel="stylesheet" href="public/css/mui-brand.css" />
```

## JS (Typescript)

```ts
import { font, lineHeight } from "src/tokens/js/mui-brand";
console.log(font.size[100].value);
```

## iOS

```swift
import MuibookTokens
let primaryFont = Font.size100
```

## Android

```xml
<color name="primary_black">@color/black</color>
```

### Notes:

- JS/TS tokens are plain objects, usable anywhere.
- CSS in public/ for npm.
- iOS/Android for native projects.
