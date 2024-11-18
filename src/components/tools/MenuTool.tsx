import {
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  Separator,
} from "react-aria-components";
import {
  RiMenuLine,
  RiSaveLine,
  RiDownloadLine,
  RiDeleteBin2Line,
  RiUploadLine,
} from "react-icons/ri";
import { Editor, track } from "tldraw";
import ToolButton from "../common/ToolButton";

interface MenuToolProps {
  editor: Editor;
}

const MenuTool = track(({ editor }: MenuToolProps) => {
  const handleExport = async () => {
    try {
      // Get all shapes on the current page
      const shapeIds = editor.getCurrentPageShapeIds();
      if (shapeIds.size === 0) {
        alert("No shapes on the canvas");
        return;
      }

      // Create the blob
      const blob = await editor.exportImage({
        format: "png",
        background: true,
        scale: 2,
      });

      if (!blob) {
        throw new Error("Failed to export image");
      }

      // Create and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `clarity-canvas-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export image");
    }
  };

  const handleSave = () => {
    try {
      const snapshot = editor.getSnapshot();
      localStorage.setItem("canvas-data", JSON.stringify(snapshot));
      alert("Canvas saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save canvas");
    }
  };

  const handleLoad = () => {
    try {
      const savedData = localStorage.getItem("canvas-data");
      if (!savedData) {
        alert("No saved canvas found");
        return;
      }

      const snapshot = JSON.parse(savedData);
      editor.loadSnapshot(snapshot);
    } catch (error) {
      console.error("Load failed:", error);
      alert("Failed to load canvas");
    }
  };

  const handleClear = () => {
    try {
      const shapeIds = editor.getCurrentPageShapeIds();
      editor.deleteShapes([...shapeIds]);
    } catch (error) {
      console.error("Clear failed:", error);
      alert("Failed to clear canvas");
    }
  };

  return (
    <MenuTrigger>
      <ToolButton label="Menu" icon={RiMenuLine} tooltipPosition="top" />

      <Popover>
        <Menu className="p-2 bg-base-200 rounded-lg shadow-lg min-w-[200px]">
          <MenuItem
            className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-md cursor-pointer"
            onAction={handleSave}
          >
            <RiSaveLine />
            Save Canvas
          </MenuItem>

          <MenuItem
            className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-md cursor-pointer"
            onAction={handleLoad}
          >
            <RiUploadLine />
            Load Canvas
          </MenuItem>

          <MenuItem
            className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-md cursor-pointer"
            onAction={handleExport}
          >
            <RiDownloadLine />
            Export as PNG
          </MenuItem>

          <Separator className="my-2 border-base-300" />

          <MenuItem
            className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-md cursor-pointer text-error"
            onAction={handleClear}
          >
            <RiDeleteBin2Line />
            Clear Canvas
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
});

export default MenuTool;
