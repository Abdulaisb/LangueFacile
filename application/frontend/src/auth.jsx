import React from 'react'
import { useState, useEffect } from 'react';
import SignUp from './signup';
import Login from './login';

const Auth  = ({setUserData}) => {
    const [signup, setSignup] = useState(false);
    const [msg,setMsg] = useState(null);
    useEffect( () => {
        setUserData(null);
    }, []);
    return (
        <div className='flex h-screen'>
            <div className='flex-none w-full bg-gray-500 flex justify-center pt-20'>                
                <div className='flex flex-col items-center'>
                    {(signup) && (<SignUp err = {setMsg} swap = {() => setSignup(false)} setUserData = {setUserData}/>)}                
                    {(!signup) && (<Login err = {setMsg} swap = {() => setSignup(true)} setUserData = {setUserData}/>)}
                    {(msg) && (<div className='pt-4 text-orange-600 font-bold text-3xl'>{msg}</div>)}   
                </div>                 
            </div>            
        </div>
    )
};  




export default Auth