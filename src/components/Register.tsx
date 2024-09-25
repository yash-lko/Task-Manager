import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';
import { User } from './interfaces/register';

const Register: React.FC = () => {
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [user, setUser] = useState<User>({
        name: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validation = () => {
        const errors: { [key: string]: string } = {};

        if (!user.name) {
            errors.name = "Enter your name";
        } else if (user.name.length < 3) {
            errors.name = "Name must be at least 3 characters long";
        } else if (!/^[A-Za-z]/.test(user.name)) {
            errors.name = "Name must start with a letter";
        }


        if (!user.phone) {
            errors.phone = "Enter your phone number";
        } else if (!/^\d{10}$/.test(user.phone)) {
            errors.phone = "Enter a valid 10-digit phone number";
        }


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
            await createUserWithEmailAndPassword(auth, user.email, user.password);

            toast.success("Welcome! Account created", {
                position: "bottom-right",
            });

            const userData = auth.currentUser;

            if (userData) {
                await setDoc(doc(db, "Users", userData.uid), {
                    name: user.name,
                    phone: user.phone,
                    email: userData.email
                });
            }

            setUser({
                name: '',
                phone: '',
                email: '',
                password: ''
            });

        } catch (e: any) {
            if (e.code === 'auth/email-already-in-use') {
                toast.error("This email is already registered!", {
                    position: "bottom-right",
                });
            } else {
                console.log(e.message);
                toast.error(e.message, {
                    position: "bottom-right",
                });
            }
        }
    };

    return (
        <>
            <div className='main mt-4'>
                <form onSubmit={handleSubmit} autoComplete="off" className="bg-light p-4 rounded shadow-sm">
                    <h3 className="text-center text-danger">Sign Up</h3>

                    <div className="mb-3">
                        <label className="text-black">First name</label>
                        <div className="input-group">
                            <span className="input-group-text text-danger"><i className="fa fa-user"></i></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                name='name'
                                onChange={handleChange}
                                value={user.name}
                            />
                        </div>
                        {error.name && <span className='text-danger'>{error.name}</span>}
                    </div>

                    <div className="mb-3">
                        <label className="text-black">Phone</label>
                        <div className="input-group">
                            <span className="input-group-text text-danger"><i className="fa fa-phone"></i></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Phone number"
                                name='phone'
                                onChange={handleChange}
                                value={user.phone}
                            />
                        </div>
                        {error.phone && <span className='text-danger'>{error.phone}</span>}
                    </div>

                    <div className="mb-3">
                        <label className="text-black">Email address</label>
                        <div className="input-group">
                            <span className="input-group-text text-danger"><i className="fa fa-envelope"></i></span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                name='email'
                                onChange={handleChange}
                                autoComplete='off'
                                value={user.email}
                            />
                        </div>
                        {error.email && <span className='text-danger'>{error.email}</span>}
                    </div>

                    <div className="mb-3">
                        <label className="text-black">Password</label>
                        <div className="input-group">
                            <span className="input-group-text text-danger"><i className="fa fa-lock"></i></span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                name='password'
                                onChange={handleChange}
                                autoComplete='off'
                                value={user.password}
                            />
                        </div>
                        {error.password && <span className='text-danger'>{error.password}</span>}
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-danger">
                            Sign Up
                        </button>
                    </div>
                    <p className="text-center mt-3 text-black">
                        Already Registered? <Link to="/login" className="text-danger">Login</Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;
