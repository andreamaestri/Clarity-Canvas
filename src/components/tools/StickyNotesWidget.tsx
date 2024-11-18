import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Rnd } from "react-rnd";
import styles from "../../styles/StickyNotesWidget.module.css";

interface StickyNote {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface StickyNotesWidgetHandles {
  addNote: () => void;
}

const StickyNotesWidget = forwardRef<StickyNotesWidgetHandles>((_, ref) => {
  const [notes, setNotes] = useState<StickyNote[]>([]);

  useImperativeHandle(ref, () => ({
    addNote,
  }));

  useEffect(() => {
    const savedNotes = localStorage.getItem("stickyNotes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote: StickyNote = {
      id: Date.now().toString(),
      text: "",
      x: 100,
      y: 100,
      width: 150,
      height: 175,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNoteContent = (id: string, text: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text } : note))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNotePositionAndSize = (
    id: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, x, y, width, height } : note
      )
    );
  };

  return (
    <div className={styles.stickyNotesContainer}>
      {notes.map((note) => (
        <Rnd
          key={note.id}
          size={{ width: note.width, height: note.height }}
          position={{ x: note.x, y: note.y }}
          onDragStop={(_, data) =>
            updateNotePositionAndSize(note.id, data.x, data.y, note.width, note.height)
          }
          onResizeStop={(_, __, ref, ___, position) =>
            updateNotePositionAndSize(
              note.id,
              position.x,
              position.y,
              parseInt(ref.style.width, 10),
              parseInt(ref.style.height, 10)
            )
          }
          bounds="window"
          minWidth={100}
          minHeight={100}
          maxWidth={window.innerWidth - 20}
          maxHeight={window.innerHeight - 120}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <div className={styles.stickyNote}>
            <textarea
              placeholder="Write your note here"
              value={note.text}
              onChange={(e) => updateNoteContent(note.id, e.target.value)}
            />
            <button onClick={() => deleteNote(note.id)} className={styles.deleteButton}>
              ✖
            </button>
          </div>
        </Rnd>
      ))}
    </div>
  );
});

export default StickyNotesWidget;
