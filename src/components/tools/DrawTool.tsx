import type { FC } from 'react';
import { Button } from 'react-aria-components';
import type { Editor } from 'tldraw';

interface DrawToolProps {
  editor: Editor;
}

const DrawTool: FC<DrawToolProps> = ({ editor }) => {
  return (
    <Button
      type="button"
      className="custom-button"
      onPress={() => editor.setCurrentTool('draw')}
    >
      Draw
    </Button>
  );
};

export default DrawTool;