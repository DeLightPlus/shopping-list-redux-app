// Register.js
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => 
  {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users', 
        { username, email, password, });

        console.log(response.status);
        if(response.status === 201)
        {
            navigate('/login');
        }
      // Redirect to login page or dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-form">
      <h2 className="form-title">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Name:
          <input type="text" value={username} onChange={(e) => setName(e.target.value)} className="form-input" />
        </label>
        {/* <br /> */}
        <label className="form-label">
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
        </label>
        {/* <br /> */}
        <label className="form-label">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
        </label>
        {/* <br /> */}
        <label className="form-label">
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input" />
        </label>
        {/* <br /> */}
        <button type="submit" className="form-button">Register</button>
      </form>
      <p className="form-text">Already have an account? <Link to="/login" className="form-link">Login</Link></p>
    </div>
  );
}

export default Register;