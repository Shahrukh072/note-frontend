import { useState, useEffect } from 'react';
import axios from 'axios';

const NoteList = ({ searchQuery }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const endpoint = searchQuery
          ? `http://localhost:4040/api/notes/search?q=${searchQuery}`
          : 'http://localhost:4040/api/notes/getAllNotes';

        const res = await axios.get(endpoint);
        setNotes(res.data);
      } catch (err) {
        console.error('Error fetching notes:', err.message);
      }
    };

    fetchNotes(); 
  }, [searchQuery]);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:4040/api/notes/${id}`);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err.message);
    }
  };

  if (!notes.length) return <p>No notes found.</p>;

  return (
    <div>
      {notes.map(note => (
        <div key={note._id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p><strong>Cat Fact:</strong> {note.catfact}</p>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
