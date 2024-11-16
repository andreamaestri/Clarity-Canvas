import { memo } from 'react';
import { Button } from 'react-aria-components';
import type { Editor } from 'tldraw';

interface SelectToolProps {
    editor: Editor;
}

const SelectTool = memo(({ editor }: SelectToolProps) => (
    <Button
        type="button"
        className="custom-button"
        isSelected={editor.getCurrentToolId() === 'select'}
        onPress={() => editor.setCurrentTool('select')}
    >
        Select
    </Button>
));

SelectTool.displayName = 'SelectTool';

export default SelectTool;