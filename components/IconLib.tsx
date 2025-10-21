import * as Iconsax from "iconsax-react-nativejs";
import React from "react";
import { OpaqueColorValue } from "react-native";

type IconProps = {
  name: keyof typeof Iconsax;
  size?: number;
  color?: string | OpaqueColorValue;
  variant?: "Bulk" | "Linear" | "Outline" | "Broken" | "Bold" | "TwoTone";
};

const IconLib: React.FC<IconProps> = ({
  name,
  size = 28,
  color = "black",
  variant,
}) => {
  const IconComponent = Iconsax[name];
  if (!IconComponent) return null;
  return (
    <IconComponent
      size={size}
      color={typeof color === "string" ? color : undefined}
      variant={variant}
    />
  );
};

export default IconLib;
