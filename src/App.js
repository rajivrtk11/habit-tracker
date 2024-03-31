import Navbar from './components/Navbar';
import SignUp from './components/auth/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/signUp"
            element={<SignUp />}
          ></Route>
          <Route
            path="/login"
            element={<SignUp />}
          ></Route>
        </Routes>
        <ToastContainer 
          position="top-center"
          autoClose={5000}
        />
      </div>
    </Router>
  );
}

export default App;
