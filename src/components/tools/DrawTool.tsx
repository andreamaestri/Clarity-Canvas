import type { FC } from 'react';
import { Button } from 'react-aria-components';
import type { Editor } from 'tldraw';
import { RiPencilFill } from 'react-icons/ri'; 

interface DrawToolProps {
  editor: Editor;
}

const DrawTool: FC<DrawToolProps> = ({ editor }) => {
  const isActive = editor.getCurrentToolId() === 'draw';
  
  return (
    <div className="tooltip tooltip-bottom" data-tip="Draw Tool (D)">
      <Button
        type="button"
        className={`btn btn-sm btn-ghost ${isActive ? 'btn-active' : ''}`}
        onPress={() => editor.setCurrentTool('draw')}
        aria-label="Draw Tool"
      >
        <RiPencilFill className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default DrawTool;