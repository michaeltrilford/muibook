// Shared types for component documentation
// UX guideline documentation is stored in each component's Doc.ts file.
// We include generic content that supports the Muibook storefront.

export interface VariantItem {
  key: string;
  title: string;
  description: string;
  image?: string;
}

export interface CompositionItem {
  key: string;
  name: string;
  description: string;
  image?: string;
}

export interface RuleItem {
  description?: string;
  image?: string;
}

export interface ComponentDoc {
  title?: string;
  hero?: string[];
  figma?: string[];
  github?: string[];
  guides?: string[];
  storybook?: string[];
  website?: string[];
  description: string;

  usage?: {
    list: string[];
  };

  accessibility?: {
    designerList?: string[];
    engineerList?: string[];
  };

  anatomy?: {
    description?: string;
    image?: string;
    list: string[];
  };

  variants?: {
    description?: string;
    items: VariantItem[];
  };

  compositions?: {
    description?: string;
    items: CompositionItem[];
  };

  related?: {
    items: { name: string; link: string }[];
  };

  rules?: {
    heading: string;
    description: string;
    doContent?: RuleItem[];
    dontContent?: RuleItem[];
  }[];

  behaviour?: {
    image?: string;
    description?: string;
    list: string[];
  };

  writing?: {
    list: string[];
  };
}

export type MuiDocs = Record<string, ComponentDoc>;
