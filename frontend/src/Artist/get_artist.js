import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

const Artist = () => {
    const [artists, setArtists] = useState([]);
    const [userlog, setUserlog] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (isAuth) {getArtists()}
    }, []);
    const getArtists = async () => {
        try {
            const response = await axios.get('/api/artist/');
            const data = response.data;
            setArtists(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    const getUser = async () => {
        try {
            const response = await axios.get('/api/profile/');
            const data = response.data;
            setUserlog(data[0].name);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    const handleLogout = async () => {
        setArtists([]);
    try {
        const response = await axios.post('/api/logout/');
        } catch (error) {
        console.error('Logout error:', error);
    }}



    return (
  <div>
    <div className='pb-5'>
      User name: {userlog}<br />
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={getArtists}>Get Artists</Button>
    </div>
          <div id="artists">
              {artists.map((art) => (
                  <p key={art.user}>
                      {art.name} - {art.user}
                  </p>
              ))}
          </div>
  </div>
);


}

export default Artist;