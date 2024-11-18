import { track } from "tldraw";
import type { Editor } from "tldraw";
import { RiCursorFill } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

interface SelectToolProps {
  editor: Editor;
}

const SelectTool = track(({ editor }: SelectToolProps) => {
  const handleSelect = () => {
    if (!editor) return;
    editor.setCurrentTool("select");
  };

  return (
    <ToolButton
      editor={editor}
      toolId="select"
      label="Select"
      icon={RiCursorFill}
      shortcut="V"
      tooltipPosition="top"
      onPress={handleSelect}
    />
  );
});

export default SelectTool;
