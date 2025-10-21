// import axios from "axios";
// import * as Linking from "expo-linking";
// import * as WebBrowser from "expo-web-browser";
// import React, { useState } from "react";
// import { Button, FlatList, Image, Text, View } from "react-native";
// const SteamLoginButton = () => {
//   const [profile, setProfile] = useState<any>();
//   const [token, setToken] = useState<any>();
//   const [inventory, setInventory] = useState<any[]>([]); // Inventory state

//   const fetchProfile = async (authToken: string) => {
//     if (!authToken) return;

//     try {
//       const response = await axios.get("http://localhost:3000/auth/profile", {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       setProfile(response.data);
//       fetchInventory(response.data.steamId);
//     } catch (err) {
//       console.log("Profile fetch error:", err);
//     }
//   };
//   const fetchInventory = async (steamId: string) => {
//     try {
//       const appId = 730;
//       const contextId = 2;
//       const res = await axios.get(
//         `https://steamcommunity.com/inventory/${steamId}/${appId}/${contextId}`
//       );

//       if (res.data.success) {
//         console.log("Inventory is public", res.data);
//         setInventory(res.data.descriptions || []);
//       } else {
//         console.log("Inventory is private or unavailable", res.data);
//         setInventory([]);
//       }
//     } catch (err) {
//       console.log("Inventory fetch error:", err);
//     }
//   };
//   const steamLogin = async () => {
//     const redirectUrl = Linking.createURL("/auth/steam/callback");
//     const authUrl = `http://localhost:3000/auth/steam`;

//     const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl, {
//       presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
//       enableBarCollapsing: true,
//     });

//     if (result.type === "success") {
//       const tokenParam = result.url.split("token=")[1];
//       if (tokenParam) {
//         setToken(tokenParam);
//         fetchProfile(tokenParam);
//         console.log("JWT Token:", tokenParam);
//       }
//     } else {
//       console.log("Login canceled or failed:", result.type);
//     }
//   };

//   // if (!profile) return <Text>Loading...</Text>;
//   console.log(profile);

//   return (
//     <View style={{ alignItems: "center", flex: 1 }}>
//       <View style={{ height: 100 }} />
//       <Button title="Login with Steam" onPress={steamLogin} />

//       <Text>SteamID: {profile?.steamId}</Text>
//       <Text>Display Name: {profile?.username}</Text>
//       <Image
//         source={{ uri: profile?.avatar }}
//         style={{ width: 100, height: 100 }}
//       />
//       <Text style={{ marginTop: 20, fontWeight: "bold" }}>
//         Steam Inventory ({inventory.length} items)
//       </Text>
//       <FlatList
//         data={inventory}
//         keyExtractor={(item) => item.classid}
//         renderItem={({ item }) => (
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginVertical: 3,
//               padding: 5,
//               borderWidth: 1,
//               borderColor: "#ccc",
//               borderRadius: 8,
//             }}
//           >
//             {/* Item photo */}
//             {item.icon_url ? (
//               <Image
//                 source={{
//                   uri: `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`,
//                 }}
//                 style={{ width: 50, height: 50, marginRight: 10 }}
//               />
//             ) : null}

//             {/* Item name */}
//             <Text style={{ flexShrink: 1 }}>{item.name}</Text>
//           </View>
//         )}
//         style={{ width: "100%", marginTop: 10 }}
//       />
//     </View>
//   );
// };

// export default SteamLoginButton;

import { useColorScheme } from "@/hooks/use-color-scheme.web";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";
import ToastManager from "toastify-react-native";
import { GlobalProvider, useGlobal } from "../context/GlobalContext";

export const unstable_settings = { anchor: "(tabs)" };

const toastConfig = {
  success: (props: any) => (
    <View
      style={{
        backgroundColor: "#4CAF50", // ногоон
        padding: 16,
        borderRadius: 10,
        width: "90%",
        marginTop: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontFamily: "Nunito-Bold",
        }}
      >
        {props.text1}
      </Text>
      {props.text2 && <Text style={{ color: "white" }}>{props.text2}</Text>}
    </View>
  ),
  error: (props: any) => (
    <View
      style={{
        backgroundColor: "#F44336",
        padding: 16,
        borderRadius: 10,
        width: "90%",
        marginTop: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontFamily: "Nunito-Bold",
        }}
      >
        {props.text1}
      </Text>
      {props.text2 && (
        <Text style={{ color: "white", fontFamily: "Nunito-Regular" }}>
          {props.text2}
        </Text>
      )}
    </View>
  ),

  warning: (props: any) => (
    <View
      style={{
        backgroundColor: "#FF9800",
        padding: 16,
        borderRadius: 10,
        width: "90%",
        marginTop: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontFamily: "Nunito-Bold",
        }}
      >
        {props.text1}
      </Text>
      {props.text2 && (
        <Text style={{ color: "white", fontFamily: "Nunito-Regular" }}>
          {props.text2}
        </Text>
      )}
    </View>
  ),
};

export default function RootLayout() {
  const [user, setUser] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const colorScheme = useColorScheme();
  const { setTheme, theme } = useGlobal();
  // Hooks-г conditional-гүйгээр дээд түвшинд дуудаж байна
  useEffect(() => {
    const checkUser = async () => {
      const loggedIn = false;
      setUser(loggedIn);
    };
    checkUser();
  }, []);

  // useEffect(() => {
  //   const loadTheme = async () => {
  //     const storedTheme = await SecureStore.getItemAsync("theme");
  //     if (storedTheme === "light" || storedTheme === "dark") {
  //       setTheme(JSON.parse(storedTheme));
  //     }
  //   };
  //   loadTheme();
  // }, []);

  // useEffect(() => {
  //   if (user === false) {
  //     // router.replace("/start");
  //   }
  // }, [user]);

  return (
    <GlobalProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <Slot />
          <ToastManager config={toastConfig} />
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  slot: { flex: 1 },
});
