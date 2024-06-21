import React from 'react'
import { useState, useEffect } from 'react';
import { apiURL } from './config';

const Reader = () => {
  //Connect to API on start
  useEffect(() => {
    fetch(apiURL + '/connect').then(
      res => res.json() 
    ).then(
      data => {
        console.log('use Effect triggered')
        console.log('server message: ', data) 
      }
    )
  },[]);
  //Article Title
  const [title, setTitle] = useState('No Article');
  //Target Language Name
  const [lang1, setLang1] = useState('Target Language');
  //Native Language Name
  const [lang2, setLang2] = useState('Native Language');
  //Target Language Text
  const [text1, setText1] = useState([]);
  //Native Language Text
  const [text2, setText2] = useState([]);
  //Article URL
  const [articleURL, setArticleURL] = useState('No Link');
  //Counter useState
  const [count, setCount] = useState(0);
  //Button Press Handler
  const press = () => {
    console.log('button pressed');
    setCount(count + 1);
  };
  //Whenever count changes an article is loaded
  useEffect(() => {    
    fetch(apiURL + '/article').then(
      res => res.json() 
    ).then(
      data => {
        //console.log('server message: ', data) 
        setTitle(data.title);
        setText1(data.text1);
        setText2(data.text2);
        setLang1(data.lang1);
        setLang1(data.lang1);
        setArticleURL(data.link);
      }
    )
  }, [count]);

  return (
    <>
      <div className='flex text-white'>
        <div className='flex-none w-1/6 bg-gray-500 flex flex-col items-center text-center space-y-10'>
            <div className='flex flex-col'>
              <button>
                English Toggle
              </button>
              <button>
                New Article
              </button>
            </div>
            <div className='flex flex-col'>
              <div>
                {lang1} and/or {lang2}
              </div>
              <div href = ''>
                Article URL: {articleURL}
              </div>
            </div>
            <div className='flex align-items-end'>
              <button className=''>
                Settings Gear
              </button>
            </div>
            
          </div>
          <div className = 'h-screen bg-gray-700 pt-10'>          
            <div className='bg-gray-500 border-4 border-black rounded w-4/6 h-5/6 m-auto overflow-auto p-5'>
              <button onClick={press}>Button</button>
              <div> Count {count}</div>
              <h1 className='text-center text-3xl font-semibold '>{title}</h1>
              {text1.map((sentence, index) =>
                <div>
                  <br></br>
                  {sentence}
                </div>
              )}
            </div>    
          </div>
          <div className='flex-none w-1/6 bg-gray-500 text-center '>
            Notepad
          </div>
      </div>      
    </>     
  )};

export default Reader