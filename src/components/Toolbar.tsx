import { track, useEditor } from "tldraw";
import DrawingTools from "./tools/DrawingTools";
import { useState, useRef } from "react";
import { useToolbar } from "@react-aria/toolbar";
import { Toolbar as AriaToolbar } from "react-aria-components";
import ModeToggle from "./tools/ModeToggle";
import ThemeController from "./tools/ThemeController";
import Logo from "./Logo";
export interface ToolbarProps {
  mode: "focus" | "flex";
  onModeToggle: () => void;
  orientation: string; // Added to include 'orientation' property
}

export const Toolbar = track(({ mode, onModeToggle }: ToolbarProps) => {
  const editor = useEditor();
  const [isToolbarVisible] = useState(true);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const { toolbarProps } = useToolbar(
    {
      "aria-label": "Drawing Tools",
      orientation: "horizontal",
    },
    toolbarRef,
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
          <span className="text-xl font-bold text-primary">Clarity Canvas</span>
        </div>

        {/* Always show mode toggle */}
        <ModeToggle
          mode={mode}
          onModeToggle={onModeToggle}
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
