import { useEffect, useState } from 'react'
import { Tldraw, track, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import './custom-ui.css'
import CoinFlipperWidget from './components/CoinFlipper'
import TimerWidget from './components/TimerWidget'
import PriorityListWidget from './components/PriorityListWidget'
import PageScroller from './components/PageScroller'
import FloatingToolbar from './components/FloatingToolbar'

export default function App() {
  const [mode, setMode] = useState('focus')
  const [pageCount, setPageCount] = useState(1)

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw hideUi>
        <CustomUi 
          mode={mode} 
          setMode={setMode}
          pageCount={pageCount}
          setPageCount={setPageCount}
        />
      </Tldraw>
    </div>
  )
}

const CustomUi = track(({ mode, setMode, pageCount, setPageCount }) => {
  const editor = useEditor()

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Delete':
        case 'Backspace': 
          editor.deleteShapes(editor.getSelectedShapeIds())
          break
        case 'v': 
          editor.setCurrentTool('select')
          break
        case 'e': 
          editor.setCurrentTool('eraser')
          break
        case 'x':
        case 'p':
        case 'b':
        case 'd': 
          editor.setCurrentTool('draw')
          break
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [editor])

  return (
    <div className="custom-layout">
      <div className="custom-toolbar">
        <FloatingToolbar
          brandName="Clarity Canvas"
          mode={mode}
          onModeToggle={() => setMode(mode === 'focus' ? 'flex' : 'focus')}
        />
        <div className="tool-buttons">
          <button
            type="button"
            className="custom-button"
            data-isactive={editor.getCurrentToolId() === 'select'}
            onClick={() => editor.setCurrentTool('select')}
          >
            Select
          </button>
          <button
            type="button"
            className="custom-button"
            data-isactive={editor.getCurrentToolId() === 'draw'}
            onClick={() => editor.setCurrentTool('draw')}
          >
            Pencil
          </button>
          <button
            type="button"
            className="custom-button"
            data-isactive={editor.getCurrentToolId() === 'eraser'}
            onClick={() => editor.setCurrentTool('eraser')}
          >
            Eraser
          </button>
        </div>
      </div>
      
      <div className="widgets-container">
        <CoinFlipperWidget />
        <TimerWidget />
        <PriorityListWidget />
      </div>

      <div className="page-controls">
        <PageScroller
          pageCount={pageCount}
          onAddPage={() => setPageCount(pageCount + 1)}
          onRemovePage={() => setPageCount(Math.max(1, pageCount - 1))}
        />
      </div>
    </div>
  )
})

/* InitialSetup Component:
   When user first opens app:
     Check if first time setup needed
     Show preferences wizard if new user
     Let user pick font size from options
     Set mode (focus or normal)
     Choose colour scheme
     Set up workspace with default widgets */

/* UserSettings Component:
   On settings menu open:
     Display current preferences 
     If user toggles focus mode:
       Dim unnecessary UI elements
       Reduce animations
     Update colour schemes live as selected
     Show/hide widgets per user choice */

/* Timer Widget:
   Initialise with default pomodoro times:
     Work period = 25 mins
     Break period = 5 mins
   When timer running:
     Show countdown
     Play gentle sound at completion
     Prompt for break/resume */

/* CoinFlipper Widget:
   On click:
     Animate coin flip
     Randomly select heads/tails
     Display result with subtle animation
     Allow quick re-flip */

/* TaskTracker Component:
   On load:
     Fetch saved tasks
     Sort by priority
   When adding task:
     Get task details
     Set priority level
     Update progress indicators */

/* WhiteboardSpace Component:
   Initialize blank canvas
   For each user action:
     Assign unique colour
     Sync changes in real-time
     Keep interface clean and minimal */

/* NotificationSystem:
   Watch for updates:
     If collaboration change:
       Show subtle indicator
     If session milestone:
       Generate summary
     Use non-intrusive alerts */

/* AccessibilityWrapper:
   On component mount:
     Set up keyboard listeners
     Initialize screen reader hooks
     Configure audio/visual feedback */

/* AutoSave Controller:
   Every 30 seconds:
     Check for changes
     Save to local storage
     Update backup version
     Maintain edit history */

/* StickyNotes Widget:
   For each note:
     Enable quick text entry
     Allow drag repositioning
     Persist colour categories
     Save position and content */