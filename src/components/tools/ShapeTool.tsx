import { track } from "tldraw";
import type { Editor } from "tldraw";
import { RiShapeLine } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

interface ShapeToolProps {
  editor: Editor;
}

const ShapeTool = track(({ editor }: ShapeToolProps) => {
  const handleSelect = () => {
    if (!editor) return;
    editor.setCurrentTool("geo");
  };

  return (
    <ToolButton
      editor={editor}
      toolId="geo"
      label="Shape"
      icon={RiShapeLine}
      shortcut="R"
      tooltipPosition="top"
      onPress={handleSelect}
    />
  );
});

export default ShapeTool;