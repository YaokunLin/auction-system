'use client'

import Heading from "../UI/Heading";
import Button from "../UI/Button";
import FlexContainer from "../UI/FlexContainer";
import{RxCrossCircled} from 'react-icons/rx';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import getAuctionResults from "../apiService/getAuctionResults";
import {formatCurrency, formatDate} from "../utils/utils"
import Link from 'next/link';
import LoginPrompt from "../components/LoginPrompt";

export default function CategoryReportPage(){
    const [auctionResults, setAuctionResults] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();
    const [username, setUsername] = useState('');

    useEffect(() =>{
    const fetchInfo = async () => {
        const auctionResults = await getAuctionResults();
        setAuctionResults(auctionResults);
        
    }
    setUsername(localStorage.getItem('username'));
    fetchInfo();
    setIsLoading(false)
}, [])

if (isLoading){
    return <div className="flex items-center justify-center">loading...</div>
}

if(!username || username.trim().length === 0) {
    return <LoginPrompt/>
    
}






return <div className="flex flex-col justify-center items-center mt-10 mb-10">
            <div className="max-w-xl mx-auton shadow flex flex-col flex-1">
                <div className="flex justify-between bg-custom-blue-200 px-3 py-2">
                    <Heading >Auction Results</Heading>
                    <Link href="/menu"><RxCrossCircled className="text-white mt-1 hover:text-gray-300"/></Link>
                </div>
                <div className="p-6">
                <table className="w-full text-left shadow-sm">
                    <thead className="bg-gray-300">
                    <tr>
                        <th className="underline pr-5 pl-3">ID</th>
                        <th className="underline pr-3">Item Name</th>
                        <th className="underline pr-3">Sale Price</th>
                        <th className="underline pr-3">Winner</th>
                        <th className="underline">Auction Ended</th>
                    </tr>
                    </thead>
                    <tbody>
                    {auctionResults && auctionResults.map(({itemid, sold_price, winner, item_name, end_datetime}, key) => 
                        <tr key={key} className="border-b border-gray-300">
                            <td className="py-3 pr-5 pl-3">{itemid}</td>
                            {/* <td className="py-3 pr-3">{ar.item_name}</td> */}
                            <td className="py-3 pr-3">
                            <Link href={`/item-results/${itemid}`} className="text-blue-600 underline hover:text-blue-800">
                                {item_name}
                            </Link> 
                            </td> 
                            <td className="py-3 pr-3">{formatCurrency(sold_price)}</td>
                            <td className="py-3 pr-3">{winner ? winner :"-"}</td>
                            <td className="py-3 pr-3">{formatDate(end_datetime)}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <FlexContainer className="mt-6">
                <Button type="button"  onClick={() => router.push('/menu')}>Done</Button>
            </FlexContainer>
                </div>
      
</div>
</div>
}