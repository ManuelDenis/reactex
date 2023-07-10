import {Button, Col, Container, Offcanvas, Row, Table} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";
import AddClient from "./add_client";
import Form from "react-bootstrap/Form";
import './index.css'

const Stylist = () => {
    const [show, setShow] = useState(false);
    const [stylist, setStylist] = useState([]);
    const [client, setClient] = useState([]);
    const [user, setUser] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        stylist: '',
        name: '',
        appoint_date: null,
        appoint_time: null,
        loc: ''
    });


    useEffect(() => {
        getStylist();
        getUser();
    }, []);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    const getStylist = async () => {
        try {
            const response = await axios.get('/api/stylist/');
            const data = response.data;
            setUser(data[0].name);
            setStylist(data);
            setClient(data[0]["clients"]);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };

    const getUser = async () => {
        try {
            const response = await axios.get('/api/user_log/');
            const data = response.data;
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    const startEditClient = (i, n, d, t, l) => {
        setFormData({
            id: i,
            stylist: '',
            name: n,
            appoint_date: d,
            appoint_time: t,
            loc: l,
        });
        handleShow();
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/client/${id}/`);
            handleClose();
            getStylist();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the client!');
        }
    };
    const deleteAppoint = async () => {
        setFormData((formData) => ({
            ...formData,
            appoint_date: null,
            appoint_time: null,
        }));
        try {
            await axios.put(`/api/client/${formData.id}/`, formData);
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };
    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/client/${formData.id}/`, formData);
        setFormData({
            id: "",
            stylist: '',
            name: "",
            appoint_date: null,
            appoint_time: null,
            loc: ""
        });
        handleClose();
        getStylist();

    } catch (error) {
      console.error('Error:', error.response.data);
    }
    };

    return (
        <div>
            <Container>
                <Row>
                <h1 style={{color: 'coral'}}>{user}</h1>
                    <AddClient />
                </Row>
                <hr />


                <Row>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Client Name</th>
                            <th>Appointment date</th>
                            <th>Appointment time</th>
                            <th>Localitate</th>
                        </tr>
                        </thead>
                        <tbody>

                                {client.map((clie) => (
                                    <tr style={{cursor: 'pointer'}} onClick={() => startEditClient(clie.id, clie.name, clie.appoint_date, clie.appoint_time, clie.loc)}>
                                    <td>{clie.id}</td>
                                    <td className='fw-bolder text-capitalize'>{clie.name}</td>
                                    <td>{clie.appoint_date}</td>
                                    <td>{clie.appoint_time}</td>
                                    <td>{clie.loc}</td>

                                    </tr>
                                ))}

                        </tbody>
                    </Table>
                </Row>
            </Container>
            <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title>{formData.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Client name</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Client name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Appointment date</Form.Label>
          <Form.Control
            size="lg"
            type="date"
            name="appoint_date"
            onChange={handleChange}
            value={formData.appoint_date}
            placeholder="Appointment date"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Appointment time</Form.Label>
          <Form.Control
            size="lg"
            type="time"
            name="appoint_time"
            onChange={handleChange}
            value={formData.appoint_time}
            placeholder="Appointment time"
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="submit" className="button">Save</Button>
        <Button type='submit' className="button" onClick={deleteAppoint}>Cancel</Button>
        <Button style={{marginLeft: 'auto'}} className="button bg-danger" onClick={() => handleDelete(formData.id)}>Delete client</Button>
        </div>

      </Form>

        </Offcanvas.Body>
        </Offcanvas>
        </div>
    )

}

export default Stylist;