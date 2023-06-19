import {useEffect, useState} from "@types/react";
import axios from "axios";

const GetNotes = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const response = await axios.get('/api/todo/');
      const data = response.data;
      setNotes(data);
    } catch (error) {
      console.error('Eroare:', error);
    }
  };
  useEffect(() => {
        getNotes();
    }, []);
};

export default GetNotes;