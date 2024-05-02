import Link from 'next/link';

function LoginPrompt() {
    return (
        <div className="flex justify-center items-center m-auto mt-60 text-2xl font-extrabold text-orange-600 max-w-xl">
            <div>
            Please   <Link href="/" className="text-blue-800 hover:text-blue-300 ml-2 mr-2"> login </Link> into the app before viewing the page. If you don't have an account yet, <Link className="text-blue-800 hover:text-blue-300 ml-2 mr-2" href="/register" >register</Link> account first. 
           </div>
        </div>
    
    );
}

export default LoginPrompt;
