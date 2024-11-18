import { useEffect } from "react";
import ToolButton from "../common/ToolButton";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import { track, useEditor } from "tldraw";
import DrawingTools from "../tools/DrawingTools";
import { useRef, useState } from "react";
import { useToolbar } from "@react-aria/toolbar";
import { Toolbar as AriaToolbar } from "react-aria-components";
import ThemeController from "../tools/ThemeController";
import Logo from "../Logo";

interface ModeToggleProps {
  mode: "focus" | "flex";
  onModeToggle: () => void;
  onToolVisibilityChange?: (isVisible: boolean) => void;
}

const ModeToggle = ({
  mode,
  onModeToggle,
  onToolVisibilityChange,
}: ModeToggleProps) => {
  const isFocusMode = mode === "focus";

  useEffect(() => {
    const toggleFullscreen = async () => {
      try {
        if (isFocusMode && !document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        } else if (!isFocusMode && document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (err) {
        console.error("Error toggling fullscreen:", err);
      }
    };

    // Toggle fullscreen
    toggleFullscreen();

    // Add/remove focus mode class
    document.body.classList.toggle("focus-mode", isFocusMode);

    return () => {
      document.body.classList.remove("focus-mode");
    };
  }, [isFocusMode]);

  return (
    <div className="fixed left-4 bottom-4">
      <ToolButton
        label={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
        icon={isFocusMode ? RiFullscreenExitLine : RiFullscreenLine}
        onPress={onModeToggle}
        isActive={isFocusMode}
        tooltipPosition="right"
        shortcut="F"
      />
    </div>
  );
};

interface ToolbarProps {
  mode: "focus" | "flex";
  onModeToggle: () => void;
}

export const Toolbar = track(({ mode, onModeToggle }: ToolbarProps) => {
  const editor = useEditor();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const { toolbarProps } = useToolbar(
    {
      "aria-label": "Drawing Tools",
      orientation: "horizontal",
    },
    toolbarRef
  );

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 bg-base-200 shadow-lg rounded-t-xl overflow-x-auto transition-all duration-300 ${
        !isToolbarVisible ? "opacity-0 translate-y-full" : "opacity-100"
      }`}
      ref={toolbarRef}
      {...toolbarProps}
    >
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

        {/* Always show mode toggle */}
        <ModeToggle 
          mode={mode} 
          onModeToggle={onModeToggle}
          onToolVisibilityChange={setIsToolbarVisible}
        />

        {/* Show other tools only in flex mode */}
        {isToolbarVisible && mode === "flex" && (
          <>
            <DrawingTools editor={editor} />
            <ThemeController />
          </>
        )}
      </AriaToolbar>
    </div>
  );
});

export default ModeToggle;
