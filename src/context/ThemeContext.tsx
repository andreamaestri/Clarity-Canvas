import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { themes } from "../data/themes";
import type { Theme } from "../data/themes";
import { DefaultColorThemePalette } from "tldraw";

interface ThemeContextType {
  currentTheme: string;
  setTheme: (themeName: string) => void;
  currentThemeObject: Theme;
  isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "default",
  setTheme: () => {},
  currentThemeObject: themes[0],
  isDarkMode: false,
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);

    const themeObject =
      themes.find((theme) => theme.name.toLowerCase() === currentTheme) ||
      themes[0];

    // Set colors for both modes
    DefaultColorThemePalette.lightMode.black.solid = themeObject.previewColor;
    DefaultColorThemePalette.lightMode.black.semi = `${themeObject.previewColor}80`;
    DefaultColorThemePalette.darkMode.black.solid = themeObject.previewColor;
    DefaultColorThemePalette.darkMode.black.semi = `${themeObject.previewColor}80`;

    // Light themes list
    const lightThemes = [
      "light",
      "default",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "valentine",
      "garden",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "cmyk",
      "autumn",
      "acid",
      "lemonade",
    ];

    // Determine theme mode
    const newIsDarkMode =
      !lightThemes.includes(currentTheme.toLowerCase()) &&
      (themeObject.previewColor.toLowerCase() === "#000000" ||
        themeObject.previewColor.toLowerCase() === "#2a303c");

    setIsDarkMode(newIsDarkMode);

    // Update Tldraw dark mode
    document.documentElement.setAttribute(
      "data-theme-mode",
      newIsDarkMode ? "dark" : "light",
    );
    document.documentElement.setAttribute(
      "data-tldraw-isDarkMode",
      String(newIsDarkMode),
    );

    // Set background colors based on mode
    const bgColor = newIsDarkMode ? "#1a1a1a" : "#ffffff";
    document.documentElement.style.setProperty(
      "--canvas-background-color",
      bgColor,
    );
    document.documentElement.style.setProperty("--background", bgColor);
    document.documentElement.style.setProperty(
      "--tl-theme",
      newIsDarkMode ? "dark" : "light",
    );

    // Force canvas update
    const canvas = document.querySelector(".tl-canvas");
    if (canvas) {
      canvas.setAttribute("data-theme", newIsDarkMode ? "dark" : "light");
    }
  }, [currentTheme]);

  const setTheme = (themeName: string) => {
    setCurrentTheme(themeName.toLowerCase());
  };

  const currentThemeObject =
    themes.find((theme) => theme.name.toLowerCase() === currentTheme) ||
    themes[0];

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        currentThemeObject,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
