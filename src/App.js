// import socketIO from'socket.io-client';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Joins from './components/Join/Joins.js';
import './App.css';
import Chat from "./components/Chat/Chat.js";
function App() {
  
  return (
   <div>
    <Router>
      <Routes>
      <Route exact path = '/'element={<Joins/>}/>
      <Route path = '/chat' element={<Chat/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
