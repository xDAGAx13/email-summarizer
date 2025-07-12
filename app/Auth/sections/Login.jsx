"use client";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import auth from "../../firebase";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if (user) {
        setIsSignedIn(true);
        setName(user.email);
      }
    });
    return ()=>unsubscribe();
    
  },[]);

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Cannot Sign in", e);
    }
  };

  const handleLogout = async()=>{
    try{
      signOut(auth);
      setIsSignedIn(false);
    }catch(e){
      console.error('Cannot Sign Out User', e)
    }
  }

  return (
    <div className="h-auto flex flex-col gap-7 items-center justify-center border-2 border-gray-200 shadow-2xl rounded-2xl mx-20 lg:mx-100 py-10">
      <div className="mx-auto w-full justify-center mb-5">
        <h1 className="text-center text-4xl font-semibold text-purple-400/80">
          Login / Register
        </h1>
        {isSignedIn && (
          <div className="text-center ">
            <p className="text-center mt-5 font-medium text-xl mb-4">
              You are already signed in with {name}
            </p>
            <button onClick={()=>router.push('/')} className="bg-gray-700 py-1 font-bold px-3 rounded-2xl cursor-pointer hover:bg-gray-600 transition-all">
              Back to Em-Sum
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col rounded justify-center items-center gap-4">
        <button
          onClick={signUpWithGoogle}
          className="flex items-center gap-2 bg-white px-3 text-black py-3 rounded-2xl font-bold hover:bg-gray-300 transition-all cursor-pointer"
        >
          Sign-In With Google <FaGoogle className="size-5 transition-all" />
        </button>
        <button className="flex items-center gap-2 bg-white px-3 text-black py-3 rounded-2xl font-bold hover:bg-gray-300 transition-all cursor-pointer">
          Sign-In With Outlook{" "}
          <PiMicrosoftOutlookLogoFill className="size-6 transition-all" />
        </button>
        {isSignedIn&&<button onClick={handleLogout} className="bg-neutral-700 px-4 py-2 transition-all rounded-2xl cursor-pointer hover:bg-neutral-800">Logout</button>}
      </div>
    </div>
  );
};

export default Login;
