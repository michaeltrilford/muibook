import React from "react";

declare global {
  namespace JSX {
    type MuiIconSize = "x-small" | "small" | "medium" | "large";

    interface MuiIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
      size?: MuiIconSize;
      color?: string;
      slot?: "on-icon" | "off-icon";
    }

    interface IntrinsicElements {
      // INPUTS
      "mui-addon": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      "mui-field": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: "default" | "success" | "warning" | "error" | string;
        label?: string;
        "hide-label"?: boolean;
        message?: string;
      };

      "mui-file-upload": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        acceptedFileTypes?: string;
        currentFileName?: string;
      };

      "mui-input": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: "default" | "success" | "warning" | "error" | string;
        type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url" | "date" | "time" | string;
        id?: string;
        label: string;
        "hide-label"?: boolean;
        disabled?: boolean;
        name?: string;
        value?: string;
        placeholder?: string;
      };

      "mui-select": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        options: string;
        id?: string;
        label: string;
        "hide-label"?: boolean;
        disabled?: boolean;
        name?: string;
        value?: string;
      };

      "mui-switch": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label: string;
        disabled?: boolean;
        checked?: boolean;
      };

      // CONTENT
      "mui-body": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        size?: "x-small" | "small" | "medium" | "large";
        weight?: "regular" | "medium" | "bold";
        variant?: "default" | "muted" | "success" | "warning" | "error" | string;
        class?: string;
      };

      "mui-cell": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        heading?: boolean;
        action?: boolean;
        checkbox?: boolean;
        class?: string;
      };

      "mui-code": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        size?: "x-small" | "small" | "medium" | "large" | string;
      };

      "mui-heading": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        size?: string;
        level?: string;
        style?: React.CSSProperties & { [key: `--${string}`]: string | undefined };
      };

      "mui-image": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      "mui-list": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        as?: "ul" | "ol" | string;
        style?: string;
        class?: string;
      };

      "mui-list-item": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        size?: "x-small" | "small" | "medium" | "large" | string;
        weight?: "regular" | "medium" | "bold" | string;
      };

      "mui-message": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        heading: string;
        icon?: string;
        variant?: "neutral" | "positive" | "info" | "warning" | "attention" | string;
        style?: string;
        class?: string;
      };

      "mui-quote": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      "mui-smart-card": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        number: number;
        state?: "frozen" | string;
        logo?: string;
        "logo-height"?: number | "auto";
        variant?: "plain" | "animated" | string;
        partner?: string;
        type?: string;
        "bg-color"?: string;
        "bg-image"?: string;
        inverted?: boolean;
      };

      // LAYOUT
      "mui-accordion-block": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        heading: string;
        size?: "small" | "medium" | "large" | string;
        "detail-space"?: "none";
        class?: string;
      };

      "mui-accordion-group": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        exclusive?: boolean;
      };

      "mui-accordion-inline": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        heading: string;
        level?: string | number;
      };

      "mui-card": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "mui-card-body": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        condensed?: boolean;
      };
      "mui-card-footer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "mui-card-header": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      "mui-container": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        small?: boolean;
        medium?: boolean;
        large?: boolean;
        fluid?: boolean;
        center?: boolean;
      };

      "mui-grid": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        col?: string | number;
        space?: string;
        slot?: string;
        style?: React.CSSProperties;
        class?: string;
      };

      "mui-v-stack": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        space?: string;
        alignX?: "start" | "center" | "end" | "normal" | string;
        alignY?: "start" | "center" | "end" | "normal" | string;
        slot?: string;
        style?: React.CSSProperties;
        class?: string;
      };

      "mui-h-stack": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        space?: string;
        alignX?: "start" | "center" | "end" | "normal" | string;
        alignY?: "start" | "center" | "end" | "normal" | string;
        slot?: string;
        style?: React.CSSProperties;
        class?: string;
      };

      "mui-responsive": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        breakpoint?: number;
        "breakpoint-low"?: number;
        "breakpoint-high"?: number;
      };

      "mui-rule": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        direction?: "horizontal" | "vertical";
        length?: string;
        weight?: string;
      };

      "mui-row": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        columns?: string;
      };

      "mui-row-group": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      "mui-slat": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        slot?: "start" | "end";
        variant?: "default" | "header" | "row" | "action";
        col?: string;
        space?: string;
      };

      // ACTIONS
      "mui-button": React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
        slot?: string;
        variant?: "primary" | "secondary" | "tertiary" | "attention" | string;
        class?: string;
        part?: string;
        style?: React.CSSProperties & { [key: `--${string}`]: string | undefined };
      };

      "mui-link": React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
        slot?: string;
        size?: MuiIconSize | string;
        variant?: "primary" | "secondary" | "tertiary" | "attention" | string;
        style?: React.CSSProperties & { [key: `--${string}`]: string | undefined };
        class?: string;
        part?: string;
      };

      // TABS
      "mui-tab-controller": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      "mui-tab-panel": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        item: string;
      };

      "mui-tab-item": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon?: string;
        active?: boolean;
        id?: string;
      };

      "mui-tab-bar": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        speed?: string;
        controlsPosition?: "top" | "right" | "bottom" | "left" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
      };

      // CAROUSEL
      "mui-carousel-controller": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      "mui-carousel-panel": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        item?: string;
        slot?: "item" | string;
      };

      // FEEDBACK
      "mui-alert": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: "default" | "success" | "warning" | "error";
        style?: string;
        class?: string;
      };

      "mui-badge": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: "neutral" | "positive" | "warning" | "attention" | string;
        style?: string;
        class?: string;
      };

      // ICONS
      "mui-icon-accessibility": MuiIconProps;
      "mui-icon-add": MuiIconProps;
      "mui-icon-attention": MuiIconProps;
      "mui-icon-check": MuiIconProps;
      "mui-icon-close": MuiIconProps;
      "mui-icon-down-chevron": MuiIconProps;
      "mui-icon-globe": MuiIconProps;
      "mui-icon-grid": MuiIconProps;
      "mui-icon-info": MuiIconProps;
      "mui-icon-left-arrow": MuiIconProps;
      "mui-icon-left-chevron": MuiIconProps;
      "mui-icon-left-sidebar": MuiIconProps;
      "mui-icon-menu": MuiIconProps;
      "mui-icon-message": MuiIconProps;
      "mui-icon-right-chevron": MuiIconProps;
      "mui-icon-stop": MuiIconProps;
      "mui-icon-subtract": MuiIconProps;
      "mui-icon-moon": MuiIconProps;
      "mui-icon-sun": MuiIconProps;
      "mui-icon-up-arrow": MuiIconProps;
      "mui-icon-up-chevron": MuiIconProps;
      "mui-icon-warning": MuiIconProps;
      "mui-icon-ellipsis": MuiIconProps;

      // ADD LOCAL TYPES
      // E.g. 
      // "dark-mode-toggle": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}