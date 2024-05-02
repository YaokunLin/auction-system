'use client' // 👈 use it here

import React, { useState, useEffect} from 'react';
import Heading from './UI/Heading';
import{RxCrossCircled} from 'react-icons/rx';
import FormControl from './UI/FormControl';
import Input from './UI/FormInput';
import Button from './UI/Button';
import FlexContainer from './UI/FlexContainer';
import { useRouter } from 'next/navigation';
import login from './apiService/login';
import Link from 'next/link';



export default function Home() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState('')
    const [userExistErr, setUserExistErr] = useState('')
    const router = useRouter();

 
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const submitLogin = async (event) => {
        event.preventDefault();
        const userCredentials = {
            username: username,
            password: password
         }
          setPasswordErr("")
          setUserExistErr('')
         const res = await login(userCredentials)
         if (res.status === 404 && res.message === 'User does not exist') {
                setUserExistErr('User does not exist.')
         }else if (res.status === 401 && res.message === 'Password is not accurate') {
            setPasswordErr('Password is not accurate')
         } else if (res.status === 200 ) {
             // Store username in localStorage
            localStorage.setItem('username', userCredentials.username);
            router.push('/menu')
         }

    }

    return (
        <main>
            <div className="flex flex-col justify-center items-center mt-10 ">
    <div className="max-w-xl mx-auton shadow flex flex-col flex-1">
    <div className="flex justify-between bg-custom-blue-200 px-3 py-2">
    <Heading >BuzzBid Login</Heading>
    <Link href="/register"><RxCrossCircled className="text-white mt-1"/></Link>
    </div>
    <form  className="mt-3 p-6" onSubmit={submitLogin}>
    {userExistErr.trim().length > 0 &&     <div className="text-red-600 mb-4 font-bold">
        {userExistErr}
    </div> }
    {passwordErr.trim().length > 0 &&     <div className="text-red-600 mb-4 font-bold">
        {passwordErr}
    </div> }
    <FormControl>
       <label htmlFor="username">Username</label>
       <Input name="username" id="username" defaultValue={username} onChange={handleUsernameChange} type="text" required/>
    </FormControl>
    <FormControl>
       <label htmlFor="password">Password</label>
       <Input name="password" id="password" defaultValue={password} onChange={handlePasswordChange} type="password" required/>
    </FormControl>
    <FlexContainer>
        <Button type="button"  onClick={() => router.push('/register')}>Register</Button>
        <Button>Login</Button>
    </FlexContainer>
    </form>

    </div>
    </div>
        </main>
    );
}
