import { Badge, FloatContainer, IText } from "@/components";
import { useGlobal } from "@/context/GlobalContext";
import { useTheme } from "@/hooks/useTheme";
import { formatMoney } from "@/utils";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface ItemCardProps {
  item?: any;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { colors } = useTheme();
  const { user } = useGlobal();

  const [floatValue, setFloatValue] = useState(0.08);

  async function handleDetail() {
    try {
      const res = await fetch(
        `http://192.168.1.2:3000/api/inventory/detail?classid=${item?.classid}&instanceid=${item?.instanceid}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (!res.ok) {
        console.warn("Server error:", res.status);
        return;
      }
      const data = await res.json();
      console.log("Item detail:", data.item);
    } catch (err) {
      console.error("Error fetching item detail:", err);
    }
  }

  return (
    <TouchableOpacity
      style={{
        width: "49%",
        backgroundColor: colors.strokePrimarySoft,
        borderRadius: 12,
        borderColor: colors.primarySoft,
        borderWidth: 1,
        justifyContent: "space-between",
        paddingBottom: 10,
      }}
      disabled={!item?.tradable}
      onPress={handleDetail}
    >
      <Badge title="29%" type="error" />
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
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IText color={colors.white} fonts="bold" size={16}>
            {formatMoney(item?.price)}
          </IText>
        </View>
        <IText color={colors.white} fonts="light" size={12}>
          {item?.name}
        </IText>
      </View>
      {item?.type && (
        <View style={{ paddingHorizontal: 10, marginTop: 10, flex: 1 }}>
          <IText color={"#686B6B"} fonts="regular" size={14}>
            {item?.type}
          </IText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <IText color={colors.white} fonts="regular" size={12}>
              FN /
            </IText>
            <IText color={colors.white} fonts="regular" size={12}>
              {" "}
              {floatValue}
            </IText>
          </View>
          <FloatContainer floatValue={floatValue} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemCard;
