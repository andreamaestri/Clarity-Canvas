import { useDraggable } from "@dnd-kit/core";
import { useEffect, useState } from "react";

interface DraggableWidgetProps {
  id: string;
  children: React.ReactNode;
}

export const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!isDragging && transform) {
      const newX = position.x + transform.x;
      const newY = position.y + transform.y;

      const shouldSnapBack =
        window.innerHeight - (newY + 50) < 100;

      if (shouldSnapBack) {
        setPosition({ x: 0, y: 0 });
      } else {
        setPosition({ x: newX, y: newY });
      }
    }
  }, [isDragging, position.x, position.y, transform]);

  return (
    <div 
      ref={setNodeRef} 
      className={`
        transform-gpu 
        transition-all 
        duration-200 
        ${isDragging ? 'z-50 scale-105' : 'z-0'}
      `}
      style={{
        transform: `translate3d(${position.x + (transform?.x || 0)}px, ${
          position.y + (transform?.y || 0)
        }px, 0)`,
      }}
    >
      <div 
        {...listeners} 
        {...attributes}
        className="bg-base-200 rounded-lg shadow-lg p-2 cursor-move"
      >
        {children}
      </div>
    </div>
  );
};
