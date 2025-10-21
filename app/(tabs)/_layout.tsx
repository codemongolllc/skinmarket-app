import { IconLib } from "@/components";
import { useTheme } from "@/hooks/useTheme";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type TabName = "index" | "inventory" | "sellorder" | "order" | "profile";

const tabItems: {
  name: TabName;
  title: string;
  icon: React.ComponentProps<typeof IconLib>["name"];
}[] = [
  { name: "index", title: "Маркет", icon: "Home" },
  { name: "inventory", title: "Агуулах", icon: "Box1" },
  { name: "sellorder", title: "Зарах захиалга", icon: "Receipt" },
  { name: "order", title: "Захиалга", icon: "ArrowSwapVertical" },
  { name: "profile", title: "Профайл", icon: "User" },
];

export default function TabLayout() {
  const { colors } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<TabName>("index");

  const pathFor = (
    name: TabName
  ): "/" | "/inventory" | "/sellorder" | "/order" | "/profile" => {
    switch (name) {
      case "index":
        return "/";
      case "inventory":
        return "/inventory";
      case "sellorder":
        return "/sellorder";
      case "order":
        return "/order";
      case "profile":
        return "/profile";
    }
  };

  const handlePress = (tabName: TabName) => {
    setActiveTab(tabName);
    router.replace(pathFor(tabName));
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: colors.secondary,
          borderTopColor: colors.secondary,
          height: 70,
        }}
      >
        {tabItems.map((tab) => {
          const focused = activeTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handlePress(tab.name)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: focused ? colors.primary : "transparent",
                // paddingHorizontal: 10,
                paddingBottom: 20,
              }}
            >
              <IconLib
                name={tab.icon}
                size={28}
                color={focused ? colors.primary : colors.strokeSecondarySoft}
                variant={focused ? undefined : "Outline"}
              />
              {focused && (
                <Text style={{ color: colors.primary, marginLeft: 6 }}>
                  {tab.title}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
