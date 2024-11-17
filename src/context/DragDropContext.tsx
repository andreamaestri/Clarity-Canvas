import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export const DragDropProvider: React.FC<{
  children: React.ReactNode;
  onDragEnd?: (event: DragEndEvent) => void;
}> = ({ children, onDragEnd }) => {
  return (
    <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
};
