import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({userData, setUserData}) => {

    return (
            <div className='bg-black text-white text-center h-nh flex '>
                <div className='w-1/6 text-center flex flex-col justify-center'>
                    Logo
                </div>
                <div className='flex w-4/6 space-x-5 '>                    
                    <Link to = '/reading' className='w-1/6  hover:bg-slate-500 flex flex-col justify-center border-white border-2 rounded-t-lg border-b-0'>                        
                        Reading
                    </Link>
                    <Link to = '/flashcards' className='w-1/6  hover:bg-slate-500 flex flex-col justify-center border-white border-2 rounded-t-lg border-b-0'> 
                        Flashcards
                    </Link>
                    
                </div>
                <div className='w-1/6 text-center flex flex-col justify-center'>
                    {}
                </div>    
            </div>        
    )
};

export default Navbar