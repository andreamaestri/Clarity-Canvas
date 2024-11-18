import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { Toolbar } from "./components/Toolbar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useEffect, useState } from "react";

const TldrawWrapper = () => {
  const { isDarkMode } = useTheme();
  const [darkMode, setDarkMode] = useState(() => {
    // Parse the initial value from localStorage or use isDarkMode
    const stored = localStorage.getItem("DARK_MODE");
    return stored ? stored === "true" : isDarkMode;
  });

  useEffect(() => {
    if (darkMode !== isDarkMode) {
      setDarkMode(isDarkMode);
      localStorage.setItem("DARK_MODE", String(isDarkMode));
      window.location.reload(); // Refresh the page when the theme changes
    }
  }, [isDarkMode, darkMode]);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        persistenceKey="clarity-canvas"
        hideUi
        inferDarkMode={darkMode}
      >
        <Toolbar 
          mode="flex" 
          onModeToggle={() => {}} 
        />
      </Tldraw>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <TldrawWrapper />
    </ThemeProvider>
  );
}

export default App;
