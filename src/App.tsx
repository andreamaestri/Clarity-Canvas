import { TLUiActionsContextType, TLUiOverrides, TLUiToolsContextType, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { useState } from "react";
import { Toolbar } from "./components/Toolbar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeController from "./components/tools/ThemeController";
import "@fontsource-variable/lexend-deca/wght.css";

// Override Tldraw shortcuts
const overrides: TLUiOverrides = {
  actions(_editor, actions): TLUiActionsContextType {
    const newActions = Object.keys(actions).reduce((acc, key) => {
      acc[key] = { ...actions[key], kbd: null };
      return acc;
    }, {} as TLUiActionsContextType);

    return newActions;
  },
  tools(_editor, tools): TLUiToolsContextType {
    const newTools = Object.keys(tools).reduce((acc, key) => {
      acc[key] = { ...tools[key], kbd: null };
      return acc;
    }, {} as TLUiToolsContextType);

    return newTools;
  },
};

const TldrawWrapper = () => {
  const [mode, setMode] = useState<"focus" | "flex">("flex"); // Default to "flex" mode
  const { isDarkMode } = useTheme();

  return (
    <div className="tldraw__editor" style={{ position: "fixed", inset: 0 }}>
      <Tldraw 
        darkMode={isDarkMode}
        hideUi
        persistenceKey="my-persistence-key"
        overrides={overrides}
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
