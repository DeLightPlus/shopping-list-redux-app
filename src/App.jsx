import './App.css';

import Header from './components/Header.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import TermsOfService from './components/TermsOfService.jsx';

function App() 
{      
  const [showEntry, setShowEntry] = useState(false);
  
  return (
    <div className='App'>      
      <BrowserRouter>
        <Header showEntry={showEntry} setShowEntry={setShowEntry}/>
        <Routes>          
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Dashboard/>} />   
          <Route path='/terms' element={<TermsOfService/>} />                        
        </Routes>      
      </BrowserRouter>           
    </div>
  )
}

export default App
