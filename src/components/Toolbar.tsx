import React from "react";
import { track, useEditor } from "tldraw";
import { Button } from "react-aria-components";
import DrawingTools from "./tools/DrawingTools";
import CoinFlipper from "./tools/CoinFlipper";
import TimerWidget from "./tools/TimerWidget";
import PriorityListWidget from "./tools/PriorityListWidget";
import PageScroller from "./tools/PageScroller";
import ThemeController from "./tools/ThemeController";
import Logo from "./Logo";

interface ToolbarProps {
  mode: "focus" | "flex";
  onModeToggle: () => void;
}

export const Toolbar = track(({ mode, onModeToggle }: ToolbarProps) => {
  const editor = useEditor();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-100/95 shadow-xl border-t border-base-300 z-50">
      <nav className="max-w-4xl mx-auto px-4 h-28">
        <div className="flex items-center justify-between h-full">
          {/* Left Section */}
          <div className="join items-center">
            {/* Brand */}
            <div className="join-item flex items-center">
              <Logo />
              <span className="ml-2 text-primary text-lg">Clarity Canvas</span>
            </div>

            <div className="join-item divider divider-horizontal" />

            <div className="join-item">
              <DrawingTools editor={editor} />
            </div>
          </div>

          {/* Middle Section - Widgets */}
          <div className="join">
            <div className="join-item"><CoinFlipper /></div>
            <div className="join-item"><TimerWidget /></div>
            <div className="join-item"><PriorityListWidget /></div>
            <div className="join-item"><PageScroller /></div>
          </div>

          {/* Right Section */}
          <div className="join items-center">
            <Button
              type="button"
              onPress={onModeToggle}
              className="join-item btn btn-sm btn-outline"
            >
              {mode === "focus" ? "Focus Mode" : "Flex Mode"}
            </Button>
            <div className="join-item">
              <ThemeController />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
});