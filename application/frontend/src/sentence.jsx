import React from 'react'

const Sentence = ({sentence1, sentence2, on, lit, litToggle}) => {
    
    return (
        <div onClick = {litToggle} className= {`hover:bg-gray-500 p-4 rounded-lg cursor-pointer ${lit ? 'text-pink-400 ' : 'text-white'}`}
        >
            <div className=''>
                {sentence1}    
            </div>       
            {on && 
            <div className='border-2 border-blue-400 p-2 rounded-lg mt-2'>
                {sentence2}    
            </div> } 
        </div>
    )
};

export default Sentence