import { track } from "tldraw";
import type { Editor } from "tldraw";
import { RiText } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

interface TextToolProps {
  editor: Editor;
}

const TextTool = track(({ editor }: TextToolProps) => {
  const handleSelect = () => {
    if (!editor) return;
    editor.setCurrentTool("text");
  };

  return (
    <ToolButton
      editor={editor}
      toolId="text"
      label="Text"
      icon={RiText}
      shortcut="T"
      tooltipPosition="top"
      onPress={handleSelect}
    />
  );
});

export default TextTool;
