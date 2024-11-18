import { track } from "tldraw";
import type { Editor } from "tldraw";
import { RiPencilFill } from "react-icons/ri";
import ToolButton from "../common/ToolButton";
import { useTheme } from "../../context/ThemeContext";

interface DrawToolProps {
  editor: Editor;
}

const DrawTool = track(({ editor }: DrawToolProps) => {
  const { currentThemeObject } = useTheme();
  
  const handleSelect = () => {
    if (!editor) return;
    editor.setCurrentTool("draw");
    editor.setStyle('color', currentThemeObject?.colors?.primary || '#000000');
    editor.setStyle('size', 'draw');
  };

  return (
    <ToolButton
      editor={editor}
      toolId="draw"
      label="Draw"
      icon={RiPencilFill}
      shortcut="D"
      tooltipPosition="top"
      onPress={handleSelect}
    />
  );
});

export default DrawTool;
