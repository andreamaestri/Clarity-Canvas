import type { TLUiActionsContextType, TLUiOverrides, TLUiToolsContextType } from 'tldraw';
import { Tldraw } from 'tldraw';
import { useState } from "react";
import { Toolbar } from "./components/Toolbar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeController from "./components/tools/ThemeController";
import "tldraw/tldraw.css";
import "@fontsource-variable/lexend-deca/wght.css";

// Override Tldraw shortcuts
const overrides: TLUiOverrides = {
  actions(_editor, actions): TLUiActionsContextType {
    const keysToDisable = ['toggle-grid', 'copy-as-png', 'undo', 'redo'];
    const newActions = { ...actions };
    
    for (const key of keysToDisable) {
      newActions[key].kbd = undefined;
    }

    return newActions;
  },
  tools(_editor, tools): TLUiToolsContextType {
    const keysToDisable = ['draw', 'erase'] as const;
    const newTools = { ...tools };

    for (const key of keysToDisable) {
      if (key in newTools) {
        newTools[key] = {
          ...newTools[key],
          kbd: undefined
        };
      }
    }
    
    return newTools;
  }
};

const TldrawWrapper = () => {
  const [mode, setMode] = useState<"focus" | "flex">("focus");
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
