"use client";
import Navbar from "../../components/Navbar";
import React, { useState } from "react";
import Login from "./sections/Login";

const signin = () => {
  const [token, setToken] = useState(null)
  return (
    <div>
      <div className=""></div>
      <Navbar />
      <Login onTokenExtracted={setToken}/>
      
    </div>
  );
};

export default signin;
