import {createRoot} from "react-dom/client"
import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";

const leko = createRoot(document.getElementById("root"));
leko.render(<App />)