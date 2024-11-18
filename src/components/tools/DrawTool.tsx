import { track } from "tldraw";
import type { Editor } from "tldraw";
import { RiPencilFill } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

interface DrawToolProps {
  editor: Editor;
}

const DrawTool = track(({ editor }: DrawToolProps) => {
  const handleSelect = () => {
    if (!editor) return;
    editor.setCurrentTool("draw");
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
