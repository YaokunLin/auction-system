'use client'
import Link from 'next/link';

function NoAccessPrompt() {
    return (
        <div className="flex justify-center items-center m-auto mt-60 text-2xl font-extrabold text-orange-600 max-w-xl">
            <div>
            Admin access only. 
           </div>
        </div>
    
    );
}

export default NoAccessPrompt;