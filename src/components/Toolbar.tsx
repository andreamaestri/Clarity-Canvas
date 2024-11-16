import React from 'react';
import { track, useEditor } from 'tldraw';
import { Button } from 'react-aria-components';
import DrawingTools from './tools/DrawingTools';
import CoinFlipper from './tools/CoinFlipper';
import TimerWidget from './tools/TimerWidget';
import PriorityListWidget from './tools/PriorityListWidget';
import PageScroller from './tools/PageScroller';
import ThemeController from './tools/ThemeController';

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
        bg-base-100 backdrop-blur-sm 
        rounded-2xl shadow-lg 
        border border-base-300
        transition-all duration-200 ease-in-out
        hover:shadow-xl z-50">
        
        {/* Brand */}
        <div className="brand font-medium text-base-content px-2">
          {logo}
        </div>

        {/* Drawing Tools */}
        <DrawingTools editor={editor} />

        {/* Widgets */}
        <div className="widgets flex gap-2">
          <CoinFlipper />
          <TimerWidget />
          <PriorityListWidget />
          <PageScroller />
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-base-300"></div>

        {/* Mode Toggle */}
        <Button
          type="button"
          onPress={onModeToggle}
          className="btn btn-sm btn-outline"
        >
          {mode === 'focus' ? 'Focus Mode' : 'Flex Mode'}
        </Button>

        {/* Theme Controller */}
        <ThemeController />
      </div>
    );
  }
);