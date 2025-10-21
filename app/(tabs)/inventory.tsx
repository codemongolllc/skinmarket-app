import { Header, ItemCard, IText, SteamLoginPage } from "@/components";
import { useGlobal } from "@/context/GlobalContext";
import { useTheme } from "@/hooks/useTheme";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Inventory() {
  const { colors } = useTheme();
  const { user } = useGlobal();
  const [inventory, setInventory] = useState<any>();
  const [loading, setLoading] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 30,
      paddingHorizontal: 4,
    },
    itemContainer: {
      borderRadius: 10,
      backgroundColor: "white",
      marginBottom: 10,
    },
    content: {},
  });

  const DATA = [
    {
      icon: "https://steamcommunity-a.akamaihd.net/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU0OGvZqBSKPWSGH7elrkjs-M-Tni1w0R-426Bm477eHqXbQUjWJR3EOQNsRS8ktHhP7zq5Bue1dwzT3TRmw",
      name: "P250 | Sand Dune (Battle-Scarred)",
      tradable: 1,
      type: "Consumer Grade Pistol",
    },
    {
      icon: "https://steamcommunity-a.akamaihd.net/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnIV7Kb5OaU-JqfHDzXFle0u4LY8Gy_kkRgisGzcm4v4J3vDOAQmDMdyRvlK7EcmeCU3yw",
      name: "Dreams & Nightmares Case",
      tradable: 1,
      type: "Base Grade Container",
    },
    {
      icon: "https://steamcommunity-a.akamaihd.net/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7jJk-_O-bZt-KP-BGliDwOByj-xsSyCmmFNxtm_Sntf6d37EaA4mAsZyFOdZsBbpm4XjM-_r4weKjI9GyC3-iilK8G81tNuN7upC",
      name: "MP9 | Sand Dashed (Field-Tested)",
      tradable: 1,
      type: "Consumer Grade SMG",
    },
    {
      icon: "https://steamcommunity-a.akamaihd.net/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnAVvfb6aqduc_TFVjTCxbx05OU4S3jilE9w4DzRnImtIy2Sa1JzDJEhRPlK7EcO4U8gfA",
      name: "Revolution Case",
      tradable: 1,
      type: "Base Grade Container",
    },
    {
      icon: "https://steamcommunity-a.akamaihd.net/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIijyEKzb_3d19nuI3qb81NKpNa66wu1Qx-mm8Kx-CYC6aD2bv0-IfPFWGHIkegh5LY4GXzlxU905W7UwsHpLywWgep6oQ",
      name: "Music Kit | Valve, CS:GO",
      tradable: 0,
      type: "High Grade Music Kit",
    },
    {
      icon: "https://steamcommunity-a.akamaihd.net/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai2l-lQ8ndwMWvJjSU6l97y4Tn7VapFB6kzsLmrXcP7vSvMfY_d6jAWTfHlLZ34rA4GXrnlkh052_TwomvdWXXMFHAFOJ0XQ",
      name: "Global Offensive Badge",
      tradable: 0,
      type: "Extraordinary Collectible",
    },
  ];

  useEffect(() => {
    getInventory();
  }, [user]);
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = "CHINI_JWT_TOKEN"; // Steam login-аас авсан token
        const response = await fetch("http://localhost:4000/auth/inventory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setInventory(data.inventory || []);
      } catch (error) {
        console.error("Inventory fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);
  console.log(inventory);

  if (loading) return <IText>Loading...</IText>;

  function getInventory() {
    fetch("http://192.168.1.2:3000/auth/inventory", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("🎒 Inventory:", data.inventory);
      })
      .catch((err) => console.error("Inventory fetch error:", err));
  }
  const renderContent = () => {
    switch (user) {
      case null:
        return <SteamLoginPage />;
      default:
        return (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <Header type="home" title="МИНИЙ ITEM" />
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={DATA}
                  renderItem={({ item }) => (
                    <ItemCard
                      price={"5000"}
                      discount={"-19"}
                      title={item.name}
                      condition={item.name}
                      image={item.icon}
                      // progress={item.name}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        );
    }
  };
  return renderContent();
}
