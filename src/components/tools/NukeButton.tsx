import { RiMeteorFill } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

interface NukeButtonProps {
  onTriggerExplosion: () => void;
}

const NukeButton: React.FC<NukeButtonProps> = ({ onTriggerExplosion }) => {
  return (
    <ToolButton
      label="Nuclear Option"
      icon={RiMeteorFill}
      onPress={onTriggerExplosion}
      tooltipPosition="top"
      shortcut="Alt+D"
      variant="ghost"
      size="md"
    />
  );
};

export default NukeButton;
