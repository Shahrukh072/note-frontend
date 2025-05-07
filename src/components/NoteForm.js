import { useState } from 'react';
import axios from 'axios';

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4040/api/notes/addNotes', { title, content });
      onAdd(res.data); 
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error creating note:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button type="submit">Add Note</button>
    </form>
  );
}
