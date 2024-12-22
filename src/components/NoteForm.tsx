import * as React from 'react';
import { Note } from './Notes';

interface NoteFormProps {
    onSubmit: (note: Omit<Note, 'id' | 'createdAt'>) => void;
}

export function NoteForm({ onSubmit }: NoteFormProps) {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}