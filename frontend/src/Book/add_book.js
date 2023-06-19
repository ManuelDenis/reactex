import {useState} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";


const AddBook = () => {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
    book_name: '',
    author: ''
  });
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getBooks();
        getUser();
    }, []);
    const getUser = async () => {
        try {
            const response = await axios.get(`/api/users/`);
            const data = response.data;
            setUser(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    const delBook = async (id) => {
        try {
            await axios.delete(`/api/book/${id}`);
            getBooks();
        } catch (error) {
            alert("The object is not deleted!")
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
    const handleSubmitBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/book/', formData);
      getBooks();
      setFormData({
          id: '',
        book_name: '',
        author: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the book!');
    }
  };
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/book/${formData.id}/`, formData);
      getBooks();
      setEdit(false);
      setFormData({id: "", book_name: "", author: ""});

    } catch (error) {
      console.error('Error:', error.response.data);
    }
    };
    const startEditNote = (id, book_name, author) => {
        setFormData({id:id, book_name: book_name, author: author});
        setEdit(true);
  };




    return (
        <div>
            <Row>
                <hr />
                <p>User: {typeof user}</p>
                <p>Conținutul obiectului: {JSON.stringify(user)}</p>
               {user ? (
      <div>
        <h2>Utilizator logat: {user.id}</h2>
        <p>Nume utilizator: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    ) : (
      <p>Utilizatorul nu este logat.</p>
    )}
                <hr />

                <Col lg={4}>
        <Form onSubmit={edit ? handleSubmit : handleSubmitBook}>
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


                <Col lg={8}>
        <div>
            <h1>Books</h1>
    {books.map((book) => (
        <div className="pt-5">
            <p>{book.author}- {book.book_name}</p>
            <p>Likes: {book.like.length}</p>

            {book.like.map((lik) => (
                <>{lik} </>
            ))}

            <Button onClick={() => delBook(book.id)}>Del</Button>
            <Button onClick={() => startEditNote(book.id, book.book_name, book.author)}>Edit</Button>
            <div>
                {book.comments.map((comm) => (
                    <>{comm.content}</>
                ))}
            </div>
        </div>

    ))}
        </div>
                </Col>


            </Row>

            <Row>

            </Row>
        </div>
    )
};

export default AddBook;