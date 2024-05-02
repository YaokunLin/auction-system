'use client'
import Heading from "../UI/Heading";
import { RxCrossCircled } from "react-icons/rx";
import Link from "next/link";
import { useEffect, useState } from "react";
import {  useSearchParams, useRouter } from "next/navigation";
import searchItem from "../apiService/searchItem";
import { formatDate } from "../utils/utils";
import FlexContainer from "../UI/FlexContainer";
import Button from "../UI/Button";
import LoginPrompt from "../components/LoginPrompt";

export default function searchResultsPage(){
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const [searchErr, setSearchErr] = useState('')
    const [items, setItems] = useState([]);
    const [username, setUsername] = useState('');
    const router = useRouter()

    useEffect(()=> {
    const fetchResults = async () => {
        setLoading(true)
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
        try {
        const keyword= searchParams.get('k')
        const category = searchParams.get('c')
        const minPrice = searchParams.get('min')
        const maxPrice = searchParams.get('max')
        const condition = searchParams.get('condition')
    
        const criterias = {
            keyword: keyword !== 'null' ? keyword : null,
            category: category !== 'null' ? parseInt(category) : null,
            minPrice: minPrice !== 'null' ? Number(minPrice) : null,
            maxPrice: maxPrice !== 'null' ? Number(maxPrice) : null,
            condition: condition !== 'null' ?  Number(condition) : null
         }
       
            const res = await searchItem(criterias);
           if (res.status === 200) {
                setItems(res.data.searchItem)
           } else {
           setSearchErr('There is an error occured while searching item')
           }
          
        } catch (error) {
            console.error("Failed to submit item:", error);
         
        }finally{
            setLoading(false)
        }
    }

   fetchResults()
    
    }, [searchParams])


    if (loading){
        return <div className="flex items-center justify-center">loading...</div>
    }

    
  if(!username || username.trim().length === 0) {
    return <LoginPrompt/>

  }

    return <div className="flex flex-col justify-center items-center mt-10 mb-10 ">
    <div className="max-w-2xl mx-auton shadow flex flex-col flex-1">
        <div className="flex justify-between bg-custom-blue-200 px-3 py-2 mb-12 ">
        <Heading >Search Results</Heading>
        <Link href="/search-item"><RxCrossCircled className="text-white mt-1 hover:text-gray-300"/></Link>
        </div>
    <div className="px-6">
    {searchErr.trim().length > 0 &&     <div className="text-red-600 mb-4 font-bold">
        {searchErr}
    </div> }
    <table className="w-full text-left shadow-sm">
      <thead className="bg-gray-300">
        <tr>
          <th className="underline pl-3">Item ID</th>
           <th className="underline">Item Name</th>
           <th className="underline">Current Bid</th>
          <th className="underline">High Bidder</th>
          <th className="underline">Get It Now Price</th>
          <th className="underline">Auction Ends</th>
        </tr>
      </thead>
      <tbody>
        {items && items.map((item, index) => {
        const end_datetime = new Date(item.end_datetime)
        const auctionEnds = formatDate(end_datetime)
        return (
          <tr key={index} className="border-b border-gray-300">
            <td className="py-3 pl-3">{item.itemid}</td>
            <td className="py-3"><Link href={"/bid-item/" + item.itemid} className="text-blue-800 font-bold underline hover:no-underline">{item.item_name}</Link></td>
            <td className="py-3">  {item.max_bid_amount ? `$${item.max_bid_amount}` : '-'}</td>
            <td className="py-3">{item.username ? item.username : '-'}</td>
            <td className="py-3">{item.get_it_now_price ? `$${item.get_it_now_price}` : "-"}</td>
            <td className="py-3">{auctionEnds}</td>
          </tr>
        )})}
      </tbody>
    </table>
    <FlexContainer className="mt-8 mb-8">
                <Button type="button"  onClick={() => router.push('/search-item')}>Back to Search</Button>
            </FlexContainer>
        </div>

    </div>
    </div>
}