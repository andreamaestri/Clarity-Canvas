import type { FC } from "react";
import { Button } from "react-aria-components";
import type { Editor } from "tldraw";
import type { IconType } from "react-icons";
import { track } from "tldraw";
import { useRef, useEffect, useCallback } from "react";

interface ToolButtonProps {
  editor?: Editor;
  toolId?: string;
  label: string;
  icon: IconType;
  shortcut?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  onPress?: () => void;
  isActive?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const ToolButton: FC<ToolButtonProps> = track(
  ({
    editor,
    toolId,
    label,
    icon: Icon,
    shortcut,
    tooltipPosition = "bottom",
    onPress,
    isActive: forcedIsActive,
    variant = "ghost",
    size = "sm",
  }) => {
    const ref = useRef<HTMLButtonElement>(null);

    const handlePress = useCallback(() => {
      if (editor && toolId) {
        editor.setCurrentTool(toolId);
      }
      onPress?.();
    }, [editor, toolId, onPress]);

    // Use useEffect for global keyboard event handling
    useEffect(() => {
      if (!shortcut) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        // Convert shortcut to lowercase for case-insensitive comparison
        const key = e.key.toLowerCase();
        const targetShortcut = shortcut.toLowerCase();

        // Check if no input elements are focused
        const activeElement = document.activeElement;
        const isInputFocused =
          activeElement instanceof HTMLInputElement ||
          activeElement instanceof HTMLTextAreaElement;

        if (
          key === targetShortcut &&
          !isInputFocused &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          e.preventDefault();
          handlePress();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [shortcut, handlePress]);

    const isActive =
      forcedIsActive ??
      (editor && toolId ? editor.getCurrentToolId() === toolId : false);

    return (
      <div
        className={`tooltip tooltip-${tooltipPosition}`}
        data-tip={shortcut ? `${label} (${shortcut})` : label}
      >
        <Button
          ref={ref}
          type="button"
          aria-label={label}
          className={`relative btn btn-${size} ${
            isActive ? "btn-primary" : `btn-${variant}`
          } flex items-center justify-center min-h-12 h-12 w-12 p-2 text-base-content focus:outline-none focus:ring-2 focus:ring-primary`}
          onPress={handlePress}
          aria-pressed={isActive}
        >
          <Icon className="w-6 h-6" />
        </Button>
      </div>
    );
  },
);

export default ToolButton;
