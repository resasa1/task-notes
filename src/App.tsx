import React, { useState } from 'react';
import { Note } from './components/Notes';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const editNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, ...updates } : note
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
           
            <h1 className="text-3xl font-bold text-gray-800">Notes App</h1>
          </div>
          <p className="mt-2 text-gray-600">Keep track of your thoughts and ideas</p>
        </div>

        <NoteForm onSubmit={addNote} />

        <div className="space-y-4">
          {notes.length === 0 ? (
            <p className="text-center text-gray-500">No notes yet. Create one above!</p>
          ) : (
            notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onEdit={editNote}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;