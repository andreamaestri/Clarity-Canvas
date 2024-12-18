import { track } from "tldraw";
import type { Editor } from "tldraw";
import { RiEraserFill } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

interface EraserToolProps {
  editor: Editor;
}

const EraserTool = track(({ editor }: EraserToolProps) => {
  const handleSelect = () => {
    if (!editor) return;
    editor.setCurrentTool("eraser");
  };

  return (
    <ToolButton
      editor={editor}
      toolId="eraser"
      label="Eraser"
      icon={RiEraserFill}
      shortcut="E"
      tooltipPosition="top"
      onPress={handleSelect}
    />
  );
});

export default EraserTool;
