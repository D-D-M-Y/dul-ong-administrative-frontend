import React from 'react';
import Link from 'next/link';

export default function Page() {
    return (
    <div className="container ">

      <div className="grid grid-cols-2 gap-8">

        <div className="purple flex flex-col p-8 w-full ">
          <img src="/dulong-white.svg" className="w-max" />
          <h1 className="text-white font-bold">Made by Ilonggos, for Ilonggos</h1>
          <h4 className="text-white text-lg">A route generating application for the people of Iloilo Province</h4>
          <img src="/3D-Route.svg" className="justify-end w-50 h-50" />
        </div>


        <div className="flex flex-col bg-white rounded-l-3xl justify-center items-center space-y-4 w-full">
          <h1 className="font-bold roboto">Log In</h1>
          <button className="w-auto border rounded-lg px-2 py-1 focus:outline-none hover:bg-highligh">Continue with Google</button>

          <div className="flex items-center border-b border-gray-300 pb-2 mt-4">
            <div className="w-auto p-2 border-b border-gray-300 py-1"></div>
            <span className="text-gray-500 px-2">or</span>
            <div className="w-auto p-2 border-b border-gray-300 py-1"></div>
          </div>

          <div className="flex flex-col space-y-2">
            <input type="text" id="username" className="border rounded-lg px-2 py-1 w-full " placeholder="Username or Email" />
            <input type="password" id="password" className="border rounded-lg px-2 py-1 w-full " placeholder="Password" />
          </div>
          
            <Link href="/login/forgot-password" className="text-SourceSansPro italic text-purple text-xs text-end hover:underline">Forgot Password?</Link>
            <Link href="/"><button className="w-auto h-[50px] bg-indigo-100 rounded-[40px] text-neutral-800 text-center font-bold font-roboto pl-20 pr-20">Login</button> </Link>
        </div>
      </div>
    </div>
  );
};