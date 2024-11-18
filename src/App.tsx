import type {
  TLUiActionsContextType,
  TLUiOverrides,
  TLUiToolsContextType,
} from "tldraw";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useState, useMemo } from "react";
import { Toolbar } from "./components/Toolbar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeController from "./components/tools/ThemeController";
import "@fontsource-variable/lexend-deca/wght.css";

// Override Tldraw shortcuts
const overrides: TLUiOverrides = {
  actions(_editor, actions): TLUiActionsContextType {
    const newActions = Object.keys(actions).reduce((acc, key) => {
      acc[key] = { ...actions[key], kbd: undefined };
      return acc;
    }, {} as TLUiActionsContextType);

    return newActions;
  },
  tools(_editor, tools): TLUiToolsContextType {
    const newTools = Object.keys(tools).reduce((acc, key) => {
      acc[key] = { ...tools[key], kbd: undefined };
      return acc;
    }, {} as TLUiToolsContextType);

    return newTools;
  },
};

const TldrawWrapper = () => {
  const [mode, setMode] = useState<"focus" | "flex">("flex");
  const { isDarkMode, currentThemeObject } = useTheme();

  // Convert DaisyUI theme colors to TLDraw theme
  const tldrawTheme = useMemo(() => ({
    background: currentThemeObject?.colors.base100 || (isDarkMode ? '#1a1a1a' : '#ffffff'),
    text: currentThemeObject?.colors.baseContent || (isDarkMode ? '#ffffff' : '#000000'),
    // Add other canvas-specific colors
    canvasBackground: currentThemeObject?.colors.base100,
    canvasText: currentThemeObject?.colors.baseContent,
    selectFill: currentThemeObject?.colors.primary + '20', // Adding transparency
    selectStroke: currentThemeObject?.colors.primary,
  }), [currentThemeObject, isDarkMode]);

  return (
    <div className="tldraw__editor" style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        defaultDarkMode={isDarkMode}
        hideUi
        persistenceKey="clarity-canvas"
        overrides={overrides}
        theme={tldrawTheme}
        components={{
          // Override the Grid component to return null (removes grid)
          Grid: () => null,
        }}
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