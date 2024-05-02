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
import getItem from "../../apiService/getItem";
import getBids from "../../apiService/getBids";
import getIsAdmin from "../../apiService/getIsAdmin";
import cancelItem from "../../apiService/cancelItem"
import updateDescribe from "../../apiService/updateDescribe"
import getCondition from "../../apiService/getCondition";
import createItem from "../../apiService/createItem";
import {formatCurrency, formatDate} from "../../utils/utils"
import Link from 'next/link';
import LoginPrompt from '../../components/LoginPrompt'
import postBid from "../../apiService/postBid"
import { useRouter } from 'next/navigation'


// const auctionLength = [{auctionLengthId: 1, auctionLenth: 1}, {auctionLengthId: 3, auctionLenth: 3}, {auctionLengthId: 5, auctionLenth: 5}, {auctionLengthId: 7, auctionLenth: 7}]

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
const [username, setUsername] = useState('');
const [minBidPrice, setMinBidPrice] = useState(0);
const [biddingPrice, setBiddingPrice] = useState(0)
const [isAdmin, setIsAdmin] = useState(false)

const [minSalePrice, setMinSalePrice] = useState("")
const [selectedCategory, setSelectedCategory] = useState('')
const [selectedCondition, setSelectedCondition] = useState('')
// const [selectedAuctionLength, setSelectedAuctionLength] = useState("")
const [getPrice, setGetPrice] = useState('')
const [minPriceErr, setMinPriceErr] = useState('')
const [getPriceErr, setGetPriceErr] = useState('')
const [itemListErr, setItemListErr] = useState('')

const router = useRouter();


 useEffect(() =>{
 const fetcItem = async () => {
    const itemRes = await getItem(itemId);
    const bidsRes = await getBids(itemId);
    

    setItemName(itemRes.item_name)
    setDescription(itemRes.item_description)
    setCategory(itemRes.category_name)
    setCondition(itemRes.condition_name)
    setReturnable(itemRes.returnable)
    setAutionEndsDt(itemRes.end_datetime)
    setListingUsername(itemRes.listing_username)
    setAuctionStatus(itemRes.status)
    setGetItNowPrice(Number(itemRes.get_it_now_price))
    setAutionEndsDt(formatDate(itemRes.end_datetime))
    if (localStorage.getItem('username')){
        const isAdminRes = await getIsAdmin(localStorage.getItem('username'));
        setIsAdmin(isAdminRes.is_admin)
    } 
    

    let tempMinBidPrice
    if (bidsRes.length == 0){
        tempMinBidPrice = -1
    } else {
        tempMinBidPrice = Number(bidsRes[0].bid_amount) + 1.0
    }

    setMinBidPrice(Math.max(tempMinBidPrice, itemRes.starting_bid_price))
    setBiddingPrice(Math.max(tempMinBidPrice, itemRes.starting_bid_price))
    

   
    /*
    setBids(bidsRes.map((bid) => {
        return ({...bid, bid_datetime: formatDate(bid.bid_datetime)})
    }))*/
 
    setBids(bidsRes)
    setIsLoading(false)
  


    
 }
 setUsername(localStorage.getItem('username'));
 fetcItem();

}, [])

const handleGetItNow = (event) => {
    event.preventDefault(); 
    postBid(itemId, getItNowPrice, username, true)
        .then(response => {
            // This block will execute if the promise is resolved
            // console.log(response);
            alert('🎉Congrats, You just Got it!🥳');
            window.location.reload(); 
        })
        .catch(error => {
            // This block will execute if the promise is rejected
            console.error(error);
            alert('❌ Error Get It Now: ' + error.message);
    });
}

const handleBidOnItem = (event) => {
    event.preventDefault(); 
    if (biddingPrice < minBidPrice ){
        alert('❌ Your bid amount < min bid price, please try again! ❌');
        return
    }

    if (getItNowPrice !== 0 && biddingPrice >= getItNowPrice){
        alert('❌ Your bid amount >= Get It Now price, please use Get It Now button!❌');
        return
    }

    postBid(itemId, biddingPrice, username, false)
    .then(response => {
        // This block will execute if the promise is resolved
        // console.log(response);
        alert('✅Bid placed successfully!✅');
        window.location.reload(); 
    })
    .catch(error => {
        // This block will execute if the promise is rejected
        console.error(error);
        alert('❌ Error placing bid: ' + error.message);
});
}

const handleBiddingPriceChange=(event) => {
    setBiddingPrice(event.target.value)
    
}

const handleCancel=(event) => {
    let cancelReason = prompt("Please enter the reason why auction needs to be canceled");
    if (cancelReason == null){
        alert('✅Cancel stopped!✅');
        return
    }
 
    cancelItem(itemId, cancelReason, username)
    .then(response => {
        // This block will execute if the promise is resolved
        // console.log(response);
        alert('Cancel successfully!✅');
        window.location.reload(); 
    })
    .catch(error => {
        // This block will execute if the promise is rejected
        console.error(error);
        alert('❌ Error canceling: ' + error.message);
});
    
}

