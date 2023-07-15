import {Button, Container, Offcanvas, Row, Table} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import AddClient from "./add_client";
import Form from "react-bootstrap/Form";
import {Country, City, State} from 'country-state-city';
import './index.css';
import Select from 'react-select';

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
        jud: '',
        loc: ''
    });
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);

    useEffect(() => {
        console.log(selectedCountry);
        console.log(selectedCountry?.isoCode);
        console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
        getStylist();
        getUser();
    }, ['RO']);
    const convertState = (stateName) => {
        const stateMap = {
  'Alba': 'AB',
  'Arad': 'AR',
  'Argeș': 'AG',
  'Bacău': 'BC',
  'Bihor': 'BH',
  'Bistrița-Năsăud': 'BN',
  'Botoșani': 'BT',
  'Brăila': 'BR',
  'Brașov': 'BV',
  'Buzău': 'BZ',
            'Bucharest': 'B',
  'Călărași': 'CL',
  'Caraș-Severin': 'CS',
  'Cluj': 'CJ',
  'Constanța': 'CT',
  'Covasna': 'CV',
  'Dâmbovița': 'DB',
  'Dolj': 'DJ',
  'Galați': 'GL',
  'Giurgiu': 'GR',
  'Gorj': 'GJ',
  'Harghita': 'HR',
  'Hunedoara': 'HD',
  'Ialomița': 'IL',
  'Iași': 'IS',
  'Ilfov': 'IF',
  'Maramureș': 'MM',
  'Mehedinți': 'MH',
  'Mureș': 'MS',
  'Neamț': 'NT',
  'Olt': 'OT',
  'Prahova': 'PH',
  'Satu Mare': 'SM',
  'Sălaj': 'SJ',
  'Sibiu': 'SB',
  'Suceava': 'SV',
  'Teleorman': 'TR',
  'Timiș': 'TM',
  'Tulcea': 'TL',
  'Vâlcea': 'VL',
  'Vaslui': 'VS',
  'Vrancea': 'VN'
};
     return stateMap[stateName.split(' County')[0]] || '';
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    const handleJudChange = (e) => {
       setFormData({
       ...formData,
       jud: e.target.value
       });
       setSelectedState(convertState(e.target.value));
    };
    const handleLocChange = (e) => {
       setFormData({
       ...formData,
       loc: e.target.value
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
    const startEditClient = (i, n, d, t, j, l) => {
        setFormData({
            id: i,
            stylist: '',
            name: n,
            appoint_date: d,
            appoint_time: t,
            jud: j,
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
       setFormData({
       ...formData,
       jud: selectedState
       });

    try {
      await axios.put(`/api/client/${formData.id}/`, formData);
        setFormData({
            id: "",
            stylist: '',
            name: "",
            appoint_date: null,
            appoint_time: null,
            jud: "",
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
                            <th>Jud/Localitate</th>
                        </tr>
                        </thead>
                        <tbody>

                                {client.map((clie) => (
                                    <tr style={{cursor: 'pointer'}} onClick={() => startEditClient(clie.id, clie.name, clie.appoint_date, clie.appoint_time, clie.jud, clie.loc)}>
                                    <td>{clie.id}</td>
                                    <td className='fw-bolder text-capitalize'>{clie.name}</td>
                                    <td>{clie.appoint_date}</td>
                                    <td>{clie.appoint_time}</td>
                                        <td><strong>{clie.loc}</strong> | <small>{clie.jud}</small></td>

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

      <Form.Group>
        <Form.Label>Judet</Form.Label>
        <Form.Control
          as="select"
          value={formData.jud}
          onChange={handleJudChange}
        >
          <option value="">Alege o opțiune</option>
          {State.getStatesOfCountry('RO').map((option) => (
            <option key={option.value} value={option.value}>{option.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Localitate</Form.Label>
        <Form.Control
          as="select"
          value={formData.loc}
          onChange={handleLocChange}
        >
          <option value="">Alege o opțiune</option>
          {City.getCitiesOfState('RO', selectedState).map((option) => (
            <option key={option.value} value={option.value}>{option.name}</option>
          ))}
        </Form.Control>
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