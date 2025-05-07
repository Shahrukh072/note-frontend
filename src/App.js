import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // This function will be passed to NoteForm
  const handleNoteCreated = (newNote) => {
    console.log('New note created:', newNote);
    setRefreshKey(prev => prev + 1); 
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Cat Note App</h1>
      <NoteForm onAdd={handleNoteCreated} />
      <SearchBar onSearch={setSearchQuery} />
      <NoteList searchQuery={searchQuery} key={refreshKey} />
    </div>
  );
}

export default App;
