'use client'
import Heading from "../UI/Heading";
import{RxCrossCircled} from 'react-icons/rx';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import LoginPrompt from "../components/LoginPrompt";
import getUserInfo from "../apiService/getUserInfo";
import { useRouter } from 'next/navigation';

export default function menuPage() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [position, setPosition] = useState('')
    const [loading, setLoading] = useState(true)
    const router = useRouter();
   
   
    const logout = () => {
     localStorage.removeItem("username")
     router.push('/')
    }
    useEffect(() => {
        const fetchData = async() =>{
            setLoading(true)
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);
            try{
                const res = await getUserInfo(storedUsername)
                const userInfo = res.data.userInfo
                if(userInfo.firstName) {
                    setFirstName(userInfo.firstName)
                }
                if(userInfo.lastName) {
                    setLastName(userInfo.lastName)
                }
               if(userInfo.position) {
                setPosition(userInfo.position)
               }
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }
        
        }

   fetchData()

    }, []);

    if (loading){
        return <div className="flex items-center justify-center">loading...</div>
    }


  if(!username || username.trim().length === 0) {
    return <LoginPrompt/>

  }
  


    return <div className="flex flex-col justify-center items-center mt-10 ">
    <div className="max-w-xl mx-auton shadow flex flex-col flex-1">
    <div className="flex justify-between bg-custom-blue-200 px-3 py-2">
    <Heading >BuzzBid Main Menu</Heading>
    <button onClick={logout}><RxCrossCircled className="text-white mt-1 hover:text-gray-300"/></button>
    </div>
   <div className="p-8">
        <div className="text-center">
            <div>
               Welcome, {firstName} {lastName}!
            </div>
            {
                position.trim().length > 0 &&  <div>
                Administrative postion: {position}
            </div>
            }
           
        </div>
        <div className="flex mt-3 mb-4 space-x-10">
           <div className="flex flex-col">
               <div className="underline font-bold">Auction Options</div>
               <Link href="/search-item" className="underline text-blue-900 hover:text-blue-500">Search for Items</Link>
               <Link href="/list-item" className="underline text-blue-900 hover:text-blue-500">List Item</Link>
               <Link href="/auction-results" className="underline text-blue-900 hover:text-blue-500">View Auction Results</Link>
           </div>
           {
            position.trim().length >0 && <div className="flex flex-col">
            <div className="underline font-bold">Reports</div>
            <Link href="/category-report" className="underline text-blue-900 hover:text-blue-500">Category Report</Link>
            <Link href="/user-report" className="underline text-blue-900 hover:text-blue-500">User Report</Link>
            <Link href="/top-rated-items-report" className="underline text-blue-900 hover:text-blue-500">Top Rated Items</Link>
            <Link href="/auction-stats-report" className="underline text-blue-900 hover:text-blue-500">Auction Statistics</Link>
            <Link href="/cancelled-auction-details-report" className="underline text-blue-900 hover:text-blue-500">Cancelled Auction Details</Link>
        </div>
           }
   
        </div>
   </div>
    </div>
    </div>
}