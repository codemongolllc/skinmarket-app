import { ExitIcon } from "@/assets/svg";
import { DrawerItem, Header, IText } from "@/components";
import { useGlobal } from "@/context/GlobalContext";
import { useTheme } from "@/hooks/useTheme";
import { formatMoney } from "@/utils";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Profile() {
  const { colors } = useTheme();
  const { user } = useGlobal();

  const styles = createStyles(colors);

  const renderBalanceCard = () => (
    <View style={styles.balanceCard}>
      <IText fonts="medium" size={14} color={colors.white}>
        Боломжит үлдэгдэл
      </IText>
      <IText fonts="bold" size={36} color={colors.white}>
        {formatMoney(user?.data?.balance)}
      </IText>
      <IText
        fonts="medium"
        size={14}
        color={colors.white}
        style={styles.balanceDesc}
      >
        Энэ дүн нь таны апп дээрээс олсон ажлыг{"\n"}хийсэн гэх нийт цалин.
      </IText>
      <View style={styles.divider} />
      <View style={styles.balanceActions}>
        <TouchableOpacity>
          <IText fonts="bold" size={16} color={colors.white}>
            Орлого
          </IText>
        </TouchableOpacity>
        <IText fonts="bold" size={16} color={colors.white}>
          {"   "}|{"   "}
        </IText>
        <TouchableOpacity>
          <IText fonts="bold" size={16} color={colors.white}>
            Зарлага
          </IText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSummaryCard = () => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryColumn}>
        <IText fonts="medium" size={12} color={colors.white}>
          Түгжигдсэн дүн
        </IText>
        <IText fonts="extraBold" size={14} color={colors.white}>
          {formatMoney(user?.data?.balance)}
        </IText>
      </View>
      <View style={styles.summaryColumn}>
        <IText fonts="medium" size={12} color={colors.white}>
          Хүлээгдэж буй үлдэгдэл
        </IText>
        <IText fonts="extraBold" size={14} color={colors.white}>
          {formatMoney(user?.data?.balance)}
        </IText>
      </View>
    </View>
  );

  function renderDrawerSection(
    items: {
      title: string;
      type?: "secondary" | "exit";
      containerStyle?: any;
      Icon?: React.ElementType;
    }[]
  ) {
    return (
      <View style={styles.section}>
        {items.map((item, index) => {
          let style = {};
          if (index === 0) style = styles.sectionTop;
          else if (index === items.length - 1) style = styles.sectionBottom;
          if (item.type === "exit") style = { borderRadius: 10 };
          if (item.containerStyle) style = { ...style, ...item.containerStyle };

          return (
            <DrawerItem
              key={item.title}
              type={item.type || "secondary"}
              title={item.title}
              IconComponent={item.Icon}
              containerStyle={style}
            />
          );
        })}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Header type="profile" title="Миний цэс" />
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <DrawerItem type="primary" containerStyle={styles.drawerPrimary} />
            {renderBalanceCard()}
            {renderSummaryCard()}
            {renderDrawerSection([
              { title: "Банкны данс холбох" },
              { title: "И-Мэйл солих" },
              { title: "Миний төхөөрөмжүүд" },
            ])}
            {renderDrawerSection([
              { title: "Хадгалсан item-ууд" },
              { title: "Худалдааний түүх" },
              { title: "Гүйлгээний түүх" },
            ])}
            <IText
              color={colors.white}
              fonts="semiBold"
              size={14}
              style={styles.sectionTitle}
            >
              Тохиргоо
            </IText>
            {renderDrawerSection([
              { title: "Захиалгын мэдээлэл авах" },
              { title: "Үйлчилгээний нөхцөл" },
              { title: "Нууцлалын бодлого" },
              { title: "Гүйлгээний түүх" },
              { title: "Таны хязгаарллалтын түүх" },
              { title: "Гүйлгээний пин үүсгэх" },
            ])}

            {renderDrawerSection([
              { title: "Систем-с гарах", type: "exit", Icon: ExitIcon },
            ])}
            <View style={{ height: 60 }} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 60,
      paddingHorizontal: 4,
    },
    scrollContent: {
      paddingBottom: 50,
    },
    drawerPrimary: {
      borderRadius: 10,
    },
    drawerExit: {
      borderRadius: 10,
    },
    balanceCard: {
      borderRadius: 10,
      backgroundColor: colors.secondary,
      flexDirection: "column",
      marginVertical: 24,
      alignItems: "center",
      paddingTop: 24,
    },
    balanceDesc: {
      textAlign: "center",
      marginTop: 4,
    },
    divider: {
      height: 1,
      width: "100%",
      backgroundColor: colors.strokeSecondarySoft,
      marginTop: 24,
    },
    balanceActions: {
      flexDirection: "row",
      alignSelf: "flex-end",
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    summaryCard: {
      borderRadius: 10,
      backgroundColor: colors.secondary,
      flexDirection: "row",
      paddingHorizontal: 24,
      paddingVertical: 12,
      justifyContent: "space-between",
    },
    summaryColumn: {
      flexDirection: "column",
    },
    section: {
      marginTop: 12,
    },
    sectionTop: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    sectionBottom: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    sectionTitle: {
      marginTop: 24,
    },
  });
