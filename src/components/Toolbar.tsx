import { track, useEditor } from "tldraw";
import { Button } from "react-aria-components";
import DrawingTools from "./tools/DrawingTools";
import CoinFlipper from "./tools/CoinFlipper";
import TimerWidget from "./tools/TimerWidget";
import PriorityListWidget from "./tools/PriorityListWidget";
import PageScroller from "./tools/PageScroller";
import ThemeController from "./tools/ThemeController";
import Logo from "./Logo";
import { useState } from "react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

interface ToolbarProps {
  mode: "focus" | "flex";
  onModeToggle: () => void;
}

export const Toolbar = track(({ mode, onModeToggle }: ToolbarProps) => {
  const editor = useEditor();

  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const toggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  const toolbarClasses = `fixed transition-transform duration-300 ease-in-out bottom-0 left-0 right-0 bg-base-100/95 shadow-xl border-t border-base-300 z-50 ${
    isToolbarVisible ? "translate-y-0" : "translate-y-full"
  }`;

  const handleDragStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startY = touch.clientY;

    const handleDrag = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;

      if (diff > 50) {
        setIsToolbarVisible(false);
      } else if (diff < -50) {
        setIsToolbarVisible(true);
      }
    };

    const handleDragEnd = () => {
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchend", handleDragEnd);
    };

    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  return (
    <>
      <div className={toolbarClasses}>
        <div
          className="md:hidden absolute top-0 left-0 right-0 flex justify-center items-center cursor-pointer z-50 h-8 bg-base-100/95"
          onTouchStart={handleDragStart}
          onClick={toggleToolbar}
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-1.5 bg-base-content/20 rounded-full mb-1" />
            {isToolbarVisible ? (
              <RiArrowDownSLine className="text-base-content" size={28} />
            ) : (
              <RiArrowUpSLine className="text-base-content" size={28} />
            )}
          </div>
        </div>
        <nav className="w-full px-4 h-28 overflow-x-auto">
          <div className="flex items-center justify-center md:justify-start h-full min-w-max">
            {/* Left Section */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Brand */}
              <div className="hidden md:flex items-center">
                <Logo />
                <span className="ml-2 text-primary text-lg">
                  Clarity Canvas
                </span>
              </div>

              <div className="hidden md:flex border-l border-base-300 pl-4 items-center">
                <DrawingTools editor={editor} />
              </div>
              <div className="md:hidden">
                <DrawingTools editor={editor} />
              </div>
            </div>

            {/* Middle Section - Widgets */}
            <div className="flex items-center space-x-2 px-4 flex-shrink-0">
              <CoinFlipper />
              <TimerWidget />
              <PriorityListWidget />
              <PageScroller />
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <Button
                type="button"
                onPress={onModeToggle}
                className="btn btn-sm btn-outline"
              >
                {mode === "focus" ? "Focus Mode" : "Flex Mode"}
              </Button>
              <ThemeController />
            </div>
          </div>
        </nav>
      </div>
      {!isToolbarVisible && (
        <div
          className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-base-300 rounded-full cursor-pointer z-50 flex justify-center items-center"
          onClick={toggleToolbar}
        >
          <RiArrowUpSLine className="text-base-300" size={24} />
        </div>
      )}
    </>
  );
});
