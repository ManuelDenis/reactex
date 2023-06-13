import {createRoot} from "react-dom/client"
import './index.css'
import App from "./App";

const leko = createRoot(document.getElementById("root"));
leko.render(<App />)