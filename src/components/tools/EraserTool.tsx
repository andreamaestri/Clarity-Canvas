import type { FC } from 'react';
import { Button } from 'react-aria-components';
import type { Editor } from 'tldraw';

interface EraserToolProps {
  editor: Editor;
}

const EraserTool: FC<EraserToolProps> = ({ editor }) => {
  return (
    <Button
      type="button"
      className="custom-button"
      onPress={() => editor.setCurrentTool('eraser')}
    >
      Eraser
    </Button>
  );
};

export default EraserTool;