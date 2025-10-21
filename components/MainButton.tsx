import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import IText from "./IText";

type Props = {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  style?: object;
  buttonType?: string;
  height?: number | null;
};

export default function Button({
  title,
  onPress,
  backgroundColor,
  textColor = "#fff",
  style,
  height,
  buttonType,
}: Props) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    button: {
      height: height || 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
      flexDirection: "row",
    },
    text: {
      fontSize: 14,
      // fontFamily: "Nunito-Bold",
    },
    buttonType1: {},
    buttonType2: {
      backgroundColor: colors.background,
      // borderWidth: 1,
      // borderColor: colors.onSecondaryMedium,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: backgroundColor || colors.steamColor },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={require("@/assets/images/steam.png")}
        style={{ maxWidth: 100 }}
        resizeMode="contain"
      />
      <IText fonts="bold" size={16} color={colors.white}>
        Ашиглан нэвтрэх
      </IText>
    </TouchableOpacity>
  );
}
