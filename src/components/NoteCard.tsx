import React, { useState } from 'react';
import { Note } from './Notes';


interface NoteCardProps {
    note: Note;
    onDelete: (id: string) => void;
    onEdit: (id: string, updates: Partial<Note>) => void;
}

export function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);

    const handleSave = () => {
        if (!editTitle.trim() || !editContent.trim()) return;
        onEdit(note.id, { title: editTitle, content: editContent });
        setIsEditing(false);
      };

      const handleCancel = () => {
        setEditTitle(note.title);
        setEditContent(note.content);
        setIsEditing(false);
      };
    

      return (
        <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                  </button>
                  <button
                    onClick={() => onDelete(note.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{note.content}</p>
              <p className="text-sm text-gray-400">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      );
    }