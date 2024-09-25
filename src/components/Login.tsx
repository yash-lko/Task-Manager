import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';


interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const validation = () => {
    const errors: { [key: string]: string } = {};

    if (!user.email) {
      errors.email = "Enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!user.password) {
      errors.password = "Enter your password";
    } else {
      if (user.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      }
    }

    return errors;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validation();
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      toast.success("Logged in successfully!", {
        position: "bottom-right",
      });

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (e) {
      toast.error("Invalid Credentials", {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <div className="main mt-4 d-flex justify-content-center">
        <form onSubmit={handleSubmit} autoComplete="off" className="p-4 shadow login-form">
          <h3 className="text-center mb-4" style={{ color: '#dc3545' }}>Login</h3>
          <div className="mb-3">
            <label>Email address</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fa fa-envelope" style={{ color: '#dc3545' }}></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                autoComplete="off"
                value={user.email}
              />
            </div>
            {error.email && <span className="text-danger">{error.email}</span>}
          </div>
          <div className="mb-3">
            <label>Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fa fa-lock" style={{ color: '#dc3545' }}></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                autoComplete="off"
                value={user.password}
              />
            </div>
            {error.password && <span className="text-danger">{error.password}</span>}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn" style={{ backgroundColor: '#dc3545', color: 'white' }}>
              Login
            </button>
          </div>
          <p className="forgot-password text-center mt-3">
            Don't have an account? <Link to="/register" style={{ color: '#dc3545' }}>Register</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
