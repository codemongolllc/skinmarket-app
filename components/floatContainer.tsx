import { ArrowUp2 } from "iconsax-react-native";
import { StyleSheet, View } from "react-native";

const FloatBarWithIcon = ({ floatValue }: { floatValue: number }) => {
  const floatBars = [
    { width: 0.07, color: "#4faf36ff" },
    { width: 0.08, color: "#72d34fff" },
    { width: 0.22, color: "#f5f565ff" },
    { width: 0.07, color: "#da8e37ff" },
    { width: 0.56, color: "#d61414ff" },
  ];

  const iconSize = 20;
  const barHeight = 4;

  return (
    <View style={{ marginBottom: 4 }}>
      <View style={styles.container}>
        <View style={[styles.floatContainer, { height: barHeight }]}>
          {floatBars.map((bar, index) => (
            <View
              key={index}
              style={[
                styles.floatBar,
                { width: `${bar.width * 100}%`, backgroundColor: bar.color },
              ]}
            />
          ))}
        </View>
      </View>
      <View
        style={[
          styles.icon,
          {
            left: `${Math.min(Math.max(floatValue, 0), 1) * 100}%`,
            width: iconSize,
            height: iconSize,
            marginLeft: -iconSize / 2,
            top: -2,
          },
        ]}
      >
        <ArrowUp2 size={iconSize} color="white" variant="Bold" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  floatContainer: {
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#eee",
    position: "relative",
  },
  floatBar: {
    height: "100%",
  },
  icon: {
    position: "absolute",
    zIndex: 10,
    bottom: -10,
  },
});

export default FloatBarWithIcon;
