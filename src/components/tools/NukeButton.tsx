import React from "react";
import { RiMeteorFill } from "react-icons/ri";
import ToolButton from "../common/ToolButton";
import type { Editor } from "tldraw";

interface NukeButtonProps extends React.ComponentProps<'div'> {
  editor: Editor;
}

const NukeButton = ({ editor }: NukeButtonProps) => {
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
