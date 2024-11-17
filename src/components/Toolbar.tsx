import { track, useEditor } from "tldraw";
import DrawingTools from "./tools/DrawingTools";
import CoinFlipper from "./tools/CoinFlipper";
import TimerWidget from "./tools/TimerWidget";
import PriorityListWidget from "./tools/PriorityListWidget";
import PageScroller from "./tools/PageScroller";
import NoteTool from "./tools/NoteTool";
import ModeToggle from "./tools/ModeToggle";
import { useState } from "react";
import { DraggableWidget } from "./common/DraggableWidget";
import { RiArrowUpSLine } from "react-icons/ri";
import ThemeController from "./tools/ThemeController";

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
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-base-200 shadow-lg rounded-t-xl">
          <div className="flex justify-center items-center gap-4">
            <DraggableWidget id="drawTools">
              <DrawingTools editor={editor} />
            </DraggableWidget>
            <DraggableWidget id="coinFlipper">
              <CoinFlipper />
            </DraggableWidget>
            <DraggableWidget id="timer">
              <TimerWidget />
            </DraggableWidget>
            <DraggableWidget id="priorityList">
              <PriorityListWidget />
            </DraggableWidget>
            <DraggableWidget id="pageScroller">
              <PageScroller />
            </DraggableWidget>
            <DraggableWidget id="noteTool">
              <NoteTool editor={editor} />
            </DraggableWidget>
            <DraggableWidget id="modeToggle">
              <ModeToggle mode={mode} onModeToggle={onModeToggle} />
            </DraggableWidget>
            <DraggableWidget id="themeController">
              <ThemeController />
            </DraggableWidget>
          </div>
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
