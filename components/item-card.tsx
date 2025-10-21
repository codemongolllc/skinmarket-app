import { IText } from "@/components";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface ItemCardProps {
  price: string;
  discount?: string;
  title: string;
  condition?: string;
  image: any;
  progress?: number;
}

const ItemCard: React.FC<ItemCardProps> = ({
  price,
  discount,
  title,
  condition,
  image,
  progress = 1,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        width: "49%",
        height: 250,
        backgroundColor: colors.strokePrimarySoft,
        borderRadius: 12,
        // borderColor: colors.primarySoft,
        // borderWidth: 1,
      }}
    >
      <View
        style={{
          height: 100,
          width: "100%",
          borderTopStartRadius: 12,
          borderTopEndRadius: 12,
          paddingVertical: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ height: "100%", width: "100%" }}
          resizeMode="contain"
        />
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IText color={colors.white} fonts="bold" size={20}>
            {price}
          </IText>
          {discount && (
            <LinearGradient
              colors={["#fdbb2d", "#b21f1f", "#1a2a6c"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingHorizontal: 4,
                borderRadius: 4,
                justifyContent: "center",
                height: 18,
                alignSelf: "center",
                marginLeft: 10,
              }}
            >
              <IText color={colors.white} fonts="bold" size={10}>
                {discount}
              </IText>
            </LinearGradient>
          )}
        </View>
        <IText color={colors.white} fonts="bold" size={14}>
          {title}
        </IText>
      </View>

      {condition && (
        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
          <IText color={"#686B6B"} fonts="regular" size={12}>
            {condition}
          </IText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IText color={colors.white} fonts="regular" size={10}>
              {progress.toFixed(5)}
            </IText>
            <View
              style={{
                width: "70%",
                height: 4,
                backgroundColor: "green",
                marginLeft: 5,
                borderEndEndRadius: 2,
                borderStartEndRadius: 2,
              }}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemCard;
