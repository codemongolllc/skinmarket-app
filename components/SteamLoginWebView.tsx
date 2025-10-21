import React, { useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

interface SteamLoginWebViewProps {
  onTokenReceived: (token: string) => void;
}

export default function SteamLoginWebView({
  onTokenReceived,
}: SteamLoginWebViewProps) {
  const [loading, setLoading] = useState(true);

  return <View style={{ flex: 1 }}></View>;
}
