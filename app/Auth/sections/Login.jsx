'use client'
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import {useSession, signIn, signOut} from 'next-auth/react'

const Login = () => {
  const {data: session} = useSession()

  return (
    <div className="h-100 flex flex-col gap-10 items-center justify-center border-2 border-gray-200 shadow-2xl rounded-2xl mx-20 lg:mx-100 py-10">
      <div className="mx-auto  w-full  justify-center mb-5">
        <h1 className="text-center text-4xl font-semibold text-purple-400/80">
          Login / Register
        </h1>
      </div>
      <div className="flex flex-col rounded justify-center items-center gap-4">
          <button className="flex items-center gap-2 bg-white px-3 text-black py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all cursor-pointer">
            Sign-In With Google <FaGoogle className="size-5 transition-all"/>
          </button>
          <button className="flex items-center gap-2 bg-white px-3 text-black py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all cursor-pointer">
            Sign-In With Outlook <PiMicrosoftOutlookLogoFill className="size-6 transition-all"/>
          </button>       
      </div>
    </div>
  );
};

export default Login;
