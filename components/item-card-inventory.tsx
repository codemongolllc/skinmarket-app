import { IText } from "@/components";
import { useGlobal } from "@/context/GlobalContext";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface ItemCardProps {
  item?: any;
}

const ItemCardInventory: React.FC<ItemCardProps> = ({ item }) => {
  const { colors } = useTheme();
  const { user } = useGlobal();

  const [floatValue, setFloatValue] = useState(0.08);
  const [showFullName, setShowFullName] = useState(false);

  async function handleDetail() {
    console.log(item, "item");

    // try {
    //   const res = await fetch(
    //     `http://192.168.1.2:3000/api/inventory/detail?classid=${item?.classid}&instanceid=${item?.instanceid}`,
    //     {
    //       headers: { Authorization: `Bearer ${user.token}` },
    //     }
    //   );
    //   if (!res.ok) {
    //     console.warn("Server error:", res.status);
    //     return;
    //   }
    //   const data = await res.json();
    //   console.log("Item detail:", data.item);
    // } catch (err) {
    //   console.error("Error fetching item detail:", err);
    // }
  }
  const exteriorShort = {
    "Factory New": "FN",
    "Minimal Wear": "MW",
    "Field-Tested": "FT",
    "Well-Worn": "WW",
    "Battle-Scarred": "BS",
  };
  const exteriorColors: Record<string, string> = {
    FN: "#4CAF50", // green
    MW: "#2196F3", // blue
    FT: "#FFC107", // yellow
    WW: "#FF9800", // orange
    BS: "#F44336", // red
  };
  const exteriorCode =
    exteriorShort[item.exterior as keyof typeof exteriorShort] || item.exterior;

  return (
    <TouchableOpacity
      style={{
        width: "49%",
        backgroundColor: colors.strokePrimarySoft,
        borderRadius: 12,
        // borderColor: colors.primarySoft,
        // borderWidth: 1,
        justifyContent: "space-between",
        paddingBottom: 10,
        // padding: 24,
      }}
      onPress={handleDetail}
    >
      {item?.exterior && (
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            paddingVertical: 2,
            paddingHorizontal: 12,
            backgroundColor: exteriorColors[exteriorCode] || "#686B6B",
            borderRadius: 6,
          }}
          onPress={() => {
            setShowFullName(!showFullName);
          }}
        >
          <IText color={colors.white} fonts="extraBold" size={14}>
            {showFullName ? item.exterior : exteriorCode}
          </IText>
        </TouchableOpacity>
      )}
      {item?.tradable === 0 && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 12,
            zIndex: 1,
            justifyContent: "center",
          }}
        >
          <IText
            color={colors.white}
            fonts="bold"
            size={16}
            style={{ textAlign: "center" }}
          >
            Энэ Item зарах боломжгүй
          </IText>
        </View>
      )}
      <View
        style={{
          height: 130,
          width: "100%",
          borderTopStartRadius: 12,
          borderTopEndRadius: 12,
          paddingVertical: 10,
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <Image
          source={{ uri: item?.icon }}
          style={{ height: "100%", width: "100%" }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          paddingHorizontal: 12,
          flexDirection: "row",
        }}
      >
        <IText color={colors.white} fonts="bold" size={14}>
          {item?.name}
        </IText>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCardInventory;
