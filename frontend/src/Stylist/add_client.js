import {useState} from "react";
import axios from "axios";
import {Button, Offcanvas} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useEffect} from "react";
import get_stylist from "./get_stylist";

const AddClient = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        stylist: '',
        name: '',
        appoint_date: null,
        appoint_time: null
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmitClient = async (e) => {
    e.preventDefault();
     try {
      await axios.post(`/api/client/`, formData);
      handleClose();
      setFormData({
          stylist: '',
          name: '',
          appoint_date: null,
          appoint_time: null
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the client!');
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
            <Button onClick={handleShow} style={{background: 'darkviolet', borderStyle: 'none'}}>Add client</Button>
            <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title>Adauga client</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        <Form onSubmit={handleSubmitClient}>
        <Form.Group className="mb-3">
          <Form.Label>Adauga client nou</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Client name"
          />
        </Form.Group>
        <Button type="submit" className="small">
          Add client
        </Button>
      </Form>

        </Offcanvas.Body>
        </Offcanvas>
        </div>
    )
}

export default AddClient;