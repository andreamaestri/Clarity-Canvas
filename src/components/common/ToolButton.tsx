import type { FC } from "react";
import { Button } from "react-aria-components";
import type { Editor } from "tldraw";
import type { IconType } from "react-icons";
import { track } from "tldraw";
import { useKeyboard, usePress } from 'react-aria';
import { useRef } from 'react';

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
    
    const handlePress = () => {
      if (editor && toolId) {
        editor.setCurrentTool(toolId);
      }
      onPress?.();
    };

    // Handle keyboard shortcuts with exact key matching
    const { keyboardProps } = useKeyboard({
      onKeyDown: (e) => {
        if (!shortcut) return;

        // Convert single letter shortcuts to match KeyboardEvent.key format
        const expectedKey = shortcut.length === 1 
          ? shortcut.toLowerCase()
          : shortcut;

        if (e.key.toLowerCase() === expectedKey) {
          e.preventDefault();
          handlePress();
          // Allow propagation for unknown keys
          return;
        }
        e.continuePropagation();
      }
    });

    // Handle press interactions
    const { pressProps } = usePress({
      onPress: handlePress
    });

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
          {...keyboardProps}
          {...pressProps}
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
  }
);

export default ToolButton;
