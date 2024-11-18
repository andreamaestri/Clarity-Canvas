import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { themes } from "../data/themeConstats";

// Define interfaces at the top level
interface Theme {
  name: string;
  previewColor: string;
  description?: string;
}

interface ThemeContextType {
  currentTheme: string;
  setTheme: (theme: string) => void;
  currentThemeObject: Theme | undefined;
  isDarkMode: boolean;
}

// Create context at the top level with a default value
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "flex-light",
  setTheme: () => {},
  currentThemeObject: themes[0],
  isDarkMode: false,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState(() => 
    localStorage.getItem('theme') || 'flex-light'
  );

  const currentThemeObject = useMemo(() => 
    themes.find((t) => t.name.toLowerCase().replace(" ", "-") === currentTheme),
    [currentTheme]
  );

  const isDarkMode = useMemo(() => {
    return currentTheme.includes('dark') || currentTheme === 'monochrome';
  }, [currentTheme]);

  const setTheme = useCallback((theme: string) => {
    const formattedTheme = theme.toLowerCase().replace(" ", "-");
    setCurrentTheme(formattedTheme);
    document.documentElement.setAttribute('data-theme', formattedTheme);
    localStorage.setItem('theme', formattedTheme);
  }, []);

  useEffect(() => {
    if (!currentThemeObject) return;

    document.documentElement.setAttribute("data-theme", currentTheme);
    
    // Set TLDraw canvas background color based on theme
    const canvasBackground = currentThemeObject.colors.base100;
    document.documentElement.style.setProperty(
      "--canvas-background-color",
      canvasBackground
    );
    
    // Set TLDraw theme mode
    document.documentElement.style.setProperty(
      "--tl-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [currentTheme, currentThemeObject, isDarkMode]);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setTheme,
      currentThemeObject,
      isDarkMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
