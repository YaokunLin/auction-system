'use client'
import FormControl from "../../UI/FormControl";
import Input from "../../UI/FormInput";
import Heading from "../../UI/Heading";
import Select from "../../UI/FormSelect";
import Button from "../../UI/Button";
import FlexContainer from "../../UI/FlexContainer";
import Textarea from "../../UI/FormTextArea";
import{RxCrossCircled} from 'react-icons/rx';
import { useEffect, useState } from "react";
import getCategory from "../../apiService/getCategory";
import getItemResults from "../../apiService/getItemResults";
import getBids from "../../apiService/getBids";
import getCondition from "../../apiService/getCondition";
import createItem from "../../apiService/createItem";
import {formatCurrency, formatDate} from "../../utils/utils"
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import LoginPrompt from "../../components/LoginPrompt";

// TODO clear these
const dummyBiddingUsername = 'dummyBiddingUsername'

const auctionLength = [{auctionLengthId: 1, auctionLenth: 1}, {auctionLengthId: 3, auctionLenth: 3}, {auctionLengthId: 5, auctionLenth: 5}, {auctionLengthId: 7, auctionLenth: 7}]

export default function ListItemPage({params}){
const itemId = params.itemId
  
const [itemName, setItemName] = useState("")
const [description, setDescription] = useState("")
const [category, setCategory] = useState("")
const [condition, setCondition] = useState("")
const [returnable, setReturnable] = useState(false)
const [getItNowPrice, setGetItNowPrice] = useState("")
const [autionEndsDt, setAutionEndsDt] = useState("")
const [listingUsername, setListingUsername] = useState("")
const [auctionStatus, setAuctionStatus] = useState("")
const [bids, setBids] = useState([])
const [isLoading, setIsLoading] = useState(true)
const [winner, setWinner] = useState(null)
const [status, setStatus] = useState(null)
const router = useRouter();
const [soldPrice, setSoldPrice] = useState(null) 
const [username, setUsername] = useState('');
const [itemListErr, setItemListErr] = useState('')


 useEffect(() =>{
 const fetcItem = async () => {
    
    const res = await getItemResults(itemId);
    const itemRes = res.item;
    
    setItemName(itemRes.item_name)
    setDescription(itemRes.item_description)
    setCategory(itemRes.category_name)
    setCondition(itemRes.condition_name)
    setReturnable(itemRes.returnable)
    setAutionEndsDt(itemRes.end_datetime)
    setListingUsername(itemRes.listingUsername)
    setAuctionStatus(itemRes.status)
    setGetItNowPrice(itemRes.get_it_now_price)
    setAutionEndsDt(formatDate(itemRes.end_datetime))
    setWinner(itemRes.winner)
    setStatus(itemRes.status)
    setSoldPrice(itemRes.sold_price)

 

    const resBids = res.bids
    if (itemRes.winner == 'Canceled'){
        resBids.unshift(
            {
                "bid_amount": "Cancelled",
                "bid_datetime": itemRes.cancel_datetime,
                "username": "Administrator"
              }
        )
    }
 
    setBids(resBids)
    setIsLoading(false)
  


    
 }
 setUsername(localStorage.getItem('username'));
 fetcItem();

}, [])

if (isLoading){
    return <div className="flex items-center justify-center">loading...</div>
}

if(!username || username.trim().length === 0) {
    return <LoginPrompt/>
    
}





return <div className="flex flex-col justify-center items-center mt-10">
            <div className="max-w-xl mx-auton shadow flex flex-col flex-1">
                <div className="flex justify-between bg-custom-blue-200 px-3 py-2">
                    <Heading >Item Results</Heading>
                    <RxCrossCircled className="text-white mt-1" onClick={() => {router.back();}}/>
                </div>
                <form className="mt-3 p-6" > 
                {/* onSubmit={submitItemList} */}
                    <div className="text-red-600 mb-4">
                        {itemListErr}
                    </div>
                <div className="flex space-x-6  mb-2 -mt-8">
                    <div>
                    Item ID 
                    </div>
                
                    <div className="font-bold">{itemId}</div>
                    <Link href={`/ratings/${itemId}`} className="text-blue-600 underline hover:text-blue-800">
                        View Ratings
                    </Link> 
                    {/*TODO: add ratings route*/}
                </div>
                <div className="flex space-x-6 mb-2">
                    <div>
                    Item Name 
                    </div>
                 
                    <div className="font-bold">{itemName}</div>
                </div>
                <div className="flex space-x-6 mb-2">
                    <div>
                    Description 
                    </div>
                  
                    <div className="font-bold">{description}</div>
                
                </div>
                <div className="flex space-x-6 mb-2">
                    <div>
                    Category 
                    </div>
                    <div className="font-bold">{category}</div>
                </div>
                <div className="flex space-x-6 mb-2">
                    <div>
                    Condition 
                    </div>
                    <div className="font-bold">{condition}</div>
                </div>
                
                <div className="mb-2 flex space-x-6">
                    <div>
                    Returns Accepted
                    </div>
                   
                    <Input type="checkbox" id="returnable" name="returnable"  enabled={false} checked={returnable}/>
                </div>

                {getItNowPrice && 
                    <div className="flex space-x-6 mb-2">
                        <div>
                        Get It Now Price 
                        </div>
                     
                        <div className="font-bold">{formatCurrency(getItNowPrice)}</div>
                        {/* {auctionStatus == "active" && dummyBiddingUsername !== listingUsername && <Button>Get It Now!</Button>} */}
                    </div>
                }

                <div className="font-bold flex space-x-6 mb-2">
                    <div>
                    Auction Ends:  
                    </div>
                
                    <div>{autionEndsDt}</div>
                </div>

                {bids.length > 0 && 
                    <div  class="border">
                        <div className="float-right pt-1 pr-2 text-xl text-blue-900"><strong>Bid History</strong></div>
                        {/*push this all the way to right*/}
                        <div className="mt-6 p-6">

                        <div className="grid grid-cols-3 gap-5 justify-between mb-2 mt-2">
                                <div className="font-bold underline">Bid Amount</div>
                                <div className="font-bold underline">Time of Bid</div>
                                <div className="font-bold underline">Username</div>
                        </div>
                        {bids.map((bid, idx) => {
                            if (winner == null && idx == 0){
                                return (
                                    <div id={idx} className="grid grid-cols-3 gap-5 justify-between bg-yellow-200">
                                        <div>{formatCurrency(bid.bid_amount)}</div>
                                        <div>{formatDate(bid.bid_datetime)}</div>
                                        <div>{bid.username}</div>
                                    </div>
                                    )
                            }

                            if (status == 'canceled' && idx == 0){
                                return (
                                    <div id={idx} className="grid grid-cols-3 gap-5 justify-between bg-red-200">
                                        <div>{bid.bid_amount}</div>
                                        <div>{formatDate(bid.bid_datetime)}</div>
                                        <div>{bid.username}</div>
                                    </div>
                                    )
                            }

                            if (bid.username == winner && bid.bid_amount == soldPrice){
                                return (
                                    <div id={idx} className="grid grid-cols-3 gap-5 justify-between bg-lime-300">
                                        <div>{formatCurrency(bid.bid_amount)}</div>
                                        <div>{formatDate(bid.bid_datetime)}</div>
                                        <div>{bid.username}</div>
                                    </div>
                                    )
                            }

                            return (
                            <div id={idx} className="grid grid-cols-3 gap-5 justify-between">
                                <div>{formatCurrency(bid.bid_amount)}</div>
                                <div>{formatDate(bid.bid_datetime)}</div>
                                <div>{bid.username}</div>
                            </div>
                            )
                        })}

                        </div>
                      

                    </div>
                }
          
   
    <FlexContainer className="mt-6">
    <Button type="button"  onClick={() => router.push('/auction-results')}>Close</Button>
</FlexContainer>
</form>

</div>
</div>
}

