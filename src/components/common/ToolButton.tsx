import type { FC } from 'react';
import { Button } from 'react-aria-components';
import type { Editor } from 'tldraw';
import type { IconType } from 'react-icons';

interface ToolButtonProps {
  editor?: Editor;
  toolId?: string;
  label: string;
  icon: IconType;
  shortcut?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  onPress?: () => void;
  isActive?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const PressHighlight: FC = () => (
  <span className="absolute inset-0 bg-accent opacity-50 rounded-full" />
);

const ToolButton: FC<ToolButtonProps> = ({
  editor,
  toolId,
  label,
  icon: Icon,
  shortcut,
  tooltipPosition = 'bottom',
  onPress,
  isActive: forcedIsActive,
  variant = 'ghost',
  size = 'sm'
}) => {
  const isActive = forcedIsActive ?? (editor && toolId ? editor.getCurrentToolId() === toolId : false);
  const tooltipText = shortcut ? `${label} (${shortcut})` : label;

  const handlePress = () => {
    if (editor && toolId) {
      editor.setCurrentTool(toolId);
    }
    onPress?.();
  };

  return (
    <div 
      className={`tooltip tooltip-${tooltipPosition}`} 
      data-tip={tooltipText}
    >
      <Button
        type="button"
        className={`
          relative btn btn-${size}
          ${isActive ? 'btn-primary' : `btn-${variant}`}
          flex items-center justify-center
          min-h-12 h-12 w-12
          p-2
        `}
        onPress={handlePress}
        aria-label={label}
        aria-pressed={isActive}
      >
        {({ isPressed, isHovered }) => (
          <div className="relative">
            {isPressed && <PressHighlight />}
            <Icon
              className={`
                w-6 h-6
                text-base-content
                ${isHovered ? 'bg-accent bg-opacity-20' : ''}
                ${isPressed ? 'bg-accent bg-opacity-40' : ''}
                rounded-full
                transition-colors duration-200
              `}
            />
          </div>
        )}
      </Button>
    </div>
  );
};

export default ToolButton;