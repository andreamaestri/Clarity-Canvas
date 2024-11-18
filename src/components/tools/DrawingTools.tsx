import { memo } from "react";
import type { Editor } from "tldraw";
import SelectTool from "./SelectTool";
import DrawTool from "./DrawTool";
import EraserTool from "./EraserTool";

interface DrawingToolsProps {
  editor: Editor;
}

const DrawingTools = memo(({ editor }: DrawingToolsProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      gap: "8px",
    }}
  >
    <SelectTool editor={editor} />
    <DrawTool editor={editor} />
    <EraserTool editor={editor} />
  </div>
));

DrawingTools.displayName = "DrawingTools";

export default DrawingTools;
