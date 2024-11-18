import { useEffect, useRef } from "react";
import ToolButton from "../common/ToolButton";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import { useTheme } from "../../context/ThemeContext";

interface ModeToggleProps {
  mode: "focus" | "flex";
  onModeToggle: () => void;
  onToolVisibilityChange?: (isVisible: boolean) => void;
}

const ModeToggle = ({
  mode,
  onModeToggle,
  onToolVisibilityChange,
}: ModeToggleProps) => {
  const { currentTheme, setTheme } = useTheme();
  const previousThemeRef = useRef(currentTheme);
  const isFocusMode = mode === "focus";

  useEffect(() => {
    const toggleFullscreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch (err) {
        console.error("Error toggling fullscreen:", err);
      }
    };
    if (isFocusMode) {
      if (currentTheme !== "muted") {
        previousThemeRef.current = currentTheme;
        setTheme("muted");
      }
      toggleFullscreen();
      onToolVisibilityChange?.(true);
    } else {
      if (currentTheme === "muted") {
        setTheme(previousThemeRef.current);
      }
      if (document.fullscreenElement) {
        toggleFullscreen();
      }
      onToolVisibilityChange?.(false);
    }
  }, [isFocusMode, setTheme, currentTheme, onToolVisibilityChange]);
  return (
    <ToolButton
      label={isFocusMode ? "Focus Mode" : "Flex Mode"}
      icon={isFocusMode ? RiFullscreenExitLine : RiFullscreenLine}
      onPress={onModeToggle}
      isActive={isFocusMode}
      tooltipPosition="left"
      shortcut="F"
    />
  );
};

export default ModeToggle;
