import { useRef, useState } from "react";
import { Tldraw } from "tldraw";
import { Toolbar } from "./components/Toolbar";
import StickyNotesWidget, {
  StickyNotesWidgetHandles,
} from "./components/tools/StickyNotesWidget";
import "tldraw/tldraw.css";
import "@fontsource-variable/lexend-deca/wght.css";

export default function CustomUiExample() {
  const [mode, setMode] = useState<"focus" | "flex">("focus");
  const stickyNotesRef = useRef<StickyNotesWidgetHandles>(null);

  const handleAddStickyNote = () => {
    stickyNotesRef.current?.addNote();
  };

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw hideUi>
        <StickyNotesWidget ref={stickyNotesRef} />
        <Toolbar
          mode={mode}
          onModeToggle={() => setMode(mode === "focus" ? "flex" : "focus")}
          onAddStickyNote={handleAddStickyNote}
        />
      </Tldraw>
    </div>
  );
}
