import React, { useEffect } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { useState } from 'react';
import Reader from './reader.jsx';
import Navbar  from './navbar.jsx';
import './index.css';
import Flashcards from './flashcards.jsx';
import Auth from './auth.jsx';
import Guide from './guide.jsx';
const apiURL = import.meta.env.VITE_APIURL;

const App = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetch(apiURL + '/guest', {
      method : 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
  }).then(res => res.json()).then(
    data => {setUserData(data);})
  },[])

  return (<>
    <div className= 'h-screen'>
      {(userData && window.location.pathname !== '/auth') && <Navbar userData = {userData} setUserData = {setUserData} />}
      <Routes>
        <Route path = '/reading' element = {<Reader userData={userData}/>} />
        <Route path = '/flashcards' element = {<Flashcards/>} />
        <Route path = '/auth' element = {<Auth setUserData = {setUserData}/>} />
        <Route path = '/' element = {<Guide/>} />
      </Routes>
    </div>    
  </>)
};

export default App
