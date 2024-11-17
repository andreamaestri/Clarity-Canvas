import { memo } from 'react';
import type { Editor } from 'tldraw';
import { RiEraserFill } from 'react-icons/ri';
import ToolButton from '../common/ToolButton';

interface EraserToolProps {
  editor: Editor;
}

const EraserTool = memo(({ editor }: EraserToolProps) => (
  <ToolButton
    editor={editor}
    toolId="eraser"
    label="Eraser"
    icon={RiEraserFill}
    shortcut="E"
    tooltipPosition="top"
  />
));

EraserTool.displayName = 'EraserTool';

export default EraserTool