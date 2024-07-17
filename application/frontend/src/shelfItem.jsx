import React from 'react'
import { useState, useEffect } from 'react';

const ShelfItem  = ({title, unsave, setArticle, guest}) => {
    // First Several Cahracters of Title
    // Reduce Width
    // X button on the right to remove item from list (prop from parent)
    return (
        <div className='border-2 rounded-lg border-white w-11/12 mt-5 flex opacity-0 animate-fade-right'>
            {title.slice(0,35)}...
            <div onClick = {setArticle} className='w-14 h-10 rounded-lg border-2 border-black m-2 flex items-center justify-center bg-violet-600 cursor-pointer hover:bg-violet-500'>
                Set
            </div>
            {!guest && (<div onClick = {unsave} className='w-12 h-10 rounded-lg border-2 border-black m-2 flex items-center justify-center bg-red-600 cursor-pointer hover:bg-red-500'>
                X
            </div>)}
        </div>
    )
};  


export default ShelfItem