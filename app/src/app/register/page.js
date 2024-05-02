"use client";

import React, { useState } from "react";
import Heading from "../UI/Heading";
import { RxCrossCircled } from "react-icons/rx";
import FormControl from "../UI/FormControl";
import Input from "../UI/FormInput";
import Button from "../UI/Button";
import FlexContainer from "../UI/FlexContainer";
import { useRouter } from "next/navigation";
import register from "../apiService/register";
import Link from "next/link";
import LoginPrompt from "../components/LoginPrompt";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstname] = useState("");
  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const [lastName, setLastname] = useState("");
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };
  const [username, setUsername] = useState("");
  const handleUsernameChange = (event) => {
    setUserExistErr("");
    setUsername(event.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const [passwordErr, setPasswordErr] = useState("");
  const [userExistErr, setUserExistErr] = useState("");


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password.length === 0) {
      setPasswordErr("Password can't be empty");
      return;
    } else if (password != confirmPassword) {
      setPasswordErr("Password do not match");
      return;
    }

    setPasswordErr("");

    try {
      const userCredentials = {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
      };
      const res = await register(userCredentials);
      if (res.status === 201) {
        //the code here store the username in localstorage will already log user in
        localStorage.setItem("username", userCredentials.username);
        router.push('/menu')
      } else if (res.status === 409) {
        console.error(res.message);
        setUserExistErr(res.message);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }

   
    if (!firstName || firstName.trim().length === 0) {
      return <LoginPrompt />;
    }
  };
  return (
    <main>
      <div className="flex felc-col justify-center items-center t10">
        <div className="max-w-xl mx-auton shadow flex flex-col flex-1">
          <div className="flex justify-between bg-custom-blue-200 px-3 py-2">
            <Heading>Buzzbid New User Registration</Heading>
            <Link href="/">
              <RxCrossCircled className="text-white mt-1 hover:text-gray-300" />
            </Link>
          </div>

          <form className="mt-3 p-6" onSubmit={handleFormSubmit}>
            {passwordErr.trim().length > 0 && (
              <div className="text-red-600 mb-4 font-bold">{passwordErr}</div>
            )}
            {userExistErr.trim().length > 0 && (
              <div className="text-red-600 mb-4 font-bold">{userExistErr}</div>
            )}

            <FormControl className="text-left justify-between">
              <label htmlFor="firstName" className="mr-3">
                First Name
              </label>
              <Input
                name="firstName"
                id="firstName"
                defaultValue={firstName}
                onChange={handleFirstnameChange}
                type="text"
                required
              />
            </FormControl>
            <FormControl className="text-left justify-between">
              <label htmlFor="lastName" className="mr-3">
                Last Name
              </label>
              <Input
                name="lastName"
                id="lastName"
                defaultValue={lastName}
                onChange={handleLastnameChange}
                type="text"
                required
              />
            </FormControl>
            <FormControl className="text-left justify-between">
              <label htmlFor="username" className="mr-3">
                Username
              </label>
              <Input
                name="username"
                id="username"
                defaultValue={username}
                onChange={handleUsernameChange}
                type="text"
                required
              />
            </FormControl>
            <FormControl className="text-left justify-between">
              <label htmlFor="password" className="mr-3">
                Password
              </label>
              <Input
                name="password"
                id="password"
                defaultValue={password}
                onChange={handlePasswordChange}
                type="password"
                required
              />
            </FormControl>
            <FormControl className="text-left justify-between">
              <label htmlFor="confirm password" className="mr-3">
                Confirm Password
              </label>
              <Input
                name="confirm password"
                id="confirm password"
                defaultValue={confirmPassword}
                onChange={handleConfirmPassword}
                type="password"
                required
              />
            </FormControl>

            <FlexContainer>
              <Button type="button" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button style={{ fontWeight: "bold" }}>Register</Button>
            </FlexContainer>
          </form>
        </div>
      </div>
    </main>
  );
}
