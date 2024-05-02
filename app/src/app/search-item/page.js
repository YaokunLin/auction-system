'use client'
import Heading from "../UI/Heading";
import { RxCrossCircled } from "react-icons/rx";
import FormControl from "../UI/FormControl";
import Input from "../UI/FormInput";
import { useState, useEffect } from "react";
import Select from "../UI/FormSelect";
import getCategory from "../apiService/getCategory";
import getCondition from "../apiService/getCondition";
import FlexContainer from "../UI/FlexContainer";
import Button from "../UI/Button";
import { useRouter } from 'next/navigation';
import searchItem from "../apiService/searchItem";
import Link from "next/link"; 
import LoginPrompt from "../components/LoginPrompt";



export default function SearchItemPage() {
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState([])
    const [condition, setCondition] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedCondition, setSelectedCondition] = useState('')
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    

    useEffect(() =>{
        const fetchInfo = async () => {
            setLoading(true)
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);
            try{
               const categoryRes = await getCategory();
               setCategory(categoryRes.categoryList)
               const conditionRes = await getCondition();
               setCondition(conditionRes.conditionList)
            }catch(error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
      
         
        }
        fetchInfo()
       }, [])

   const handleKeywordChange = (event) => {
        setKeyword(event.target.value)
    }
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value)
        }
    const handleMinPriceChange=(event)=> {
        setMinPrice(event.target.value)
    }
    const handleMaxPriceChange=(event)=> {
        setMaxPrice(event.target.value)
    }
    const handleConditionChange = (event) => {
        setSelectedCondition(event.target.value)
    }

    const submitSearchItem = async (event) => {
        event.preventDefault();
        const searchParams = {
            keyword: keyword.trim().length > 0 ? keyword : null,
            category: parseInt(selectedCategory) > 0 ? parseInt(selectedCategory) : null,
            minPrice: Number(minPrice) ? Number(minPrice) : null,
            maxPrice: Number(maxPrice) ? Number(maxPrice) : null,
            condition: Number(selectedCondition) ? Number(selectedCondition) : null
         }
           
        router.push(`/search-results?k=${searchParams.keyword}&c=${searchParams.category}&min=${searchParams.minPrice}&max=${searchParams.maxPrice}&condition=${searchParams.condition}`)
  
    }

    if (loading){
        return <div className="flex items-center justify-center">loading...</div>
    }

    if(!username || username.trim().length === 0) {
        return <LoginPrompt/>
    
      }
    
    return <div className="flex flex-col justify-center items-center mt-10 mb-10 ">
    <div className="max-w-2xl mx-auton shadow flex flex-col flex-1">
      
    <div className="flex justify-between bg-custom-blue-200 px-3 py-2 ">
    <Heading >Item Search</Heading>
    <Link href="/menu"><RxCrossCircled className="text-white mt-1 hover:text-gray-300"/></Link>
    </div>
    <form className="mt-3 p-6" onSubmit={submitSearchItem}>
  
       <FormControl>
       <label htmlFor="keyword">Keyword</label>
       <Input name="keyword" id="keyword" defaultValue={keyword} onChange={handleKeywordChange} type="text"/>
       </FormControl>
       <FormControl>
        <label htmlFor="category">Category</label>
        <Select  id="category" name="category" onChange={handleCategoryChange}  valueKey="categoryid" 
    labelKey="category_name"
    prompt="Please select a category"
 options={category} defaultSelected={selectedCategory}  />
    </FormControl>
    <FormControl>
        <label htmlFor="minPrice">Minimum Price $</label>
        <Input  name="minPrice" id="minPrice" type="number" defaultValue={minPrice} onChange={handleMinPriceChange}/>
    </FormControl>
    <FormControl>
        <label htmlFor="maxPrice">Maximum Price $</label>
        <Input  name="maxPrice" id="maxPrice" type="number" defaultValue={maxPrice} onChange={handleMaxPriceChange}/>
    </FormControl>
    <FormControl>
        <label htmlFor="condition">Condition at least</label>
        <Select  id="condition" prompt="Please select condition" name="condition" onChange={handleConditionChange}  valueKey="conditionid"  labelKey="condition_name" options={condition} defaultSelected={selectedCondition}/>
    </FormControl>
    <FlexContainer>
        <Button type="button"  onClick={() => router.push('/menu')}>cancel</Button>
        <Button>Search</Button>
    </FlexContainer>
    </form>
  
    </div>
    </div>
}

