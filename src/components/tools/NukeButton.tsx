import React from "react";
import { RiMeteorFill } from "react-icons/ri";
import ToolButton from "../common/ToolButton";
import type { Editor } from "tldraw";

interface NukeButtonProps {
  editor: Editor;
}

const NukeButton: React.FC<NukeButtonProps> = ({ editor }) => {
  const handleNuke = () => {
    editor.selectAll().deleteShapes(editor.getSelectedShapeIds());
  };

  return (
    <ToolButton
      label="Delete All"
      icon={RiMeteorFill}
      onPress={handleNuke}
      tooltipPosition="top"
      shortcut="Alt+D"
      variant="ghost"
      size="md"
    />
  );
};

export default NukeButton;
