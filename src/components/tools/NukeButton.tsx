import { RiMeteorFill } from "react-icons/ri";
import ToolButton from "../common/ToolButton";
import { useEditor } from "tldraw";

interface NukeButtonProps {
  onTriggerExplosion?: () => void;
}

const NukeButton: React.FC<NukeButtonProps> = ({ onTriggerExplosion }) => {
  const editor = useEditor();

  const handleNuke = () => {
    editor.selectAll().deleteShapes(editor.getSelectedShapeIds());
    onTriggerExplosion?.();
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
