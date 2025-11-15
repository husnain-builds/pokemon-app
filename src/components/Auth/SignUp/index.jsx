import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../redux/actions/user";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await axios.post('http://localhost:5000/signup', form);
    //   const { token, user } = res.data;

    //   // Store token (for example, in localStorage)
    //   localStorage.setItem('token', token);
    //   setMessage(`Welcome, ${user.name}! You're signed up.`);
    //   navigate('/profile');
    // } catch (err) {
    //   setMessage(err.response?.data?.message || 'Signup failed');
    // }
    try {
      dispatch(signup(form));
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
