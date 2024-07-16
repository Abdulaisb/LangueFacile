import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const apiURL = import.meta.env.VITE_APIURL;

const SignUp = ({setUserData, swap, err}) => {
    const navigate = useNavigate();
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const [name,setName] = useState("");

    const nameHandler = (event) => {setName(event.target.value); };
    const userHandler = (event) => {setUser(event.target.value); };
    const passHandler = (event) => {setPass(event.target.value); };


    const clear = () => {
        setName("");
        setUser("");
        setPass("");
        err(null);
    };

    const submit = () => {
        const payload = {
            'name' : name,
            'user' : user,
            'password' : pass
        }
        fetch(apiURL + '/signup', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json()).then( data => {
            if (data === 'duplicate') {
                err('Username Already Taken');
            }
            else if (data === 'invalid') {
                err('Invalid Input');
            }
            else {
                setUserData(data);
                navigate('/');
            }
        })
    };
    return (
        <div className='border-2 rounded-lg border-white w-96 h-80'>
            <div className='flex flex-row'>
                <div className='text-3xl my-2 ml-4 font-semibold'>Sign Up</div>
                <div className='flex flex-grow justify-end pt-2 pr-2'>
                    <div onClick = {swap} className='border-2 border-black bg-purple-800 hover:bg-purple-600 rounded-xl p-2 cursor-pointer text-white'>Returning User</div>
                </div>
            </div>
            
            <div className='text-center'>
                <div>
                    <div className='text-xl'>Name:</div>
                    <input type  = 'text' onChange={nameHandler} value = {name} className='border-2 border-black rounded-lg'></input>
                </div>                        
                <div>
                    <div className='text-xl'>Username:</div>
                    <input type  = 'text' onChange={userHandler} value = {user} className='border-2 border-black rounded-lg'></input>
                </div>                        
                <div>
                    <div className='text-xl'>Password:</div>
                    <input type  = 'password' onChange={passHandler}  value = {pass} className='border-2 border-black rounded-lg'></input>
                </div>      
                <div className='flex justify-center mt-4 space-x-4'>
                    <div onClick={() => clear()} className='cursor-pointer border-2 border-black rounded-lg py-2 px-4 bg-red-500 hover:bg-red-600 '>Clear</div>    
                    <div onClick={() => submit()} className='cursor-pointer border-2 border-black rounded-lg py-2 px-4 bg-emerald-500 hover:bg-emerald-600 '>Submit</div>    
                </div>             
            </div>                    
        </div>
    )
};

export default SignUp