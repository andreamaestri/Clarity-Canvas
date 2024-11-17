import { memo } from "react";
import type { Editor } from "tldraw";
import { RiPencilFill } from "react-icons/ri";
import ToolButton from "../common/ToolButton";

interface DrawToolProps {
  editor: Editor;
}

const DrawTool = memo(({ editor }: DrawToolProps) => (
  <ToolButton
    editor={editor}
    toolId="draw"
    label="Draw"
    icon={RiPencilFill}
    shortcut="D"
    tooltipPosition="top"
  />
));

DrawTool.displayName = "DrawTool";

export default DrawTool;
