import React from 'react'
import { useState, useEffect } from 'react';
const Flashcards  = () => {
    //Animate ellipses with useState and interval useEffect
    const [dots,setDots] = useState('...');
    useEffect(() => {
        const interval = setInterval(() => {
            if (dots === '...') {setDots('');}
            if (dots === '') {setDots('.');}
            if (dots === '.') {setDots('..');}
            if (dots === '..') {setDots('...');}
        }, 1000);
 
        return () => clearInterval(interval);
    },[dots]);
    return (
        <div className='flex h-screen'>
            <div className='flex-none w-full bg-radial-dark flex justify-center pt-60 font-extrabold'>                
                <div className='text-5xl'>Under Development {dots}</div>
            </div>            
        </div>
    )
};  

export default Flashcards