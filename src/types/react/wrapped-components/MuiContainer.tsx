import React from "react";
import "@muibook/components/mui-container";

type Size = "small" | "medium" | "large" | "fluid";

interface MuiContainerProps extends React.HTMLAttributes<HTMLElement> {
  size?: Size;
  center?: boolean;
}

const MuiContainer: React.FC<MuiContainerProps> = ({ size, center, ...rest }) => (
  <mui-container {...rest} {...(size ? { [size]: true } : {})} {...(center ? { center: true } : {})} />
);

export default MuiContainer;
