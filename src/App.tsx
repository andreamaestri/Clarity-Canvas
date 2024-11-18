import { useState, useEffect } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { Toolbar } from "./components/Toolbar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { InitialSetupModal } from "./components/InitialSetupmodal";

const TldrawWrapper = ({
  mode,
  onModeToggle,
}: {
  mode: "focus" | "flex";
  onModeToggle: () => void;
}) => {
  const { isDarkMode } = useTheme();
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("DARK_MODE");
    return stored ? stored === "true" : isDarkMode;
  });

  useEffect(() => {
    if (darkMode !== isDarkMode) {
      setDarkMode(isDarkMode);
      localStorage.setItem("DARK_MODE", String(isDarkMode));
      window.location.reload();
    }
  }, [isDarkMode, darkMode]);

  return (
    <div
      className={`tldraw__editor ${darkMode ? "dark-mode" : ""}`}
      style={{ position: "fixed", inset: 0 }}
    >
      <Tldraw persistenceKey="clarity-canvas" hideUi inferDarkMode={darkMode}>
        <Toolbar mode={mode} onModeToggle={onModeToggle} orientation="horizontal" />
      </Tldraw>
    </div>
  );
};

function App() {
  const [mode, setMode] = useState<"focus" | "flex">(() => {
    return (localStorage.getItem("selectedMode") as "focus" | "flex") || "flex";
  });

  const handleSetupComplete = (data: { mode: "focus" | "flex" }) => {
    console.log("Setup completed:", data);
    setMode(data.mode);
  };

  const handleModeToggle = () => {
    setMode((prevMode) => (prevMode === "focus" ? "flex" : "focus"));
  };

  return (
    <ThemeProvider>
      <InitialSetupModal onComplete={handleSetupComplete} />
      <TldrawWrapper mode={mode} onModeToggle={handleModeToggle} />
    </ThemeProvider>
  );
}

export default App;
