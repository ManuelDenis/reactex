import {useState} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {Button, Col, Container, Offcanvas, Row} from "react-bootstrap";
import {useEffect} from "react";
import LoginForm from './login'


const AddComment = () => {
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(null);
    const [name, setName] = useState(null);
    const [formData, setFormData] = useState({
        content: '',
        product: product
  });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        getCategories();
    }, []);
    const startAddComment = (p, n) => {
        setProduct(p);
        setName(n);
        handleShow();
    }
    const getCategories = async () => {
        try {
            const response = await axios.get('/api/category/');
            const data = response.data;
            setCategories(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    const handleSubmitComment = async (e) => {
    formData.product = product;
    e.preventDefault();
     try {
      await axios.post(`/api/comment/`, formData);
      handleClose();
      getCategories();
      setFormData({
        content: '',
        product: ''
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

    return (
        <div>
            <LoginForm />
            {categories.map((cat) => (
                <div>
                <h4>{cat.name}</h4>
                {cat.products.map((pro) => (
                    <div>
                    <h6>{pro.name}</h6>
        <Button onClick={() => startAddComment(pro.id, pro.name)}>Add comment</Button>

                        <div className='p-4'>
                        {pro.comments.map((com) => (
                            <div>
                                <p>({com.added}) - {com.content}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}</div>
                ))}

        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title>{name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form onSubmit={handleSubmitComment}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Adauga un review</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="content"
            onChange={handleChange}
            value={formData.content}
            placeholder="Comment"
          />
        </Form.Group>
        <Button type="submit" className="small">
          Add comment
        </Button>
      </Form>
        </Offcanvas.Body>
        </Offcanvas>

        </div>
    )
};

export default AddComment;