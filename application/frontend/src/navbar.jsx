import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
const apiURL = import.meta.env.VITE_APIURL;

const Navbar = ({userData, setUserData}) => {
    const navigate = useNavigate();
    const log = () => {        
        navigate('/auth');      
    }
    return (
            <div className='bg-black text-white text-center h-nh flex '>
                <div className='w-1/6 text-center flex flex-col justify-center font-bold text-xl'>
                    Debutant
                </div>
                <div className='flex w-4/6 space-x-5 '>
                    <Link to = '/' className='w-1/6  hover:bg-slate-500 flex flex-col justify-center border-white border-2 rounded-t-lg border-b-0'>                        
                        Guide
                    </Link>                    
                    <Link to = '/reading' className='w-1/6  hover:bg-slate-500 flex flex-col justify-center border-white border-2 rounded-t-lg border-b-0'>                        
                        Reading
                    </Link>
                    <Link to = '/flashcards' className='w-1/6  hover:bg-slate-500 flex flex-col justify-center border-white border-2 rounded-t-lg border-b-0'> 
                        Flashcards
                    </Link>
                    
                </div>
                <div className='w-1/6 text-center flex justify-end items-center space-x-6 px-6'>
                    <div className=''>
                        {userData.name}
                    </div>
                    <div onClick = {log} className=' border-white border-2 rounded-lg h-5/6 w-20 bg-blue-700 hover:bg-blue-500 flex items-center justify-center cursor-pointer '>
                        {(userData.username === 'guest') ? 'Login' : 'Logout'}
                    </div>
                </div>    
            </div>        
    )
};

export default Navbar