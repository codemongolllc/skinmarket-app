import { useGlobal } from "@/context/GlobalContext";
import React from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const { user, setUser } = useGlobal();

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>{user.data.username}</Text>
      <Text>{user.data.steamId}</Text>
    </View>
  );
}
