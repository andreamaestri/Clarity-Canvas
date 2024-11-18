import ToolButton from "../common/ToolButton";
import { RiMenuFill } from "react-icons/ri";

const MenuTool: React.FC = () => {
  // MenuTrigger is disabled by not rendering the Popover and Menu
  return <ToolButton label="Menu" icon={RiMenuFill} tooltipPosition="top" />;
};

export default MenuTool;
