'use client'
import FormControl from "../UI/FormControl";
import Input from "../UI/FormInput";
import Heading from "../UI/Heading";
import Select from "../UI/FormSelect";
import Button from "../UI/Button";
import FlexContainer from "../UI/FlexContainer";
import Textarea from "../UI/FormTextArea";
import{RxCrossCircled} from 'react-icons/rx';
import { useEffect, useState } from "react";
import getCategory from "../apiService/getCategory";
import getCondition from "../apiService/getCondition";
import createItem from "../apiService/createItem";
import { useRouter } from 'next/navigation';
import LoginPrompt from "../components/LoginPrompt";
import Link from "next/link";

const auctionLength = [{auctionLengthId: 1, auctionLenth: 1}, {auctionLengthId: 3, auctionLenth: 3}, {auctionLengthId: 5, auctionLenth: 5}, {auctionLengthId: 7, auctionLenth: 7}]

export default function ListItemPage(){
const [itemName, setItemName] = useState("")
const [description, setDescription] = useState("")
const [category, setCategory] = useState([])
const [condition, setCondition] = useState([])
const [biddingPrice, setBiddingPrice] = useState("")
const [minSalePrice, setMinSalePrice] = useState("")
const [selectedCategory, setSelectedCategory] = useState('')
const [selectedCondition, setSelectedCondition] = useState('')
const [selectedAuctionLength, setSelectedAuctionLength] = useState("")
const [getPrice, setGetPrice] = useState('')
const [minPriceErr, setMinPriceErr] = useState('')
const [getPriceErr, setGetPriceErr] = useState('')
const [itemListErr, setItemListErr] = useState('')
const [success, setSuccess] = useState('')
const [returnable, setReturnable] = useState(false);
const router = useRouter();
const [username, setUsername] = useState('');
const [loading, setLoading] = useState(true)
const [minusBiddingPrice, setMinusBidingPrice] = useState('')
const [minusMinPrice, setMinusMinPrice] = useState('')
const [minusGetPrice, setMinusGetPrice] = useState('')

useEffect(() =>{
 const fetchInfo = async () => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
    try{
        const categoryRes = await getCategory();
        setCategory(categoryRes.categoryList)
        const conditionRes = await getCondition();
        setCondition(conditionRes.conditionList)
      
    }catch(err){
        console.error(err)
    }finally{
        setLoading(false)
    }

    
 }
 fetchInfo()
}, [])


if (loading){
    return <div className="flex items-center justify-center">loading...</div>
}

if(!username || username.trim().length === 0) {
return <LoginPrompt/>

}


const handleItemNameChange = (event) => {
    setItemName(event.target.value)
}
const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
}
const handleCategoryChange = (event) => {
setSelectedCategory(event.target.value)
}
const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value)
}
const handleBiddingPriceChange=(event) => {
    setBiddingPrice(event.target.value)
}
const handleMinSalePriceChange=(event)=> {
    setMinSalePrice(event.target.value)
}
const handleAunctionLengthChange = (event) => {
    setSelectedAuctionLength(event.target.value)
}
const handleGetPriceChnage = (event) => {
    setGetPrice(event.target.value)
}

const submitItemList = async (event) => {
event.preventDefault()
setMinusBidingPrice('')
setMinusGetPrice('')
setMinusMinPrice('')
setMinPriceErr('')
setGetPriceErr('')
if(parseFloat(biddingPrice) < 0) {
    setMinusBidingPrice('The auction bidding price should be greater than 0')
    return;
}
if(parseFloat(minSalePrice) < 0) {
    setMinusMinPrice('The minimum sale price should be greater than 0')
    return;
}
if(parseFloat(getPrice) < 0) {
    setMinusGetPrice('The get it now price should be greater than 0')
    return;
}
if(parseFloat(minSalePrice) <= parseFloat(biddingPrice)) {
    setMinPriceErr(`The Minimum sale price must be greater than ${biddingPrice}.`)
    return;
}
if(parseFloat(getPrice) <= parseFloat(minSalePrice) ) {
    setGetPriceErr(`The Get it Now price must be greater than ${minSalePrice}.`)
    return;
}
 const itemList = {
    username: username && username.trim().length > 0 && username,
    status: 'active',
    itemName: itemName,
    description: description,
    category: Number(selectedCategory),
    condition: Number(selectedCondition),
    biddingPrice: parseFloat(biddingPrice),
    minSalePrice: parseFloat(minSalePrice),
    selectedAuctionLength: Number(selectedAuctionLength),
    getPrice: getPrice.trim().length > 0 ? parseFloat(getPrice) : null,
    returnable: returnable,
 }
 try {
    const res = await createItem(itemList);
   if (res.status === 201) {
    setSuccess("Congratulations! You have successfully list item into buzzbid.")
   } else {
 setItemListErr('Failed to save item information and auction information into database')
   }
  
} catch (error) {
    console.error("Failed to submit item:", error);
 
}

}


