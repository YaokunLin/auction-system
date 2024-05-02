'use client'

import Heading from "../UI/Heading";
import Button from "../UI/Button";
import FlexContainer from "../UI/FlexContainer";
import FormControl from "../UI/FormControl";
import{RxCrossCircled} from 'react-icons/rx';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import getAuctionStatistics from "../apiService/getAuctionStatistics";
import getUserInfo from "../apiService/getUserInfo";
import Link from "next/link";
import LoginPrompt from "../components/LoginPrompt";
import NoAccessPrompt from "../components/NoAccessPrompt";

export default function AuctionStatisticsPage(){
    const [auctionStatistics, setAuctionStatistics] = useState(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [position, setPosition] = useState('')

    useEffect(() =>{
    const fetchInfo = async () => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);

        try{
        const auctionStatisticsRes = await getAuctionStatistics();
        setAuctionStatistics(auctionStatisticsRes);

        const res = await getUserInfo(storedUsername);
        const userInfo = res.data.userInfo;
        if(userInfo.position) {
            setPosition(userInfo.position)
        }
        }catch(err){
            console.error(err)
        }finally{
            setIsLoading(false)
        }
    }
    fetchInfo();
}, [])

if (isLoading){
    return <div className="flex items-center justify-center">loading...</div>
}

if(!username || username.trim().length === 0) {
    return <LoginPrompt/>
}

if (position.trim().length > 0){
    return <div className="flex flex-col justify-center items-center mt-10 mb-10">
                <div className="max-w-xl mx-auton shadow flex flex-col flex-1">
                    <div className="flex justify-between bg-custom-blue-200 px-3 py-2">
                        <Heading >Auction Statistics</Heading>
                        <Link href="/menu"><RxCrossCircled className="text-white mt-1 hover:text-gray-300"/></Link>
                    </div>
                    <div className="p-6">
                    {auctionStatistics && Object.keys(auctionStatistics).map(key =>
                    <div className="table-container">
                        <tr>
                            <th className="text-left pr-5">Auction Active</th>
                            <td>{auctionStatistics[key].auctionActive}</td>
                        </tr>
                        <tr>
                            <th className="text-left pr-5">Auction Finished</th>
                            <td>{auctionStatistics[key].auctionFinished}</td>
                        </tr>
                        <tr>
                            <th className="text-left pr-5">Auction Won</th>
                            <td>{auctionStatistics[key].auctionWon}</td>
                        </tr>
                        <tr>
                            <th className="text-left pr-5">Auction Cancelled</th>
                            <td>{auctionStatistics[key].auctionCancelled}</td>
                        </tr>
                        <tr>
                            <th className="text-left pr-5">Items Rated</th>
                            <td>{auctionStatistics[key].itemsRated}</td>
                        </tr>
                        <tr>
                            <th className="text-left pr-5">Items Not Rated</th>
                            <td>{auctionStatistics[key].itemsNotRated}</td>
                        </tr>
                    </div>
                    )}
                    <FlexContainer className="mt-6">
                        <Button type="button" onClick={() => router.push('/menu')}>Done</Button>
                    </FlexContainer>
                </div>
    </div>
    </div>
} else {
    return <NoAccessPrompt />
}
}