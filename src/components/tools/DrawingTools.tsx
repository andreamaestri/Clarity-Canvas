import React from 'react';
import { Editor } from 'tldraw';
import SelectTool from './SelectTool';
import DrawTool from './DrawTool';
import EraserTool from './EraserTool';

interface DrawingToolsProps {
  editor: Editor;
}

const DrawingTools: React.FC<DrawingToolsProps> = ({ editor }) => {
  return (
    <div className="drawing-tools">
      <SelectTool editor={editor} />
      <DrawTool editor={editor} />
      <EraserTool editor={editor} />
    </div>
  );
};

export default DrawingTools;