return <div className="flex flex-col justify-center items-center mt-10">
    <div className="max-w-xl mx-auton shadow flex flex-col flex-1">
    <div className="flex justify-between bg-custom-blue-200 px-3 py-2">
    <Heading >New Item for Auction</Heading>
    <Link href="/menu"><RxCrossCircled className="text-white mt-1 hover:text-gray-300"/></Link>
    </div>
<form className="mt-3 p-6" onSubmit={submitItemList}>

    {itemListErr.trim().length > 0 &&     <div className="text-red-600 mb-4 font-bold">
        {itemListErr}
    </div> }
    {
        success.trim().length > 0 && <div className="mb-4 font-bold text-blue-900">
            {success}
        </div>
    }
    <FormControl>
        <label htmlFor="itemName">Item Name</label>
        <Input name="itemName" id="itemName" defaultValue={itemName} onChange={handleItemNameChange} type="text" required/>
    </FormControl>
    <FormControl>
        <label htmlFor="description">Description</label>
        <Textarea required name="description" id="description" rows={5} defaultValue={description} onChange={handleDescriptionChange}/>
    </FormControl>
    <FormControl>
        <label htmlFor="category">Category</label>
        <Select required={true} id="category" name="category" onChange={handleCategoryChange}  valueKey="categoryid" 
    labelKey="category_name"
    prompt="Please select a category"
 options={category} defaultSelected={selectedCategory}  />
    </FormControl>
    <FormControl>
        <label htmlFor="condition">Condition</label>
        <Select required={true} id="condition" prompt="Please select condition" name="condition" onChange={handleConditionChange}  valueKey="conditionid"  labelKey="condition_name" options={condition} defaultSelected={selectedCondition}/>
    </FormControl>
    <div className="mb-4">
    <FormControl className="mb-1">
        <label htmlFor="startBiddingPrice">
            Start auction bidding at $
        </label>
        <Input required name="startBiddingPrice" id="startBiddingPrice" type="number" defaultValue={biddingPrice} onChange={handleBiddingPriceChange}/>
    </FormControl>
    {
        minusBiddingPrice.trim().length > 0 && <div className="text-red-600">{minusBiddingPrice}</div>
    }
    </div>

    <div className='mb-4'>
    <FormControl className='mb-1'>
        <label htmlFor="minSalePrice">
            Minimum sale price $
        </label>
        <Input required name="minSalePrice" id="minSalePrice" type="number" defaultValue={minSalePrice} onChange={handleMinSalePriceChange}/>
    </FormControl>
    {
        minusMinPrice.trim().length > 0 && <div className="text-red-600">{minusMinPrice}</div>
    }
   
    {
        minPriceErr.trim().length > 0 &&  <div className="text-red-600">{minPriceErr}</div>
    }
      
    </div>
 
    <FormControl>
        <label htmlFor="auctionEnd">
            Auction ends in
        </label>
        <Select prompt="please select auction lenth" required={true} name="auctionEnd" id="auctionEnd" options={auctionLength} valueKey="auctionLengthId" labelKey="auctionLenth" onChange={handleAunctionLengthChange} defaultSelected={selectedAuctionLength}/>
    </FormControl>
    <div className="mb-4">
    <FormControl className='mb-1'>
        <label htmlFor="getItNowPrice">
            Get it Now price $
        </label>
        <Input type="number"  name="getItNowPrice" id="getItNowPrice" defaultValue={getPrice} onChange={handleGetPriceChnage} />
        <p>(Optional)</p>
    </FormControl>
    {
        minusGetPrice.trim().length > 0 &&  <div className="text-red-600">{minusGetPrice}</div>
    }
    {
        getPriceErr.trim().length > 0 &&  <div className="text-red-600">{getPriceErr}</div>
    }
   
    </div>
    <FormControl>
          <label htmlFor="returnable">Returns Accepted</label>
          <Input type="checkbox" id="returnable" name="returnable"  onChange={(e) => setReturnable(e.target.checked)} checked={returnable}/>
    </FormControl>
    <FlexContainer>
        <Button type="button"  onClick={() => router.push('/menu')}>cancel</Button>
        <Button>List My Item</Button>
    </FlexContainer>
</form>
</div>
</div>
}

