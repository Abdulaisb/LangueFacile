import React from 'react'
import { useState, useEffect } from 'react';
import { apiURL } from './config';
import gear from './images/gear_icon.jpg'
import Sentence from './sentence';
import ShelfItem from './shelfItem';

const Reader = ({userData}) => {
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
  //Article ID
  const [articleID, setArticleID] = useState('No ID');
  //English toggle
  const [transOn, setTrans] = useState(false);
  //Highlight Tracker
  const [highlit, setHighlit] = useState([]);
  //Article shelf
  const [shelf, setShelf] = useState([]);
  //Loading
  const [loading, setLoading] = useState(true);
  //Whenever component is mounted
  useEffect(() => {    
    randomArticle();
  }, []);
  //Sets values
  const updateView = (data) => {
    setTitle(data.article.title);
        setText1(data.article.text1);
        setText2(data.article.text2);
        setLang1(data.article.lang1);
        setLang2(data.article.lang2);
        setArticleURL(data.article.link);
        setArticleID(data.article._id);
        let lighting = Array(text1.length).fill(false);
        for (const idx of data.lit) {
          lighting[idx] = true;
        }
        setHighlit(lighting);
        updateShelf();
        setLoading(false);
        document.getElementById('reading-box').scrollTop = 0;
  };
  //Generate Random Article
  const randomArticle = () => {
    fetch(apiURL + '/random_article', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username : userData.username})
    }).then(
      res => res.json() 
    ).then(
      data => {
        updateView(data);
      }
    )
  };
  //Specific Article
  const setArticle = (articleID) => {
    const payload = {
      username : userData.username,
      articleID : articleID
    }  
    fetch(apiURL + '/set_article', {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }).then(
      res => res.json() 
    ).then( data => {
        updateView(data);
      })
  };
  //English Toggle
  const englishToggle = () => {
    setTrans(!transOn);
  };
  const highToggle = (idx) => {
    setHighlit( prevState => {
      const newState =  [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });
  };
  const saveArticle = () => {
    //append current article id and list of highlit elements to userData
    let lit = [];
    for (let i = 0; i < highlit.length; i++) {
      if (highlit[i]) {lit.push(i);}
    }
    const payload = {
      username : userData.username,
      articleID : articleID,
      lit : lit
    }  
    fetch(apiURL + '/save_article', {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(res => {
      if (res.ok) {return res.json();}
    }).then(() => {updateShelf();});
  };
  const unsaveArticle = (articleID) => {
    const payload = {
      username : userData.username,
      articleID : articleID
    }  
    fetch(apiURL + '/unsave_article', {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(res => {
      if (res.ok) {return res.json();}
    }).then(() => {updateShelf();});
  };
  
  const updateShelf = () => {
    fetch(apiURL + '/saved_articles', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: userData.username})
    }).then(res => res.json().then( data => {
      setShelf((data));
    }))
  };
  if (loading) {
      return (<div className='h-ah bg-gray-500'></div>)
  }

  return (
    <>
      <div className='flex text-white h-ah'>        
        <div className='flex-none w-1/6 bg-gray-500 flex flex-col items-center text-center space-y-10 '>
            <div className='flex flex-col h-5/6 space-y-10 pt-10 items-center w-full'>
              
              <button onClick = {englishToggle} className='border-4 border-black rounded-2xl w-8/12 py-2 hover:bg-cyan-600'>
                Toggle Translation
              </button>
              <button onClick = {randomArticle} className='border-4 border-black rounded-2xl w-8/12 py-2 hover:bg-cyan-600'>
                New Article
              </button>
              <button onClick = {saveArticle} className='border-4 border-black rounded-2xl w-8/12 py-2 hover:bg-cyan-600'>
                Save Article
              </button>
              <div>
                Language: {lang1}
              </div>
              <a href = {articleURL} target='_blank' className='w-8/12 py-2'>
                <div className='border-4 border-black rounded-2xl hover:bg-cyan-600 py-2' >
                  Original Source
                </div>
              </a>              

            </div>
            <div className='flex align-items-end justify-end pb-6'>
              <img src = {gear} className='bg-transparent hover:animate-spin-slow w-20 cursor-pointer'  ></img>
            </div>            
          </div>

          <div className = ' bg-gray-700 pt-10'>          
            <div id = 'reading-box' className='bg-gray-600 border-4 border-black rounded w-4/6 h-5/6 m-auto overflow-auto p-5'>
              <div className='text-center text-3xl font-semibold '>{title}</div>
              <br></br>
              {text1.map((sentence, index) =>
                <div key = {index}>
                  <Sentence 
                  sentence1 = {sentence} 
                  sentence2 = {text2[index]} 
                  on = {transOn}
                  lit = {highlit[index]} 
                  litToggle = {() => highToggle(index)}
                  />
                </div>
              )}
            </div>    
          </div>
            <div className='flex-none align-middle w-1/6 bg-gray-500 text-center overflow-auto'>
                <div className='text-3xl font-bold py-6 border-b-4 border-black'>
                  Shelf
                </div>
                <div className='w-full flex flex-col items-center'>
                  {shelf.slice().reverse().map((art, index) => 
                      <ShelfItem
                        key = {art.id}
                        title = {art.title}
                        articleID = {art.id}
                        unsave = {() => unsaveArticle(art.id)}
                        setArticle = {() => setArticle(art.id)}
                      />
                  )}
                </div>
                
            </div>
      </div>      
    </>     
  )};

export default Reader