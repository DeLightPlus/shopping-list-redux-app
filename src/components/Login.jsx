import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser  } from '../redux/userSlice';

function Login() {
    const dispatch = useDispatch();
    const signedIn = useSelector((state) => state.user.signedIn);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        if (!termsAccepted) {
            setError('You must accept the Terms of Service');
            return;
        }

        try {
            const response = await dispatch(signInUser ({ email, password }));
            console.log('signin.res', response);
            if (response) { navigate('/'); }
        } catch (error) {
            console.error(error);
            setError('Login failed. Please try again.');
        }
    };

    console.log('Login.signedIn', signedIn);
    if (signedIn) { navigate('/'); }

    return (
        <div className="login-form">
            <h2 className="form-title">Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <label className="form-label">
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                </label>
                <label className="form-label">
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
                </label>
                <label className="form-label">
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                    I accept the <Link to="/terms">Terms of Service</Link>
                </label>
                {/* <br /> */}
                <button type="submit" className="form-button">Login</button>
            </form>
            <p className="form-text">Don't have an account? <Link to="/register" className="form-link">Register</Link></p>
            {/* <br /> */}
            {/* <p><Link to="/terms">Terms of service</Link></p> */}
        </div>
    );
}

export default Login;