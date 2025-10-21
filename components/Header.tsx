// components/Header.tsx
import { IconLib, IText } from "@/components";
import { useGlobal } from "@/context/GlobalContext";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { Notification } from "iconsax-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  type?: any;
  end?: any;
};

export default function Header({
  title,
  showBack = false,
  type,
  end,
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
      case "profile":
        return (
          <>
            <View style={{ flexDirection: "column" }}>
              <IText style={{ fontSize: 18 }} fonts="bold">
                Сайн байна уу,
              </IText>
              <IText style={{ fontSize: 24 }} fonts="bold">
                {user?.username || "___"}
              </IText>
            </View>
            <TouchableOpacity
              onPress={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              style={styles.back}
            >
              <Notification size="24" color={colors.dark} />
            </TouchableOpacity>
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
