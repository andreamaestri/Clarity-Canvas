import ToolButton from "../common/ToolButton";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";

interface ModeToggleProps {
  mode: "focus" | "flex";
  onModeToggle: () => void;
}

const ModeToggle = ({ mode, onModeToggle }: ModeToggleProps) => {
  const isFocusMode = mode === "focus";

  return (
    <ToolButton
      label={isFocusMode ? "Focus Mode" : "Flex Mode"}
      icon={isFocusMode ? RiFullscreenExitLine : RiFullscreenLine}
      onPress={onModeToggle}
      isActive={isFocusMode}
      tooltipPosition="left"
      shortcut="Ctrl+M"
    />
  );
};

export default ModeToggle;
