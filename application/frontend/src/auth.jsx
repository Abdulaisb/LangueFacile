import React from 'react'
import { useState, useEffect } from 'react';
import SignUp from './signup';
import Login from './login';

const Auth  = ({setUserData}) => {
    useEffect( () => {
        setUserData(null);
    }, []);
    return (
        <div className='flex h-screen'>
            <div className='flex-none w-full bg-gray-500 flex justify-center pt-20 space-x-20'>                
                <SignUp setUserData = {setUserData}/>
                <div className='text-white flex items-center justify-center w-60 h-80 text-8xl font-bold'>
                    Or
                </div>
                <Login setUserData = {setUserData}/>
            </div>            
        </div>
    )
};  




export default Auth