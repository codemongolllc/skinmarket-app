import { Colors } from "@/constants/theme"; // ensure this path exists
import { useGlobal } from "@/context/GlobalContext";
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const { theme } = useGlobal();

  const scheme = useColorScheme(); // 'light' | 'dark'
  const colors =
    scheme === "dark" || theme === "dark"
      ? Colors.dark.colors
      : Colors.light.colors;

  return { colors, scheme };
};
