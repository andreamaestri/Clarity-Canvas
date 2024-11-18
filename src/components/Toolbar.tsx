import { track, useEditor } from "tldraw";
import DrawingTools from "./tools/DrawingTools";
import CoinFlipper from "./tools/CoinFlipper";
import TimerWidget from "./tools/TimerWidget";
import PriorityListWidget from "./tools/PriorityListWidget";
import PageScroller from "./tools/PageScroller";
import NoteTool from "./tools/NoteTool";
import ModeToggle from "./tools/ModeToggle";
import NukeButton from "./tools/NukeButton";
import { useState } from "react";
import { Toolbar as AriaToolbar } from "react-aria-components";
import { RiArrowUpSLine } from "react-icons/ri";
import ThemeController from "./tools/ThemeController";
import Logo from "./Logo";

interface ToolbarProps {
  mode: "focus" | "flex";
  onModeToggle: () => void;
}

export const Toolbar = track(({ mode, onModeToggle }: ToolbarProps) => {
  const editor = useEditor();
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  return (
    <>
      {isToolbarVisible && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-base-200 shadow-lg rounded-t-xl overflow-x-auto">
          <AriaToolbar
            aria-label="Application Toolbar"
            className="flex justify-center items-center gap-4"
          >
            <div className="hidden md:flex items-center gap-2">
              <Logo className="h-8" />
              <span className="text-xl font-bold text-primary">
                Clarity Canvas
              </span>
            </div>

            {mode === "flex" && (
              <>
                <DrawingTools editor={editor} />
                <CoinFlipper />
                <TimerWidget />
                <PriorityListWidget />
                <PageScroller />
                <NoteTool editor={editor} />
                <NukeButton editor={editor} />
                <ThemeController />
              </>
            )}

            <ModeToggle mode={mode} onModeToggle={onModeToggle} />
          </AriaToolbar>
        </div>
      )}
      {!isToolbarVisible && (
        <button
          type="button"
          onClick={() => setIsToolbarVisible(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full bg-base-200 shadow-lg"
        >
          <RiArrowUpSLine size={24} className="text-base-content" />
        </button>
      )}
    </>
  );
});