const handleEditDescribe =(event) => {
    let itemDescribe = prompt("Please enter a new item description");
    if (itemDescribe == null){
        alert('✅Description Edit Canceled!✅');
        return
    }
    updateDescribe(itemId, itemDescribe)
    .then(response => {
        // This block will execute if the promise is resolved
        // console.log(response);
        alert('Item Description updated successfully!✅');
        window.location.reload(); 
    })
    .catch(error => {
        // This block will execute if the promise is rejected
        console.error(error);
        alert('❌ Error updating item description: ' + error.message);
}
); 
    
}

if (isLoading){
    return <div className="flex items-center justify-center">loading...</div>
}

if(!username || username.trim().length === 0) {
    return <LoginPrompt/>
    
}




return <div className="flex flex-col justify-center items-center mt-10">
            <div className="max-w-xl mx-auton shadow flex flex-col flex-1">
                <div className="flex justify-between bg-custom-blue-200 px-3 py-2">
                    <Heading >Item for Sale</Heading>
                    <RxCrossCircled className="text-white mt-1" onClick={() => {router.back();}}/>
                </div>
                {/* <form className="mt-3 p-6" >  */}
                {/* onSubmit={submitItemList} */}
                    <div className="text-red-600 mb-4">
                        {itemListErr}
                    </div>
                    <div className="flex">
                        <div className="flex space-x-6  mb-2">
                            <div>
                            Item ID 
                            </div>
                            <div className="font-bold">{itemId}</div>
                          
                       </div>
                       <div className="ml-40">
                       <Link href={`/ratings/${itemId}`} className=" text-blue-800 font-bold underline hover:text-blue-600 hover:no-underline">
                                View Ratings
                       </Link> 
                       </div>
                    </div>
          
                <div className="flex space-x-6 mb-2">
                    <div>
                    Item Name 
                    </div>
                    <div className="font-bold">{itemName}</div>
                </div>
                <div className="flex justify-end">
                    <div className="flex space-x-6 mb-2">
                        <div>
                        Description 
                        </div>
                    
                        <div className="font-bold">{description}</div>
            
                    </div>
                     <div className="ml-10">
                     {username == listingUsername ?
                        <div 
                            href={`/edit-description/${itemId}`} 
                            className="text-blue-800 font-bold underline hover:text-blue-600 hover: no=under-line cursor-pointer mr-7"
                            onClick={handleEditDescribe}   
                        >
                                Edit Description
                        </div> 
                        : 
                        <div className="w-28 min-w-30"></div>}
                    </div> 
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
                    
                    <Input  type="checkbox" id="returnable" name="returnable"  enabled={false} checked={returnable}/>
                </div>

                {getItNowPrice ? 
                    <div className="flex space-x-6 mb-2">
                        <div>
                        Get It Now Price 
                        </div>
                    
                        <div className="font-bold">{formatCurrency(getItNowPrice)}</div>
                        {auctionStatus == "active" && username !== listingUsername && <Button onClick={handleGetItNow}>Get It Now!</Button>}
                    </div>
                    : <></>
                }

                <div className="font-bold flex mb-2 space-x-6">
                    <div>
                    Auction Ends:  
                    </div>
                    <div>{autionEndsDt}</div>
                </div>

                {bids.length > 0 && 
                    <div  className="border">
                        <div className="right-0 top-0">Latest Bids</div>
                        {/*push this all the way to right*/}
                        <div className="grid grid-cols-3 gap-5 justify-between mb-2 mt-2">
                                <div className="font-bold underline">Bid Amount</div>
                                <div className="font-bold underline">Time of Bid</div>
                                <div className="font-bold underline">Username</div>
                        </div>
                        {bids.map((bid, idx) => {
                            return (
                            <div id={idx} className="grid grid-cols-3 gap-5 justify-between">
                                <div>{formatCurrency(bid.bid_amount)}</div>
                                <div>{formatDate(bid.bid_datetime)}</div>
                                <div>{bid.username}</div>
                            </div>
                            )
                        })}

                    </div>
                }
          
   
            {auctionStatus == "active" && username !== listingUsername && <div>
                <FormControl>
                        <label htmlFor="startBiddingPrice">
                            Your bid $
                        </label>
                        <Input 
                            required 
                            name="startBiddingPrice" 
                            id="startBiddingPrice" 
                            type="number" 
                            defaultValue={minBidPrice} 
                            min={minBidPrice}
                            onChange={handleBiddingPriceChange}/>
                </FormControl> 
                <div className="-mt-5 mb-5">(minimum bid {formatCurrency(minBidPrice)})</div>    
        <FlexContainer className="p-6">
            <Button onClick={() => {router.back();}}>Close</Button>
            {isAdmin && auctionStatus != "canceled"? <Button onClick={handleCancel}>Cancel This Item Item</Button>:<></>}
            {auctionStatus == "active" && username !== listingUsername && <Button onClick={handleBidOnItem}>Bid On Item</Button>}
       </FlexContainer>
            </div>}    
</div>
</div>
}

