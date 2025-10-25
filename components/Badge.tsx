import { IText } from "@/components"; // өөрийн IText component замыг тохируул
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export type BadgeProps = {
  title: string;
  type?: "error" | "success" | "warning" | "info";
  style?: StyleProp<ViewStyle>;
};

const Badge: React.FC<BadgeProps> = ({ title, type = "info", style }) => {
  const { colors } = useTheme();
  const backgroundColor =
    type === "error"
      ? colors.error
      : type === "success"
      ? colors.success
      : type === "warning"
      ? colors.warning
      : colors.primary; // info default

  return (
    <View
      style={[
        {
          position: "absolute",
          top: 8,
          right: 8,
          paddingVertical: 4,
          paddingHorizontal: 8,
          backgroundColor,
          borderRadius: 6,
        },
        style,
      ]}
    >
      <IText color="#fff" fonts="regular" size={12}>
        +{title}
      </IText>
    </View>
  );
};

export default Badge;
