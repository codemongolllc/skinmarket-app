// components/Header.tsx
import { IconLib, IText } from "@/components";
import { useGlobal } from "@/context/GlobalContext";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  type?: any;
  end?: any;
  onBackPress?: any;
};

export default function Header({
  title,
  showBack = false,
  type,
  end,
  onBackPress,
}: HeaderProps) {
  const { user, theme, setTheme } = useGlobal();
  const router = useRouter();
  const { colors } = useTheme();
  const [gameType, setGameType] = useState("cs");
  const styles = StyleSheet.create({
    container: {
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      justifyContent: "space-between",
    },
    back: { marginRight: 10 },
    title: { fontSize: 16, color: colors.dark },
  });

  function renderHeader() {
    switch (type) {
      case "home":
        return (
          <>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <TouchableOpacity
                style={{ height: 30, width: 30, borderRadius: 10 }}
                onPress={() => {
                  setGameType(gameType === "cs" ? "dota" : "cs");
                }}
              >
                {gameType ? (
                  <Image
                    source={require("@/assets/images/csIcon.png")}
                    style={{ width: "100%", height: "100%", borderRadius: 2 }}
                  />
                ) : (
                  <Image
                    source={require("@/assets/images/dotaIcon.png")}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </TouchableOpacity>
              <IText fonts="bold" size={18} color={colors.white}>
                {title}
              </IText>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <IconLib
                name="ShoppingCart"
                variant="Outline"
                color={colors.white}
              />
              <IconLib
                name="SearchNormal1"
                variant="Outline"
                color={colors.white}
              />
            </View>
          </>
        );
      case "profile":
        return (
          <>
            <IText
              style={{ fontSize: 18, textAlign: "center" }}
              fonts="bold"
              color={colors.white}
            >
              {title || "___"}
            </IText>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <IconLib
                name="ShoppingCart"
                variant="Outline"
                color={colors.white}
              />
            </View>
          </>
        );
      case "login":
        return (
          <>
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 10 }}
              onPress={onBackPress}
            >
              <IconLib
                name="ArrowLeft"
                variant="Outline"
                color={colors.white}
              />
            </TouchableOpacity>
            <IText
              style={{ fontSize: 18, textAlign: "center" }}
              fonts="bold"
              color={colors.white}
            >
              {title || "___"}
            </IText>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <IconLib name="Refresh" variant="Outline" color={colors.white} />
            </View>
          </>
        );
      default:
        return (
          <>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={{ height: 30, width: 30, borderRadius: 10 }}
                onPress={() => {
                  setGameType(gameType === "cs" ? "dota" : "cs");
                }}
              >
                {gameType ? (
                  <Image
                    source={require("@/assets/images/csIcon.png")}
                    style={{ width: "100%", height: "100%", borderRadius: 2 }}
                  />
                ) : (
                  <Image
                    source={require("@/assets/images/dotaIcon.png")}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </TouchableOpacity>
              <IconLib
                name="FilterSearch"
                variant="Outline"
                color={colors.background}
              />
            </View>
            <IText fonts="bold" size={18} color={colors.white}>
              {title}
            </IText>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <IconLib
                name="SearchNormal"
                variant="Outline"
                color={colors.white}
              />
              <IconLib
                name="FilterSearch"
                variant="Outline"
                color={colors.white}
              />
            </View>
          </>
        );
    }
  }

  return <View style={styles.container}>{renderHeader()}</View>;
}
