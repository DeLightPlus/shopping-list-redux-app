import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../redux/userSlice';

function Login() {

    const dispatch = useDispatch();
    const signedIn = useSelector((state) => state.user.signedIn);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  const handleSubmit = async (event) =>
    {
        event.preventDefault();        
        try 
        {
            const response = await dispatch( signInUser({ email, password }) );
            console.log('signin.res', response);
            if(response){ navigate('/'); }
        }
        catch (error) {  console.error(error); }
    };

    console.log('Login.signedIn', signedIn);
    if (signedIn) { navigate('/'); }

  return (
    <div className="login-form">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
        </label>
        {/* <br /> */}
        <label className="form-label">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
        </label>
        <br />
        <button type="submit" className="form-button">Login</button>
      </form>
      <p className="form-text">Don't have an account? <Link to="/register" className="form-link">Register</Link></p>
    </div>
  );
}

export default Login;