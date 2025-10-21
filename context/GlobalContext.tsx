import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Global state-ийн type
type GlobalContextType = {
  user: any | null;
  theme: "light" | "dark";
  setUser: (user: any | null) => void;
  setTheme: (theme: "light" | "dark") => void;
  fontsLoaded: boolean;
};

// Default values
const GlobalContext = createContext<GlobalContextType>({
  user: null,
  theme: "light",
  setUser: () => {},
  setTheme: () => {},
  fontsLoaded: false,
});

// Provider
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("@/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("@/assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("@/assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("@/assets/fonts/Nunito-Medium.ttf"),
    "Nunito-ExtraBold": require("@/assets/fonts/Nunito-ExtraBold.ttf"),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, theme, setTheme, fontsLoaded }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook-ийг хаанаас ч дуудаж болно
export const useGlobal = () => useContext(GlobalContext);
