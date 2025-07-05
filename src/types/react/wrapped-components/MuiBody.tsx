import React from "react";
import "@muibook/components/mui-body";

type Size = "x-small" | "small" | "medium" | "large";
type Weight = "regular" | "medium" | "bold";
type Variant = "default" | "muted" | "success" | "warning" | "error" | string;

interface MuiBodyProps extends React.HTMLAttributes<HTMLElement> {
  size?: Size;
  weight?: Weight;
  variant?: Variant;
}

const MuiBody: React.FC<MuiBodyProps> = ({ size, weight, variant, ...rest }) => (
  <mui-body
    {...rest}
    {...(size ? { size } : {})}
    {...(weight ? { weight } : {})}
    {...(variant ? { variant } : {})}
  ></mui-body>
);

export default MuiBody;
