import { memo, useContext } from "react";
import type { Editor } from "tldraw";
import { ToolbarContext } from "react-aria-components";
import { ToolbarProps } from "../Toolbar";
import SelectTool from "./SelectTool";
import DrawTool from "./DrawTool";
import EraserTool from "./EraserTool";
import NoteTool from "./NoteTool";
import ShapeTool from "./ShapeTool";
import TextTool from "./TextTool";
import MenuTool from "./MenuTool";
import CoinFlipper from "./CoinFlipper";
import TimerWidget from "./TimerWidget";
import PriorityListWidget from "./PriorityListWidget";
import NukeButton from "./NukeButton";

interface DrawingToolsProps {
  editor: Editor;
}

const DrawingTools = memo(({ editor }: DrawingToolsProps) => {
  const { orientation } = useContext(ToolbarContext) as ToolbarProps;

  return (
    <div
      role="group"
      aria-label="Drawing Tools"
      style={{
        display: "flex",
        flexDirection: orientation === "vertical" ? "column" : "row",
        gap: "8px",
      }}
    >
      {/* Core Drawing Tools */}
      <div className="flex gap-2">
        <SelectTool editor={editor} />
        <DrawTool editor={editor} />
        <EraserTool editor={editor} />
      </div>

      {/* Creation Tools */}
      <div className="flex gap-2">
        <ShapeTool editor={editor} />
        <TextTool editor={editor} />
        <NoteTool editor={editor} />
      </div>

      {/* Utility Tools */}
      <div className="flex gap-2">
        <NukeButton editor={editor} />
      </div>
      <div className="flex gap-2">
        <CoinFlipper />
        <TimerWidget />
        <PriorityListWidget />
      </div>
      {/* Menu & Actions */}
      <div className="flex gap-2">
        <MenuTool />
        <NukeButton editor={editor} />
      </div>
    </div>
  );
});

export default DrawingTools;
