import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button } from 'react-bootstrap';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');

  const editNote = async (id, title, content) => {
    try {
      await axios.put(`/api/todo/${id}/`, { title, content });
      alert('Nota a fost actualizată cu succes!');
      setEditNoteId(null);
      setEditNoteTitle('');
      setEditNoteContent('');
      getNotes();
    } catch (error) {
      console.error('Eroare:', error);
      alert('A apărut o eroare la actualizarea notei!');
    }
  };
  const startEditNote = (id, title, content) => {
    setEditNoteId(id);
    setEditNoteTitle(title);
    setEditNoteContent(content);
  };
  const cancelEditNote = () => {
    setEditNoteId(null);
    setEditNoteTitle('');
    setEditNoteContent('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/todo/', { title, content });
      getNotes();
      // Reinițializează conținutul formularului
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Eroare:', error);
      alert('A apărut o eroare la adăugarea notei!');
    }
  };
  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = async () => {
    try {
      const response = await axios.get('/api/todo/');
      const data = response.data;
      setNotes(data);
    } catch (error) {
      console.error('Eroare:', error);
    }
  };

return (
  <div>
    <h1>Date preluate din Django:</h1>

        <Container>
      <Row>
        <Col>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Introdu titlul notei"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Introdu conținutul notei"
            />
            <Button type="submit">Adaugă notă</Button>
          </form>
        </Col>
      </Row>
    </Container>
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          {editNoteId === note.id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editNote(editNoteId, editNoteTitle, editNoteContent);
              }}
            >
              <input
                type="text"
                value={editNoteTitle}
                onChange={(e) => setEditNoteTitle(e.target.value)}
                placeholder="Introdu titlul notei"
              />
              <textarea
                value={editNoteContent}
                onChange={(e) => setEditNoteContent(e.target.value)}
                placeholder="Introdu conținutul notei"
              />
              <button type="submit">Salvează</button>
              <button type="button" onClick={cancelEditNote}>
                Anulează
              </button>
            </form>
          ) : (
            <>
              <strong>{note.title}</strong>: {note.content}
              <button type="button" onClick={() => startEditNote(note.id, note.title, note.content)}>
                Editează
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);

};

export default App;
