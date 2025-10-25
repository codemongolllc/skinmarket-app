import { NextArrow } from "@/assets/svg";
import { useGlobal } from "@/context/GlobalContext";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import IText from "./IText";

type UserCardProps = {
  type?: string;
  onPress?: () => void;
  title?: string;
  containerStyle?: ViewStyle;
  IconComponent?: React.ElementType;
};

const UserCard: React.FC<UserCardProps> = ({
  type = "primary",
  onPress,
  title,
  containerStyle,
  IconComponent,
}) => {
  const { colors } = useTheme();
  const { user } = useGlobal();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.secondary },
        containerStyle,
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {type === "primary" ? (
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.data?.avatar }}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
        ) : IconComponent ? (
          React.createElement(IconComponent, {
            size: 24,
            color: colors.primary,
          })
        ) : null}

        {type === "primary" ? (
          <View style={styles.infoContainer}>
            <IText fonts="bold" color={colors.white} size={20}>
              {user?.data?.username}
            </IText>
            <View style={{ flexDirection: "row" }}>
              <IText fonts="bold" color={colors.white} size={12}>
                Steam ID:{" "}
              </IText>
              <IText fonts="regular" color={colors.primary} size={12}>
                {user?.data?.steamId}
              </IText>
            </View>
          </View>
        ) : (
          <IText
            fonts="regular"
            color={colors.white}
            size={14}
            style={{ marginLeft: 10 }}
          >
            {title}
          </IText>
        )}
      </View>
      {type !== "primary" && <NextArrow color={colors.white} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 18,
    // borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "gray",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  infoContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
});

export default UserCard;
