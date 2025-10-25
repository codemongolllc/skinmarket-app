import { Header, ItemCardInventory, SteamLoginPage } from "@/components";
import { useGlobal } from "@/context/GlobalContext";
import { useTheme } from "@/hooks/useTheme";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Inventory() {
  const { colors } = useTheme();
  const { user } = useGlobal();
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const fetchInventory = useCallback(async () => {
    if (!user?.token) return;
    try {
      setLoading(true);
      const res = await fetch("http://192.168.1.2:3000/api/inventory", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      setInventory(data.inventory || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchInventory();
    setRefreshing(false);
  }, [fetchInventory]);

  console.log(inventory, "inventor1y");
  // if (loading) return <IText>Loading...</IText>;

  const renderContent = () => {
    switch (user) {
      case null:
        return (
          <View
            style={{
              paddingTop: 60,
              flex: 1,
              backgroundColor: colors.background,
            }}
          >
            <View style={{ paddingHorizontal: 12 }}>
              <Header
                type="login"
                title="Steam Login"
                // onBackPress={() => router.back()}
              />
            </View>
            <SteamLoginPage />
          </View>
        );
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
                  data={inventory}
                  renderItem={({ item }) => {
                    console.log(item, "item1");
                    return <ItemCardInventory item={item} />;
                  }}
                  keyExtractor={(item: any) => item.classid + item.instanceid}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      tintColor={colors.blue}
                      colors={[colors.blue]}
                    />
                  }
                  ListEmptyComponent={
                    <View style={{ marginTop: 40, alignItems: "center" }}>
                      <ActivityIndicator size="small" color={colors.blue} />
                    </View>
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        );
    }
  };
  return renderContent();
}
