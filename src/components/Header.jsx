
import './styles.css';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from '../redux/userSlice';

const Header = ({ showEntry, setShowEntry }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  const user = useSelector((state) => state.user.username);

  if(signedIn) console.log('h-signed-in', signedIn); 

  useEffect(() => 
    {
      const user = JSON.parse(sessionStorage.getItem('user'));   
      
      if(user)
      {
        console.log('header_user',user);       
        dispatch(signIn(user)); // Dispatch signIn action 
      } 
      else 
      {
        dispatch(signOut());
      }
    }, []);

  const handleLogout = () => 
  {
    // alert('trying logout');    
    dispatch(signOut());
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className='HeaderContainer'>
      <div className='HeaderTitle'>Shopping List App</div>

      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item" onClick={() => setShowEntry(false)}>
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>

          {!showEntry && !signedIn && (
            <li className="nav-item" onClick={() => setShowEntry(true)}>
              <Link to="/login" className="nav-link">Get Started</Link>
            </li>
          )}

          {console.log(signedIn)}
          {signedIn && (
            <li className="nav-item">
              <div></div>
              <Link to="/" className="nav-link">{user}</Link><br/>
               <button className='signOut' onClick={() =>  handleLogout() }>
                  Logout</button> 
            </li>
          )}
        </ul>
      </nav>

    </div>
  );
};

export default Header;