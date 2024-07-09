import React, { useEffect } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { useState } from 'react';
import Reader from './reader.jsx';
import Navbar  from './navbar.jsx';
import './index.css';
import Flashcards from './flashcards.jsx';
import Auth from './auth.jsx';

const App = () => {
  const [userData, setUserData] = useState(null);
  //Prevents accessing site without logging in
  useEffect(() => {
    setUserData(null);
  },[])
  const renderAuthRoute = () => {
    if (!userData) {
      return <Navigate to="/auth" />;
    }
  };
  return (<>
    <div className= 'h-screen'>
      {(userData && window.location.pathname !== '/auth') && <Navbar userData = {userData} setUserData = {setUserData} />}
      <Routes>
        <Route path = '/reading' element = {<Reader userData={userData}/>} />
        <Route path = '/flashcards' element = {<Flashcards/>} />
        <Route path = '/auth' element = {<Auth setUserData = {setUserData}/>} />
      </Routes>
      {renderAuthRoute()}
    </div>    
  </>)
};

export default App
