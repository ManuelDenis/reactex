import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddBook from "./Book/add_book";
import Menu from "./Menu/get_menu";
import AddComment from "./Menu/add_comment";
import AppLogin from "./Menu/login";
import Artist from "./Artist/get_artist";
import Stylist from "./Stylist/get_stylist";


const App = message => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');

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
  const handleDelete = async (id) => {
  try {
    await axios.delete(`/api/todo/${id}/`);
    getNotes();
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while deleting the note!');
  }
};
  const getNotes = async () => {
    try {
      const response = await axios.get('/api/todo/');
      const data = response.data;
    } catch (error) {
      console.error('Eroare:', error);
    }
  };

return (
  <Container className="mt-5">
    <Stylist />
  </Container>
);

};

export default App;
