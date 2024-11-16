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
  logo: React.ReactNode;
}

export const Toolbar = track(
  ({ mode, onModeToggle, logo }: ToolbarProps) => {
    const editor = useEditor();

    return (
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 
        flex items-center gap-4 p-4 
        bg-white/95 backdrop-blur-sm 
        rounded-2xl shadow-lg 
        border border-gray-200/20
        transition-all duration-200 ease-in-out
        hover:shadow-xl z-50">
        
        {/* Brand */}
        <div className="brand font-medium text-gray-700 px-2">
          {logo}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200"></div>

        {/* Drawing Tools Section */}
        <div className="flex items-center gap-1">
          <DrawingTools editor={editor} />
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200"></div>

        {/* Widgets Section */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <CoinFlipper />
            <TimerWidget />
          </div>
          <div className="flex gap-1">
            <PriorityListWidget />
            <PageScroller />
          </div>
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200"></div>

        {/* Mode Toggle */}
        <Button
          type="button"
          onPress={onModeToggle}
          className="px-4 py-2 rounded-lg
            text-sm font-medium
            transition-colors duration-200
            bg-gray-100 hover:bg-gray-200
            text-gray-700 hover:text-gray-900"
        >
          {mode === 'focus' ? 'Focus Mode' : 'Flex Mode'}
        </Button>
      </div>
    );
  }
);