import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import { useGlobal } from "@/context/GlobalContext";
import WebView from "react-native-webview";
import IText from "./IText";
import Button from "./MainButton";

interface SteamLoginPromptProps {
  onPress?: () => void;
  onTokenReceived?: (token: string) => void;
  message?: string;
  image?: any;
}

const SteamLoginPrompt: React.FC<SteamLoginPromptProps> = ({
  onTokenReceived,
  message = "Та өөрийн STEAM INVENTORY татан системийг ашиглахын тулд STEAM аккаунтаараа нэвтрэх шаардлагатай.",
  image = require("@/assets/images/icon.png"),
}) => {
  const { colors } = useTheme();
  const [showWebView, setShowWebView] = useState(false);
  const { user, setUser } = useGlobal();

  const handleLogin = () => {
    setShowWebView(true);
  };

  function renderContent() {
    switch (showWebView) {
      case true:
        return (
          <WebView
            source={{ uri: "http://192.168.1.2:3000/auth/steam" }}
            originWhitelist={["*"]}
            javaScriptEnabled={true} // Steam login JS хэрэгтэй
            domStorageEnabled={true} // cookie хадгалах
            startInLoadingState={true} // loading indicator
            onNavigationStateChange={(navState: any): void => {
              const { url } = navState;
              if (url.includes("/auth/steam/callback?token=")) {
                const token = url.split("token=")[1];
                console.log("JWT Token:", token);
                fetch("http://localhost:3000/auth/profile", {
                  headers: { Authorization: `Bearer ${token}` },
                })
                  .then((res) => res.json())
                  .then((profile) => {
                    const data = {
                      token: token,
                      data: profile,
                    };
                    setUser(data);
                  })
                  .catch((err) => console.error("Profile fetch error:", err));
                setShowWebView(false);
              }
            }}
          />
        );
      default:
        return (
          <View
            style={[styles.container, { backgroundColor: colors.background }]}
          >
            <Image source={image} style={styles.image} resizeMode="cover" />
            <IText
              style={styles.text}
              fonts="bold"
              color={colors.strokeSecondarySoft}
            >
              {message}
            </IText>
            <View style={styles.buttonContainer}>
              <Button buttonType="steam" onPress={handleLogin} />
            </View>
          </View>
        );
    }
  }

  return renderContent();
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  image: { height: 100, width: 100, alignSelf: "center" },
  text: { textAlign: "center", marginTop: 100 },
  buttonContainer: { marginTop: 60 },
});

export default SteamLoginPrompt;
