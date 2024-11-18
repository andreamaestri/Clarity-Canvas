import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Define interfaces inside the component
  interface Theme {
    name: string;
    previewColor: string;
    description?: string;
  }

  interface ThemeContextType {
    currentTheme: string;
    setTheme: (themeName: string) => void;
    currentThemeObject: Theme;
    isDarkMode: boolean;
  }

  // Create context and initialize with null
  const ThemeContext = createContext<ThemeContextType | null>(null);

  const [currentTheme, setCurrentTheme] = useState("default");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themes: Theme[] = [
    { name: "default", previewColor: "#ffffff" },
    { name: "dark", previewColor: "#000000" },
    // Add other themes as needed
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    const newIsDarkMode = currentTheme === "dark" || currentTheme === "black";
    setIsDarkMode(newIsDarkMode);

    const bgColor = newIsDarkMode ? "#1a1a1a" : "#ffffff";
    document.documentElement.style.setProperty("--canvas-background-color", bgColor);
    document.documentElement.style.setProperty("--background", bgColor);
    document.documentElement.style.setProperty("--tl-theme", newIsDarkMode ? "dark" : "light");

    const canvas = document.querySelector(".tl-canvas") as HTMLElement | null;
    if (canvas) {
      canvas.setAttribute("data-theme", newIsDarkMode ? "dark" : "light");
    }
  }, [currentTheme]);

  const setTheme = (themeName: string) => {
    setCurrentTheme(themeName.toLowerCase());
  };

  const currentThemeObject =
    themes.find((theme) => theme.name.toLowerCase() === currentTheme) || themes[0];

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    currentThemeObject,
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  // Define the same interfaces inside the hook
  interface Theme {
    name: string;
    previewColor: string;
    description?: string;
  }

  interface ThemeContextType {
    currentTheme: string;
    setTheme: (themeName: string) => void;
    currentThemeObject: Theme;
    isDarkMode: boolean;
  }

  // Create context inside the hook
  const ThemeContext = createContext<ThemeContextType | null>(null);
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};