import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<ProtectedRoutes element={<Home />} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </Router>
  );
}

export default App;
