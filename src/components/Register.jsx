import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false); // State for terms acceptance

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors

        // Validate input
        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!termsAccepted) {
            setError('You must accept the Terms of Service');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/users', 
                { username, email, password, });
            console.log(response.status);
            if(response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-form">
            <h2 className="form-title">Register</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit} className="form">
                <label className="form-label">
                    Name:
                    <input type="text" value={username} onChange={(e) => setName(e.target.value)} className="form-input" />
                </label>
                <label className="form-label">
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                </label>
                <label className="form-label">
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
                </label>
                <label className="form-label">
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input" />
                </label>
                <label className="form-label">
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                    I accept the <Link to="/terms">Terms of Service</Link>
                </label>
                {/* <br /> */}
                <button type="submit" className="form-button">Register</button>
            </form>
            <p className="form-text">Already have an account? 
              <Link to="/login" className="form-link">Login</Link></p>
            <br />
            {/* <p><Link to="/terms">Terms of service</Link></p> */}
        </div>
    );
}

export default Register;