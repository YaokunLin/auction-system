'use client'

import Heading from "../UI/Heading";
import Button from "../UI/Button";
import FlexContainer from "../UI/FlexContainer";
import{RxCrossCircled} from 'react-icons/rx';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { formatDate } from "../utils/utils";
import getCancelledAuctionDetails from "../apiService/getCancelledAuctionDetails";
import getUserInfo from "../apiService/getUserInfo";
import Link from "next/link";
import LoginPrompt from "../components/LoginPrompt";
import NoAccessPrompt from "../components/NoAccessPrompt";

export default function CancelledAuctionDetailsPage(){
    const [cancelledAuctionDetails, setCancelledAuctionDetails] = useState(null)
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('')
    const [position, setPosition] = useState('')

    useEffect(() =>{
    const fetchInfo = async () => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);

        try{
        const cancelledAuctionDetailsRes = await getCancelledAuctionDetails();
        setCancelledAuctionDetails(cancelledAuctionDetailsRes.cancelledAuctionDetailsList);

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
                        <Heading >Cancelled Auction Details</Heading>
                        <Link href="/menu"><RxCrossCircled className="text-white mt-1 hover:text-gray-300"/></Link>
                    </div>
                    <div className="p-6">
                    <table className="w-full text-left shadow-sm">
                        <tbody className="bg-gray-300">
                        <tr>
                            <th className="underline pr-3 pl-3">ID</th>
                            <th className="underline pr-3">Listed by</th>
                            <th className="underline pr-3">Cancelled Date</th>
                            <th className="underline pr-3">Reason</th>
                        </tr>
                        </tbody>
                        {cancelledAuctionDetails && cancelledAuctionDetails.map((val, key) => {
                            const end_datetime = new Date(val.end_datetime)
                            const end_datetime_fm = formatDate(end_datetime)
                            return(
                            <tbody>
                                <tr key={key} className="border-b border-gray-300">
                                    <td className="py-3 pr-3 pl-3">{val.itemid}</td>
                                    <td className="py-3 pr-3">{val.username}</td>
                                    <td className="py-3 pr-3">{end_datetime_fm}</td>
                                    <td className="py-3 pr-3">{val.cancel_reason}</td>
                                </tr>
                            </tbody>
                        )}
                        )}
                    </table>
                    <FlexContainer className="mt-6">
                    <Button type="button"  onClick={() => router.push('/menu')}>Done</Button>
                </FlexContainer>
                    </div>
            
    </div>
    </div>
} else {
    return <NoAccessPrompt />
}
}