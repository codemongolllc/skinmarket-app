import { Header, ItemCard } from "@/components";
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

export default function Profile() {
  const { colors } = useTheme();
  const [trades, setTrades] = useState();
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
  useEffect(() => {
    fetchTrades();
  }, []);

  async function fetchTrades() {
    try {
      const res = await fetch("http://192.168.1.2:3000/api/trades/listings");
      const text = await res.text(); // эхлээд текстээр аваад шалгах
      console.log("Response text:", text);

      if (!res.ok) {
        console.log(`Server error: ${res.status}`);
        return;
      }

      const data = JSON.parse(text);
      setTrades(data.trades);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }
  console.log("Trades:", trades);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header type="home" title="Маркет" />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={trades}
            renderItem={({ item }: any) => <ItemCard item={item?.item} />}
            keyExtractor={(item) => item._id}
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
