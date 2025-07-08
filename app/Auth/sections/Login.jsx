import React from "react";

const Login = () => {
  return (
    <div className="flex flex-wrap items-center justify-center border-2 border-gray-200 shadow-2xl rounded-2xl mx-20 lg:mx-100 py-10">
      <div className="mx-auto  w-full  justify-center mb-5">
        <h1 className="text-center text-4xl font-semibold text-purple-400/80">
          Login
        </h1>
      </div>
      <div className="rounded justify-center items-center gap-4">
        <form className="flex flex-col gap-3 w-auto p">
          <input
            className="pl-5 px-5 text-lg py-1 font-medium bg-gray-400 rounded"
            placeholder="Enter Your Email"
          ></input>
          <input
            className="pl-5 px-5 text-lg py-1 font-medium bg-gray-400 rounded"
            placeholder="Password"
          ></input>
          <p className="text-center font-semibold">OR</p>

          
          {/* Insert Google Image */}
          <button className="bg-white text-black py-2 rounded-2xl font-bold hover:bg-gray-200 transition-all cursor-pointer">
            Sign-In With Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
