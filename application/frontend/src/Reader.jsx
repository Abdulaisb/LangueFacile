import React from 'react'
import { useState, useEffect } from 'react';
import { apiURL } from './config';

const Reader = () => {
  const [count, setCount] = useState(0);

  const press = () => {
    console.log('button pressed');
    setCount(count + 1);
  };

  useEffect(() => {
    fetch(apiURL + '/connect').then(
      res => res.json() 
    ).then(
      data => {
        console.log('use Effect triggered')
        console.log('server message: ', data) 
      }
    )
    fetch(apiURL + '/article').then(
      res => res.json() 
    ).then(
      data => {
        console.log('server message: ', data) 
      }
    )
  }, [count])

  return (
      <>
        <div className='bg-red-500 text-white'>Reader</div>    
        <button onClick={press}>Button</button>
        <div>Count {count}</div>  
      </>
    
  )
};

export default Reader