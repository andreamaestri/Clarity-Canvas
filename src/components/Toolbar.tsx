import { track, useEditor } from "tldraw";
import DrawingTools from "./tools/DrawingTools";
import CoinFlipper from "./tools/CoinFlipper";
import TimerWidget from "./tools/TimerWidget";
import PriorityListWidget from "./tools/PriorityListWidget";
import PageScroller from "./tools/PageScroller";
import ThemeController from "./tools/ThemeController";
import Logo from "./Logo";
import { MdStickyNote2 } from "react-icons/md";
import ToolButton from "./common/ToolButton";

interface ToolbarProps {
  mode: "focus" | "flex";
  onModeToggle: () => void;
  onAddStickyNote: () => void; // Add Sticky Note function passed as prop
}

export const Toolbar = track(({ mode, onModeToggle, onAddStickyNote }: ToolbarProps) => {
  const editor = useEditor();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-100/95 shadow-xl border-t border-base-300 z-50">
      <nav className="max-w-4xl mx-auto px-4 h-28">
        <div className="flex items-center justify-between h-full">
          {/* Left Section */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="flex items-center">
              <Logo />
              <span className="ml-2 text-primary text-lg">Clarity Canvas</span>
            </div>
            <div className="border-l border-base-300 pl-4 flex items-center">
              <DrawingTools editor={editor} />
            </div>
          </div>

          {/* Middle Section - Widgets */}
          <div className="flex items-center space-x-2 px-4">
            <CoinFlipper />
            <TimerWidget />
            <PriorityListWidget />
            <PageScroller />
            <ToolButton
              label="Sticky Notes"
              icon={MdStickyNote2}
              variant="ghost"
              size="md"
              onPress={onAddStickyNote} // Call the add sticky note function
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button
              type="button"
              onClick={onModeToggle}
              className="btn btn-sm btn-outline"
            >
              {mode === "focus" ? "Focus Mode" : "Flex Mode"}
            </button>
            <ThemeController />
          </div>
        </div>
      </nav>
    </div>
  );
});
