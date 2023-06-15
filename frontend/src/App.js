import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';


const App = message => {
  const [books, setBooks]= useState([]);
  const [formData, setFormData] = useState({
    book_name: '',
    author: ''
  });
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');

  const editNote = async (id, title, content) => {
    try {
      await axios.put(`/api/todo/${id}/`, {title, content });
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmitBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/book/', formData);
      getBooks();
      setFormData({
        book_name: '',
        author: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the note!');
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
  useEffect(() => {
    getNotes();
    getBooks();
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
  const getBooks = async () => {
    try {
      const response = await axios.get('/api/book/');
      const data = response.data;
      setBooks(data);
    } catch (error) {
      console.error('Eroare:', error)
    }
  };

return (
  <Container className="mt-5">
    <Row className="p-3" style={{background: "lightcoral", borderRadius: "25px 25px 0 0"}}>
      <Col className="lg-6">

        <Form onSubmit={handleSubmitBook}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Book title</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="book_name"
            onChange={handleChange}
            value={formData.book_name}
            placeholder="Book name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Author name</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="author"
            onChange={handleChange}
            value={formData.author}
            placeholder="Author"
          />
        </Form.Group>
        <Button type="submit" className="button">
          Add book
        </Button>
      </Form>

      </Col>
      <Col className="lg-6">
            <h1>Books</h1>
    {books.map((book) => (
        <p>{book.book_name}</p>
    ))}
      </Col>
    </Row>

    <Row className="p-3" style={{background: "lightblue", borderRadius: '0 0 25px 25px'}}>
      <Col>
          <h1>Date preluate din Django:</h1>
          <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Note title</Form.Label>
        <Form.Control size="lg" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control size="lg" as="textarea" value={content} onChange={(e) => setContent(e.target.value)} rows={3} />
      </Form.Group>
                <Button type="submit">Adauga nota</Button>
    </Form>
      </Col>
      <Col>
            <ListGroup
        as="ol"
        className="row p-2 d-flex justify-content-between align-items-start" numbered>
      {notes.map((note) => (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={note.id}>

          {editNoteId === note.id ?
              (

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                editNote(editNoteId, editNoteTitle, editNoteContent);
              }}
            >
              <Form.Control
                  className="mb-3"
                  size="lg"
                type="text"
                value={editNoteTitle}
                onChange={(e) => setEditNoteTitle(e.target.value)}
                placeholder="Note title"
              />
              <Form.Control
                  className="mb-3"
                  size="lg"
                  type="text"
                value={editNoteContent}
                onChange={(e) => setEditNoteContent(e.target.value)}
                placeholder="Content"
              />
              <Button type="submit" className="m-2">Salvează</Button>
              <Button onClick={cancelEditNote}>Anuleaza</Button>
            </Form>

              )
              :
              (
              <div className="ms-2 me-auto">
                <div className="fw-bold">{note.title}</div>
                <div className="fw-light">{note.content}</div>
                <Button className="m-2" onClick={() => startEditNote(note.id, note.title, note.content)}>Edit</Button>
                <Button onClick={() => handleDelete(note.id)}>Sterge</Button>

              </div>
          )
          }
        </ListGroup.Item>
      ))}
    </ListGroup>
      </Col>




    </Row>

  </Container>
);

};

export default App;
