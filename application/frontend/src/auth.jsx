import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from './signup';
import Login from './login';
const apiURL = import.meta.env.VITE_APIURL;

const Auth  = ({setUserData}) => {
    const navigate = useNavigate();
    const [signup, setSignup] = useState(false);
    const [msg,setMsg] = useState(null);
    useEffect( () => {
        setUserData(null);
    }, []);
    const guestLogin = () => {
        fetch(apiURL + '/guest', {
            method : 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(
          data => {setUserData(data);})
          navigate('/');        
    };  
    return (
        <div className='flex h-screen'>
            <div className='flex-none w-full bg-gray-500 flex justify-center pt-20'>                
                <div className='flex flex-col items-center'>
                    {(signup) && (<SignUp err = {setMsg} swap = {() => setSignup(false)} setUserData = {setUserData}/>)}                
                    {(!signup) && (<Login err = {setMsg} swap = {() => setSignup(true)} setUserData = {setUserData}/>)}
                    <div className='bg-blue-800 hover:bg-blue-600 w-11/12 rounded-lg text-center text-white mt-4 border-2 border-white py-2 cursor-pointer' onClick={guestLogin}>
                       Or Continue as Guest
                    </div>
                    {(msg) && (<div className='pt-4 text-orange-600 font-bold text-3xl'>{msg}!</div>)}                       
                </div>                 
            </div>            
        </div>
    )
};  




export default Auth