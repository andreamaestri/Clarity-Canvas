import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { Theme, themes } from "../data/themes";

interface ThemeContextType {
  currentTheme: string;
  setTheme: (themeName: string) => void;
  currentThemeObject: Theme;
}

// Find the default theme object
const defaultThemeObject = themes.find(
  (theme) => theme.name.toLowerCase() === "default",
)!;

// Create the ThemeContext with an initial value
export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "default",
  setTheme: () => {},
  currentThemeObject: defaultThemeObject,
});

// ThemeProvider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState("default");

  const setTheme = (themeName: string) => {
    const normalizedName = themeName.toLowerCase();
    setCurrentTheme(normalizedName);
    document.documentElement.setAttribute("data-theme", normalizedName);
  };

  // Memoise the current theme object to prevent unnecessary renders
  const currentThemeObject = useMemo(() => {
    return (
      themes.find((theme) => theme.name.toLowerCase() === currentTheme) ||
      defaultThemeObject
    );
  }, [currentTheme]);

  const value = useMemo(
    () => ({
      currentTheme,
      setTheme,
      currentThemeObject,
    }),
    [currentTheme, currentThemeObject],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
