import React from 'react';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";

export default function Page() {
  return (
      <div className="overflow-hidden grid grid-cols-2 w-full h-screen"> {/* Grid container with two columns */}

        <div className="flex flex-col flex-grow pt-20 pl-20 h-screen">  {/* First column: full width */}
          <img src="/dulong-white.svg" className="w-1/2" />
          <h1 className="text-white font-SourceSansPro">Made by Ilonggos, for Ilonggos</h1>
          <p className="text-white pt-sans font-normal text-xl">A route generating application for the people of Iloilo Province</p>
          <img src="/3D-Route.svg" className="size-9/12 place-self-end" />
        </div>

        <div className="flex flex-col flex-grow bg-white rounded-l-3xl justify-center items-center h-screen">  {/* Second column: full width */}
          <h1 className="font-bold roboto">Log In</h1>
          
          <button className="border rounded-lg p-2 hover:highlight flex justify-center w-1/3">
            <FcGoogle size = {18}/> 
            <div className = "relative text-center text-lgray text-sm font-ptsans pl-2">Continue with Google</div>
          </button>

          <div className="flex items-center pb-2 mt-4">
            <div className="w-auto p-5 border-b border-lgray py-1"></div>
            <span className="text-lgray px-2">or</span>
            <div className="w-auto p-5 border-b border-lgray py-1"></div>
          </div>

          <div className="flex flex-col pt-4 space-y-2 w-1/3">
            <input type="text" id="username" className="border rounded-lg px-2 py-1 text-textC text-m font-ptsans" placeholder="Username or Email" />
            <input type="password" id="password" className="border rounded-lg px-2 py-1 text-textC text-m font-ptsans" placeholder="Password" />
            <Link href="/login/forgot-password" className="text-SourceSansPro italic text-purple font-bold text-xs text-end underline py-2">Forgot Password?</Link>
            <Link href="/"><button className="border rounded-lg p2 w-full bg-indigo-100 rounded-3xl text-center font-bold font-roboto py-3">Login</button> </Link>
          </div>
      </div>
      </div>
  );
}
