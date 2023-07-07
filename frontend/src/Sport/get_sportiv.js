import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {Button, Col, FormControl, FormGroup, Row} from "react-bootstrap";

const GetSportiv = () => {
    const [sportivs , setSportivs] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        image: null,
    });

    useEffect(() => {
        getSportivs();
    }, []);
    const getSportivs = async () => {
        try {
            const response = await axios.get('/api/sport/');
            const data = response.data;
            setSportivs(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };
    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/api/sport/`, formData, {headers: {"Content-Type": "multipart/form-data"}});
      getSportivs();
      document.getElementById("image-input").value = "";
        setFormData({
            id: "",
            name: "",
            image: null
        });
    } catch (error) {
      console.error('Error:', error.response.data);
    }
    };

    return (
        <div>
            <Row>
        {sportivs.map((spo) => (
          <Col key={spo.id} lg={4}>
            <div>
              <p>{spo.name}</p>
              <img style={{width: "100px"}} src={spo.image} alt="No Image" />
            </div>
          </Col>
        ))}
      </Row>
            <form onSubmit={handleSubmit}>
                <FormGroup>
            <FormControl
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            />
                </FormGroup>
                <FormGroup>
          <FormControl
            type="file"
            name="image"
            id="image-input"
            onChange={handleImageChange}
          />
        </FormGroup>
                <Button type="submit">Trimite</Button>
            </form>
        </div>
    )

};

export default GetSportiv;