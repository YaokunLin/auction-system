'use client'

import Heading from "../UI/Heading";
import Button from "../UI/Button";
import FlexContainer from "../UI/FlexContainer";
import{RxCrossCircled} from 'react-icons/rx';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import getUserReport from "../apiService/getUserReport";
import getUserInfo from "../apiService/getUserInfo";
import LoginPrompt from "../components/LoginPrompt";
import NoAccessPrompt from "../components/NoAccessPrompt";

export default function UserReportPage(){
    const [userReport, setUserReport] = useState(null)
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [position, setPosition] = useState('')

    useEffect(() =>{
    const fetchInfo = async () => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
        
        try{
        const userReportRes = await getUserReport();
        setUserReport(userReportRes.userReportList);

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
                        <Heading >User Report</Heading>
                        <Link href="/menu"><RxCrossCircled className="text-white mt-1 hover:text-gray-300"/></Link>
                    </div>
                    <div className="p-6">
                    <table className="w-full text-left shadow-sm">
                        <tbody className="bg-gray-300">
                        <tr>
                            <th className="underline pr-5 pl-3">Username</th>
                            <th className="underline pr-3">Listed</th>
                            <th className="underline pr-3">Sold</th>
                            <th className="underline pr-3">Won</th>
                            <th className="underline pr-3">Rated</th>
                            <th className="underline pr-3">Most Frequent Condition</th>
                        </tr>
                        </tbody>
                        <tbody>
                        {userReport && userReport.map((val, key) => 
                            <tr key={key} className="border-b border-gray-300">
                                <td className="py-3 pr-5 pl-3">{val.username}</td>
                                <td className="py-3 pr-3">{val.count_listed}</td>
                                <td className="py-3 pr-3">{val.count_sold}</td>
                                <td className="py-3 pr-3">{val.count_won}</td>
                                <td className="py-3 pr-3">{val.count_rated}</td>
                                <td className="py-3 pr-3">{val.frequent_condition}</td>
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
} else {
    return <NoAccessPrompt />
}
}