import { Header, ItemCard } from "@/components";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Profile() {
  const { colors } = useTheme();
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
      id: "1",
      price: "₮ 1,500,000",
      discount: "-19%",
      title: "USP-S | Ticket to Hell",
      condition: "Factory New * Convert Knife",
      progress: 0.12694,
      image: require("@/assets/images/icon.png"),
    },
    {
      id: "2",
      price: "₮ 950,000",
      discount: "-10%",
      title: "AK-47 | Redline",
      condition: "Field-Tested * Rifle",
      progress: 0.24567,
      image: require("@/assets/images/icon.png"),
    },
    {
      id: "3",
      price: "₮ 2,300,000",
      discount: "-25%",
      title: "AWP | Dragon Lore",
      condition: "Factory New * Sniper",
      progress: 0.05678,
      image: require("@/assets/images/icon.png"),
    },
    {
      id: "4",
      price: "₮ 600,000",
      discount: "-5%",
      title: "Desert Eagle | Blaze",
      condition: "Minimal Wear * Pistol",
      progress: 0.33455,
      image: require("@/assets/images/icon.png"),
    },
    {
      id: "5",
      price: "₮ 1,100,000",
      discount: "-15%",
      title: "M4A1-S | Hyper Beast",
      condition: "Field-Tested * Rifle",
      progress: 0.19876,
      image: require("@/assets/images/icon.png"),
    },
    {
      id: "6",
      price: "₮ 850,000",
      discount: "-12%",
      title: "Glock-18 | Fade",
      condition: "Factory New * Pistol",
      progress: 0.11234,
      image: require("@/assets/images/icon.png"),
    },
  ];
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
                price={item.price}
                discount={item.discount}
                title={item.title}
                condition={item.condition}
                image={require("@/assets/images/icon.png")}
                progress={item.progress}
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
