import { useState } from "react";
import { Tldraw } from 'tldraw';
import { Toolbar } from "./components/Toolbar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeController from "./components/tools/ThemeController";
import "tldraw/tldraw.css";
import "@fontsource-variable/lexend-deca/wght.css";

const TldrawWrapper = () => {
  const [mode, setMode] = useState<"focus" | "flex">("focus");
  const { isDarkMode } = useTheme();

  return (
    <div className="tldraw__editor" style={{ position: "fixed", inset: 0 }}>
      <Tldraw 
        darkMode={isDarkMode}
        hideUi
        persistenceKey="my-persistence-key"
      >
        <Toolbar
          mode={mode}
          onModeToggle={() => setMode(mode === "focus" ? "flex" : "focus")}
        />
        <ThemeController />
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
