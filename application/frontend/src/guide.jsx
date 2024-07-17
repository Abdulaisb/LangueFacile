import React from 'react'
import { useNavigate } from 'react-router-dom';

const Guide = () => {
    const navigate = useNavigate();
    //Div on top saying welcome to Debutant
    //Beneath is div saying language learning platform
    //Left Div Fades in Describing Reader
    //Right Div Fades in Describing Flashcards
    return(       
        <div className='h-ah bg-radial-dark flex flex-col items-center w-full space-y-8'>
            <div className=' text-white text-5xl mt-4 p-2 font-bold opacity-0 animate-fade-1'>
                Welcome to Debutant
            </div>
            <div className=' text-white text-4xl p-2 font-semibold opacity-0 animate-fade-2'>
                An Interactive Language Learning Platform
            </div>
            <div className='flex w-full justify-center h-full space-x-16 text-white'>
                <div className='border-4 rounded-lg border-black w-5/12 h-5/6 flex flex-col items-center opacity-0 animate-fade-left overflow-auto'>
                    <div className='text-3xl font-semibold'>Reading</div>
                    <div className=' w-11/12 mt-4 flex flex-col space-y-8 justify-center items-center text-xl mx-auto'>
                        <div className=''>
                            Peruse hundreds of curated articles from trusted news sources
                        </div>
                        <div>
                            Toggle Translation and highlighting to customize your experience
                        </div>
                        <div>
                            Mark up text and save your annotations for callback by signing up for free
                        </div>
                        <div>
                            Access your shelf of saved articles from anywhere and at anytime
                        </div>
                        <div className='bg-purple-800 hover:bg-purple-600 border-4 border-black rounded-xl cursor-pointer w-32 text-center py-2' onClick={() => navigate('/reading')}>Go</div>
                    </div>                    
                </div>
                <div className='border-4 rounded-lg border-black w-5/12 h-5/6 flex flex-col items-center opacity-0 animate-fade-right overflow-auto'>
                    <div className='text-3xl font-semibold'>Flashcards</div>
                    <div className=' w-11/12 mt-4 flex flex-col space-y-8 justify-center items-center text-xl mx-auto'>
                        <div className=''>
                            Access a library of hundreds sets with verified translation
                        </div>        
                        <div className=''>
                            Splice and Create new study sets to personalize your learning
                        </div> 
                        <div className=''>
                            **Under Development**
                        </div>                 
                    </div>   
                </div>
            </div>
        </div>  
    )
};

export default Guide