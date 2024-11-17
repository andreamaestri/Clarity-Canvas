import { memo } from 'react';
import type { Editor } from 'tldraw';
import { RiCursorFill } from 'react-icons/ri';
import ToolButton from '../common/ToolButton';

interface SelectToolProps {
  editor: Editor;
}

const SelectTool = memo(({ editor }: SelectToolProps) => (
  <ToolButton
    editor={editor}
    toolId="select"
    label="Select"
    icon={RiCursorFill}
    shortcut="V"
    tooltipPosition="top"
  />
));

SelectTool.displayName = 'SelectTool';

export default SelectTool;