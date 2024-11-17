import { track } from "tldraw";
import type { Editor } from "tldraw";
import { RiStickyNoteLine } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

interface NoteToolProps {
  editor: Editor;
}

const NoteTool = track(({ editor }: NoteToolProps) => {
  const handleCreateNote = () => {
    if (!editor) return;
    editor.setCurrentTool("note");
  };

  return (
    <ToolButton
      editor={editor}
      toolId="note"
      label="Sticky Note"
      icon={RiStickyNoteLine}
      shortcut="N"
      tooltipPosition="top"
      onPress={handleCreateNote}
    />
  );
});

export default NoteTool;
