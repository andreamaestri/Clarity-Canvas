import { memo, useContext } from "react";
import type { Editor } from "tldraw";
import SelectTool from "./SelectTool";
import DrawTool from "./DrawTool";
import EraserTool from "./EraserTool";
import NoteTool from "./NoteTool";
import MenuTool from "./MenuTool";
import CoinFlipper from "./CoinFlipper";
import TimerWidget from "./TimerWidget";
import PriorityListWidget from "./PriorityListWidget";
import NukeButton from "./NukeButton";
import { ToolbarContext } from "react-aria-components";

interface DrawingToolsProps {
  editor: Editor;
}

const DrawingTools = memo(({ editor }: DrawingToolsProps) => {
  const { contextValue } = useContext(ToolbarContext);
  const orientation = contextValue?.orientation;
  
  return (
    <div
      role="group"
      aria-label="Drawing Tools"
      style={{
        display: "flex",
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        gap: "8px",
      }}
    >
      <SelectTool editor={editor} />
      <DrawTool editor={editor} />
      <EraserTool editor={editor} />
      <NoteTool editor={editor} />
      <MenuTool editor={editor} />
      <CoinFlipper />
      <TimerWidget />
      <PriorityListWidget />
      <NukeButton editor={editor} />
    </div>
  );
});

DrawingTools.displayName = "DrawingTools";

export default DrawingTools;
