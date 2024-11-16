import React from 'react';
import { track, useEditor } from 'tldraw';
import { Button } from 'react-aria-components';

import DrawingTools from './tools/DrawingTools';
import CoinFlipper from './tools/CoinFlipper';
import TimerWidget from './tools/TimerWidget';
import PriorityListWidget from './tools/PriorityListWidget';
import PageScroller from './tools/PageScroller';

interface ToolbarProps {
  mode: 'focus' | 'flex';
  onModeToggle: () => void;
  brandName: string;
}

export const Toolbar = track(
  ({ mode, onModeToggle, brandName }: ToolbarProps) => {
    const editor = useEditor();

    return (
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 p-3 bg-white bg-opacity-90 rounded-lg shadow-md z-50">
        <div className="brand text-lg font-bold">{brandName}</div>
        <DrawingTools editor={editor} />
        <div className="widgets flex gap-2">
          <CoinFlipper />
          <TimerWidget />
          <PriorityListWidget />
          <PageScroller />
        </div>
        <Button
          type="button"
          onPress={onModeToggle}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          {mode === 'focus' ? 'Focus Mode' : 'Flex Mode'}
        </Button>
      </div>
    );
  }
);